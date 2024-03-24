import { test, expect, chromium } from "@playwright/test";
import loginPage from "../business/pages/login.page.js";
import launchPage from "../business/pages/launch.page.js";
import { userInfo, message } from "../business/constants.js";
import logger from "../utilites/Logger.js";
import testData from "../resources/testData.json";

// test.describe("Launches Info", () => {
//     let page;

//     test.beforeAll(async () => {
//         const browser = await chromium.launch();
//         page = await browser.newPage();
//         logger.info("Navigation to Login page");
//         await loginPage.openLoginPage(page);
//         logger.info("Entering the correct username and password");
//         await loginPage.login(userInfo.valid.username, userInfo.valid.password, page);
//         await expect(page.locator(loginPage.locatorForSuccessMessage)).toHaveText(message.loginSuccess);
//         logger.info("Navigation to Launches page");
//         await launchPage.openLaunchPage(page);
//         await expect(page.locator(launchPage.locatorForFirstLaunch)).toBeVisible();
//         await page.locator(launchPage.locatorFilterByStartTime).click();
//     });

//     for (let i = 0; i < testData.content.length; i++) {
//         test(`should have corresponding launch owner name: ${i + 1}`, async () => {
//             await expect(page.locator(launchPage.getLaunchLocator(i))).toHaveText(testData.content[i].owner);
//         });
//         test(`should have corresponding launch number: ${i + 1}`, async () => {
//             await expect(page.locator(launchPage.getLaunchNumberLocator(i))).toHaveText(`#${testData.content[i].number}`);
//         });
////       This test case is not needed!!!
//         test(`should have corresponding total bags count: ${i + 1}`, async () => {
//             await expect(page.locator(launchPage.getTotalLocator(i))).toHaveText((testData.content[i].statistics.executions.total).toString());
//         });
//         test(`should have corresponding automation bags count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.defects, "automation_bug")) {
//                 await expect(page.locator(launchPage.getAutomationBagLocator(i))).toHaveText((testData.content[i].statistics.defects.automation_bug.total).toString());
//             }
//         });
//         test(`should have corresponding product bags count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.defects, "product_bug")) {
//                 await expect(page.locator(launchPage.getProductBugLocator(i))).toHaveText((testData.content[i].statistics.defects.product_bug.total).toString());
//             }
//         });
//         test(`should have corresponding system issues count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.defects, "system_issue")) {
//                 await expect(page.locator(launchPage.getSystemIssueLocator(i))).toHaveText((testData.content[i].statistics.defects.system_issue.total).toString());
//             }
//         });
//         test(`should have corresponding bags count to investigate: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.defects, "to_investigate")) {
//                 await expect(page.locator(launchPage.getInvestigateLocator(i))).toHaveText((testData.content[i].statistics.defects.to_investigate.total).toString());
//             }
//         });
//         test(`should have corresponding total tests count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.executions, "total")) {
//                 await expect(page.locator(launchPage.getTotalTestsCountLocator(i))).toHaveText((testData.content[i].statistics.executions.total).toString());
//             }
//         });
//         test(`should have corresponding passed tests count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.executions, "passed")) {
//                 await expect(page.locator(launchPage.getPassedTestsCountLocator(i))).toHaveText((testData.content[i].statistics.executions.passed).toString());
//             }
//         });
//         test(`should have corresponding failed tests count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.executions, "failed")) {
//                 await expect(page.locator(launchPage.getFailedTestsCountLocator(i))).toHaveText((testData.content[i].statistics.executions.failed).toString());
//             }
//         });
//         test(`should have corresponding skipped tests count: ${i + 1}`, async () => {
//             if (Object.hasOwn(testData.content[i].statistics.executions, "skipped")) {
//                 await expect(page.locator(launchPage.getSkippedTestsCountLocator(i))).toHaveText((testData.content[i].statistics.executions.skipped).toString());
//             }
//         });
//     }
// });

test.describe("Launches Filters", () => {
    let page;

    test.beforeAll(async () => {
        const browser = await chromium.launch();
        page = await browser.newPage();
        logger.info("Navigation to Login page");
        await loginPage.openLoginPage(page);
        logger.info("Entering the correct username and password");
        await loginPage.login(userInfo.valid.username, userInfo.valid.password, page);
        await expect(page.locator(loginPage.locatorForSuccessMessage)).toHaveText(message.loginSuccess);
        logger.info("Navigation to Launches page");
        await launchPage.openLaunchPage(page);
        await expect(page.locator(launchPage.locatorForFirstLaunch)).toBeVisible();
    });

    test("Start Time filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByStartTime).click();
        for(let i = 0; i < testData.content.length; i++) {
            await expect(page.locator(launchPage.getLaunchNumberLocator(i))).toHaveText(`#${testData.content[i].number}`);
        }
    });

    test("Total filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByTotal).click();
        let mapForFilteredTotalTestCount = launchPage.getSortedArrForEachFilterTests("total");
        let j = 0;
        for (let [key, value] of mapForFilteredTotalTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "total")) {
                await expect(page.locator(launchPage.getTotalTestsCountLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredTotalTestCount.get(key)).toBe(0);
            }
            j++;
        }
    });

    test("Passed filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByPassed).click();
        let mapForFilteredPassedTestCount = launchPage.getSortedArrForEachFilterTests("passed");
        let j = 0;
        for (let [key, value] of mapForFilteredPassedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "passed")) {
                await expect(page.locator(launchPage.getPassedTestsCountLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredPassedTestCount.get(key)).toBe(0);
            }
            j++;
        }
    });

    
    test("Failed filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByFailed).click();
        let mapForFilteredFailedTestCount = launchPage.getSortedArrForEachFilterTests("failed");
        let j = 0;
        for (let [key, value] of mapForFilteredFailedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "failed")) {
                await expect(page.locator(launchPage.getFailedTestsCountLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredFailedTestCount.get(key)).toBe(0);
            }
            j++;
        }
    });
    
    test("Skipped filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterBySkipped).click();
        let mapForFilteredSkippedTestCount = launchPage.getSortedArrForEachFilterTests("skipped");
        let j = 0;
        for (let [key, value] of mapForFilteredSkippedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "skipped")) {
                await expect(page.locator(launchPage.getSkippedTestsCountLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredSkippedTestCount.get(key)).toBe(0);
            }
            j++;
        }
    });

    test("Product bug filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByProductBug).click();
        let mapForFilteredProductBugCount = launchPage.getSortedArrForEachFilterBugs("product_bug");
        let j = 0;
        for (let [key, value] of mapForFilteredProductBugCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "product_bug")) {
                await expect(page.locator(launchPage.getProductBugLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredProductBugCount.get(key)).toBe(0);
            }
            j++;
        }
    });

    test("Automation bug filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByAutoBug).click();
        let mapForFilteredAutoBugCount = launchPage.getSortedArrForEachFilterBugs("automation_bug");
        let j = 0;
        for (let [key, value] of mapForFilteredAutoBugCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "automation_bug")) {
                await expect(page.locator(launchPage.getAutomationBagLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredAutoBugCount.get(key)).toBe(0);
            }
            j++;
        }
    });

    test("System Issue filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterBySystemIssue).click();
        let mapForFilteredSystemIssueCount = launchPage.getSortedArrForEachFilterBugs("system_issue");
        let j = 0;
        for (let [key, value] of mapForFilteredSystemIssueCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "system_issue")) {
                await expect(page.locator(launchPage.getSystemIssueLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredSystemIssueCount.get(key)).toBe(0);
            }
            j++;
        }
    });
    
    test("To Investigate filter should work as expected", async () => {
        await page.locator(launchPage.locatorFilterByToInvestigate).click();
        let mapForFilteredToInvestigateCount = launchPage.getSortedArrForEachFilterBugs("to_investigate");
        let j = 0;
        for (let [key, value] of mapForFilteredToInvestigateCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "to_investigate")) {
                await expect(page.locator(launchPage.getInvestigateLocator(j))).toHaveText(value.toString());
            }
            else {
                expect(mapForFilteredToInvestigateCount.get(key)).toBe(0);
            }
            j++;
        }
    });
});