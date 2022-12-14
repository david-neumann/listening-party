import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import OverlayNav from './components/OverlayNav';
import SideNav from './components/SideNav';

const Home = () => {
  const [showOverlayNav, setShowOverlayNav] = useState(false);

  return (
    <div className='min-h-full transition-all flex gap-x-20'>
      <SideNav />
      <div className='px-6 pt-12 pb-24 mx-auto w-[500px] transition-all md:pt-14 md:w-[600px] xl:w-[500px] xl:mx-0'>
        <Outlet context={{ showOverlayNav, setShowOverlayNav }} />
      </div>
      <BottomNav />
      {showOverlayNav && <OverlayNav setShowOverlayNav={setShowOverlayNav} />}
    </div>
  );
};

export default Home;
