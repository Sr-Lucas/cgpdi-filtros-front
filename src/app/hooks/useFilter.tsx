import { filters as Filters } from '@/modules/filters';
import { IFilter } from '@/modules/filters/generic/filter';
import { upload } from '@/modules/upload';
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
	modalId?: number;
};

type HandleParams = {
	[key: string]: any;
};

enum ModalEnum {
	handleNthPowerFilter = 0,
	handleNthRootFilter = 1,
	handleCompression = 2,
	handleExpansion = 3,
	handleSumImage = 4,
	handlekNearestNeighbour = 5,
}

export const useImageFilter = ({ fileUploadName }: UseImageFilterProps) => {
	const [modalOpen, setModalOpen] = useState<number | null>(null);
	const [filteredFileURL, setFilteredFileURL] = useAtom(filteredURLAtom);

	const onSubmit = async (filter: IFilter) => {
		await handleFilter(filter);
	};

	const handleFilter = async (filter: IFilter) => {
		if (!fileUploadName) return;

		const {
			data: { url },
		} = await filter.apply({ filename: fileUploadName });

		setFilteredFileURL(url);
		setModalOpen(null);
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

	const handleCompression = async (data: HandleParams) => {
		Filters.compression.a = Number(data.a);
		Filters.compression.b = Number(data.b);
		onSubmit(Filters.compression);
	};

	const handleExpansion = async (data: HandleParams) => {
		Filters.expansion.a = Number(data.a);
		Filters.expansion.b = Number(data.b);
		onSubmit(Filters.expansion);
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

	const handlesumImages = async (data: HandleParams) => {
		if (!data.filename2[0]) {
			return alert('Selecione uma imagem para somar');
		}

		Filters.sumImages.filename1 = fileUploadName;
		Filters.sumImages.filename2 = await upload.uploadImage.single({ image: data.filename2[0] });

		const {
			data: { url },
		} = await Filters.sumImages.apply();

		setFilteredFileURL(url);
		setModalOpen(null);
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
			modalId: ModalEnum.handleNthPowerFilter,
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
			modalId: ModalEnum.handleNthRootFilter,
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
			modalId: ModalEnum.handleCompression,
			inputFields: [
				{
					label: 'A',
					type: 'number',
					id: 'a',
					name: 'a',
					required: true,
				},
				{
					label: 'B',
					type: 'number',
					id: 'b',
					name: 'b',
					required: true,
				},
			],
		},
		{
			name: 'Expansão de Imagem',
			method: handleExpansion,
			modalId: ModalEnum.handleExpansion,
			inputFields: [
				{
					label: 'A',
					type: 'number',
					id: 'a',
					name: 'a',
					required: true,
				},
				{
					label: 'B',
					type: 'number',
					id: 'b',
					name: 'b',
					required: true,
				},
			],
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
			modalId: ModalEnum.handlekNearestNeighbour,
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
			modalId: ModalEnum.handleSumImage,
			inputFields: [
				{
					id: 'filename2',
					name: 'filename2',
					type: 'file',
					required: true,
					label: 'Imagem 2',
				},
			],
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
		modalOpen,
		setModalOpen,
	};
};
