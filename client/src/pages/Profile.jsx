import ProfileCard from '../components/ProfileCard';
import ProfileTile from '../components/ProfileTile';
import PageTitle from '../components/PageTitle';

const Profile = () => {
  return (
    <>
      <PageTitle marginBottom={8}>My Profile</PageTitle>
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
