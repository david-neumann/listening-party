import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import OverlayNav from './components/OverlayNav';
import SideNav from './components/SideNav';

const Home = () => {
  const [showOverlayNav, setShowOverlayNav] = useState(false);

  const getWindowWidth = () => {
    const { innerWidth } = window;
    return innerWidth;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => setWindowWidth(getWindowWidth());
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='min-h-full transition-all flex gap-x-20'>
      <SideNav />
      <div className='px-6 pt-12 pb-24 mx-auto max-w-[500px] sm:max-w-[600px] transition-all md:pt-14 xl:mx-0'>
        <Outlet context={{ showOverlayNav, setShowOverlayNav }} />
      </div>
      <BottomNav />
      {showOverlayNav && <OverlayNav setShowOverlayNav={setShowOverlayNav} />}
    </div>
  );
};

export default Home;
