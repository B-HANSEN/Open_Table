'use client'

import Image from 'next/image'
import errorMascot from '../../public/icons/error.png'

const NotFound = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-center bg-gray-400'>
			<Image alt='error' className='mb-8 w-56' src={errorMascot} />
			<div className='rounded bg-white px-9 py-14 shadow'>
				<h3 className='font-bold text-3xl'>Well, this is embarrassing</h3>
				<p className='font-bold text-reg'>We couldn't find that restaurant</p>
				<p className='mt-6 font-light text-sm'>Error Code: 404</p>
			</div>
		</div>
	)
}

export default NotFound
