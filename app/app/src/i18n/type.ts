import i18nConfig from '/config/i18n'

import defaultLocaleData from './locales/en'

type I18n = Readonly<Record<keyof typeof defaultLocaleData, string>>

type Diff<T, U> = T extends U ? never : T

// Inspired from `ToTuple<Union>`: https://stackoverflow.com/a/70061272
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
type LocalesToUnionRec<Locales extends any[], Rslt> =
	Locales extends [infer Head, ...infer Tail]
	? LocalesToUnionRec<
		Tail,
		Rslt | (
			DeepWriteable<Head> extends { codes: string[] }
			? DeepWriteable<Head>['codes'][0]
			: Head
		)
	>
	: Rslt
type LocalesToUnion<Locales extends any[] | readonly any[]> = LocalesToUnionRec<DeepWriteable<Locales>, never>;

type Locales = LocalesToUnion<typeof i18nConfig.locales>

type LocalesToListRec<Locales extends any[], Rslt extends readonly any[]> =
	Locales extends [infer Head, ...infer Tail]
	? LocalesToListRec<
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
type LocalesToList<Locales extends any[] | readonly any[]> = LocalesToListRec<DeepWriteable<Locales>, []>

type LocalesList = LocalesToList<typeof i18nConfig.locales>

const locales: LocalesList =
	i18nConfig.locales.map(
		locale => typeof locale === 'string' ? locale : locale.codes[0]
	) satisfies Locales[] as LocalesList

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
