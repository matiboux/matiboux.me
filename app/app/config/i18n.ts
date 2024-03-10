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

type I18nConfigExport =
	Omit<I18nConfig, 'defaultLocale'> &
	Pick<typeof i18n, 'defaultLocale'>

export default i18n as I18nConfigExport
