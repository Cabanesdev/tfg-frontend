import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';
import User from './pages/user';
import Search from './pages/search';
import ViewPost from './pages/post/view';
import CreatePost from './pages/post/create';
import EditPost from './pages/post/edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<User />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/post/new" element={<CreatePost />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<ViewPost />} />
    </Routes>
  );
}

export default App;
