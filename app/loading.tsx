import Header from './components/Header'

const Loading = () => {
	return (
		<main>
			<Header />
			<div className='-x-36 mt-10 flex flex-wrap justify-center py-3'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
					<div
						className='overflow-hiden m-3 h-72 w-72 animate-pulse cursor-pointer rounded border bg-slate-200'
						key={num}
					></div>
				))}
			</div>
		</main>
	)
}

export default Loading
