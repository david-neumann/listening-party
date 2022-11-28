import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';

const Home = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className='min-h-full transition-all'>
      <div className='p-6 pb-24 mx-auto max-w-[500px] sm:max-w-[600px] transition-all md:pt-10'>
        <Outlet context={{ showSideNav, setShowSideNav }} />
      </div>
      <BottomNav />
      {showSideNav && <SideNav setShowSideNav={setShowSideNav} />}
    </div>
  );
};

export default Home;
