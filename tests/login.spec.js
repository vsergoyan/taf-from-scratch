import { test, expect } from "@playwright/test";
import loginPage from "../business/pages/login.page.js";
import { userInfo, message } from "../business/constants.js";
import logger from "../utilites/Logger.js";

test("Login successed", async ({ page }) => {      
  logger.info("Navigation to Login page");
  await loginPage.openLoginPage(page);
  logger.info("Entering the correct username");
  await loginPage.login(userInfo.valid.username, userInfo.valid.password, page);
  logger.info("Entering the correct password");
  await expect(page.locator(loginPage.locatorForSuccessMessage)).toHaveText(message.loginSuccess);
});

test("Login failed", async ({ page }) => {
  logger.info("Navigation to Login page");
  await loginPage.openLoginPage(page);
  logger.info("Entering the incorrect username");
  await loginPage.login(userInfo.invalid.username, userInfo.invalid.password, page);
  logger.info("Entering the incorrect password");
  await expect(page.locator(loginPage.locatorForFailMessage)).toHaveText(message.loginFail);
});