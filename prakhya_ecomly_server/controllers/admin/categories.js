const { Types } = require("mongoose");
const media_helper = require("../../helpers/media_helper");
const util = require('util');
const category = require("../../models/category");
const { type } = require("os");

exports.addCategory = async function(req,res){
    
try{
         const uploadImage = util.promisify(media_helper.upload.fields(
           [{
            name:'image', maxCount:1
           }]
        ));

        try{
            await uploadImage(req,res); 

        }catch(error){x
            console.error(error);
            return res.status(500).json({
                type:error.code,
                message:`${error.message}{${error.fields}}`,
                storageErrors:error.storageErrors
            });
        }
       
    const image = req.files['image'][0];
    if(!image){
        return res.status(404).json({message:'No file found!'});
    }

    req.body['image'] = `${req.protocol}://${req.get('host')}/${image.path}`;
    let category = new Category(req.body);
    category = await category.save();
    if(!category){
        return res.status(500).json({message:'Category could not be created'});
    }
    return res.status(201).json(category);

    }catch(error){
       return res.status(500).json({type:error.name,message:error.message});

    }

}

exports.deleteCategory = await function(req,res){
    try{}catch(error){
        res.status(500).json({
            type: error.name,
            message:error.message
        });

    }
}