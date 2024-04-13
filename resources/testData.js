import apiAxiosService from "../business/api/api-axios.service";
import { projectName} from "../business/constants";

async function getTestData() {
    const response = await apiAxiosService.getAllLaunches(projectName.correct);
    return response.data;
}

export const testData = getTestData();