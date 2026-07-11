import type React from 'react'

interface Props {
	inputs: {
		firstName: string
		lastName: string
		email: string
		phone: string
		city: string
		password: string
		confirmPassword: string
	}
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
	isSignin: boolean
}

const AuthModalInput = ({ inputs, handleChangeInput, isSignin }: Props) => {
	return (
		<>
			{isSignin ? null : (
				<div className='my-3 flex justify-between text-sm'>
					<input
						aria-label='First name'
						className='w-[49%] rounded border p-2 py-3'
						name='firstName'
						onChange={handleChangeInput}
						placeholder='First name'
						type='text'
						value={inputs.firstName}
					/>
					<input
						aria-label='Last name'
						className='w-[49%] rounded border p-2 py-3'
						name='lastName'
						onChange={handleChangeInput}
						placeholder='Last name'
						type='text'
						value={inputs.lastName}
					/>
				</div>
			)}
			<div className='my-3 flex justify-between text-sm'>
				<input
					aria-label='Email'
					className='w-full rounded border p-2 py-3'
					name='email'
					onChange={handleChangeInput}
					placeholder='Email'
					type='email'
					value={inputs.email}
				/>
			</div>
			{isSignin ? null : (
				<div className='my-3 flex justify-between text-sm'>
					<input
						aria-label='Phone'
						className='w-[49%] rounded border p-2 py-3'
						name='phone'
						onChange={handleChangeInput}
						placeholder='Phone'
						type='text'
						value={inputs.phone}
					/>
					<input
						aria-label='City'
						className='w-[49%] rounded border p-2 py-3'
						name='city'
						onChange={handleChangeInput}
						placeholder='City'
						type='text'
						value={inputs.city}
					/>
				</div>
			)}
			<div className='my-3 flex justify-between text-sm'>
				<input
					aria-label='Password'
					className='w-full rounded border p-2 py-3'
					name='password'
					onChange={handleChangeInput}
					placeholder='Password'
					type='password'
					value={inputs.password}
				/>
			</div>
			{isSignin ? null : (
				<div className='my-3 flex flex-col text-sm'>
					<input
						aria-label='Confirm password'
						className='w-full rounded border p-2 py-3'
						name='confirmPassword'
						onChange={handleChangeInput}
						placeholder='Confirm password'
						type='password'
						value={inputs.confirmPassword}
					/>
					{inputs.confirmPassword &&
						inputs.password !== inputs.confirmPassword && (
							<p className='mt-1 text-red-500'>Passwords do not match</p>
						)}
				</div>
			)}
		</>
	)
}

export default AuthModalInput
