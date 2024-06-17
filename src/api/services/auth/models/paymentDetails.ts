/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { PaymentDetailsPaymentType } from "./paymentDetailsPaymentType";
import type { User } from "./user";

export interface PaymentDetails {
	/** @nullable */
	account_no: string | null;
	/** @nullable */
	bicNumber: string | null;
	createdAt: string;
	/** @nullable */
	ibanNumber: string | null;
	id: string;
	/** @nullable */
	ifscCode: string | null;
	isExist: boolean;
	/** @nullable */
	mollieId: string | null;
	paymentType: PaymentDetailsPaymentType;
	/** @nullable */
	paypalId: string | null;
	/** @nullable */
	razorpayId: string | null;
	/** @nullable */
	stripeId: string | null;
	/** @nullable */
	swiftCode: string | null;
	/** @nullable */
	updatedAt: string | null;
	/** @nullable */
	upiId: string | null;
	user?: User;
	user_id: string;
}
