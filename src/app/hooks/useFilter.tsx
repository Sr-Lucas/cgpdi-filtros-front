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
const filteredFileAtom = atom<string>('');

type InputField = {
	label: string;
	type: string;
	id: string;
	name: string;
	required: boolean;
};

type FilterType = {
	id: string;
	name: string;
	method: (data: HandleParams) => void;
	inputFields: InputField[];
	modalId?: number;
	type: 'image-manipulation' | 'hight-pass' | 'low-pass';
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
	handleNcColors = 6,
	handleHightboost = 7,
	handlennrAmpliation = 8,
	handlebirAmpliation = 9,
}

export const useImageFilter = ({ fileUploadName }: UseImageFilterProps) => {
	const [modalOpen, setModalOpen] = useState<number | null>(null);
	const [filteredFileURL, setFilteredFileURL] = useAtom(filteredURLAtom);
	const [filteredFile, setFilteredFile] = useAtom(filteredFileAtom);

	const onSubmit = async (filter: IFilter) => {
		await handleFilter(filter);
	};

	const handleFilter = async (filter: IFilter) => {
		if (!fileUploadName) return;

		const {
			data: { url },
		} = await filter.apply({ filename: fileUploadName });

		await getImageFileReaderResult(url);

		setFilteredFileURL(url);
		setModalOpen(null);
	};

	const getImageFileReaderResult = async (url: string) => {
		fetch(url)
			.then(response => response.blob())
			.then(blob => {
				const fileReader = new FileReader();
				fileReader.onload = () => {
					const result = fileReader.result ?? '';
					setFilteredFile(result as string);
				};
				fileReader.readAsDataURL(blob);
			});
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

	const handlennrAmpliation = async (data: HandleParams) => {
		Filters.nnrAmpliation.scaleFactor = Number(data.scale_factor);
		handleFilter(Filters.nnrAmpliation);
	};

	const handlebirAmpliation = async (data: HandleParams) => {
		Filters.birAmpliation.scaleFactor = Number(data.scale_factor);
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

	const handlehightboost = async (data: HandleParams) => {
		Filters.HightBoostFilter.percentual = Number((data.percentual ?? 50) / 100);
		onSubmit(Filters.HightBoostFilter);
	};

	const handleprewitt = async () => {
		handleFilter(Filters.PrewittFilter);
	};

	const handlesobel = async () => {
		handleFilter(Filters.SobelFilter);
	};

	const handleNcColors = async (data: HandleParams) => {
		Filters.simulateGreyLevelReduction.n = Number(data.n);
		onSubmit(Filters.simulateGreyLevelReduction);
	};

	const filters: FilterType[] = [
		{
			id: 'negative',
			name: 'Negativo',
			method: handleNegativeFilter,
			inputFields: [],
			type: 'low-pass',
		},
		{
			id: 'logarithmic',
			name: 'Logarítmico',
			method: handleLogarithmicFilter,
			inputFields: [],
			type: 'low-pass',
		},
		{
			id: 'inverselog',
			name: 'Logarítmico Inverso',
			method: handleInverseLogFilter,
			inputFields: [],
			type: 'low-pass',
		},
		{
			id: 'nthpower',
			name: 'Filtro da Potência',
			method: handleNthPowerFilter,
			modalId: ModalEnum.handleNthPowerFilter,
			type: 'low-pass',
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
			id: 'nth_root',
			name: 'Filtro da Raiz',
			method: handlenthRootFilter,
			modalId: ModalEnum.handleNthRootFilter,
			type: 'low-pass',
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
			id: 'mirroring-horizontal',
			name: 'Espelhamento Horizontal',
			type: 'image-manipulation',
			method: handleHorizontalMirrorFilter,
			inputFields: [],
		},
		{
			id: 'mirroring-vertical',
			name: 'Espelhamento Vertical',
			method: handleverticalMirrorFilter,
			type: 'image-manipulation',
			inputFields: [],
		},
		{
			id: 'rotation-90-clockwise',
			name: 'Rotação 90º graus sentido horario',
			method: handlerotation90ClockwiseFilter,
			type: 'image-manipulation',
			inputFields: [],
		},
		{
			id: 'rotation-90-anticlockwise',
			name: 'Rotação 90º AntiHorario',
			type: 'image-manipulation',
			method: handlerotation90AnticlockwiseFilter,
			inputFields: [],
		},
		{
			id: 'compression',
			name: 'Compressão de Imagem',
			method: handleCompression,
			type: 'image-manipulation',
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
			id: 'expansion',
			name: 'Expansão de Imagem',
			method: handleExpansion,
			modalId: ModalEnum.handleExpansion,
			type: 'image-manipulation',
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
			id: 'max-filter',
			name: 'Filtro "Máx"',
			type: 'low-pass',
			method: handlemaxFilter,
			inputFields: [],
		},
		{
			id: 'min-filter',
			name: 'Filtro "Mín"',
			method: handleminFilter,
			type: 'low-pass',
			inputFields: [],
		},
		{
			id: 'mode-filter',
			name: 'Filtro da Moda',
			method: handlemodaFilter,
			type: 'low-pass',
			inputFields: [],
		},
		{
			id: 'pseudo-median-filter',
			name: 'PseudoMediana',
			type: 'low-pass',
			method: handlepseudoMedianaFilter,
			inputFields: [],
		},
		{
			id: 'nnr',
			name: 'Nearest Neighboor Resampling',
			method: handlennrAmpliation,
			modalId: ModalEnum.handlennrAmpliation,
			type: 'image-manipulation',
			inputFields: [
				{
					id: 'scale_factor',
					name: 'scale_factor',
					label: 'Scale Factor',
					type: 'number',
					required: true,
				},
			],
		},
		{
			id: 'bilinear',
			name: 'Bilinear Interpolation Resampling',
			type: 'image-manipulation',
			method: handlebirAmpliation,
			modalId: ModalEnum.handlebirAmpliation,
			inputFields: [
				{
					id: 'scale_factor',
					name: 'scale_factor',
					label: 'Scale Factor',
					type: 'number',
					required: true,
				},
			],
		},
		{
			id: 'k-nearest-neighbour',
			name: 'K Vizinhos',
			method: handlekNearestNeighbour,
			modalId: ModalEnum.handlekNearestNeighbour,
			type: 'low-pass',
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
			id: 'histogram',
			name: 'Histograma',
			method: handlemakeHistogram,
			type: 'image-manipulation',
			inputFields: [],
		},
		{
			id: 'histogram-equalization',
			name: 'Equalização de imagem',
			method: handleequalizeImage,
			type: 'image-manipulation',
			inputFields: [],
		},
		{
			id: 'sum-images',
			name: 'Soma de imagens',
			method: handlesumImages,
			modalId: ModalEnum.handleSumImage,
			type: 'image-manipulation',
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
			id: 'laplanian',
			name: 'Filtro Laplaciano',
			method: handlelaplaciano,
			type: 'hight-pass',
			inputFields: [],
		},
		{
			id: 'highboost',
			name: 'Filtro HighBoost',
			method: handlehightboost,
			modalId: ModalEnum.handleHightboost,
			type: 'hight-pass',
			inputFields: [
				{
					label: 'Percentual %',
					type: 'number',
					id: 'percentual',
					name: 'percentual',
					required: true,
				},
			],
		},
		{
			id: 'prewitt',
			name: 'Filtro Prewitt',
			method: handleprewitt,
			type: 'hight-pass',
			inputFields: [],
		},
		{
			id: 'sobel',
			name: 'Filtro Sobel',
			method: handlesobel,
			type: 'hight-pass',
			inputFields: [],
		},
		{
			id: 'simulate-nc-colors',
			name: 'Simular reducao de paleta de NC',
			method: handleNcColors,
			modalId: ModalEnum.handleNcColors,
			type: 'image-manipulation',
			inputFields: [
				{
					label: 'N',
					type: 'number',
					id: 'n',
					name: 'n',
					required: true,
				},
			],
		},
	];

	return {
		filters,
		filteredFileURL,
		modalOpen,
		setModalOpen,
		filteredFile,
	};
};
