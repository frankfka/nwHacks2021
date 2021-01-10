import React from 'react';
import ConvertToPdfButton from './ConvertToPdfButton';
import ShareComponent from './ShareComponent';

const ReaderHeader: React.FC = ({ children }) => (
  <div className="w-full py-4 border-b-4 border-gray-900 bg-gray-50">
    <div className="container mx-auto flex flex-row justify-between items-center">
      <div>
        <img
          src="/assets/curate-logo.png"
          className="object-contain w-48 h-16"
          alt="Curate"
        />
      </div>
      <div className="flex flex-row items-center space-x-8">
        {children}
        <ShareComponent />
        <ConvertToPdfButton />
      </div>
    </div>
  </div>
);

export default ReaderHeader;
