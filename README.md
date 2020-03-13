# Developer Challenge

## Objective

The mobile app team needs your help. They are having a hard time making sure that they always assign a unique build number to each of their mobile app builds.
Your goal is to create a lightweight web service that will help automate the process by deciding what the next build number should be.

A Build Number is represented by an integer and should never be reused on the same mobile app.
- Type: (int) [0..N]
- Eg: 1, 94, 101

Mobile apps are identified by their Bundle Identifier.

- Type: (string)
- General Format: com.[COMPANY].[APP-NAME]
- Eg: com.sagomini.HomeworkChallenge

### Tech Stack

Please use the following libraries/frameworks/tools to solve this challenge.

### Backend
- Express.js
- Node.js
- PM2
- MongoDB

You are welcome to use additional open source projects that are not included in this list.


## Task

Create a REST API to read and increase the build number for a given bundler identifier.
All data should be persisted to a MongoDB databases.

REST API
- /api/read [GET]
    - params: bundle_id (string)
    - return:
        - if bundle_id exists
- build number (int)
        - else
- 4xx
- /api/set [POST]
    - params:
        - bundle_id (string)
        - new_build_number (int)
    - biz logic
        - if bundle_id does not exist:
- create bundle_id
- if new_build_number not set:
    - build_number = 0
- else:
    - build_number = new_build_number
        - If new_build_number > existing_build_number
- existing_build_number = new_build_number
    - return:
        - success: 200
        - else: 4xx
- /api/bump [POST]
    - params: bundle_id (string)
    - biz logic
        - if bundle_id does not exist.
- create and init build_number = 0;
        - build_number++
    - return
        - build_number (int)