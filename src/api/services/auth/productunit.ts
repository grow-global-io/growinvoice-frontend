/**
 * Generated by orval v6.29.1 🍺
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
	CreateProductUnitDto,
	ProductUnitDto,
	ProductunitControllerCreate201,
	ProductunitControllerUpdate200,
	SuccessResponseDto,
	UpdateProductUnitDto,
} from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const productunitControllerCreate = (createProductUnitDto: CreateProductUnitDto) => {
	return authInstance<ProductunitControllerCreate201>({
		url: `/api/productunit`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createProductUnitDto,
	});
};

export const getProductunitControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerCreate>>,
		TError,
		{ data: CreateProductUnitDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof productunitControllerCreate>>,
	TError,
	{ data: CreateProductUnitDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof productunitControllerCreate>>,
		{ data: CreateProductUnitDto }
	> = (props) => {
		const { data } = props ?? {};

		return productunitControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ProductunitControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof productunitControllerCreate>>
>;
export type ProductunitControllerCreateMutationBody = CreateProductUnitDto;
export type ProductunitControllerCreateMutationError = ErrorType<unknown>;

export const useProductunitControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerCreate>>,
		TError,
		{ data: CreateProductUnitDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof productunitControllerCreate>>,
	TError,
	{ data: CreateProductUnitDto },
	TContext
> => {
	const mutationOptions = getProductunitControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const productunitControllerFindAll = (signal?: AbortSignal) => {
	return authInstance<ProductUnitDto[]>({ url: `/api/productunit`, method: "GET", signal });
};

export const getProductunitControllerFindAllQueryKey = () => {
	return [`/api/productunit`] as const;
};

export const getProductunitControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof productunitControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof productunitControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getProductunitControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof productunitControllerFindAll>>> = ({
		signal,
	}) => productunitControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof productunitControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type ProductunitControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof productunitControllerFindAll>>
>;
export type ProductunitControllerFindAllQueryError = ErrorType<unknown>;

export const useProductunitControllerFindAll = <
	TData = Awaited<ReturnType<typeof productunitControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof productunitControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getProductunitControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const productunitControllerFindOne = (id: string, signal?: AbortSignal) => {
	return authInstance<ProductUnitDto>({ url: `/api/productunit/${id}`, method: "GET", signal });
};

export const getProductunitControllerFindOneQueryKey = (id: string) => {
	return [`/api/productunit/${id}`] as const;
};

export const getProductunitControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof productunitControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof productunitControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getProductunitControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof productunitControllerFindOne>>> = ({
		signal,
	}) => productunitControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof productunitControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type ProductunitControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof productunitControllerFindOne>>
>;
export type ProductunitControllerFindOneQueryError = ErrorType<unknown>;

export const useProductunitControllerFindOne = <
	TData = Awaited<ReturnType<typeof productunitControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof productunitControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getProductunitControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const productunitControllerUpdate = (
	id: string,
	updateProductUnitDto: UpdateProductUnitDto,
) => {
	return authInstance<ProductunitControllerUpdate200>({
		url: `/api/productunit/${id}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: updateProductUnitDto,
	});
};

export const getProductunitControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerUpdate>>,
		TError,
		{ id: string; data: UpdateProductUnitDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof productunitControllerUpdate>>,
	TError,
	{ id: string; data: UpdateProductUnitDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof productunitControllerUpdate>>,
		{ id: string; data: UpdateProductUnitDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return productunitControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ProductunitControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof productunitControllerUpdate>>
>;
export type ProductunitControllerUpdateMutationBody = UpdateProductUnitDto;
export type ProductunitControllerUpdateMutationError = ErrorType<unknown>;

export const useProductunitControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerUpdate>>,
		TError,
		{ id: string; data: UpdateProductUnitDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof productunitControllerUpdate>>,
	TError,
	{ id: string; data: UpdateProductUnitDto },
	TContext
> => {
	const mutationOptions = getProductunitControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const productunitControllerRemove = (id: string) => {
	return authInstance<SuccessResponseDto>({ url: `/api/productunit/${id}`, method: "DELETE" });
};

export const getProductunitControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof productunitControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof productunitControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return productunitControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type ProductunitControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof productunitControllerRemove>>
>;

export type ProductunitControllerRemoveMutationError = ErrorType<unknown>;

export const useProductunitControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof productunitControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof productunitControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const mutationOptions = getProductunitControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
