import requests
from requests.auth import HTTPDigestAuth

# --- CAMERA CONFIG ---
IP = "172.18.10.26"
USER = "admin"
PASS = "Opt@12345"
BASE_URL = f"http://{IP}"


def login_session():
    session = requests.Session()
    login_url = f"{BASE_URL}/API/Web/Login"
    response = session.post(login_url, json={"data": {}}, auth=HTTPDigestAuth(USER, PASS))
    if response.status_code != 200:
        raise RuntimeError(f"Login failed: {response.status_code} {response.text}")

    token = response.headers.get("X-csrftoken")
    if not token:
        raise RuntimeError("Missing X-csrftoken in login response")

    session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
    return session


def search_snaped_faces(start_time, end_time, similarity=70, count=20, chn=None, engine=0):
    if chn is None:
        chn = []

    payload = {
        "msgType": "AI_searchSnapedFaces",
        "data": {
            "MsgId": None,
            "StartTime": start_time,
            "EndTime": end_time,
            "Chn": chn,
            "AlarmGroup": [],
            "Similarity": similarity,
            "Engine": engine,
            "Count": count
        }
    }

    session = login_session()
    search_url = f"{BASE_URL}/API/AI/SnapedFaces/Search"
    response = session.post(search_url, json=payload)
    response.raise_for_status()
    return response.json()


def get_snaped_face_by_id(uuid, matched_face_id):
    payload = {
        "msgType": "AI_getSnapedFacesById",
        "data": {
            "UUId": uuid,
            "MatchedFaceId": matched_face_id
        }
    }

    session = login_session()
    url = f"{BASE_URL}/API/AI/SnapedFaces/GetById"
    response = session.post(url, json=payload)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    start = "2024-04-11 00:00:00"
    end = "2024-04-18 23:59:59"

    print("Searching snapped faces...")
    search_result = search_snaped_faces(start, end)
    print(f"Response: {search_result}\n")

    # Check if faces were found
    count = search_result.get("data", {}).get("Count", 0)
    print(f"Total faces found: {count}")

    if count == 0:
        print("\n⚠️  No snapped faces found in this time range.")
        print("💡 Tips to get data:")
        print("   1. Check if face detection is enabled on the camera")
        print("   2. Try a wider time range: search_snaped_faces('2024-04-01 00:00:00', '2024-04-18 23:59:59')")
        print("   3. Ensure faces were actually captured during that time")
        print("   4. Try with lower similarity threshold: search_snaped_faces(..., similarity=50)")
    else:
        # Get details for first result if available
        snapped_face_list = search_result.get("data", {}).get("SnapedFaceList", [])
        if snapped_face_list and len(snapped_face_list) > 0:
            first = snapped_face_list[0]
            uuid = first.get("UUId")
            matched_face_id = first.get("MatchedFaceId")
            print(f"\nFirst face found - UUID: {uuid}, MatchedFaceId: {matched_face_id}")
            
            if uuid and matched_face_id:
                print("Fetching details by ID...")
                detail_result = get_snaped_face_by_id(uuid, matched_face_id)
                print(detail_result)
            else:
                print("Missing UUId or MatchedFaceId in first result")
