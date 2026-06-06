import { z } from 'zod';

export const signinSchema = z.object({
	email: z.string().email('Email is invalid.'),
	password: z.string().min(1, 'Password is invalid.'),
});

export const signupSchema = z.object({
	firstName: z.string().min(1, 'First name is invalid').max(20, 'First name is invalid'),
	lastName: z.string().min(1, 'Last name is invalid').max(20, 'Last name is invalid'),
	email: z.string().email('Email is invalid'),
	phone: z
		.string()
		.regex(/^\+?[\d\s\-().]{7,20}$/, 'Phone number is invalid'),
	city: z.string().min(1, 'City is invalid'),
	password: z
		.string()
		.min(8, 'Password is not strong enough')
		.regex(/[a-z]/, 'Password is not strong enough')
		.regex(/[A-Z]/, 'Password is not strong enough')
		.regex(/[0-9]/, 'Password is not strong enough')
		.regex(/[^A-Za-z0-9]/, 'Password is not strong enough'),
});

export const availabilityQuerySchema = z.object({
	day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid day format (expected YYYY-MM-DD).'),
	time: z
		.string()
		.regex(/^\d{2}:\d{2}(:\d{2}(\.\d+Z?)?)?$/, 'Invalid time format.'),
	partySize: z.coerce.number().int().min(1, 'Party size must be at least 1.'),
});

export const bookerSchema = z.object({
	bookerEmail: z.string().email('Booker email is invalid.'),
	bookerPhone: z.string().min(1, 'Booker phone is required.'),
	bookerFirstName: z.string().min(1, 'First name is required.'),
	bookerLastName: z.string().min(1, 'Last name is required.'),
	bookerOccasion: z.string().optional(),
	bookerRequest: z.string().optional(),
});
