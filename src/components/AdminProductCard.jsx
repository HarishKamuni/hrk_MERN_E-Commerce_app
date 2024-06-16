import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import EditProduct from './EditProduct';

const AdminProductCard = ({ data, index, fetchAllProduct }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleEditProduct = () => {
    setOpenPopup(true);
  };

  return (
    <>
      <div className="flex flex-col gap-1 items-center justify-center bg-white p-2 shadow-md rounded-md">
        <div className="min-w-[180px] min-h-[200px] flex flex-col p-2 items-center relative">
          <img
            src={data.productImage[0]}
            alt="productImage"
            width={120}
            height={120}
            className=" object-contain"
          />
          <p className="text-center">{data.productName}</p>
          <button
            className="bg-red-400 rounded-full w-6 h-6 flex items-center justify-center absolute bottom-0 right-0"
            onClick={handleEditProduct}
          >
            <MdModeEditOutline />
          </button>
        </div>
      </div>
      {openPopup && (
        <EditProduct
          onClose={() => setOpenPopup(false)}
          data={data}
          key={index}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </>
  );
};

export default AdminProductCard;
