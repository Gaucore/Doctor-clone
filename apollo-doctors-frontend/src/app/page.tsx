import DoctorsList from '@/components/DoctorsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apollo Doctors Clone - Home',
  description: 'Find and consult with top doctors online',
};

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-apolloBlue">
        Consult General Physicians Online - Internal Medicine Specialists
      </h1>
      <DoctorsList />
    </div>
  );
}