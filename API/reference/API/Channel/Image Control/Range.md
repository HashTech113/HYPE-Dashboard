# Range

## Function

This API is used to get parameter range for Channel > Image Control page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Default , Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ImageControl/Range HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON Object | Channel Information JSON show as follow Table 3 |

| channel_max |   | int | Maximum number of channels. |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| status | "Offline", "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online. |

| support_default |   | bool | Whether to restore the default value. |

| camera_param_mode | “Daylight” “Night” | string | Supports only night and day. |

| image_setting | "FullColorMode", "DayNightMode", "Schedule" | string | Mode selection under new full color logic. |

| FullColorMode |   | Json Object | Full-color mode parameter structure. JSON show as follow Table 5 |

| DayNightMode |   | Json Object | Day-night mode parameter structure. JSON show as follow Table 6 |

| image_setting_schedule |   | JSON array | Schedule mode. |

| Daylight |   | Json Object | Daytime (or ordinary) parameter structure. JSON show as follow Table 7 |

| Night |   | Json Object | Night parameter structure (exists only when the day night parameter mode is supported). JSON show as follow Table 8 |

| ir_cut_mode | "AutoMode" "ColorMode", "BlackWhiteMode", "VideoMode" "TimeSchedule" | string | IR-CUT mode (not supported in full color). |

| ir_cut_mode | "Auto" "Day", "Night", "Image" "Schedule" | string | IR-CUT mode (supports full color use). |

| start_time |   | string | Start time |

| end_time |   | string | End time |

| ir_cut_delay | 1-36 | int | Ir switching delay. |

| ir_led | "Off"， "On"， "Auto"， "Manual"， | string | Ir lamp |

| low_beam_light | 1-100 | int | Low light intensity (Ir light manual mode). |

| high_beam_light | 1-100 | int | High beam intensity (Ir lamp manual mode). |

| mirror_mode | "Close", "VerticalMirroring", "HorizontalMirroring", "All" | string | Mirror Mode |

| corridor_mode | “Close”,"Open" | string | Corridor mode |

| angle_rotation | "0","90","180","270" | string | Angular rotation |

#### Table 5

| Parameter | Range | Type | Description |

| white_light | "Auto", "Manual", "Schedule", "OFF" 1~100 | string int | Fill light mode image fusion ratio. |

| light_distance | 0-100 | int | Brightness of the fill light, valid only when (white_light == "Manual"). |

| whitelight_schedule |   | JSON array | Fill light schedule mode. |

#### Table 6

| Parameter | Range | Type | Description |

| ir_cut_mode | "Auto", "Day", "Night", "Image", "Schedule" | string | IR-CUT mode |

| ircut_schedule |   | JSON array | Schedule Mode |

| ir_cut_delay | 1-36 | int | Ir switching delay |

| ir_led | "Manual"， "SmartIR"， "OFF"， | string | Ir lamp |

| low_beam_light | 0-100 | int | Low light intensity (Ir light manual mode). |

| high_beam_light | 0-100 | int | High light intensity (Ir light manual mode). |

#### Table 7

| Parameter | Range | Type | Description |

| exposure_mode | "Auto", "Manual", "ShutterFirst", "IrisFirst" | string | Exposure mode |

| iris | "f1.4","f1.6","f2.0","f2.4", "f2.8","f3.4","f4.0","f4.8", "f5.6","f6.8","f9.6","f11", "f14","f16","f19","f22" | string | Aperture |

| iris_max | 0-100 | Int | Maximum aperture |

| iris_min | 0-100 | Int | Minimum aperture (Less than the maximum aperture) |

| shutter_min | "1/5","1/8","1/15","1/25", "1/30","1/50","1/60","1/100", "1/120","1/150","1/180","1/200", "1/240","1/250","1/300","1/360", "1/480","1/500","1/600","1/700", "1/1000","1/1500","1/2000","1/2500", "1/5000","1/10000","1/12000","1/20000", "Flickerless", | string | Minimum shutter limit (Less than the maximum shutter limit) |

| shutter_max | "1/5","1/8","1/15","1/25", "1/30","1/50","1/60","1/100", "1/120","1/150","1/180","1/200", "1/240","1/250","1/300","1/360", "1/480","1/500","1/600","1/700", "1/1000","1/1500","1/2000","1/2500", "1/5000","1/10000","1/12000","1/20000", "Flickerless", | string | Maximum shutter limit |

| gain | 1-128（new）/ "Off"， "Low"，"Middle"，"High"(old) | int/string（old） | Gain, IPC 1-128 |

| angle_rotation | "0","90","180","270" | string | Angular rotation |

| shutter_limit | "1/5","1/8","1/15","1/25", "1/30","1/50","1/60","1/100", "1/120","1/150","1/180","1/200", "1/240","1/250","1/300","1/360", "1/480","1/500","1/600","1/700", "1/1000","1/1500","1/2000","1/2500", "1/5000","1/10000","1/12000","1/20000", "Flickerless", | string | Shutter Limit (s) |

| back_light | "WDR"，"HLC"，"DWDR"， "BacklightCompensation"，"Close" | string | Stand in the light |

| wdr_hide_ai_area |   | bool | Whether the WDR display is mutually exclusive with the marking-off frame. |

| wdr_coefficeient | 0-100、1-255 | int | Wide dynamic coefficient. |

| dwdr_coefficeient | 0-100、1-255 | int | Digital wide dynamic coefficient. |

| hlc_strength | 1-255 | int | Strong light rejection factor. |

| blc_level | 1-15 | Int | Backlight compensates for intensity. |

| back_light_area | "Top","Left","Down","Right","Center" | string | Backlight compensation area. |

| white_balance | "Auto","Manual", "AutoTracking", "OnePush", "Indoor","Outdoor", "FixedSodiumLamp", "FluorescentLamp1", "FluorescentLamp2", "IncandescentLamp", "Sunlight" | string | White balance Ipc value is "Auto", "Manual", "Indoor". |

| red_tuning | 0-100、1-255 | int | Red emphasis quantity. |

| blue_tuning | 0-100、1-255 | int | Blue emphasis quantity |

| green_tuning | 1-255 | Int | Green emphasis quantity. |

| defog_mode | "Disable","Auto","Manual" | string | Fog penetration mode. |

| defogging_level | 0-100/(1-255) | int | Fog penetration rating,(IPC:1-255) |

| denoising | "Close","CommonMode", "ExpertMode" or “Disable”“Auto”，“Manual” | string | Noise reduction switch. |

| denoising_level | 0-100/(1-255) | int | Noise reduction order,(IPC: 1-255). |

| distort_correct | “Close”,"Open" | string | Distortion correction. |

| distort_correct_mode | "Auto","Manual" | string | Distortion correction mode. |

| distort_correct_level | 0-100 | int | Distortion correction grade. |

Tips：

The lower limit of color temperature cannot be greater than the upper limit of color temperature

Manual exposure and wide dynamic, strong light suppression, background frequency, backlight compensation mutually exclusive

Automatic exposure mode: wide dynamic and strong light suppression mutually exclusive, slow shutter and wide dynamic, strong light suppression mutually exclusive

#### Table 8

| Parameter | Range | Type | Description |

| mirror_mode | "Close", "VerticalMirroring", "HorizontalMirroring", "All" | string | Mirror Mode |

| corridor_mode | “Close”, "Open" | string | Corridor mode |

| ir_cut_mode | "AutoMode" "ColorMode", "BlackWhiteMode", "VideoMode"/"ImageMode" "TimeSchedule" | string | IR-CUT Mode show as follow Table 9 Note: No photosensitive IPC translates VideoMode to ImageMode |

| ir_cut_delay | 1-36 | int | Ir switching delay |

| ir_led | "Off"， "On"， "Auto"， "Manual"， | string | Ir lamp, show as follow Table 10 |

| image_sensitivity | "Low"， "Middle"， "High" | string | Non-photosensitive control sensitivity, support non-photosensitive equipment use. |

| exposure_mode | "Auto", "Manual", "ShutterFirst", "IrisFirst" | string | exposure mode |

| iris | "f1.4","f1.6","f2.0","f2.4","f2.8", "f3.4","f4.0","f4.8","f5.6","f6.8", "f9.6","f11","f14","f16","f19","f22" | string | Aperture |

| iris_max | 0-100 | Int | Maximum aperture |

| iris_min | 0-100 | Int | Minimum aperture (Less than the maximum aperture) |

| gain | 1-128（new）/ "Off"， "Low"，"Middle"，"High"(old) | int/string（old） | Gain, IPC 1-128 |

| angle_rotation | "0","90","180","270" | string | Angular rotation |

| shutter_limit(s) | "1/5","1/8","1/15","1/25","1/30", "1/50","1/60","1/100","1/120","1/150", "1/180","1/200","1/240","1/250","1/300", "1/360","1/480","1/500","1/600","1/700", "1/1000","1/1500","1/2000","1/2500","1/5000", "1/10000","1/12000","1/20000","Flickerless", | string | Shutter limit |

| back_light | "WDR"， "HLC"， "BacklightCompensation"， "Close" | string | Backlight |

| wdr_coefficeient | 0-100、1-255 | int | Wide dynamic coefficient. |

| hlc_coefficeient | 1-255 | string /int | IPC is 1-255. |

| hlc_strength | 1-255 | int | Strong light rejection factor. |

| blc_level | 1-15 | Int | Backlight compensates for intensity. |

| back_light_area | "Top","Left","Down","Right","Center" | string | Backlight compensation area. |

| white_balance | "Auto","Manual", "AutoTracking", "OnePush", "Indoor","Outdoor", "FixedSodiumLamp", "FluorescentLamp1", "FluorescentLamp2", "IncandescentLamp", "Sunlight" | string | White balance Ipc value is "Auto", "Manual", "Indoor" |

| red_tuning | 0-100、1-255 | int | Red emphasis quantity |

| green_tuning | 1-255 | Int | Green emphasis quantity |

| defog_mode | "Disable","Auto","Manual" | string | Fog penetration mode |

| defogging_level | 0-100/(1-255) | int | Fog penetration rating,(IPC:1-255) |

| denoising | "Close","CommonMode", "ExpertMode" or “Disable”“Auto”，“Manual” | string | Noise reduction switch. |

| denoising_level | 0-100/(1-255) | int | Noise reduction order,(IPC: 1-255). |

| distort_correct | “Close”,"Open" | string | Distortion correction. |

| distort_correct_mode | "Auto","Manual" | string | Distortion correction mode. |

| distort_correct_level | 0-100 | int | Distortion correction grade. |

| support_default |   | bool | Whether to restore the default value. |

Tips：

The lower limit of color temperature cannot be greater than the upper limit of color temperature

Manual exposure and wide dynamic, strong light suppression, background frequency, backlight compensation mutually exclusive

Automatic exposure mode: wide dynamic and strong light suppression mutually exclusive, slow shutter and wide dynamic, strong light suppression mutually exclusive

#### Table 9

| Parameter | Range | Type | Description |

| start_time |   | string | Start time |

| end_time |   | string | End time |

#### Table 10

| Parameter | Range | Type | Description |

| low_beam_light | 1-100 | int | Low light intensity |

| high_beam_light | 1-100 | int | High light intensity |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 16,
		"channel_info": {
			"type": "object",
			"items": {
				"CH1": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"image_sensitivity": {
							"type": "int32",
							"items": [
								0,
								1,
								2,
								3
							]
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"angle_rotation": {
							"type": "string",
							"items": [
								"0",
								"180"
							]
						},
						"camera_param_mode": {
							"type": "string",
							"items": [
								"Daylight",
								"Night"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000",
								"Flickerless"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "int32",
							"min": 1,
							"max": 128
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"DWDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"dwdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "int32",
							"min": 1,
							"max": 128
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH9": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH10": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH11": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"image_sensitivity": {
							"type": "int32",
							"items": [
								0,
								1,
								2,
								3
							]
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"angle_rotation": {
							"type": "string",
							"items": [
								"0",
								"180"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"DWDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"dwdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "int32",
							"min": 1,
							"max": 128
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000",
								"Flickerless"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH12": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH13": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"WDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "string",
							"items": [
								"Low",
								"Middle",
								"High"
							]
						},
						"wdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "string",
							"items": [
								"Off",
								"Low",
								"Middle",
								"High"
							]
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/50",
								"1/100",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH14": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": [
								"AutoMode",
								"ColorMode",
								"BlackWhiteMode",
								"TimeSchedule"
							]
						},
						"start_time": {
							"description": "When ir-cut_mode is Schedule(B/W) has this variable.",
							"type": "string",
							"len": 5
						},
						"end_time": {
							"description": "When ir-cut_mode is Schedule(B/W) has this variable.",
							"type": "string",
							"len": 5
						},
						"ir_cut_delay": {
							"type": "int32",
							"min": 1,
							"max": 36
						},
						"ir_led": {
							"type": "string",
							"items": [
								"Off",
								"On",
								"Auto"
							]
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"angle_rotation": {
							"type": "string",
							"items": [
								"0",
								"180"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"DWDR",
								"HLC",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"dwdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"hlc_strength": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "int32",
							"min": 1,
							"max": 128
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"defog_mode": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"defogging_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				},
				"CH15": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Day",
								"Night",
								"Image",
								"Schedule"
							]
						},
						"start_time": {
							"description": "When ir-cut_mode is Schedule(B/W) has this variable.",
							"type": "string",
							"len": 5
						},
						"end_time": {
							"description": "When ir-cut_mode is Schedule(B/W) has this variable.",
							"type": "string",
							"len": 5
						},
						"ir_led": {
							"type": "string",
							"items": [
								"Manual",
								"SmartIR",
								"OFF"
							]
						},
						"low_beam_light": {
							"type": "int32",
							"min": 0,
							"max": 100
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"corridor_mode": {
							"type": "string",
							"items": [
								"Close",
								"Open"
							]
						},
						"angle_rotation": {
							"type": "string",
							"items": [
								"0",
								"180"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"DWDR",
								"HLC",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"dwdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"hlc_strength": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"ShutterFirst",
								"IrisFirst"
							]
						},
						"iris_max": {
							"type": "int32",
							"min": 0,
							"max": 100
						},
						"iris_min": {
							"type": "int32",
							"min": 0,
							"max": 100
						},
						"iris": {
							"type": "string",
							"items": [
								"f5.6",
								"f4.0",
								"f2.8",
								"f2.0",
								"f1.4"
							]
						},
						"shutter_max": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/30",
								"1/50",
								"1/60",
								"1/100",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"shutter_min": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/25",
								"1/30",
								"1/50",
								"1/60",
								"1/100",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000",
								"Flickerless"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						},
						"image_setting": {
							"type": "string",
							"items": [
								"FullColorMode",
								"DayNightMode",
								"Schedule",
								"SmartIllumination"
							]
						},
						"white_light": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Schedule",
								"OFF"
							]
						},
						"light_distance": {
							"type": "int32",
							"min": 0,
							"max": 100
						},
						"image_sensitivity": {
							"type": "int32",
							"items": [
								0,
								1,
								2,
								3
							]
						}
					}
				},
				"CH16": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"support_default": {
							"type": "bool"
						},
						"ir_cut_mode": {
							"type": "string",
							"items": []
						},
						"image_sensitivity": {
							"type": "int32",
							"items": [
								0,
								1,
								2,
								3
							]
						},
						"mirror_mode": {
							"type": "string",
							"items": [
								"Close",
								"VerticalMirroring",
								"HorizontalMirroring",
								"All"
							]
						},
						"angle_rotation": {
							"type": "string",
							"items": [
								"0",
								"180"
							]
						},
						"back_light": {
							"type": "string",
							"items": [
								"DWDR",
								"BacklightCompensation",
								"Close"
							]
						},
						"blc_level": {
							"type": "int32",
							"min": 1,
							"max": 15
						},
						"back_light_area": {
							"type": "string",
							"items": [
								"Top",
								"Left",
								"Down",
								"Right",
								"Center"
							]
						},
						"dwdr_coefficeient": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"denoising": {
							"type": "string",
							"items": [
								"Disable",
								"Auto",
								"Manual"
							]
						},
						"denoising_level": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"gain": {
							"type": "int32",
							"min": 1,
							"max": 128
						},
						"white_balance": {
							"type": "string",
							"items": [
								"Auto",
								"Manual",
								"Indoor"
							]
						},
						"red_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"green_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"blue_tuning": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"exposure_mode": {
							"type": "string",
							"items": [
								"Auto",
								"Manual"
							]
						},
						"shutter_limit": {
							"type": "string",
							"items": [
								"1/5",
								"1/8",
								"1/15",
								"1/30",
								"1/60",
								"1/120",
								"1/150",
								"1/180",
								"1/200",
								"1/240",
								"1/250",
								"1/300",
								"1/360",
								"1/480",
								"1/500",
								"1/600",
								"1/700",
								"1/1000",
								"1/1500",
								"1/2500",
								"1/5000",
								"1/10000",
								"1/12000",
								"1/20000",
								"Flickerless"
							]
						},
						"wdr_hide_ai_area": {
							"type": "bool"
						}
					}
				}
			}
		},
		"default_timeout": 60000
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
