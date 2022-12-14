import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import PageTitle from '../utils/PageTitle';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { LogOut, Menu } from 'react-feather';

const Profile = () => {
  const { setShowOverlayNav } = useOutletContext();
  const { logout, userAuthState } = useContext(UserAuthContext);

  return (
    <>
      <header className='flex justify-between items-center mb-8'>
        <PageTitle>My Profile</PageTitle>
        <LogOut
          color='#f9fafb'
          onClick={logout}
          className='cursor-pointer md:hidden'
        />
        <Menu
          size={44}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowOverlayNav(true)}
          className='bg-gray-700 p-2 rounded-xl hover:bg-gray-900 cursor-pointer hidden md:inline xl:hidden'
        />
      </header>
      {userAuthState && <ProfileCard currentUserData={userAuthState.user} />}
    </>
  );
};

export default Profile;
