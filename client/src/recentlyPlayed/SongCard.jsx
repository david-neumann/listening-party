import { ThumbsUp, ThumbsDown } from 'react-feather';

const SongCard = ({
  track,
  setSelectedSongData,
  setShowReviewModal,
  setRatingText,
}) => {
  const { album, artists, name, duration_ms, external_urls } = track;
  const { url } = album.images[0];
  const { release_date } = album;
  const releaseYear = new Date(release_date).getFullYear();

  const convertMsToMinSec = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const songLength = convertMsToMinSec(duration_ms);

  const rateSong = ratingText => {
    setRatingText(ratingText);
    setSelectedSongData({
      songTitle: name,
      artistName: artists[0].name,
      albumName: album.name,
      releaseYear,
      songDuration: duration_ms,
    });
    setShowReviewModal(true);
  };

  return (
    <section className='bg-gray-700 p-4 rounded-5xl mb-4'>
      <div className='flex gap-x-4 pb-4 mb-4 border-b border-gray-800'>
        <img
          src={url}
          alt='album cover'
          className={`h-24 aspect-square rounded shadow-md`}
        />
        <div>
          <h2 className='text-xl font-bold'>{name}</h2>
          <p className='font-medium text-xl text-green-300'>
            {artists[0].name}
          </p>
          <p className='font-light text-sm'>{album.name}</p>
          <span className='font-mono text-xs text-green-300'>
            {releaseYear} • {songLength}
          </span>
        </div>
      </div>
      <div className='flex items-center justify-around'>
        <ThumbsUp
          size={40}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => rateSong('like')}
          className='p-2 rounded-2xl hover:bg-green-500 cursor-pointer'
        />
        <ThumbsDown
          size={40}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => rateSong('dislike')}
          className='p-2 rounded-2xl cursor-pointer hover:bg-red-500'
        />
        <a
          href={external_urls.spotify}
          target='_blank'
          rel='noreferrer noopener'
        >
          <img src='/spotify_icon.svg' alt='Spotify icon' className='w-8' />
        </a>
      </div>
    </section>
  );
};

export default SongCard;
