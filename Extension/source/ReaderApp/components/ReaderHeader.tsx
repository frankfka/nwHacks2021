import React from 'react';
import ConvertToPdfButton from './ConvertToPdfButton';
import ShareComponent from './ShareComponent';

const ReaderHeader: React.FC = () => (
  <div className="w-full py-4 border-b-4 border-gray-900 bg-gray-50">
    <div className="container mx-auto flex flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Curate</h1>
      </div>
      <div className="flex flex-row items-center space-x-8">
        <ShareComponent />
        <ConvertToPdfButton />
      </div>
    </div>
  </div>
);

export default ReaderHeader;
