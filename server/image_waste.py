import cv2
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.models import load_model

image_path = r"C:\Users\Meetali\Desktop\augen-react\server\uploads\four.jpg"

model = load_model('./waste_model_binary.h5') 

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (image_width, image_height))
    img = img / 255.0  # Normalize pixel values to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

image_width = 64
image_height = 64


def predict(image_path):
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    return prediction


prediction = predict(image_path)


class_labels = ['battery',
 'biological',
 'brown-glass',
 'cardboard',
 'clothes',
 'green-glass',
 'metal',
 'paper',
 'plastic',
 'shoes',
 'trash',
 'white-glass']
# Get the index of the predicted class with highest probability
predicted_class_index = np.argmax(prediction)
predicted_class_label = class_labels[predicted_class_index]

threshold = 0.05  # Adjust as needed
predicted_classes = (prediction > threshold).astype(int)

for i, class_label in enumerate(class_labels):
    if predicted_classes[0, i] == 1:
        print("Predicted Class:", class_label)
        print("Probability:", prediction[0, i])
predicted_labels = []
predicted_probabilities = []
for i, class_label in enumerate(class_labels):
    if predicted_classes[0, i] == 1:
        predicted_labels.append(class_label)
        predicted_probabilities.append(prediction[0, i])

plt.figure(figsize=(8, 8))
plt.pie(predicted_probabilities, labels=predicted_labels, autopct='%1.1f%%', startangle=140)
plt.title('waste divisson')
plt.show()

