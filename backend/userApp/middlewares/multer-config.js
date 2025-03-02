const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};


const productsStorage = multer.memoryStorage();

const userStorage = multer.memoryStorage();


const productsUserApp  = multer({storage: productsStorage})
const userUserApp = multer({storage: userStorage})
module.exports = {
  productsUserApp,
  userUserApp
};
//module.exports = multer({storage: storage}).single('image');
