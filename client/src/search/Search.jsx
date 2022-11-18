import { useContext, useState } from 'react';
import { SpotifyContext } from '../spotifyContext';
import SearchBar from './SearchBar';
import SearchTag from './SearchTag';
import PageTitle from '../utils/PageTitle';
import SongCard from '../recentlyPlayed/SongCard';

const Search = () => {
  const { searchResults, onSearchSubmit, clearResults } =
    useContext(SpotifyContext);

  const [searchType, setSearchType] = useState('track');
  const [searchResultsLimit, setSearchResultsLimit] = useState(20);
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    'Search for songs on Spotify'
  );

  const handleSearchTypeClick = (searchType, placeholderText, searchLimit) => {
    setSearchType(searchType);
    setSearchPlaceholderText(placeholderText);
    setSearchResultsLimit(searchLimit);
  };

  const renderedSearchResults = searchResults.map((result, index) => (
    <SongCard key={index} track={result} />
  ));

  return (
    <>
      <header>
        <PageTitle marginBottom={4}>Search</PageTitle>
      </header>
      <main>
        <SearchBar
          onSearchSubmit={onSearchSubmit}
          clearResults={clearResults}
          placeholderText={searchPlaceholderText}
          searchType={searchType}
          searchLimit={searchResultsLimit}
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
          {/* <SearchTag
            isActive={searchType === 'artist'}
            searchType='artist'
            handleSearchTypeClick={handleSearchTypeClick}
            placeholderText='Search for artists on Spotify'
            searchLimit={10}
          >
            artists
          </SearchTag> */}
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
        <section>{renderedSearchResults}</section>
      </main>
    </>
  );
};

export default Search;
