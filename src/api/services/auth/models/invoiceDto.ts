/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { InvoiceDtoPaidStatus } from "./invoiceDtoPaidStatus";
import type { InvoiceDtoRecurring } from "./invoiceDtoRecurring";

export interface InvoiceDto {
	createdAt: string;
	customer_id: string;
	date: string;
	/** @nullable */
	discountPercentage: number | null;
	due_amount: number;
	due_date: string;
	id: string;
	invoice_number: string;
	is_recurring: boolean;
	isExist: boolean;
	/** @nullable */
	notes: string | null;
	paid_amount: number;
	paid_status: InvoiceDtoPaidStatus;
	/** @nullable */
	paymentId: string | null;
	/** @nullable */
	recurring: InvoiceDtoRecurring;
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
