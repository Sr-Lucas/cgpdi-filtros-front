type OutputImageProps = {
	filteredFileURL: string | undefined;
};

export const OutputImage = ({ filteredFileURL }: OutputImageProps) => {
	return (
		<>
			<label htmlFor="output-image">Output Image</label>
			<a href={filteredFileURL} target="_blank" download="download.bmp" rel="noreferrer">
				<div
					id="output-image"
					style={{
						backgroundImage: filteredFileURL ? `url(${filteredFileURL})` : undefined,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				></div>
			</a>
		</>
	);
};
