import type { Review } from '@prisma/client'
import Image from 'next/image' // require next/image instead of HTML img tag, as Type 'StaticImageData' is not assignable to type 'string'.
import emptyStar from '../../public/icons/empty-star.png'
import fullStar from '../../public/icons/full-star.png'
import halfStar from '../../public/icons/half-star.png'
import { calculateReviewRatingAverage } from '../../utils/calculateReviewRatingAverage'

const Stars = ({ rating, reviews }: { rating?: number; reviews: Review[] }) => {
	// in Rating component, we access review.rating directly
	// other components we get all reviews and have to calculate the average
	const reviewRating = rating || calculateReviewRatingAverage(reviews)

	const renderStars = () => {
		const stars = []

		for (let i = 0; i < 5; i++) {
			const difference = parseFloat((reviewRating - i).toFixed(1))
			if (difference >= 1)
				stars.push(fullStar) // greater than 1
			else if (difference < 1 && difference > 0) {
				// between 0-1 excluding
				if (difference <= 0.2) stars.push(emptyStar)
				else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar)
				else stars.push(fullStar)
			} else stars.push(emptyStar) // if 0
		}
		return stars.map((star, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static list, position is the identity
			<Image alt='' className='mr-1 h-4 w-4' key={index} src={star} />
		))
	}
	return (
		<div
			aria-label={`Rating: ${reviewRating.toFixed(1)} out of 5 stars`}
			className='flex items-center'
			role='img'
		>
			{renderStars()}
		</div>
	)
}

export default Stars
