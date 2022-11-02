import { privateRequest } from '../services/baseRequest';
import { getRefreshToken } from '../services/auth.services';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../atoms';
import { useTranslation } from 'react-i18next';

const usePrivateRequest = () => {
	const { i18n } = useTranslation();
	const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

	privateRequest.interceptors.request.use(
		(config) => {
			if (config.headers) {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`;
				}
			}

			return config;
		},
		(error) => Promise.reject(error)
	);

	privateRequest.interceptors.response.use(
		(response) => response,
		async (error) => {
			const prevRequest = error?.config;
			if (error?.response?.status === 403 && !prevRequest?.sent) {
				prevRequest.sent = true;

				const { accessToken: newAccessToken } = await getRefreshToken(
					i18n.language
				);
				setAccessToken(newAccessToken);
				prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

				return privateRequest(prevRequest);
			}
			return Promise.reject(error);
		}
	);

	return privateRequest;
};

export default usePrivateRequest;
