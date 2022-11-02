import { Routes, Route } from 'react-router-dom';
import Projectpage from './pages/mainpages/Projectpage';
import Authpage from './pages/authpage/Authpage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Authpage />}/>
        <Route path='/home' element={<Projectpage />}/>
      </Routes>
    </>
  );
}

export default App;
