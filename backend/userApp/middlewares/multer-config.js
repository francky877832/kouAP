const multer = require("multer");
const path = require("path");

// Extensions MIME autorisées
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

// Fonction de filtrage des fichiers
const fileFilter = (req, file, cb) => {
  //console.log(file);
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error("Type de fichier non autorisé"), false); // Rejeter le fichier
  }
};

// Configuration du stockage sur disque avec un chemin spécifique
const storage = multer.diskStorage({
  // Dossier où les fichiers seront enregistrés
  destination: (req, file, cb) => {
    const uploadPath = path.join('userApp/assets/evaluationReports'); // Chemin relatif du dossier de stockage
    cb(null, uploadPath); // Spécifier le chemin de stockage
  },
  // Définir le nom du fichier lorsqu'il est enregistré
  filename: (req, file, cb) => {
    const fileExtension = MIME_TYPES[file.mimetype]; // Obtenir l'extension du fichier
    const fileName = `${Date.now()}-${file.originalname}`; // Créer un nom de fichier unique avec timestamp
    cb(null, fileName); // Nom du fichier dans le dossier
  }
});

// Middleware pour chaque type de fichier
const productsUpload = multer({ storage: storage, fileFilter });
const userUpload = multer({ storage: storage, fileFilter });
const evaluationDocsUpload = multer({ storage: storage, fileFilter });

module.exports = {
  productsUpload,
  userUpload,
  evaluationDocsUpload,
};
