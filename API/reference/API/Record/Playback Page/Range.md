# Range

## Function

This API is used to get parameter range for Record > Playback Page page.

## Request Message

None.

Sample:

POST API/Playback/PlaybackPage/Range HTTP/1.1

{
	"version": "1.0"
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| FaceAttendance |   | json object | Show as followTable2 |

| Normal |   | Json object | Show as followTable3 |

| Picture |   | Json object | Show as followTable3 |

| HumanVehicle |   | Json object | Show as followTable3 |

| PidLcd |   | Json object | Show as followTable3 |

| supportFaceAttr |   | Json object | AI playback page with face attributes of the control. |

| param_limit |   | Json object | Show as followTable3 |

#### Table 2

| Parameter | Range | Type | Description |

| off_duty_time |   | string | The time format is “hh:mm:ss” |

| on_duty_time |   | string | The time format is “hh:mm:ss” |

| working_days | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string array | workday |

#### Table 3

| Parameter | Range | Type | Description |

| display_mode | “Treelike”, “Checkbox” | int | UI display type |

| default_sort_of_results |   | int | Search information in default or reverse order. |

| items |   | int | Show as followTable4 |

| similarity_face |   | int | Control the range and default value of the IE playback Face Detection similarity input box. |

| similarity_customer |   | int | Control the Fault-tolerant input field and the default value of the IE playback License Plate. |

| similarity_license |   | int | The range and default value of the similarity input box controlling the IE playback of Repeat customer. |

#### Table 4

| Parameter | Range | Type | Description |

| record_type |   | Json object | Playback Type Show as followTable5 |

| stream_mode | “Mainstream”, “Substream” | string | Primary substream type (Normal only has this field) |

#### Table 5

| Parameter | Range | Type | Description |

| normal |   | bool | normal |

| manual |   | bool | manual |

| alarm |   | Json object | Show as followTable6 (For IPC only) |

| smart |   | Json object | Show as followTable7 (For IPC only) |

| Human |   | bool | AI Human (For NVR only) |

| Vehicle |   | bool | AI Vehicle (For NVR only) |

| IO |   | bool | IO alarm record type (For NVR only) |

| motion |   | bool | Motion alarm record type (For NVR only) |

| PIR |   | bool | Pir (For NVR only) |

| Sound |   | bool | Audible alarm (For NVR only) |

| occulusion |   | bool | Lens blocked (For NVR only) |

| Intelligent |   | bool | intelligent analysis (For NVR only) |

| PID |   | bool | AI perimeter intrusion (For NVR only) |

| LCD |   | bool | AI Overline detection (For NVR only) |

| faceAttr |   | bool | Face attribute (For NVR only) |

#### Table 6

| Parameter | Range | Type | Description |

| IO |   | Json object | IO alarm record type |

| motion |   | Json object | Motion alarm record type |

| PIR |   | Json object | Pir |

| Sound |   | Json object | Audible alarm |

| Netbreak |   | Json object | disconnected record |

#### Table 7

| Parameter | Range | Type | Description |

| PID |   | bool |   |

| LCD |   | bool |   |

| SOD |   | bool |   |

| PD |   | bool |   |

| FD |   | bool |   |

| CC |   | bool |   |

| intrusion |   | bool |   |

| regionEntrance |   | bool |   |

| regionExiting |   | bool |   |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"version": "1.0",
	"result": "success",
	"data": {
		"Normal": {
			"type": "object",
			"items": {
				"record_type": {
					"type": "object",
					"items": {
						"normal": {
							"type": "bool"
						},
						"event": {
							"type": "object",
							"items": {
								"manual": {
									"type": "bool"
								},
								"IO": {
									"type": "bool"
								},
								"motion": {
									"type": "bool"
								},
								"Sound": {
									"type": "bool"
								},
								"occulusion": {
									"type": "bool"
								}
							}
						},
						"ai": {
							"type": "object",
							"items": {
								"fd": {
									"type": "bool"
								},
								"pd&vd": {
									"type": "bool"
								},
								"pid": {
									"type": "bool"
								},
								"lcd": {
									"type": "bool"
								},
								"sod": {
									"type": "bool"
								},
								"cc": {
									"type": "bool"
								},
								"cd": {
									"type": "bool"
								},
								"qd": {
									"type": "bool"
								},
								"intrusion": {
									"type": "bool"
								},
								"regionEntrance": {
									"type": "bool"
								},
								"regionExiting": {
									"type": "bool"
								},
								"lpd": {
									"type": "bool"
								},
								"rsd": {
									"type": "bool"
								},
								"thermal": {
									"type": "bool"
								},
								"faceAttr": {
									"type": "bool"
								}
							}
						}
					}
				},
				"stream_mode": {
					"type": "string",
					"mode": "r",
					"items": [
						"Mainstream",
						"Substream"
					],
					"default_value": "Substream"
				}
			},
			"display_mode": "Treelike",
			"recordColorArr": [
				{
					"normal": 1
				},
				{
					"motion": 4
				},
				{
					"IO": 8
				},
				{
					"PIR": 65536
				},
				{
					"ai": 128
				},
				{
					"alarm": 2
				},
				{
					"manual": 16384
				}
			]
		},
		"Smart": {
			"type": "object",
			"items": {
				"record_type": {
					"type": "object",
					"items": {
						"normal": {
							"type": "bool"
						},
						"event": {
							"type": "object",
							"items": {
								"manual": {
									"type": "bool"
								},
								"IO": {
									"type": "bool"
								},
								"motion": {
									"type": "bool"
								},
								"Sound": {
									"type": "bool"
								},
								"occulusion": {
									"type": "bool"
								}
							}
						},
						"ai": {
							"type": "object",
							"items": {
								"fd": {
									"type": "bool"
								},
								"pd&vd": {
									"type": "bool"
								},
								"pid": {
									"type": "bool"
								},
								"lcd": {
									"type": "bool"
								},
								"sod": {
									"type": "bool"
								},
								"cc": {
									"type": "bool"
								},
								"cd": {
									"type": "bool"
								},
								"qd": {
									"type": "bool"
								},
								"intrusion": {
									"type": "bool"
								},
								"regionEntrance": {
									"type": "bool"
								},
								"regionExiting": {
									"type": "bool"
								},
								"lpd": {
									"type": "bool"
								},
								"rsd": {
									"type": "bool"
								},
								"thermal": {
									"type": "bool"
								},
								"faceAttr": {
									"type": "bool"
								}
							}
						}
					}
				},
				"stream_mode": {
					"type": "string",
					"items": [
						"Mainstream",
						"Substream"
					]
				}
			},
			"display_mode": "Treelike"
		},
		"Picture": {
			"type": "object",
			"items": {
				"record_type": {
					"type": "object",
					"items": {
						"normal": {
							"type": "bool"
						},
						"event": {
							"type": "object",
							"items": {
								"manual": {
									"type": "bool"
								},
								"motion": {
									"type": "bool"
								},
								"IO": {
									"type": "bool"
								},
								"PIR": {
									"type": "bool"
								}
							}
						}
					}
				}
			},
			"display_mode": "Treelike",
			"default_sort_of_results": 0
		},
		"HumanVehicle": {
			"type": "object",
			"items": {
				"record_type": {
					"type": "object",
					"items": {
						"Human": {
							"type": "bool"
						},
						"Vehicle": {
							"type": "bool"
						},
						"Non-Vehicle": {
							"type": "bool"
						}
					}
				}
			},
			"display_mode": "Checkbox"
		},
		"PidLcd": {
			"type": "object",
			"items": {
				"record_type": {
					"type": "object",
					"items": {
						"pid": {
							"type": "bool"
						},
						"lcd": {
							"type": "bool"
						}
					}
				}
			},
			"display_mode": "Checkbox"
		},
		"LicensePlate": {
			"type": "object",
			"items": {
				"plate_keys": {
					"type": "string",
					"min_len": 1,
					"max_len": 16
				},
				"max_error_char": {
					"type": "int32",
					"min": 0,
					"max": 5,
					"default_value": 3
				}
			}
		},
		"supportFaceAttr": true,
		"FaceAttendance": {
			"working_days": [
				"Mon.",
				"Tue.",
				"Wed.",
				"Thu.",
				"Fri."
			],
			"on_duty_time": "08:30:00",
			"off_duty_time": "17:30:00"
		},
		"param_limit": {
			"type": "object",
			"items": {
				"similarity_face": {
					"type": "int32",
					"mode": "rw",
					"min": 0,
					"max": 100,
					"default_value": 70
				},
				"similarity_customer": {
					"type": "int32",
					"mode": "rw",
					"min": 0,
					"max": 100,
					"default_value": 50
				},
				"similarity_license": {
					"type": "int32",
					"mode": "rw",
					"min": 0,
					"max": 5,
					"default_value": 3
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
