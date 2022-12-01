import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Neural from '../../../assets/AI/digits_nn.jpg'


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
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
%matplotlib inline
import numpy as np

(X_train, y_train) , (X_test, y_test) = keras.datasets.mnist.load_data()
X_train[0].shape
plt.matshow(X_train[0])

X_train = X_train / 255
X_test = X_test / 255

X_train_flattened = X_train.reshape(len(X_train), 28*28)
X_test_flattened = X_test.reshape(len(X_test), 28*28)

X_train_flattened.shape
X_train_flattened[0]
`.trim();

const neural = `
model = keras.Sequential([keras.layers.Dense(10, input_shape=(784,), activation='sigmoid')])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(X_train_flattened, y_train, epochs=5)

model.evaluate(X_test_flattened, y_test)
y_predicted = model.predict(X_test_flattened)

plt.matshow(X_test[0])
`.trim();

const seaborn = `
import seaborn as sn

plt.figure(figsize = (10,7))
sn.heatmap(cm, annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('Truth')
`.trim();

const hidden = `
model = keras.Sequential([
  keras.layers.Dense(100, input_shape=(784,), activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(X_train_flattened, y_train, epochs=5)
model.evaluate(X_test_flattened,y_test)

y_predicted = model.predict(X_test_flattened)
y_predicted_labels = [np.argmax(i) for i in y_predicted]
cm = tf.math.confusion_matrix(labels=y_test,predictions=y_predicted_labels)

plt.figure(figsize = (10,7))
sn.heatmap(cm, annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('Truth')
`.trim();

const reshape = `
model = keras.Sequential([
  keras.layers.Flatten(input_shape=(28, 28)),
  keras.layers.Dense(100, activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')
])

model.compile(optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy'])

model.fit(X_train, y_train, epochs=10)


model.evaluate(X_test,y_test)
`.trim();


class AngularCompile extends Component {
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
              <h3>Handwritten digits classification using neural network</h3>
              <b>we will classify handwritten digits using a simple neural network which has only input and output
                layers. We will than add a hidden layer and see how the performance of the model improves</b>
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

              <h3>Very simple neural network with no hidden layers</h3>
              <img src={Neural} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={neural}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Seaborn</h3>
              <ul>
                <li>Seaborn library used for making statistical graphics in Python. It builds on top of matplotlib and integrates with pandas data structures.</li>
                <li>Seaborn helps to explore and understand our data.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={seaborn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using hidden layer</h3>
              <div style={titles}>
                <PrismCode
                  code={hidden}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using Flatten layer so that we don't have to call .reshape on input dataset</h3>
              <div style={titles}>
                <PrismCode
                  code={reshape}
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

export default (withStyles(styles)(AngularCompile));
