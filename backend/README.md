# codes.laurence.rpv.generated - Kotlin client library for profiles

## Requires

* Kotlin 1.3.41
* Gradle 4.9

## Build

First, create the gradle wrapper script:

```
gradle wrapper
```

Then, run:

```
./gradlew check assemble
```

This runs all tests and packages the library.

## Features/Implementation Notes

* Supports JSON inputs/outputs, File inputs, and Form inputs.
* Supports collection formats for query parameters: csv, tsv, ssv, pipes.
* Some Kotlin and Java types are fully qualified to avoid conflicts with types defined in OpenAPI definitions.
* Implementation of ApiClient is intended to reduce method counts, specifically to benefit Android targets.

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**apiUserIdPut**](docs/DefaultApi.md#apiuseridput) | **PUT** /api/user/{id} | Update a user information
*DefaultApi* | [**apiUserLoginPost**](docs/DefaultApi.md#apiuserloginpost) | **POST** /api/user/login | Login
*DefaultApi* | [**apiUserMeGet**](docs/DefaultApi.md#apiusermeget) | **GET** /api/user/me | 
*DefaultApi* | [**apiUserRegisterPost**](docs/DefaultApi.md#apiuserregisterpost) | **POST** /api/user/register | Register a new user


<a name="documentation-for-models"></a>
## Documentation for Models

 - [codes.laurence.rpv.generated.models.Error](docs/Error.md)
 - [codes.laurence.rpv.generated.models.LoginRequest](docs/LoginRequest.md)
 - [codes.laurence.rpv.generated.models.User](docs/User.md)
 - [codes.laurence.rpv.generated.models.UserLoginResponse](docs/UserLoginResponse.md)
 - [codes.laurence.rpv.generated.models.UserRegister](docs/UserRegister.md)
 - [codes.laurence.rpv.generated.models.UserUpdate](docs/UserUpdate.md)
 - [codes.laurence.rpv.generated.models.ValidationError](docs/ValidationError.md)
 - [codes.laurence.rpv.generated.models.ValidationErrors](docs/ValidationErrors.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearerAuth"></a>
### bearerAuth

- **Type**: HTTP basic authentication

