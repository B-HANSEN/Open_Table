import type { Review } from '@prisma/client'
import ReviewCard from './ReviewCard'

export default function Reviews({ reviews }: { reviews: Review[] }) {
	return (
		<div>
			<h1 className='borber-b mt-10 mb-7 pb-5 font-bold text-3xl'>
				What {reviews.length} {reviews.length === 1 ? 'person' : 'people'} are
				saying
			</h1>
			<div>
				{reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</div>
	)
}
