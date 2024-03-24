import Page from "./page.js";

class FilterPage extends Page {
    async openFilterPage (page) {
        await page.locator(".sidebar__sidebar--mc65e .projectSelector__project-selector--C4soz").click();
        await page.locator("//div[@class='sidebar__main-block--UJJq9']//a[@href='#vsergoyan_personal'] ").click();
        await page.locator("//a[@href='#vsergoyan_personal/filters']").click();
    }
}

export default new FilterPage();