# Overview

## Transmission Mechanism

The HTTP API transaction starts from a request from a client application. The web server on the IP media devices processes the request and sends the response back to the client application. The HTTP request is taken in POST or Get method form as described in the following paragraphs. If the request is successful, the IP media video device will return a HTTP header contains 200 OK. The HTTP Body will contain actual result or error message by JSON format if an error occurs.

## JSON

A device must support the syntax defined by RFC7159 and UTF-8 character set . All Json files must adopt UTF-8 encoding according to RFC3629

## URL

The URL scheme is used to locate device resources via a specific protocol in the network.
This section defines the syntax and semantics for http(s) URLs.

<protocol>://<host>[:port][/fixed string]</cmd name>

protocol: URL scheme for the particular request. The HTTP protocol is allowed in this specification.

host: The host field refers to the hostname, IP address, or the Fully Qualified Domain
Name of an IP device.

port: The port field refers to the port number of that host on which the identified resource is
located at the IP device listening for TCP connections. If the port is empty or not given, the defaultport is assumed. For HTTP, the default port is 80. For HTTPS the default port is 443.

fixed string: Fixed string, usually use “API”.

cmd name:The specific command to an IP device.

## HTTP Header Field

Requests from the video management system or the client application are packed in HTTPmessages. A request message composed of three parts: the connection header field, the authorization header field, and the entity body field. HTTP/1.1 is implemented and utilized according to RFC 2616 in the IP devices. For a video management system or client application that uses persistentconnection for multiple transactions, it is required to implement “Connection: Keep-Alive” HTTP header field, while also adopt the “Connection: close” HTTP header field for the last transaction of the persistent connection.

When a video management system or client application sends any request to the device, it must be authenticated by means of Basic Access or Digest AccessAuthorization according to RFC 2617, and thus all the devices are required to support Basic Access or Digest Access. Authorization header field is sent along with each request, and if a user is authenticated, the request will follow the normal execution flow. If client HTTP request is with no authentication credentials, unauthorized HTTP response (401) will be returned with WWW-Authenticate header field.

The Content-Type entity-header field indicates the media type of the entity body. The Content-Type may be designated as “application/json; charset=’UTF-8’”, “application/octet-stream”, etc. For configuration information, the Content-Type is usually “application/json; charset=’UTF-8’”.

If there is a JSON block for the HTTP request or response, the Content-Type and Content-Length will be set in the headers of the HTTP message.

The Content-Type is usually "application / json; character set = "UTF-8'". The request uses the POST method, the body is in JSON format, and contains at least one version number field.

For example:

HTTP Request with message body:

Except for the first few requests before logging in, which do not need authentication, other requests need to carry the Cookie and X-csrftoken returned by login in the HTTP header for authentication. See API > Login > Web > Login for login methods.

The format for accessing the API is as follows, where the requested data and returned data are both in the "data". "version" is the API version number. As it is a reserved key and is not actually used, the value is temporarily fixed as "1.0". When the server returns data, it will also return error code and error reason if there is any error.

POST/API/SystemInfo/Base/Get HTTP/1.1
Content-Type: application/json
X-csrftoken: 14559384d58d55d9d80bf4baf048684f366c77905d665d99ba1bde2cdcf81b08
Cookie: session=cc3ec99c6f1295489c86f8842e1dd719c194c637af5b965a23932c41188a3acc
Content-Length: 1234

{
    "version": "x.x"
    "data": {
    }
}

If you only need to access a few APIs, you can access them with digest authentication. Examples are as follows：

POST/API/SystemInfo/Base/Get HTTP/1.1
Authorization: Digest username="admin",realm="RS realm",nonce="d7357432-26b6-49d7-bc31-cd2c690fd115",uri="/action/getConfig/Camera",cnonce="dedb934132796d7066c7cb59068e3487",nc=00000001,response="de8918839a8fa301bf6badf2967965c8",qop="auth"
Content-Type: application/json
Content-Length: 1234,
{
    "version": "x.x"
    "data": {
    }
}

## Response Messages Body

The response message from the IP device is a standard HTTP response, information can be
included in the entity body field in JSON format. This information includes the result to a request
message, or the detailed parameters that required by a request message.

A successful response that don’t includes any parameters is as follows:

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 40

{
    "result": "success",
    "data" : {
    }
}

When there is an error in the request result, the format of the return message is as follows. "reason" contains a detailed error reason, and the "error_code" is error code. For specific error codes, please refer to Common error code.

HTTP/1.1 400 OK
Content-Type: application/json
Content-Length: 40

{
    "result": "failed",
    "reason": "xxxxxxxx",
    "error_code": "user_blocked",
    "data": {
    }
}

A part of channel failed response that is as follows:

HTTP/1.1 400 OK
Content-Type: application/json
Content-Length: 40

{
    "version": "x.x",
    "error_code": "part_failed",
    "reason":"xxxxxxxx",
    "ch_error_code": [{
        "error_code":"no_support",
        "channel":" IP_CH1"
    }],
    "data": {
    }
}

The information returned along with the error code "cloud_video_upload_chn_limit":

{
    "result": "failed",
    "reason": "Save parameter failed",
    "error_code": "cloud_video_upload_chn_limit",
    "data": {
        "cloud_video_is_used": [
            "CH1",
            "CH3"
        ],
        "max_cloud_video_upload_num": 2
    }
}

Examples of mutual exclusion between different types of intelligence：

{
    "result": "failed",
    "channel_max": 1,
    "error_code": "part_failed",
    "ch_error_code": [
        {
            "channel": "CH1",
            "error_code": "illegal_operation",
            "reason": "Illegal Operation, aganist the intelligent mutual exclusion !",
            "mutual_array": [
                "PID",
                "LCD"
            ]
        }
    ],
    "data": {}
}

Examples of mutual exclusion between different types of server：

{
    "result": "failed",
    "error_code": "server_mutually",
    "reason": "The server is mutually exclusive !",
    "mutual_array": [
        "DROPBOX",
        "Google Drive"
    ],
    "data": {}
}

## Command Categories

This specification is divided into different command categories. Thefollowing command is defined:

| Command | Description |

| System | Configure and operate the general system functions. |

| Network | Configure network interfaces and parameters |

| Channel | Configure channel parameters |

| Stream | Configure and control the streaming media content |

| Alarm | Configure and control alarm functions and parameter |

| Storage | Configure device storage |

| Schedules | Configure schedules |

| Record | Configure and control record functions and parameter |

| Maintenance | Configure maintenanceinformation |

## Error Code

As with any other protocol, errors may occur during communications, protocol or message processing. Errors may contain header value or be received in a not expected or experience a socket timeout. To indicate and interpret protocol error, HTTP protocol has defined a set of standard status codes. According to this specification, the IP devices will use appropriate HTTP protocol defined status codes for error reporting and when received handle accordingly.

| Error Code | Description |

| 200 | The request has succeeded. |

| 400 | The request was badly formed. This is commonly used for creating or updating a resource, but the data was incomplete or incorrect. |

| 401 | The request requires user authentication to access this resource. If the request contains invalid authentication data, this code is sent. |

| 403 | The request is not allowed because the server is refusing to fill the request. |

| 404 | The requested resource does not exist. |

| 500 | An internal server error has occurred. |

| 501 | The requested is not implemented. |

## Abbreviations

For the purposes of the present document, the following abbreviations apply:

| Abbreviations | Description |

| IPC | IP Camera |

| NVR | Network Video Recorder |

| CH | Analog channel/Digital channel |

| IP_CH | Digital channel |

| WIFI_CH | Wireless channel |
