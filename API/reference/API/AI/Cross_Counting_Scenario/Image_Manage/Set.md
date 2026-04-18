# Set

## Function

This API is used to set AI > Cross Counting Scenario > Image Manage configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| operate | "GetImageList"，"GetImageData"， "AddImage"，"DeleteImage" | string | Operation type: Get picture list Get pictures (only one can be obtained at a time) Add pictures Delete pictures |

| image_name |   | string | The name of the picture that needs to be added/obtained |

| image_data | "base64(imgData)" 2 * 1024 *1024 | string | The picture to be added supports JPG, PNG, BMP |

| image_list |   | array | Delete image name list |

Sample 1:

POST /API/AI/Scenario/CC/Config/ImageManage HTTP/1.1

{
    "version": "1.0",
    "data": {
        "operate": "GetImageList"
    }
}

Sample 2:

POST /API/AI/Scenario/CC/Config/ImageManage HTTP/1.1

{
    "result": "success",
    "data": {
        "operate": "AddImage",
        "image_name": "eeeeee.jpg",
        "image_data": " base64(imgData)"
    }
}

Sample 3:

POST /API/AI/Scenario/CC/Config/ImageManage HTTP/1.1

{
    "version": "1.0",
    "data": {
        "operate": "DeleteImage",
        "image_list": [
            "c278.png",
            "c236.png",
            "c263.png"
        ]
    }
}

Sample 4:

POST /API/AI/Scenario/CC/Config/ImageManage HTTP/1.1

{
    "version": "1.0",
    "data": {
        "operate": "GetImageData",
        "image_name": "c70.png"
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| max_count |   | int | The maximum number of images supported |

| image_name |   | string | The name of the picture, which will be returned after the picture is successfully obtained |

| image_data | "base64(imgData)" | string | Get image data |

| image_list |   | array | Get the list of image names |

Sample 1:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "max_count": 16,
        "image_list": [
            "c278.png",
            "c236.png",
            "c263.png"
        ]
    }
}

Sample 2:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

Sample 3:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "c278.png": "Delete success!",
        "c236.png": "Delete success!",
        "c263.png": "Delete success!"
    }
}

Sample 4:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "image_name": "c70.png",
        "image_data": " base64(imgData)"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
