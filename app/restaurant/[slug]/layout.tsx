import Header from './components/Header'

export default async function RestaurantLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	return (
		<main>
			<Header name={slug} />
			<div className='0 m-auto -mt-11 flex w-2/3 items-start justify-between'>
				{children}
			</div>
		</main>
	)
}
