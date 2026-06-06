import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import * as jose from 'jose'; // jose to create a manufactured JWT (avoid issues with SSR apps, avoid JWT here)
import { cookies } from 'next/headers';
import { signupSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const result = signupSchema.safeParse(body);

	if (!result.success) {
		const errorMessage = result.error.issues[0].message;
		return Response.json({ errorMessage }, { status: 400 });
	}

	const { firstName, lastName, email, phone, city, password } = result.data;

	const hashedPassword = await bcrypt.hash(password, 10); // add 10 characters (the salt) to the right, then hash the password

	const userWithEmail = await prisma.user.findUnique({ where: { email } }); // check if user exists in the db already
	if (userWithEmail) {
		return Response.json(
			{ errorMessage: 'Email is associated with another account.' },
			{ status: 400 }
		);
	}

	const user = await prisma.user.create({
		data: {
			first_name: firstName,
			last_name: lastName,
			password: hashedPassword,
			city,
			phone,
			email,
		},
	});

	const alg = 'HS256';
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	const token = await new jose.SignJWT({ email: user.email })
		.setProtectedHeader({ alg })
		.setExpirationTime('24h')
		.sign(secret);

	const cookieStore = await cookies();
	cookieStore.set('jwt', token, { maxAge: 60 * 6 * 24 }); // key: jwt, value: token and age of cookie, eg. 60sec, 6d, 24hrs

	return Response.json({
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
		phone: user.phone,
		city: user.city,
	});
}
