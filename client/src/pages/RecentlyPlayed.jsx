import SongCard from '../components/SongCard';

const RecentlyPlayed = () => {
  const spanStyles = 'bg-green-300 text-gray-800 font-semibold';

  return (
    <>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-green-300 mb-4'>
          What you're listening to
        </h1>
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
      <SongCard />
    </>
  );
};

export default RecentlyPlayed;
