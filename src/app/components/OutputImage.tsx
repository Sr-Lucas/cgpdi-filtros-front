type OutputImageProps = {
	filteredFileURL: string | undefined;
};

export const OutputImage = ({ filteredFileURL }: OutputImageProps) => {
	return (
		<>
			<label htmlFor="output-image">Output Image</label>
			<div
				id="output-image"
				style={{
					backgroundImage: filteredFileURL ? `url(${filteredFileURL})` : undefined,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
		</>
	);
};
