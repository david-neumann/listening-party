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
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    localStorage.removeItem('spotifyExpiresIn');
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

  return (
    <UserAuthContext.Provider
      value={{
        userAuthState,
        signup,
        login,
        logout,
        errMsg,
        resetAuthErr,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
