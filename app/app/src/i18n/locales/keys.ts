import type { DefaultLocale } from '~/i18n/types.d.ts'

export const localeKeys = [
	'Hello, world!',
	// Global
	'Back to home page',
	'and',
	'or',
	// Footer
	'Open-source repository',
	'Powered by',
	'Change language:',
	'Made with love by',
	// Legal
	'Legal',
	'Owner & Webmaster',
	'Hosting provider',
] as const satisfies DefaultLocale

export type DefaultLocaleConst = typeof localeKeys
