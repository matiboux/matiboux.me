import i18nConfig from '/config/i18n'

import defaultLocaleData from './locales/en'

const defaultLocale = i18nConfig.defaultLocale

const locales = i18nConfig.locales
	.flatMap(locale => typeof locale === 'string' ? [locale] : locale.codes)

type I18n = Readonly<Record<keyof typeof defaultLocaleData, string>>

type Diff<T, U> = T extends U ? never : T

export {
	defaultLocale,
	locales,
}

export type {
	I18n,
	Diff,
}
