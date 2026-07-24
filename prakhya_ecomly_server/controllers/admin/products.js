const { Product } = require("../../models/product");
const {Category} = require("../..models/category");


exports.getProductCount = async function (req, res) {
  try {
    const count = await Product.countDocuments();
    if (!count) {
      return res.status(500).json({ message: "Could not count products" });
    }
    return res.json({ count });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ type: error.message, message: error.message });
  }
};

exports.addProduct = async function (req, res) {
  try {
    const uploadImage = util.promisify(
      media_helper.upload.fields(
        { name: "image", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ),
    );
    try {
      await uploadImage();


    } catch (error) {
      console.log(error);
      return res.status(500).json({
        type: error.message,
        message: error.message,
        Storage: error.StorageErrors,
      });
    }

    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(404).json({message:"Invalid Category"});
    }

if(category.markedForDeletion){
    return res.status(404).json({
        message: "Category marked for deletion you can not add products to this category"
    });
}
const image = req.files['image'][0];
if(!image){
    return res.status(404).json({message: "No File Found!"});

}
req.body[image] = `${req.protocol}://${req.get('host')}/${image.path}`;
const gallery = req.files[images];

const imagePaths = [];
if(gallery){
    for(const image of gallery){
     const imagePath = `${req.protocol}://${req.get('host')}/${image.path}`;
     imagePaths.push(imagePath);
    }
    if(imagePath.length>0){
        req.body['images'] = imagePaths;
    }
}
    
const product = await new Product(req.body).save();
if(!product){
    return res.status(500).json({message:"The product could not be created"});
}

return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    if(error instanceof multer.MulterError){
        return res.status(error.code).json({message: error.message});
    }
    return res.status(500).json({
      type: error.message,
      message: error.message,
    });
  }
};

exports.addProduct = async function (req,res) {
    try{


    }catch(error){
        return res.json({type:error.type,message:error.message});
    }

    
}