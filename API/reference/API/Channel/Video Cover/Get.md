# Get

## Function

This API is used to get Channel > Video Cover page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/VideoCover/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> Video Cover > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"privacy_zone_enable": false,
				"zone_info": [
					{
						"zone_no": 1,
						"zone_enable": false,
						"rect": {
							"left": 60,
							"top": 376,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 2,
						"zone_enable": false,
						"rect": {
							"left": 220,
							"top": 376,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 3,
						"zone_enable": false,
						"rect": {
							"left": 380,
							"top": 376,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 4,
						"zone_enable": false,
						"rect": {
							"left": 540,
							"top": 376,
							"width": 100,
							"height": 100
						}
					}
				]
			},
			"CH2": {
				"status": "Offline"
			},
			"CH3": {
				"status": "Offline"
			},
			"CH4": {
				"status": "Offline"
			},
			"CH5": {
				"zone_info": [
					{
						"zone_no": 1,
						"zone_enable": false,
						"rect": {
							"left": 100,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 2,
						"zone_enable": false,
						"rect": {
							"left": 250,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 3,
						"zone_enable": false,
						"rect": {
							"left": 400,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 4,
						"zone_enable": false,
						"rect": {
							"left": 550,
							"top": 100,
							"width": 100,
							"height": 100
						}
					}
				]
			},
			"CH6": {
				"status": "Offline"
			},
			"CH7": {
				"status": "Offline"
			},
			"CH8": {
				"status": "Offline"
			},
			"CH9": {
				"status": "Offline"
			},
			"CH10": {
				"status": "Offline"
			},
			"CH11": {
				"status": "Offline"
			},
			"CH12": {
				"status": "Offline"
			},
			"CH13": {
				"status": "Offline"
			},
			"CH14": {
				"privacy_zone_enable": false,
				"zone_info": [
					{
						"zone_no": 1,
						"zone_enable": false,
						"rect": {
							"left": 60,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 2,
						"zone_enable": false,
						"rect": {
							"left": 220,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 3,
						"zone_enable": false,
						"rect": {
							"left": 380,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 4,
						"zone_enable": false,
						"rect": {
							"left": 540,
							"top": 100,
							"width": 100,
							"height": 100
						}
					}
				]
			},
			"CH15": {
				"privacy_zone_enable": false,
				"zone_info": [
					{
						"zone_no": 1,
						"zone_enable": false,
						"rect": {
							"left": 60,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 2,
						"zone_enable": false,
						"rect": {
							"left": 220,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 3,
						"zone_enable": false,
						"rect": {
							"left": 380,
							"top": 100,
							"width": 100,
							"height": 100
						}
					},
					{
						"zone_no": 4,
						"zone_enable": false,
						"rect": {
							"left": 540,
							"top": 100,
							"width": 100,
							"height": 100
						}
					}
				]
			},
			"CH16": {
				"status": "Offline"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
