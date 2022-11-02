import { useMutation, useQueryClient } from 'react-query';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';
import { deleteNote } from '../services/notes.services';

const useDeleteNote = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = deleteNote(privateRequest, i18n.language);
	const queryClient = useQueryClient();

	return useMutation(async (id: number) => await request(id), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['notes', { isArchive: false }]);
			queryClient.invalidateQueries(['notes', { isArchive: true }]);
		},
	});
};

export default useDeleteNote;
