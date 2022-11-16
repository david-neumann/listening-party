import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserAuthContext = createContext();

const UserAuthContextProvider = props => {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  };

  const [userAuthState, setUserAuthState] = useState(initState);

  const navigate = useNavigate();

  // Signup
  const signup = async userCredentials => {
    try {
      const res = await axios.post('/server/auth/signup', userCredentials);
      const { user, token } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUserAuthState(prevState => ({
        ...prevState,
        user,
        token,
      }));
    } catch (err) {
      handleAuthErr(err.response.data.errMsg);
    }
  };

  // Login
  const login = async userCredentials => {
    try {
      const res = await axios.post('/server/auth/login', userCredentials);
      const { user, token } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUserAuthState(prevState => ({
        ...prevState,
        user,
        token,
      }));
    } catch (err) {
      handleAuthErr(err.response.data.errMsg);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserAuthState({
      user: {},
      token: '',
    });
    navigate('/login');
  };

  // Capture error message for display on auth page
  const [errMsg, setErrMsg] = useState('');
  const handleAuthErr = errMsg => setErrMsg(errMsg);
  const resetAuthErr = () => setErrMsg('');

  // Create instance of Axios and attach jwt to headers so Spotify tokens can be attached to user in DB
  const spotifyAxios = axios.create();

  spotifyAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Add Spotify tokens to user in database
  const addSpotifyTokensToDb = async () => {
    try {
      const res = await spotifyAxios.put('/server/spotify/auth/token');
      return console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        userAuthState,
        signup,
        login,
        logout,
        errMsg,
        resetAuthErr,
        addSpotifyTokensToDb,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
