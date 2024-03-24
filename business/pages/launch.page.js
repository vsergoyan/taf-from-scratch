import Page from "./page.js";
import testData from "../../resources/testData.json";

class LaunchPage extends Page {
    locatorForFirstLaunch = ".gridRow__grid-row-wrapper--xj8DG:nth-child(2)";
    locatorFilterByStartTime = ".headerCell__header-cell--DCFQq.headerCell__align-left--keOcf.sorting-desc.headerCell__sortable--GSznA.headerCell__sorting-active--qmXtJ.headerCell__with-filter--FEdyx .headerCell__title-container--cTbKe";
    locatorFilterByTotal = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'total')]";
    locatorFilterByPassed = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'passed')]";
    locatorFilterByFailed = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'failed')]";
    locatorFilterBySkipped = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'skipped')]";
    locatorFilterByProductBug = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'product bug')]";
    locatorFilterByAutoBug = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'auto bug')]";
    locatorFilterBySystemIssue = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'system issue')]";
    locatorFilterByToInvestigate = "//span[contains(@class, 'headerCell__title-full--VyGY_') and contains(text(), 'to investigate')]";
    async openLaunchPage (page) {
        await page.locator(".sidebar__sidebar--mc65e .projectSelector__project-selector--C4soz").click();
        await page.locator("//div[@class='sidebar__main-block--UJJq9']//a[@href='#vsergoyan_personal'] ").click();
        await page.locator("//a[@href='#vsergoyan_personal/launches']").click();
    }
    getLaunchLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__name-col--rSvdG.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .ownerBlock__owner--K3f8k`;
    }
    getTotalLocator (i) {
        return `//a[@href="#vsergoyan_personal/launches/all/701278${i + 1}?item0Params=filter.eq.hasStats%3Dtrue%26filter.eq.hasChildren%3Dfalse%26filter.in.type%3DSTEP%26filter.in.status%3DPASSED%252CFAILED%252CSKIPPED%252CINTERRUPTED"]`;
    }
    getLaunchNumberLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__name-col--rSvdG.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .itemInfo__number--uvCUK`;
    }

    getProductBugLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__pb-col--QoQdW.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .donutChart__total--WOHqn`;
    }
    getAutomationBagLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__ab-col--cmhGC.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .donutChart__total--WOHqn`;
    }
    getSystemIssueLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__si-col--yM7Bg.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .donutChart__total--WOHqn`;
    }
    getInvestigateLocator (i) {
        return `.gridRow__grid-row-wrapper--xj8DG:nth-child(${i + 2}) .launchSuiteGrid__ti-col--qV5Sv.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN .donutChart__total--WOHqn`;
    }

    getTotalTestsCountLocator (i) {
        return `//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='PASSED,FAILED,SKIPPED,INTERRUPTED']`;
    }
    getPassedTestsCountLocator (i) {
        return `//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='PASSED']`;
    }
    getFailedTestsCountLocator (i) {
        return `//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='FAILED,INTERRUPTED']`;
    }
    getSkippedTestsCountLocator (i) {
        return `//div[@class='gridRow__grid-row-wrapper--xj8DG'][${i + 1}]//a[@statuses='SKIPPED']`;
    }

    getSortedArrForEachFilterTests(typeOfTests) {
        let myMap = new Map();
        for(let i = 0; i < testData.content.length; i++) {
            if(Object.hasOwn(testData.content[i].statistics.executions, typeOfTests)) {
                myMap.set(i, testData.content[i].statistics.executions[typeOfTests]);
            }
            else {
                myMap.set(i, 0);
            }
        }
        let sortedArray = Array.from(myMap);
        sortedArray.sort((a, b) => a[1] - b[1]);
        let sortedMap = new Map(sortedArray);
        return sortedMap;
    }

    getSortedArrForEachFilterBugs(typeOfBug) {
        let myMap = new Map();
        for(let i = 0; i < testData.content.length; i++) {
            if(Object.hasOwn(testData.content[i].statistics.defects, typeOfBug)) {
                myMap.set(i, testData.content[i].statistics.defects[typeOfBug].total);
            }
            else {
                myMap.set(i, 0);
            }
        }
        let sortedArray = Array.from(myMap);
        sortedArray.sort((a, b) => a[1] - b[1]);
        let sortedMap = new Map(sortedArray);
        return sortedMap;
    }
}
export default new LaunchPage();