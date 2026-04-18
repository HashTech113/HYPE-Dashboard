# GetId

## Function

This API is used to get license plate id.

## Request Message

See AI > Recognition > Database license plate information query > GetCount > Parameter Description > Table 1 for parameter description.

Sample:

POST API/AI/AddedPlates/GetId HTTP/1.1

(1) Fuzzy query

{
    "version":"1.0",
	"data": {
        "PlateInfo": [
            {
                "Id": "粤CW"
            }
        ]
	}
}

(2) Acquired according to the group Id list

{
    "version":"1.0",
	"data": {
        "GrpId": [1, 2, 6]
	}
}

## Response Message

See AI > Recognition > Database license plate information query > GetCount > Response Message > Table 3 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

(1) Fuzzy query

{
    "data": {
        "Result": 0,
        "Count": 1,
        "PlatesId": [
            "粤CW2763"
        ]
    }
}

(2) Acquired according to the group Id list

{
    "data": {
        "Result": 0,
        "Count": 2,
        "PlatesId": [
            "粤CW2763",
            "粤CK3961"
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
