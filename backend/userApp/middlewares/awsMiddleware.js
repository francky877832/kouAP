const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const path = require("path");

// Configurer AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true); 
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};

const multerS3Config = (folderName) => {
  return multerS3({
    s3: s3Client,  // Utiliser s3Client d'AWS SDK v3
    bucket: process.env.AWS_S3_BUCKET_NAME,  // Nom de ton bucket
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileExtension = MIME_TYPES[file.mimetype]; 
      const fileName = `${folderName}/${Date.now()}-${file.originalname}`;  // Générer un nom unique pour le fichier
      cb(null, fileName);
    },
  });
};

const cvUpload = multer({
  storage: multerS3Config("cv"),  // Stocker dans le dossier "cv" sur S3
  fileFilter: fileFilter,
});

const evaluationDocsUpload = multer({
  storage: multerS3Config("evaluationReports"),  // Stocker dans le dossier "evaluationReports" sur S3
  fileFilter: fileFilter,
});

const applicationsDocUpload = multer({
  storage: multerS3Config("applications"),  // Stocker dans le dossier "applications" sur S3
  fileFilter: fileFilter,
});

module.exports = {
  cvUpload,
  evaluationDocsUpload,
  applicationsDocUpload,
};
