import FeedCard from '../components/FeedCard';
import PageTitle from '../components/PageTitle';

const Feed = () => {
  return (
    <>
      <PageTitle marginBottom={8}>Activity Feed</PageTitle>
      <FeedCard hasReview={true} />
      <FeedCard hasReview={false} />
      <FeedCard hasReview={true} />
      <FeedCard hasReview={true} />
      <FeedCard hasReview={false} />
    </>
  );
};

export default Feed;
