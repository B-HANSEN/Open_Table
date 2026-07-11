import SearchBar from './SearchBar'

export default function Header() {
	return (
		<div className='h-64 bg-linear-to-r from-[#0f1f47] to-[#5f6984] p-2'>
			<div className='mt-10 text-center'>
				<h1 className='mb-2 font-bold text-5xl text-white'>
					Find your table for any occasion
				</h1>
				<SearchBar />
			</div>
		</div>
	)
}
