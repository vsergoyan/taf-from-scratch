 import Page from "./page.js"
const { test, expect } = require('@playwright/test');

class LoginPage extends Page {
    async openLoginPage(page) {
        await super.open("https://reportportal.epam.com/ui/#login?redirectPath=%2Fvardeni_sergoyan_personal%2Flaunches%2Fall", page)
    }
    async login(username, password, page) {
        await page.locator("css=input[placeholder='Login']").fill(username)
        await page.locator("css=input[placeholder='Password']").fill(password)
        await page.locator("css=button[type='Submit']").click()
    }
}

export default new LoginPage();