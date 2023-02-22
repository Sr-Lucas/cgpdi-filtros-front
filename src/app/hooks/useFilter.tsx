import { filters as Filters } from '@/modules/filters';
import { IFilter } from '@/modules/filters/generic/filter';
import { atom, useAtom } from 'jotai';

type UseImageFilterProps = {
	fileUploadName: string;
};

const filteredURLAtom = atom<string>('');

export const useImageFilter = ({ fileUploadName }: UseImageFilterProps) => {
	const [filteredFileURL, setFilteredFileURL] = useAtom(filteredURLAtom);

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

	const handlenthpowerFilter = async () => {
		handleFilter(Filters.nthpowerFilter);
	};

	const handlenthRootFilter = async () => {
		handleFilter(Filters.nthRootFilter);
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

	const handlekNearestNeighbour = async () => {
		handleFilter(Filters.kNearestNeighbour);
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
	const filters = [
		{
			name: 'Negativo',
			method: handleNegativeFilter,
		},
		{
			name: 'Logarítmico',
			method: handleLogarithmicFilter,
		},
		{
			name: 'Logarítmico Inverso',
			method: handleInverseLogFilter,
		},
		{
			name: 'Filtro da Potência',
			method: handlenthpowerFilter,
		},
		{
			name: 'Filtro da Raiz',
			method: handlenthRootFilter,
		},
		{
			name: 'Espelhamento Horizontal',
			method: handleHorizontalMirrorFilter,
		},
		{
			name: 'Espelhamento Vertical',
			method: handleverticalMirrorFilter,
		},
		{
			name: 'Rotação 90º graus sentido horario',
			method: handlerotation90ClockwiseFilter,
		},
		{
			name: 'Rotação 90º AntiHorario',
			method: handlerotation90AnticlockwiseFilter,
		},
		{
			name: 'Compressão de Imagem',
			method: handleCompression,
		},
		{
			name: 'Expansão de Imagem',
			method: handleExpansion,
		},
		{
			name: 'Filtro "Máx"',
			method: handlemaxFilter,
		},
		{
			name: 'Filtro "Mín"',
			method: handleminFilter,
		},
		{
			name: 'Filtro da Moda',
			method: handlemodaFilter,
		},
		{
			name: 'PseudoMediana',
			method: handlepseudoMedianaFilter,
		},
		{
			name: 'Nearest Neighboor Resampling',
			method: handlennrAmpliation,
		},
		{
			name: 'Bilinear Interpolation Resampling',
			method: handlebirAmpliation,
		},
		{
			name: 'K Vizinhos',
			method: handlekNearestNeighbour,
		},
		{
			name: 'Histograma',
			method: handlemakeHistogram,
		},
		{
			name: 'Equalização de imagem',
			method: handleequalizeImage,
		},
		{
			name: 'Soma de imagens',
			method: handlesumImages,
		},
		{
			name: 'Filtro Laplaciano',
			method: handlelaplaciano,
		},
		{
			name: 'Filtro HighBoost',
			method: handlehightboost,
		},
		{
			name: 'Filtro Prewitt',
			method: handleprewitt,
		},
		{
			name: 'Filtro Sobel',
			method: handlesobel,
		},
	];

	return {
		filters,
		filteredFileURL,
	};
};
