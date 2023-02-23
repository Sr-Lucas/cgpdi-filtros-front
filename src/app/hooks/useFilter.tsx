import { filters as Filters } from '@/modules/filters';
import { IFilter } from '@/modules/filters/generic/filter';
import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type UseImageFilterProps = {
	fileUploadName: string;
};

const filteredURLAtom = atom<string>('');

type InputField = {
	label: string;
	type: string;
	id: string;
	name: string;
	required: boolean;
};

type FilterType = {
	name: string;
	method: (data: HandleParams) => void;
	inputFields: InputField[];
};

type HandleParams = {
	[key: string]: any;
};

export const useImageFilter = ({ fileUploadName }: UseImageFilterProps) => {
	const [isModalInputOpen, setIsModalInputOpen] = useState(false);
	const [filteredFileURL, setFilteredFileURL] = useAtom(filteredURLAtom);

	const { register, handleSubmit } = useForm({});

	const onSubmit = async (filter: IFilter) => {
		await handleFilter(filter);
	};

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

	const handleInverseLogFilter = async () => {
		handleFilter(Filters.inverselogFilter);
	};

	const handleNthPowerFilter = async (data: HandleParams) => {
		Filters.nthPowerFilter.gamma = Number(data.gamma);
		onSubmit(Filters.nthPowerFilter);
	};

	const handlenthRootFilter = async (data: HandleParams) => {
		Filters.nthRootFilter.gamma = Number(data.gamma);
		onSubmit(Filters.nthRootFilter);
	};

	const handleHorizontalMirrorFilter = async () => {
		handleFilter(Filters.HorizontalMirrorFilter);
	};

	const handleverticalMirrorFilter = async () => {
		handleFilter(Filters.verticalMirrorFilter);
	};

	const handlerotation90ClockwiseFilter = async () => {
		handleFilter(Filters.rotation90ClockwiseFilter);
	};

	const handlerotation90AnticlockwiseFilter = async () => {
		handleFilter(Filters.rotation90AnticlockwiseFilter);
	};

	const handleCompression = async () => {
		handleFilter(Filters.compression);
	};

	const handleExpansion = async () => {
		handleFilter(Filters.expansion);
	};

	const handlemaxFilter = async () => {
		handleFilter(Filters.maxFilter);
	};

	const handleminFilter = async () => {
		handleFilter(Filters.minFilter);
	};

	const handlemodaFilter = async () => {
		handleFilter(Filters.modaFilter);
	};

	const handlepseudoMedianaFilter = async () => {
		handleFilter(Filters.pseudoMedianaFilter);
	};

	const handlennrAmpliation = async () => {
		handleFilter(Filters.nnrAmpliation);
	};

	const handlebirAmpliation = async () => {
		handleFilter(Filters.birAmpliation);
	};

	const handlekNearestNeighbour = async (data: HandleParams) => {
		Filters.kNearestNeighbour.k = Number(data.k);
		onSubmit(Filters.kNearestNeighbour);
	};

	const handlemakeHistogram = async () => {
		handleFilter(Filters.makeHistogram);
	};

	const handleequalizeImage = async () => {
		handleFilter(Filters.equalizeImage);
	};

	const handlesumImages = async () => {
		handleFilter(Filters.sumImages);
	};

	const handlelaplaciano = async () => {
		handleFilter(Filters.laplaciano);
	};

	const handlehightboost = async () => {
		handleFilter(Filters.HightBoostFilter);
	};

	const handleprewitt = async () => {
		handleFilter(Filters.PrewittFilter);
	};

	const handlesobel = async () => {
		handleFilter(Filters.SobelFilter);
	};
	const filters: FilterType[] = [
		{
			name: 'Negativo',
			method: handleNegativeFilter,
			inputFields: [],
		},
		{
			name: 'Logarítmico',
			method: handleLogarithmicFilter,
			inputFields: [],
		},
		{
			name: 'Logarítmico Inverso',
			method: handleInverseLogFilter,
			inputFields: [],
		},
		{
			name: 'Filtro da Potência',
			method: handleNthPowerFilter,
			inputFields: [
				{
					label: 'Gamma',
					type: 'number',
					id: 'gamma',
					name: 'gamma',
					required: true,
				},
			],
		},
		{
			name: 'Filtro da Raiz',
			method: handlenthRootFilter,
			inputFields: [
				{
					label: 'Gamma',
					type: 'number',
					id: 'gamma',
					name: 'gamma',
					required: true,
				},
			],
		},
		{
			name: 'Espelhamento Horizontal',
			method: handleHorizontalMirrorFilter,
			inputFields: [],
		},
		{
			name: 'Espelhamento Vertical',
			method: handleverticalMirrorFilter,
			inputFields: [],
		},
		{
			name: 'Rotação 90º graus sentido horario',
			method: handlerotation90ClockwiseFilter,
			inputFields: [],
		},
		{
			name: 'Rotação 90º AntiHorario',
			method: handlerotation90AnticlockwiseFilter,
			inputFields: [],
		},
		{
			name: 'Compressão de Imagem',
			method: handleCompression,
			inputFields: [],
		},
		{
			name: 'Expansão de Imagem',
			method: handleExpansion,
			inputFields: [],
		},
		{
			name: 'Filtro "Máx"',
			method: handlemaxFilter,
			inputFields: [],
		},
		{
			name: 'Filtro "Mín"',
			method: handleminFilter,
			inputFields: [],
		},
		{
			name: 'Filtro da Moda',
			method: handlemodaFilter,
			inputFields: [],
		},
		{
			name: 'PseudoMediana',
			method: handlepseudoMedianaFilter,
			inputFields: [],
		},
		{
			name: 'Nearest Neighboor Resampling',
			method: handlennrAmpliation,
			inputFields: [],
		},
		{
			name: 'Bilinear Interpolation Resampling',
			method: handlebirAmpliation,
			inputFields: [],
		},
		{
			name: 'K Vizinhos',
			method: handlekNearestNeighbour,
			inputFields: [
				{
					label: 'K',
					type: 'number',
					id: 'k',
					name: 'k',
					required: true,
				},
			],
		},
		{
			name: 'Histograma',
			method: handlemakeHistogram,
			inputFields: [],
		},
		{
			name: 'Equalização de imagem',
			method: handleequalizeImage,
			inputFields: [],
		},
		{
			name: 'Soma de imagens',
			method: handlesumImages,
			inputFields: [],
		},
		{
			name: 'Filtro Laplaciano',
			method: handlelaplaciano,
			inputFields: [],
		},
		{
			name: 'Filtro HighBoost',
			method: handlehightboost,
			inputFields: [],
		},
		{
			name: 'Filtro Prewitt',
			method: handleprewitt,
			inputFields: [],
		},
		{
			name: 'Filtro Sobel',
			method: handlesobel,
			inputFields: [],
		},
	];

	return {
		filters,
		filteredFileURL,
		isModalInputOpen,
		setIsModalInputOpen,
		handleSubmit,
		register,
	};
};
