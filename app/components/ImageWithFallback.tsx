'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

export default function ImageWithFallback({ src, alt, ...props }: ImageProps) {
	const [imageLoaded, setImageLoaded] = useState(true)

	if (!imageLoaded) {
		return (
			<div
				aria-label={alt}
				className='flex h-full w-full items-center justify-center bg-gray-200'
				role='img'
			>
				<span className='text-gray-400 text-xs'>No image</span>
			</div>
		)
	}

	return (
		<Image
			alt={alt}
			src={src}
			{...props}
			onError={() => setImageLoaded(false)}
		/>
	)
}
