import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { getNotes } from '../services/notes.services';
import filterNotes from '../utils/filter';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { colorFilterAtom, searchFilterAtom } from '../atoms';

const useGetNotes = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const [colorFilter] = useAtom(colorFilterAtom);
	const [searchFilter] = useAtom(searchFilterAtom);
	const isArchive = false;
	const request = getNotes(privateRequest, i18n.language);

	return useQuery(
		['notes', { isArchive }],
		async () => await request(isArchive),
		{
			select: (notes) => {
				return filterNotes(notes, colorFilter, searchFilter);
			},
			onError: (error) => {
				if (error instanceof AxiosError)
					toast.error(error?.response?.data?.message);
			},
		}
	);
};

export default useGetNotes;
