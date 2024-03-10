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

type Tail<T extends any[]> =
	((...args: T) => any) extends (arg: any, ...tail: infer U) => any
	? U : never

function i18nFactory(locale: Parameters<typeof i18n>[0] | undefined)
{
	return (...args: Tail<Parameters<typeof i18n>>) => i18n(locale ?? defaultLocale, ...args)
}

export default i18n

export {
	i18nFactory,
}
