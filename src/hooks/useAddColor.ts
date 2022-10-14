import { useMutation, useQueryClient } from 'react-query';
import { AxiosInstance } from 'axios';
import { AddNote } from '../types/Note';
import { addColor } from '../services/colors.services';

const useAddColor = (privateRequest: AxiosInstance, language: string) => {
	const request = addColor(privateRequest, language);
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
