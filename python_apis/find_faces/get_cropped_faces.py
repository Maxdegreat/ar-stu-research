import cv2
import numpy as np
from mtcnn import MTCNN
import base64
from PIL import Image
import os
import io
import numpy as np

def getCroppedFaceFromImageBase64(image_encoded_into_base64):
    
    # return image_encoded_into_base64
    
    cropped_face = None
    
    try:
        # lets take the base64 encoded image and decode it.
        image_data = base64.b64decode(image_encoded_into_base64)
        
        # Create a BytesIO object to treat the binary data as a file-like object
        image_stream = io.BytesIO(image_data)

        # Open the image using PIL
        image = Image.open(image_stream)
    except Exception as e:
        return f"An error occurred when lets take the base64 encoded image and decode it.: {e}"
    
    try:
        # Initialize the MTCNN detector
        detector = MTCNN()
        
        
        # Convert PIL Image to NumPy array
        image_np = np.array(image)
        
        image = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)

        # Detect faces in the image using MTCNN
        faces = detector.detect_faces(image)
    except Exception as e:
        return f"An error occurred when Initialize the MTCNN detector: {e}"
    
    count = 0
    

    try:
        for i, face in enumerate(faces):
        
            count = i
            
            x, y, width, height = face['box']
            x1, y1 = x, y
            x2, y2 = x + width, y + height

            # Crop the face from the image and add to list of cropped faces
            cropped_face = image[y1:y2, x1:x2]
            
            # Convert the NumPy array to PIL Image
            pil_cropped_face = Image.fromarray(cropped_face)
            
            # Convert the PIL Image to bytes
            image_bytes = pil_cropped_face.tobytes()
            
            
            
            #  # Encode the bytes as base64
            # encoded_image = base64.b64encode(image_bytes).decode('ascii')
            encoded_image = base64.b64encode(image_bytes).decode('utf-8')
            print(f"The encoded image: {encoded_image}")
            
            return encoded_image
            
    except Exception as e:
        return f"An error occurred while encoding cropped face: {e}"


