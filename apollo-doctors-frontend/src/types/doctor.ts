export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  education: string;
  description: string;
  fees: number;
  rating: number;
  location: string;
  available: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}