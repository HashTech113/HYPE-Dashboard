# Get

## Function

This API is used to get Channel > Scheduled Tasks Page parameters.

## Request Message

None.

Sample:

POST /API/Schedules/PtzTasks/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel > Schedule Tasks > Table 1

Sample

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "schedule_tasks_enable": true,
        "belt_times_use": 0,
        "schedule": [
            {
                "schedule_type": "Close",
                "week": [
                    {
                        "day": "Sun",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Mon",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Tue",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Wed",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Thu",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Fri",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Sat",
                        "time": [0,0,0,...,0,0,0]
                    }
                ]
            },
            {
                "schedule_type": "Line Scan",
                "week": [
                    {
                        "day": "Sun",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Mon",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Tue",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Wed",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Thu",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Fri",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Sat",
                        "time": [0,0,0,...,0,0,0]
                    }
                ]
            },
            {
                "schedule_type": "Tour",
                "week": [
                    {
                        "day": "Sun",
                        "time": [0,0,0,...,1,0,0]
                    },
                    {
                        "day": "Mon",
                        "time": [0,0,0,...,1,0,0]
                    },
                    {
                        "day": "Tue",
                        "time": [0,0,0,...,1,0,0]
                    },
                    {
                        "day": "Wed",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Thu",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Fri",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Sat",
                        "time": [0,0,0,...,0,0,0]
                    }
                ]
            },
            {
                "schedule_type": "Pattern Scan",
                "week": [
                    {
                        "day": "Sun",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Mon",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Tue",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Wed",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Thu",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Fri",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Sat",
                        "time": [0,0,0,...,0,0,0]
                    }
                ]
            },
            {
                "schedule_type": "Preset",
                "week": [
                    {
                        "day": "Sun",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Mon",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Tue",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Wed",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Thu",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Fri",
                        "time": [0,0,0,...,0,0,0]
                    },
                    {
                        "day": "Sat",
                        "time": [0,0,0,...,0,0,0]
                    }
                ]
			}
        ],
        "tasks_recovery_times": 5
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
