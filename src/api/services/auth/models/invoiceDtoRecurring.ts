/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */

/**
 * @nullable
 */
export type InvoiceDtoRecurring =
	| (typeof InvoiceDtoRecurring)[keyof typeof InvoiceDtoRecurring]
	| null;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InvoiceDtoRecurring = {
	Daily: "Daily",
	Weekly: "Weekly",
	Monthly: "Monthly",
	Quarterly: "Quarterly",
	HalfYearly: "HalfYearly",
	Yearly: "Yearly",
} as const;
