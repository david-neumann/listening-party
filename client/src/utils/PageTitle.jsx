const PageTitle = ({ children, marginBottom }) => {
  return (
    <h1
      className={`text-3xl font-bold text-green-300 mb-${marginBottom} md:text-4xl transition-all`}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
