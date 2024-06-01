import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container flex justify-between items-center mx-auto px-4">
        <div className="mx-3">
          <Link to={'/'}>LOGO</Link>
        </div>
        <div className="hidden lg:flex items-center justify-between w-full max-w-sm rounded-full focus-within:shadow-sm">
          <input
            placeholder="search product here..."
            type="text"
            className="w-full outline-none pl-4 border h-8 rounded-l-full"
          />
          <span className="bg-red-600 text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full">
            <IoSearchOutline size={20} className="" />
          </span>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaCircleUser />
          </div>
          <div className="flex relative">
            <span className="text-2xl">
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 flex items-center justify-center text-xs w-5 h-5 rounded-full text-white absolute -top-2 -right-3">
              0
            </div>
          </div>
          <Link
            to={'/login'}
            className="bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700 cursor-pointer capitalize"
          >
            login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
