import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummeryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const res = await fetch(SummeryApi.currentUser.url, {
      method: SummeryApi.currentUser.method,
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      dispatch(setUserDetails(data.data));
    }
    // console.log(data);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-116px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
