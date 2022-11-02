import { useQuery } from 'react-query';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';

import { getColors } from '../services/colors.services';

const useGetColors = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = getColors(privateRequest, i18n.language);

	return useQuery('colors', async () => await request());
};

export default useGetColors;
