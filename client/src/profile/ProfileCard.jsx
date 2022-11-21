const ProfileCard = ({ currentUserData }) => {
  const { username, followers, following, createdAt } = currentUserData;
  const joinDate = new Date(createdAt).toLocaleDateString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <div className='flex gap-x-4 mb-6'>
        <figure className="bg-[url('/profile.jpeg')] bg-cover bg-center w-24 aspect-square rounded-full"></figure>
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
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
