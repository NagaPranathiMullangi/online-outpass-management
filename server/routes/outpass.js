import express from "express";
import upload from "../middlewares/multer.js";

import { createOutpass } from "../controllers/outpass.js";

const router = express.Router();

/* The .single() method tells multer to expect a single file upload.
The 'image' string specifies the name of the form field that contains the file
it is the same key used to store value in formData object.
 */

router.post("/submit", upload.single("image"), createOutpass);

export default router;
