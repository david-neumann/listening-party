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
  const [userData, setUserData] = useState();

  const updateUser = async userUpdates => {
    const res = await userAxios.put('/server/api/users', userUpdates);
    setUserData(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
  };

  return (
    <UserContext.Provider value={{ updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
