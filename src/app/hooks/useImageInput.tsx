import { useState } from 'react';

import { upload } from '@/modules/upload';

export const useImageInput = () => {
	const [inputImage, setInputImage] = useState<any>(null);
	const [fileUploadName, setFileUploadName] = useState<string>('');

	const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length !== 0) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = async fileReader => {
				setInputImage(fileReader.target?.result);
				const filename = await upload.uploadImage.single({ image: file });
				console.log('filename uploaded', filename);
				setFileUploadName(filename);
			};

			reader.readAsDataURL(file);
		}
	};

	return { handleInputImage, inputImage, fileUploadName };
};
