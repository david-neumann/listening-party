const SpotifyAuth = () => {
  return (
    <>
      <header className='p-6 flex flex-col justify-center items-center max-w-[500px] mt-8 mx-auto'>
        <h2 className='text-xl font-bold mb-6 max-w-max text-transparent bg-clip-text bg-gradient-to-tr from-green-300 to-green-600'>
          Listening Party 🎵
        </h2>
        <h1 className='text-2xl text-center font-medium'>
          In order to continue, you must connect to your Spotify account.
        </h1>
      </header>
      <main className='flex justify-center mt-12'>
        <a href='https://listening-party.onrender.com/server/spotify/auth/login'>
          <button className='mt-4 py-2 px-6 text-xl font-bold rounded-2xl bg-green-300 hover:bg-green-400 text-gray-800'>
            Connect to Spotify
          </button>
        </a>
      </main>
    </>
  );
};

export default SpotifyAuth;
