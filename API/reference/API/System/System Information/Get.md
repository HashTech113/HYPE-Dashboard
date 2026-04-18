# Get

## Function

This API is used to get parameter for System > System Information page.

## Request Message

None.

Sample:

POST /API/SystemInfo/Base/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| device_id |   | string | DeviceID |

| device_name |   | string | DeviceName |

| device_type |   | string | DeviceType |

| hardware_version |   | string | HardwareVersion |

| software_version |   | string | SoftwareVersion |

| build_time |   | string | release time |

| ie_client_version |   | string | IE Client Version |

| mcu_software_version |   | string | MCU software version |

| video_format | “PAL”, “NTSC” | string | Video Format |

| hdd_volume |   | string | HDD Volume |

| ip_address |   | string | IP Address |

| ipv6_address |   | string | IPv6 Address |

| web |   | string | Web Internal port ,Web external port |

| client |   | string | Client Internal port , Clientexternal port |

| mac_address |   | string | MAC Address |

| wireless_mac |   | string | Wireless MAC |

| p2p_id |   | string | P2P ID |

| p2p_switch |   | boolean |   |

| network_state | “Connected”, “Unconnected” | string | Network connection status |

| serialNum |   | string | Serial Number(B18) |

| language |   | string | The current language of the device |

Tips：

Later products will integrate the web port and the client port, and the client port will not be opened and the item will be removed from the page. For example, do not consider this port when the customer performs development interconnection.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"device_id": "000000",
		"device_name": "admin",
		"device_type": "N7516",
		"hardware_version": "DM-448",
		"software_version": "V8.2.3-20221014",
		"ie_client_version": "V1.3.1.45",
		"video_format": "NTSC",
		"hdd_volume": "465G",
		"ip_address": "172.16.10.49",
		"ipv6_address": "fe80::8a26:1dff:feaa:8ee0 / 64",
		"web": "80,80",
		"client": "9000,9000",
		"mac_address": "88-26-1D-AA-8E-E0",
		"network_state": "Connected",
		"iot_id": "",
		"language": "English"
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
