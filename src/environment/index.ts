const env = import.meta.env;

export const environment = {
	production: env.PROD || false,
	baseUrl: env.VITE_BASE_URL,
	isTrueProd: env.VITE_APP_ENVIRONMENT === "production",
};
