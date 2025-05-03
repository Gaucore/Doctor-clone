import { Request, Response } from 'express';
import path from 'path';

// @desc    Upload an image
// @route   POST /api/upload
// @access  Public
export const uploadImage = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the server URL
    const protocol = req.protocol;
    const host = req.get('host');
    
    // Create the full URL to the uploaded file
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        url: fileUrl,
      },
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: error.message || 'Failed to upload file' });
  }
};
