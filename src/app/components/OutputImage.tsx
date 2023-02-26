import { useRef } from 'react';
import { useMouse } from '../hooks/useMouse';

type OutputImageProps = {
	filteredFileURL: string | undefined;
	fileReaderResult: string | ArrayBuffer | null | undefined;
};

export const OutputImage = ({ filteredFileURL, fileReaderResult }: OutputImageProps) => {
	console.log('OutputImage: ', filteredFileURL, fileReaderResult);

	return (
		<div id="output-image-container">
			<label htmlFor="output-image">Output Image</label>
			<label htmlFor="input-image" style={{ opacity: 0 }}>
				|
			</label>
			<a href={filteredFileURL} target="_blank" download="download.bmp" rel="noreferrer">
				<div
					id="output-image"
					style={{
						backgroundImage: filteredFileURL ? `url(${filteredFileURL})` : undefined,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<div id="download-image">
						<p>Download image</p>
					</div>
				</div>
			</a>
		</div>
	);
};
