import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

import Logout from './Logout';
import SelectLanguage from './SelectLanguage';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../atoms';

const LinkItem = styled(Link)`
	text-decoration: none;
	color: #ffffff;
	&:visited {
		color: #ffffff;
	}
`;

const Header = () => {
	const [accessToken] = useAtom(accessTokenAtom);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography variant="h6" noWrap component="div">
						<LinkItem to="/">Sticky Notes</LinkItem>
					</Typography>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={{ mr: 2 }}>
							<SelectLanguage />
						</Box>
						<Box>{accessToken && <Logout />}</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
