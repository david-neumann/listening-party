import { User } from 'react-feather';

const UserCard = ({ username }) => {
  return (
    <div className='flex items-center bg-gray-700 rounded-lg p-2'>
      <User
        size={40}
        strokeWidth={2}
        color='#1f2937'
        className='bg-green-300 rounded-full mr-3'
      />
      <p>{username}</p>
      <button className='ml-auto p-2 bg-green-300 hover:bg-green-400 text-gray-800 rounded-xl'>
        Follow
      </button>
    </div>
  );
};

export default UserCard;
