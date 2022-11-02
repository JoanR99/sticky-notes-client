import { useMutation, useQueryClient } from 'react-query';

import { updateNote } from '../services/notes.services';
import { UpdateNote } from '../types/Note';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';

const useUpdateNote = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = updateNote(privateRequest, i18n.language);
	const queryClient = useQueryClient();
	return useMutation(async (data: UpdateNote) => await request(data), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['notes', { isArchive: false }]);
			queryClient.invalidateQueries(['notes', { isArchive: true }]);
		},
	});
};

export default useUpdateNote;
