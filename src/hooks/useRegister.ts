import { useMutation } from 'react-query';

import { register } from '../services/auth.services';
import { RegisterCredentials } from '../types/Auth';
import { useTranslation } from 'react-i18next';

const useRegister = () => {
	const { i18n } = useTranslation();

	return useMutation(
		async (credentials: RegisterCredentials) =>
			await register(credentials, i18n.language)
	);
};

export default useRegister;
