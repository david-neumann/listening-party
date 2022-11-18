const SearchTag = ({
  children,
  isActive,
  searchType,
  handleSearchTypeClick,
  placeholderText,
  searchLimit,
}) => {
  const bgColor = isActive ? 'bg-green-300' : 'bg-gray-50';
  return (
    <span
      onClick={() =>
        handleSearchTypeClick(searchType, placeholderText, searchLimit)
      }
      className={`py-1 px-4 min-w-fit text-sm text-gray-800 rounded-xl cursor-pointer ${bgColor}`}
    >
      {children}
    </span>
  );
};

export default SearchTag;
