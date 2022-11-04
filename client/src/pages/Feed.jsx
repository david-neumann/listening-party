import FeedCard from '../components/FeedCard';

const Feed = () => {
  return (
    <>
      <h1 className='text-3xl font-bold text-green-300 mb-8'>Activity Feed</h1>
      <FeedCard hasReview={true} />
      <FeedCard hasReview={false} />
      <FeedCard hasReview={true} />
      <FeedCard hasReview={true} />
      <FeedCard hasReview={false} />
    </>
  );
};

export default Feed;
