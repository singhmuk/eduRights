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
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
%matplotlib inline

(X_train, y_train) , (X_test, y_test) = keras.datasets.mnist.load_data()

plt.matshow(X_train[0])

X_train = X_train / 255
X_test = X_test / 255

X_train_flattened = X_train.reshape(len(X_train), 28*28)
X_test_flattened = X_test.reshape(len(X_test), 28*28)

X_train_flattened.shape
`.trim();

const reshape = `
model = keras.Sequential([
  keras.layers.Flatten(input_shape=(28, 28)),
  keras.layers.Dense(100, activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

tb_callback = tf.keras.callbacks.TensorBoard(log_dir="logs/", histogram_freq=1)

model.fit(X_train, y_train, epochs=5, callbacks=[tb_callback])

%load_ext tensorboard
%tensorboard --logdir logs/fit

model.get_weights()
`.trim();

// const pipes = ``.trim();

// const pipes = ``.trim();


class Tensorboards extends Component {
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
              <h3>Tensorboard</h3>
              <ul>
                <li>It' a TensorFlow's visualization toolkit.</li>
                <li>Tracking and visualizing metrics such as loss and accuracy.</li>
                <li>Displaying images, text, and audio data.</li>
                <li>Profiling TensorFlow programs.</li>
              </ul>
              <br />

              <b>we will classify handwritten digits using a simple neural network which has only input and output layers. We will than add a
                hidden layer and see how the performance of the model improves.</b>
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

              <h3>Using Flatten layer so that we don't have to call .reshape on input dataset.</h3>
              <div style={titles}>
                <PrismCode
                  code={reshape}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Either run above inline magic or go to git bash or your command prompt and type below to run it,
                `tensorboard --logdir logs/`
                This will launch tensorboard at this url which you can open in your browser `http://localhost:6006/`.</i>

              {/* <h3></h3>
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


export default (withStyles(styles)(Tensorboards));
