declare module "moment" {
	interface Moment {
		tz(timezone: string): Moment;
	}
}
