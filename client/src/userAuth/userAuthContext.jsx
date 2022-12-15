import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
      const res = await axios.post(
        'https://listening-party.onrender.com/server/auth/signup',
        userCredentials
      );
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
      const res = await axios.post(
        'https://listening-party.onrender.com/server/auth/login',
        userCredentials
      );
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

  // Edit user
  const editUser = async updatedUser => {
    try {
      const res = await userAxios.put(
        'https://listening-party.onrender.com/server/api/users/edit',
        updatedUser
      );
      localStorage.setItem('user', JSON.stringify(res.data));
      setUserAuthState(prevState => ({
        ...prevState,
        user: res.data,
      }));
    } catch (err) {
      handleAuthErr(err.response.data.errMsg);
    }
  };

  // Edit password
  const editPassword = async newPassword => {
    console.log(newPassword);
    try {
      const res = await userAxios.put(
        'https://listening-party.onrender.com/server/api/users/edit/password',
        newPassword
      );
      console.log(res.data);
    } catch (err) {
      handleAuthErr(err.response.data.errMsg);
    }
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
        editUser,
        editPassword,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
