/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { CreateVendorsBillingAddressDto } from "./createVendorsBillingAddressDto";

export interface CreateVendorsWithAddressDto {
	billingAddress?: CreateVendorsBillingAddressDto;
	display_name: string;
	email: string;
	name: string;
	/** @nullable */
	phone?: string | null;
	user_id: string;
	/** @nullable */
	website?: string | null;
}
