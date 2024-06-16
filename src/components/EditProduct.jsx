import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ProductCategory from '../helpers/ProductCategory';
import { IoCloudUpload } from 'react-icons/io5';
import uploadImage from '../helpers/uploadImage';
import ProductPopup from './ProductPopup';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const EditProduct = ({ onClose, data, fetchAllProduct }) => {
  const [productForm, setProductForm] = useState({
    ...data,
    productName: data.productName,
    barndName: data.barndName,
    category: data.category,
    productImage: [...data.productImage],
    description: data.description,
    price: data.price,
    selling: data.selling,
  });
  console.log(data);
  const [openPopup, setOpenPopup] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setProductForm((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProduct = (index) => {
    console.log('index', index);
    const tempData = [...productForm.productImage];
    tempData.splice(index, 1);
    setProductForm((prev) => {
      return {
        ...prev,
        productImage: [...tempData],
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productForm),
    });
    const data = await res.json();
    console.log('updated product', data);
    if (data.success) {
      toast.success(data.message);
      onClose();
      fetchAllProduct();
    }
    if (data.error) {
      toast.error(data.error);
    }
  };
  return (
    <div className="fixed bg-slate-200 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-opacity-40 z-50">
      <div className="bg-white p-4 max-w-2xl w-full rounded h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-lg">Edit Product</h1>
          <button className="hover:text-red-600" onClick={onClose}>
            <IoMdClose size={20} />
          </button>
        </div>
        <form
          className="grid m-2 mt-2 gap-2 h-full hover:overflow-y-scroll transition-all"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={productForm.productName}
            onChange={handleChange}
            className="py-2 px-3 bg-slate-100 outline-none capitalize"
            required
          />
          <label htmlFor="barndName" className="mt-2">
            Barnd Name:
          </label>
          <input
            type="text"
            id="barndName"
            placeholder="Enter Barnd Name"
            name="barndName"
            value={productForm.barndName}
            onChange={handleChange}
            className="py-2 px-3 bg-slate-100 outline-none "
            required
          />
          <label htmlFor="category" className="mt-2">
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={productForm.category}
            className="py-2 px-3 bg-slate-100 outline-none capitalize"
            required
            onChange={handleChange}
          >
            <option value={''}>Select Category</option>
            {ProductCategory.map((items) => (
              <option key={items.id} value={items.value}>
                {items.label}
              </option>
            ))}
          </select>
          <label htmlFor="productImage" className="mt-2">
            <section className="bg-slate-100 flex justify-center items-center h-32 cursor-pointer">
              <span className="flex justify-center items-center flex-col gap-2 text-slate-400 hover:text-slate-600">
                <IoCloudUpload size={40} />
                <p className="text-sm">Upload Image</p>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </span>
            </section>
          </label>
          <div className="my-2 flex items-center gap-2 flex-wrap ">
            {productForm?.productImage[0] ? (
              productForm?.productImage.map((items, index) => (
                <div className="relative">
                  <img
                    src={items}
                    alt={items}
                    key={items}
                    width={80}
                    height={80}
                    className="bg-slate-200 border rounded-md max-h-[80px] max-w-[100px] cursor-pointer"
                    onClick={() => {
                      setOpenPopup(true);
                      setImgUrl(items);
                    }}
                  />
                  <span
                    className="absolute bottom-1 left-16  rounded-sm hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    <MdDelete />
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-red-500">
                *Please Upload Product Image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            name="price"
            value={productForm.price}
            onChange={handleChange}
            className="py-2 px-3 bg-slate-100 outline-none "
            required
          />
          <label htmlFor="selling" className="mt-2">
            Selling Price:
          </label>
          <input
            type="number"
            id="selling"
            placeholder="Selling Price"
            name="selling"
            value={productForm.selling}
            onChange={handleChange}
            className="py-2 px-3 bg-slate-100 outline-none "
          />
          <label htmlFor="description" className="mt-2">
            Description:
          </label>
          <textarea
            placeholder="enter product description"
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="h-28 bg-slate-100 resize-none mb-2 p-2 outline-none"
            onChange={handleChange}
            value={productForm.description}
          ></textarea>
          <button
            type="submit"
            className="mb-10 bg-red-500  py-2 rounded-md text-white text-lg  hover:bg-red-600  transition-all"
          >
            Update Product
          </button>
        </form>
      </div>
      {openPopup && (
        <ProductPopup onClose={() => setOpenPopup(false)} imgUrl={imgUrl} />
      )}
    </div>
  );
};

export default EditProduct;
