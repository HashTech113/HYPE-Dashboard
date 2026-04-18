from flask import Flask, render_template_string
import requests
from requests.auth import HTTPDigestAuth

app = Flask(__name__)

# --- YOUR CAMERA CONFIG ---
IP = "172.18.10.26"
USER = "admin"
PASS = "Opt@12345"
BASE_URL = f"http://{IP}"

def get_base64_snapshot():
    session = requests.Session()
    login_url = f"{BASE_URL}/API/Web/Login"
    
    # 1. Login to get Session and Token
    response = session.post(login_url, json={"data": {}}, auth=HTTPDigestAuth(USER, PASS))
    
    if response.status_code == 200:
        token = response.headers.get('X-csrftoken')
        
        # 2. Call Snapshot API
        snapshot_url = f"{BASE_URL}/API/Snapshot/Get"
        payload = {
            "version": "1.0",
            "data": {
                "channel": "CH1",
                "snapshot_resolution": "1920 x 800",
                "reset_session_timeout": "false"
            }
        }
        headers = {"X-csrftoken": token, "Content-Type": "application/json"}
        
        result = session.post(snapshot_url, json=payload, headers=headers)
        json_data = result.json()
        
        # 3. Extract the Base64 string from the result you shared
        return json_data.get("data", {}).get("img_data")
    return None

@app.route('/')
def home():
    base64_img = get_base64_snapshot()
    
    if not base64_img:
        return "<h1>Failed to get snapshot</h1>"

    # This HTML uses the 'Data URI' format to display Base64 as an image
    html_template = f'''
    <html>
        <head><title>Camera Live View</title></head>
        <body style="text-align: center; background: #222; color: white; font-family: sans-serif;">
            <h1>Camera Snapshot (1280x720)</h1>
            <div style="margin-top: 20px;">
                <img src="data:image/jpeg;base64,{base64_img}" style="border: 5px solid #444; box-shadow: 0 0 20px black; max-width: 90%;" />
            </div>
            <h2>Refresh the page to take a new snapshot.</h2>
        </body>
    </html>
    '''
    return render_template_string(html_template)

if __name__ == '__main__':
    print(f"Server starting! Go to http://localhost:5000")
    app.run(host='0.0.0.0', port=5000)
