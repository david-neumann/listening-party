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
  const getUserData = async userId => {
    try {
      const res = await userAxios.get(`/server/api/users/${userId}`);
      return res.data;
    } catch (err) {
      console.dir(err);
    }
  };

  const updateUser = async userUpdates => {
    try {
      const res = await userAxios.put('/server/api/users', userUpdates);
      return res.data;
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <UserContext.Provider value={{ getUserData, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
