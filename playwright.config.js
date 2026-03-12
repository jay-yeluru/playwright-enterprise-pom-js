const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
const config = require('./utils/config');

module.exports = defineConfig({
    testDir: './tests',
    // globalSetup: require.resolve('./global-setup'),
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { outputFolder: 'reports/html-report' }],
        ['allure-playwright', { resultsDir: 'reports/allure-results' }],
    ],
    outputDir: 'reports/test-results',
    use: {
        baseURL: config.baseUrl,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile',
            use: { ...devices['iPhone 12'] },
        },
    ],
});
