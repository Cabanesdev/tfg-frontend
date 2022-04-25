import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';
import ViewPost from './pages/post/view';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/post/:id" element={<ViewPost/>} />
    </Routes>
  );
}

export default App;
