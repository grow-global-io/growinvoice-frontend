/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { InvoiceDtoRecurring } from "./invoiceDtoRecurring";

export interface InvoiceDto {
	createdAt: string;
	customer_id: string;
	date: string;
	/** @nullable */
	discountPercentage: number | null;
	due_date: string;
	id: string;
	invoice_number: string;
	is_recurring: boolean;
	isExist: boolean;
	/** @nullable */
	notes: string | null;
	paymentId: string;
	/** @nullable */
	recurring: InvoiceDtoRecurring;
	/** @nullable */
	reference_number: string | null;
	sub_total: number;
	/** @nullable */
	tax_id: string | null;
	total: number;
	/** @nullable */
	updatedAt: string | null;
	user_id: string;
}
