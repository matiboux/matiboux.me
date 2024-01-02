import type { I18n, Diff } from '../type'

const locale =
{
	'Hello, world!': 'Bonjour, monde !',

	// Global
	'Back to home page': 'Retour à la page d\'accueil',
	'and': 'et',

	// Footer
	'Open-source repository': 'Dépôt open-source',
	'Powered by': 'Propulsé par',
	'Made with love by': 'Fait avec amour par',

	// Legal
	'Legal': 'Mentions légales',
	'Owner & Webmaster': 'Propriétaire & Webmaster',
	'Hosting provider': 'Hébergeur',
} as const

// Static type check
export default locale satisfies
	// Check for missing keys:
	Readonly<Record<Diff<keyof I18n, keyof typeof locale>, string>> &
	// Check for extra keys:
	Readonly<Record<Diff<keyof typeof locale, keyof I18n>, never>>
