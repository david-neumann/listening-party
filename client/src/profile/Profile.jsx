import { useContext } from 'react';
import ProfileCard from './ProfileCard';
import ProfileTile from './ProfileTile';
import PageTitle from '../utils/PageTitle';
import { UserAuthContext } from '../userAuth/userAuthContext';
import { UserContext } from '../userContext';
import { LogOut } from 'react-feather';

const Profile = () => {
  const { logout } = useContext(UserAuthContext);
  const { allUsers } = useContext(UserContext);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { _id } = currentUser;
  const currentUserData = allUsers.filter(user => user._id === _id)[0];

  return (
    <>
      <header className='flex justify-between items-center mb-8'>
        <PageTitle>My Profile</PageTitle>
        <LogOut color='#f9fafb' onClick={logout} className='cursor-pointer' />
      </header>
      <ProfileCard currentUserData={currentUserData} />
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
