import { test, expect } from "@playwright/test";
import loginPage from "../business/login.page.js";
import { userInfo, message } from "../business/constant.js";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

test("Login successed", async ({ page }) => {      
  logger.info("Navigation to Login page");
  await loginPage.openLoginPage(page);
  logger.info("Entering the correct username");
  await loginPage.login(userInfo.valid.user, userInfo.valid.password, page);
  logger.info("Entering the correct password");
  await expect(page.locator(loginPage.locatorForSuccessMessage)).toHaveText(message.loginSuccess);
});

test("Login failed", async ({ page }) => {
  logger.info("Navigation to Login page");
  await loginPage.openLoginPage(page);
  logger.info("Entering the incorrect username");
  await loginPage.login(userInfo.invalid.user, userInfo.invalid.password, page);
  logger.info("Entering the incorrect password");
  await expect(page.locator(loginPage.locatorForFailMessage)).toHaveText(message.loginFail);
});