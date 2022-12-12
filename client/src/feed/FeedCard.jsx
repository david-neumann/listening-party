import { User } from 'react-feather';
import StrongLink from '../utils/StrongLink';

const FeedCard = ({ spotifyData, review, rating, user, allUsers }) => {
  const { name, artists, external_urls } = spotifyData;
  const username = allUsers.filter(item => item._id === user)[0].username;

  const colorOptions = [
    'bg-green-300',
    'bg-blue-300',
    'bg-violet-300',
    'bg-fuchsia-300',
    'bg-rose-300',
  ];

  const bgColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return (
    <section className='mt-6 min-w-full flex gap-x-4 pb-6 border-b border-gray-700'>
      {/* <figure className={`bg-[url("/profile.jpeg")] bg-cover bg-center w-24 aspect-square rounded-full`}></figure> */}
      <User
        size={52}
        strokeWidth={2}
        color='#1f2937'
        className={`rounded-full ${bgColor} shrink-0`}
      />
      <div className='w-full'>
        <p className='font-thin mb-4 md:text-lg transition-all'>
          <span className='font-bold'>{username}</span> {rating}d{' '}
          <StrongLink url={external_urls.spotify}>{name}</StrongLink> by{' '}
          <span className='font-bold'>{artists[0].name}</span>
        </p>
        {review !== '' && (
          <blockquote className='text-sm bg-gray-700 py-3 px-4 rounded-3xl font-light transition-all md:text-base'>
            {review}
          </blockquote>
        )}
      </div>
    </section>
  );
};

export default FeedCard;
