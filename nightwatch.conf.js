const path = require('path');

module.exports = (function() {
    const settings = {
        "src_folders": [
            path.resolve(process.cwd(), "e2e")
        ],
        "output_folder": "reports",
        "custom_commands_path": "",
        "custom_assertions_path": "",
        "page_objects_path": "",
        "globals_path": "",
        "selenium": {
            "start_process": true,
            "server_path": require.resolve('selenium-standalone/.selenium/selenium-server/3.5.3-server.jar'),
            "log_path": "",
            "cli_args": {
                "webdriver.chrome.driver": require.resolve('selenium-standalone/.selenium/chromedriver/2.32-x64-chromedriver')
            }
        },
        "test_settings": {
            "default": {
                "launch_url": "http://localhost",
                "selenium_host": "localhost",
                "silent": true,
                "screenshots": {
                    "enabled": false,
                    "path": ""
                },
                "desiredCapabilities": {
                    "browserName": "chrome",
                    "marionette": true
                }
            },
            "chrome": {
                "desiredCapabilities": {
                    "browserName": "chrome"
                }
            },
            "parallel": {
                "desiredCapabilities": {
                    "browserName": "chrome"
                },
                "test_workers": {
                    "enabled": true,
                    "workers": "auto"
                },
                "skip_testcases_on_fail": false,
                "parallel_process_delay": 20
            }
        }
    };

    return settings;
})();
