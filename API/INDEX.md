# Camera API — full reference index

Machine-extracted markdown for every HTTP endpoint the camera exposes, taken from the vendor's *HTTP API Protocol For IP Media Device* docs. The top-level guides ([README.md](README.md), [login.md](login.md), [processAlarm_get.md](processAlarm_get.md), [postman.md](postman.md)) cover the endpoints this project actually uses — the rest is reference for when you need to wire up another camera feature.

**642 endpoints across 18 categories.**

## API / AI

| Endpoint | Use |
|---|---|
| [Attribute_Detection → API](reference/API/AI/Attribute_Detection/API.md) | This API is used to get or set AI > Attribute Detection page parameters. |
| [Attribute_Detection → Get](reference/API/AI/Attribute_Detection/Get.md) | This API is used to get parameter for AI > Attribute Detection page. |
| [Attribute_Detection → Range](reference/API/AI/Attribute_Detection/Range.md) | This API is used to get parameter range for AI > Attribute Detection page. |
| [Attribute_Detection → Set](reference/API/AI/Attribute_Detection/Set.md) | This API is used to set parameter for AI > Attribute Detection page. |
| [Cross_Counting_Scenario / Config → API](reference/API/AI/Cross_Counting_Scenario/Config/API.md) | This API is used for get or set AI > Cross Counting Scenario > Config parameters. |
| [Cross_Counting_Scenario / Config → Get](reference/API/AI/Cross_Counting_Scenario/Config/Get.md) | This API is used to get AI > Cross Counting Scenario > Config configuration parameters. |
| [Cross_Counting_Scenario / Config → Set](reference/API/AI/Cross_Counting_Scenario/Config/Set.md) | This API is used to set AI > Cross Counting Scenario > Config configuration parameters. |
| [Cross_Counting_Scenario / Image_Manage → API](reference/API/AI/Cross_Counting_Scenario/Image_Manage/API.md) | This API is used for set AI > Cross Counting Scenario > Image Manage parameters. |
| [Cross_Counting_Scenario / Image_Manage → Set](reference/API/AI/Cross_Counting_Scenario/Image_Manage/Set.md) | This API is used to set AI > Cross Counting Scenario > Image Manage configuration parameters. |
| [Cross_Counting_Scenario / Map → API](reference/API/AI/Cross_Counting_Scenario/Map/API.md) | This API is used for get or set AI > Cross Counting Scenario > Map parameters. |
| [Cross_Counting_Scenario / Map → Get](reference/API/AI/Cross_Counting_Scenario/Map/Get.md) | This API is used to get AI > Cross Counting Scenario > Map configuration parameters. |
| [Cross_Counting_Scenario / Map → Set](reference/API/AI/Cross_Counting_Scenario/Map/Set.md) | This API is used to set AI > Cross Counting Scenario > Map configuration parameters. |
| [Cross_Counting_Scenario / RealTime_Info → API](reference/API/AI/Cross_Counting_Scenario/RealTime_Info/API.md) | This API is used for get or set AI > Cross Counting Scenario > RealTime Info parameters. |
| [Cross_Counting_Scenario / RealTime_Info → Get](reference/API/AI/Cross_Counting_Scenario/RealTime_Info/Get.md) | This API is used to get AI > Cross Counting Scenario > RealTime Info configuration parameters. |
| [Cross_Counting_Scenario / RealTime_Info → Set](reference/API/AI/Cross_Counting_Scenario/RealTime_Info/Set.md) | This API is used to set AI > Cross Counting Scenario > RealTime Info configuration parameters. |
| [Cross_Counting_Scenario / Statistics → API](reference/API/AI/Cross_Counting_Scenario/Statistics/API.md) | This API is used for get or set AI > Cross Counting Scenario > Statistics parameters. |
| [Cross_Counting_Scenario / Statistics → Get](reference/API/AI/Cross_Counting_Scenario/Statistics/Get.md) | This API is used to get AI > Cross Counting Scenario > Statistics configuration parameters. |
| [Cross_Counting_Scenario / Statistics → Set](reference/API/AI/Cross_Counting_Scenario/Statistics/Set.md) | This API is used to set AI > Cross Counting Scenario > Statistics configuration parameters. |
| [Face Attendance(NVR dedicated) → API](reference/API/AI/Face%20Attendance(NVR%20dedicated)/API.md) | This API is used to get or set AI > Face Attendance(NVR专用) parameters. |
| [Face Attendance(NVR dedicated) → Get](reference/API/AI/Face%20Attendance(NVR%20dedicated)/Get.md) | This API is used to get parameter for Al > Face Attendance page. |
| [Face Attendance(NVR dedicated) → Range](reference/API/AI/Face%20Attendance(NVR%20dedicated)/Range.md) | This API is used to get parameter range for Al > Face Attendance page. |
| [Face Attendance(NVR dedicated) → Set](reference/API/AI/Face%20Attendance(NVR%20dedicated)/Set.md) | This API is used to set parameter for Al > Face Attendance page. |
| [Recongnition / Add Compare Face Image → API](reference/API/AI/Recongnition/Add%20Compare%20Face%20Image/API.md) | This API is used to add comparison faces |
| [Recongnition / Add Compare Face Image → Add](reference/API/AI/Recongnition/Add%20Compare%20Face%20Image/Add.md) | This API is used to add AI > Recognition > Add Compare Face Image to compare faces. |
| [Recongnition / Additional Face Image → API](reference/API/AI/Recongnition/Additional%20Face%20Image/API.md) | This API is used to attach face images |
| [Recongnition / Additional Face Image → Add](reference/API/AI/Recongnition/Additional%20Face%20Image/Add.md) | This API is used to add AI > Recognition > Additional Face Image face images. |
| [Recongnition / Additional Face Image → Get](reference/API/AI/Recongnition/Additional%20Face%20Image/Get.md) | This API is used to get AI > Recognition > Additional Face Image face image parameters. |
| [Recongnition / Additional Face Image → GetById](reference/API/AI/Recongnition/Additional%20Face%20Image/GetById.md) | This API is used to get AI > Recognition > Additional Face Image face image ID. |
| [Recongnition / Additional Face Image → Remove](reference/API/AI/Recongnition/Additional%20Face%20Image/Remove.md) | This API is used to remove AI > Recognition > Additional Face Image face images. |
| [Recongnition / Database face information query → API](reference/API/AI/Recongnition/Database%20face%20information%20query/API.md) | This API is used for AI > Recognition > Database face information query database face information query |
| [Recongnition / Database face information query → GetById](reference/API/AI/Recongnition/Database%20face%20information%20query/GetById.md) | This API is used to get AI > Recognition > Database face information query face information. |
| [Recongnition / Database face information query → GetByIndex](reference/API/AI/Recongnition/Database%20face%20information%20query/GetByIndex.md) | This API is used to get AI > Recognition > Database face information query face information. |
| [Recongnition / Database face information query → GetId](reference/API/AI/Recongnition/Database%20face%20information%20query/GetId.md) | This API is used to get added faces id. |
| [Recongnition / Database face information query → Search](reference/API/AI/Recongnition/Database%20face%20information%20query/Search.md) | This API is used to search AI > Recognition > Database face information query face information. |
| [Recongnition / Database license plate information query → API](reference/API/AI/Recongnition/Database%20license%20plate%20information%20query/API.md) | This API is used to query AI > Recognition > Database license plate information query the database license plate information |
| [Recongnition / Database license plate information query → GetById](reference/API/AI/Recongnition/Database%20license%20plate%20information%20query/GetById.md) | This API is used to obtain license plate information by license plate id. |
| [Recongnition / Database license plate information query → GetCount](reference/API/AI/Recongnition/Database%20license%20plate%20information%20query/GetCount.md) | This API is used to get added license plates count. |
| [Recongnition / Database license plate information query → GetId](reference/API/AI/Recongnition/Database%20license%20plate%20information%20query/GetId.md) | This API is used to get license plate id. |
| [Recongnition / Face Group → API](reference/API/AI/Recongnition/Face%20Group/API.md) | This API is used to manipulate the Face Group parameter |
| [Recongnition / Face Group → Add](reference/API/AI/Recongnition/Face%20Group/Add.md) | This API is used to add AI > Recognition > FDGroup page parameters. |
| [Recongnition / Face Group → Change](reference/API/AI/Recongnition/Face%20Group/Change.md) | This API is used to change the group to which a face belongs AI > Recognition > Face Group |
| [Recongnition / Face Group → Get](reference/API/AI/Recongnition/Face%20Group/Get.md) | This API is used to get AI > Recognition > FDGroup page parameters. |
| [Recongnition / Face Group → GetId](reference/API/AI/Recongnition/Face%20Group/GetId.md) | This API is used to get the AI > Recognition > FDGroup id. |
| [Recongnition / Face Group → Modify](reference/API/AI/Recongnition/Face%20Group/Modify.md) | This API is used to modify the AI > Recognition > FDGroup parameter. |
| [Recongnition / Face Group → Remove](reference/API/AI/Recongnition/Face%20Group/Remove.md) | This API is used to remove AI > Recognition > FDGroup face groups. |
| [Recongnition / Face → API](reference/API/AI/Recongnition/Face/API.md) | This API is used for parameter manipulation of faces |
| [Recongnition / Face → Add](reference/API/AI/Recongnition/Face/Add.md) | This API is used to add AI > Recognition > Faces faces. |
| [Recongnition / Face → GetImagesFeature](reference/API/AI/Recongnition/Face/GetImagesFeature.md) | This API is used to get image feature values. AI > Recognition > Faces |
| [Recongnition / Face → Modify](reference/API/AI/Recongnition/Face/Modify.md) | This API is used to modify the AI > Recognition > Faces parameter. |
| [Recongnition / Face → Remove](reference/API/AI/Recongnition/Face/Remove.md) | This API is used to remove the AI > Recognition > Faces parameter. |
| [Recongnition / License Plate Group → API](reference/API/AI/Recongnition/License%20Plate%20Group/API.md) | This API is used for the operation of license plate groups |
| [Recongnition / License Plate Group → Add](reference/API/AI/Recongnition/License%20Plate%20Group/Add.md) | This API is used to add a AI > Recognition > PlateGroup license plate group. |
| [Recongnition / License Plate Group → Get](reference/API/AI/Recongnition/License%20Plate%20Group/Get.md) | This API is used to get the AI > Recognition > PlateGroup license plate group. |
| [Recongnition / License Plate Group → GetId](reference/API/AI/Recongnition/License%20Plate%20Group/GetId.md) | This API is used to get the AI > Recognition > PlateGroup license plate group id. |
| [Recongnition / License Plate Group → Modify](reference/API/AI/Recongnition/License%20Plate%20Group/Modify.md) | This API is used to modify the AI > Recognition > PlateGroup license plate group. |
| [Recongnition / License Plate Group → Remove](reference/API/AI/Recongnition/License%20Plate%20Group/Remove.md) | This API is used to remove the AI > Recognition > PlateGroup license plate group. |
| [Recongnition / License Plate → API](reference/API/AI/Recongnition/License%20Plate/API.md) | This API is used to add, delete, modify license plate and change the group to which the license plate belongs. |
| [Recongnition / License Plate → Add](reference/API/AI/Recongnition/License%20Plate/Add.md) | This API is used to add license plate. |
| [Recongnition / License Plate → Change](reference/API/AI/Recongnition/License%20Plate/Change.md) | This API is used to change the group to which the license plate belongs. |
| [Recongnition / License Plate → Modify](reference/API/AI/Recongnition/License%20Plate/Modify.md) | This API is used to modify the license plate. |
| [Recongnition / License Plate → Remove](reference/API/AI/Recongnition/License%20Plate/Remove.md) | This API is used to remove license plate. |
| [Recongnition / Model Configuratuon → API](reference/API/AI/Recongnition/Model%20Configuratuon/API.md) | This API is used to get or set face model configuration parameters. |
| [Recongnition / Model Configuratuon → Get](reference/API/AI/Recongnition/Model%20Configuratuon/Get.md) | This API is used to get AI > Recognition > Model Configuratuon page parameters. |
| [Recongnition / Model Configuratuon → Set](reference/API/AI/Recongnition/Model%20Configuratuon/Set.md) | This API is used to set AI > Recognition > Model Configuratuon page parameters. |
| [Recongnition / Snaped Faces Search and Match → API](reference/API/AI/Recongnition/Snaped%20Faces%20Search%20and%20Match/API.md) | This API is used for face search and matching of snapshots |
| [Recongnition / Snaped Faces Search and Match → GetById](reference/API/AI/Recongnition/Snaped%20Faces%20Search%20and%20Match/GetById.md) | This API is used to match AI > Recognition > SnapedFaces snapshot face information ID. |
| [Recongnition / Snaped Faces Search and Match → GetByIndex](reference/API/AI/Recongnition/Snaped%20Faces%20Search%20and%20Match/GetByIndex.md) | This API is used to match AI > Recognition > SnapedFaces snapshot face information. |
| [Recongnition / Snaped Faces Search and Match → Search](reference/API/AI/Recongnition/Snaped%20Faces%20Search%20and%20Match/Search.md) | This API is used to search AI > Recognition > SnapedFaces snapshot face information. |
| [Recongnition / Snaped Faces Search and Match → StopSearch](reference/API/AI/Recongnition/Snaped%20Faces%20Search%20and%20Match/StopSearch.md) | This API is used to stop searching for AI > Recognition > SnapedFaces snapshot face information. |
| [Recongnition / Snaped Faces and Objects Count Get (VHD) → API](reference/API/AI/Recongnition/Snaped%20Faces%20and%20Objects%20Count%20Get%20(VHD)/API.md) | This API is used to get VHD log count. |
| [Recongnition / Snaped Faces and Objects Count Get (VHD) → Get](reference/API/AI/Recongnition/Snaped%20Faces%20and%20Objects%20Count%20Get%20(VHD)/Get.md) | This API is used to get VHD log count. |
| [Recongnition / Snaped License Plates Search and Match → API](reference/API/AI/Recongnition/Snaped%20License%20Plates%20Search%20and%20Match/API.md) | This API is used to search and match license plates. |
| [Recongnition / Snaped License Plates Search and Match → SearchPlate](reference/API/AI/Recongnition/Snaped%20License%20Plates%20Search%20and%20Match/SearchPlate.md) | This API is used to search and match license plates. |
| [Recongnition / Snaped Objects Search → API](reference/API/AI/Recongnition/Snaped%20Objects%20Search/API.md) | This API is used for snapshot object search |
| [Recongnition / Snaped Objects Search → GetById](reference/API/AI/Recongnition/Snaped%20Objects%20Search/GetById.md) | This API is used to match AI > Recognition > SnapedObjects snapshot objects. |
| [Recongnition / Snaped Objects Search → GetByIndex](reference/API/AI/Recongnition/Snaped%20Objects%20Search/GetByIndex.md) | This API is used to match AI > Recognition > SnapedObjects snapshot object ID. |
| [Recongnition / Snaped Objects Search → Search](reference/API/AI/Recongnition/Snaped%20Objects%20Search/Search.md) | This API is used to search for AI > Recognition > SnapedObjects snapshot objects. |
| [Recongnition / Snaped Objects Search → StopSearch](reference/API/AI/Recongnition/Snaped%20Objects%20Search/StopSearch.md) | This API is used to stop searching for AI > Recognition > SnapedObjects snapshot objects. |
| [Repeat_Customer → API](reference/API/AI/Repeat_Customer/API.md) | This API is used to get AI > Repeat Customer:SnapedFeaturesId、AI > Repeat Customer:FilterSnapedFaces、AI > Repeat Customer:MatchAddedFaces parameters. |
| [Repeat_Customer → FGet](reference/API/AI/Repeat_Customer/FGet.md) | It is used to get the AI > Repeat Customer:FilterSnapedFaces parameters. |
| [Repeat_Customer → MGet](reference/API/AI/Repeat_Customer/MGet.md) | It is used to get the AI > Repeat Customer:MatchAddedFaces parameters. |
| [Repeat_Customer → SGet](reference/API/AI/Repeat_Customer/SGet.md) | It is used to get the AI > Repeat Customer:SnapedFeaturesId parameters. |
| [Setup / AI_Func_Schedule → API](reference/API/AI/Setup/AI_Func_Schedule/API.md) | This API is used for get or set AI > Setup > AI Func Schedule page parameters. |
| [Setup / AI_Func_Schedule → Get](reference/API/AI/Setup/AI_Func_Schedule/Get.md) | This API is used to get parameter for AI > Setup > AI Func Schedule page. |
| [Setup / AI_Func_Schedule → Range](reference/API/AI/Setup/AI_Func_Schedule/Range.md) | This API is used to get parameter range for AI > Setup > AI Func Schedule page. |
| [Setup / AI_Func_Schedule → Set](reference/API/AI/Setup/AI_Func_Schedule/Set.md) | This API is used to set parameter for AI > Setup > AI Func Schedule page. |
| [Setup / Cross Counting → API](reference/API/AI/Setup/Cross%20Counting/API.md) | This API is used to get or set Cross Counting configuration parameters. |
| [Setup / Cross Counting → Get](reference/API/AI/Setup/Cross%20Counting/Get.md) | This API is used to get parameter for AI > Setup > Cross Counting page. |
| [Setup / Cross Counting → Range](reference/API/AI/Setup/Cross%20Counting/Range.md) | This API is used to get parameter range for AI > Setup > Cross Counting page. |
| [Setup / Cross Counting → Set](reference/API/AI/Setup/Cross%20Counting/Set.md) | This API is used to set parameter for AI > Setup > Cross Counting page. |
| [Setup / Crowd Density Detection → API](reference/API/AI/Setup/Crowd%20Density%20Detection/API.md) | This API is used for get or set Crowd Density Detection page parameters. |
| [Setup / Crowd Density Detection → Get](reference/API/AI/Setup/Crowd%20Density%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Crowd Density Detection page. |
| [Setup / Crowd Density Detection → Range](reference/API/AI/Setup/Crowd%20Density%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Crowd Density Detection page. |
| [Setup / Crowd Density Detection → Set](reference/API/AI/Setup/Crowd%20Density%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Crowd Density Detection page. |
| [Setup / Face Detection → API](reference/API/AI/Setup/Face%20Detection/API.md) | This API is used for get or set Face Detection config parameters。 |
| [Setup / Face Detection → Get](reference/API/AI/Setup/Face%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Face Detection page. |
| [Setup / Face Detection → Range](reference/API/AI/Setup/Face%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Face Detection page. |
| [Setup / Face Detection → Set](reference/API/AI/Setup/Face%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Face Detection page. |
| [Setup / Heat Map → API](reference/API/AI/Setup/Heat%20Map/API.md) | This API is used to get or set Heat Map configuration parameters. |
| [Setup / Heat Map → Get](reference/API/AI/Setup/Heat%20Map/Get.md) | This API is used to get parameter for AI > Setup > Heat Map page. |
| [Setup / Heat Map → Range](reference/API/AI/Setup/Heat%20Map/Range.md) | This API is used to get parameter range for AI > Setup > Heat Map page. |
| [Setup / Heat Map → Set](reference/API/AI/Setup/Heat%20Map/Set.md) | This API is used to set parameter for AI > Setup > Heat Map page. |
| [Setup / Human & Vehicle Detection → API](reference/API/AI/Setup/Human%20&%20Vehicle%20Detection/API.md) | This API is used for get or set PVD page parameters. |
| [Setup / Human & Vehicle Detection → Get](reference/API/AI/Setup/Human%20&%20Vehicle%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Human & Vehicle Detection page. |
| [Setup / Human & Vehicle Detection → Range](reference/API/AI/Setup/Human%20&%20Vehicle%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Human & Vehicle Detection page. |
| [Setup / Human & Vehicle Detection → Set](reference/API/AI/Setup/Human%20&%20Vehicle%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Human & Vehicle Detection page. |
| [Setup / Intrusion → API](reference/API/AI/Setup/Intrusion/API.md) | This API is used for get or set AI > Setup > Intrusion parameters. |
| [Setup / Intrusion → Get](reference/API/AI/Setup/Intrusion/Get.md) | This API is used to get AI > Setup > Intrusion configuration parameters. |
| [Setup / Intrusion → Range](reference/API/AI/Setup/Intrusion/Range.md) | This API is used to get AI > Setup > Intrusion configuration parameter scope. |
| [Setup / Intrusion → Set](reference/API/AI/Setup/Intrusion/Set.md) | This API is used to set AI > Setup > Intrusion configuration parameters. |
| [Setup / License Plate Detection → API](reference/API/AI/Setup/License%20Plate%20Detection/API.md) | This API is used for get or set LPD page parameters. |
| [Setup / License Plate Detection → Get](reference/API/AI/Setup/License%20Plate%20Detection/Get.md) | This API is used to get parameter for AI > Setup > License Plate Detection page. |
| [Setup / License Plate Detection → Range](reference/API/AI/Setup/License%20Plate%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > License Plate Detection page. |
| [Setup / License Plate Detection → Set](reference/API/AI/Setup/License%20Plate%20Detection/Set.md) | This API is used to set parameter for AI > Setup > License Plate Detection page. |
| [Setup / Line Crossing Detection → API](reference/API/AI/Setup/Line%20Crossing%20Detection/API.md) | This API is used to get or set Line Crossing Detection configuration parameters. |
| [Setup / Line Crossing Detection → Get](reference/API/AI/Setup/Line%20Crossing%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Line Crossing Detection page. |
| [Setup / Line Crossing Detection → Range](reference/API/AI/Setup/Line%20Crossing%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Line Crossing Detection page. |
| [Setup / Line Crossing Detection → Set](reference/API/AI/Setup/Line%20Crossing%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Line Crossing Detection page. |
| [Setup / Queue Lenght Detection → API](reference/API/AI/Setup/Queue%20Lenght%20Detection/API.md) | This API is used for get or set Queue Lenght Detection page parameters. |
| [Setup / Queue Lenght Detection → Get](reference/API/AI/Setup/Queue%20Lenght%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Queue Lenght Detection page. |
| [Setup / Queue Lenght Detection → Range](reference/API/AI/Setup/Queue%20Lenght%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Queue Lenght Detection page. |
| [Setup / Queue Lenght Detection → Set](reference/API/AI/Setup/Queue%20Lenght%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Queue Lenght Detection page. |
| [Setup / Rare Sound Detection → API](reference/API/AI/Setup/Rare%20Sound%20Detection/API.md) | This API is used for get or set Rare Sound Detection page parameters. |
| [Setup / Rare Sound Detection → Get](reference/API/AI/Setup/Rare%20Sound%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Rare Sound Detection page. |
| [Setup / Rare Sound Detection → Range](reference/API/AI/Setup/Rare%20Sound%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Rare Sound Detection page. |
| [Setup / Rare Sound Detection → Set](reference/API/AI/Setup/Rare%20Sound%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Rare Sound Detection page. |
| [Setup / Region_Entrance → API](reference/API/AI/Setup/Region_Entrance/API.md) | This API is used for get or set AI > Setup > Region Entrance parameters. |
| [Setup / Region_Entrance → Get](reference/API/AI/Setup/Region_Entrance/Get.md) | This API is used to get AI > Setup > Region Entrance configuration parameters. |
| [Setup / Region_Entrance → Range](reference/API/AI/Setup/Region_Entrance/Range.md) | This API is used to get AI > Setup > Region Entrance configuration parameter scope. |
| [Setup / Region_Entrance → Set](reference/API/AI/Setup/Region_Entrance/Set.md) | This API is used to set AI > Setup > Region Entrance configuration parameters. |
| [Setup / Region_Exiting → API](reference/API/AI/Setup/Region_Exiting/API.md) | This API is used for get or set AI > Setup > Region Exiting parameters. |
| [Setup / Region_Exiting → Get](reference/API/AI/Setup/Region_Exiting/Get.md) | This API is used to get AI > Setup > Region Exiting configuration parameters. |
| [Setup / Region_Exiting → Range](reference/API/AI/Setup/Region_Exiting/Range.md) | This API is used to get AI > Setup > Region Exiting configuration parameter scope. |
| [Setup / Region_Exiting → Set](reference/API/AI/Setup/Region_Exiting/Set.md) | This API is used to set AI > Setup > Region Exiting configuration parameters. |
| [Setup / Stationary Object Detection → API](reference/API/AI/Setup/Stationary%20Object%20Detection/API.md) | This API is used for get or set SOD page parameters. |
| [Setup / Stationary Object Detection → Get](reference/API/AI/Setup/Stationary%20Object%20Detection/Get.md) | This API is used to get parameter for AI > Setup > Stationary Object Detection page. |
| [Setup / Stationary Object Detection → Range](reference/API/AI/Setup/Stationary%20Object%20Detection/Range.md) | This API is used to get parameter range for AI > Setup > Stationary Object Detection page. |
| [Setup / Stationary Object Detection → Set](reference/API/AI/Setup/Stationary%20Object%20Detection/Set.md) | This API is used to set parameter for AI > Setup > Stationary Object Detection page. |
| [Snaped_face_or_object → API](reference/API/AI/Snaped_face_or_object/API.md) | Used to obtain AI > Snaped face or object alarm real-time appeal. |
| [Snaped_face_or_object → Get](reference/API/AI/Snaped_face_or_object/Get.md) | This API is used to get AI > Snaped face or object alarm real-time appeal. |
| [Statastics (NVR dedicated) / Cross Counting Statistics → API](reference/API/AI/Statastics%20(NVR%20dedicated)/Cross%20Counting%20Statistics/API.md) | This API is used to get CC statistics and set CCt parameters. |
| [Statastics (NVR dedicated) / Cross Counting Statistics → Get](reference/API/AI/Statastics%20(NVR%20dedicated)/Cross%20Counting%20Statistics/Get.md) | This API is used to get CC statistics. |
| [Statastics (NVR dedicated) / Cross Counting Statistics → Range](reference/API/AI/Statastics%20(NVR%20dedicated)/Cross%20Counting%20Statistics/Range.md) | This API is used to get parameter for AI > Statistics > Cross Counting Statistics page. |
| [Statastics (NVR dedicated) / Cross Counting Statistics → Search](reference/API/AI/Statastics%20(NVR%20dedicated)/Cross%20Counting%20Statistics/Search.md) | This API is used to search CC statistics. |
| [Statastics (NVR dedicated) / Cross Counting Statistics → Set](reference/API/AI/Statastics%20(NVR%20dedicated)/Cross%20Counting%20Statistics/Set.md) | This API is used to set CCt parameters. |
| [Statastics (NVR dedicated) / Face Search → API](reference/API/AI/Statastics%20(NVR%20dedicated)/Face%20Search/API.md) | This API is used to get or search face statistics. |
| [Statastics (NVR dedicated) / Face Search → Get](reference/API/AI/Statastics%20(NVR%20dedicated)/Face%20Search/Get.md) | This API is used to get face statistics. |
| [Statastics (NVR dedicated) / Face Search → Search](reference/API/AI/Statastics%20(NVR%20dedicated)/Face%20Search/Search.md) | This API is used to search face statistics。 |
| [Statastics (NVR dedicated) / Heat Map Statistics → API](reference/API/AI/Statastics%20(NVR%20dedicated)/Heat%20Map%20Statistics/API.md) | This API is used to get heat map statistics or set alarm attribute detection parameters. |
| [Statastics (NVR dedicated) / Heat Map Statistics → Get](reference/API/AI/Statastics%20(NVR%20dedicated)/Heat%20Map%20Statistics/Get.md) | This API is used to get Heat Map statistics. |
| [Statastics (NVR dedicated) / Heat Map Statistics → Range](reference/API/AI/Statastics%20(NVR%20dedicated)/Heat%20Map%20Statistics/Range.md) | This API is used to get parameter range for AI >Statistics > Heat Map Statistics page. |
| [Statastics (NVR dedicated) / Heat Map Statistics → Search](reference/API/AI/Statastics%20(NVR%20dedicated)/Heat%20Map%20Statistics/Search.md) | This API is used to search alarm attribute detection parameters. |
| [Statastics (NVR dedicated) / Heat Map Statistics → Set](reference/API/AI/Statastics%20(NVR%20dedicated)/Heat%20Map%20Statistics/Set.md) | This API is used to set alarm attribute detection parameters. |
| [Statastics (NVR dedicated) / Hman & Vehicle Search → API](reference/API/AI/Statastics%20(NVR%20dedicated)/Hman%20&%20Vehicle%20Search/API.md) | This API is used to get object statistics. |
| [Statastics (NVR dedicated) / Hman & Vehicle Search → Get](reference/API/AI/Statastics%20(NVR%20dedicated)/Hman%20&%20Vehicle%20Search/Get.md) | This API is used to get object statistics. |

## API / Alarm

| Endpoint | Use |
|---|---|
| [CombinationAlarm → API](reference/API/Alarm/CombinationAlarm/API.md) | This API is used to get or set combined alarm parameters. |
| [CombinationAlarm → Get](reference/API/Alarm/CombinationAlarm/Get.md) | This API is used to get Combination Alarm parameters. |
| [CombinationAlarm → Range](reference/API/Alarm/CombinationAlarm/Range.md) | This API is used to get the combined alarm parameter range. |
| [CombinationAlarm → Set](reference/API/Alarm/CombinationAlarm/Set.md) | This API is used to set combined alarm parameters. |
| [CrossCounting → API](reference/API/Alarm/CrossCounting/API.md) | This API is used to get or set the line crossing statistics alarm configuration parameters. |
| [CrossCounting → Get](reference/API/Alarm/CrossCounting/Get.md) | This API is used to get Alarm > Cross Counting configuration parameters. |
| [CrossCounting → Range](reference/API/Alarm/CrossCounting/Range.md) | This API is used to get the Alarm > Cross Counting configuration parameter range. |
| [CrossCounting → Set](reference/API/Alarm/CrossCounting/Set.md) | This API is used to set Alarm > Cross Counting configuration parameters. |
| [Disarming → API](reference/API/Alarm/Disarming/API.md) | This API is used to get or set one key disarm parameters. |
| [Disarming → Get](reference/API/Alarm/Disarming/Get.md) | This API is used to get Alarm > Disarming parameters. |
| [Disarming → Range](reference/API/Alarm/Disarming/Range.md) | This API is used to get Alarm > Disarming parameter range. |
| [Disarming → Set](reference/API/Alarm/Disarming/Set.md) | This API is used to set Alarm > Disarming parameters. |
| [Exception → API](reference/API/Alarm/Exception/API.md) | This API is used fo get or set Exception parameters. |
| [Exception → Get](reference/API/Alarm/Exception/Get.md) | This API is used to get parameter for Alarm > Exception. |
| [Exception → Range](reference/API/Alarm/Exception/Range.md) | This API is used to get the parameter range of Alarm > Exception. |
| [Exception → Set](reference/API/Alarm/Exception/Set.md) | This API is used to set parameter for Alarm>Exception. |
| [FaceDetection → API](reference/API/Alarm/FaceDetection/API.md) | This API is used to get or set face detection configuration parameters. |
| [FaceDetection → Get](reference/API/Alarm/FaceDetection/Get.md) | This API is used to get Alarm > Face Detection parameters. |
| [FaceDetection → Range](reference/API/Alarm/FaceDetection/Range.md) | This API is used to get Alarm > Face Detection parameter range. |
| [FaceDetection → Set](reference/API/Alarm/FaceDetection/Set.md) | This API is used to set Alarm > Face Detection parameters. |
| [Flood-light → API](reference/API/Alarm/Flood-light/API.md) | This API is used for get or set flood light parameters. |
| [Flood-light → Default](reference/API/Alarm/Flood-light/Default.md) | — |
| [Flood-light → Get](reference/API/Alarm/Flood-light/Get.md) | This API is used to get parameter for Alarm > Flood-light. |
| [Flood-light → Range](reference/API/Alarm/Flood-light/Range.md) | This API is used to get the parameter range of Alarm > Floodlight. |
| [Flood-light → Set](reference/API/Alarm/Flood-light/Set.md) | This API is used to set parameter for Alarm > Flood-light. |
| [IO Alarm → API](reference/API/Alarm/IO%20Alarm/API.md) | This API is used for get or set IO Alarm parameters. |
| [IO Alarm → Get](reference/API/Alarm/IO%20Alarm/Get.md) | This API is used to get parameter for Alarm > IO Alarm. |
| [IO Alarm → Range](reference/API/Alarm/IO%20Alarm/Range.md) | This API is used to get the parameter range of Alarm > IO Alarm. |
| [IO Alarm → Set](reference/API/Alarm/IO%20Alarm/Set.md) | This API is used to get parameter for Alarm > IO Alarm . |
| [IntelligentAnalysis → API](reference/API/Alarm/IntelligentAnalysis/API.md) | This API is used to get or set smart analysis configuration parameters. |
| [IntelligentAnalysis → Get](reference/API/Alarm/IntelligentAnalysis/Get.md) | This API is used to get Alarm > Intelligent Analysis configuration parameters. |
| [IntelligentAnalysis → Range](reference/API/Alarm/IntelligentAnalysis/Range.md) | This API is used to get Alarm > Intelligent Analysis configuration parameter scope. |
| [IntelligentAnalysis → Set](reference/API/Alarm/IntelligentAnalysis/Set.md) | This API is used to set Alarm > Intelligent Analysis configuration parameters. |
| [Line Crossing Detection → API](reference/API/Alarm/Line%20Crossing%20Detection/API.md) | This API is used for get or set LCD config parameters. |
| [Line Crossing Detection → Get](reference/API/Alarm/Line%20Crossing%20Detection/Get.md) | This API is used to get parameter for Alarm > Line Crossing Detection. |
| [Line Crossing Detection → Range](reference/API/Alarm/Line%20Crossing%20Detection/Range.md) | This API is used to get the parameter range of Alarm > Line Crossing Detection. |
| [Line Crossing Detection → Set](reference/API/Alarm/Line%20Crossing%20Detection/Set.md) | This API is used to set parameter for Alarm > Line Crossing Detection . |
| [LinkageSchedule → API](reference/API/Alarm/LinkageSchedule/API.md) | This API is used to get or set linkage schedule parameters. |
| [LinkageSchedule → Get](reference/API/Alarm/LinkageSchedule/Get.md) | This API is used to get Alarm > Linkage Schedule parameters. |
| [LinkageSchedule → Range](reference/API/Alarm/LinkageSchedule/Range.md) | This API is used to get Alarm > Linkage Schedule parameter range. |
| [LinkageSchedule → Set](reference/API/Alarm/LinkageSchedule/Set.md) | This API is used to set Alarm > Linkage Schedule parameters. |
| [Motion Alarm → API](reference/API/Alarm/Motion%20Alarm/API.md) | This API is used for get or set Motion Alarm parameters. |
| [Motion Alarm → Get](reference/API/Alarm/Motion%20Alarm/Get.md) | This API is used to get parameter for Alarm > MOtion Alarm. |
| [Motion Alarm → Range](reference/API/Alarm/Motion%20Alarm/Range.md) | This API is used to get the parameter range of Alarm > MOtion Alarm. |
| [Motion Alarm → Set](reference/API/Alarm/Motion%20Alarm/Set.md) | This API is used to set parameter for Alarm > Motion Alarm. |
| [Occlusion Detection → API](reference/API/Alarm/Occlusion%20Detection/API.md) | This API is used for get or set OcclusionDetectionconfig parameters. |
| [Occlusion Detection → Get](reference/API/Alarm/Occlusion%20Detection/Get.md) | This API is used to get Alarm > Occlusion Detection config parameter. |
| [Occlusion Detection → Range](reference/API/Alarm/Occlusion%20Detection/Range.md) | This API is used to get the parameter range of Alarm > Occlusion Detection. |
| [Occlusion Detection → Set](reference/API/Alarm/Occlusion%20Detection/Set.md) | This API is used to set parameter for Alarm > Occlusion Detection. |
| [PIR → API](reference/API/Alarm/PIR/API.md) | This API is used for get or set PIR parameters. |
| [PIR → Get](reference/API/Alarm/PIR/Get.md) | This API is used to get parameter for Alarm > PIR. |
| [PIR → Range](reference/API/Alarm/PIR/Range.md) | This API is used to get the parameter range of Alarm > PIR. |
| [PIR → Set](reference/API/Alarm/PIR/Set.md) | This API is used to set parameter for Alarm > PIR . |
| [PTZ Linkage → API](reference/API/Alarm/PTZ%20Linkage/API.md) | This API is used to get or set PTK Linkage alarm parameters. |
| [PTZ Linkage → Get](reference/API/Alarm/PTZ%20Linkage/Get.md) | This API is used to get parameter for Alarm > PTZ Linkage. |
| [PTZ Linkage → Range](reference/API/Alarm/PTZ%20Linkage/Range.md) | This API is used to get the parameter range of Alarm > PTZ Linkage. |
| [PTZ Linkage → Set](reference/API/Alarm/PTZ%20Linkage/Set.md) | This API is used to set parameter for Alarm > PTZ Linkage. |
| [PedestrianDetection → API](reference/API/Alarm/PedestrianDetection/API.md) | This API is used to get or set pedestrian detection configuration parameters. |
| [PedestrianDetection → Get](reference/API/Alarm/PedestrianDetection/Get.md) | This API is used to get Alarm > Pedestrian Detection configuration parameters. |
| [PedestrianDetection → Range](reference/API/Alarm/PedestrianDetection/Range.md) | This API is used to get Alarm > Pedestrian Detection configuration parameters range. |
| [PedestrianDetection → Set](reference/API/Alarm/PedestrianDetection/Set.md) | This API is used to set Alarm > Pedestrian Detection configuration parameters. |
| [Perimeter Intrusion Detection → API](reference/API/Alarm/Perimeter%20Intrusion%20Detection/API.md) | This API is used for get or set PID parameters. |
| [Perimeter Intrusion Detection → Get](reference/API/Alarm/Perimeter%20Intrusion%20Detection/Get.md) | This API is used to get parameter for Alarm > Perimeter Intrusion Detection. |
| [Perimeter Intrusion Detection → Range](reference/API/Alarm/Perimeter%20Intrusion%20Detection/Range.md) | This API is used to get the parameter range of Alarm > Perimeter Intrusion Detection. |
| [Perimeter Intrusion Detection → Set](reference/API/Alarm/Perimeter%20Intrusion%20Detection/Set.md) | This API is used to set parameter for Alarm > Perimeter Intrusion Detection. |
| [Sound Detection → API](reference/API/Alarm/Sound%20Detection/API.md) | This API is used for get or set SoundDetection config parameters. |
| [Sound Detection → Get](reference/API/Alarm/Sound%20Detection/Get.md) | This API is used to get parameter for Alarm > Sound Detection. |
| [Sound Detection → Range](reference/API/Alarm/Sound%20Detection/Range.md) | This API is used to get the parameter range of Alarm > Sound Detection . |
| [Sound Detection → Set](reference/API/Alarm/Sound%20Detection/Set.md) | This API is used to set parameter for Alarm > Sound Detection. |
| [Stationary Object Detection → API](reference/API/Alarm/Stationary%20Object%20Detection/API.md) | This API is used for get or set SOD config parameters. |
| [Stationary Object Detection → Get](reference/API/Alarm/Stationary%20Object%20Detection/Get.md) | This API is used to get parameter for Alarm > Stationary Object Detection. |
| [Stationary Object Detection → Range](reference/API/Alarm/Stationary%20Object%20Detection/Range.md) | This API is used to get the parameter range of Alarm > Stationary Object Detection. |
| [Stationary Object Detection → Set](reference/API/Alarm/Stationary%20Object%20Detection/Set.md) | This API is used to set parameter for Alarm > Stationary Object Detection. |
| [VoiceAlarm → API](reference/API/Alarm/VoiceAlarm/API.md) | This API is used to get or set sound alarm parameters. |
| [VoiceAlarm → Delete](reference/API/Alarm/VoiceAlarm/Delete.md) | This API is used to delete imported audio files. |
| [VoiceAlarm → Get](reference/API/Alarm/VoiceAlarm/Get.md) | This API is used to get Alarm > Voice Alarm parameters. |
| [VoiceAlarm → Import](reference/API/Alarm/VoiceAlarm/Import.md) | This API is used to import alert audio files. |
| [VoiceAlarm → Range](reference/API/Alarm/VoiceAlarm/Range.md) | This API is used to get Alarm > Voice Alarm parameter range. |
| [VoiceAlarm → Set](reference/API/Alarm/VoiceAlarm/Set.md) | This API is used to set Alarm > Voice Alarm parameters. |
| [VoicePrompts → API](reference/API/Alarm/VoicePrompts/API.md) | This API is used to get or set language broadcast configuration parameters. |
| [VoicePrompts → Get](reference/API/Alarm/VoicePrompts/Get.md) | This API is used to get Alarm > Voice Prompts configuration parameters. |
| [VoicePrompts → Range](reference/API/Alarm/VoicePrompts/Range.md) | This API is used to get Alarm > Voice Prompts configuration parameter range. |
| [VoicePrompts → Set](reference/API/Alarm/VoicePrompts/Set.md) | This API is used to set Alarm > Voice Prompts configuration parameters. |

## API / Channel

| Endpoint | Use |
|---|---|
| [Channel Configuration / Analog Channel → API](reference/API/Channel/Channel%20Configuration/Analog%20Channel/API.md) | This API is used to get or set Analog Channel page parameters. |
| [Channel Configuration / Analog Channel → Get](reference/API/Channel/Channel%20Configuration/Analog%20Channel/Get.md) | This API is used to get Channel > Analog Channel page parameters. |
| [Channel Configuration / Analog Channel → Range](reference/API/Channel/Channel%20Configuration/Analog%20Channel/Range.md) | This API is used to get parameter range for Channel > Analog Channel page. |
| [Channel Configuration / Analog Channel → Set](reference/API/Channel/Channel%20Configuration/Analog%20Channel/Set.md) | This API is used to set Channel > Analog Channel page parameters. |
| [Channel Configuration / Broadcast IPC → API](reference/API/Channel/Channel%20Configuration/Broadcast%20IPC/API.md) | This API is used to broadcast search or modify IPC information. |
| [Channel Configuration / Broadcast IPC → Range](reference/API/Channel/Channel%20Configuration/Broadcast%20IPC/Range.md) | This API is used to get parameter range for Channel > Channel Configuration > Broadcast IPC page. |
| [Channel Configuration / Broadcast IPC → Search](reference/API/Channel/Channel%20Configuration/Broadcast%20IPC/Search.md) | This API is used to broadcast search IPC information. |
| [Channel Configuration / Broadcast IPC → Set](reference/API/Channel/Channel%20Configuration/Broadcast%20IPC/Set.md) | This API is used to broadcast set IPC information. |
| [Channel Configuration / Channel Configuration → API](reference/API/Channel/Channel%20Configuration/Channel%20Configuration/API.md) | This API is used to get or set Channel Configuration page parameters. |
| [Channel Configuration / Channel Configuration → Get](reference/API/Channel/Channel%20Configuration/Channel%20Configuration/Get.md) | This API is used to get Channel > Channel Configuration page parameters. |
| [Channel Configuration / Channel Configuration → Range](reference/API/Channel/Channel%20Configuration/Channel%20Configuration/Range.md) | This API is used to get parameter range for Channel > Channel Configuration page. |
| [Channel Configuration / Channel Configuration → Set](reference/API/Channel/Channel%20Configuration/Channel%20Configuration/Set.md) | This API is used to set Channel > Channel Configuration page parameters. |
| [Channel Configuration / IPChannel → API](reference/API/Channel/Channel%20Configuration/IPChannel/API.md) | This API is used to get or set IPChannel page parameters. |
| [Channel Configuration / IPChannel → AutoAddIPC](reference/API/Channel/Channel%20Configuration/IPChannel/AutoAddIPC.md) | This API is used to automatically broadcast add IPC. |
| [Channel Configuration / IPChannel → Get](reference/API/Channel/Channel%20Configuration/IPChannel/Get.md) | This API is used to get Channel > IPChannel page parameters. |
| [Channel Configuration / IPChannel → Range](reference/API/Channel/Channel%20Configuration/IPChannel/Range.md) | This API is used to get parameter range for Channel > IPChannel page. |
| [Channel Configuration / IPChannel → Set](reference/API/Channel/Channel%20Configuration/IPChannel/Set.md) | This API is used to set Channel > IPChannel page parameters. |
| [Channel Configuration / Protocol Manage → API](reference/API/Channel/Channel%20Configuration/Protocol%20Manage/API.md) | This API is used to get or set Protocol Manage page parameters. |
| [Channel Configuration / Protocol Manage → Get](reference/API/Channel/Channel%20Configuration/Protocol%20Manage/Get.md) | This API is used to get Channel > Protocol Manage page parameters. |
| [Channel Configuration / Protocol Manage → Range](reference/API/Channel/Channel%20Configuration/Protocol%20Manage/Range.md) | This API is used to get parameter range for Channel > Protocol Manage page. |
| [Channel Configuration / Protocol Manage → Set](reference/API/Channel/Channel%20Configuration/Protocol%20Manage/Set.md) | This API is used to set Channel > Protocol Manage page parameters. |
| [Channel Configuration / Wireless Camera → API](reference/API/Channel/Channel%20Configuration/Wireless%20Camera/API.md) | This API is used to get or set Wireless Camera page parameters. |
| [Channel Configuration / Wireless Camera → Get](reference/API/Channel/Channel%20Configuration/Wireless%20Camera/Get.md) | This API is used to get Channel > Wireless Camera page parameters. |
| [Channel Configuration / Wireless Camera → Range](reference/API/Channel/Channel%20Configuration/Wireless%20Camera/Range.md) | This API is used to get parameter range for Channel > Wireless Camera page. |
| [Channel Configuration / Wireless Camera → Set](reference/API/Channel/Channel%20Configuration/Wireless%20Camera/Set.md) | This API is used to set Channel > Wireless Camera page parameters. |
| [Image Control → API](reference/API/Channel/Image%20Control/API.md) | This API is used to get or set Image Control page parameters. |
| [Image Control → Default](reference/API/Channel/Image%20Control/Default.md) | This API is used to get Channel > Image Control page parameters. |
| [Image Control → Get](reference/API/Channel/Image%20Control/Get.md) | This API is used to get Channel > Image Control page parameters. |
| [Image Control → Range](reference/API/Channel/Image%20Control/Range.md) | This API is used to get parameter range for Channel > Image Control page. |
| [Image Control → Set](reference/API/Channel/Image%20Control/Set.md) | This API is used to set Channel > Image Control page parameters. |
| [OSD → API](reference/API/Channel/OSD/API.md) | This API is used to get or set Video Cover page parameters. |
| [OSD → Get](reference/API/Channel/OSD/Get.md) | This API is used to get Channel > OSD page parameters. |
| [OSD → Range](reference/API/Channel/OSD/Range.md) | This API is used to get parameter range for Channel > OSD page. |
| [OSD → Set](reference/API/Channel/OSD/Set.md) | This API is used to set Channel > OSD page parameters. |
| [POE Power → API](reference/API/Channel/POE%20Power/API.md) | This API is used to get POE Power page parameters. |
| [POE Power → Get](reference/API/Channel/POE%20Power/Get.md) | This API is used to get Channel > POE Power page parameters. |
| [PTZ → API](reference/API/Channel/PTZ/API.md) | This API is used to get or set PTZ page parameters. |
| [PTZ → Get](reference/API/Channel/PTZ/Get.md) | This API is used to get Channel > PTZ page parameters. |
| [PTZ → Range](reference/API/Channel/PTZ/Range.md) | This API is used to get parameter range for Channel > PTZ page. |
| [PTZ → Set](reference/API/Channel/PTZ/Set.md) | This API is used to set Channel > PTZ page parameters. |
| [ROI → API](reference/API/Channel/ROI/API.md) | This API is used to get or set ROI page parameters. |
| [ROI → Get](reference/API/Channel/ROI/Get.md) | This API is used to get Channel > ROI page parameters. |
| [ROI → Range](reference/API/Channel/ROI/Range.md) | This API is used to get parameter range for Channel > ROI page. |
| [ROI → Set](reference/API/Channel/ROI/Set.md) | This API is used to set Channel > ROI page parameters. |
| [Remote Pair → API](reference/API/Channel/Remote%20Pair/API.md) | This API is used to set up remote pairing. |
| [Remote Pair → Range](reference/API/Channel/Remote%20Pair/Range.md) | This API is used to get a range of remote pairing parameters. |
| [Remote Pair → Set](reference/API/Channel/Remote%20Pair/Set.md) | This API is used to set up remote pairing. |
| [Scheduled Tasks → API](reference/API/Channel/Scheduled%20Tasks/API.md) | This API is used to get or set for the Scheduled Tasks page |
| [Scheduled Tasks → Get](reference/API/Channel/Scheduled%20Tasks/Get.md) | This API is used to get Channel > Scheduled Tasks Page parameters. |
| [Scheduled Tasks → Range](reference/API/Channel/Scheduled%20Tasks/Range.md) | This API is used to get Channel > Scheduled Tasks parameter scale。 |
| [Scheduled Tasks → Set](reference/API/Channel/Scheduled%20Tasks/Set.md) | This API is used to Set Channel > Scheduled Tasks Page parameters. |
| [Video Color → API](reference/API/Channel/Video%20Color/API.md) | This API is used to get or set Video Color page parameters. |
| [Video Color → Default](reference/API/Channel/Video%20Color/Default.md) | This API is used to get Channel > Video Color page parameters. |
| [Video Color → Get](reference/API/Channel/Video%20Color/Get.md) | This API is used to get Channel > Video Color page parameters. |
| [Video Color → Range](reference/API/Channel/Video%20Color/Range.md) | This API is used to get parameter range for Channel > Video Color page. |
| [Video Color → Set](reference/API/Channel/Video%20Color/Set.md) | This API is used to set Channel > Video Color page parameters. |
| [Video Cover → API](reference/API/Channel/Video%20Cover/API.md) | This API is used to get or set Video Cover page parameters. |
| [Video Cover → Get](reference/API/Channel/Video%20Cover/Get.md) | This API is used to get Channel > Video Cover page parameters. |
| [Video Cover → Range](reference/API/Channel/Video%20Cover/Range.md) | This API is used to get parameter range for Channel > Video Cover page. |
| [Video Cover → Set](reference/API/Channel/Video%20Cover/Set.md) | This API is used to set Channel > Video Color page parameters. |
| [Video Crop → API](reference/API/Channel/Video%20Crop/API.md) | This API is used to get or set Video Crop page parameters. |
| [Video Crop → Get](reference/API/Channel/Video%20Crop/Get.md) | This API is used to get Channel > Video Crop page parameters. |
| [Video Crop → Range](reference/API/Channel/Video%20Crop/Range.md) | This API is used to get parameter range for Channel > Video Crop page. |
| [Video Crop → Set](reference/API/Channel/Video%20Crop/Set.md) | This API is used to set Channel > Video Crop page parameters. |

## API / ConsumerInfo

| Endpoint | Use |
|---|---|
| [Get](reference/API/ConsumerInfo/Get.md) | This API is used to get ConsumerInfo parameter。 |
| [Set](reference/API/ConsumerInfo/Set.md) | This API is used for setup ConsumerInfo parameter。 |

## API / Event

| Endpoint | Use |
|---|---|
| [Event_check&Event_push → API](reference/API/Event/Event_check&Event_push/API.md) | — |
| [Event_check&Event_push → Get&Push](reference/API/Event/Event_check&Event_push/Get&Push.md) | This API is used to get parameter for Event > event check page. |
| [Http_listening → API](reference/API/Event/Http_listening/API.md) | It is used to get or set the ALL ALARM config parameters. |
| [Http_listening → Get](reference/API/Event/Http_listening/Get.md) | This API is used to get parameter for Event > Http listening page. |
| [Http_listening → Range](reference/API/Event/Http_listening/Range.md) | This API is used to get parameter range for Event > Http listening page. |
| [Http_listening → Set](reference/API/Event/Http_listening/Set.md) | This API is used to set parameter for Event > Http listening page. |
| [Http_listening_Push related description / get → API](reference/API/Event/Http_listening_Push%20related%20description/get/API.md) | This API pushes alarms by Get. |
| [Http_listening_Push related description / get → Get](reference/API/Event/Http_listening_Push%20related%20description/get/Get.md) | This API is used to get parameter for Event > Http listening Push related description page. |
| [Http_listening_Push related description / keeplive → API](reference/API/Event/Http_listening_Push%20related%20description/keeplive/API.md) | This API device sends a liveliness request to the client server. |
| [Http_listening_Push related description / keeplive → KeepLive](reference/API/Event/Http_listening_Push%20related%20description/keeplive/KeepLive.md) | This API is used to get parameter for Event > Http listening Push related description page. |
| [Http_listening_Push related description / post → API](reference/API/Event/Http_listening_Push%20related%20description/post/API.md) | This API pushes alarms by POST. |
| [Http_listening_Push related description / post → POST](reference/API/Event/Http_listening_Push%20related%20description/post/POST.md) | This API is used to push Event > Http listening Push related description alarm event requests. |
| [Subscribe to api Design → Subscribe to api Design](reference/API/Event/Subscribe%20to%20api%20Design/Subscribe%20to%20api%20Design.md) | — |

## API / ExtendedFunctionality

| Endpoint | Use |
|---|---|
| [AI Mutex Relation → API](reference/API/ExtendedFunctionality/AI%20Mutex%20Relation/API.md) | This API is used for get AIMutexRelation parameters. |
| [AI Mutex Relation → GET](reference/API/ExtendedFunctionality/AI%20Mutex%20Relation/GET.md) | This API is used to get parameter for Extended Functionality > AIMutexRelation . |
| [IPCVoice Prompt → API](reference/API/ExtendedFunctionality/IPCVoice%20Prompt/API.md) | It is used to get or set the IPCVoice Prompt config parameters. |
| [IPCVoice Prompt → Get](reference/API/ExtendedFunctionality/IPCVoice%20Prompt/Get.md) | This API is used to get parameter for Extended Functionality > IPCVoice Prompt page. |
| [IPCVoice Prompt → Set](reference/API/ExtendedFunctionality/IPCVoice%20Prompt/Set.md) | — |
| [Mutex Relation → API](reference/API/ExtendedFunctionality/Mutex%20Relation/API.md) | This API is used to get MutexRelation parameter. |
| [Mutex Relation → Get](reference/API/ExtendedFunctionality/Mutex%20Relation/Get.md) | This API is used to get parameter for Extended Functionality > Mutex Relation page. |

## API / Function

| Endpoint | Use |
|---|---|
| [ANR → API](reference/API/Function/ANR/API.md) | This API is used to obtain client Macs. |
| [ANR → GetANRTimeInfo](reference/API/Function/ANR/GetANRTimeInfo.md) | This API is used to get parameter for Function > ANR page. |
| [ANR → GetClientMac](reference/API/Function/ANR/GetClientMac.md) | This API is used to set parameter for Function > ANR page. |
| [ANR → SetANRInfo](reference/API/Function/ANR/SetANRInfo.md) | This API is used to set parameter for Function > ANR page. |
| [ETR → API](reference/API/Function/ETR/API.md) | This API is used to obtain client Mac |
| [ETR → Set](reference/API/Function/ETR/Set.md) | This API is used to set parameter for Function > ETR page. |
| [Request I Frame → API](reference/API/Function/Request%20I%20Frame/API.md) | This API is used for get or setRequest I Frame page parameters. |
| [Request I Frame → Range](reference/API/Function/Request%20I%20Frame/Range.md) | This API is used to get parameter range for Function > Request I Frame page. |
| [Snapshot → API](reference/API/Function/Snapshot/API.md) | This API is used for get the information of Snapshot |
| [Snapshot → Get](reference/API/Function/Snapshot/Get.md) | This API is used to get parameter for Function > Snapshot page. |
| [Snapshot → Range](reference/API/Function/Snapshot/Range.md) | This API is used to get parameter range for Function > Snapshot page. |

## API / Login

| Endpoint | Use |
|---|---|
| [Account Rules → API](reference/API/Login/Account%20Rules/API.md) | — |
| [Account Rules → Get](reference/API/Login/Account%20Rules/Get.md) | Get user rule restrictions. |
| [DevicePage → API](reference/API/Login/DevicePage/API.md) | — |
| [DevicePage → Get](reference/API/Login/DevicePage/Get.md) | This API is used for get Remote Setting page parameters. |
| [DevicePage → Pages](reference/API/Login/DevicePage/Pages.md) | "Channel", |
| [FirstLogin / Password → API](reference/API/Login/FirstLogin/Password/API.md) | This API includes the API for setting the password for the first login of the device. |
| [FirstLogin / Password → Set](reference/API/Login/FirstLogin/Password/Set.md) | This API is used to set the password for the first login of the device. |
| [FirstLogin → API](reference/API/Login/FirstLogin/API.md) | This API includes the API for setting the password for the first login of the device. |
| [Login / ChannelInfo → API](reference/API/Login/Login/ChannelInfo/API.md) | This API includes APIs such as obtaining channel information after login. |
| [Login / ChannelInfo → Get](reference/API/Login/Login/ChannelInfo/Get.md) | This API is used to get channel information |
| [Login / DeviceInfo → API](reference/API/Login/Login/DeviceInfo/API.md) | This API is used to get device information after login. |
| [Login / DeviceInfo → Get](reference/API/Login/Login/DeviceInfo/Get.md) | Get device information. |
| [Login → API](reference/API/Login/Login/API.md) | This API includes APIs such as heartbeat, getting device information before and after login, and getting channel information. |
| [Login → Heartbeat](reference/API/Login/Login/Heartbeat.md) | This API is used to send heartbeat, and send a heartbeat request every 30s after login to ensure that the heartbeat does not expire after timeout. |
| [Login → Range](reference/API/Login/Login/Range.md) | This API is used to get device information before login. |
| [PreviewChannel / DualTalk → API](reference/API/Login/PreviewChannel/DualTalk/API.md) | This API includes getting and setting two-way intercom information. |
| [PreviewChannel / DualTalk → Get](reference/API/Login/PreviewChannel/DualTalk/Get.md) | This API is used to obtain two-way intercom information. |
| [PreviewChannel / DualTalk → Set](reference/API/Login/PreviewChannel/DualTalk/Set.md) | This API is used to control two-way intercom. |
| [PreviewChannel / Floodlight2AudioAlarm → API](reference/API/Login/PreviewChannel/Floodlight2AudioAlarm/API.md) | This API includes getting and setting flood light to audio alarm parameter. |
| [PreviewChannel / Floodlight2AudioAlarm → Get](reference/API/Login/PreviewChannel/Floodlight2AudioAlarm/Get.md) | This API is used to get light siren information. |
| [PreviewChannel / Floodlight2AudioAlarm → Set](reference/API/Login/PreviewChannel/Floodlight2AudioAlarm/Set.md) | This API contains parameters for setting light and sound sirens. |
| [PreviewChannel / ManualAlarm → API](reference/API/Login/PreviewChannel/ManualAlarm/API.md) | This API contains parameters for getting and setting lights and sounds for sirens. |
| [PreviewChannel / ManualAlarm → Get](reference/API/Login/PreviewChannel/ManualAlarm/Get.md) | This API contains parameters for setting light and sound sirens. |
| [PreviewChannel / ManualAlarm → Set](reference/API/Login/PreviewChannel/ManualAlarm/Set.md) | This API is used to control manual alarms. |
| [PreviewChannel / PTZ / Control → Progress](reference/API/Login/PreviewChannel/PTZ/Control/Progress.md) | This API is used to get PTZ status. |
| [PreviewChannel / PTZ → API](reference/API/Login/PreviewChannel/PTZ/API.md) | This API is used for getting control PTZ and PTZ status information or controlling PTZ. |
| [PreviewChannel / PTZ → Control](reference/API/Login/PreviewChannel/PTZ/Control.md) | This API is used to control PTZ. |
| [PreviewChannel / PTZ → Get](reference/API/Login/PreviewChannel/PTZ/Get.md) | This API is used to get PTZ control information. |
| [PreviewChannel → API](reference/API/Login/PreviewChannel/API.md) | This API includes Get PTZ Information, Control PTZ, Get Light Siren Information, Control Light Siren, Get DualTalk Information, Control DualTalk, Get Manual Alarm Information, Control Manual Alarm. |
| [RecoverPassword / Authorization → API](reference/API/Login/RecoverPassword/Authorization/API.md) | This API is used for getting or setting the recover password authorization parameters. |
| [RecoverPassword / Authorization → Get](reference/API/Login/RecoverPassword/Authorization/Get.md) | This API is used to get parameter for Login > RecoverPassword > Authorization page. |
| [RecoverPassword / Authorization → Range](reference/API/Login/RecoverPassword/Authorization/Range.md) | This API is used to obtain the verification parameter range for password recovery. |
| [RecoverPassword / Authorization → Set](reference/API/Login/RecoverPassword/Authorization/Set.md) | This API is used to set the verification question for recovering the password. |
| [RecoverPassword / Certificate → API](reference/API/Login/RecoverPassword/Certificate/API.md) | This API is used for exporting certificate API. |
| [RecoverPassword / Certificate → Export](reference/API/Login/RecoverPassword/Certificate/Export.md) | This API is used to export certificate API. |
| [RecoverPassword / Email → API](reference/API/Login/RecoverPassword/Email/API.md) | This API is used for sending verification code to email. |
| [RecoverPassword / Email → Send](reference/API/Login/RecoverPassword/Email/Send.md) | This API is used to send verification code to email. |
| [RecoverPassword → API](reference/API/Login/RecoverPassword/API.md) | This API includes APIs such as getting password recovery configuration parameters, getting password recovery page parameters, setting passwords, password recovery question verification parameters, verifying password recovery question answers, expo… |
| [RecoverPassword → Get](reference/API/Login/RecoverPassword/Get.md) | This API is used to obtain configuration parameters for retrieving passwords. |
| [RecoverPassword → Range](reference/API/Login/RecoverPassword/Range.md) | This API is used to get the range of RecoverPassword config parameters. |
| [RecoverPassword → Set](reference/API/Login/RecoverPassword/Set.md) | — |
| [Request pubkey or randbyte → API](reference/API/Login/Request%20pubkey%20or%20randbyte/API.md) | This API is used for requesting user password transmission encryption key and PBKDF2_SHA256 random number and user password transmission encryption key for logging in when the device is inactive. |
| [Request pubkey or randbyte → EncryptObjectTable](reference/API/Login/Request%20pubkey%20or%20randbyte/EncryptObjectTable.md) | base_enc_password Table information: |
| [Request pubkey or randbyte → Login](reference/API/Login/Request%20pubkey%20or%20randbyte/Login.md) | This API is used to transmit the user password to encrypted key, Used before login when device isnot activated. |
| [Request pubkey or randbyte → Maintenance](reference/API/Login/Request%20pubkey%20or%20randbyte/Maintenance.md) | This API is used for requesting user password transmission encryption key and PBKDF2_SHA256 random number and user password transmission encryption key for logging in when the device is inactive. |
| [Web → API](reference/API/Login/Web/API.md) | This API is used for login and logout API. |
| [Web → Login](reference/API/Login/Web/Login.md) | This API is used for login functionality. The client uses digest authentication to login; when the login is successful, in the http header, two fields are returned, Set-cookie and X-csrftoken;such as: |
| [Web → Logout](reference/API/Login/Web/Logout.md) | This API is used for logout. |

## API / Maintenance

| Endpoint | Use |
|---|---|
| [Auto Reboot → API](reference/API/Maintenance/Auto%20Reboot/API.md) | This API contains get and set to get auto restart page parameters. |
| [Auto Reboot → Get](reference/API/Maintenance/Auto%20Reboot/Get.md) | This API is used to get auto restart page parameters. |
| [Auto Reboot → Range](reference/API/Maintenance/Auto%20Reboot/Range.md) | This API is used to get the auto restart page parameter range. |
| [Auto Reboot → Set](reference/API/Maintenance/Auto%20Reboot/Set.md) | This API is used to set auto restart page parameters. |
| [DefoggingFan → API](reference/API/Maintenance/DefoggingFan/API.md) | This API is used for getting fan switch information and set fan switch. |
| [DefoggingFan → Get](reference/API/Maintenance/DefoggingFan/Get.md) | This API is used to get fan switch information. |
| [DefoggingFan → Range](reference/API/Maintenance/DefoggingFan/Range.md) | This API is used to get fan switch information range. |
| [DefoggingFan → Set](reference/API/Maintenance/DefoggingFan/Set.md) | This API is used to set fan switch. |
| [DeveloperMode → API](reference/API/Maintenance/DeveloperMode/API.md) | This API is used to get and set developer page parameters, clear and export log files. |
| [DeveloperMode → Clear](reference/API/Maintenance/DeveloperMode/Clear.md) | This API is used to clear configuration file which in disk. |
| [DeveloperMode → Download](reference/API/Maintenance/DeveloperMode/Download.md) | This API is used to download configuration file. |
| [DeveloperMode → Get](reference/API/Maintenance/DeveloperMode/Get.md) | This API is used to get the developer mode page parameters. |
| [DeveloperMode → Range](reference/API/Maintenance/DeveloperMode/Range.md) | This API is used to get the parameter range of the developer mode page. |
| [DeveloperMode → Set](reference/API/Maintenance/DeveloperMode/Set.md) | This API is used to set the Developer Mode configuration. |
| [DeveloperMode → Token](reference/API/Maintenance/DeveloperMode/Token.md) | This API is used to get Token. |
| [DeviceReboot → API](reference/API/Maintenance/DeviceReboot/API.md) | This API is used for rebooting device API. |
| [DeviceReboot → Set](reference/API/Maintenance/DeviceReboot/Set.md) | This API is used to reboot device. |
| [DeviceShutdown → API](reference/API/Maintenance/DeviceShutdown/API.md) | This API is used for device shutdown. |
| [DeviceShutdown → Set](reference/API/Maintenance/DeviceShutdown/Set.md) | This API is used to device shutdown. |
| [FtpUpgrade → API](reference/API/Maintenance/FtpUpgrade/API.md) | This API contains APIs for obtaining online upgrade parameters, setting update parameters, checking for updates, performing upgrades, and obtaining upgrade progress. |
| [FtpUpgrade → Check](reference/API/Maintenance/FtpUpgrade/Check.md) | This API is used to check for upgrade. |
| [FtpUpgrade → Get](reference/API/Maintenance/FtpUpgrade/Get.md) | This API is used to obtain online upgrade parameters. |
| [FtpUpgrade → Progress](reference/API/Maintenance/FtpUpgrade/Progress.md) | This API is used to get upgrade progress. |
| [FtpUpgrade → Range](reference/API/Maintenance/FtpUpgrade/Range.md) | This API is used to obtain the online upgrade parameter range. |
| [FtpUpgrade → Set](reference/API/Maintenance/FtpUpgrade/Set.md) | This API is used to set upgrade configuration. |
| [FtpUpgrade → Upgrade](reference/API/Maintenance/FtpUpgrade/Upgrade.md) | This API is used for online upgrades. |
| [IPCMaintenance / FtpIpcUpgrade → API](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/API.md) | This API is used for getting IPC ftp update parameters,setting IPC ftp update parameters、Check for IPC upgrade, IPC ftp upgrade and get IPC update progress. |
| [IPCMaintenance / FtpIpcUpgrade → Check](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Check.md) | This API is used to check for IPC upgrade. |
| [IPCMaintenance / FtpIpcUpgrade → Get](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Get.md) | This API is used to get IPC ftp update parameters. |
| [IPCMaintenance / FtpIpcUpgrade → Progress](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Progress.md) | This API is used to get IPC update progress. |
| [IPCMaintenance / FtpIpcUpgrade → Range](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Range.md) | This API is used to get range of IPC ftp update parameters. |
| [IPCMaintenance / FtpIpcUpgrade → Set](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Set.md) | This API is used to set IPC ftp update parameters. |
| [IPCMaintenance / FtpIpcUpgrade → Upgrade](reference/API/Maintenance/IPCMaintenance/FtpIpcUpgrade/Upgrade.md) | This API is used to IPC ftp upgrade. |
| [IPCMaintenance / IPCParamManagement → API](reference/API/Maintenance/IPCMaintenance/IPCParamManagement/API.md) | This API is used for getting IPC parameters for System > IPC Camera Maintain > Param Management page and import or export IPC configuration files. |
| [IPCMaintenance / IPCParamManagement → Export](reference/API/Maintenance/IPCMaintenance/IPCParamManagement/Export.md) | This API is used to export IPC configuration files. |
| [IPCMaintenance / IPCParamManagement → Get](reference/API/Maintenance/IPCMaintenance/IPCParamManagement/Get.md) | This API is used to get IPC parameters for System > IPC Camera Maintain > Param Management page. |
| [IPCMaintenance / IPCParamManagement → Import](reference/API/Maintenance/IPCMaintenance/IPCParamManagement/Import.md) | This API is used to NVR import IPC configuration files. |
| [IPCMaintenance / IPCParamManagement → Range](reference/API/Maintenance/IPCMaintenance/IPCParamManagement/Range.md) | This API is used to get IPC parameters range for [System > IPC Camera Maintain > Param Management* page. |
| [IPCMaintenance / IPCReboot → API](reference/API/Maintenance/IPCMaintenance/IPCReboot/API.md) | This API is used for get IPC parameter range, get IPC parameter and reboot IPC. |
| [IPCMaintenance / IPCReboot → Get](reference/API/Maintenance/IPCMaintenance/IPCReboot/Get.md) | This API is used to NVR get IPC parameter. |
| [IPCMaintenance / IPCReboot → Range](reference/API/Maintenance/IPCMaintenance/IPCReboot/Range.md) | This API is used to NVR get IPC parameter range. |
| [IPCMaintenance / IPCReboot → Set](reference/API/Maintenance/IPCMaintenance/IPCReboot/Set.md) | This API is used to reboot IPC. |
| [IPCMaintenance / IPCUpgrade → API](reference/API/Maintenance/IPCMaintenance/IPCUpgrade/API.md) | This API is used for get parameter for Remote Setting > System > IP Camera Maintain > Upgrade page,get IPC upgrade token and IPC upgrade. |
| [IPCMaintenance / IPCUpgrade → Get](reference/API/Maintenance/IPCMaintenance/IPCUpgrade/Get.md) | This API is used to get parameter for Remote Setting > System > IP Camera Maintain > Upgrade page. |
| [IPCMaintenance / IPCUpgrade → Range](reference/API/Maintenance/IPCMaintenance/IPCUpgrade/Range.md) | This API is used to get parameter range for Remote Setting > System > IP Camera Maintain > Upgrade page. |
| [IPCMaintenance / IPCUpgrade → Token](reference/API/Maintenance/IPCMaintenance/IPCUpgrade/Token.md) | This API is used to get IPC upgrade token. |
| [IPCMaintenance / IPCUpgrade → Upgrade](reference/API/Maintenance/IPCMaintenance/IPCUpgrade/Upgrade.md) | This API is used to IPC upgrade. |
| [IPCMaintenance / Load Default → API](reference/API/Maintenance/IPCMaintenance/Load%20Default/API.md) | This API is used for NVR get IPC parameter Remote Setting > System > IP Camera Maintain > Load Default page and reset IPC default parameters. |
| [IPCMaintenance / Load Default → Get](reference/API/Maintenance/IPCMaintenance/Load%20Default/Get.md) | This API is used to get IPC parameter for Remote Setting > System > Maintenance > Load Default page. |
| [IPCMaintenance / Load Default → Range](reference/API/Maintenance/IPCMaintenance/Load%20Default/Range.md) | This API is used to get IPC parameter range for Remote Setting > System > IP Camera Maintain > Load Default page. |
| [IPCMaintenance / Load Default → Set](reference/API/Maintenance/IPCMaintenance/Load%20Default/Set.md) | This API is used to reset IPC default parameters. |
| [IPCMaintenance → IPCUpgrade_Code](reference/API/Maintenance/IPCMaintenance/IPCUpgrade_Code.md) | \| Status \| Description \| |
| [Import_Export Parameter → API](reference/API/Maintenance/Import_Export%20Parameter/API.md) | This API is used for Importing and exporting configuration files. |
| [Import_Export Parameter → Get](reference/API/Maintenance/Import_Export%20Parameter/Get.md) | This API is used to export configuration files. |
| [Import_Export Parameter → Set](reference/API/Maintenance/Import_Export%20Parameter/Set.md) | This API is used to import and exporting configuration files. |
| [Load Default Parameter → API](reference/API/Maintenance/Load%20Default%20Parameter/API.md) | This API contains APIs for getting parameters for Load Default and loading the system default parameters. |
| [Load Default Parameter → Range](reference/API/Maintenance/Load%20Default%20Parameter/Range.md) | This API is used to get the parameter range for Load Default page. |
| [Load Default Parameter → Set](reference/API/Maintenance/Load%20Default%20Parameter/Set.md) | This API is used to reset system default configuration. |
| [Log → API](reference/API/Maintenance/Log/API.md) | This API is used for getting the system log information. |
| [Log → Get](reference/API/Maintenance/Log/Get.md) | This API is used to get the system log information. |
| [Log → Range](reference/API/Maintenance/Log/Range.md) | This API is used to get the range of system log information parameters. |
| [SystemUpgrade → API](reference/API/Maintenance/SystemUpgrade/API.md) | This API is used for getting system update token,upgrading system,system version check,system component version check,getting component upgrade token,upgrading component. |
| [SystemUpgrade → ComponentToken](reference/API/Maintenance/SystemUpgrade/ComponentToken.md) | This API is used to get component update token. |
| [SystemUpgrade → ComponentUpgrade](reference/API/Maintenance/SystemUpgrade/ComponentUpgrade.md) | This API is used to upgrade component. |
| [SystemUpgrade → ComponentVersionCheck](reference/API/Maintenance/SystemUpgrade/ComponentVersionCheck.md) | This API is used to component version check upgrade(NVR upgrade ipc component version date check). |
| [SystemUpgrade → Token](reference/API/Maintenance/SystemUpgrade/Token.md) | This API is used to get system upgrade Token. |
| [SystemUpgrade → Upgrade](reference/API/Maintenance/SystemUpgrade/Upgrade.md) | This API is used to upgrade system. |
| [SystemUpgrade → VersionCheck](reference/API/Maintenance/SystemUpgrade/VersionCheck.md) | This API is used to check for upgrade.(NVR needs to verify the version information in the ftp and http upgrade configuration files of IPC) |

## API / MutexParam

| Endpoint | Use |
|---|---|
| [API](reference/API/MutexParam/API.md) | — |
| [Get](reference/API/MutexParam/Get.md) | — |

## API / Nerwork

| Endpoint | Use |
|---|---|
| [DDNS → API](reference/API/Nerwork/DDNS/API.md) | This API is used for get or set or test DDNS parameters. |
| [DDNS → Get](reference/API/Nerwork/DDNS/Get.md) | This API is used to get parameter for Network>DDNS. |
| [DDNS → Range](reference/API/Nerwork/DDNS/Range.md) | This API is used to get the parameter range of Network > DDNS. |
| [DDNS → Set](reference/API/Nerwork/DDNS/Set.md) | This API is used to set parameter for Network > DDNS. |
| [DDNS → Test](reference/API/Nerwork/DDNS/Test.md) | This API is used to test parameter for Network > DDNS. |
| [Email → API](reference/API/Nerwork/Email/API.md) | This API is used for get or set or test Email parameters. |
| [Email → Get](reference/API/Nerwork/Email/Get.md) | This API is used to get parameter for Network > Email. |
| [Email → Range](reference/API/Nerwork/Email/Range.md) | This API is used to get the parameter range of Network > Email. |
| [Email → Set](reference/API/Nerwork/Email/Set.md) | This API is used to set parameter for Network > Email. |
| [Email → Test](reference/API/Nerwork/Email/Test.md) | This API is used to test parameter for Network > Email. |
| [FTP → API](reference/API/Nerwork/FTP/API.md) | This API is used for get or set or test FTP parameters |
| [FTP → Get](reference/API/Nerwork/FTP/Get.md) | This API is used to get parameter for Network > FTP . |
| [FTP → Range](reference/API/Nerwork/FTP/Range.md) | This API is used to get the parameter range of Network > FTP. |
| [FTP → Set](reference/API/Nerwork/FTP/Set.md) | This API is used to set parameter for Network > FTP. |
| [FTP → Test](reference/API/Nerwork/FTP/Test.md) | This API is used to test whether the FTP server is connected. |
| [GBT28181 → API](reference/API/Nerwork/GBT28181/API.md) | This API is used to get or set or test GB/T28181 parameters. |
| [GBT28181 → Get](reference/API/Nerwork/GBT28181/Get.md) | This API is used to get parameter for Network > GBT28181 . |
| [GBT28181 → Range](reference/API/Nerwork/GBT28181/Range.md) | This API is used to get the parameter range of Network > GBT28181. |
| [GBT28181 → Set](reference/API/Nerwork/GBT28181/Set.md) | This API is used to set parameter for Network > GBT28181. |
| [HTTPS → API](reference/API/Nerwork/HTTPS/API.md) | This API is used to get or set HTTPS parameters. |
| [HTTPS → Get](reference/API/Nerwork/HTTPS/Get.md) | This API is used to get Network > HTTPS parameters. |
| [HTTPS → Range](reference/API/Nerwork/HTTPS/Range.md) | This API is used to get the Network > HTTPS parameter range. |
| [HTTPS → Set](reference/API/Nerwork/HTTPS/Set.md) | This API is used to set Network > HTTPS parameters. |
| [IEEE8021x → API](reference/API/Nerwork/IEEE8021x/API.md) | This API is used for get or set IEEE8021x parameters. |
| [IEEE8021x → Get](reference/API/Nerwork/IEEE8021x/Get.md) | — |
| [IEEE8021x → Range](reference/API/Nerwork/IEEE8021x/Range.md) | This API is used to get the parameter range of Network > IEEE8021x . |
| [IEEE8021x → Set](reference/API/Nerwork/IEEE8021x/Set.md) | This API is used to set parameter for Network > IEEE8021x. |
| [IP Filter → API](reference/API/Nerwork/IP%20Filter/API.md) | This API is used to get or set IP filter parameters. |
| [IP Filter → Get](reference/API/Nerwork/IP%20Filter/Get.md) | This API is used to obtain Network > IP Filter parameters. |
| [IP Filter → Range](reference/API/Nerwork/IP%20Filter/Range.md) | This API is used to obtain Network > IP Filter parameters. |
| [IP Filter → Set](reference/API/Nerwork/IP%20Filter/Set.md) | This API is used to set Network > IP Filter parameters. |
| [Network Configuration / Network Base → API](reference/API/Nerwork/Network%20Configuration/Network%20Base/API.md) | This API is used for get or set device network interfaces. |
| [Network Configuration / Network Base → Get](reference/API/Nerwork/Network%20Configuration/Network%20Base/Get.md) | This API is used to get parameter for Network > Network Configuration > Network Base. |
| [Network Configuration / Network Base → Range](reference/API/Nerwork/Network%20Configuration/Network%20Base/Range.md) | This API is used to get the parameter range of Network > Network Configuration > Network Base. |
| [Network Configuration / Network Base → Set](reference/API/Nerwork/Network%20Configuration/Network%20Base/Set.md) | This API is used to set parameter for Network > Network Configuration > Network Base. |
| [Network Configuration / WLAN → API](reference/API/Nerwork/Network%20Configuration/WLAN/API.md) | This API is used for get or set WIFI parameters. |
| [Network Configuration / WLAN → MacthWiFiTypeSet](reference/API/Nerwork/Network%20Configuration/WLAN/MacthWiFiTypeSet.md) | This API is used to set wifi type parameter for Network > WLANScan. |
| [Network Configuration / WLAN → Scan](reference/API/Nerwork/Network%20Configuration/WLAN/Scan.md) | This API is used to get wifi list for Network > WLANScan. |
| [Network Configuration / WLAN → WifiStaParamSet](reference/API/Nerwork/Network%20Configuration/WLAN/WifiStaParamSet.md) | This API is used to set wifi AP parameter for Network > WLANScan.This API interface will only be registered and enabled in AP mode. |
| [Network Configuration / WLAN → join](reference/API/Nerwork/Network%20Configuration/WLAN/join.md) | This API is used to add wifi parameter for Network > WLANScan. |
| [Onvif → API](reference/API/Nerwork/Onvif/API.md) | This API is used for get or set onvif parameters. |
| [Onvif → Get](reference/API/Nerwork/Onvif/Get.md) | This API is used to get parameter for Network>Onvif. |
| [Onvif → Range](reference/API/Nerwork/Onvif/Range.md) | This API is used to get the parameter range of Network > Onvif. |
| [Onvif → Set](reference/API/Nerwork/Onvif/Set.md) | This API is used to set parameter for Network>Onvif. |
| [Rtsp → API](reference/API/Nerwork/Rtsp/API.md) | This API is used for get or set Rtsp parameters. |
| [Rtsp → Get](reference/API/Nerwork/Rtsp/Get.md) | This API is used to get parameter for Network>Rtsp . |
| [Rtsp → Range](reference/API/Nerwork/Rtsp/Range.md) | This API is used to get the parameter range of Network > Rtsp. |
| [Rtsp → Set](reference/API/Nerwork/Rtsp/Set.md) | This API is used to set parameter for Network>Rtsp. |
| [Tuya → API](reference/API/Nerwork/Tuya/API.md) | This API is used for get or set tuya parameters. |
| [Tuya → Get](reference/API/Nerwork/Tuya/Get.md) | This API is used to get parameter for Network>Tuya. |
| [Tuya → Range](reference/API/Nerwork/Tuya/Range.md) | This API is used to get the parameter range of Network > Tuya. |
| [Tuya → Set](reference/API/Nerwork/Tuya/Set.md) | This API is used to set parameter for Network>Tuya. |
| [Voice Assistant → API](reference/API/Nerwork/Voice%20Assistant/API.md) | This API is used for get or control voice assistant parameters. |
| [Voice Assistant → Get](reference/API/Nerwork/Voice%20Assistant/Get.md) | This API is used to get parameter for Network>Voice Assistant. |
| [Voice Assistant → Range](reference/API/Nerwork/Voice%20Assistant/Range.md) | This API is used to get the parameter range of Network > Voice Assistant. |
| [Voice Assistant → Set](reference/API/Nerwork/Voice%20Assistant/Set.md) | This API is used to control Network>Voice Assistant. |
| [ipv6 → API](reference/API/Nerwork/ipv6/API.md) | This API is used for get or set ipv6 parameters |
| [ipv6 → Get](reference/API/Nerwork/ipv6/Get.md) | This API is used to get parameter for Network > ipv6. |
| [ipv6 → Range](reference/API/Nerwork/ipv6/Range.md) | This API is used to get the parameter range of Network > ipv6. |
| [ipv6 → Set](reference/API/Nerwork/ipv6/Set.md) | This API is used to set parameter for Network > ipv6. |
| [snmp → API](reference/API/Nerwork/snmp/API.md) | This API is used for get or set snmp parameters. |
| [snmp → Get](reference/API/Nerwork/snmp/Get.md) | This API is used to get parameter for Network>snmp. |
| [snmp → Range](reference/API/Nerwork/snmp/Range.md) | This API is used to get the parameter range of Network > snmp. |
| [snmp → Set](reference/API/Nerwork/snmp/Set.md) | This API is used to set parameter for Network>snmp. |

## API / Push

| Endpoint | Use |
|---|---|
| [Push → API](reference/API/Push/Push/API.md) | This API is used for push messages. |
| [Push → GetToken](reference/API/Push/Push/GetToken.md) | This API is used to obtain Token when pushing. |
| [Push → Query](reference/API/Push/Push/Query.md) | This API is used to push query push parameters. |
| [Push → QueryDefault](reference/API/Push/Push/QueryDefault.md) | This API is used to restore default push. |
| [Push → Subscribe](reference/API/Push/Push/Subscribe.md) | This API is used for push subscriptions. |
| [Push → Unsubscribe](reference/API/Push/Push/Unsubscribe.md) | This API is used to close push. |
| [PushSubscribe → API](reference/API/Push/PushSubscribe/API.md) | This API is used to get or set push subscriptions. |
| [PushSubscribe → Get](reference/API/Push/PushSubscribe/Get.md) | This API is used to get push subscriptions. |
| [PushSubscribe → Set](reference/API/Push/PushSubscribe/Set.md) | This API is used to setup push subscriptions. |

## API / Record

| Endpoint | Use |
|---|---|
| [Month Search → API](reference/API/Record/Month%20Search/API.md) | This API is used to get month playback data for a specified date. |
| [Month Search → Get](reference/API/Record/Month%20Search/Get.md) | This API is used to get month playback data for a specified date. |
| [Pic Playback → API](reference/API/Record/Pic%20Playback/API.md) | This API is used to get image information. |
| [Pic Playback → Get](reference/API/Record/Pic%20Playback/Get.md) | This API is used to get image information. |
| [Playback Page → API](reference/API/Record/Playback%20Page/API.md) | This API is used to get Playback page parameters. |
| [Playback Page → Range](reference/API/Record/Playback%20Page/Range.md) | This API is used to get parameter range for Record > Playback Page page. |
| [Playback rtsp url → API](reference/API/Record/Playback%20rtsp%20url/API.md) | This API is used to play playback videos. |
| [Record Configuration → API](reference/API/Record/Record%20Configuration/API.md) | This API is used for get or set Record Configuration page parameters. |
| [Record Configuration → Get](reference/API/Record/Record%20Configuration/Get.md) | This API is used to get parameter for Record > Record Configuration page. |
| [Record Configuration → Range](reference/API/Record/Record%20Configuration/Range.md) | This API is used to get parameter range for Record > Record Configuration page. |
| [Record Configuration → Set](reference/API/Record/Record%20Configuration/Set.md) | This API is used to set parameter for Record > Record Configuration page. |
| [Record Tag → API](reference/API/Record/Record%20Tag/API.md) | This API is used to get or add a Record Tag. |
| [Record Tag → Get](reference/API/Record/Record%20Tag/Get.md) | This API is used to get parameter for Record > Record Tag page. |
| [Record Tag → Range](reference/API/Record/Record%20Tag/Range.md) | This API is used to get parameter range for Record > Record Tag page. |
| [Record Tag → Set](reference/API/Record/Record%20Tag/Set.md) | This API is used to set parameter for Record > Record Tag page. |
| [Search Record → API](reference/API/Record/Search%20Record/API.md) | This API is used to Search the Search Record page for playback data. |
| [Search Record → Range](reference/API/Record/Search%20Record/Range.md) | This API is used to obtain the Record > Search Record page playback data range. |
| [Search Record → Search](reference/API/Record/Search%20Record/Search.md) | This API is used to Search Record > Search Record page playback data. |

## API / Storage

| Endpoint | Use |
|---|---|
| [Audio → API](reference/API/Storage/Audio/API.md) | This API is used for get or set Audio page parameters. |
| [Audio → Get](reference/API/Storage/Audio/Get.md) | This API is used to get parameter for Storage > Audio page. |
| [Audio → Range](reference/API/Storage/Audio/Range.md) | This API is used to get parameter range for Storage > Audio page. |
| [Audio → Set](reference/API/Storage/Audio/Set.md) | This API is used to set parameter for Storage > Audio page. |
| [Cloud → API](reference/API/Storage/Cloud/API.md) | This API is used for get or set Cloud page parameters. |
| [Cloud → Control](reference/API/Storage/Cloud/Control.md) | This API is used to set parameter for Storage > Cloud page. |
| [Cloud → Get](reference/API/Storage/Cloud/Get.md) | This API is used to set parameter for Storage > Cloud page. |
| [Cloud → Range](reference/API/Storage/Cloud/Range.md) | This API is used to set parameter for Storage > Cloud page. |
| [Cloud → Set](reference/API/Storage/Cloud/Set.md) | This API is used to set parameter for Storage > Cloud page. |
| [Cloud → accesstoken](reference/API/Storage/Cloud/accesstoken.md) | This API is used to set parameter for Storage > Cloud page. |
| [Disk / Disk Configuration → Get](reference/API/Storage/Disk/Disk%20Configuration/Get.md) | This API is used to set parameter for Storage > Disk page. |
| [Disk / Disk Configuration → Range](reference/API/Storage/Disk/Disk%20Configuration/Range.md) | This API is used to get parameter range for Storage > Disk page. |
| [Disk / Disk Configuration → Set](reference/API/Storage/Disk/Disk%20Configuration/Set.md) | This API is used to set parameter for Storage > Disk page. |
| [Disk / Disk Control → Control](reference/API/Storage/Disk/Disk%20Control/Control.md) | This API is used to set parameter for Storage > Disk page. |
| [Disk / Disk Format → Format](reference/API/Storage/Disk/Disk%20Format/Format.md) | This API is used to set parameter for Storage > Disk page. |
| [Disk / Disk Format → Progress](reference/API/Storage/Disk/Disk%20Format/Progress.md) | This API is used to set parameter for Storage > Disk page. |
| [Disk Group → API](reference/API/Storage/Disk%20Group/API.md) | This API is used for get or set Disk Group page parameters. |
| [Disk Group → Get](reference/API/Storage/Disk%20Group/Get.md) | This API is used to get parameter for Storage > Disk Group page. |
| [Disk Group → Range](reference/API/Storage/Disk%20Group/Range.md) | This API is used to get parameter for Storage > Disk Group page. |
| [Disk Group → Set](reference/API/Storage/Disk%20Group/Set.md) | This API is used to get parameter for Storage > Disk Group page. |
| [Disk → API](reference/API/Storage/Disk/API.md) | This API is used for get or set Disk page parameters. |
| [RAID → API](reference/API/Storage/RAID/API.md) | This API is used for get or set RAID page parameters. |
| [RAID → Get](reference/API/Storage/RAID/Get.md) | This API is used to get parameter for Storage > RAID page. |
| [RAID → Range](reference/API/Storage/RAID/Range.md) | This API is used to get parameter range for Storage > RAID page. |
| [RAID → Set](reference/API/Storage/RAID/Set.md) | This API is used to get parameter for Storage > RAID page. |

## API / Stream

| Endpoint | Use |
|---|---|
| [Capture → API](reference/API/Stream/Capture/API.md) | This API is used to get or set Capture page parameters. |
| [Capture → Get](reference/API/Stream/Capture/Get.md) | This API is used to get parameter for Stream > Capture page. |
| [Capture → Range](reference/API/Stream/Capture/Range.md) | This API is used to get parameter range for Stream > Capture page. |
| [Capture → Set](reference/API/Stream/Capture/Set.md) | This API is used to set parameter for Stream > Capture page. |
| [Encode → API](reference/API/Stream/Encode/API.md) | This API is used to get or set MainStream, SubStream, MobileStream, and EventStream page parameters. |
| [Encode → Get](reference/API/Stream/Encode/Get.md) | This API is used to get parameter for Stream > Encode page. |
| [Encode → Range](reference/API/Stream/Encode/Range.md) | This API is used to get parameter range for Stream > Encode page. |
| [Encode → Set](reference/API/Stream/Encode/Set.md) | This API is used to set parameter for Stream > Encode page. |
| [Rtsp Url → API](reference/API/Stream/Rtsp%20Url/API.md) | This API is used to access the device RTSP Real-time streaming. |
| [Rtsp Url → Get](reference/API/Stream/Rtsp%20Url/Get.md) | This API is used to get parameter for Stream > Rtsp Url page. |

## API / System

| Endpoint | Use |
|---|---|
| [Channel Information → API](reference/API/System/Channel%20Information/API.md) | This API is used for get or set Channel Information parameters. |
| [Channel Information → Get](reference/API/System/Channel%20Information/Get.md) | This API is used to get parameter for System > Channel Information page. |
| [DST → API](reference/API/System/DST/API.md) | This API is used for get or set Daylight Saving Time (DST) page parameters. |
| [DST → Get](reference/API/System/DST/Get.md) | This API is used to get parameter for System > DST page. |
| [DST → Range](reference/API/System/DST/Range.md) | This API is used to get the parameter range of the System > DST page |
| [DST → Set](reference/API/System/DST/Set.md) | This API is used to set parameter for System > DST page. |
| [Date&Time → API](reference/API/System/Date&Time/API.md) | This API is used for get or set Data&Time page parameters. |
| [Date&Time → Get](reference/API/System/Date&Time/Get.md) | This API is used to get parameter for System > Date&Time page. |
| [Date&Time → Range](reference/API/System/Date&Time/Range.md) | This API is used to get parameter range for System > Date&Time page. |
| [Date&Time → Set](reference/API/System/Date&Time/Set.md) | This API is used to set parameter for System > Date&Time page. |
| [General → API](reference/API/System/General/API.md) | This API is used for get or set General page parameters. |
| [General → Get](reference/API/System/General/Get.md) | This API is used to get parameter for System > General page. |
| [General → Range](reference/API/System/General/Range.md) | This API is used to get parameter range for System > General page. |
| [General → Set](reference/API/System/General/Set.md) | This API is used to set parameter for System > General page. |
| [NTP → API](reference/API/System/NTP/API.md) | This API is used for get or set NTP page parameters. |
| [NTP → Get](reference/API/System/NTP/Get.md) | This API is used to get parameter for System > NTP page. |
| [NTP → Range](reference/API/System/NTP/Range.md) | This API is used to get parameter range for System > NTP page. |
| [NTP → Set](reference/API/System/NTP/Set.md) | This API is used to set parameter for System > NTP page. |
| [Network State → API](reference/API/System/Network%20State/API.md) | This API is used for get or set Network State page parameters. |
| [Network State → Get](reference/API/System/Network%20State/Get.md) | This API is used to get parameter for System > Network State page. |
| [Output → API](reference/API/System/Output/API.md) | This API is used for get or set Output page parameters. |
| [Output → Get](reference/API/System/Output/Get.md) | This API is used to get parameter for System > Output page. |
| [Output → Range](reference/API/System/Output/Range.md) | This API is used to get parameter range for System > Output page. |
| [Output → Set](reference/API/System/Output/Set.md) | This API is used to set parameter for System > Output page. |
| [Privacy Statement → API](reference/API/System/Privacy%20Statement/API.md) | This API is used for get or set Privacy Statement page parameters. |
| [Privacy Statement → Get](reference/API/System/Privacy%20Statement/Get.md) | This API is used to get parameter for System > Privacy Statement page. |
| [Privacy Statement → Range](reference/API/System/Privacy%20Statement/Range.md) | This API is used to get parameter range for System > Privacy Statement page. |
| [Record Information → API](reference/API/System/Record%20Information/API.md) | This API is used for get or set Record Information page parameters. |
| [Record Information → Get](reference/API/System/Record%20Information/Get.md) | This API is used to get parameter for System > Record Information page. |
| [System Information → API](reference/API/System/System%20Information/API.md) | This API is used for get or set System Information page parameters. |
| [System Information → Get](reference/API/System/System%20Information/Get.md) | This API is used to get parameter for System > System Information page. |

## API / Thermal

| Endpoint | Use |
|---|---|
| [Fire Detection → API](reference/API/Thermal/Fire%20Detection/API.md) | This API is used to get or set for the Fire Detection parameter. |
| [Fire Detection → Add](reference/API/Thermal/Fire%20Detection/Add.md) | This API is used for adding Thermal > Fire Detection parameter |
| [Fire Detection → Delete](reference/API/Thermal/Fire%20Detection/Delete.md) | This API is used for deletion Thermal > Fire Detection parameter |
| [Fire Detection → Get](reference/API/Thermal/Fire%20Detection/Get.md) | This API is used for get Thermal > Fire Detection parameter |
| [Fire Detection → Range](reference/API/Thermal/Fire%20Detection/Range.md) | This API is used for get Thermal > Fire Detection parameter scale |
| [Fire Detection → Set](reference/API/Thermal/Fire%20Detection/Set.md) | This API is used for setting Thermal > Fire Detection parameter. |
| [Image Control → API](reference/API/Thermal/Image%20Control/API.md) | This API is used to get or set for ImageControl Thermal imaging channel parameters |
| [Image Control → Default](reference/API/Thermal/Image%20Control/Default.md) | This API is used to restore defaults Thermal > ImageControl parameter |
| [Image Control → Get](reference/API/Thermal/Image%20Control/Get.md) | This API is used for get Thermal > ImageControl parameter |
| [Image Control → InfraredCorr](reference/API/Thermal/Image%20Control/InfraredCorr.md) | This API is used for get InfrareCorr Thermal > ImageControl parameter |
| [Image Control → Range](reference/API/Thermal/Image%20Control/Range.md) | This API is used for get Thermal > ImageControl parameter scale |
| [Image Control → Set](reference/API/Thermal/Image%20Control/Set.md) | This API is used for set Thermal > ImageControl page. |
| [Measurement Rule → API](reference/API/Thermal/Measurement%20Rule/API.md) | This API is used to get or set for MeasurementRule parameter. |
| [Measurement Rule → Add](reference/API/Thermal/Measurement%20Rule/Add.md) | This API is used to add Thermal > Measurement Rule parameter |
| [Measurement Rule → Delete](reference/API/Thermal/Measurement%20Rule/Delete.md) | This API is used to delete Thermal > Measurement Rule parameter |
| [Measurement Rule → Get](reference/API/Thermal/Measurement%20Rule/Get.md) | This API is used to get parameter for Thermal > Measurement Rule page. |
| [Measurement Rule → Range](reference/API/Thermal/Measurement%20Rule/Range.md) | This API is used to get Thermal > Measurement Rule parameter scale |
| [Measurement Rule → Set](reference/API/Thermal/Measurement%20Rule/Set.md) | This API is used to set Thermal > Measurement Rule page |
| [Measurement → API](reference/API/Thermal/Measurement/API.md) | This API is used to get or set for Measurement parameter. |
| [Measurement → Get](reference/API/Thermal/Measurement/Get.md) | This API is used to get Thermal > Measurement parameter. |
| [Measurement → Range](reference/API/Thermal/Measurement/Range.md) | This API is used to get Thermal > Measurement parameter scale |
| [Measurement → Set](reference/API/Thermal/Measurement/Set.md) | This API is used to set Thermal > Measurement parameter. |
| [Spot Measurement → API](reference/API/Thermal/Spot%20Measurement/API.md) | This API is used to get for Spot Measurement parameter. |
| [Spot Measurement → Get](reference/API/Thermal/Spot%20Measurement/Get.md) | This API is used to get Thermal > Spot Measurement parameter |
| [Video Color → API](reference/API/Thermal/Video%20Color/API.md) | This API is used to get or set Video Color Thermal imaging channel parameters |
| [Video Color → Default](reference/API/Thermal/Video%20Color/Default.md) | This API is used to restore default parameter for Thermal > Video Color page. |
| [Video Color → Get](reference/API/Thermal/Video%20Color/Get.md) | This API is used to get Thermal > Video Color parameter |
| [Video Color → Range](reference/API/Thermal/Video%20Color/Range.md) | This API is used to get Thermal > Video Color parameter scale |
| [Video Color → Set](reference/API/Thermal/Video%20Color/Set.md) | This API is used to Set Thermal > Video Color page. |

## Common / Error codes

| Endpoint | Use |
|---|---|
| [CommonError_code](reference/Common/CommonError_code.md) | Common error_code include channel Table-2.9.1 |
| [Overview](reference/Common/Overview.md) | — |
| [References](reference/Common/References.md) | [1] RFC2616 Hypertext Transfer Protocol-HTTP/1.1 |
