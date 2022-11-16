import { useContext } from 'react';
import ProfileCard from './ProfileCard';
import ProfileTile from './ProfileTile';
import PageTitle from '../utils/PageTitle';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { LogOut } from 'react-feather';

const Profile = () => {
  const { logout } = useContext(UserAuthContext);

  return (
    <>
      <header className='flex justify-between items-center mb-8'>
        <PageTitle>My Profile</PageTitle>
        <LogOut color='#f9fafb' onClick={logout} className='cursor-pointer' />
      </header>
      <ProfileCard />
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
