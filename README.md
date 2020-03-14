# Bundler Identifier API

**Summary**

A lightweight API that will help automate the process by deciding what the next build number should be.

**Description**

A REST API to read and increase the build number for a given bundler identifier.
All data are persisted to a MongoDB databases.

## Installation

```
$ yarn install
```

## Basic use

1. **Build scripts**
   ```
   yarn build
   ```
2. **Run**
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

## API

This API contains 3 main endpoints:

| Endpoint  | Method | Query input parameters      | return |
| :-------- | :----- | :-------------------------- | ------ |
| /api/read | GET    | bundle_id                   | object |
| /api/set  | POST   | bundle_id; new_build_number | object |
| /api/bump | POST   | bundle_id                   | object |

A Build Number is represented by an integer and should never be reused on the same mobile app.

- Type: (int) [0..N]
- Eg: 1, 94, 101

Mobile apps are identified by their Bundle Identifier.

- Type: (string)
- General Format: com.[COMPANY].[APP-NAME]
- Eg: com.sagomini.HomeworkChallenge
  

all endpoints will return the bundle object:

| field name  | type   |
| :---------- | :----- |
| bundleId    | string |
| buildNumber | string |
| createdAt   | string |
| updatedAt   | string |

### Reading Bundles IDs */api/read*

This endpoint will receive a bundle identifier as a query parameter and will return the corresponding object containing its current build number.

If the bundle does not exists, the api will return a `204 No content` status.

**parameters**

| Query parameters |  type  | required | default |
| :--------------- | :----: | :------: | :-----: |
| bundle_id        | string |   true   |         |

**example**:

```
URL: /api/read?bundle_id=com.sagomini.HomeworkChallenge
Content-Type: application/json; charset=utf-8
Method: GET

```

```
{
  "bundleId":"com.sagomini.homeworkchallenge",
  "buildNumber":3,
  "createdAt":"2020-03-12T20:12:25.628Z",
  "updatedAt":"2020-03-12T20:21:44.212Z"
}
```

### Setting Bundles */api/set*

This endpoint will define a build number for an existing bundle.
If the bundle id does not exist, it will be created with the specified `new_build_number`.

> *It is not possible to set a value lower than the current number.

**parameters**

| Query parameters |  type  | required | default |
| :--------------- | :----: | :------: | :-----: |
| bundle_id        | string |   true   |         |
| new_build_number | string |  false   |    0    |

**example**:

```
URL: /api/set?bundle_id=com.sagomini.HomeworkChallenge&new_build_number=5
Content-Type: application/json; charset=utf-8
Method: POST

```

```
{
  "bundleId":"com.sagomini.homeworkchallenge",
  "buildNumber":5,
  "createdAt":"2020-03-12T20:12:25.628Z",
  "updatedAt":"2020-03-12T20:21:44.212Z"
}
```

### Bump builds */api/bump*

This endpoint will bump a +1 into the build number
If the bundle id does not exist, it will be created starting with 0.

**parameters**

| Query parameters |  type  | required | default |
| :--------------- | :----: | :------: | :-----: |
| bundle_id        | string |   true   |         |

**example**:

```
URL: /api/bump?bundle_id=com.sagomini.HomeworkChallenge
Content-Type: application/json; charset=utf-8
Method: POST

```

```
{
  "bundleId":"com.sagomini.homeworkchallenge",
  "buildNumber":6,
  "createdAt":"2020-03-12T20:12:25.628Z",
  "updatedAt":"2020-03-12T20:21:44.212Z"
}
```

## Tests

```
yarn test
```

```
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
