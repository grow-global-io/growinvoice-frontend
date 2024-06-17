/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	MutationFunction,
	QueryFunction,
	QueryKey,
	UseMutationOptions,
	UseMutationResult,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import type {
	CreateInvoiceWithProducts,
	Invoice,
	InvoiceControllerCreate201,
	InvoiceControllerUpdate200,
	InvoiceWithAllDataDto,
	SuccessResponseDto,
	UpdateInvoiceWithProducts,
} from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const invoiceControllerCreate = (createInvoiceWithProducts: CreateInvoiceWithProducts) => {
	return authInstance<InvoiceControllerCreate201>({
		url: `/api/invoice`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createInvoiceWithProducts,
	});
};

export const getInvoiceControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerCreate>>,
		TError,
		{ data: CreateInvoiceWithProducts },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof invoiceControllerCreate>>,
	TError,
	{ data: CreateInvoiceWithProducts },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof invoiceControllerCreate>>,
		{ data: CreateInvoiceWithProducts }
	> = (props) => {
		const { data } = props ?? {};

		return invoiceControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type InvoiceControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerCreate>>
>;
export type InvoiceControllerCreateMutationBody = CreateInvoiceWithProducts;
export type InvoiceControllerCreateMutationError = ErrorType<unknown>;

export const useInvoiceControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerCreate>>,
		TError,
		{ data: CreateInvoiceWithProducts },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof invoiceControllerCreate>>,
	TError,
	{ data: CreateInvoiceWithProducts },
	TContext
> => {
	const mutationOptions = getInvoiceControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const invoiceControllerFindAll = (signal?: AbortSignal) => {
	return authInstance<Invoice[]>({ url: `/api/invoice`, method: "GET", signal });
};

export const getInvoiceControllerFindAllQueryKey = () => {
	return [`/api/invoice`] as const;
};

export const getInvoiceControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindAll>>> = ({
		signal,
	}) => invoiceControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindAll>>
>;
export type InvoiceControllerFindAllQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindAll = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerFindDueInvoices = (signal?: AbortSignal) => {
	return authInstance<Invoice[]>({ url: `/api/invoice/due`, method: "GET", signal });
};

export const getInvoiceControllerFindDueInvoicesQueryKey = () => {
	return [`/api/invoice/due`] as const;
};

export const getInvoiceControllerFindDueInvoicesQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindDueInvoicesQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>> = ({
		signal,
	}) => invoiceControllerFindDueInvoices(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindDueInvoicesQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>
>;
export type InvoiceControllerFindDueInvoicesQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindDueInvoices = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueInvoices>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindDueInvoicesQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerFindPaidInvoices = (signal?: AbortSignal) => {
	return authInstance<Invoice[]>({ url: `/api/invoice/paid`, method: "GET", signal });
};

export const getInvoiceControllerFindPaidInvoicesQueryKey = () => {
	return [`/api/invoice/paid`] as const;
};

export const getInvoiceControllerFindPaidInvoicesQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindPaidInvoicesQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>> = ({
		signal,
	}) => invoiceControllerFindPaidInvoices(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindPaidInvoicesQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>
>;
export type InvoiceControllerFindPaidInvoicesQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindPaidInvoices = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindPaidInvoices>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindPaidInvoicesQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerFindOne = (id: string, signal?: AbortSignal) => {
	return authInstance<InvoiceWithAllDataDto>({ url: `/api/invoice/${id}`, method: "GET", signal });
};

export const getInvoiceControllerFindOneQueryKey = (id: string) => {
	return [`/api/invoice/${id}`] as const;
};

export const getInvoiceControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindOne>>> = ({
		signal,
	}) => invoiceControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindOne>>
>;
export type InvoiceControllerFindOneQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindOne = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerUpdate = (
	id: string,
	updateInvoiceWithProducts: UpdateInvoiceWithProducts,
) => {
	return authInstance<InvoiceControllerUpdate200>({
		url: `/api/invoice/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateInvoiceWithProducts,
	});
};

export const getInvoiceControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerUpdate>>,
		TError,
		{ id: string; data: UpdateInvoiceWithProducts },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof invoiceControllerUpdate>>,
	TError,
	{ id: string; data: UpdateInvoiceWithProducts },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof invoiceControllerUpdate>>,
		{ id: string; data: UpdateInvoiceWithProducts }
	> = (props) => {
		const { id, data } = props ?? {};

		return invoiceControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type InvoiceControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerUpdate>>
>;
export type InvoiceControllerUpdateMutationBody = UpdateInvoiceWithProducts;
export type InvoiceControllerUpdateMutationError = ErrorType<unknown>;

export const useInvoiceControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerUpdate>>,
		TError,
		{ id: string; data: UpdateInvoiceWithProducts },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof invoiceControllerUpdate>>,
	TError,
	{ id: string; data: UpdateInvoiceWithProducts },
	TContext
> => {
	const mutationOptions = getInvoiceControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const invoiceControllerRemove = (id: string) => {
	return authInstance<SuccessResponseDto>({ url: `/api/invoice/${id}`, method: "DELETE" });
};

export const getInvoiceControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof invoiceControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof invoiceControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return invoiceControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type InvoiceControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerRemove>>
>;

export type InvoiceControllerRemoveMutationError = ErrorType<unknown>;

export const useInvoiceControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof invoiceControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const mutationOptions = getInvoiceControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
