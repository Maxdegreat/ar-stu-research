"""
Pvamu Computer Vision Research
10/24/23
"""
from flask import Flask, request, jsonify
from flask_cors import CORS

from find_faces.get_cropped_faces import getCroppedFaceFromImageBase64

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

def errorMsg(msg):
    return jsonify({"Error": f"{msg}"})

@app.route('/find_faces', methods=['POST'])
def find_faces():
    
    data = request.get_json()
    image_encoded_into_base64 = data.get("image_encoded_into_base64")
    
    if image_encoded_into_base64 is None:
        return errorMsg("value image_encoded_into_base64 is expected when you call api route /find_faces"), 500
    elif image_encoded_into_base64 is not None:
        cropped_faces = getCroppedFaceFromImageBase64(image_encoded_into_base64)
        response_map = {
            "cropped_faces": cropped_faces,
        }
        return jsonify(response_map), 200
    else:
        return errorMsg("something went wrong"), 500

if __name__ == '__main__':
    app.run(debug=True)


