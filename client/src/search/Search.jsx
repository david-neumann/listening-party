import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SpotifyContext } from '../spotifyContext';
import { UserContext } from '../userContext';
import SearchBar from './SearchBar';
import SearchTag from './SearchTag';
import PageTitle from '../utils/PageTitle';
import SongCard from '../recentlyPlayed/SongCard';
import UserCard from './UserCard';
import ReviewModal from '../recentlyPlayed/ReviewModal';
import { Menu } from 'react-feather';

const Search = () => {
  const { setShowSideNav } = useOutletContext();
  const {
    userSearchResults,
    setUserSearchResults,
    searchUsers,
    currentUserData,
    followUser,
    unfollowUser,
    addLikedSong,
    addDislikedSong,
    userRatedTrackIds,
  } = useContext(UserContext);
  const { searchResults, onSearchSubmit, clearResults } =
    useContext(SpotifyContext);

  const currentUserFollowing = currentUserData ? currentUserData.following : [];

  const [searchType, setSearchType] = useState('track');
  const [searchResultsLimit, setSearchResultsLimit] = useState(20);
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    'Search for songs on Spotify'
  );

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingText, setRatingText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedSongData, setSelectedSongData] = useState({});

  const handleSearchTypeClick = (searchType, placeholderText, searchLimit) => {
    setSearchType(searchType);
    setSearchPlaceholderText(placeholderText);
    setSearchResultsLimit(searchLimit);
    setUserSearchResults([]);
    clearResults();
  };

  const checkIfRated = searchResults.map(song => {
    const foundTrack = userRatedTrackIds.find(
      ratedSong => ratedSong.id === song.id
    );
    return foundTrack ? { ...song, userRating: foundTrack.rating } : song;
  });

  const renderedSearchResults = checkIfRated.map((result, index) => (
    <SongCard
      key={index}
      track={result}
      userRating={result.userRating}
      setShowReviewModal={setShowReviewModal}
      setSelectedSongData={setSelectedSongData}
      setRatingText={setRatingText}
    />
  ));

  const renderedUserSearchResults = userSearchResults.map((user, index) => {
    const followed = currentUserFollowing.includes(user._id);
    return (
      <UserCard
        key={index}
        {...user}
        followed={followed}
        followUser={followUser}
        unfollowUser={unfollowUser}
      />
    );
  });

  const displayedResults =
    searchType === 'track' ? renderedSearchResults : renderedUserSearchResults;

  return (
    <>
      <header className='flex justify-between md:mb-6'>
        <PageTitle marginBottom={4}>Search</PageTitle>
        <Menu
          size={44}
          strokeWidth={2}
          color='#f9fafb'
          onClick={() => setShowSideNav(true)}
          className='bg-gray-700 p-2 rounded-xl hover:bg-gray-900 cursor-pointer hidden md:inline'
        />
      </header>
      <main className='w-full'>
        <SearchBar
          onSearchSubmit={onSearchSubmit}
          clearResults={clearResults}
          placeholderText={searchPlaceholderText}
          searchType={searchType}
          searchLimit={searchResultsLimit}
          searchUsers={searchUsers}
          setUserSearchResults={setUserSearchResults}
        />
        <div className='flex justify-center gap-x-3 mb-6'>
          <SearchTag
            isActive={searchType === 'track'}
            searchType='track'
            handleSearchTypeClick={handleSearchTypeClick}
            placeholderText='Search for songs on Spotify'
            searchLimit={20}
          >
            songs
          </SearchTag>
          <SearchTag
            isActive={searchType === 'users'}
            searchType='users'
            handleSearchTypeClick={handleSearchTypeClick}
            placeholderText='Search for other users on Listening Party'
            searchLimit={20}
          >
            users
          </SearchTag>
        </div>
        <section>{displayedResults}</section>
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
      </main>
    </>
  );
};

export default Search;
