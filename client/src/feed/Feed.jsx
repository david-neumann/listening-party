import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { UserContext } from '../userContext';
import FeedCard from './FeedCard';
import PageTitle from '../utils/PageTitle';
import { Menu } from 'react-feather';

const Feed = () => {
  const { setShowSideNav } = useOutletContext();
  const { userFeed, allUsers } = useContext(UserContext);
  const renderedFeedCards = userFeed.map((item, index) => (
    <FeedCard key={index} {...item} allUsers={allUsers} />
  ));

  return (
    <>
      <header className='flex justify-between'>
        <PageTitle marginBottom={8}>Activity Feed</PageTitle>
        <Menu
          size={44}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowSideNav(true)}
          className='bg-gray-700 p-2 rounded-xl hover:bg-gray-900 cursor-pointer hidden md:inline'
        />
      </header>
      {renderedFeedCards.length > 0 ? (
        <main>{renderedFeedCards}</main>
      ) : (
        <p>Start rating songs or follow other users to see content here!</p>
      )}
    </>
  );
};

export default Feed;
