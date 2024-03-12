import i18nConfig from '/config/i18n'
import type { I18nConfig } from '/config/i18n'

import defaultLocaleData from './locales/en'

type I18n = Readonly<Record<keyof typeof defaultLocaleData, string>>

type Diff<T, U> = T extends U ? never : T

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

// Inspired from `ToTuple<Union>`: https://stackoverflow.com/a/70061272
type LocalesToUnion<
	Locales extends any[] | readonly any[],
	Rslt extends any = never,
> =
	DeepWriteable<Locales> extends [infer Head, ...infer Tail]
	? LocalesToUnion<
		Tail,
		Rslt | (
			DeepWriteable<Head> extends { codes: string[] }
			? DeepWriteable<Head>['codes'][0]
			: Head
		)
	>
	: Rslt

type Locales = LocalesToUnion<typeof i18nConfig.locales>

type LocalesToList<
	Locales extends any[] | readonly any[],
	Rslt extends readonly any[] = [],
> =
	DeepWriteable<Locales> extends [infer Head, ...infer Tail]
	? LocalesToList<
		Tail,
		[
			...Rslt,
			(
				DeepWriteable<Head> extends { codes: string[] }
				? DeepWriteable<Head>['codes'][0]
				: Head
			),
		]
	>
	: Rslt

type LocalesList = LocalesToList<typeof i18nConfig.locales>

const locales: LocalesList =
	(i18nConfig.locales satisfies I18nConfig['locales'] as I18nConfig['locales'])
	.map(
		locale => typeof locale === 'string'
			? locale
			: (locale.codes[0] as string)
	) satisfies string[] as LocalesList

type DefaultLocale = Locales & typeof i18nConfig.defaultLocale

const defaultLocale: DefaultLocale = i18nConfig.defaultLocale

export {
	defaultLocale,
	locales,
}

export type {
	I18n,
	Diff,
	Locales,
	LocalesList,
	DefaultLocale,
}
