import type { Diff } from '~/i18n/types.d.ts'

import type { DefaultLocaleKeys } from './types.d.ts'

const locale = {
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

export default locale satisfies
	// Static type check for missing keys
	Readonly<Record<Diff<DefaultLocaleKeys, keyof typeof locale>, string>> &
	// Static type check for extra keys
	Readonly<Record<Diff<keyof typeof locale, DefaultLocaleKeys>, never>>
