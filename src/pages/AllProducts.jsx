import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProducts = async () => {
    const res = await fetch(SummaryApi.allProducts.url, {
      method: SummaryApi.allProducts.method,
      credentials: 'include',
    });
    const { data } = await res.json();

    setAllProduct(data || []);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="m-2 bg-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="font-medium text-lg ">All Products</h1>
        <button
          className="border-2 border-red-400 py-1 px-3 rounded-2xl text-red-400 hover:bg-red-600 hover:text-white transition-all"
          onClick={() => setShowPopup(true)}
        >
          Upload Product
        </button>
      </div>
      {/* All Products */}
      <div className="p-4 flex items-center gap-3 flex-wrap">
        {allProduct.map((item, i) => (
          <AdminProductCard
            data={item}
            key={i}
            index={i}
            fetchAllProduct={fetchAllProducts}
          />
        ))}
      </div>
      {showPopup && (
        <UploadProduct
          onClose={() => setShowPopup(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
