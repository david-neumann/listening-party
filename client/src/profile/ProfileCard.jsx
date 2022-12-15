import { Link } from 'react-router-dom';
import { User } from 'react-feather';

const ProfileCard = ({ currentUserData }) => {
  const { username, followers, following, createdAt, profileImgUrl } =
    currentUserData;
  const joinDate = new Date(createdAt).toLocaleDateString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section>
      <div className='flex gap-x-4 mb-10'>
        {profileImgUrl ? (
          <img
            src={profileImgUrl}
            alt='profile image'
            className='w-24 rounded-full'
          />
        ) : (
          <User
            size={72}
            strokeWidth={2}
            color='#1f2937'
            className={`rounded-full bg-green-300 shrink-0`}
          />
        )}
        <div className=''>
          <h2 className='text-2xl font-semibold'>{username}</h2>
          <p className=''>Joined {joinDate}</p>
          <p className='font-mono text-xs text-green-300'>
            <strong>{followers.length}</strong> followers •{' '}
            <strong>{following.length}</strong> following
          </p>
        </div>
      </div>
      <button className='w-full py-2 bg-green-300 text-gray-800 font-medium rounded-2xl'>
        <Link to='/profile/edit'>Edit Profile</Link>
      </button>
    </section>
  );
};

export default ProfileCard;
