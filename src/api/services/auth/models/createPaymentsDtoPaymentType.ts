/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */

export type CreatePaymentsDtoPaymentType =
	(typeof CreatePaymentsDtoPaymentType)[keyof typeof CreatePaymentsDtoPaymentType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreatePaymentsDtoPaymentType = {
	UPI: "UPI",
	EuropeanBank: "EuropeanBank",
	IndianBank: "IndianBank",
	SwiftCode: "SwiftCode",
	Paypal: "Paypal",
	Stripe: "Stripe",
	Razorpay: "Razorpay",
	Mollie: "Mollie",
	Cash: "Cash",
	Cheque: "Cheque",
} as const;