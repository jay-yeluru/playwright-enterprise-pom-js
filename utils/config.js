require('dotenv').config();

const config = {
    baseUrl: (process.env.BASE_URL || 'https://demo.realworld.show').replace(/\/$/, ''),
    testEnv: process.env.TEST_ENV || 'stage',
    envType: process.env.ENV_TYPE || 'staging',

    auth: {
        username: process.env.TEST_USER || '',
        password: process.env.TEST_PASS || '',
        storageStatePath: process.env.AUTH_STORAGE_STATE || '.auth/user.json',
        sessionMaxAgeHours: Number(process.env.AUTH_SESSION_MAX_AGE_HOURS) || 12,
    },

    // Helper to get domain for cookies
    getDomain: (url) => url.replace('https://', '').replace('http://', '').split('/')[0],
};

module.exports = config;
