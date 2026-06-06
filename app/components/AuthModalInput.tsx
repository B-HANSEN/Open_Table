import React from 'react';

interface Props {
	inputs: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		city: string;
		password: string;
		confirmPassword: string;
	};
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isSignin: boolean;
}

const AuthModalInput = ({ inputs, handleChangeInput, isSignin }: Props) => {
	return (
		<>
			{isSignin ? null : (
				<div className='my-3 flex justify-between text-sm'>
					<input
						aria-label='First name'
						className='border rounded p-2 py-3 w-[49%]'
						name='firstName'
						onChange={handleChangeInput}
						placeholder='First name'
						type='text'
						value={inputs.firstName}
					/>
					<input
						aria-label='Last name'
						className='border rounded p-2 py-3 w-[49%]'
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
					className='border rounded p-2 py-3 w-full'
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
						className='border rounded p-2 py-3 w-[49%]'
						name='phone'
						onChange={handleChangeInput}
						placeholder='Phone'
						type='text'
						value={inputs.phone}
					/>
					<input
						aria-label='City'
						className='border rounded p-2 py-3 w-[49%]'
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
					className='border rounded p-2 py-3 w-full'
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
						className='border rounded p-2 py-3 w-full'
						name='confirmPassword'
						onChange={handleChangeInput}
						placeholder='Confirm password'
						type='password'
						value={inputs.confirmPassword}
					/>
					{inputs.confirmPassword && inputs.password !== inputs.confirmPassword && (
						<p className='text-red-500 mt-1'>Passwords do not match</p>
					)}
				</div>
			)}
		</>
	);
};

export default AuthModalInput;
