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
	InvoiceControllerFindDueMonthParams,
	InvoiceControllerFindDueTodayParams,
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

export const invoiceControllerOutstandingReceivable = (signal?: AbortSignal) => {
	return authInstance<number>({ url: `/api/invoice/outstandingReceivable`, method: "GET", signal });
};

export const getInvoiceControllerOutstandingReceivableQueryKey = () => {
	return [`/api/invoice/outstandingReceivable`] as const;
};

export const getInvoiceControllerOutstandingReceivableQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<
			Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>,
			TError,
			TData
		>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerOutstandingReceivableQueryKey();

	const queryFn: QueryFunction<
		Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>
	> = ({ signal }) => invoiceControllerOutstandingReceivable(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerOutstandingReceivableQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>
>;
export type InvoiceControllerOutstandingReceivableQueryError = ErrorType<unknown>;

export const useInvoiceControllerOutstandingReceivable = <
	TData = Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<
			Awaited<ReturnType<typeof invoiceControllerOutstandingReceivable>>,
			TError,
			TData
		>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerOutstandingReceivableQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerFindDueToday = (
	params: InvoiceControllerFindDueTodayParams,
	signal?: AbortSignal,
) => {
	return authInstance<number>({ url: `/api/invoice/dueToday`, method: "GET", params, signal });
};

export const getInvoiceControllerFindDueTodayQueryKey = (
	params: InvoiceControllerFindDueTodayParams,
) => {
	return [`/api/invoice/dueToday`, ...(params ? [params] : [])] as const;
};

export const getInvoiceControllerFindDueTodayQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueToday>>,
	TError = ErrorType<unknown>,
>(
	params: InvoiceControllerFindDueTodayParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueToday>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindDueTodayQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindDueToday>>> = ({
		signal,
	}) => invoiceControllerFindDueToday(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindDueToday>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindDueTodayQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindDueToday>>
>;
export type InvoiceControllerFindDueTodayQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindDueToday = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueToday>>,
	TError = ErrorType<unknown>,
>(
	params: InvoiceControllerFindDueTodayParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueToday>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindDueTodayQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerFindDueMonth = (
	params: InvoiceControllerFindDueMonthParams,
	signal?: AbortSignal,
) => {
	return authInstance<number>({ url: `/api/invoice/dueMonth`, method: "GET", params, signal });
};

export const getInvoiceControllerFindDueMonthQueryKey = (
	params: InvoiceControllerFindDueMonthParams,
) => {
	return [`/api/invoice/dueMonth`, ...(params ? [params] : [])] as const;
};

export const getInvoiceControllerFindDueMonthQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>,
	TError = ErrorType<unknown>,
>(
	params: InvoiceControllerFindDueMonthParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerFindDueMonthQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>> = ({
		signal,
	}) => invoiceControllerFindDueMonth(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerFindDueMonthQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>
>;
export type InvoiceControllerFindDueMonthQueryError = ErrorType<unknown>;

export const useInvoiceControllerFindDueMonth = <
	TData = Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>,
	TError = ErrorType<unknown>,
>(
	params: InvoiceControllerFindDueMonthParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerFindDueMonth>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerFindDueMonthQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerTotalDue = (signal?: AbortSignal) => {
	return authInstance<number>({ url: `/api/invoice/totalDue`, method: "GET", signal });
};

export const getInvoiceControllerTotalDueQueryKey = () => {
	return [`/api/invoice/totalDue`] as const;
};

export const getInvoiceControllerTotalDueQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerTotalDue>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTotalDue>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerTotalDueQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerTotalDue>>> = ({
		signal,
	}) => invoiceControllerTotalDue(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerTotalDue>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerTotalDueQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerTotalDue>>
>;
export type InvoiceControllerTotalDueQueryError = ErrorType<unknown>;

export const useInvoiceControllerTotalDue = <
	TData = Awaited<ReturnType<typeof invoiceControllerTotalDue>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTotalDue>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerTotalDueQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerInvoiceCount = (signal?: AbortSignal) => {
	return authInstance<number>({ url: `/api/invoice/invoiceCount`, method: "GET", signal });
};

export const getInvoiceControllerInvoiceCountQueryKey = () => {
	return [`/api/invoice/invoiceCount`] as const;
};

export const getInvoiceControllerInvoiceCountQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerInvoiceCountQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>> = ({
		signal,
	}) => invoiceControllerInvoiceCount(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerInvoiceCountQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>
>;
export type InvoiceControllerInvoiceCountQueryError = ErrorType<unknown>;

export const useInvoiceControllerInvoiceCount = <
	TData = Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerInvoiceCount>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerInvoiceCountQueryOptions(options);

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
		method: "PUT",
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
export const invoiceControllerTest = (id: string, signal?: AbortSignal) => {
	return authInstance<string>({ url: `/api/invoice/test/${id}`, method: "GET", signal });
};

export const getInvoiceControllerTestQueryKey = (id: string) => {
	return [`/api/invoice/test/${id}`] as const;
};

export const getInvoiceControllerTestQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerTest>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTest>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerTestQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerTest>>> = ({ signal }) =>
		invoiceControllerTest(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerTest>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerTestQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerTest>>
>;
export type InvoiceControllerTestQueryError = ErrorType<unknown>;

export const useInvoiceControllerTest = <
	TData = Awaited<ReturnType<typeof invoiceControllerTest>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTest>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerTestQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerTestaa = (id: string, signal?: AbortSignal) => {
	return authInstance<string>({ url: `/api/invoice/testaa/${id}`, method: "GET", signal });
};

export const getInvoiceControllerTestaaQueryKey = (id: string) => {
	return [`/api/invoice/testaa/${id}`] as const;
};

export const getInvoiceControllerTestaaQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerTestaa>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTestaa>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerTestaaQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof invoiceControllerTestaa>>> = ({
		signal,
	}) => invoiceControllerTestaa(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerTestaa>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerTestaaQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerTestaa>>
>;
export type InvoiceControllerTestaaQueryError = ErrorType<unknown>;

export const useInvoiceControllerTestaa = <
	TData = Awaited<ReturnType<typeof invoiceControllerTestaa>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof invoiceControllerTestaa>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerTestaaQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerInvoicePublicFindOne = (id: string, signal?: AbortSignal) => {
	return authInstance<InvoiceWithAllDataDto>({
		url: `/api/invoice/invoicePublicFindOne/${id}`,
		method: "GET",
		signal,
	});
};

export const getInvoiceControllerInvoicePublicFindOneQueryKey = (id: string) => {
	return [`/api/invoice/invoicePublicFindOne/${id}`] as const;
};

export const getInvoiceControllerInvoicePublicFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<
				Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>,
				TError,
				TData
			>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getInvoiceControllerInvoicePublicFindOneQueryKey(id);

	const queryFn: QueryFunction<
		Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>
	> = ({ signal }) => invoiceControllerInvoicePublicFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type InvoiceControllerInvoicePublicFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>
>;
export type InvoiceControllerInvoicePublicFindOneQueryError = ErrorType<unknown>;

export const useInvoiceControllerInvoicePublicFindOne = <
	TData = Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<
				Awaited<ReturnType<typeof invoiceControllerInvoicePublicFindOne>>,
				TError,
				TData
			>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getInvoiceControllerInvoicePublicFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const invoiceControllerInvoicePreviewFromBody = (
	createInvoiceWithProducts: CreateInvoiceWithProducts,
) => {
	return authInstance<string | void>({
		url: `/api/invoice/invoicePreviewFromBody`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createInvoiceWithProducts,
	});
};

export const getInvoiceControllerInvoicePreviewFromBodyMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>,
		TError,
		{ data: CreateInvoiceWithProducts },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>,
	TError,
	{ data: CreateInvoiceWithProducts },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>,
		{ data: CreateInvoiceWithProducts }
	> = (props) => {
		const { data } = props ?? {};

		return invoiceControllerInvoicePreviewFromBody(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type InvoiceControllerInvoicePreviewFromBodyMutationResult = NonNullable<
	Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>
>;
export type InvoiceControllerInvoicePreviewFromBodyMutationBody = CreateInvoiceWithProducts;
export type InvoiceControllerInvoicePreviewFromBodyMutationError = ErrorType<unknown>;

export const useInvoiceControllerInvoicePreviewFromBody = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>,
		TError,
		{ data: CreateInvoiceWithProducts },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof invoiceControllerInvoicePreviewFromBody>>,
	TError,
	{ data: CreateInvoiceWithProducts },
	TContext
> => {
	const mutationOptions = getInvoiceControllerInvoicePreviewFromBodyMutationOptions(options);

	return useMutation(mutationOptions);
};
