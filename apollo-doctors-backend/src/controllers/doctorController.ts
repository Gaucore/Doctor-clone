import { Request, Response } from 'express';
import Doctor from '../models/Doctor';

// @desc    Get all doctors with filters and pagination
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const specialization = req.query.specialization as string;
    const location = req.query.location as string;
    const available = req.query.available as string;
    const minFee = req.query.minFee as string;
    const maxFee = req.query.maxFee as string;
    const minRating = req.query.minRating as string;
    
    // Build filter query
    const filter: any = {};
    
    if (specialization) {
      filter.specialization = specialization;
    }
    
    if (location) {
      filter.location = location;
    }
    
    if (available === 'true') {
      filter.available = true;
    }
    
    if (minFee) {
      filter.fees = { $gte: parseInt(minFee) };
    }
    
    if (maxFee) {
      filter.fees = { ...filter.fees, $lte: parseInt(maxFee) };
    }
    
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalDoctors = await Doctor.countDocuments(filter);
    const totalPages = Math.ceil(totalDoctors / limit);
    
    // Get doctors with pagination
    const doctors = await Doctor.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      doctors,
      currentPage: page,
      totalPages,
      totalDoctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

// @desc    Add a new doctor
// @route   POST /api/doctors
// @access  Public
export const addDoctor = async (req: Request, res: Response) => {
  try {
    const { name, specialization, education, description, fees, rating, location, available, image } = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'specialization', 'education', 'description', 'fees', 'location'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    
    // Create new doctor
    const doctor = await Doctor.create({
      name,
      specialization,
      education,
      description,
      fees: parseFloat(fees),
      rating: rating ? parseFloat(rating) : 4.5,
      location,
      available: available || false,
      image: image || '',
    });
    
    res.status(201).json({
      message: 'Doctor added successfully',
      doctor,
    });
  } catch (error: any) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: error.message || 'Failed to add doctor' });
  }
};

// @desc    Get filter options (specializations and locations)
// @route   GET /api/doctors/filter-options
// @access  Public
export const getFilterOptions = async (req: Request, res: Response) => {
  try {
    // Get unique specializations
    const specializations = await Doctor.distinct('specialization');
    
    // Get unique locations
    const locations = await Doctor.distinct('location');
    
    res.status(200).json({
      specializations,
      locations,
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ message: 'Failed to fetch filter options' });
  }
};
