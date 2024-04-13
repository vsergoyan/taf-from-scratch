import * as dotenv  from "dotenv";

dotenv.config();


export const userInfo = {
    "valid": {
        "username": process.env.rpUsername,
        "password": process.env.rpPassword,
    },
    "invalid": {
        "username": "wrong",
        "password": "wrong",
    }
};

export const message = {
    "loginSuccess" : "Signed in successfully",
    "loginFail" : "An error occurred while connecting to server: You do not have enough permissions. Bad credentials",
};

const token = process.env.API_TOKEN;
export const apiEndpoint = process.env.API_ENDPOINT;

export const config = {
    headers: {
        Authorization: `bearer ${token}`,
    }
};

export const projectName = {
    correct: "vsergoyan_personal",
    incorrect: "aaaaaaaaaaaa",
};

export const statusCode = {
    success: 200,
    createSuccess: 201,
    error: 404,
};

export function dealingWithLaunchWithInvalidId(id) {
    return {
        "errorCode": 4041,
        "message": `Launch '${id}' not found. Did you use correct Launch ID?`
      }
}

export const responseData = {
    getAllLaunches : {
        forIncorrectProjectName: {
            "errorCode": 4003,
            "message": "You do not have enough permissions. Please check the list of your available projects."
        },
    },
    createLaunch: {
        forIncorrectProjectName: {
            "errorCode": 4003,
            "message": "You do not have enough permissions."
        },
    },
    stopLaunch: {
        forIncorrectProjectName: {
            "errorCode": 4003,
            "message": "You do not have enough permissions."
        },
    },
    deleteLaunch: {
        forIncorrectProjectName: {
            "errorCode": 4003,
            "message": "You do not have enough permissions."
          }
    },
};

export const resquestBody = {
    forCreatingLaunch: {
        "attributes": [
          {
            "key": "build",
            "system": false,
            "value": "demo"
          }
        ],
        "description": "### **Demonstration launch.**\nA typical *Launch structure* comprises the following elements: Suite > Test > Step > Log.\nLaunch contains *randomly* generated `suites`, `tests`, `steps` with:\n* random issues and statuses,\n* logs,\n* attachments with different formats.",
        "mode": "DEFAULT",
        "name": "Demo Api Tests",
        //this rerun means that this launch will replace the launch with specified rerunOf
        "rerun": false,
        // "rerunOf": "8dc92e81-c479-4c4c-86cc-caff07c9fddb",
        "startTime": new Date().toISOString(),
    },
    forStoppingLaunch: {
        "attributes": [
          {
            "key": "build",
            "system": false,
            "value": "demo"
          }
        ],
        "description": "### **Demonstration launch.**\nA typical *Launch structure* comprises the following elements: Suite > Test > Step > Log.\nLaunch contains *randomly* generated `suites`, `tests`, `steps` with:\n* random issues and statuses,\n* logs,\n* attachments with different formats.",
        "endTime": new Date().toISOString(),
        "status": "PASSED"
    }
};

export const launchId = {
    incorrect: 6000000, 
    toStop: 7231101,
    toDelete: 7205283,
};