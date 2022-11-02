import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../atoms';

const Layout = () => {
	const [accessToken] = useAtom(accessTokenAtom);
	return (
		<>
			<Header />
			{accessToken && <SecondaryHeader />}

			<Container>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
