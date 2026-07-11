import { type Cuisine, type Location, PRICE } from '@prisma/client'
import Link from 'next/link'

export default function SearchSidebar({
	locations,
	cuisines,
	searchParams,
}: {
	locations: Location[]
	cuisines: Cuisine[]
	searchParams: { city?: string; cuisine?: string; price?: PRICE }
}) {
	const prices = [
		{
			price: PRICE.CHEAP,
			label: '$$',
			className: 'border w-full text-reg text-center font-light rounded-l p-2',
		},
		{
			price: PRICE.REGULAR,
			label: '$$$',
			className: 'border w-full text-reg text-center font-light p-2',
		},
		{
			price: PRICE.EXPENSIVE,
			label: '$$$$',
			className: 'border w-full text-reg text-center font-light rounded-r p-2',
		},
	]

	return (
		<div className='w-1/5'>
			<div className='flex flex-col border-b pb-4'>
				<h1 className='mb-2'>Region</h1>
				{locations.map((el) => (
					<Link
						className='font-light text-reg capitalize'
						href={{
							pathname: '/search',
							query: {
								...searchParams, // use existing params
								city: el.name, // add city as param
							},
						}}
						key={el.id}
					>
						{el.name}
					</Link>
				))}
			</div>
			<div className='mt-3 flex flex-col border-b pb-4'>
				<h1 className='mb-2'>Cuisine</h1>
				{cuisines.map((el) => (
					<Link
						className='font-light text-reg capitalize'
						href={{
							pathname: '/search',
							query: {
								...searchParams,
								cuisine: el.name,
							},
						}}
						key={el.id}
					>
						{el.name}
					</Link>
				))}
			</div>
			<div className='mt-3 pb-4'>
				<h1 className='mb-2'>Price</h1>
				<div className='flex'>
					{prices.map(({ price, label, className }) => (
						<Link
							className={className}
							href={{
								pathname: '/search',
								query: {
									...searchParams,
									price,
								},
							}}
							key={price}
						>
							{label}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
