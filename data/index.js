function getData(experience, env = process.env.TEST_ENV || 'stage') {
    try {
        const module = require(`./${env}/${experience}.js`);
        // Return the specific export (e.g., module.auth if experience is 'auth')
        return module[experience] || module;
    } catch (error) {
        console.error(`[ERROR]: Failed to load data for experience "${experience}" in env "${env}":`, error.message);
        return {};
    }
}

module.exports = { getData };
