/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { CreatePaymentDetailsDtoPaymentType } from "./createPaymentDetailsDtoPaymentType";

export interface CreatePaymentDetailsDto {
	/** @nullable */
	account_no?: string | null;
	/** @nullable */
	bicNumber?: string | null;
	/** @nullable */
	ibanNumber?: string | null;
	/** @nullable */
	ifscCode?: string | null;
	/** @nullable */
	mollieId?: string | null;
	paymentType: CreatePaymentDetailsDtoPaymentType;
	/** @nullable */
	paypalId?: string | null;
	/** @nullable */
	razorpayId?: string | null;
	/** @nullable */
	stripeId?: string | null;
	/** @nullable */
	swiftCode?: string | null;
	/** @nullable */
	upiId?: string | null;
	user_id: string;
}
