import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

import i18n from './config/i18n'

// https://astro.build/config
export default defineConfig({
	i18n: i18n,
	integrations: [
		mdx(),
	],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
})
