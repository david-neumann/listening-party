import { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// Create Axios instance and attach jwt to headers
const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const UserContext = createContext();

const UserContextProvider = props => {
  const initInputs = {
    _id: '',
    username: '',
    spotifyAuth: {
      access_token: '',
      refresh_token: '',
      expires_in: '',
    },
    followers: [],
    following: [],
    likedSongs: [],
    dislikedSongs: [],
  };
  const [userData, setUserData] = useState(initInputs);

  const updateUser = async userUpdates => {
    const res = await userAxios.put('/server/api/users', userUpdates);
    setUserData(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
  };

  // Create Axios instance for Spotify API calls
  const spotifyAccessToken = userData.spotifyAuth
    ? userData.spotifyAuth.access_token
    : '';
  const spotifyAxios = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
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

  return (
    <UserContext.Provider
      value={{ updateUser, getRecentlyPlayed, recentlyPlayed }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
