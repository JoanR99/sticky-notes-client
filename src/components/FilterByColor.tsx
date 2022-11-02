import { Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useGetColors from '../hooks/useGetColors';
import { Color } from '../types/Note';
import { useAtom } from 'jotai';
import { colorFilterAtom } from '../atoms';

const FilterByColor = () => {
	const { t } = useTranslation('translation');

	const { data: colors } = useGetColors();
	const [colorFilter, setColorFilter] = useAtom(colorFilterAtom);

	return (
		<FormControl sx={{ m: 1, minWidth: 80 }}>
			<InputLabel id="colors" sx={{ mr: 2 }}>
				Color
			</InputLabel>
			<Select
				label={t('labels.select_color')}
				labelId="colors"
				onChange={(e) => setColorFilter(e.target.value)}
				value={colorFilter}
			>
				<MenuItem key={0} value="all">
					{t(`colors.all`)}
				</MenuItem>
				{colors?.map((color: Color) => (
					<MenuItem key={color.id} value={color.name}>
						<Box
							component="span"
							sx={{
								height: 20,
								width: 20,
								backgroundColor: color.hex,
								mr: 2,
								border: '1px solid black',
							}}
						></Box>
						{t(`colors.${color.name}`)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default FilterByColor;
