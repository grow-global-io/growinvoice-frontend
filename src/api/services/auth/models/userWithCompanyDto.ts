/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { CompanyDto } from "./companyDto";
import type { UserWithCompanyDtoCurrency } from "./userWithCompanyDtoCurrency";
import type { UserPlansDto } from "./userPlansDto";

export interface UserWithCompanyDto {
	company?: CompanyDto[];
	createdAt: string;
	/** @nullable */
	currency?: UserWithCompanyDtoCurrency;
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
	UserPlans?: UserPlansDto[];
}
