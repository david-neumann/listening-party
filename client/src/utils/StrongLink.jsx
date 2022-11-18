const StrongLink = ({ children, url }) => {
  return (
    <strong className='font-bold underline decoration-green-300 decoration-[3px] hover:transition-all hover:ease-in hover:duration-300 hover:bg-green-300 hover:text-gray-800 cursor-pointer'>
      <a href={url}>{children}</a>
    </strong>
  );
};

export default StrongLink;
