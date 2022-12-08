import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import ProfileTile from './ProfileTile';
import PageTitle from '../utils/PageTitle';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { UserContext } from '../userContext';
import { LogOut, Menu } from 'react-feather';

const Profile = () => {
  const { setShowSideNav } = useOutletContext();
  const { logout } = useContext(UserAuthContext);
  const { currentUserData } = useContext(UserContext);

  return (
    <>
      <header className='flex justify-between items-center mb-8'>
        <PageTitle>My Profile</PageTitle>
        <LogOut color='#f9fafb' onClick={logout} className='cursor-pointer' />
      </header>
      {currentUserData && <ProfileCard currentUserData={currentUserData} />}
      <div>
        <ProfileTile />
        <ProfileTile />
        <ProfileTile />
        <ProfileTile />
      </div>
    </>
  );
};

export default Profile;
