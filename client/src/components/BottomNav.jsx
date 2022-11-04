import { Zap, Headphones, Search, User } from 'react-feather';

const BottomNav = () => {
  return (
    <nav className='fixed bottom-0 left-0 w-full flex justify-around py-6 border-t border-gray-50 bg-gray-800'>
      <Zap size={26} strokeWidth={2} color='#86efac' fill='#86efac' />
      <Headphones size={26} strokeWidth={2} color='#f9fafb' />
      <Search size={26} strokeWidth={2} color='#f9fafb' />
      <User size={26} strokeWidth={2} color='#f9fafb' />
    </nav>
  );
};

export default BottomNav;
