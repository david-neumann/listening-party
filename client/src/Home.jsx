import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';

const Home = () => {
  return (
    <div className='flex flex-col min-h-full'>
      <div className='p-6 pb-24'>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
