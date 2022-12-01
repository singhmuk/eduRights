import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})


const childsFile = `
import numpy as np
import cv2
import PIL.Image as Image
import os
import matplotlib.pylab as plt
import tensorflow as tf
import tensorflow_hub as hub
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential


IMAGE_SHAPE = (224, 224)                                      #Make predictions using ready made model (without training).

classifier = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4", input_shape=IMAGE_SHAPE+(3,))
])

gold_fish = Image.open("goldfish.jpg").resize(IMAGE_SHAPE)
gold_fish = np.array(gold_fish)/255.0

gold_fish[np.newaxis, ...]
result = classifier.predict(gold_fish[np.newaxis, ...])

predicted_label_index = np.argmax(result)
predicted_label_index

# tf.keras.utils.get_file('ImageNetLabels.txt',
#                         'https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt')
image_labels = []
with open("ImageNetLabels.txt", "r") as f:
    image_labels = f.read().splitlines()
image_labels[:5]

image_labels[predicted_label_index]
`.trim();

const flowers = `
dataset_url = "https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz"
data_dir = tf.keras.utils.get_file('flower_photos', origin=dataset_url,  cache_dir='.', untar=True)

data_dir

import pathlib
data_dir = pathlib.Path(data_dir)

list(data_dir.glob('*/*.jpg'))[:5]
image_count = len(list(data_dir.glob('*/*.jpg')))
print(image_count)

roses = list(data_dir.glob('roses/*'))
roses[:5]

PIL.Image.open(str(roses[1]))

tulips = list(data_dir.glob('tulips/*'))
PIL.Image.open(str(tulips[0]))
`.trim();

const opencv = `
flowers_images_dict = {
  'roses': list(data_dir.glob('roses/*')),
  'daisy': list(data_dir.glob('daisy/*')),
  'dandelion': list(data_dir.glob('dandelion/*')),
  'sunflowers': list(data_dir.glob('sunflowers/*')),
  'tulips': list(data_dir.glob('tulips/*')),
}

flowers_labels_dict = {
  'roses': 0,
  'daisy': 1,
  'dandelion': 2,
  'sunflowers': 3,
  'tulips': 4,
}

flowers_images_dict['roses'][:5]
str(flowers_images_dict['roses'][0])

img = cv2.imread(str(flowers_images_dict['roses'][0]))
cv2.resize(img,(224,224)).shape
X, y = [], []

for flower_name, images in flowers_images_dict.items():
    for image in images:
        img = cv2.imread(str(image))
        resized_img = cv2.resize(img,(224,224))
        X.append(resized_img)
        y.append(flowers_labels_dict[flower_name])
        
X = np.array(X)
y = np.array(y)
`.trim();

const split = `
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

X_train_scaled = X_train / 255
X_test_scaled = X_test / 255


X[0].shape                                                #Make prediction using pre-trained model on new flowers dataset.
IMAGE_SHAPE+(3,)

x0_resized = cv2.resize(X[0], IMAGE_SHAPE)
x1_resized = cv2.resize(X[1], IMAGE_SHAPE)
x2_resized = cv2.resize(X[2], IMAGE_SHAPE)

plt.axis('off')
plt.imshow(X[0])

plt.axis('off')
plt.imshow(X[1])

plt.axis('off')
plt.imshow(X[2])

predicted = classifier.predict(np.array([x0_resized, x1_resized, x2_resized]))
predicted = np.argmax(predicted, axis=1)
predicted

image_labels[795]
`.trim();

const images = `
feature_extractor_model = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"

pretrained_model_without_top_layer = hub.KerasLayer(
    feature_extractor_model, input_shape=(224, 224, 3), trainable=False)
    
num_of_flowers = 5
model = tf.keras.Sequential([pretrained_model_without_top_layer, tf.keras.layers.Dense(num_of_flowers)])

model.summary()


model.compile(
  optimizer="adam",
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['acc'])

model.fit(X_train_scaled, y_train, epochs=5)

model.evaluate(X_test_scaled,y_test)
`.trim();



class Transfer extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>Transfer learning in image classification</h3>
              We will use transfer learning and take pre-trained model from google's Tensorflow Hub and re-train that
              on flowers dataset.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Load flowers dataset</h3>
              <i>cache_dir indicates where to download data.</i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={flowers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Read flowers images from disk into numpy array using opencv</h3>
              <div style={titles}>
                <PrismCode
                  code={opencv}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Train test split</h3>
              <div style={titles}>
                <PrismCode
                  code={split}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Now take pre-trained model and retrain it using flowers images</h3>
              <div style={titles}>
                <PrismCode
                  code={images}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(Transfer));
