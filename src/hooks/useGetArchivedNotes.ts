import { useQuery } from 'react-query';

import { getNotes } from '../services/notes.services';
import filterNotes from '../utils/filter';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { colorFilterAtom, searchFilterAtom } from '../atoms';

const useGetArchivedNotes = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const [colorFilter] = useAtom(colorFilterAtom);
	const [searchFilter] = useAtom(searchFilterAtom);
	const isArchive = true;
	const request = getNotes(privateRequest, i18n.language);

	return useQuery(
		['notes', { isArchive }],
		async () => await request(isArchive),
		{
			select: (notes) => {
				return filterNotes(notes, colorFilter, searchFilter);
			},
		}
	);
};

export default useGetArchivedNotes;
