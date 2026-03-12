function getData(experience, env = process.env.TEST_ENV) {
    return require(`./${env}/${experience}.js`);
}

module.exports = { getData };
