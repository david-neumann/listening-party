import { NavLink } from 'react-router-dom';
import { Zap, Headphones, Search, User } from 'react-feather';

const BottomNav = () => {
  return (
    <nav className='fixed bottom-0 left-0 w-full z-20 flex justify-around py-6 border-t border-gray-50 bg-gray-800 md:hidden'>
      <NavLink to='/'>
        {({ isActive }) => (
          <Zap
            size={32}
            strokeWidth={2}
            color={isActive ? '#86efac' : '#f9fafb'}
            className='p-1 rounded-lg hover:bg-gray-700'
          />
        )}
      </NavLink>
      <NavLink to='recentlyplayed'>
        {({ isActive }) => (
          <Headphones
            size={32}
            strokeWidth={2}
            color={isActive ? '#86efac' : '#f9fafb'}
            className='p-1 rounded-lg hover:bg-gray-700'
          />
        )}
      </NavLink>
      <NavLink to='search'>
        {({ isActive }) => (
          <Search
            size={32}
            strokeWidth={2}
            color={isActive ? '#86efac' : '#f9fafb'}
            className='p-1 rounded-lg hover:bg-gray-700'
          />
        )}
      </NavLink>
      <NavLink to='profile'>
        {({ isActive }) => (
          <User
            size={32}
            strokeWidth={2}
            color={isActive ? '#86efac' : '#f9fafb'}
            className='p-1 rounded-lg hover:bg-gray-700'
          />
        )}
      </NavLink>
    </nav>
  );
};

export default BottomNav;
