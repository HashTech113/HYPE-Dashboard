# Modify

## Function

This API is used to modify the license plate.

## Request Message

Table 1

See AI > Recognition > License Plate > Add > Parameter Description > Table 1 for parameter description.

Sample:

POST API/AI/Plates/Modify HTTP/1.1

{
    "version":"1.0",
    "data": {
        "PlateInfo": [
            {
                "Id": "粤CW2763",
                "GrpId": 6,
                "PlateColor": 1,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "两厢车",
                "Owner": "张三三",
                "IdCode": "12125180",
                "Job": "职业",
                "Phone": "15271859302",
                "Domicile": "居住地1",
                "Remark": "备注",
                "EnableChnAlarm": []
            },
            {
                "Id": "粤CK3961",
                "GrpId": 6,
                "PlateColor": 2,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "三厢车",
                "Owner": "李四四",
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
