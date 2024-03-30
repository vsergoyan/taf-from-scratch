import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../business/pages/login.page.js";
import { userInfo, message } from "../business/constants.js";
import logger from "../utilites/Logger.js";

test.describe("Login", () => {
  let page, loginPage;

    test.beforeAll(async () => {
      const browser = await chromium.launch();
      page = await browser.newPage(); 
      loginPage = new LoginPage(page);
      logger.info("Navigation to Login page");
      await loginPage.openPage();
    });

    test("Login successed", async () => {      
      logger.info("Entering the correct username and password");
      await loginPage.login(userInfo.valid.username, userInfo.valid.password);
      const expectedSuccessMessage = loginPage.locatorForSuccessMessage;
      const actualSuccessMessage = message.loginSuccess;
      await expect(expectedSuccessMessage).toHaveText(actualSuccessMessage);
    });

    test("Login failed", async () => {
      logger.info("Entering the incorrect username and password");
      await loginPage.login(userInfo.invalid.username, userInfo.invalid.password);
      const expectedFailMessage = loginPage.locatorForFailMessage;
      const actualFailMessage = message.loginFail;
      await expect(expectedFailMessage).toHaveText(actualFailMessage);
    });
});