// @ts-check
const { test, expect } = require('@playwright/test')
import loginPage from "../business/login.page.js"
import { userInfo } from "../configuration/constant.js"

test('Login successed', async ({ page }) => {
  await loginPage.openLoginPage(page)
  await loginPage.login(userInfo.valid.user, userInfo.valid.password, page)
  await expect(page.locator("css=.notificationItem__message-container--eN8Rd.notificationItem__success--Yvo7V p"))
    .toHaveText('Signed in successfully');
});

test('Login failed', async ({ page }) => {
  await loginPage.openLoginPage(page)
  await loginPage.login(userInfo.invalid.user, userInfo.invalid.password, page)
  await expect(page.locator("css=.notificationItem__message-container--eN8Rd.notificationItem__error--gkqHe p"))
    .toHaveText('An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
});
