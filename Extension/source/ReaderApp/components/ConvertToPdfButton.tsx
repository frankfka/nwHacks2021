import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const ConvertToPdfButton: React.FC = () => {
  return (
    <button
      className="px-4 py-2 text-sm rounded border-2 bg-gray-100 flex flex-row items-center duration-200 hover:bg-red-300"
      onClick={() => {
        window.print();
      }}
      type="button"
    >
      <span className="text-red-600 mr-2">
        <FaFilePdf
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            color: 'inherit',
          }}
        />
      </span>
      <span className="text-sm">Print as PDF</span>
    </button>
  );
};

export default ConvertToPdfButton;
