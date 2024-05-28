/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
	MutationFunction,
	UseMutationOptions,
	UseMutationResult,
} from "@tanstack/react-query";
import type { CreateUserDto, ErrorMessageDto, LoginSuccessDto, LoginUserDto } from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const userControllerCreateUser = (createUserDto: CreateUserDto) => {
	return authInstance<ErrorMessageDto>({
		url: `/api/user/create`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createUserDto,
	});
};

export const getUserControllerCreateUserMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof userControllerCreateUser>>,
		TError,
		{ data: CreateUserDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof userControllerCreateUser>>,
	TError,
	{ data: CreateUserDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userControllerCreateUser>>,
		{ data: CreateUserDto }
	> = (props) => {
		const { data } = props ?? {};

		return userControllerCreateUser(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserControllerCreateUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof userControllerCreateUser>>
>;
export type UserControllerCreateUserMutationBody = CreateUserDto;
export type UserControllerCreateUserMutationError = ErrorType<unknown>;

export const useUserControllerCreateUser = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof userControllerCreateUser>>,
		TError,
		{ data: CreateUserDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof userControllerCreateUser>>,
	TError,
	{ data: CreateUserDto },
	TContext
> => {
	const mutationOptions = getUserControllerCreateUserMutationOptions(options);

	return useMutation(mutationOptions);
};
export const userControllerLoginUser = (loginUserDto: LoginUserDto) => {
	return authInstance<LoginSuccessDto>({
		url: `/api/user/login`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: loginUserDto,
	});
};

export const getUserControllerLoginUserMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof userControllerLoginUser>>,
		TError,
		{ data: LoginUserDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof userControllerLoginUser>>,
	TError,
	{ data: LoginUserDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userControllerLoginUser>>,
		{ data: LoginUserDto }
	> = (props) => {
		const { data } = props ?? {};

		return userControllerLoginUser(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserControllerLoginUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof userControllerLoginUser>>
>;
export type UserControllerLoginUserMutationBody = LoginUserDto;
export type UserControllerLoginUserMutationError = ErrorType<unknown>;

export const useUserControllerLoginUser = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof userControllerLoginUser>>,
		TError,
		{ data: LoginUserDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof userControllerLoginUser>>,
	TError,
	{ data: LoginUserDto },
	TContext
> => {
	const mutationOptions = getUserControllerLoginUserMutationOptions(options);

	return useMutation(mutationOptions);
};
