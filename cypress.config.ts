import { defineConfig } from 'cypress';
const path = require('path');
require('dotenv').config({ path: path.resolve('', '.env') });

export default defineConfig({
	env: {
		LOGIN: process.env.LOGIN,
		PASSWORD: process.env.PASSWORD,
	},
	e2e: {
		testIsolation: false,
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1080,
		viewportWidth: 1920,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
