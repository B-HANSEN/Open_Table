import Link from 'next/link'
import type { RestaurantCardType } from '../page'
import ImageWithFallback from './ImageWithFallback'
import Price from './Price'
import Stars from './Stars'

interface Props {
	restaurant: RestaurantCardType
}

export default function RestaurantCard({ restaurant }: Props) {
	return (
		<div className='m-3 h-72 w-64 cursor-pointer overflow-hidden rounded border'>
			<Link href={`/restaurant/${restaurant.slug}`}>
				<div className='relative h-36 w-full'>
					<ImageWithFallback
						alt={restaurant.name}
						className='object-cover'
						fill
						sizes='(max-width: 640px) calc(100vw - 1.5rem), 256px'
						src={restaurant.main_image}
					/>
				</div>
				<div className='p-1'>
					<h3 className='mb-2 font-bold text-2xl'>{restaurant.name}</h3>
					<div className='flex items-start'>
						<Stars reviews={restaurant.reviews} />
						<p className='ml-2'>
							{restaurant.reviews.length} review
							{restaurant.reviews.length === 1 ? '' : 's'}{' '}
						</p>
					</div>
					<div className='flex font-light text-reg capitalize'>
						<p className='mr-3'>{restaurant.cuisine.name}</p>
						<Price price={restaurant.price} />
						<p>{restaurant.location.name}</p>
					</div>
					<p className='mt-1 font-bold text-sm'>Booked 3 times today</p>
				</div>
			</Link>
		</div>
	)
}
