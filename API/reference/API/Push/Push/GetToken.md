# GetToken

## Function

This API is used to obtain Token when pushing.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| Token |   | string |   |

Sample:

POST /API/Push/GetToken HTTP/1.1

{
    "version": "1.0",
    "data": {
        "Token":"f06214c1d9348dee11a513213c9a38d0b62c9ffd32d1c1b6f6485117d1f187b9"
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| AccessToken |   | string |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
            "AccessToken": "eyJhbGciOiJFUzI1NiIsImtpZCI6InJzdHM4Mjg1NWI4MmNmNDk0YWM5OWNiZGM4OTQ2YTQ0YWYxNyJ9.eyJhdWQiOlsicHNfZGVsIl0sIlgtc3ViIjp7IlRva2VuIjoiZjA2MjE0YzFkOTM0OGRlZTExYTUxMzIxM2M5YTM4ZDBiNjJjOWZmZDMyZDFjMWI2ZjY0ODUxMTdkMWYxODdiOSIsIlVVSUQiOiI2ZTMzMjJjMy01MjFmLTQ0OWItYjk0Yy00MjE5ZGJiOTIwMmMifX0.ec_DrzO6AYidvJytmKADN9iW4sy3LqHBMJj9QEVaySquqlby43Oe5UvtqrU0y0t6o8cno6ypX9v4vzp5QGRbZw"
        }
}

## Error Code

See Response Messages Body and Common error_code for more information.
