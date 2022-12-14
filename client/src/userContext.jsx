import { createContext, useState, useEffect, useContext } from 'react';
import { UserAuthContext } from './userAuth/userAuthContext';
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
  const { userAuthState } = useContext(UserAuthContext);

  // Data
  const [allUsers, setAllUsers] = useState([]);
  const currentUserId = localStorage.getItem('user')
    ? userAuthState.user._id
    : '';
  const currentUserToken = localStorage.getItem('token')
    ? userAuthState.token
    : '';
  const userFollowingArray = localStorage.getItem('token')
    ? [currentUserId, ...userAuthState.user.following]
    : [];

  const [userFeed, setUserFeed] = useState([]);
  const [userRatedTrackIds, setUserRatedTrackIds] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);

  useEffect(() => {
    if (!currentUserToken) return;
    getAllUsers();
  }, [currentUserToken, userAuthState]);

  useEffect(() => {
    if (!currentUserToken) return;
    constructUserFeed(userFollowingArray);
  }, [userAuthState, currentUserToken]);

  useEffect(() => {
    if (!currentUserToken) return;
    getUserRatedTrackIds([currentUserId]);
  }, [userFeed]);

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

  const getUserRatedTrackIds = async userArray => {
    const likedPromise = getLikedSongs(userArray);
    const dislikedPromise = getDislikedSongs(userArray);
    const [likedSongs, dislikedSongs] = await Promise.all([
      likedPromise,
      dislikedPromise,
    ]);

    const userRatingsArray = [...likedSongs, ...dislikedSongs];
    const userRatingsTrackIds = userRatingsArray.map(track => ({
      id: track.spotifyData.id,
      rating: track.rating,
    }));
    setUserRatedTrackIds(userRatingsTrackIds);
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

  const searchUsers = searchTerm => {
    userAxios
      .get(`/server/api/users/search?q=${searchTerm}`)
      .then(res => setUserSearchResults(res.data))
      .catch(err => console.dir(err));
  };

  const getAllUsers = () => {
    userAxios
      .get('/server/api/users')
      .then(res => setAllUsers(res.data))
      .catch(err => console.dir(err));
  };

  const followUser = followedUserId => {
    userAxios
      .put(`/server/api/users/follow/${followedUserId}`)
      .then(res => getAllUsers())
      .catch(err => console.dir(err));
  };

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
        userRatedTrackIds,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
