import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SpotifyContext } from '../spotifyContext';
import { UserContext } from '../userContext';
import SongCard from './SongCard';
import ReviewModal from './ReviewModal';
import PageTitle from '../utils/PageTitle';
import { Menu } from 'react-feather';

const RecentlyPlayed = () => {
  const { setShowSideNav } = useOutletContext();
  const { recentlyPlayed } = useContext(SpotifyContext);
  const { addLikedSong, addDislikedSong, userRatedTrackIds } =
    useContext(UserContext);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingText, setRatingText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedSongData, setSelectedSongData] = useState({});

  const checkIfRated = recentlyPlayed.map(song => {
    const foundTrack = userRatedTrackIds.find(
      ratedSong => ratedSong.id === song.track.id
    );
    return foundTrack ? { ...song, userRating: foundTrack.rating } : song;
  });

  const renderedRecentlyPlayed = checkIfRated.map((song, index) => (
    <SongCard
      key={index}
      {...song}
      setShowReviewModal={setShowReviewModal}
      setSelectedSongData={setSelectedSongData}
      setRatingText={setRatingText}
    />
  ));

  return (
    <>
      <header className='flex justify-between md:mb-4'>
        <PageTitle marginBottom={8}>What you're listening to</PageTitle>
        <Menu
          size={44}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowSideNav(true)}
          className='bg-gray-700 p-2 rounded-xl hover:bg-gray-900 cursor-pointer hidden md:inline'
        />
      </header>
      <main>{renderedRecentlyPlayed}</main>
      {showReviewModal && (
        <ReviewModal
          setShowReviewModal={setShowReviewModal}
          selectedSongData={selectedSongData}
          ratingText={ratingText}
          reviewText={reviewText}
          setReviewText={setReviewText}
          addLikedSong={addLikedSong}
          addDislikedSong={addDislikedSong}
        />
      )}
    </>
  );
};

export default RecentlyPlayed;
