import type { AstroConfig } from 'astro'

type LocaleKeys = Record<string, Record<string, string>>
type I18nConfig = AstroConfig['i18n'] & { localeKeys?: LocaleKeys }

import localeEn from './locales/en'
import localeFr from './locales/fr'

export const i18n: I18nConfig = {
	locales: [
		{
			codes: ['en', 'en_US'],
			path: 'en',
		},
		{
			codes: ['fr', 'fr_FR'],
			path: 'fr',
		},
	],
	defaultLocale: 'en',
	fallback: {
		fr: 'en',
	},
	localeKeys: {
		en: localeEn,
		fr: localeFr,
	},
	routing: {
		prefixDefaultLocale: false,
		redirectToDefaultLocale: true,
		fallbackType: 'rewrite',
	},
}
