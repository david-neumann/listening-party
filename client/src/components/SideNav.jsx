import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { Zap, Headphones, Search, User, X, LogOut } from 'react-feather';

const SideNav = () => {
  const { logout } = useContext(UserAuthContext);

  return (
    <nav className='p-24 pl-40 max-h-min transition-all border-r border-gray-700 hidden xl:inline'>
      <h2 className='text-4xl font-bold mb-16 max-w-max text-transparent bg-clip-text bg-gradient-to-tr from-green-300 to-green-600'>
        Listening Party 🎵
      </h2>
      <NavLink to='/'>
        {({ isActive }) => (
          <div
            onClick={() => setShowOverlayNav(false)}
            className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
          >
            <Zap
              size={30}
              strokeWidth={2}
              color={isActive ? '#86efac' : '#f9fafb'}
            />
            <h3
              className={`${isActive && 'text-green-300'} text-2xl font-medium`}
            >
              Activity Feed
            </h3>
          </div>
        )}
      </NavLink>
      <NavLink to='recentlyplayed'>
        {({ isActive }) => (
          <div
            onClick={() => setShowOverlayNav(false)}
            className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
          >
            <Headphones
              size={30}
              strokeWidth={2}
              color={isActive ? '#86efac' : '#f9fafb'}
            />
            <h3
              className={`${isActive && 'text-green-300'} text-2xl font-medium`}
            >
              Recently Played
            </h3>
          </div>
        )}
      </NavLink>
      <NavLink to='search'>
        {({ isActive }) => (
          <div
            onClick={() => setShowOverlayNav(false)}
            className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
          >
            <Search
              size={30}
              strokeWidth={2}
              color={isActive ? '#86efac' : '#f9fafb'}
            />
            <h3
              className={`${isActive && 'text-green-300'} text-2xl font-medium`}
            >
              Search
            </h3>
          </div>
        )}
      </NavLink>
      <NavLink to='profile'>
        {({ isActive }) => (
          <div
            onClick={() => setShowOverlayNav(false)}
            className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
          >
            <User
              size={30}
              strokeWidth={2}
              color={isActive ? '#86efac' : '#f9fafb'}
            />
            <h3
              className={`${isActive && 'text-green-300'} text-2xl font-medium`}
            >
              Profile
            </h3>
          </div>
        )}
      </NavLink>
      <NavLink
        onClick={() => {
          setShowOverlayNav(false);
          logout();
        }}
        to='login'
      >
        <div
          // onClick={() => {
          //   setShowOverlayNav(false);
          //   logout();
          // }}
          className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
        >
          <LogOut size={30} strokeWidth={2} color='#f9fafb' />
          <h3 className='text-2xl font-medium'>Log out</h3>
        </div>
      </NavLink>
    </nav>
  );
};

export default SideNav;
