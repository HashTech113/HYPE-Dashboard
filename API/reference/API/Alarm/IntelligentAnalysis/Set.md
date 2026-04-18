# Set

## Function

This API is used to set Alarm > Intelligent Analysis configuration parameters.

## Request Message

See Alarm > IntelligentAnalysis > Range > Parameter Description  > Table 1 for parameter description.

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 2. |

##### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 3 |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 3

| Parameter | Range | Type | Description |

| report |   | unsigned int array | Statistical report. Array length is divided into daily report 24, weekly report 7, monthly report (0~31), annual report 12 according to the requested report type. per A value of one bit (0-65535) represents the number of statistics in this unit time period. |

## Error Code

See Response Messages Body and Common error_code for more information.
