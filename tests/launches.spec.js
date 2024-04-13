import { test, expect, chromium } from "@playwright/test";
import { LaunchPage } from "../business/pages/launch.page.js";
import { LoginPage } from "../business/pages/login.page.js";
import { userInfo } from "../business/constants.js";
import testData from "../resources/testData.json";
// import { testData } from "../resources/testData.js";
import logger from "../utilites/Logger.js";

test.describe("Launches Info", async () => {
    let page, launchPage, loginPage;

    test.beforeAll(async () => {
        const browser = await chromium.launch();
        page = await browser.newPage();
        launchPage = new LaunchPage(page);
        loginPage = new LoginPage(page);
        logger.info("Navigation to Login page");
        await loginPage.openPage(page);
        logger.info("Entering the correct username and password");
        await loginPage.loginSuccess(userInfo.valid.username, userInfo.valid.password);
        logger.info("Navigation to Launches page");
        await launchPage.openPage();
        await launchPage.locatorForFirstLaunch;
        await launchPage.locatorFilterByStartTime.click();
    });

    for (let i = 0; i < testData.content.length; i++) {
        test(`should have corresponding launch owner name: ${i + 1}`, async () => {
            const expectedOwnerName = launchPage.getLaunchLocator(i);
            const actualOwnerName = testData.content[i].owner;
            await expect(expectedOwnerName).toHaveText(actualOwnerName);
        });
        test(`should have corresponding launch number: ${i + 1}`, async () => {
            const expectedLaunchNumber = launchPage.getLaunchNumberLocator(i);
            const actualLaunchNumber = `#${testData.content[i].number}`;
            await expect(expectedLaunchNumber).toHaveText(actualLaunchNumber);
        });
        test(`should have corresponding automation bags count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.defects, "automation_bug")) {
                const expectedAutoBugs = launchPage.getAutomationBagLocator(i);
                const actualAutoBugs = (testData.content[i].statistics.defects.automation_bug.total).toString();
                await expect(expectedAutoBugs).toHaveText(actualAutoBugs);
            }
        });
        test(`should have corresponding product bags count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.defects, "product_bug")) {
                const expectedProductBugs = launchPage.getProductBugLocator(i);
                const actualProductBugs = (testData.content[i].statistics.defects.product_bug.total).toString();
                await expect(expectedProductBugs).toHaveText(actualProductBugs);
            }
        });
        test(`should have corresponding system issues count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.defects, "system_issue")) {
                const expectedSystemIssues = launchPage.getSystemIssueLocator(i);
                const actualSystemIssues = (testData.content[i].statistics.defects.system_issue.total).toString();
                await expect(expectedSystemIssues).toHaveText(actualSystemIssues);
            }
        });
        test(`should have corresponding bags count to investigate: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.defects, "to_investigate")) {
                const expectedToInvestigate = launchPage.getInvestigateLocator(i);
                const actualToInvestigate = (testData.content[i].statistics.defects.to_investigate.total).toString();
                await expect(expectedToInvestigate).toHaveText(actualToInvestigate);
            }
        });
        test(`should have corresponding total tests count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.executions, "total")) {
                const expectedTotalTests = launchPage.getTotalTestsCountLocator(i);
                const actualTotalTests = (testData.content[i].statistics.executions.total).toString();
                await expect(expectedTotalTests).toHaveText(actualTotalTests);
            }
        });
        test(`should have corresponding passed tests count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.executions, "passed")) {
                const expectedPassedTests = launchPage.getPassedTestsCountLocator(i);
                const actualPassedTests = (testData.content[i].statistics.executions.passed).toString();
                await expect(expectedPassedTests).toHaveText(actualPassedTests);
            }
        });
        test(`should have corresponding failed tests count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.executions, "failed")) {
                const expectedFailedTests = launchPage.getFailedTestsCountLocator(i);
                const actualFailedTests = (testData.content[i].statistics.executions.failed).toString();
                await expect(expectedFailedTests).toHaveText(actualFailedTests);
            }
        });
        test(`should have corresponding skipped tests count: ${i + 1}`, async () => {
            if (Object.hasOwn(testData.content[i].statistics.executions, "skipped")) {
                const expectedSkippedTests = launchPage.getSkippedTestsCountLocator(i);
                const actualSkippedTests = (testData.content[i].statistics.executions.skipped).toString();
                await expect(expectedSkippedTests).toHaveText(actualSkippedTests);
            }
        });
    }
});

test.describe("Launches Filters", () => {
    let page, launchPage, loginPage;

    test.beforeAll(async () => {
        const browser = await chromium.launch();
        page = await browser.newPage();
        launchPage = new LaunchPage(page);
        loginPage = new LoginPage(page);
        logger.info("Navigation to Login page");
        await loginPage.openPage(page);
        logger.info("Entering the correct username and password");
        await loginPage.loginSuccess(userInfo.valid.username, userInfo.valid.password);
        logger.info("Navigation to Launches page");
        await launchPage.openPage();
        await launchPage.locatorForFirstLaunch;
    });

    test("Start Time filter should work as expected", async () => {
        await launchPage.locatorFilterByStartTime.click();
        for (let i = 0; i < testData.content.length; i++) {
            const expectedLaunchNumber = launchPage.getLaunchNumberLocator(i);
            const actualLaunchNumber = `#${testData.content[i].number}`;
            await expect(expectedLaunchNumber).toHaveText(actualLaunchNumber);
        }
    });

    test("Total filter should work as expected", async () => {
        await launchPage.locatorFilterByTotal.click();
        const mapForFilteredTotalTestCount = launchPage.getSortedArrForEachFilterTests("total");
        let j = 0;
        let expectedTotalTests;
        let actualTotalTests;
        for (const [key, value] of mapForFilteredTotalTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "total")) {
                expectedTotalTests = launchPage.getTotalTestsCountLocator(j);
                actualTotalTests = value.toString();
                await expect(expectedTotalTests).toHaveText(actualTotalTests);
            }
            else {
                expectedTotalTests = mapForFilteredTotalTestCount.get(key);
                actualTotalTests = 0;
                expect(expectedTotalTests).toBe(actualTotalTests);
            }
            j++;
        }
    });

    test("Passed filter should work as expected", async () => {
        await launchPage.locatorFilterByPassed.click();
        const mapForFilteredPassedTestCount = launchPage.getSortedArrForEachFilterTests("passed");
        let j = 0;
        let expectedPassedTests;
        let actualPassedTests;
        for (const [key, value] of mapForFilteredPassedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "passed")) {
                expectedPassedTests = launchPage.getPassedTestsCountLocator(j);
                actualPassedTests = value.toString();
                await expect(expectedPassedTests).toHaveText(actualPassedTests);
            }
            else {
                expectedPassedTests = mapForFilteredPassedTestCount.get(key);
                actualPassedTests = 0;
                expect(expectedPassedTests).toBe(actualPassedTests);
            }
            j++;
        }
    });

    test("Failed filter should work as expected", async () => {
        await launchPage.locatorFilterByFailed.click();
        const mapForFilteredFailedTestCount = launchPage.getSortedArrForEachFilterTests("failed");
        let j = 0;
        let expectedFailedTests;
        let actualFailedTests;
        for (const [key, value] of mapForFilteredFailedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "failed")) {
                expectedFailedTests = launchPage.getFailedTestsCountLocator(j);
                actualFailedTests = value.toString();
                await expect(expectedFailedTests).toHaveText(actualFailedTests);
            }
            else {
                expectedFailedTests = mapForFilteredFailedTestCount.get(key);
                actualFailedTests = 0;
                expect(expectedFailedTests).toBe(actualFailedTests);
            }
            j++;
        }
    });
    
    test("Skipped filter should work as expected", async () => {
        await launchPage.locatorFilterBySkipped.click();
        const mapForFilteredSkippedTestCount = launchPage.getSortedArrForEachFilterTests("skipped");
        let j = 0;
        let expectedSkippedTests;
        let actualSkippedTests;
        for (const [key, value] of mapForFilteredSkippedTestCount) {
            if (Object.hasOwn(testData.content[key].statistics.executions, "skipped")) {
                expectedSkippedTests = launchPage.getSkippedTestsCountLocator(j);
                actualSkippedTests = value.toString();
                await expect(expectedSkippedTests).toHaveText(actualSkippedTests);
            }
            else {
                expectedSkippedTests = mapForFilteredSkippedTestCount.get(key);
                actualSkippedTests = 0;
                expect(expectedSkippedTests).toBe(actualSkippedTests);
            }
            j++;
        }
    });

    test("Product bug filter should work as expected", async () => {
        await launchPage.locatorFilterByProductBug.click();
        const mapForFilteredProductBugCount = launchPage.getSortedArrForEachFilterBugs("product_bug");
        let j = 0;
        let expectedProductBugs;
        let actualProductBugs;
        for (const [key, value] of mapForFilteredProductBugCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "product_bug")) {
                expectedProductBugs = launchPage.getProductBugLocator(j);
                actualProductBugs = value.toString();
                await expect(expectedProductBugs).toHaveText(actualProductBugs);
            }
            else {
                expectedProductBugs = mapForFilteredProductBugCount.get(key);
                actualProductBugs = 0;
                expect(expectedProductBugs).toBe(actualProductBugs);
            }
            j++;
        }
    });

    test("Automation bug filter should work as expected", async () => {
        await launchPage.locatorFilterByAutoBug.click();
        const mapForFilteredAutoBugCount = launchPage.getSortedArrForEachFilterBugs("automation_bug");
        let j = 0;
        let expectedAutomationBags;
        let actualAutomationBags;
        for (const [key, value] of mapForFilteredAutoBugCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "automation_bug")) {
                expectedAutomationBags = launchPage.getAutomationBagLocator(j);
                actualAutomationBags = value.toString();
                await expect(expectedAutomationBags).toHaveText(actualAutomationBags);
            }
            else {
                expectedAutomationBags = mapForFilteredAutoBugCount.get(key);
                actualAutomationBags = 0;
                expect(expectedAutomationBags).toBe(actualAutomationBags);
            }
            j++;
        }
    });

    test("System Issue filter should work as expected", async () => {
        await launchPage.locatorFilterBySystemIssue.click();
        const mapForFilteredSystemIssueCount = launchPage.getSortedArrForEachFilterBugs("system_issue");
        let j = 0;
        let expectedSystemIssues;
        let actualSystemIssues;
        for (const [key, value] of mapForFilteredSystemIssueCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "system_issue")) {
                expectedSystemIssues = launchPage.getSystemIssueLocator(j);
                actualSystemIssues = value.toString();
                await expect(expectedSystemIssues).toHaveText(actualSystemIssues);
            }
            else {
                expectedSystemIssues = mapForFilteredSystemIssueCount.get(key);
                actualSystemIssues = 0;
                expect(expectedSystemIssues).toBe(actualSystemIssues);
            }
            j++;
        }
    });
    
    test("To Investigate filter should work as expected", async () => {
        await launchPage.locatorFilterByToInvestigate.click();
        const mapForFilteredToInvestigateCount = launchPage.getSortedArrForEachFilterBugs("to_investigate");
        let j = 0;
        let expectedToInvestigates;
        let actualToInvestigates;
        for (const [key, value] of mapForFilteredToInvestigateCount) {
            if (Object.hasOwn(testData.content[key].statistics.defects, "to_investigate")) {
                expectedToInvestigates = launchPage.getInvestigateLocator(j);
                actualToInvestigates = value.toString();
                await expect(expectedToInvestigates).toHaveText(actualToInvestigates);
            }
            else {
                expectedToInvestigates = mapForFilteredToInvestigateCount.get(key);
                actualToInvestigates = 0;
                expect(expectedToInvestigates).toBe(actualToInvestigates);
            }
            j++;
        }
    });
});