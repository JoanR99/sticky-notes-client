import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MenuItem, IconButton, Menu } from '@mui/material';

import { useAtom } from 'jotai';
import { accessTokenAtom } from '../atoms';
import useLogout from '../hooks/useLogout';
import { AxiosError } from 'axios';
import { Box } from '@mui/system';

const Logout = () => {
	const { t } = useTranslation('translation');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { mutate: logoutUser, isLoading } = useLogout();
	const navigate = useNavigate();
	const [, setAccessToken] = useAtom(accessTokenAtom);
	const queryClient = useQueryClient();

	const handleClick = () => {
		//Pass undefined because mutate requires some kind of variable to add additional options even when not needed
		logoutUser(undefined, {
			onSuccess: (data) => {
				setAccessToken('');
				toast.success(t('logout.success'));
				queryClient.clear();
				navigate('/login');
			},
			onError: (error) => {
				if (error instanceof AxiosError)
					toast.error(error.response?.data.message, {
						position: 'top-right',
					});
			},
		});
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-user"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-user"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClick} sx={{ color: '#000000' }}>
					{t('logout.action')}
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default Logout;
