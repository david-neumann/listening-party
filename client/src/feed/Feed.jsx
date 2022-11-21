import { useContext } from 'react';
import { UserContext } from '../userContext';
import FeedCard from './FeedCard';
import PageTitle from '../utils/PageTitle';

const Feed = () => {
  const { userFeed, allUsers } = useContext(UserContext);
  console.log(userFeed);

  const renderedFeedCards = userFeed.map((item, index) => (
    <FeedCard key={index} {...item} allUsers={allUsers} />
  ));

  return (
    <>
      <PageTitle marginBottom={8}>Activity Feed</PageTitle>
      {renderedFeedCards.length > 0 ? (
        <main>{renderedFeedCards}</main>
      ) : (
        <p>Start rating songs or follow other users to see content here!</p>
      )}
    </>
  );
};

export default Feed;
