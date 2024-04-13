import axios from "axios";
import {config, apiEndpoint} from "../constants";

const reqInstance = axios.create({
    headers: config.headers,
});

class ApiLaunchService {
    async getAllLaunches (projectName) {
        const endpoint = `${apiEndpoint}/v1/${projectName}/launch`;
        try {
            return await reqInstance.get(endpoint);
        }
        catch (error) {
            return error.response;
        }
    }

    async createLaunch (projectName, launchData) {
        const endpoint = `${apiEndpoint}/v1/${projectName}/launch`;
        try {
            return await reqInstance.post(endpoint, launchData);
        }
        catch (error) {
            return error.response;
        }
    }

    async deleteLaunchById (projectName, launchId) {
        const endpoint = `${apiEndpoint}/v1/${projectName}/launch/${launchId}`;
        try {
            return await reqInstance.delete(endpoint);
        }
        catch (error) {
            return error.response;
        } 
    }

    //Does not work
    async deleteLaunch (projectName, data) {
        const endpoint = `${apiEndpoint}/v1/${projectName}/launch`;
        try {
            console.log(data);
            return await reqInstance.delete(endpoint, data);
        }
        catch (error) {
            console.log("bbb");
            return error.response;
        } 
    }

    async stopLaunchById (projectName, launchId, launchData) {
        const endpoint = `${apiEndpoint}/v1/${projectName}/launch/${launchId}/stop`;
        try {
            return await reqInstance.put(endpoint, launchData);
        }
        catch (error) {
            return error.response;
        } 
    }
}

export default new ApiLaunchService();