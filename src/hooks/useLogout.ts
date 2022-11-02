import { useMutation } from 'react-query';

import { logout } from '../services/auth.services';
import { useTranslation } from 'react-i18next';

const useLogout = () => {
	const { i18n } = useTranslation();

	return useMutation(async (undefined) => await logout(i18n.language), {
		onSuccess: (data) => {
			localStorage.setItem('persist', JSON.stringify(false));
		},
	});
};

export default useLogout;
