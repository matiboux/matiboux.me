import type { Diff } from '~/i18n/type'

import localeEn from '~/locales/en'

const locale =
{
	'Hello, world!': 'Bonjour, monde !',

	// Global
	'Back to home page': 'Retour à la page d\'accueil',
	'and': 'et',
	'or': 'ou',

	// Footer
	'Open-source repository': 'Dépôt open-source',
	'Powered by': 'Propulsé par',
	'Change language:': 'Changer de langue :',
	'Made with love by': 'Fait avec amour par',

	// Legal
	'Legal': 'Mentions légales',
	'Owner & Webmaster': 'Propriétaire & Webmaster',
	'Hosting provider': 'Hébergeur',
} as const

type I18n = Readonly<Record<keyof typeof localeEn, string>>
type LocaleType =
	// Check for missing keys:
	Readonly<Record<Diff<keyof I18n, keyof typeof locale>, string>> &
	// Check for extra keys:
	Readonly<Record<Diff<keyof typeof locale, keyof I18n>, never>>

// Static type check
export default locale satisfies LocaleType
