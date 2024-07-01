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
	OpenaiControllerCreate200Item,
	OpenaiControllerCreate201,
	OpenaiControllerCreateGraph200Item,
	OpenaiControllerCreateGraph201,
	OpenaiControllerSuggestionsParams,
	RequestBodyOpenaiDto,
} from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const openaiControllerCreate = (requestBodyOpenaiDto: RequestBodyOpenaiDto) => {
	return authInstance<OpenaiControllerCreate200Item[] | OpenaiControllerCreate201>({
		url: `/api/openai`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: requestBodyOpenaiDto,
	});
};

export const getOpenaiControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof openaiControllerCreate>>,
		TError,
		{ data: RequestBodyOpenaiDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof openaiControllerCreate>>,
	TError,
	{ data: RequestBodyOpenaiDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof openaiControllerCreate>>,
		{ data: RequestBodyOpenaiDto }
	> = (props) => {
		const { data } = props ?? {};

		return openaiControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OpenaiControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof openaiControllerCreate>>
>;
export type OpenaiControllerCreateMutationBody = RequestBodyOpenaiDto;
export type OpenaiControllerCreateMutationError = ErrorType<unknown>;

export const useOpenaiControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof openaiControllerCreate>>,
		TError,
		{ data: RequestBodyOpenaiDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof openaiControllerCreate>>,
	TError,
	{ data: RequestBodyOpenaiDto },
	TContext
> => {
	const mutationOptions = getOpenaiControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const openaiControllerCreateGraph = (requestBodyOpenaiDto: RequestBodyOpenaiDto) => {
	return authInstance<OpenaiControllerCreateGraph200Item[] | OpenaiControllerCreateGraph201>({
		url: `/api/openai/graph`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: requestBodyOpenaiDto,
	});
};

export const getOpenaiControllerCreateGraphMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof openaiControllerCreateGraph>>,
		TError,
		{ data: RequestBodyOpenaiDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof openaiControllerCreateGraph>>,
	TError,
	{ data: RequestBodyOpenaiDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof openaiControllerCreateGraph>>,
		{ data: RequestBodyOpenaiDto }
	> = (props) => {
		const { data } = props ?? {};

		return openaiControllerCreateGraph(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OpenaiControllerCreateGraphMutationResult = NonNullable<
	Awaited<ReturnType<typeof openaiControllerCreateGraph>>
>;
export type OpenaiControllerCreateGraphMutationBody = RequestBodyOpenaiDto;
export type OpenaiControllerCreateGraphMutationError = ErrorType<unknown>;

export const useOpenaiControllerCreateGraph = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof openaiControllerCreateGraph>>,
		TError,
		{ data: RequestBodyOpenaiDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof openaiControllerCreateGraph>>,
	TError,
	{ data: RequestBodyOpenaiDto },
	TContext
> => {
	const mutationOptions = getOpenaiControllerCreateGraphMutationOptions(options);

	return useMutation(mutationOptions);
};
export const openaiControllerSuggestions = (
	params?: OpenaiControllerSuggestionsParams,
	signal?: AbortSignal,
) => {
	return authInstance<void>({ url: `/api/openai/suggestions`, method: "GET", params, signal });
};

export const getOpenaiControllerSuggestionsQueryKey = (
	params?: OpenaiControllerSuggestionsParams,
) => {
	return [`/api/openai/suggestions`, ...(params ? [params] : [])] as const;
};

export const getOpenaiControllerSuggestionsQueryOptions = <
	TData = Awaited<ReturnType<typeof openaiControllerSuggestions>>,
	TError = ErrorType<unknown>,
>(
	params?: OpenaiControllerSuggestionsParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof openaiControllerSuggestions>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOpenaiControllerSuggestionsQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof openaiControllerSuggestions>>> = ({
		signal,
	}) => openaiControllerSuggestions(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof openaiControllerSuggestions>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OpenaiControllerSuggestionsQueryResult = NonNullable<
	Awaited<ReturnType<typeof openaiControllerSuggestions>>
>;
export type OpenaiControllerSuggestionsQueryError = ErrorType<unknown>;

export const useOpenaiControllerSuggestions = <
	TData = Awaited<ReturnType<typeof openaiControllerSuggestions>>,
	TError = ErrorType<unknown>,
>(
	params?: OpenaiControllerSuggestionsParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof openaiControllerSuggestions>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getOpenaiControllerSuggestionsQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};