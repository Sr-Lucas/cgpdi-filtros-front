import React, { useCallback, useState } from 'react';

export const useMouse = (inputImage: string | undefined, ref: React.RefObject<HTMLDivElement>) => {
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	});
	const handleMouseMove = (e: any) => {
		const imgX = ref.current?.offsetLeft;
		const imgY = ref.current?.offsetTop;
		setMousePos({ x: e.clientX - (imgX ?? 0), y: e.clientY - (imgY ?? 0) });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleMouseMoveCB = useCallback((e: any) => handleMouseMove(e), []);

	const getPixelNC = (x: number, y: number): number => {
		if (!inputImage) return 0;

		var img = new Image();
		img.src = inputImage;
		img.width = 256;
		img.height = 256;
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var context = canvas.getContext('2d');
		context?.drawImage(img, 0, 0);

		const red = context?.getImageData(x, y, canvas.width, canvas.height).data[0] ?? 0;
		const green = context?.getImageData(x, y, canvas.width, canvas.height).data[1] ?? 0;
		const blue = context?.getImageData(x, y, canvas.width, canvas.height).data[2] ?? 0;

		const grayLevel = (red + green + blue) / 3;

		return Math.ceil(grayLevel);
	};

	return { mousePos, handleMouseMoveCB, getPixelNC };
};
