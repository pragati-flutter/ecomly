
const {Category} = require('../models/category');

exports.getCategories = async function(req,res){
    try{
     const categories = await Category.find();

     if(!categories){
        return res.json({
            message: 'Category does not found'
        });
     }

     return res.json(categories);
     
    }catch(error){
        console.error(error);
        return res.json({type: error.type, message:error.message});


    }

}

 exports.getCategoryById = async function(req,res){
    try{
      const category = await Category.findById(req.params.id);
      if(!category){
        return res.json({message:'Category no found'});
      }
      return res.json(category);

    }catch(error){
        console.error(error);
        return res.json({type:error.type,message:error.message});
    }
}


