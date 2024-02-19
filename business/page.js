const { test, expect } = require('@playwright/test');

export default class Page {
    async open(path, page) {
        await page.goto(path);
    }
}