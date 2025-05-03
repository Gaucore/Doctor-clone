import express from 'express';
import { getDoctors, addDoctor, getFilterOptions } from '../controllers/doctorController';

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors with filters and pagination
router.get('/', getDoctors);

// @route   POST /api/doctors
// @desc    Add a new doctor
router.post('/', addDoctor);

// @route   GET /api/doctors/filter-options
// @desc    Get filter options (specializations and locations)
router.get('/filter-options', getFilterOptions);

export default router;
