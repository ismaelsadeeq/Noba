const multer  = require('multer');
const helpers = require('./helper');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.');
        cb(null, Date.now()+'.'+extension[extension.length - 1])
    }
});


const singleUpload = multer({
    storage: storage, 
    limits: {fileSize: 1024 * 1024 },
    fileFilter: helpers.imageFilter
}).single('picture');

const multipleUpload = multer({
    storage: storage, 
    limits: {fileSize: 1024 * 1024 },
    fileFilter: helpers.imageFilter
}).array('picture',2);

module.exports = {
    singleUpload,
    multipleUpload
}