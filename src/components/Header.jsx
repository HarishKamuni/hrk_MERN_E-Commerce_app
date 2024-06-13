import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/slices/userSlice';
import SummaryApi from '../common';
import ROLE from '../common/role';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [displayMenu, setDisplayMenu] = useState(false);
  const dispatch = useDispatch();
  // console.log(user);
  const handleSignOut = async () => {
    const res = await fetch(SummaryApi.signOut.url, {
      method: SummaryApi.signOut.method,
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white ">
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
          <div
            className="relative flex justify-center "
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            {user?._id && (
              <div className="text-3xl cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                ) : (
                  <FaCircleUser />
                )}
              </div>
            )}

            {user?.role === ROLE.ADMIN && (
              <span className="absolute top-0 left-5 bg-red-700 w-3 h-3 rounded-full border-2"></span>
            )}

            {displayMenu && user?.role === ROLE.ADMIN && (
              <>
                <div className="hidden md:block absolute bottom-0 top-12 bg-white h-fit p-2 shadow-lg rounded  ">
                  <nav>
                    <Link
                      to={'/admin-panel/all-products'}
                      className=" whitespace-nowrap hover:bg-slate-100 p-2"
                    >
                      Admin Panel
                    </Link>
                  </nav>
                </div>
              </>
            )}
          </div>
          <div className="flex relative">
            <span className="text-2xl">
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 flex items-center justify-center text-xs w-5 h-5 rounded-full text-white absolute -top-2 -right-3">
              0
            </div>
          </div>
          {user?._id ? (
            <Link
              to={'/'}
              onClick={handleSignOut}
              className="bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700 cursor-pointer capitalize"
            >
              Logout
            </Link>
          ) : (
            <Link
              to={'/login'}
              className="bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700 cursor-pointer capitalize"
            >
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
