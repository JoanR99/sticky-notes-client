import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Screens/Layout';
import Notes from './Screens/Notes';
import ArchivedNotes from './Screens/ArchivedNotes';
import Register from './Screens/Register';
import Login from './Screens/Login';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import AddColor from './Screens/AddColor';

function App() {
	return (
		<>
			<ToastContainer />
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth />}>
							<Route path="/" element={<Notes />} />
							<Route path="archived" element={<ArchivedNotes />} />
							<Route path="/color" element={<AddColor />} />
						</Route>
					</Route>

					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
