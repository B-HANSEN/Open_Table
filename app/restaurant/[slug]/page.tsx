import type { Review } from '@prisma/client'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Description from './components/Description'
import Images from './components/Images'
import Rating from './components/Rating'
import ReservationCard from './components/ReservationCard'
import RestaurantNavbar from './components/RestaurantNavBar'
import Reviews from './components/Reviews'
import Title from './components/Title'

interface Restaurant {
	id: number
	name: string
	images: string[]
	description: string
	slug: string
	reviews: Review[]
	open_time: string
	close_time: string
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			images: true,
			description: true,
			slug: true,
			reviews: true,
			open_time: true,
			close_time: true,
		},
	})

	if (!restaurant) notFound()
	return restaurant
}

export default async function RestaurantDetails({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const restaurant = await fetchRestaurantBySlug(slug)

	return (
		<>
			<div className='w-[70%] rounded bg-white p-3 shadow'>
				<RestaurantNavbar slug={restaurant.slug} />
				<Title name={restaurant.name} />
				<Rating reviews={restaurant.reviews} />
				<Description description={restaurant.description} />
				<Images images={restaurant.images} />
				<Reviews reviews={restaurant.reviews} />
			</div>
			<div className='relative w-[27%] text-reg'>
				<ReservationCard
					closeTime={restaurant.close_time}
					openTime={restaurant.open_time}
					slug={restaurant.slug}
				/>
			</div>
		</>
	)
}
