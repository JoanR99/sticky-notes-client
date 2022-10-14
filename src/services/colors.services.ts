import { AxiosInstance } from 'axios';
import { Color } from '../types/Note';

export const getColors =
	(privateRequest: AxiosInstance, language: string) =>
	async (): Promise<Color[]> => {
		const response = await privateRequest.get('/colors', {
			headers: { 'Accept-Language': language },
		});

		return response.data;
	};

export const addColor =
	(privateRequest: AxiosInstance, language: string) =>
	async ({ name, hex }: { name: string; hex: string }): Promise<Color[]> => {
		const response = await privateRequest.post(
			'/colors',
			{ name, hex },
			{
				headers: { 'Accept-Language': language },
			}
		);

		return response.data;
	};
