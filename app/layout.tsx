'use client'

import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import AuthContext from './context/AuthContext'
import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [mounted, setMounted] = useState(false) // avoid wakeable.then error: work with useEffect for checking if it's mounted on the client

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted)
		return (
			<html lang='en'>
				<head />
				<body></body>
			</html>
		)

	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<main className='min-h-screen w-screen bg-gray-100'>
					<AuthContext>
						<main className='m-auto max-w-screen-2xl bg-white'>
							<NavBar />
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	)
}
