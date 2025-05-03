'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            {imgError || !doctor.image ? (
              // Only show default image if there's an error or no image provided
              <Image
                src="/default-doctor.png"
                alt={doctor.name}
                fill
                className="object-cover"
              />
            ) : (
              // Use the doctor's image with error handling
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                unoptimized={true} // Always use unoptimized for user-uploaded images
              />
            )}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-apolloBlue">{doctor.name}</h3>
          <p className="text-gray-600 font-medium">{doctor.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">{doctor.education}</p>

          <div className="mt-2">
            <p className="text-sm text-gray-700">{doctor.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">₹{doctor.fees}</span>
              <span className="text-xs text-gray-500 ml-1">Consultation Fee</span>
            </div>

            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <FaStar className="text-yellow-500 mr-1" />
                {doctor.rating}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-600 text-sm">{doctor.location}</span>
            </div>

            {doctor.available && (
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Available Now
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <button className="btn btn-primary">Consult Online</button>
          <button className="btn border border-apolloBlue text-apolloBlue hover:bg-gray-50">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
