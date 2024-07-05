/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */

export interface QuotationDto {
	createdAt: string;
	customer_id: string;
	date: string;
	/** @nullable */
	discountPercentage: number | null;
	expiry_at: string;
	id: string;
	isExist: boolean;
	/** @nullable */
	notes: string | null;
	/** @nullable */
	private_notes: string | null;
	quatation_number: string;
	/** @nullable */
	reference_number: string | null;
	/** @nullable */
	status: string | null;
	sub_total: number;
	/** @nullable */
	tax_id: string | null;
	/** @nullable */
	template_id: string | null;
	/** @nullable */
	template_url: string | null;
	total: number;
	/** @nullable */
	updatedAt: string | null;
	user_id: string;
}
