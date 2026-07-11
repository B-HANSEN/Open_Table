import type { Review } from '@prisma/client'
import { calculateReviewRatingAverage } from '../../../../utils/calculateReviewRatingAverage'
import Stars from '../../../components/Stars'

export default function Rating({ reviews }: { reviews: Review[] }) {
	return (
		<div className='flex items-end'>
			<div className='ratings mt-2 flex items-center'>
				<Stars reviews={reviews} />
				<p className='ml-3 text-reg'>
					{calculateReviewRatingAverage(reviews).toFixed(1)}
				</p>
			</div>
			<div>
				<p className='ml-4 text-reg'>
					{reviews.length} Review{reviews.length === 1 ? '' : 's'}
				</p>
			</div>
		</div>
	)
}
