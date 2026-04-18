# Set

## Function

This API is used to set Network > HTTPS parameters.

## Request Message

### Parameter Description

See Network > HTTPS > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/NetworkConfig/https/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "https_enable":true,
        "file_type":"Default",
        "file_exist":0,
        "operate":"Switch"
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

###### Table 1

| error_code | commet |

| install_failed | Installation failed. |

| uninstall_failed | Uninstall failed. |

| uninstall_not_allow | In use, uninstallation is not allowed. |

| switch_failed | Switching failed. |

| upload_failed | Installation failed. |

| length_too_long | The data is too large. |

| unsafe_siganature | Unsafe certificate. |

| cert_key_not_match | Certificate does not match. |

| invalid_cert_time | Invalid certificate time. |

| invalid_private_key | Invalid private key file. |

| invalid_cert | Invalid certificate file. |

| invalid_key_usage | Invalid certificate key usage. |

| invalid_cert_chain | Invalid certificate chain. |

| invalid_cacert | Invalid root certificate. |

| invalid_cacert_time | Contains an invalid root certificate. |

See Table 1, Response Messages Body and Common error_code for more information.
