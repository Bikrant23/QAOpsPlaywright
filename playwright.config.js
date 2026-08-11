// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  
  timeout:200*100, //Related to test timeout
  reporter: 'html',
  expect:{
    timeout:50*100, //Related to expect assertion timeout
  },
  use: {
    actionTimeout : 10*1000, //Applies to all Actions like Click, Fill etc.
    navigationTimeout: 30*1000, //Timeout to land in a New Page
    browserName: 'chromium',
    channel: 'chrome', //Can be 'chrome', 'chrome-beta', 'msedge', 'msedge-dev', 'firefox', or 'webkit'.
    headless: true,
    screenshot: 'ON', //Can be 'on', 'off', 'only-on-failure'
    trace:'on',
    //trace:'retain-on-failure',
    launchOptions: {
      args: ['--start-maximized'], // Forces borderless full screen mode
    },
  }, 
});

module.exports = config

