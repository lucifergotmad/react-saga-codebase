import type { FC } from 'react';
import { SiVite, SiRedux, SiReacthookform } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';

const AdminDashboard: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to Our Project
      </h1>
      <p className="mb-12 text-lg text-gray-600">
        This project is built using the latest technologies.
      </p>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <FaReact className="mb-2 text-6xl text-blue-600" />
          <span className="text-sm text-gray-600">React</span>
        </div>
        <div className="flex flex-col items-center">
          <SiVite className="mb-2 text-6xl text-purple-600" />
          <span className="text-sm text-gray-600">Vite</span>
        </div>
        <div className="flex flex-col items-center">
          <SiRedux className="mb-2 text-6xl text-purple-700" />
          <span className="text-sm text-gray-600">Redux Saga</span>
        </div>
        <div className="flex flex-col items-center">
          <SiReacthookform className="mb-2 text-6xl text-pink-500" />
          <span className="text-sm text-gray-600">React Hook Form</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
