import StrongLink from '../utils/StrongLink';

const FeedCard = ({ spotifyData, review, rating }) => {
  const { name, artists, external_urls } = spotifyData;

  return (
    <section className='mt-6 flex items-start gap-x-4 pb-6 border-b border-gray-700'>
      <figure className='bg-[url("/profile.jpeg")] bg-cover bg-center w-24 aspect-square rounded-full'></figure>
      <div className='flex-grow'>
        <p className='font-thin mb-4'>
          <StrongLink>User abcdef12345</StrongLink> {rating}d{' '}
          <StrongLink url={external_urls.spotify}>{name}</StrongLink> by{' '}
          <StrongLink url={external_urls.spotify}>{artists[0].name}</StrongLink>
        </p>
        {review !== '' && (
          <blockquote className='text-sm bg-gray-700 py-3 px-4 rounded-3xl font-light'>
            {review}
          </blockquote>
        )}
      </div>
    </section>
  );
};

export default FeedCard;
