'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({ src, alt, ...props }: ImageProps) {
	const [imageLoaded, setImageLoaded] = useState(true);

	if (!imageLoaded) {
		return (
			<div
				aria-label={alt}
				className='w-full h-full bg-gray-200 flex items-center justify-center'
				role='img'
			>
				<span className='text-gray-400 text-xs'>No image</span>
			</div>
		);
	}

	return (
		<Image alt={alt} src={src} {...props} onError={() => setImageLoaded(false)} />
	);
}
