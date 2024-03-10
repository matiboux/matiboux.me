import en from './locales/en'
import fr from './locales/fr'
import { defaultLocale, type I18n } from './type'
import type { Locales } from './type'

const globalDictionary = {
	'en': en,
	'fr': fr,
} as const satisfies Partial<Record<Locales, I18n>>

function i18n(
	locale: Locales,
	key: keyof I18n,
	...args: string[]
)
function i18n(
	locale: Locales,
	dict: Partial<Record<Locales, string>>,
	...args: string[]
)
function i18n(
	locale: Locales,
	data: keyof I18n | Partial<Record<Locales, string>>,
	...args: string[]
)
{
	const value =
		typeof data === 'object'
			? data[locale]
			: (globalDictionary[locale]?.[data] ?? data) satisfies I18n[keyof I18n]

	if (typeof value !== 'string')
	{
		return value
	}

	return value.replace(/{(\d+)}/g, (match, number) =>
		{
			const index = Number.parseInt(number)
			return args[index] ?? match
		}
	)
}

// From `ToTuple<Union>`: https://stackoverflow.com/a/70061272
type UnionToParm<U> = U extends any ? (k: U) => void : never
type UnionToSect<U> = UnionToParm<U> extends ((k: infer I) => void) ? I : never
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never
type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>
type UnionToTuple<Union, Rslt extends any[] = []> =
    SpliceOne<Union> extends never
		? [ExtractOne<Union>, ...Rslt]
		: UnionToTuple<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>

type TupleToUnion<Tuple extends any[], Rslt extends any = never> =
	Tuple extends [infer Head, ...infer Tail]
		? TupleToUnion<Tail, Head | Rslt>
		: Rslt

// From https://stackoverflow.com/a/52761156
type OverloadedParameters<T> =
	T extends { (...args: infer A1): any; (...args: infer A2): any } ? A1 | A2 :
	T extends (...args: infer A) => any ? A :
	any

type ListTail<List extends any[]> = List extends [any, ...infer Tail] ? Tail : never

type ListRecursiveTail<List extends any[], Rslt extends any[] = []> =
	List extends [infer Head extends any[], ...infer Tail]
		? ListRecursiveTail<Tail, [...Rslt, ListTail<Head>]>
		: Rslt
type UnionRecursiveTail<Union, Rslt extends any[] = []> =
	TupleToUnion<ListRecursiveTail<UnionToTuple<Union>, Rslt>>

function i18nFactory(locale: OverloadedParameters<typeof i18n>[0] | undefined)
{
	return (...args: UnionRecursiveTail<OverloadedParameters<typeof i18n>>) =>
		i18n.apply(i18n, [locale ?? defaultLocale, ...args])
}

export default i18n

export {
	i18nFactory,
}
