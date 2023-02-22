import NextImage from 'next/image';
import { useRef } from 'react';
import { useMouse } from '../hooks/useMouse';

// import './main.scss';

type InputImageParams = {
	inputImage: string | ArrayBuffer | null | undefined;
	handleInputImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputImage = ({ handleInputImage, inputImage }: InputImageParams) => {
	const inputImageRef = useRef<HTMLDivElement>(null);
	const { mousePos, handleMouseMoveCB, getPixelNC } = useMouse(inputImage, inputImageRef);

	return (
		<>
			<label htmlFor="input-image">Input Image</label>
			<label htmlFor="input-image">
				(x: {mousePos.x}, y: {mousePos.y} , NC: {getPixelNC(mousePos.x, mousePos.y)})
			</label>
			<div
				ref={inputImageRef}
				id="input-image"
				onMouseEnter={() => {
					if (!inputImage) return;
					window.addEventListener('mousemove', handleMouseMoveCB);
				}}
				onMouseOut={() => {
					if (!inputImage) return;
					window.removeEventListener('mousemove', handleMouseMoveCB);
				}}
				style={{
					backgroundImage: inputImage ? `url(${inputImage})` : undefined,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<input type="file" accept="image/bmp" onChange={e => handleInputImage(e)} />
				{inputImage ? <></> : <NextImage alt="" src="/images/image-gallery.png" width={20} height={20} />}
			</div>
		</>
	);
};
