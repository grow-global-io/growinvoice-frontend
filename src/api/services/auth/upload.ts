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
import type { UploadControllerUploadFileBody, UploadResponseDto } from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const uploadControllerUploadFile = (
	uploadControllerUploadFileBody: UploadControllerUploadFileBody,
) => {
	const formData = new FormData();
	if (uploadControllerUploadFileBody.file !== undefined) {
		formData.append("file", uploadControllerUploadFileBody.file);
	}

	return authInstance<UploadResponseDto>({
		url: `/api/upload`,
		method: "POST",
		headers: { "Content-Type": "multipart/form-data" },
		data: formData,
	});
};

export const getUploadControllerUploadFileMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof uploadControllerUploadFile>>,
		TError,
		{ data: UploadControllerUploadFileBody },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof uploadControllerUploadFile>>,
	TError,
	{ data: UploadControllerUploadFileBody },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof uploadControllerUploadFile>>,
		{ data: UploadControllerUploadFileBody }
	> = (props) => {
		const { data } = props ?? {};

		return uploadControllerUploadFile(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UploadControllerUploadFileMutationResult = NonNullable<
	Awaited<ReturnType<typeof uploadControllerUploadFile>>
>;
export type UploadControllerUploadFileMutationBody = UploadControllerUploadFileBody;
export type UploadControllerUploadFileMutationError = ErrorType<unknown>;

export const useUploadControllerUploadFile = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof uploadControllerUploadFile>>,
		TError,
		{ data: UploadControllerUploadFileBody },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof uploadControllerUploadFile>>,
	TError,
	{ data: UploadControllerUploadFileBody },
	TContext
> => {
	const mutationOptions = getUploadControllerUploadFileMutationOptions(options);

	return useMutation(mutationOptions);
};