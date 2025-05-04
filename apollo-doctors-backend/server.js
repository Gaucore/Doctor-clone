const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the doctor name'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide the specialization'],
      trim: true,
    },
    education: {
      type: String,
      required: [true, 'Please provide the education details'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    fees: {
      type: Number,
      required: [true, 'Please provide the consultation fee'],
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    location: {
      type: String,
      required: [true, 'Please provide the location'],
      trim: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Connect to MongoDB Atlas
console.log('Connecting to MongoDB Atlas...');

// MongoDB Atlas connection string with password
const MONGODB_URI = 'mongodb+srv://Doctor:pUouBs0rvXo4LSXY@doctor-clone.ck24rty.mongodb.net/apollo-doctors-clone?retryWrites=true&w=majority&appName=Doctor-Clone';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Create the Doctor model using mongoose
const Doctor = mongoose.model('Doctor', doctorSchema);

// Routes
app.get('/api/doctors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const specialization = req.query.specialization;
    const location = req.query.location;
    const available = req.query.available;
    const minFee = req.query.minFee;
    const maxFee = req.query.maxFee;
    const minRating = req.query.minRating;

    // Build filter query
    const filter = {};

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
});

app.post('/api/doctors', async (req, res) => {
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
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: error.message || 'Failed to add doctor' });
  }
});

app.get('/api/doctors/filter-options', async (_req, res) => {
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
});

// Upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the server URL
    const protocol = req.protocol;
    const host = req.get('host');

    // Create the full URL to the uploaded file
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    console.log('File uploaded:', req.file);
    console.log('File URL:', fileUrl);

    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        url: fileUrl,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: error.message || 'Failed to upload file' });
  }
});

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
