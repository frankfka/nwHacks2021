import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const ConvertToPdfButton: React.FC = () => {
  return (
    <button
      className="px-4 py-2 bg-white rounded flex flex-row items-center shadow duration-200 hover:bg-gray-100"
      onClick={() => {
        window.print();
      }}
      type="button"
    >
      <span className="text-red-600 mr-2">
        <FaFilePdf
          style={{
            display: 'inline-block',
            fontSize: '1.2rem',
            color: 'inherit',
          }}
        />
      </span>
      <span className="text-base">Print as PDF</span>
    </button>
  );
};

export default ConvertToPdfButton;
