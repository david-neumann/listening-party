import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import SongCard from './SongCard';
import ReviewModal from './ReviewModal';
import PageTitle from '../utils/PageTitle';

const RecentlyPlayed = () => {
  const { getRecentlyPlayed, recentlyPlayed } = useContext(UserContext);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingText, setRatingText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedSongData, setSelectedSongData] = useState({
    songTitle: '',
    artistName: '',
    albumName: '',
    releaseYear: '',
    songDuration: '',
  });

  const renderedRecentlyPlayed = recentlyPlayed.map((song, index) => (
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
        />
      )}
    </>
  );
};

export default RecentlyPlayed;
