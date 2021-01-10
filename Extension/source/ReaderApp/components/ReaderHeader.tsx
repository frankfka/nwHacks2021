import React from 'react';
import ConvertToPdfButton from './ConvertToPdfButton';
import ShareComponent from './ShareComponent';

const ReaderHeader: React.FC = ({ children }) => (
  <div className="w-full py-4 border-b-2 border-black-500 bg-gray-50">
    <div className="container mx-auto flex flex-row justify-between items-center">
      <div>
        <img
          src="/assets/curate-logo.png"
          className="object-contain w-48 h-12 pb-1.5"
          alt="Curate"
        />
      </div>
      <div className="flex flex-row items-center space-x-8">
        {children}
        <ConvertToPdfButton />
        <ShareComponent />
      </div>
    </div>
  </div>
);

export default ReaderHeader;
