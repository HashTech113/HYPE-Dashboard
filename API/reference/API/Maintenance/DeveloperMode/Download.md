# Download

## Function

This API is used to download configuration file.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| x-download-token |   | string |   |

| x-csrftoken |   | string |   |

Sample:

POST /API/Maintenance/DeveloperMode/Download HTTP/1.1

X-csrftoken: 2c6efa5ea9342a52d607e2c17ea2abbeda339a2bb0cc257308fa57121412c9e4
x-download-token: f31b3914b5e4ea99052abf69ad117570

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

## Error Code

See Response Messages Body and Common error_code for more information.
