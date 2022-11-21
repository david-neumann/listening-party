import { createContext, useState, useEffect } from 'react';
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

  // Get all users
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = () => {
    userAxios
      .get('/server/api/users')
      .then(res => setAllUsers(res.data))
      .catch(err => console.dir(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Follow a user
  const followUser = followedUserId => {
    userAxios
      .put(`/server/api/users/follow/${followedUserId}`)
      .then(res => getAllUsers())
      .catch(err => console.dir(err));
  };

  // Unfollow a user
  const unfollowUser = unfollowedUserId => {
    userAxios
      .put(`/server/api/users/unfollow/${unfollowedUserId}`)
      .then(res => getAllUsers())
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
        allUsers,
        getAllUsers,
        followUser,
        unfollowUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
