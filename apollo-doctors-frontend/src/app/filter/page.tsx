import FilterPage from '@/components/FilterPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filter Doctors - Apollo Doctors Clone',
  description: 'Filter and find the best doctors for your needs',
};

export default function FilterPageRoute() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-apolloBlue">Filter Doctors</h1>
      <FilterPage />
    </div>
  );
}
