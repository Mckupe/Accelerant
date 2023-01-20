import { Routes, Route } from 'react-router-dom';
import Authpage from './pages/authpage/Authpage';
import Projectpage from './pages/mainpages/Projectpage';
import Postpage from './pages/mainpages/Postpage';
import Draftpage from './pages/mainpages/Draftpage';
import Patternpage from './pages/mainpages/Patternpage';
import Settings from './pages/mainpages/Settings';
import Analitics from './pages/mainpages/Analitics';
import Talkpage from './pages/mainpages/Talkpage';

function App() {
	return (
		<>
			<Routes>
				<Route path='/auth' element={<Authpage />} />
				<Route path='/project' element={<Projectpage />} />
				<Route path='/posts' element={<Postpage />} />
				<Route path='/drafts' element={<Draftpage />} />
				<Route path='/patterns' element={<Patternpage />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/analitics' element={<Analitics />} />
				<Route path='/talks' element={<Talkpage />} />
			</Routes>
		</>
	);
}

export default App;
