const { query } = require("express-validator");
const { Product } = require("../models/product");

const getProducts = async function (req, res) {
  try {
    let products;
    const page = req.query.page || 1;
    const pageSize = 10;

    if (req.query.criteria) {
      let query = {};
      if (req.query.category) {
        query["category"] = req.query.category;
      }

      switch (req.query.criteria) {
        case "newArrivals": {
          const twoWeekAgo = new Date();
          twoWeekAgo.setDate(twoWeekAgo.getDate() - 14);
          query["dateAdded"] = { $gte: twoWeekAgo };
          break;
        }
        case "popular": {
          query["rating"] = { $gte: 4.5 };
          break;
        }
        default:
          break;
      }

      products = await Product.find(query)
        .select("-image -reviews -size")
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else if ((req, query.category)) {
      products = await Product.find(query)
        .select("-image -reviews -size")
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      products = await Product.select("-image -reviews -size").skip(
        (page - 1) * pageSize,
      );
    }
    if(!products){
        return res.status(404).json({message:'product does not exist'});
    }
     return res.json(products);
  } catch (error) {
    console.error(error);
    return res.json({ type: error.type, message: error.message });
  }
};


const searchProducts = async function(req,res){
    try{
     const searchTerm = req.query.q;

     const page = req.query.page||1;
     const pageSize = 10;
     let query = {};
     if(req.query.category){

        query = {category:req.query.category};
        if(req.query.genderAgeCategory){
            query = {query['genderAgeCategory']: req.query.genderAgeCategory};
        }

     }else if(req.query.genderAgeCategory){
        query = {genderAgeCategory:req.query.genderAgeCategory.toLowerCase()};
     }
     if(searchTerm){
        query = {
            ...query,
        $text:{
            $search:searchTerm,
            $language:'english',
            $caseSensitive:false,
        }
        }
     }
     const searchResults = await Product.find(query).skip((page-1)*pageSize).limit(pageSize);
    return res.json(searchResults);

     }catch(error){
        console.error(error);
        return res.status(500).json({type:error.type, message:error.message});
    }
}

const getProductById = async function(req,res){
    try{
    const product = await Product.findById(req.params.id).select('-reviews');
    if(!product){
        return res.json({message: 'Product does not found'});
    }
    return res.json(product);


    }catch(error){
        console.error(error);
        return res.status(500).json({type:error.type, message:error.message});
    }
}

    



