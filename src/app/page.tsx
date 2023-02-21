'use client';

import './main.scss';

import { InputImage } from './components/InputImage';
import { OutputImage } from './components/OutputImage';
import { useImageFilter } from './hooks/useFilter';
import { useImageInput } from './hooks/useImageInput';
import { FilterButton } from './components/FilterButton';

export default function Home() {
	const { fileUploadName, inputImage, handleInputImage } = useImageInput();

	const { filteredFileURL, filters } = useImageFilter({ fileUploadName });

	return (
		<main id="main-container">
			<div id="main-content">
				<h1>Filtros</h1>
				<div id="filters">
					{filters.map(filter => (
						<FilterButton key={filter.name} filterName={filter.name} handleFilter={filter.method} />
					))}
				</div>

				<h1>Imagens</h1>
				<div id="images">
					<InputImage inputImage={inputImage} handleInputImage={handleInputImage} />
					<OutputImage filteredFileURL={filteredFileURL} />
				</div>
			</div>
		</main>
	);
}
