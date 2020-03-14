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

## Server

### PM2 Scripts:

1. Build scripts
   ```
   yarn build
   ```
2. Run
   - `yarn start`: Run as a node service
   - `yarn server`: Start PM2 Process
   - `yarn stop`: Stop PM2 Process
   - `monitor`: Monitor processes running
   - `yarn kill`: Kill PM2

### Environment variables:

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/bundler_identifier_db_dev?maxPoolSize=100&retryWrites=false
LOG_LEVEL=silly
```

### API

| Endpoint  | Query parameters            |
| :-------- | :-------------------------- |
| /api/read | bundle_id                   |
| /api/set  | bundle_id; new_build_number |
| /api/bump | bundle_id                   |


| Parameter        | type    | default   |
| :--------------- | :------ | --------- |
| bundle_id        | string  | undefined |
| new_build_number | integer | 0         |


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
- build number (int) - else
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
- create and init build_number = 0; - build_number++
  - return
    - build_number (int)

## Tests:

```
$ yarn test

  Status endpoint
    ✓ check API status (28ms)
  /set endpoint
    ✓ Should not update a smaller build number for an existing bundle ID (5ms)
    ✓ Should update a build number for an existing bundle ID (11ms)
    If bundle id doesn't exists
      ✓ Should create new Bundle ID with build number = 0 (34ms)
      ✓ Should create new Bundle ID with new build number (8ms)
  /bump endpoint
    ✓ Should bump an existing bundle ID (i++) (5ms)
    If bundle id doesn't exists
      ✓ Should create new Bundle ID with build number = 0 (6ms)
  /read endpoint
    ✓ Should return data when look for bundle existing Bundle ID (4ms)
    ✓ Should return No Content for not found bundle id (3ms)
    ✓ Should deny invalid input (3ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        6.138s

```
