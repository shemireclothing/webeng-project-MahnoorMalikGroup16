// playwright.config.js
// Place this file in your tests/ folder alongside e2e.test.js

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  timeout: 30000,          // 30s per test (gives PHP time to respond)
  retries: 1,              // retry once on flaky network
  use: {
    baseURL:    'http://localhost/utility-complaint',
    headless:   false,     // set to true to run without opening a browser window
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});