import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserAuthContextProvider } from './userAuth/userAuthContext';
import { UserContextProvider } from './userContext';
import { SpotifyContextProvider } from './spotifyContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <UserContextProvider>
          <SpotifyContextProvider>
            <App />
          </SpotifyContextProvider>
        </UserContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
