import { useState } from 'react';
import { X } from 'react-feather';

const ReviewModal = ({
  setShowReviewModal,
  selectedSongData,
  ratingText,
  reviewText,
  setReviewText,
  addLikedSong,
  addDislikedSong,
}) => {
  const { name, artists } = selectedSongData;

  const [showReviewInput, setShowReviewInput] = useState(false);

  const handleChange = e => {
    const { value } = e.target;
    setReviewText(value);
  };

  const addReview = () => {
    setShowReviewInput(true);
  };

  const dontAddReview = () => {
    setShowReviewModal(false);
  };

  const saveSongRating = () => {
    if (ratingText === 'like') {
      addLikedSong(selectedSongData, reviewText);
    } else if (ratingText === 'dislike') {
      addDislikedSong(selectedSongData, reviewText);
    }
    setShowReviewModal(false);
  };

  return (
    <div className='fixed top-0 w-screen h-full -mx-6 z-0 bg-black/80'>
      <div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[500px]
        p-6 bg-gray-700 rounded-2xl'
      >
        <X
          color='#f9fafb'
          size={40}
          strokeWidth={2}
          className='fixed -top-2 -right-2 p-2 bg-gray-800 hover:bg-gray-900 cursor-pointer rounded-2xl'
          onClick={() => setShowReviewModal(false)}
        />
        <p className='mb-4 font-light'>
          You've {ratingText}d{' '}
          <span className='font-bold text-green-300'>{name}</span> by{' '}
          <span className='font-bold text-green-300'>{artists[0].name}</span>.
          Would you like to add a short review?
        </p>
        {!showReviewInput && (
          <div className='flex justify-center items-center gap-x-4'>
            <span
              onClick={addReview}
              className='py-[6px] w-16 text-center bg-green-300 text-gray-800 rounded-xl hover:bg-green-400 cursor-pointer'
            >
              Yes
            </span>
            <span
              onClick={dontAddReview}
              className='py-[6px] w-16 text-center bg-green-300 text-gray-800 rounded-xl hover:bg-green-400 cursor-pointer'
            >
              No
            </span>
          </div>
        )}
        {showReviewInput && (
          <div>
            <textarea
              name='reviewText'
              value={reviewText}
              onChange={handleChange}
              maxLength={280}
              className='w-full h-[170px] rounded-xl mb-4 p-3 text-sm text-gray-800 resize-none'
            ></textarea>
            <button
              onClick={saveSongRating}
              className='w-full py-2 bg-green-300 text-gray-800 font-medium rounded-xl hover:bg-green-400'
            >
              Save Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
