import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { UserAuthContext } from './userAuth/userAuthContext';
import { UserContext } from './userContext';
import BottomNav from './components/BottomNav';

const Home = () => {
  // Retrieve Spotify tokens from server after user auth and store in state
  const [spotifyTokens, setSpotifyTokens] = useState('');

  const getSpotifyTokens = async () => {
    const res = await axios.get('/server/spotify/auth/token');
    setSpotifyTokens(res.data);
  };

  useEffect(() => {
    if (!spotifyTokens) {
      getSpotifyTokens();
    }
  }, []);

  // Add Spotify tokens to user in database
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const updateObj = {
      spotifyAuth: { ...spotifyTokens },
    };
    updateUser(updateObj);
  }, [spotifyTokens]);

  return spotifyTokens ? (
    <div className='flex flex-col min-h-full'>
      <main className='p-6 pb-24'>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Home;
