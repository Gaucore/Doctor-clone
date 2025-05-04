'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { doctorApi } from '@/services/api';

const FilterPage = () => {
  const router = useRouter();
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    available: false,
    minFee: '',
    maxFee: '',
    minRating: '',
  });

  useEffect(() => {
    // Fetch specializations and locations for filter dropdowns
    const fetchFilterOptions = async () => {
      try {
        const data = await doctorApi.getFilterOptions();
        setSpecializations(data.specializations);
        setLocations(data.locations);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.specialization) {
      queryParams.append('specialization', filters.specialization);
    }
    
    if (filters.location) {
      queryParams.append('location', filters.location);
    }
    
    if (filters.available) {
      queryParams.append('available', 'true');
    }
    
    if (filters.minFee) {
      queryParams.append('minFee', filters.minFee);
    }
    
    if (filters.maxFee) {
      queryParams.append('maxFee', filters.maxFee);
    }
    
    if (filters.minRating) {
      queryParams.append('minRating', filters.minRating);
    }
    
    // Navigate to home page with filters
    router.push(`/?${queryParams.toString()}`);
    toast.success('Filters applied successfully!');
  };

  const handleReset = () => {
    setFilters({
      specialization: '',
      location: '',
      available: false,
      minFee: '',
      maxFee: '',
      minRating: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="specialization" className="form-label">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              value={filters.specialization}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">All Specializations</option>
              {specializations.length > 0 ? (
                specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))
              ) : (
                <>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Neurologist">Neurologist</option>
                </>
              )}
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">All Locations</option>
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))
              ) : (
                <>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                </>
              )}
            </select>
          </div>
          
          <div>
            <label htmlFor="minFee" className="form-label">
              Minimum Fee (₹)
            </label>
            <input
              type="number"
              id="minFee"
              name="minFee"
              value={filters.minFee}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="0"
            />
          </div>
          
          <div>
            <label htmlFor="maxFee" className="form-label">
              Maximum Fee (₹)
            </label>
            <input
              type="number"
              id="maxFee"
              name="maxFee"
              value={filters.maxFee}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="5000"
            />
          </div>
          
          <div>
            <label htmlFor="minRating" className="form-label">
              Minimum Rating
            </label>
            <select
              id="minRating"
              name="minRating"
              value={filters.minRating}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Any Rating</option>
              <option value="3">3+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
          
          <div className="flex items-center h-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={filters.available}
                onChange={handleChange}
                className="h-4 w-4 text-apolloBlue focus:ring-apolloLightBlue border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                Available Now
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="btn border border-gray-300"
          >
            Reset Filters
          </button>
          <button type="submit" className="btn btn-primary">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPage;