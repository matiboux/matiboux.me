import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

import i18n from './config/i18n'

// https://astro.build/config
export default defineConfig({
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},
	i18n: i18n,
	integrations: [
		mdx(),
	],
})
