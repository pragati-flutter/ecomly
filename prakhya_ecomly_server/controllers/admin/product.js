const {Product} = require("../../models/product");

exports.getProductCount = async function(req,res){
    try{
    const count = await Product.countDocuments();
    if(!count){
        return res.status(500).json({message: "Could not count products"});
    }
    return res.json({count});

 }catch(error){
        console.error(error);
        return res.status(500).json({type:error.message, message:error.message});
    }
}