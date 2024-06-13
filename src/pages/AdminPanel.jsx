import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className="flex min-h-[calc(100vh-116px)] w-full">
      <aside className=" min-h-full w-full max-w-60 bg-white customShadow rounded-md">
        <div className="flex flex-col items-center h-32 justify-center bg-red-400 rounded-md">
          <div className="text-5xl cursor-pointer">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-[60px] h-[60px] object-cover rounded-full"
              />
            ) : (
              <FaCircleUser />
            )}
          </div>
          <p className="text-lg font-bold uppercase"> {user?.name}</p>
          <p className="text-sm capitalize"> {user?.role}</p>
        </div>
        {/* Navigation */}
        <div>
          <nav className="grid p-4">
            <Link
              to={'all-users'}
              className="p-2 hover:bg-slate-100 rounded-sm"
            >
              All Users
            </Link>
            <Link
              to={'all-products'}
              className="p-2 hover:bg-slate-100 rounded-sm"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
