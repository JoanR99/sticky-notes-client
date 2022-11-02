import { useMutation, useQueryClient } from 'react-query';
import { addNote } from '../services/notes.services';
import { AddNote } from '../types/Note';
import usePrivateRequest from './usePrivateRequest';
import { useTranslation } from 'react-i18next';

const useAddNote = () => {
	const { i18n } = useTranslation();
	const privateRequest = usePrivateRequest();
	const request = addNote(privateRequest, i18n.language);
	const queryClient = useQueryClient();

	return useMutation(async (note: AddNote) => await request(note), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['notes', { isArchive: false }]);
		},
	});
};

export default useAddNote;
