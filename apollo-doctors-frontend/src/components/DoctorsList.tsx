'use client';

import { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import FilterSidebar from './FilterSidebar';
import { Doctor } from '@/types/doctor';
import { toast } from 'react-toastify';
import { doctorApi } from '@/services/api';
import { useSearchParams } from 'next/navigation';

const DoctorsList = () => {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    specialization: searchParams.get('specialization') || '',
    location: searchParams.get('location') || '',
    available: searchParams.get('available') === 'true',
    minFee: searchParams.get('minFee') || '',
    maxFee: searchParams.get('maxFee') || '',
    minRating: searchParams.get('minRating') || '',
  });

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, filters, searchParams]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const queryParams = {
        page: currentPage.toString(),
        limit: '10',
        ...(filters.specialization && { specialization: filters.specialization }),
        ...(filters.location && { location: filters.location }),
        ...(filters.available && { available: 'true' }),
        ...(filters.minFee && { minFee: filters.minFee }),
        ...(filters.maxFee && { maxFee: filters.maxFee }),
        ...(filters.minRating && { minRating: filters.minRating }),
      };

      const data = await doctorApi.getDoctors(queryParams);
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      <div className="w-full md:w-3/4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apolloBlue"></div>
          </div>
        ) : doctors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'bg-apolloBlue text-white'
                        : 'border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No doctors found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
