/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { OmitCreateInvoiceProductsDto } from "./omitCreateInvoiceProductsDto";
import type { UpdateInvoiceWithProductsRecurring } from "./updateInvoiceWithProductsRecurring";

export interface UpdateInvoiceWithProducts {
	customer_id?: string;
	date?: string;
	/** @nullable */
	discountPercentage?: number | null;
	due_date?: string;
	invoice_number?: string;
	is_recurring?: boolean;
	/** @nullable */
	notes?: string | null;
	paymentId?: string;
	product: OmitCreateInvoiceProductsDto[];
	/** @nullable */
	recurring?: UpdateInvoiceWithProductsRecurring;
	/** @nullable */
	reference_number?: string | null;
	sub_total?: number;
	/** @nullable */
	tax_id?: string | null;
	template_id?: string;
	total?: number;
	user_id?: string;
}
