import StrongLink from './StrongLink';

const FeedCard = ({ hasReview }) => {
  return (
    <section className='mt-6 flex items-start gap-x-4 pb-6 border-b border-gray-700'>
      <figure className='bg-[url("/profile.jpeg")] bg-cover bg-center w-24 aspect-square rounded-full'></figure>
      <div className='flex-grow'>
        <p className='font-thin mb-4'>
          <StrongLink>User abcdef12345</StrongLink> liked{' '}
          <StrongLink>Texas Sun</StrongLink> by{' '}
          <StrongLink>Leon Bridges and Khruangbin</StrongLink>
        </p>
        {hasReview && (
          <blockquote className='text-sm bg-gray-700 py-3 px-4 rounded-3xl font-light'>
            OMG can't stop listening to this song!
          </blockquote>
        )}
      </div>
    </section>
  );
};

export default FeedCard;
