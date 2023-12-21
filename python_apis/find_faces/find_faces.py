import os
import io
import cv2
import numpy as np
from mtcnn import MTCNN
import matplotlib.pyplot as plt
# import dlib
import base64
from PIL import Image
from io import BytesIO

# takes an input path that holds images of ppl. per each image detect and crop all faces in the image
# returns the list of croped faces.
def detect_faces_and_save(images):


  # Create list to store the maytricies of cropped_faces
  cropped_faces = []
  # Initialize the MTCNN detector
  detector = MTCNN()

  # Loop through the images in the input directory
  for im in images:

    # reads and stores the image in a var image
    image = cv2.imread(im)

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Detect faces in the image using MTCNN
    faces = detector.detect_faces(image)

    for i, face in enumerate(faces):
        x, y, width, height = face['box']
        x1, y1 = x, y
        x2, y2 = x + width, y + height

        # Crop the face from the image and add to list of cropped faces
        cropped_face = image[y1:y2, x1:x2]
        plt.imshow(cropped_face)
        plt.show()
        cropped_faces.append(cropped_face)
        
  print(cropped_faces[0])
  return cropped_faces



