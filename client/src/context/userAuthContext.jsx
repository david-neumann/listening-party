import { createContext, useState } from 'react';
import axios from 'axios';

const UserAuthContext = createContext();

const UserAuthContextProvider = props => {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  };

  const [userAuthState, setUserAuthState] = useState(initState);

  const signup = userCredentials => {
    axios
      .post('/server/auth/signup', userCredentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUserAuthState(prevState => ({
          ...prevState,
          user,
          token,
        }));
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
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
        errMsg,
        resetAuthErr,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
