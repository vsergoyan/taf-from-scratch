import apiAxiosService from "../business/api/api-axios.service";
import { expect,test } from "@playwright/test";
import { dealingWithLaunchWithInvalidId} from "../resources/launchApiErrors";
import { projectName, statusCode, responseData, resquestBody, launchId } from "../business/constants";

test.describe("Launches page API", () => {
    test("Get All Launches by correct project name", async () => {      
        const responseForCorrectProjectName = await apiAxiosService.getAllLaunches(projectName.correct);
        const actualStatusCode = responseForCorrectProjectName.status;
        const expectedStatusCode = statusCode.success;
        expect(actualStatusCode).toBe(expectedStatusCode);
    });

    test("Get All Launches by incorrect project name", async () => {    
      const responseForIncorrectProjectName = await apiAxiosService.getAllLaunches(projectName.incorrect);
      const actualResponseData = responseForIncorrectProjectName.data;
      const expectedResponseData = responseData.getAllLaunches.forIncorrectProjectName;
      expect(actualResponseData).toStrictEqual(expectedResponseData);
    });

    test("Create Launch by correct project name", async () => {   
        const responseForCorrectData = await apiAxiosService.createLaunch(projectName.correct, resquestBody.forCreatingLaunch);
        const actualStatusCode = responseForCorrectData.status;
        const expectedStatusCode = statusCode.createSuccess;
        expect(actualStatusCode).toBe(expectedStatusCode);
    });

    test("Create Launch by incorrect project name", async () => {  
      const responseForInorrectProjectName = await apiAxiosService.createLaunch(projectName.incorrect, resquestBody.forCreatingLaunch);
      const actualResponseData = responseForInorrectProjectName.data;
      const expectedResponseData = responseData.createLaunch.forIncorrectProjectName;
      expect(actualResponseData).toStrictEqual(expectedResponseData);
    });

    test("Stop launch by correct Id and project name", async () => {
        const responseForCorrectData = await apiAxiosService.stopLaunchById(projectName.correct, launchId.toStop, resquestBody.forStoppingLaunch);
        const actualStatusCode = responseForCorrectData.status;
        const expectedStatusCode = statusCode.success;
        expect(actualStatusCode).toBe(expectedStatusCode);
    });

    test("Stop launch by incorrect project name", async () => {
      const responseForIncorrectProjectName = await apiAxiosService.stopLaunchById(projectName.incorrect, launchId.toStop, resquestBody.forStoppingLaunch);
      const actualResponseData = responseForIncorrectProjectName.data;
      const expectedResponseData = responseData.stopLaunch.forIncorrectProjectName;
      expect(actualResponseData).toStrictEqual(expectedResponseData);
    });

    test("Stop launch by incorrect Id", async () => {
      const responseForInvalidLaunchId = await apiAxiosService.stopLaunchById(projectName.correct, launchId.incorrect, resquestBody.forStoppingLaunch);
      const actualResponseData = responseForInvalidLaunchId.data;
      const expectedResponseData = dealingWithLaunchWithInvalidId(launchId.incorrect);
      expect(actualResponseData).toStrictEqual(expectedResponseData);
    });

    test("Delete Launch by correct Id and project name", async () => {      
        const responseForCorrectData = await apiAxiosService.deleteLaunchById(projectName.correct, launchId.toDelete);
        const actualStatusCode = responseForCorrectData.status;
        const expectedStatusCode = statusCode.success;
        expect(actualStatusCode).toBe(expectedStatusCode);     
    });

    test("Delete Launch by incorrect Id", async () => {
      const responseForIncorrectId = await apiAxiosService.deleteLaunchById(projectName.correct, launchId.incorrect);
      const actualResponseData = responseForIncorrectId.data;
      const expectedResponseData = dealingWithLaunchWithInvalidId(launchId.incorrect);
      expect(actualResponseData).toStrictEqual(expectedResponseData); 
    });

    test("Delete Launch by incorrect project name", async () => {
      const responseForIncorrectProjectName = await apiAxiosService.deleteLaunchById(projectName.incorrect, launchId.toDelete);
      const actualResponseData = responseForIncorrectProjectName.data;
      const expectedResponseData = responseData.deleteLaunch.forIncorrectProjectName;
      expect(actualResponseData).toStrictEqual(expectedResponseData);     
    });

    test("Create, stop and delete launch", async () => {    
        const responseForCreating = await apiAxiosService.createLaunch(projectName.correct, resquestBody.forCreatingLaunch);
        expect(responseForCreating.status).toBe(statusCode.createSuccess);

        let testData = await apiAxiosService.getAllLaunches(projectName.correct);
        expect(testData.status).toBe(statusCode.success);
        testData = testData.data;
        let launchIdtoStop = testData.content[testData.content.length - 1].id;
        const responseForStopping = await apiAxiosService.stopLaunchById(projectName.correct, launchIdtoStop, resquestBody.forStoppingLaunch);
        expect(responseForStopping.status).toBe(statusCode.success);

        const responseForDeletting = await apiAxiosService.deleteLaunchById(projectName.correct, launchIdtoStop);
        expect(responseForDeletting.status).toBe(statusCode.success);
    });

    //It does not work, but it must work
    // test("Delete All launches", async() => {
    //     let testData = await apiAxiosService.getAllLaunches("vsergoyan_personal");
    //     testData = testData.data;
    //     let ids = [];
    //     for(let i = 0; i < testData.content.length; i++) {
    //         ids.push(testData.content[i].id);
    //     }
    //     // console.log(ids);
    //     const response = await apiAxiosService.deleteLaunch("vsergoyan_personal", {
    //             "ids": [
    //                 7196523, 7196525
    //             ]
    //           });
    //     // const response = await apiAxiosService.deleteLaunch("vsergoyan_personal", {
    //     //     "ids": ids
    //     // });
    //     // console.log(response.data);
    //     expect(response.status).toBe(200);
    // }) 
  });