import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import SignUp from './userAuth/signup/SignUp';
import Login from './userAuth/login/Login';
import SpotifyAuth from './userAuth/SpotifyAuth';
import Home from './Home';
import Feed from './feed/Feed';
import Profile from './profile/Profile';
import Search from './search/Search';
import RecentlyPlayed from './recentlyPlayed/RecentlyPlayed';
import ProtectedRoute from './utils/ProtectedRoute';
import BypassRoute from './utils/BypassRoute';
import { UserAuthContext } from './userAuth/userAuthContext';
import { SpotifyContext } from './spotifyContext';

const App = () => {
  // Retrieve app token
  const { userAuthState } = useContext(UserAuthContext);
  const { token } = userAuthState;

  // Get Spotify auth code from URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { getSpotifyTokens } = useContext(SpotifyContext);

  useEffect(() => {
    if (code) {
      getSpotifyTokens(code);
    }
  }, []);

  return (
    <div className='App h-full text-zinc-50'>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/spotify' element={<SpotifyAuth />} />
        <Route
          path='/'
          element={
            <ProtectedRoute token={token} path='/signup'>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path='' element={<Feed />} />
          <Route path='recentlyplayed' element={<RecentlyPlayed />} />
          <Route path='search' element={<Search />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
