import React, { useState } from 'react';
import signin from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageTobase64';
import SummeryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const imageURL = await imageToBase64(file);
    setInputData((prev) => {
      return {
        ...prev,
        profilePic: imageURL,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    if (inputData.password === inputData.confirmPassword) {
      const res = await fetch(SummeryApi.signUp.url, {
        method: SummeryApi.signUp.method,
        headers: {
          'content-type': 'application/json',
        },

        body: JSON.stringify(inputData),
      });
      const data = await res.json();
      console.log(data?.profilePic);
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      }
      if (data.error) {
        toast.error(data.message);
      }

      // console.log('data:', data.message);
    } else {
      console.log('please check password');
    }
  };
  return (
    <section id="login">
      <div className="container mx-auto p-5">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-sm">
          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden relative">
            <div>
              <img src={inputData.profilePic || signin} alt="login icon" />
            </div>
            <form>
              <label>
                4
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                <div className="text-center text-xs bg-slate-300 absolute bottom-0 pb-2 pt-1 w-full opacity-55 cursor-pointer px-1 hover:font-bold">
                  Upload Image
                </div>
              </label>
            </form>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-5 pt-2 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name :</label>
              <div className="bg-slate-100">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full bg-transparent py-2 pl-2 outline-none rounded-sm"
                  name="name"
                  value={inputData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email :</label>
              <div className="bg-slate-100">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full bg-transparent py-2 pl-2 outline-none rounded-sm"
                  name="email"
                  value={inputData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password :</label>
              <div className="bg-slate-100">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full bg-transparent py-2 pl-2 outline-none rounded-sm"
                  name="password"
                  value={inputData.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Confirm Password :</label>
              <div className="bg-slate-100">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-transparent py-2 pl-2 outline-none rounded-sm"
                  name="confirmPassword"
                  value={inputData.confirmPassword}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 py-2 text-white text-lg font-serif uppercase my-3 rounded-sm hover:bg-red-700 "
            >
              Sign Up
            </button>

            <p>
              Already have account?
              <Link
                to={'/login'}
                className="pl-2 hover:underline hover:text-gray-600"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
