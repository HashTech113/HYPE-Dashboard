# Snaped License Plates Search and Match

## Function

This API is used to  search and match license plates.

## URI

POST /API/AI/SnapedObjects/{Action}

Note:

License plate retrieval is a subtype of Snaped Object. After the search is completed, subsequent operations share the API with Snaped Object. For the following APIs, please refer to Chapter 17.2.8:

POST /API/AI/SnapedObjects/GetByIndex

POST /API/AI/SnapedObjects/GetById

POST /API/AI/SnapedObjects/StopSearch

Table 1 describes the parameters.

## Parameter Description

Table 1

| Parameter | Required | Description |

| Action | YES | Request action, including SearchPlate。 |
