const StrongLink = ({ children }) => {
  return (
    <strong className='font-bold underline decoration-green-300 decoration-[3px] hover:transition-all hover:ease-in hover:duration-300 hover:bg-green-300 hover:text-gray-800 cursor-pointer'>
      {children}
    </strong>
  );
};

export default StrongLink;
