import express from 'express';
import { uploadImage } from '../controllers/uploadController';
import upload from '../middleware/upload';

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload an image
router.post('/', upload.single('image'), uploadImage);

export default router;
