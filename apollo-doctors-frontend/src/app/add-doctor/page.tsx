import AddDoctorForm from '@/components/AddDoctorForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Doctor - Apollo Doctors Clone',
  description: 'Add a new doctor to the platform',
};

export default function AddDoctorPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-apolloBlue">Add New Doctor</h1>
      <AddDoctorForm />
    </div>
  );
}