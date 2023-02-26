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
	const { filteredFileURL, filters, modalOpen, setModalOpen, filteredFile } = useImageFilter({ fileUploadName });

	return (
		<main id="main-container">
			<div id="header">
				<h1>Filtros :: PDI :: Disciplina Especial</h1>
				<h2>Trabalho do Estudo dirigido 2</h2>
			</div>

			<div id="images">
				<InputImage inputImage={inputImage} handleInputImage={handleInputImage} />
				<OutputImage filteredFileURL={filteredFileURL} fileReaderResult={filteredFile} />
			</div>

			<div id="filters-container">
				<h3>Selecione o filtro:</h3>
				<div id="filters">
					<div id="image-manipulation">
						<h4>Manipulação</h4>
						<div className="filter-buttons-list">
							{filters
								.filter(filter => filter.type === 'image-manipulation')
								.map(filter => (
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
					</div>
					<div id="hight-pass">
						<h4>Passa Alta</h4>
						<div className="filter-buttons-list">
							{filters
								.filter(filter => filter.type === 'hight-pass')
								.map(filter => (
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
					</div>
					<div id="low-pass">
						<h4>Passa Baixa</h4>
						<div className="filter-buttons-list">
							{filters
								.filter(filter => filter.type === 'low-pass')
								.map(filter => (
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
					</div>
				</div>
			</div>

			<div id="footer">
				<p>Desenvolvido por: Lucas Santos & Yngrid Felicissima</p>
			</div>
		</main>
	);
}
