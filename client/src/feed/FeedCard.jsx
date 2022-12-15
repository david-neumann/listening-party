import StrongLink from '../utils/StrongLink';
import { User } from 'react-feather';

const FeedCard = ({ spotifyData, review, rating, user, allUsers }) => {
  const { name, artists, external_urls } = spotifyData;

  const postUser = allUsers.filter(item => item._id === user)[0];
  const { username, profileImgUrl } = postUser;

  return (
    <section className='mt-6 min-w-full flex gap-x-4 pb-6 border-b border-gray-700'>
      {profileImgUrl ? (
        <img
          src={profileImgUrl}
          alt='profile image'
          className='w-16 h-16 rounded-full shrink-0'
        />
      ) : (
        <User
          size={64}
          strokeWidth={2}
          color='#1f2937'
          className={`shrink-0 rounded-full bg-green-300`}
        />
      )}
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
