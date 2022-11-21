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
  // Data
  const [allUsers, setAllUsers] = useState([]);
  const currentUserId = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))._id
    : '';
  const currentUserToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '';
  const currentUserData = allUsers.filter(
    user => user._id === currentUserId
  )[0];
  const userFollowingArray = currentUserData
    ? [currentUserId, ...currentUserData.following]
    : [];

  const [userFeed, setUserFeed] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);

  useEffect(() => {
    if (!currentUserToken) return;
    getAllUsers();
  }, [currentUserToken]);

  useEffect(() => {
    if (!currentUserToken) return;
    constructUserFeed(userFollowingArray);
  }, [currentUserData, currentUserToken]);

  // Functions
  const getLikedSongs = async userArray => {
    const res = await userAxios.put('/server/api/likedsong', userArray);
    return res.data;
  };

  const getDislikedSongs = async userArray => {
    const res = await userAxios.put('/server/api/dislikedsong', userArray);
    return res.data;
  };

  const constructUserFeed = async userArray => {
    const likedPromise = getLikedSongs(userArray);
    const dislikedPromise = getDislikedSongs(userArray);
    const [likedSongs, dislikedSongs] = await Promise.all([
      likedPromise,
      dislikedPromise,
    ]);

    const userFeedArray = [...likedSongs, ...dislikedSongs];
    const sortedArray = userFeedArray.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
    setUserFeed(sortedArray);
  };

  const addLikedSong = (likedSong, review) => {
    const reqBodyObj = {
      spotifyData: likedSong,
      review,
    };
    userAxios
      .post('/server/api/likedsong', reqBodyObj)
      .then(res => {
        setUserFeed(prevFeed => {
          const feedArray = [...prevFeed, res.data];
          const sortedArray = feedArray.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : -1
          );
          return sortedArray;
        });
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
  const searchUsers = searchTerm => {
    userAxios
      .get(`/server/api/users/search?q=${searchTerm}`)
      .then(res => setUserSearchResults(res.data))
      .catch(err => console.dir(err));
  };

  // Get all users
  const getAllUsers = () => {
    userAxios
      .get('/server/api/users')
      .then(res => setAllUsers(res.data))
      .catch(err => console.dir(err));
  };

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
        currentUserId,
        currentUserData,
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
