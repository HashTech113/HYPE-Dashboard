import requests
from requests.auth import HTTPDigestAuth
from datetime import datetime, timedelta

IP = "172.18.10.26"
USER = "admin"
PASS = "Opt@12345"
BASE_URL = f"http://{IP}"


def login_session():
    session = requests.Session()
    login_url = f"{BASE_URL}/API/Web/Login"
    response = session.post(login_url, json={"data": {}}, auth=HTTPDigestAuth(USER, PASS))
    if response.status_code != 200:
        raise RuntimeError(f"Login failed: {response.status_code}")
    token = response.headers.get("X-csrftoken")
    session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
    return session


def get_device_time():
    """Get device date/time"""
    print("\n=== DEVICE TIME ===")
    session = login_session()
    response = session.post(f"{BASE_URL}/API/SystemConfig/DateTime/Get", json={"version": "1.0", "data": {}})
    data = response.json()
    print(data)
    return data


def search_faces_wide_range():
    """Search faces with last 30 days"""
    print("\n=== SEARCHING FACES (Last 30 Days) ===")
    session = login_session()
    
    end = datetime.now()
    start = end - timedelta(days=30)
    
    start_str = start.strftime("%Y-%m-%d %H:%M:%S")
    end_str = end.strftime("%Y-%m-%d %H:%M:%S")
    
    print(f"Time range: {start_str} to {end_str}")
    
    payload = {
        "msgType": "AI_searchSnapedFaces",
        "data": {
            "MsgId": None,
            "StartTime": start_str,
            "EndTime": end_str,
            "Chn": [],
            "AlarmGroup": [],
            "Similarity": 50,
            "Engine": 0,
            "Count": 50
        }
    }
    
    response = session.post(f"{BASE_URL}/API/AI/SnapedFaces/Search", json=payload)
    data = response.json()
    print(f"Result: {data}")
    
    count = data.get("data", {}).get("Count", 0)
    if count > 0:
        print(f"✅ Found {count} faces!")
        faces = data.get("data", {}).get("SnapedFaceList", [])
        for i, face in enumerate(faces[:3]):
            print(f"  Face {i+1}: {face}")
    else:
        print("❌ No faces found in last 30 days")
    
    return data


def test_snapshot():
    """Test snapshot API to confirm device is responding"""
    print("\n=== TEST SNAPSHOT API ===")
    session = login_session()
    
    payload = {
        "version": "1.0",
        "data": {
            "channel": "CH1",
            "snapshot_resolution": "1920 x 800",
            "reset_session_timeout": "false"
        }
    }
    
    response = session.post(f"{BASE_URL}/API/Snapshot/Get", json=payload)
    data = response.json()
    
    has_image = "img_data" in str(data)
    print(f"Snapshot API response: {len(str(data))} chars")
    print(f"Contains image data: {has_image}")
    
    return data


if __name__ == "__main__":
    try:
        print("🔍 Device Diagnostic Report")
        print("=" * 50)
        
        # 1. Get device time
        time_data = get_device_time()
        
        # 2. Test snapshot
        test_snapshot()
        
        # 3. Search faces
        search_faces_wide_range()
        
        print("\n" + "=" * 50)
        print("✅ Diagnostic complete!")
        print("\n📋 Next steps:")
        print("   - If 'Found 0 faces': Face detection may not be enabled")
        print("   - Check device web UI: Settings > AI > Face Detection")
        print("   - Verify faces were captured during the time range")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
