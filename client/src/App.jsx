import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Search from './pages/Search';
import RecentlyPlayed from './pages/RecentlyPlayed';

const App = () => {
  return (
    <div className='App h-full text-zinc-50'>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />}>
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
