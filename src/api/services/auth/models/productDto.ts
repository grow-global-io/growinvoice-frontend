/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { ProductDtoType } from "./productDtoType";

export interface ProductDto {
	createdAt: string;
	currency_id: string;
	/** @nullable */
	description: string | null;
	/** @nullable */
	hsnCode_id: string | null;
	id: string;
	isExist: boolean;
	name: string;
	price: number;
	/** @nullable */
	tax_id: string | null;
	type: ProductDtoType;
	unit_id: string;
	/** @nullable */
	updatedAt: string | null;
	user_id: string;
}
