import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import SongCard from '../components/SongCard';
import PageTitle from '../components/PageTitle';

const RecentlyPlayed = () => {
  const { getRecentlyPlayed, recentlyPlayed } = useContext(UserContext);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const renderedRecentlyPlayed = recentlyPlayed.map((song, index) => (
    <SongCard key={index} {...song} />
  ));

  const spanStyles = 'bg-green-300 text-gray-800 font-semibold';

  return (
    <>
      <header className='mb-8'>
        <PageTitle marginBottom={4}>What you're listening to</PageTitle>
        <div className='flex gap-x-3 justify-center'>
          <span
            className={`py-2 ${spanStyles} rounded-xl w-[80px] text-center text-sm`}
          >
            Recent
          </span>
          <span className='py-2 bg-gray-700 rounded-xl w-[80px] text-center text-sm'>
            Top
          </span>
        </div>
      </header>
      {renderedRecentlyPlayed}
    </>
  );
};

export default RecentlyPlayed;
