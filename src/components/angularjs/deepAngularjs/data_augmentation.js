import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Neural from '../../../assets/AI/daisy2.JPG'

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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
dataset_url = "https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz"
data_dir = tf.keras.utils.get_file('flower_photos', origin=dataset_url,  cache_dir='.', untar=True)
data_dir

import pathlib
data_dir = pathlib.Path(data_dir)

list(data_dir.glob('*/*.jpg'))[:5]

image_count = len(list(data_dir.glob('*/*.jpg')))

roses = list(data_dir.glob('roses/*'))
roses[:5]

PIL.Image.open(str(roses[1]))

tulips = list(data_dir.glob('tulips/*'))
PIL.Image.open(str(tulips[0]))
`.trim();

const flowers = `
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

cv2.resize(img,(180,180)).shape
X, y = [], []

for flower_name, images in flowers_images_dict.items():
    for image in images:
        img = cv2.imread(str(image))
        resized_img = cv2.resize(img,(180,180))
        X.append(resized_img)
        y.append(flowers_labels_dict[flower_name])
        
        
X = np.array(X)
y = np.array(y)
`.trim();

const split = `
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

X_train_scaled = X_train / 255                                                            #Preprocessing: scale images.
X_test_scaled = X_test / 255
`.trim();

const convolutional = `
num_classes = 5

model = Sequential([
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(num_classes)
])

model.compile(optimizer='adam', loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=['accuracy'])
              
model.fit(X_train_scaled, y_train, epochs=30) 
model.evaluate(X_test_scaled,y_test) 

predictions = model.predict(X_test_scaled)
score = tf.nn.softmax(predictions[0])
np.argmax(score)

y_test[0]
`.trim();

const augmentation = `
data_augmentation = keras.Sequential(
  [
    layers.experimental.preprocessing.RandomFlip("horizontal", input_shape=(img_height, img_width, 3)),
    layers.experimental.preprocessing.RandomRotation(0.1),
    layers.experimental.preprocessing.RandomZoom(0.1),
  ]
)


plt.axis('off')                                                                                   #Original Image.
plt.imshow(X[0])                     
`.trim();

const generated = `
plt.axis('off')
plt.imshow(data_augmentation(X)[0].numpy().astype("uint8"))

num_classes = 5

model = Sequential([
  data_augmentation,
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Dropout(0.2),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(num_classes)
])

model.compile(optimizer='adam', loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=['accuracy'])
              
model.fit(X_train_scaled, y_train, epochs=30)  
model.evaluate(X_test_scaled,y_test)
`.trim();



class dataAugmentation extends Component {
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
              <h3>Data Augmentation To Address Overfitting In Flower Classification CNN</h3>
              Data augmentation is a process of generating new training samples from current training dataset using transformations such as zoom, rotations,
              change in contrast etc.
              <br />
              <i>We build a CNN to classify flower images. Also see how our model overfits and overfitting can be addressed using data augmentation.</i>
              <br />
              <br />

              <b>4 new training samples are generated from original sample using different transformations.</b>
              <br />
              <br />
              <img src={Neural} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <b>Load flowers dataset.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Read flowers images from disk into numpy array using opencv.</h3>
              <div style={titles}>
                <PrismCode
                  code={flowers}
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

              <h3>Build convolutional neural network and train it.</h3>
              <div style={titles}>
                <PrismCode
                  code={convolutional}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Improve Test Accuracy Using Data Augmentation</h3>
              <div style={titles}>
                <PrismCode
                  code={augmentation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Newly generated training sample using data augmentation</h3>
              <div style={titles}>
                <PrismCode
                  code={generated}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>By using data augmentation and drop out layer the accuracy of test set predictions is increased to 73.74%.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(dataAugmentation));
