import StrongLink from '../utils/StrongLink';

const FeedCard = ({ spotifyData, review, rating, user, allUsers }) => {
  const { name, artists, external_urls } = spotifyData;
  const username = allUsers.filter(item => item._id === user)[0].username;

  return (
    <section className='mt-6 min-w-full flex gap-x-4 pb-6 border-b border-gray-700'>
      <figure
        className={`bg-gray-400 bg-cover bg-center w-16 h-16 rounded-full shrink-0`}
      ></figure>
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
