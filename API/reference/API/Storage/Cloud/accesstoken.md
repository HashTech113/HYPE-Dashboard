# accesstoken

## Function

This API is used to set parameter for Storage > Cloud page.

## Request Message

See Storage > Cloud > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/action/accesstoken HTTP/1.1

{
    "result": "success",
    "data": {
        "accesstoken": "9cb768de6f3094faab02a6097192793661a844c74a87aa9621289d3e4304c5fb"
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
