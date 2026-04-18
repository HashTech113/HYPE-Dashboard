# GetById

## Function

This API is used to obtain license plate information by license plate id.

## Request Message

## Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null| | |

|PlatesId| |string array|List of license plate numbers for details|

Sample:

POST API/AI/AddedPlates/GetById HTTP/1.1

{
    "version":"1.0",
    "data": {
        "PlatesId": [
            "粤CW2763",
            "粤CK3961"
        ]
    }
}

## Response Message

See AI > Recognition > Database license plate information query > GetCount > Response Message > Table 3 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Result": 0,
        "Count": 2,
        "PlateInfo": [
            {
                "Id": "粤CW2763",
                "GrpId": 1,
                "PlateColor": 0,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "两厢车",
                "Owner": "张三",
                "IdCode": "12125180",
                "Job": "职业",
                "Phone": "15271859302",
                "Domicile": "居住地1",
                "Remark": "备注",
                "EnableChnAlarm": []
            },
            {
                "Id": "粤CK3961",
                "GrpId": 1,
                "PlateColor": 1,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "三厢车",
                "Owner": "李四",
                "IdCode": "12125181",
                "Job": "职业",
                "Phone": "15271859303",
                "Domicile": "居住地2",
                "Remark": "备注",
                "EnableChnAlarm": []
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
