import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App = () => {
  const { userAuthState } = useContext(UserAuthContext);
  const { token, user } = userAuthState;
  const spotifyAccessToken = user.spotifyAuth
    ? user.spotifyAuth.access_token
    : '';

  return (
    <div className='App h-full text-zinc-50'>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/spotify'
          element={
            <BypassRoute token={spotifyAccessToken} path='/'>
              <SpotifyAuth />
            </BypassRoute>
          }
        />
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
