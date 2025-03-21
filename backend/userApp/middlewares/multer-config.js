const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Extensions MIME autorisées
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const fileFilter = (req, file, cb) => {
  //console.log(file);
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true); 
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};



const EvaluationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.body.user; //userId
    const uploadPath = path.join("userApp/assets/evaluationReports", folderName);

    // Vérifier si le dossier existe, sinon le créer
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    const fileExtension = MIME_TYPES[file.mimetype]; 
    const fileName = `${Date.now()}-${file.originalname}`; 
    cb(null, fileName);
  }
});

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join('userApp/assets/cv');

    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    const fileExtension = MIME_TYPES[file.mimetype]; 
    const fileName = `${Date.now()}-${file.originalname}`; 
    cb(null, fileName);
  }
});

const applicationsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
//console.log("Multer")
//console.log(req.body)
//console.log(req.files)
    const folderName = req.body.user;
    const uploadPath = path.join("userApp/assets/applications", folderName);

    // Vérifier si le dossier existe, sinon le créer
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    const fileExtension = MIME_TYPES[file.mimetype]; 
    const fileName = `${Date.now()}-${file.originalname}`; 
    cb(null, fileName);
  }
});

// Middleware pour chaque type de fichier
const cvUpload = multer({ storage: cvStorage, fileFilter });
const evaluationDocsUpload = multer({ storage: EvaluationStorage, fileFilter });
const applicationsDocUpload = multer({ storage: applicationsStorage, fileFilter });

module.exports = {
  cvUpload,
  evaluationDocsUpload,
  applicationsDocUpload,
};
