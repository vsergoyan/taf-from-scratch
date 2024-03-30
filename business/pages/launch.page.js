import Page from "./page.js";
import testData from "../../resources/testData.json";

export class LaunchPage extends Page {
    projectSelector;
    vsergoyanProject;
    launchesButton;
    locatorFilterByStartTime;
    locatorForFirstLaunch;
    locatorFilterByTotal;
    locatorFilterByPassed;
    locatorFilterByFailed;
    locatorFilterBySkipped;
    locatorFilterByProductBug;
    locatorFilterByAutoBug;
    locatorFilterBySystemIssue;
    locatorFilterByToInvestigate;
    constructor (page) {
        super(page);
        this.projectSelector = page.locator(".sidebar__sidebar--mc65e .projectSelector__project-selector--C4soz");
        this.vsergoyanProject = page.locator("//div[@class='sidebar__main-block--UJJq9']//a[@href='#vsergoyan_personal'] ");
        this.launchesButton = page.locator("//a[@href='#vsergoyan_personal/launches']");
        this.locatorFilterByStartTime = page.locator("div[class*='sorting-desc'] .headerCell__title-container--cTbKe");
        this.locatorForFirstLaunch = page.waitForSelector(".gridRow__grid-row-wrapper--xj8DG:nth-child(2)");
        this.locatorFilterByTotal = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'total')]");
        this.locatorFilterByPassed = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'passed')]");
        this.locatorFilterByFailed = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'failed')]");
        this.locatorFilterBySkipped = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'skipped')]");
        this.locatorFilterByProductBug = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'product bug')]");
        this.locatorFilterByAutoBug = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'auto bug')]");
        this.locatorFilterBySystemIssue = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'system issue')]");
        this.locatorFilterByToInvestigate = page.locator("//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'to investigate')]");
    }
    async openPage () {
        await this.projectSelector.click();
        await this.vsergoyanProject.click();
        await this.launchesButton.click();
    }
    getLaunchLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) td[class*='gridCell__align-left--DFXWN'] .ownerBlock__owner--K3f8k`);
    }
    getLaunchNumberLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) td[class*='launchSuiteGrid__name-col--rSvdG'] .itemInfo__number--uvCUK`);
    }

    getProductBugLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) div[class*='launchSuiteGrid__pb-col--QoQdW'] .donutChart__total--WOHqn`);
    }
    getAutomationBagLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) div[class*='launchSuiteGrid__ab-col--cmhGC'] .donutChart__total--WOHqn`);
    }
    getSystemIssueLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) div[class*='launchSuiteGrid__si-col--yM7Bg'] .donutChart__total--WOHqn`);
    }
    getInvestigateLocator (i) {
        return this.page.locator(`.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) div[class*='launchSuiteGrid__ti-col--qV5Sv'] .donutChart__total--WOHqn`);
    }

    getTotalTestsCountLocator (i) {
        return this.page.locator(`//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='PASSED,FAILED,SKIPPED,INTERRUPTED']`);
    }
    getPassedTestsCountLocator (i) {
        return this.page.locator(`//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='PASSED']`);
    }
    getFailedTestsCountLocator (i) {
        return this.page.locator(`//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='FAILED,INTERRUPTED']`);
    }
    getSkippedTestsCountLocator (i) {
        return this.page.locator(`//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='SKIPPED']`);
    }

    getSortedArrForEachFilterTests (typeOfTests) {
        const myMap = new Map();
        for (let i = 0; i < testData.content.length; i++) {
            if (Object.hasOwn(testData.content[i].statistics.executions, typeOfTests)) {
                myMap.set(i, testData.content[i].statistics.executions[typeOfTests]);
            }
            else {
                myMap.set(i, 0);
            }
        }
        const sortedArray = Array.from(myMap);
        sortedArray.sort((a, b) => a[1] - b[1]);
        const sortedMap = new Map(sortedArray);
        return sortedMap;
    }

    getSortedArrForEachFilterBugs (typeOfBug) {
        const myMap = new Map();
        for (let i = 0; i < testData.content.length; i++) {
            if (Object.hasOwn(testData.content[i].statistics.defects, typeOfBug)) {
                myMap.set(i, testData.content[i].statistics.defects[typeOfBug].total);
            }
            else {
                myMap.set(i, 0);
            }
        }
        const sortedArray = Array.from(myMap);
        sortedArray.sort((a, b) => a[1] - b[1]);
        const sortedMap = new Map(sortedArray);
        return sortedMap;
    }
}
// export default new LaunchPage();