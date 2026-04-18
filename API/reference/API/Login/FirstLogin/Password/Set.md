# Set

## Function

This API is used to set the password for the first login of the device.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| base_enc_password |   | object | Encrypted password object, see base_enc_password information Table for object members. |

| base_secondary_authentication |   | object | Authentication object, see base_secondary_authentication information Table for object members. |

| activation_pwd |   | object | Encrypted password object, used to activate ipc, object members see base_enc_password information Table . (for NVR only) |

| support_recover_pwd |   | bool | Whether to support password recovery settings. |

Sample:

POST /API/FirstLogin/Password/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "base_enc_password": {
            "seq": 0,
            "peer_key": "0z3+fzVXn/msq6ZagsHDY57sI29XtP3qIL+gVOW4hJH8=",
            "cipher": "075RisUMqoS9110GpXIoJhlJJQORLeWpmU12SZpcSFkDMLfIj"
        },
        "activation_pwd": {
            "seq": 0,
            "peer_key": "09BuUR966wl41vQIcS2WwAQRh3mATOABaq3TYSDfheh4=",
            "cipher": "0Cn8dz0BTQ0uM4BGHVRwuHXzeurPj2BeFKB8kOb2dkVmKr959sw=="
        }
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
