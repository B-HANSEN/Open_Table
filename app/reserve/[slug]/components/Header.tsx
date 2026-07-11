import { format } from 'date-fns'
import Image from 'next/image'
import {
	convertToDisplayTime,
	type Time,
} from '../../../../utils/convertToDisplayTime'

export default function Header({
	image,
	name,
	date,
	partySize,
}: {
	image: string
	name: string
	date: string
	partySize: string
}) {
	const [_day, time] = date.split('T')

	return (
		<div>
			<h3 className='font-bold'>You're almost done!</h3>
			<div className='mt-5 flex'>
				<div className='relative h-20 w-32 shrink-0'>
					<Image
						alt={name}
						className='rounded object-cover'
						fill
						sizes='128px'
						src={image}
					/>
				</div>
				<div className='ml-4'>
					<h1 className='font-bold text-3xl'>{name}</h1>
					<div className='mt-3 flex'>
						<p className='mr-6'>{format(new Date(date), 'ccc, LLL d')}</p>
						<p className='mr-6'>{convertToDisplayTime(time as Time)}</p>
						<p className='mr-6'>
							{partySize} {parseInt(partySize, 10) === 1 ? 'person' : 'people'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
