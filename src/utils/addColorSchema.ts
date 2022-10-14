import { object, string } from 'zod';
import { useTranslation } from 'react-i18next';

export const addColorSchema = object({
	name: string({
		required_error: 'Name is required',
	}).min(1, 'Name is required'),
	hex: string({
		required_error: 'Hex is required',
	}).min(1, 'Hex is required'),
});

export const defaultValues = {
	name: '',
	hex: '',
};
