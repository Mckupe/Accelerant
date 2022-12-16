import { Routes, Route } from 'react-router-dom';
import Authpage from './pages/authpage/Authpage';
import Projectpage from './pages/mainpages/Projectpage';
import Postpage from './pages/mainpages/Postpage';
import Draftpage from './pages/mainpages/Draftpage';
<<<<<<< HEAD
import Patternpage from './pages/mainpages/Patternpage'
=======
import Settings from './pages/mainpages/Settings';
import Analitics from './pages/mainpages/Analitics';
>>>>>>> fed67f2ea8c8bd624fe9a6afe03e209919568109

function App() {
	return (
		<>
			<Routes>
				<Route path='/auth' element={<Authpage />} />
				<Route path='/project' element={<Projectpage />} />
				<Route path='/posts' element={<Postpage />} />
				<Route path='/drafts' element={<Draftpage />} />
<<<<<<< HEAD
				<Route path='/patterns' element={<Patternpage />} />
=======
				<Route path='/settings' element={<Settings />}/>
				<Route path='/analitics' element={<Analitics />}/>
>>>>>>> fed67f2ea8c8bd624fe9a6afe03e209919568109
			</Routes>
		</>
	);
}

export default App;
