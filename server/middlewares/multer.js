import multer from "multer";

// Allowed file signatures (magic bytes)
// middlewares/upload.js


// Use memory storage so files stay in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;

