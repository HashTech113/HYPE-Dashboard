# Login

## Function

This API includes APIs such as heartbeat, getting device information before and after login, and getting channel information.
Client login and subsequent process reference:

st=>start: Start

getInfoBeforeLogin=>operation: /API/Login/Range Getting information before login.
Login=>operation: Login
setAdminPwd=>operation: /API/FirstLogin/Password/Set Setting password of Admin.
heartBeat=>operation: /API/Login/Heartbeat Sent every 30s after login, used to keep the session alive.
getChn&DevInfo=>operation: /API/Login/ChannelInfo/Get /API/Login/DeviceInfo/Get Getting device and channel information.
optOtherAPI=>operation: Operate other APIs.
Logout=>operation: Logout

isFirstLogin=>condition: Is first login？
isLoginSuccess=>condition: Is login success？

e_1=>end: End
e_2=>end: End
e_3=>end: End

st->getInfoBeforeLogin->isFirstLogin
isFirstLogin(no)->Login->isLoginSuccess
isFirstLogin(yes)->setAdminPwd->e_1
isLoginSuccess(no)->e_2
isLoginSuccess(yes)->heartBeat->getChn&DevInfo->optOtherAPI->Logout->e_3

/API/Login/Range The interface is not authenticated, and returns whether the system login in for the first time (admin without a password), and some information for display. If it is the first login state of the system, the client calls /API/FirstLogin/Password/Set to set password of admin,after that it can be login.

## URI

POST /API/Login/{Action}

Table 1 describes the parameters.

### Parameter Description

Table 1

| Parameter | Required | Description |

| Action | YES | Request action, including Range, Heartbeat, DeviceInfo/*, ChannelInfo/*. |
