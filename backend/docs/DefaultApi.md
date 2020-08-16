# DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUserIdPut**](DefaultApi.md#apiUserIdPut) | **PUT** /api/user/{id} | Update a user information
[**apiUserLoginPost**](DefaultApi.md#apiUserLoginPost) | **POST** /api/user/login | Login
[**apiUserMeGet**](DefaultApi.md#apiUserMeGet) | **GET** /api/user/me | 
[**apiUserRegisterPost**](DefaultApi.md#apiUserRegisterPost) | **POST** /api/user/register | Register a new user


<a name="apiUserIdPut"></a>
# **apiUserIdPut**
> User apiUserIdPut(id, userUpdate)

Update a user information

### Example
```kotlin
// Import classes:
//import codes.laurence.rpv.generated.infrastructure.*
//import codes.laurence.rpv.generated.models.*

val apiInstance = DefaultApi()
val id : kotlin.String = id_example // kotlin.String | ID of the user to update
val userUpdate : UserUpdate =  // UserUpdate | 
try {
    val result : User = apiInstance.apiUserIdPut(id, userUpdate)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#apiUserIdPut")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#apiUserIdPut")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **kotlin.String**| ID of the user to update |
 **userUpdate** | [**UserUpdate**](UserUpdate.md)|  |

### Return type

[**User**](User.md)

### Authorization


Configure bearerAuth:
    ApiClient.accessToken = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="apiUserLoginPost"></a>
# **apiUserLoginPost**
> UserLoginResponse apiUserLoginPost(loginRequest)

Login

### Example
```kotlin
// Import classes:
//import codes.laurence.rpv.generated.infrastructure.*
//import codes.laurence.rpv.generated.models.*

val apiInstance = DefaultApi()
val loginRequest : LoginRequest =  // LoginRequest | 
try {
    val result : UserLoginResponse = apiInstance.apiUserLoginPost(loginRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#apiUserLoginPost")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#apiUserLoginPost")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **loginRequest** | [**LoginRequest**](LoginRequest.md)|  |

### Return type

[**UserLoginResponse**](UserLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="apiUserMeGet"></a>
# **apiUserMeGet**
> User apiUserMeGet()



Retrieve the user data for provided token

### Example
```kotlin
// Import classes:
//import codes.laurence.rpv.generated.infrastructure.*
//import codes.laurence.rpv.generated.models.*

val apiInstance = DefaultApi()
try {
    val result : User = apiInstance.apiUserMeGet()
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#apiUserMeGet")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#apiUserMeGet")
    e.printStackTrace()
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization


Configure bearerAuth:
    ApiClient.accessToken = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="apiUserRegisterPost"></a>
# **apiUserRegisterPost**
> UserLoginResponse apiUserRegisterPost(userRegister)

Register a new user

### Example
```kotlin
// Import classes:
//import codes.laurence.rpv.generated.infrastructure.*
//import codes.laurence.rpv.generated.models.*

val apiInstance = DefaultApi()
val userRegister : UserRegister =  // UserRegister | 
try {
    val result : UserLoginResponse = apiInstance.apiUserRegisterPost(userRegister)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#apiUserRegisterPost")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#apiUserRegisterPost")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userRegister** | [**UserRegister**](UserRegister.md)|  |

### Return type

[**UserLoginResponse**](UserLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

