import { FaFilePdf } from 'react-icons/fa';
import React from 'react';

const ConvertToPdfButton: React.FC = () => {
  const onClickHandler = () => {};
  return (
    <button
      className="px-4 py-2 bg-white rounded bg-white flex flex-row items-center shadow duration-200 hover:bg-gray-100"
      onClick={onClickHandler}
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
      <span className="text-base">Convert to PDF</span>
    </button>
  );
};

export default ConvertToPdfButton;
