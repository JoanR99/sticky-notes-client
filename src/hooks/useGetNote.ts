import { useQuery } from 'react-query';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';

import { getNote } from '../services/notes.services';

const useGetNote = (id: number) => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = getNote(privateRequest, i18n.language);

	return useQuery(['note', { id: Number(id) }], async () => await request(id));
};

export default useGetNote;
