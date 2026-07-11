import { prisma } from '@/lib/prisma'
import Menu from '../components/Menu'
import RestaurantNavbar from '../components/RestaurantNavBar'

const fetchRestaurantMenu = async (slug: string) => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			items: true,
		},
	})

	if (!restaurant) throw new Error()
	return restaurant.items
}

export default async function RestaurantMenu({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const menu = await fetchRestaurantMenu(slug)
	return (
		<div className='w-[100%] rounded bg-white p-3 shadow'>
			<RestaurantNavbar slug={slug} />
			<Menu menu={menu} />
		</div>
	)
}
