# Remove

## Function

This API is used to remove license plate.

## Request Message

Table 1

See AI > Recognition > License Plate > Change > Parameter Description > Table 1 for parameter description.

Sample:

POST API/AI/Plates/Remove HTTP/1.1

{
    "version":"1.0",
    "data": {
        "PlateInfo": [
            {
                "Id": "粤CW2763"
            },
            {
                "Id": "粤CK3961"
            }
		]
    }
}

## Response Message

See AI > Recognition > License Plate > Add > Response Message > Table 3 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Count": 2,
        "Result": [
            0,
            0
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
