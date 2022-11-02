import { useMutation, useQueryClient } from 'react-query';
import { addColor } from '../services/colors.services';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';

const useAddColor = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = addColor(privateRequest, i18n.language);
	const queryClient = useQueryClient();

	return useMutation(
		async (color: { name: string; hex: string }) => await request(color),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['colors']);
			},
		}
	);
};

export default useAddColor;
