# event check

# Event_check & Event_push

## Function

### Event check：

Used to poll to obtain device alarms.

### Event push：

It is used for the device to actively push device alarms.

### Explain

(1), alarm events and intelligent tweets are realized by requesting API interface /API/Event/Check in eventcheck mode;  For compatibility reasons, the Smart Tweet API/ API/AI/processAlarm/Get and the event stream are retained and gradually removed in later major releases.

(2) Add screenshots for alarm events. Note:

Screenshot resolution: Support 640 * 480 and 1280 * 720, default 640 * 480;  You can use the /API/Event/Check interface to specify the resolution for capturing snapshots. If multiple clients specify the resolution for capturing snapshots, the last resolution takes effect.

Alarm events that need screenshots: Motion, IO, PIR, Sound, Occlusion, and all AI alarms.

Because the screenshot uses the screenshot caching mechanism: capturing pictures with the same resolution shares a memory buffer, capturing pictures with the same resolution within 1 second will only trigger one screenshot, if the screenshot is taken across seconds, it will re-take the screenshot and update the screenshot memory buffer data.  In this way, only the buffer of the screenshots is held, and no deep copy is made.

(3) If the push delay of the alarm event is large because of a network problem, the alarm event and the screenshot data will be different

(4). For alarms such as motion_alarm, the value can be true or false.  If the value is true, an alarm is generated. If the value is false, no alarm is generated. The client handles the alarm as required.

## URL

### Event check：

POST  /API/Event/Check

### Event push：

POST/GET  {user defined in  Event > Http_listening}

## Parameter Specification

Get alarms and push alarms: Get&Push
