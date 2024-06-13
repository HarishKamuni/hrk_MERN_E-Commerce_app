import React, { useContext, useState } from 'react';
import signin from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryApi from '../common';

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const { fetchUserDetails } = useContext(Context);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    const res = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      navigate('/');
      fetchUserDetails();
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <section id="login">
      <div className="container mx-auto p-5">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-sm">
          <div className="mx-auto w-20 h-20">
            <img src={signin} alt="login icon" className="rounded-full" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-5 pt-2 flex flex-col gap-4"
          >
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
                />
              </div>
              <Link
                to={'/forgot-password'}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 py-2 text-white text-lg font-serif uppercase my-3 rounded-sm hover:bg-red-700 "
            >
              Login
            </button>

            <p>
              Don't have account?
              <Link
                to={'/sign-up'}
                className="pl-2 hover:underline hover:text-gray-600"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
