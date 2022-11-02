import { useMutation } from 'react-query';

import { login } from '../services/auth.services';
import { LoginCredentials } from '../types/Auth';
import { useTranslation } from 'react-i18next';

const useLogin = () => {
	const { i18n } = useTranslation();

	return useMutation(
		async (credentials: LoginCredentials) =>
			await login(credentials, i18n.language)
	);
};

export default useLogin;
