export default function Header({ name }: { name: string }) {
	const renderTitle = () => {
		const nameArray = name.split('-') // split spring by dashes
		nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})` // put parenthesis around city name, last array item

		return nameArray.join(' ') // rejoin with space between words
	}

	return (
		<div className='h-96 overflow-hidden'>
			<div className='flex h-full items-center justify-center bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984]'>
				<h1 className='text-center text-7xl text-shadow text-white capitalize'>
					{renderTitle()}
				</h1>
			</div>
		</div>
	)
}
