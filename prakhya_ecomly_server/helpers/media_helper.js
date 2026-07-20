const multer = require('multer');

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