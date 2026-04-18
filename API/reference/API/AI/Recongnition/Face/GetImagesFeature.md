# GetImagesFeature

## Function

This API is used to get image feature values. AI > Recognition > Faces

## Request Message

### Parameter Description

Table 7
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Images||string array|Image data encoded in Base64|

Sample:

POST /API/AI/Faces/Modify HTTP/1.1

{
    "data": {
        "Images": "base64(imgData)"
    }
}

## Response Message

## Parameter Description

Table 8
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|FeatureVersion||int|Version of the eigenvalue|
|Features||string array|Get eigenvalue data|
|Results||int array|The result of eigenvalue operation is obtained|

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    {
    "FeatureVersion": 0,
    "Features": "base64(feature)",
    "Results": [0,0]
}
}

## Error Code

See Response Messages Body and Common error_code for more information.
