import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeRole from '../components/ChangeRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editUserDetail, setEditUserDetail] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });
  // console.log(allUsers);
  const fetchData = async () => {
    try {
      const res = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setAllUsers(data.data);
      }
      if (data.error) {
        toast.error(data.message);
      }
      // console.log('dataRespons', data);
    } catch (error) {
      console.log(error);
    }
  };
  const onClose = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full p-5">
      <table className=" border-collapse border border-slate-400 w-full">
        <thead>
          <tr className="border-collapse border border-slate-400 bg-black text-white">
            <th className='className="border-collapse border border-slate-400'>
              Sr.
            </th>
            <th className='className="border-collapse border border-slate-400'>
              Name
            </th>
            <th className='className="border-collapse border border-slate-400'>
              Email ID
            </th>
            <th className='className="border-collapse border border-slate-400'>
              Role
            </th>
            <th className='className="border-collapse border border-slate-400'>
              Created Date
            </th>
            <th className='className="border-collapse border border-slate-400'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, idx) => {
            return (
              <tr
                key={idx}
                className='className="border-collapse border border-slate-400 text-center'
              >
                <td className='className="border-collapse border border-slate-400'>
                  {idx + 1}
                </td>
                <td className='className="border-collapse border border-slate-400'>
                  {item.name}
                </td>
                <td className='className="border-collapse border border-slate-400'>
                  {item.email}
                </td>
                <td className='className="border-collapse border border-slate-400'>
                  {item.role}
                </td>
                <td className='className="border-collapse border border-slate-400'>
                  {moment(item.createdAt).format('LL')}
                </td>
                <td className='className="border-collapse border border-slate-400'>
                  <button
                    className="bg-green-200 rounded-full p-1 hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setEditUserDetail(item), setShowPopup(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showPopup && (
        <ChangeRole
          onClose={onClose}
          name={editUserDetail.name}
          email={editUserDetail.email}
          role={editUserDetail.role}
          user_Id={editUserDetail._id}
          callFuc={fetchData}
        />
      )}
    </div>
  );
};

export default AllUsers;
