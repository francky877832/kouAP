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
    const uploadPath = path.join('userApp/assets/evaluationReports');
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
    const uploadPath = path.join('userApp/assets/applications');
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
