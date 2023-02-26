'use client';

import './main.scss';

import { InputImage } from './components/InputImage';
import { OutputImage } from './components/OutputImage';
import { useImageFilter } from './hooks/useFilter';
import { useImageInput } from './hooks/useImageInput';
import { FilterButton } from './components/FilterButton';
import { ModalInputs } from './components/ModalInputs';

export default function Home() {
	const { fileUploadName, inputImage, handleInputImage } = useImageInput();
	const { filteredFileURL, filters, modalOpen, setModalOpen } = useImageFilter({ fileUploadName });

	return (
		<main id="main-container">
			<div id="main-content">
				<h1>Filtros</h1>
				<div id="filters">
					{filters.map(filter => (
						<div key={filter.id + '-button'}>
							<FilterButton
								filterName={filter.name}
								handleFilter={filter.inputFields.length > 0 ? () => setModalOpen(filter.modalId ?? null) : filter.method}
							/>
							{filter.inputFields.length > 0 && (
								<ModalInputs
									key={filter.id + '-modal'}
									inputFields={filter.inputFields}
									isOpen={modalOpen === filter.modalId}
									onClose={() => setModalOpen(null)}
									onSend={filter.method ?? (() => console.log('vazio'))}
								/>
							)}
						</div>
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
