import torch
import cv2
import numpy as np
import math
import base64

def detect_circles(bytes_image):
    model = torch.hub.load(
      'ultralytics/yolov5', 'custom',
      './model.pt', force_reload=True
    )

    nparr = np.frombuffer(bytes_image, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = model(img)

    useful_results = results.xyxy[0].numpy()
    for result in useful_results:
        xmin, ymin, xmax, ymax, confidence, clas = result
        x_centre = math.floor((xmin + xmax) / 2)
        y_centre = math.floor((ymin + ymax) / 2)
        radius = math.floor(min((xmax - xmin - 10)/2, (ymax - ymin - 10)/2))
        cv2.circle(img, (x_centre, y_centre), radius, (0, 255, 0), 2)

    retval, buffer = cv2.imencode('.png', img)
    img_text = base64.b64encode(buffer)
    return img_text