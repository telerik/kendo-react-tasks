module.exports = {
    baseURL: 'https://selenium-release.storage.googleapis.com',
    version: '3.5.3',
    drivers: {
        chrome: {
            version: '2.36',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com'
        }
    }
};
