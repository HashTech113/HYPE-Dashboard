# Login

## Function

This API is used for login functionality. The client uses digest authentication to login; when the login is successful, in the http header, two fields are returned, Set-cookie and X-csrftoken;such as:

Set-Cookie: session=54f47bdcec65156e41b51d945bdcb4b6a9c77fae237b1c40d74c08db4a5eeb8f;HttpOnly;path=/
X-csrftoken: 93e2a23d518767b646ffd9a58b24b48665923ed797dbbb6b1e9760ebb9335b14

After the client login, when accessing static files, you need to bring cookie in the http header;such as:

   Cookie: session=54f47bdcec65156e41b51d945bdcb4b6a9c77fae237b1c40d74c08db4a5eeb8f；

When accessing the API, you also need to include the X-csrftoken field in the http header;such as:

   X-csrftoken: 93e2a23d518767b646ffd9a58b24b48665923ed797dbbb6b1e9760ebb9335b14.

After successful login, the server maintains the session response, which is 5 minutes by default and can be configured. When the client accesses the server with a session, the server refreshes the session expiration time.
The digest authentication algorithm currently uses rfc2617, and will be modified to rfc7616 in the future, and is compatible with rfc2617
See Table 2 for the return of successful login (NVR, DVR, IPC are not implemented temporarily)

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| oem_type |   | int | Login isolation flag, corresponding to the value passed by the customer:114(B09)、144(B14)、148(B25)、298(B07)、221(B07)、309(B52-1)、310(B52)、313(B52-1\B52) |

Sample:

POST /API/Web/Login HTTP/1.1

{
    "version": "1.0",
    "data": {
        "oem_type": 114
    }
}

## Response Message

### Parameter Description (NVR, DVR, IPC are not implemented temporarily)

##### Table 2(login success)

| Parameter | Range | Type | Description |

| last_login_time | Max_length:64 | string | Last successful login time (time stamp). |

| last_login_ip | Max_length: 64 | string | IP address of the last successful login. |

| fail_login_count |   | int | The number of failed logins since the last successful login. |

| pwd_remain_time |   | int | The number of days remaining on the password (IPC defaults to 90 days). |

##### Table 3(login failed)

| Parameter | Range | Type | Description |

| block_remain_time |   | int | Indicates the time when there are too many login errors and the system will be locked. |

Please refer to error-code for login failure error code.

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
    }
}

## Error Code

##### Table 4

| error_code | COMMENT |

| no_permission | No remote login permission |

| login_failed_or_block | locked after five or more failed logins |

| black_ip | This IP is set as blacklist |

| verify_failed | Wrong username or password within five times - login failed |

| device_reboot | The system is rebooting |

See Response Messages Body and Common error_code for more information.
