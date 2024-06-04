/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { CompanyDto } from "./companyDto";

export interface UserWithCompanyDto {
	company?: CompanyDto[];
	createdAt: string;
	/** @nullable */
	currency_id: string | null;
	email: string;
	id: string;
	isExist: boolean;
	/** @nullable */
	name: string | null;
	password: string;
	/** @nullable */
	phone: string | null;
	/** @nullable */
	resetToken: string | null;
	/** @nullable */
	resetTokenExpiry: string | null;
	/** @nullable */
	updatedAt: string | null;
}
