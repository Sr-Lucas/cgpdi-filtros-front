import { useState } from 'react';

import { filters as Filters } from '@/modules/filters';
import { IFilter } from '@/modules/filters/generic/filter';

type UseImageFilterProps = {
	fileUploadName: string;
};

export const useImageFilter = ({ fileUploadName }: UseImageFilterProps) => {
	const [filteredFileURL, setFilteredFileURL] = useState<string>('');

	const handleFilter = async (filter: IFilter) => {
		if (!fileUploadName) return;

		const {
			data: { url },
		} = await filter.apply({ filename: fileUploadName });

		setFilteredFileURL(url);
	};

	const handleNegativeFilter = async () => {
		handleFilter(Filters.negativeFilter);
	};

	const handleLogarithmicFilter = async () => {
		handleFilter(Filters.logarithmicFilter);
	};

	const filters = [
		{
			name: 'Negativo',
			method: handleNegativeFilter,
		},
		{
			name: 'Logarítmico',
			method: handleLogarithmicFilter,
		},
	];

	return {
		filters,
		filteredFileURL,
	};
};
