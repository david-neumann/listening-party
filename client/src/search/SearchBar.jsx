import { useState, useEffect } from 'react';
import { Search } from 'react-feather';

const SearchBar = ({
  onSearchSubmit,
  clearResults,
  placeholderText,
  searchType,
  searchLimit,
  searchUsers,
  setUserSearchResults,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (searchTerm !== '' && searchType === 'track') {
      onSearchSubmit(searchTerm, searchType, searchLimit);
    } else if (searchTerm !== '' && searchType === 'users') {
      searchUsers(searchTerm);
    } else {
      clearResults();
      setUserSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    setDebouncedTerm('');
  }, [searchType]);

  return (
    <div className='relative mb-4'>
      <input
        type='text'
        placeholder={placeholderText}
        name='debouncedTerm'
        value={debouncedTerm}
        onChange={e => setDebouncedTerm(e.target.value)}
        autoFocus={true}
        onFocus={e => e.target.select()}
        className='min-w-full max-w-[500px] py-2 pl-3 pr-10 rounded-xl text-gray-800
        focus:outline-none focus-visible:ring focus-visible:ring-green-300'
      />
      <Search
        size={24}
        color='#1f2937'
        strokeWidth={2}
        className='absolute right-2 bottom-2'
      />
    </div>
  );
};

export default SearchBar;
