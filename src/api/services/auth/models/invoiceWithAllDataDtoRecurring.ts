/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */

/**
 * @nullable
 */
export type InvoiceWithAllDataDtoRecurring =
	| (typeof InvoiceWithAllDataDtoRecurring)[keyof typeof InvoiceWithAllDataDtoRecurring]
	| null;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InvoiceWithAllDataDtoRecurring = {
	Daily: "Daily",
	Weekly: "Weekly",
	Monthly: "Monthly",
	Quarterly: "Quarterly",
	HalfYearly: "HalfYearly",
	Yearly: "Yearly",
} as const;
