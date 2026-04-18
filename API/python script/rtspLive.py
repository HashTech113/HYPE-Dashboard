from flask import Flask, render_template, Response
import cv2

app = Flask(__name__)

# Replace 'rtsp://username:password@IP_ADDRESS:PORT/path' with your actual RTSP URL
# For testing with your local webcam, you can use: camera = cv2.VideoCapture(0)
RTSP_URL = 'rtsp://admin:Opt%4012345@192.168.1.73:554/rtsp/streaming?channel=01&subtype=0'

def generate_frames():
    camera = cv2.VideoCapture(RTSP_URL)
    
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame in JPEG format
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Yield the output frame in the byte format required for HTTP streaming
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    # Video streaming route. Put this in the src attribute of an img tag
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)