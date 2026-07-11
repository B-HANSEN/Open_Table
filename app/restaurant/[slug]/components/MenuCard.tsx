import type { Item } from '@prisma/client'

export default function MenuCard({ item }: { item: Item }) {
	return (
		<div className='mb-3 w-[49%] rounded border p-3'>
			<h3 className='font-bold text-lg'>{item.name}</h3>
			<p className='mt-1 font-light text-sm'>{item.description}</p>
			<p className='mt-7'>{item.price}</p>
		</div>
	)
}
