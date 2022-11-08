const ProfileCard = () => {
  return (
    <div>
      <div className='flex gap-x-4 mb-6'>
        <figure className="bg-[url('/profile.jpeg')] bg-cover bg-center w-24 aspect-square rounded-full"></figure>
        <div className=''>
          <h2 className='text-2xl font-semibold'>Username</h2>
          <p className=''>Joined Nov. 2022</p>
          <p className='font-mono text-xs text-green-300'>
            <strong>100</strong> followers • <strong>100</strong> following
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
