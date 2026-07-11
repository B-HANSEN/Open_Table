'use client' // using global context requires to use client components!!

import { Alert, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useContext, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'
import AuthModalInput from './AuthModalInput'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}

const AuthModal = ({ isSignin }: { isSignin: boolean }) => {
	// basic MUI modal
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const { signin, signup } = useAuth()
	const { loading, error } = useContext(AuthenticationContext)

	const [inputs, setInputs] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		city: '',
		password: '',
		confirmPassword: '',
	})

	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		if (isSignin) {
			if (inputs.password && inputs.email) {
				return setDisabled(false)
			}
		} else {
			if (
				inputs.firstName &&
				inputs.lastName &&
				inputs.email &&
				inputs.password &&
				inputs.confirmPassword &&
				inputs.password === inputs.confirmPassword &&
				inputs.city &&
				inputs.phone
			) {
				return setDisabled(false)
			}
		}
		setDisabled(true)
	}, [inputs, isSignin])

	const handleClick = () => {
		if (isSignin) {
			signin({ email: inputs.email, password: inputs.password }, handleClose)
		} else {
			signup(inputs, handleClose)
		}
	}

	const renderContent = (signinContent: string, signupContent: string) => {
		return isSignin ? signinContent : signupContent
	}

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div>
			<button
				className={`${renderContent(
					// render styles and button text conditionally
					'bg-blue-400 text-white',
					''
				)} mr-3 rounded border p-1 px-4`}
				onClick={handleOpen}
				type='button'
			>
				{renderContent('Sign in', 'Sign up')}
			</button>
			<Modal
				aria-describedby='modal-modal-description'
				aria-labelledby='modal-modal-title'
				onClose={handleClose}
				open={open}
			>
				<Box sx={style}>
					{loading ? (
						<div className='flex h-[600px] justify-center py-24'>
							<CircularProgress />
						</div>
					) : (
						<div className='h-[600px] p-2'>
							{error && (
								<Alert className='mb-4' severity='error'>
									{error}
								</Alert>
							)}
							<div className='uppcase mb-2 border-b pb-2 text-center font-bold'>
								<p className='text-sm'>
									{renderContent('Sign in', 'Create account')}
								</p>
							</div>
							<div className='m-auto'>
								<h2 className='text-center font-light text-2xl'>
									{renderContent(
										'Log Into Your Account',
										'Create Your OpenTable Account'
									)}
								</h2>
								<AuthModalInput
									handleChangeInput={handleChangeInput}
									inputs={inputs}
									isSignin={isSignin}
								/>
								<button
									className='mb-5 w-full rounded bg-red-600 p-3 text-sm text-white uppercase disabled:bg-gray-400'
									disabled={disabled}
									onClick={handleClick}
									type='button'
								>
									{renderContent('Sign in', 'Create account')}
								</button>
							</div>
						</div>
					)}
				</Box>
			</Modal>
		</div>
	)
}

export default AuthModal
