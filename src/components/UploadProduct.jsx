import React from 'react';
import { IoMdClose } from 'react-icons/io';

const UploadProduct = ({ onClose }) => {
  return (
    <div className="fixed bg-slate-200 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-opacity-40 ">
      <div className="bg-white p-4 max-w-2xl w-full rounded h-full max-h-[80%]">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-lg">UploadProduct</h1>
          <button className="hover:text-red-600" onClick={onClose}>
            <IoMdClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
