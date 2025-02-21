import type { I18nKeys } from '~/i18n/type.d.ts'

export interface Site
{
	title?: string
	description?: string | I18nKeys
	author?: string
	keywords?: string[]
	themeColor?: string
	favicon?: string
	lang?: string
}

export const site: Site = {
	title: 'Matiboux.me',
	description: 'My personal website, about me and my projects!',
	author: 'Matiboux',
	themeColor: '#202020',
	// gtag: 'UA-53429285-6',
}
