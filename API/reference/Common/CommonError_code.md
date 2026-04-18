# Common error_code

Common error_code include channel Table-2.9.1

   
       
       
       
   
   
       
           
           
           
       
| Common | param_error | The requested parameters are incorrect. |
       
           
           
       
| no_permission | No permission. |
       
           
           
       
| first_login | First login, force to set a password. |
       
           
           
       
| part_failed | The parameters of some channels fail to be saved. |
       
           
           
       
| no_support | No support. |
       
           
           
       
| frequent_operation | Operate too frequently. |
       
           
           
       
| passwd_expired_login | The password has expired and needs to be changed. |
       
           
           
       
| default_failed | Failed to restore default values. |
       
           
           
       
| token_generation_failed | Failed to generate token. |
       
           
           
       
| token_invalid | Token is invalid. |
       
           
           
       
| device_busy | The number of requests being processed by the device reached the upper limit. |
       
           
           
       
| user_expired_login | Account login expired. |
       
           
           
       
| data_saving_busy | The device is busy saving. |
       
           
           
       
| user_locked_login | The user login is locked. |
       
           
           
       
| function_busy | Function busy. |
       
           
           
       
| network_port_conflict | The network port conflicts |
       
           
           
       
| group_name_error | The group name is incorrect. |
       
           
           
           
       
| Session | no_login | Not logged in. |
       
           
           
       
| expired | Login expired. |
       
           
           
       
| one_IE | Only one user can log in to a browser. |
       
           
           
       
| logout | Log out. |
       
           
           
       
| login_at_other | This account has been logged in at another location. |
       
           
           
       
| device_reboot | Device reboot. |
       
           
           
       
| passwd_expired | Passwd expired. |
       
           
           
       
| param_changed | Parameters have changed. |
       
           
           
       
| network_changed | The network port is changed. |
       
           
           
       
| ssl_error | SSL certificate reissuance. |
       
           
           
       
| netip_limited | The logged IP address is added to the blacklist. |
       
           
           
       
| forced_offline | Forced logout. |
       
           
           
       
| user_expired | User has expired. |
       
           
           
       
| no_heartbeat | Heartbeat timeout. |
       
           
           
       
| disk_changed | The hard disk status or parameters are changed. |
       
           
           
       
| ipc_state_changed | On the IPC upgrade page, the IPC upgrade status has changed. |
       
           
           
       
| have_login | The number of current logins exceeds the maximum value. |
       
           
           
           
       
| Secondary certification | current_pwd_error_ntime | If the number of authentication failures exceeds the upper limit, "remain_locked_time" is included in the "data", indicating the remaining lock time. |
       
           
           
           
       
| Save parameter | save_failed | Failed to save parameter. |
       
           
           
       
| pwd_weak | The complexity of the IPC password is too low. (IPC) |
       
           
           
       
| modify_failed | Modification has failed. |
       
           
           
       
| modify_failed_pwd_err | The user name or password is incorrect when changing IPC's IP address. |
       
           
           
       
| modify_failed_syntax_err | A format error occurred when the IPC IP address, subnet mask, or gateway was modified. |
       
           
           
           
       
| Search | search_failed | The search has failed. "data" will contain "remain_locked_time", indicating the remaining lock time. |
       
           
           
           
       
| Playback | device_play_locked | The device is playing back and rejecting the web request. |
       
           
           
           
       
| Operation | operation_failed | Operation has failed. |
       
           
           
           
       
| Modify the user name, password, and permission | session_invalid |   |
       
           
           
       
| illegal_request | Illegal request. |
       
           
           
       
| overreach | Subusers can only set their own information. |
       
           
           
       
| short_modify_time | The interval between password changes is too short. |
       
           
           
       
| current_pwd_error | Password error. |
       
           
           
       
| username_empty | The user name is empty. |
       
           
           
       
| username_repeat | The current user name is the same as the existing user name. |
       
           
           
       
| username_invalid | The user name can only contain letters, digits, and underscores. |
       
           
           
       
| unmatched_pwd | The two passwords are different. |
       
           
           
       
| pwd_empty | The password is empty. |
       
           
           
       
| pwd_length_err | Password length error. |
       
           
           
       
| pwd_equal_name | The password cannot be the same as the user name or the user name typed backwards. |
       
           
           
       
| pwd_equal_old | The new password cannot be the same as the previous passwords. "data" will contain "number", which represents the number of times. |
       
           
           
       
| pwd_repeated | The new password must be different from the old password by at least two characters. |
       
           
           
       
| pwd_weak_rule | The password must contain at least two of the following combinations: lowercase letters, uppercase letters, digits, special characters, and Spaces. |
       
           
           
       
| pwd_risk | The password belongs to the weak password dictionary. |
       
           
           
       
| pwd_invalid | Invalid password. |
       
           
           
           
       
| Email testing | user_auth_failed | User authentication failure. |
       
           
           
       
| data_error | There are some errors in the data sent. |
       
           
           
       
| net_unreachable_or_dns_wrong | The network is unreachable or the DNS is wrong. |
       
           
           
       
| connect_server_err | Failed to connect to server. |
       
           
           
       
| check_smtp_port | The connection failed. Please check whether the port is correct. |
       
           
           
       
| tls_ssl_handshake_err | The TLS/SSL handshake failed. |
       
           
           
       
| email_connect_err | Connection error, please check the recipient account. |
       
           
           
           
       
| Upgrade | in_user_interface | The device is in operation. |
       
           
           
       
| updating | The device is being upgraded. |
       
           
           
       
| lack_memory | The device lacks memory. |
       
           
           
       
| file_error | File error. |
       
           
           
       
| no_need_upgrade | The current version is the latest and does not need to be updated. |
       
           
           
           
       
| HTTP | not_modified | No modification. (304) |
       
           
           
       
| http_redirect_https | http redirects to https. (307) |
       
           
           
       
| not_found | Not found.(404) |
       
           
           
       
| method_not_allowed | Request method does not allow. (405) |
       
           
           
       
| payload_too_large | Payload too large. (413) |
       
           
           
       
| uri_too_long | URI too long. (414) |
       
           
           
       
| internal_server_error | Internal server error. (500) |
       
           
           
       
| service_unavailable_error | The service is unavailable. The number of tcp connections exceeded the maximum. (503) |
