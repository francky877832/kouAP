const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};


const productsStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'userApp/assets/images/products');
  },
  filename: (req, file, callback) => {
    console.log(file.mimetype, file.originalname )
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});


const userStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'userApp/assets/images/users');
  },
  filename: (req, file, callback) => {
    console.log(file.originalname)
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});


const productsUserApp  = multer({storage: productsStorage})
const userUserApp = multer({storage: userStorage})
module.exports = {
  productsUserApp,
  userUserApp
};
//module.exports = multer({storage: storage}).single('image');
