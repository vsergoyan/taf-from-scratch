import Page from "./page.js";
import { message } from "../../business/constants.js";
import { expect } from "@playwright/test";

export class LoginPage extends Page {
    loginLocator;
    passwordLocator;
    submitButtonLocator;
    locatorForSuccessMessage;
    locatorForFailMessage;
    constructor (page) {
        super(page);
        this.locatorForFailMessage = page.locator("div[class*='notificationItem__error--gkqHe'] p");
        this.locatorForSuccessMessage = page.locator("div[class*='notificationItem__success--Yvo7V'] p");
        this.loginLocator = page.locator("css=input[placeholder='Login']");
        this.passwordLocator = page.locator("css=input[placeholder='Password']");
        this.submitButtonLocator = page.locator("css=button[type='Submit']");
    }
    async openPage () {
        await super.open("https://reportportal.epam.com/ui/#login");
    }
    async login (username, password) {
        await this.loginLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.submitButtonLocator.click();
    }
    async loginSuccess (username, password) {
        await this.loginLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.submitButtonLocator.click();
        await expect(this.locatorForSuccessMessage).toHaveText(message.loginSuccess);
    }
}