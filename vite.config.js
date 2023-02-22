import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal:
			process.env.NODE_ENV === 'production'
				? ['@carbon/charts', 'carbon-components']
				: [],
	},
};

export default config;
