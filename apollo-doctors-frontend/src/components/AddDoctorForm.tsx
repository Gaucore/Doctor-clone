'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { doctorApi } from '@/services/api';

const AddDoctorForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    education: '',
    description: '',
    fees: '',
    rating: '4.5',
    location: '',
    available: false,
    image: '',
  });
  // We only need to track the image preview URL now
  const [imagePreview, setImagePreview] = useState<string>('');

  const specializations = [
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedic',
    'Neurologist',
    'Gynecologist',
    'ENT Specialist',
    'Ophthalmologist',
    'Psychiatrist',
  ];

  const locations = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Set the image URL directly in the form data
      setFormData({
        ...formData,
        image: previewUrl, // Use the preview URL directly
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Use the form data directly - the image URL is already set in handleImageChange
      let doctorData = { ...formData };

      // Log the data being sent
      console.log('Submitting doctor data:', doctorData);

      // Now add the doctor with the image URL
      await doctorApi.addDoctor(doctorData);

      toast.success('Doctor added successfully!');
      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('Error adding doctor:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="form-label">
              Doctor Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label htmlFor="specialization" className="form-label">
              Specialization*
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="education" className="form-label">
              Education*
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="MBBS, MD (Internal Medicine)"
            />
          </div>

          <div>
            <label htmlFor="fees" className="form-label">
              Consultation Fee (₹)*
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
              min="0"
              className="form-input"
              placeholder="500"
            />
          </div>

          <div>
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="form-input"
              placeholder="4.5"
            />
          </div>

          <div>
            <label htmlFor="location" className="form-label">
              Location*
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              <div className="text-sm text-gray-500">Or provide an image URL:</div>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/doctor-image.jpg"
              />

              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center h-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-apolloBlue focus:ring-apolloLightBlue border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                Available for Consultation
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="description" className="form-label">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="form-input"
            placeholder="Experienced doctor specializing in..."
          ></textarea>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary min-w-[150px] flex items-center justify-center"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {loading ? 'Adding...' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
