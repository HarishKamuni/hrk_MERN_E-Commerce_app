import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ProductPopup = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-4">
        <IoMdClose
          onClick={onClose}
          className="cursor-pointer block ml-auto hover:text-red-500 mb-4"
          size={30}
        />
        <img src={imgUrl} alt={imgUrl} width={500} />
      </div>
    </div>
  );
};

export default ProductPopup;
