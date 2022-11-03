import { Routes, Route } from 'react-router-dom';
import Authpage from './pages/authpage/Authpage';
import Projectpage from './pages/mainpages/Projectpage';
import Postpage from './pages/mainpages/Postpage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Authpage />}/>
        <Route path='/project' element={<Projectpage />}/>
        <Route path='/posts' element={<Postpage />}/>
      </Routes>
    </>
  );
}

export default App;
