import { ThumbsUp, ThumbsDown } from 'react-feather';

const SongCard = () => {
  return (
    <section className='bg-gray-700 p-4 rounded-5xl'>
      <div className='flex gap-x-4 pb-4 mb-4 border-b border-gray-800'>
        <figure className='bg-[url("https://i.scdn.co/image/ab67616d0000b2735748f08c2f486af49af1f817")] bg-cover bg-center w-24 aspect-square rounded shadow-md'></figure>
        <div>
          <h2 className='text-xl font-bold'>Doors I Painted Shut</h2>
          <p className='font-medium text-xl text-green-300'>The Wonder Years</p>
          <p className='font-light text-sm'>The Hum Goes on Forever</p>
          <span className='font-mono text-xs text-green-300'>2022 • 3:00</span>
        </div>
      </div>
      <div className='flex items-center justify-around'>
        <ThumbsUp size={28} strokeWidth={2} color='#f9fafb' />
        <ThumbsDown size={28} strokeWidth={2} color='#f9fafb' />
        <img src='/spotify_icon.svg' alt='Spotify icon' className='w-8' />
      </div>
    </section>
  );
};

export default SongCard;
