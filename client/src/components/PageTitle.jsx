const PageTitle = ({ children, marginBottom }) => {
  return (
    <h1 className={`text-3xl font-bold text-green-300 mb-${marginBottom}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
