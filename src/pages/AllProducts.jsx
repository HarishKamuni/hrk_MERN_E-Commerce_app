import React, { useState } from 'react';
import UploadProduct from '../components/UploadProduct';

const AllProducts = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      <div className="m-2 bg-white p-4 flex justify-between items-center">
        <h1 className="font-medium text-lg ">All Products</h1>
        <button
          className="border-2 border-red-400 py-1 px-3 rounded-2xl text-red-400 hover:bg-red-600 hover:text-white transition-all"
          onClick={() => setShowPopup(true)}
        >
          Upload Product
        </button>
      </div>
      {showPopup && <UploadProduct onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default AllProducts;
