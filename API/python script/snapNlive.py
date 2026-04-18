from flask import Flask, render_template, Response, jsonify
import cv2
import requests
from requests.auth import HTTPDigestAuth

app = Flask(__name__)

# --- CONFIGURATION ---
IP = "172.18.10.26"
USER = "admin"
PASS = "Opt@12345"
RTSP_URL = f'rtsp://{USER}:Opt%4012345@{IP}:554/rtsp/streaming?channel=01&subtype=0'
BASE_URL = f"http://{IP}"

# --- RTSP VIDEO GENERATOR ---
def generate_frames():
    camera = cv2.VideoCapture(RTSP_URL)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# --- SNAPSHOT LOGIC ---
def get_base64_snapshot():
    session = requests.Session()
    login_url = f"{BASE_URL}/API/Web/Login"
    try:
        response = session.post(login_url, json={"data": {}}, auth=HTTPDigestAuth(USER, PASS), timeout=5)
        if response.status_code == 200:
            token = response.headers.get('X-csrftoken')
            snapshot_url = f"{BASE_URL}/API/Snapshot/Get"
            payload = {
                "version": "1.0",
                "data": {"channel": "CH1", "snapshot_resolution": "1920 x 780", "reset_session_timeout": "false"}
            }








            
            headers = {"X-csrftoken": token, "Content-Type": "application/json"}
            result = session.post(snapshot_url, json=payload, headers=headers)
            return result.json().get("data", {}).get("img_data")
        



    except Exception as e:

        print(f"Error fetching snapshot: {e}")
    return None

# --- ROUTES ---
@app.route('/')
def index():
    # Fetch initial snapshot for the page load
    initial_snap = get_base64_snapshot()
    return render_template('index1.html', initial_snap=initial_snap)

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_new_snap')
def get_new_snap():
    # AJAX route to refresh just the snapshot without reloading the page
    img_data = get_base64_snapshot()
    return jsonify({"img_data": img_data})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
