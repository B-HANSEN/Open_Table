'use client' // to convert from server component to client component to utilise useRouter()-hook

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
	const router = useRouter()
	const [location, setLocation] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (location === '') return
		router.push(`/search/?city=${location}`)
		setLocation('')
	}

	return (
		<form
			className='m-auto flex justify-center py-3 text-left text-lg'
			onSubmit={handleSubmit}
		>
			<label className='sr-only' htmlFor='location-search'>
				Search by state, city or town
			</label>
			<input
				className='mr-3 w-[450px] rounded bg-white p-3 text-gray-900 shadow-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'
				id='location-search'
				onChange={(e) => setLocation(e.target.value)}
				placeholder='State, city or town'
				type='text'
				value={location}
			/>
			<button className='rounded bg-red-600 px-9 py-2 text-white' type='submit'>
				Let's go
			</button>
		</form>
	)
}
