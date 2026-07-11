'use client'

import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { partySize as partySizes, times } from '../../../../data'
import useAvailabilities from '../../../../hooks/useAvailability'
import {
	convertToDisplayTime,
	type Time,
} from '../../../../utils/convertToDisplayTime'

export default function ReservationCard({
	openTime,
	closeTime,
	slug,
}: {
	openTime: string
	closeTime: string
	slug: string
}) {
	const { loading, data, fetchAvailabilities } = useAvailabilities()
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
	const [time, setTime] = useState(openTime)
	const [partySize, setPartySize] = useState('2')
	const [day, setDay] = useState(new Date().toISOString().split('T')[0]) // default value is today

	const handleChangeDate = (date: Date | null) => {
		if (date) {
			setDay(date.toISOString().split('T')[0]) // date format: 2023-06-01T02:00:00.000Z
			return setSelectedDate(date)
		} else setSelectedDate(null)
	}

	const renderAvailability = () => {
		if (!data) return null
		if (!data.some((t) => t.available))
			return (
				<p className='mt-4 text-reg text-sm'>
					No availability for this date, time, or party size.
				</p>
			)
		return (
			<div className='mt-4'>
				<p className='text-reg'>Select a time</p>
				<div className='mt-2 flex flex-wrap'>
					{data.map((time, _index) =>
						time.available ? (
							<Link
								className='mr-3 mb-3 w-24 cursor-pointer rounded bg-gray-300 p-2 text-center text-white'
								href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
								key={time.time}
							>
								<p className='font-bold text-sm'>
									{convertToDisplayTime(time.time as Time)}
								</p>
							</Link>
						) : (
							<p
								className='mr-3 mb-3 w-24 rounded bg-gray-300 p-2'
								key={time.time}
							></p>
						)
					)}
				</div>
			</div>
		)
	}

	const handleClick = () => {
		fetchAvailabilities({
			slug,
			day,
			time,
			partySize,
		})
	}

	const filterTimesByRestaurantOpenWindow = () => {
		// for each restaurant, dynamically return different options
		const timesWithinWindow: typeof times = []
		let isWithinWindow = false

		times.forEach((time) => {
			if (!isWithinWindow && time.time === openTime) {
				isWithinWindow = true // when reached start of the window
			}
			if (isWithinWindow) {
				timesWithinWindow.push(time) // push all times into array
			}
			if (time.time === closeTime) {
				isWithinWindow = false // when reached end of the window
			}
		})

		return timesWithinWindow
	}

	return (
		<div className='fixed w-[15%] rounded bg-white p-3 shadow'>
			<div className='border-b pb-2 text-center font-bold'>
				<h4 className='mr-7 text-lg'>Make a Reservation</h4>
			</div>
			<div className='my-3 flex flex-col'>
				<label htmlFor='party-size'>Party size</label>
				<select
					className='border-b py-3 font-light'
					id='party-size'
					name='partySize'
					onChange={(e) => setPartySize(e.target.value)}
					value={partySize}
				>
					{partySizes.map((size, _index) => (
						<option key={size.value} value={size.value}>
							{size.label}
						</option>
					))}
				</select>
			</div>
			<div className='justify-between] flex'>
				<div className='flex w-[48%] flex-col'>
					<label htmlFor='reservation-date'>Date</label>
					<DatePicker
						className='h-14 w-24 border-b py-3 font-light text-reg'
						dateFormat='MMMM d'
						id='reservation-date'
						onChange={handleChangeDate}
						selected={selectedDate}
						wrapperClassName='w-[48%]'
					/>
				</div>
				<div className='flex w-[48%] flex-col'>
					<label htmlFor='reservation-time'>Time</label>
					<select
						className='h-14 border-b py-3 font-light'
						id='reservation-time'
						name='time'
						onChange={(e) => setTime(e.target.value)}
						value={time}
					>
						{filterTimesByRestaurantOpenWindow().map((time, _index) => (
							<option key={time.time} value={time.time}>
								{time.displayTime}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='mt-5'>
				<button
					className='h-16 w-full rounded bg-red-600 px-4 font-bold text-white'
					disabled={loading}
					onClick={handleClick}
					type='button'
				>
					{loading ? <CircularProgress color='inherit' /> : 'Find a time'}
				</button>
			</div>
			{renderAvailability()}
		</div>
	)
}
