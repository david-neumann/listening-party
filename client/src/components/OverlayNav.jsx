import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { Zap, Headphones, Search, User, X, LogOut } from 'react-feather';

const OverlayNav = ({ setShowOverlayNav }) => {
  const { logout } = useContext(UserAuthContext);

  return (
    <div className='fixed top-0 w-full h-full bg-black/70 transition-all'>
      <nav className='fixed top-0 right-0 h-full bg-gray-800 w-5/12 pt-24 pl-6 transition-all'>
        <X
          size={40}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowOverlayNav(false)}
          className='fixed p-2 top-4 right-4 cursor-pointer rounded-xl hover:bg-gray-700'
        />
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
                className={`${
                  isActive && 'text-green-300'
                } text-2xl font-medium`}
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
                className={`${
                  isActive && 'text-green-300'
                } text-2xl font-medium`}
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
                className={`${
                  isActive && 'text-green-300'
                } text-2xl font-medium`}
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
                className={`${
                  isActive && 'text-green-300'
                } text-2xl font-medium`}
              >
                Profile
              </h3>
            </div>
          )}
        </NavLink>
        <NavLink to='login'>
          <div
            onClick={() => {
              setShowOverlayNav(false);
              logout();
            }}
            className='flex gap-x-6 items-center max-w-max mb-6 p-2 rounded-xl hover:bg-gray-700 transition-all'
          >
            <LogOut size={30} strokeWidth={2} color='#f9fafb' />
            <h3 className='text-2xl font-medium'>Log out</h3>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default OverlayNav;
