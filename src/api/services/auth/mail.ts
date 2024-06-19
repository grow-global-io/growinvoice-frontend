/**
 * Generated by orval v6.30.2 🍺
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
import type { SendMailDto, SuccessResponseDto } from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const mailControllerSendMail = (sendMailDto: SendMailDto) => {
	return authInstance<SuccessResponseDto | void>({
		url: `/api/mail/send`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: sendMailDto,
	});
};

export const getMailControllerSendMailMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof mailControllerSendMail>>,
		TError,
		{ data: SendMailDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof mailControllerSendMail>>,
	TError,
	{ data: SendMailDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof mailControllerSendMail>>,
		{ data: SendMailDto }
	> = (props) => {
		const { data } = props ?? {};

		return mailControllerSendMail(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MailControllerSendMailMutationResult = NonNullable<
	Awaited<ReturnType<typeof mailControllerSendMail>>
>;
export type MailControllerSendMailMutationBody = SendMailDto;
export type MailControllerSendMailMutationError = ErrorType<unknown>;

export const useMailControllerSendMail = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof mailControllerSendMail>>,
		TError,
		{ data: SendMailDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof mailControllerSendMail>>,
	TError,
	{ data: SendMailDto },
	TContext
> => {
	const mutationOptions = getMailControllerSendMailMutationOptions(options);

	return useMutation(mutationOptions);
};