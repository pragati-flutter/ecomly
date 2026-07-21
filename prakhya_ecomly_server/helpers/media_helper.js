const {unlink} = require('fs/promises');
const multer = require('multer');
const path = require('path');


const ALLOWED_EXTENSIONS = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
};

const Storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads');
    },

    filename: function(req, file, cb){
        const name = file.originalname
            .replace(/\s+/g, '-')   // spaces → dash
            .replace(/\.(png|jpg|jpeg)/, '');

        const uniqueName = `${name}-${Date.now()}.${ALLOWED_EXTENSIONS[file.mimetype]}`;
        
        cb(null, uniqueName);
    }
});

exports.upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        const isValid = ALLOWED_EXTENSIONS[file.mimetype];

        if(!isValid){
            return cb(new Error(`Invalid image type: ${file.mimetype}`));
        }

        cb(null, true);
    }
});

exports.deleteImage = async function(imageUrl,continueOnErrorName){
    await Promise.all(
        imageUrl.map(async (imageUrl)=>{
            const imagePath = path.resolve(
                __dirname,
                '..',
                'public',
                'uploads',
                path.basename(imageUrl),

            );

            try{
                await unlink(imagePath)
            }catch(error){
                if(error.code == continueOnErrorName){
                    console.error(`Continuing with next image: ${error.message}`);
                }else{
                    console.error(`Error deleting image: ${error.message}`);
                    throw error;
                }


            }
        })
    );

}