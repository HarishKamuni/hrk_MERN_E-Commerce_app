import React, { useState } from 'react';
import Role from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeRole = ({ name, email, role, onClose, user_Id, callFuc }) => {
  console.log('user_Id', user_Id);
  const [selectRole, setSelecrRole] = useState(role);
  const updateUserRole = async () => {
    try {
      const res = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_Id,
          role: selectRole,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`user updataed successfully!!`);
        onClose();
        callFuc();
      }
      if (data.error) {
        toast.error(data.message);
        onClose();
      }
    } catch (error) {
      toast.error('Somthing went wrong!!');
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-sm bg-slate-200 bg-opacity-55">
      <div className="mx-auto max-w-sm w-full bg-white p-5 shadow-xl text-center">
        <div className="flex justify-between mb-2 bg-red-200 py-1 px-2 rounded-sm">
          <p className="text-lg font-medium uppercase hover:underline underline-offset-8">
            Change User Role
          </p>
          <button className="hover:text-red-700" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p>Name:{name}</p>
          <p>Email:{email}</p>
          <div className="flex gap-4 justify-center">
            <p>Role:</p>
            <select
              className="border outline-none"
              value={selectRole}
              onChange={(e) => setSelecrRole(e.target.value)}
            >
              {Object.values(Role).map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="block mx-auto border rounded-full py-1 px-3 mt-2 bg-red-300 hover:bg-red-700 hover:text-white capitalize"
            onClick={updateUserRole}
          >
            change role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;
