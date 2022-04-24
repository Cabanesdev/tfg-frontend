import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
}

export default App;
