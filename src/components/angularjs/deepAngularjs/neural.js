import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import NeuralKeras from '../../../assets/AI/Slide1.PNG'
import Fashion from '../../../assets/AI/fashion_neural_net.png'


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
import keras
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

keras.backend.backend()                                                         #Using TensorFlow backend.

fm = keras.datasets.fashion_mnist
(X_train, y_train), (X_test, y_test) = fm.load_data()
X_train[0]

plt.matshow(X_train[0])
`.trim();

const training = `
X_train = X_train/255
X_test = X_test/255
`.trim();

const sequential = `
from keras.models import Sequential
from keras.layers import Flatten, Dense, Activation

model = Sequential()
model.add(Flatten(input_shape=[28, 28]))
model.add(Dense(100, activation="relu"))
model.add(Dense(10, activation="softmax"))

model.summary()

model.compile(loss="sparse_categorical_crossentropy",  optimizer="adam", metrics=["accuracy"])
              
model.fit(X_train, y_train)
model.evaluate(X_test, y_test)
plt.matshow(X_test[0])
yp = model.predict(X_test)
np.argmax(yp[0])

class_labels = ["T-shirt/top","Trouser","Pullover","Dress","Coat","Sandal","Shirt","Sneaker","Bag","Ankle boot"]

class_labels[np.argmax(yp[0])]
`.trim();

// const pipes = ``.trim();


class NeyralNetwork extends Component {
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
              <h3>Build our first neural network in Keras for image classification problem</h3>
              <b>We will use keras fashion MNIST dataset. This consist of 60000 28X28 pixel images and 10000 test images, these images are classified in one of the 10 categories shown below</b>
              <br />
              <img src={NeuralKeras} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              Each image is 28 x 28 pixel in dimension.
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

              <h3>Normalize training data before training the neural net</h3>
              <div style={titles}>
                <PrismCode
                  code={training}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Now build the Sequential Model and add layers into it</h3>
              <img src={Fashion} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={sequential}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              {/* <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(NeyralNetwork));
