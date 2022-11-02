import { useAtom } from 'jotai';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { accessTokenAtom } from '../atoms';

const RequireAuth = () => {
	const [accessToken] = useAtom(accessTokenAtom);
	const location = useLocation();

	return accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
