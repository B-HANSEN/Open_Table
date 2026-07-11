'use client'

import Link from 'next/link'
import { useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'
import AuthModal from './AuthModal'

const NavBar = () => {
	const { data, loading } = useContext(AuthenticationContext)
	const { signout } = useAuth()

	return (
		<nav className='flex justify-between bg-white p-2'>
			<Link className='font-bold text-2xl text-gray-700' href='/'>
				{' '}
				OpenTable{' '}
			</Link>
			{loading ? null : (
				<div>
					<div className='flex'>
						{data ? (
							<button
								className='mr-3 rounded border bg-blue-400 p-1 px-4 text-white'
								onClick={signout}
								type='button'
							>
								Sign out
							</button>
						) : (
							<>
								<AuthModal isSignin={true} />
								<AuthModal isSignin={false} />
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}

export default NavBar
