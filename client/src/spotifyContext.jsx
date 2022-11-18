import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';
import { UserAuthContext } from './userAuth/userAuthContext';

const SpotifyContext = createContext();

const SpotifyContextProvider = props => {
  // All things tokens
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('spotifyAccessToken') || ''
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('spotifyRefreshToken') || ''
  );
  const [expiresIn, setExpiresIn] = useState(
    localStorage.getItem('spotifyExpiresIn') || ''
  );

  const getSpotifyTokens = code => {
    axios
      .post('http://localhost:7070/server/spotify/auth/token', { code })
      .then(res => {
        const { accessToken, refreshToken, expiresIn } = res.data;
        localStorage.setItem('spotifyAccessToken', accessToken);
        localStorage.setItem('spotifyRefreshToken', refreshToken);
        localStorage.setItem('spotifyExpiresIn', expiresIn);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpiresIn(expiresIn);
      })
      .catch(err => console.dir(err));
  };

  const refreshSpotifyTokens = refreshToken => {
    axios
      .post('http://localhost:7070/server/spotify/auth/refresh', {
        refreshToken,
      })
      .then(res => {
        const { accessToken, expiresIn } = res.data;
        setAccessToken(accessToken);
        setExpiresIn(expiresIn);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const refreshTokenInterval = setInterval(() => {
      refreshSpotifyTokens(refreshToken);
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(refreshTokenInterval);
  }, [refreshToken, expiresIn]);

  // Add Spotify tokens to user in database
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) return;

    const updateObj = {
      spotifyAuth: {
        accessToken,
        refreshToken,
        expiresIn,
      },
    };

    updateUser(updateObj);
  }, [accessToken]);

  // Create Axios instance for Spotify API calls
  const spotifyAxios = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // User's recently played tracks
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const getRecentlyPlayed = async () => {
    try {
      const res = await spotifyAxios.get('/me/player/recently-played?limit=20');
      setRecentlyPlayed(res.data.items);
    } catch (err) {
      console.dir(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getRecentlyPlayed();
    }
  }, [accessToken]);

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        refreshToken,
        expiresIn,
        getSpotifyTokens,
        recentlyPlayed,
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyContext, SpotifyContextProvider };
