type I18nConfig = {
	readonly defaultLocale: string,
	readonly locales: readonly (
		| string
		| {
			readonly codes: readonly string[],
			readonly path: string,
		}
	)[],
	readonly routing: {
		readonly prefixDefaultLocale: boolean,
	}
}

const i18n =
{
	defaultLocale: 'en',
	locales: [
		'en',
		'fr',
	],
	routing: {
		prefixDefaultLocale: false,
	},
} as const satisfies I18nConfig

export default i18n

export type {
	I18nConfig,
}
