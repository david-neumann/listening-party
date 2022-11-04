import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Search from './pages/Search';
import RecentlyPlayed from './pages/RecentlyPlayed';

function App() {
  return (
    <div className='App h-full text-zinc-50'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='' element={<Feed />} />
          <Route path='profile' element={<Profile />} />
          <Route path='recentlyplayed' element={<RecentlyPlayed />} />
          <Route path='search' element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
