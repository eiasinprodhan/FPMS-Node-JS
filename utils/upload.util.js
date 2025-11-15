const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create multer instance with dynamic subfolder
function createUploader(subfolder = "user") {
  const uploadDir = path.join(__dirname, "../uploads", subfolder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      const ext = path.extname(file.originalname);
      const name = req.body.name ? req.body.name.replace(/\s+/g, "_") : "user";

      cb(null, `${name}_${uniqueSuffix}${ext}`);
    }
  });

  return multer({ storage });
}

// Wrapper → so you can call upload.single("photo", "user")
function uploadWithSubfolder(fieldName, subfolder) {
  return (req, res, next) => {
    const uploader = createUploader(subfolder);
    uploader.single(fieldName)(req, res, next);
  };
}

module.exports = uploadWithSubfolder;
