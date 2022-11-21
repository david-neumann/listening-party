import { createContext, useState } from 'react';
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
  const [userFeed, setUserFeed] = useState([]);

  const addLikedSong = (likedSong, review) => {
    const reqBodyObj = {
      spotifyData: likedSong,
      review,
    };
    userAxios
      .post('/server/api/likedsong', reqBodyObj)
      .then(res => {
        setUserFeed(prevFeed => [...prevFeed, res.data]);
      })
      .catch(err => console.dir(err));
  };

  const addDislikedSong = (dislikedSong, review) => {
    const reqBodyObj = {
      spotifyData: dislikedSong,
      review,
    };
    userAxios
      .post('/server/api/dislikedsong', reqBodyObj)
      .then(res => {
        setUserFeed(prevFeed => [...prevFeed, res.data]);
      })
      .catch(err => console.dir(err));
  };

  // Search for users
  const [userSearchResults, setUserSearchResults] = useState([]);

  const searchUsers = searchTerm => {
    userAxios
      .get(`/server/api/users/search?q=${searchTerm}`)
      .then(res => setUserSearchResults(res.data))
      .catch(err => console.dir(err));
  };

  return (
    <UserContext.Provider
      value={{
        userFeed,
        addLikedSong,
        addDislikedSong,
        userSearchResults,
        setUserSearchResults,
        searchUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
