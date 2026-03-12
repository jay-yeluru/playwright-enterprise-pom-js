const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const projectConfig = require('./utils/config');

async function globalSetup() {
    const authPath = path.resolve(__dirname, projectConfig.auth.storageStatePath);
    const baseUrl = projectConfig.baseUrl;
    const { username, password } = projectConfig.auth;
    const maxAgeHours = projectConfig.auth.sessionMaxAgeHours;

    // Check if session exists and is fresh (12 hours)
    if (fs.existsSync(authPath)) {
        const stats = fs.statSync(authPath);
        const ageInHours = (new Date() - stats.mtime) / (1000 * 60 * 60);

        if (ageInHours < maxAgeHours) {
            console.log('✅ Valid session found. Skipping login.');
            return;
        }
    }

    console.log('🔄 Session expired or missing. Performing UI login...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto(baseUrl);
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('Email').waitFor({ state: 'visible' });
        // Using Conduit locators
        await page.getByPlaceholder('Email').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Wait for a post-login element to ensure login success
        await page
            .getByRole('link', { name: 'New Article' })
            .waitFor({ state: 'visible', timeout: 10000 });
        console.log('✅ Global Setup: Login successful.');
        // Ensure .auth directory exists
        const authDir = path.dirname(authPath);
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        await context.storageState({ path: authPath });
        console.log('💾 Session saved to .auth/user.json');
    } catch (error) {
        console.error('❌ Login failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = globalSetup;
