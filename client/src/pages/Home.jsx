import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Home = () => {
  return (
    <div className='flex flex-col min-h-full'>
      <main className='p-6 pb-24'>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Home;
