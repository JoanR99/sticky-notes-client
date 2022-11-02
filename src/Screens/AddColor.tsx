import { Box, Typography, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '../components/FormInput';
import { addColorSchema, defaultValues } from '../utils/addColorSchema';
import { AxiosError } from 'axios';
import useAddColor from '../hooks/useAddColor';

const AddColor = () => {
	const { mutate: addColor, isLoading } = useAddColor();

	const methods = useForm({
		resolver: zodResolver(addColorSchema),
		defaultValues,
	});

	const { reset, handleSubmit } = methods;

	const onHandleSubmit = async ({
		name,
		hex,
	}: {
		name: string;
		hex: string;
	}) => {
		addColor(
			{ name, hex },
			{
				onSuccess: () => {
					reset();
					toast.success('Add color success');
				},
				onError: (error) => {
					if (error instanceof AxiosError)
						toast.error(error.response?.data.message);
				},
			}
		);
	};

	return (
		<FormProvider {...methods}>
			<Box
				display="flex"
				flexDirection="column"
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit(onHandleSubmit)}
				sx={{ mt: 2 }}
			>
				<Typography
					variant="h6"
					component="h1"
					sx={{ textAlign: 'center', mb: '1.5rem' }}
				>
					Add Color
				</Typography>
				<Grid container justifyContent="center">
					<Stack
						sx={{
							textAlign: 'center',
							width: '100%',
						}}
					>
						<FormInput label="Name" type="text" name="name" required />
						<FormInput type="text" label="Hex" name="hex" required />
					</Stack>
				</Grid>

				<LoadingButton
					fullWidth
					variant="contained"
					sx={{
						py: '0.6rem',
						mt: 2,
						width: '80%',
						marginInline: 'auto',
					}}
					type="submit"
					loading={isLoading}
				>
					Add Color
				</LoadingButton>
			</Box>
		</FormProvider>
	);
};

export default AddColor;
