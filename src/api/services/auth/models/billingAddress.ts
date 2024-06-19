/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { Country } from "./country";
import type { State } from "./state";

export interface BillingAddress {
	address: string;
	city: string;
	country?: Country;
	country_id: string;
	createdAt: string;
	id: string;
	isExist: boolean;
	state?: State;
	state_id: string;
	/** @nullable */
	updatedAt: string | null;
	zip: string;
}
