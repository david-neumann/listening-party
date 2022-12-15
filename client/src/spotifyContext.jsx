import { useState, createContext, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserAuthContext } from './userAuth/userAuthContext';
import axios from 'axios';
import _ from 'lodash';

const SpotifyContext = createContext();

const SpotifyContextProvider = props => {
  const navigate = useNavigate();
  const { editUser } = useContext(UserAuthContext);

  const LOCALSTORAGE_KEYS = {
    accessToken: 'spotifyAccessToken',
    refreshToken: 'spotifyRefreshToken',
    expiresIn: 'spotifyExpiresIn',
  };
  const LOCALSTORAGE_VALUES = {
    accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expiresIn: localStorage.getItem(LOCALSTORAGE_KEYS.expiresIn),
  };

  // TOKENS **************************************************************

  const [accessToken, setAccessToken] = useState(
    LOCALSTORAGE_VALUES.accessToken
  );
  const [refreshToken, setRefreshToken] = useState(
    LOCALSTORAGE_VALUES.refreshToken
  );
  const [expiresIn, setExpiresIn] = useState(LOCALSTORAGE_VALUES.expiresIn);

  const [searchParams, setSearchParams] = useSearchParams();

  const getSpotifyTokens = () => {
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: searchParams.get('accessToken'),
      [LOCALSTORAGE_KEYS.refreshToken]: searchParams.get('refreshToken'),
      [LOCALSTORAGE_KEYS.expiresIn]: searchParams.get('expiresIn'),
    };
    const hasError = searchParams.get('error');

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
      refreshSpotifyTokens();
    }

    // If there's a valid access token in localStorage, use that
    if (
      LOCALSTORAGE_VALUES.accessToken &&
      LOCALSTORAGE_VALUES.accessToken !== 'undefined'
    ) {
      return;
    }

    // If there's a token in the URL query params, user is logging in for first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      // Store tokens in localStorage
      for (const property in queryParams) {
        localStorage.setItem(property, queryParams[property]);
      }
      // Store tokens in state
      setAccessToken(queryParams[LOCALSTORAGE_KEYS.accessToken]);
      setRefreshToken(queryParams[LOCALSTORAGE_KEYS.refreshToken]);
      setExpiresIn(queryParams[LOCALSTORAGE_KEYS.expiresIn]);

      return;
    }
  };

  const refreshSpotifyTokens = async () => {
    try {
      // If no refresh token is available, redirect back to Spotify auth page
      if (
        !LOCALSTORAGE_VALUES.refreshToken ||
        LOCALSTORAGE_VALUES.refreshToken === 'undefined'
      ) {
        console.error('No refresh token available.');
        for (const property in LOCALSTORAGE_KEYS) {
          localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
        }
        navigate('/spotify');
      } else {
        // Otherwise get new token with refreshToken and update localStorage and state
        const { data } = await axios.get(
          `http://localhost:7070/server/spotify/auth/refresh/?${new URLSearchParams(
            { refresh_token: refreshToken }
          ).toString()}`
        );

        localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        localStorage.setItem(LOCALSTORAGE_KEYS.expiresIn, data.expires_in);
        setAccessToken(data.access_token);
        setExpiresIn(data.expires_in);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const refreshTokenInterval = setInterval(() => {
      refreshSpotifyTokens();
    }, (expiresIn - 600) * 1000);

    return () => clearInterval(refreshTokenInterval);
  }, [refreshToken, expiresIn]);

  // SPOTIFY API CALLS ***************************************************

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
      console.error(err);
    }
  };

  // Get user's Spotify profile data for profile image
  const [spotifyUserData, setSpotifyUserData] = useState({});

  const getSpotifyProfile = async () => {
    try {
      const res = await spotifyAxios.get('/me');
      setSpotifyUserData(res.data);
      const { images } = res.data;
      if (images.length > 0) {
        const updateObj = { profileImgUrl: images[0].url };
        editUser(updateObj);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getRecentlyPlayed();
      getSpotifyProfile();
    }
  }, [accessToken]);

  // Search with Spotify API
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = _.memoize(
    async (searchTerm, searchType, searchLimit) => {
      const searchParam = searchTerm.replaceAll(' ', '%20');
      try {
        const res = await spotifyAxios.get(
          `/search?q=${searchParam}&type=${searchType}&limit=${searchLimit}`
        );
        return res;
      } catch (err) {
        console.dir(err);
        return [];
      }
    }
  );

  const onSearchSubmit = async (searchTerm, searchType, searchLimit) => {
    const resultsArray = await getSearchResults(
      searchTerm,
      searchType,
      searchLimit
    );
    setSearchResults(resultsArray.data.tracks.items);
  };

  const clearResults = () => setSearchResults([]);

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        refreshToken,
        expiresIn,
        getSpotifyTokens,
        recentlyPlayed,
        searchResults,
        onSearchSubmit,
        clearResults,
        spotifyUserData,
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyContext, SpotifyContextProvider };
