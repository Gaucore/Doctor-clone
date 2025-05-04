'use client';

import { useState, useEffect } from 'react';
import { doctorApi } from '@/services/api';

interface FilterSidebarProps {
  filters: {
    specialization: string;
    location: string;
    available: boolean;
    minFee?: string;
    maxFee?: string;
    minRating?: string;
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setLocalFilters({
      ...localFilters,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      specialization: '',
      location: '',
      available: false,
      minFee: '',
      maxFee: '',
      minRating: '',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-apolloBlue">Filter Doctors</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="specialization" className="form-label">
            Specialization
          </label>
          <select
            id="specialization"
            name="specialization"
            value={localFilters.specialization}
            onChange={handleInputChange}
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
        
        <div className="mb-4">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={localFilters.location}
            onChange={handleInputChange}
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
        
        <div className="mb-4">
          <label htmlFor="minFee" className="form-label">
            Minimum Fee (₹)
          </label>
          <input
            type="number"
            id="minFee"
            name="minFee"
            value={localFilters.minFee}
            onChange={handleInputChange}
            min="0"
            className="form-input"
            placeholder="0"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="maxFee" className="form-label">
            Maximum Fee (₹)
          </label>
          <input
            type="number"
            id="maxFee"
            name="maxFee"
            value={localFilters.maxFee}
            onChange={handleInputChange}
            min="0"
            className="form-input"
            placeholder="5000"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="minRating" className="form-label">
            Minimum Rating
          </label>
          <select
            id="minRating"
            name="minRating"
            value={localFilters.minRating}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={localFilters.available}
              onChange={handleInputChange}
              className="h-4 w-4 text-apolloBlue focus:ring-apolloLightBlue border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
              Available Now
            </label>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn border border-gray-300 flex-1"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSidebar;