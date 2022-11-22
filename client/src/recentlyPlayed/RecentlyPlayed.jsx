import { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../spotifyContext';
import { UserContext } from '../userContext';
import SongCard from './SongCard';
import ReviewModal from './ReviewModal';
import PageTitle from '../utils/PageTitle';

const RecentlyPlayed = () => {
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
      <header className='mb-8'>
        <PageTitle marginBottom={4}>What you're listening to</PageTitle>
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
