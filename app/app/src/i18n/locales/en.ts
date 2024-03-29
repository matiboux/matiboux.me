const defaultLocale =
[
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
] as const

type Keys = typeof defaultLocale[number]
type Type = { [key in Keys]: key }

// Default locale uses the key as the value
const locale = defaultLocale
	.reduce<Type>((acc, key) =>
		{
			(acc as any)[key] = key
			return acc
		},
		{} as Type,
	)

export default locale as Readonly<typeof locale>
