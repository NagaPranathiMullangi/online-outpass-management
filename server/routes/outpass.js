import express from 'express';
import upload from '../middlewares/multer.js'

import { createOutpass } from '../controllers/outpass.js'

const router = express.Router();

router.post('/submit',upload.single('image'), createOutpass)

export default router