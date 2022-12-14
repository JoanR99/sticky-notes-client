import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import useDeleteNote from '../hooks/useDeleteNote';

interface Props {
	show: boolean;
	handleClose: () => void;
	id: number;
}

const DeleteNoteModal = ({ show, handleClose, id }: Props) => {
	const { t } = useTranslation('translation');

	const { mutate: deleteNote, isLoading } = useDeleteNote();
	const handleClick = async () => {
		await deleteNote(id, {
			onSuccess: () => {
				toast.success(t('delete_note.success'));
				handleClose();
			},
			onError: (error) => {
				if (error instanceof AxiosError)
					toast.error(error?.response?.data?.message);
			},
		});
	};

	return (
		<Dialog
			open={show}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
		>
			<DialogTitle id="alert-dialog-title">
				{t('delete_note.title')}
			</DialogTitle>

			<DialogActions>
				<Button onClick={handleClose}>{t('actions.cancel')}</Button>
				<LoadingButton onClick={handleClick} loading={isLoading} autoFocus>
					{t('actions.delete')}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteNoteModal;
