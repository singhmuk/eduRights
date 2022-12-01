import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Small from '../../../assets/AI/small_images.jpg'


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
import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt

tf.config.experimental.list_physical_devices()
tf.__version__
tf.test.is_built_with_cuda()
`.trim();

const available = `
(X_train, y_train), (X_test,y_test) = tf.keras.datasets.cifar10.load_data()

X_train.shape
y_train.shape
`.trim();

const visualization = `
def plot_sample(index):
    plt.figure(figsize = (10,1))
    plt.imshow(X_train[index])
    
plot_sample(0)
plot_sample(1)

classes = ["airplane","automobile","bird","cat","deer","dog","frog","horse","ship","truck"]

classes[y_train[3][0]]

y_train[:3]
y_test.shape
X_train.shape
`.trim();

const preprocessing = `
X_train_scaled = X_train / 255
X_test_scaled = X_test / 255

y_train_categorical = keras.utils.to_categorical(y_train, num_classes=10, dtype='float32')
y_test_categorical = keras.utils.to_categorical(y_test, num_classes=10, dtype='float32')

y_train[0:5]
y_train_categorical[0:5]
`.trim();

const building = `
model = keras.Sequential([
  keras.layers.Flatten(input_shape=(32,32,3)),
  keras.layers.Dense(3000, activation='relu'),
  keras.layers.Dense(1000, activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')    
])

model.compile(optimizer='SGD', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(X_train_scaled, y_train_categorical, epochs=1)
`.trim();

const predictions = `
np.argmax(model.predict(X_test_scaled)[0])
y_test[0]

def get_model():
    model = keras.Sequential([
            keras.layers.Flatten(input_shape=(32,32,3)),
            keras.layers.Dense(3000, activation='relu'),
            keras.layers.Dense(1000, activation='relu'),
            keras.layers.Dense(10, activation='sigmoid')    
        ])

    model.compile(optimizer='SGD', loss='categorical_crossentropy', metrics=['accuracy'])
    return model
`.trim();

const measure = `
%%timeit -n1 -r1 
with tf.device('/CPU:0'):
    cpu_model = get_model()
    cpu_model.fit(X_train_scaled, y_train_categorical, epochs=1)
    

%%timeit -n1 -r1                                                                  //measure training time on a GPU.
with tf.device('/GPU:0'):
    cpu_model = get_model()
    cpu_model.fit(X_train_scaled, y_train_categorical, epochs=1)
`.trim();

const epocs = `
%%timeit -n1 -r1 
with tf.device('/CPU:0'):
    cpu_model = get_model()
    cpu_model.fit(X_train_scaled, y_train_categorical, epochs=10)
    

%%timeit -n1 -r1 
with tf.device('/GPU:0'):
    cpu_model = get_model()
    cpu_model.fit(X_train_scaled, y_train_categorical, epochs=10)
    `.trim();

// const pipes = ``.trim();




class IntroAngular extends Component {
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
              <h3>Small Image Classification Using Simple Aritifical Neural Network: GPU Benchmarking.</h3>
              <ul>
                <li>This command shows list of physical devices available for tensorflow. If you have NVIDIA GPU you need to install CUDA toolkit
                  and cuDNN. Without proper installation you will not see GPU in list of devices.</li>
                <b>tf.config.experimental.list_physical_devices()</b>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <img src={Small} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={available}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Data Visualization</h3>
              <div style={titles}>
                <PrismCode
                  code={visualization}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Preprocessing: Scale images</h3>
              <div style={titles}>
                <PrismCode
                  code={preprocessing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Model building and training</h3>
              <div style={titles}>
                <PrismCode
                  code={building}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Let's make some predictions</h3>
              <div style={titles}>
                <PrismCode
                  code={predictions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Measure training time on a CPU.</h3>
              <div style={titles}>
                <PrismCode
                  code={measure}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Lets run same test for 10 epocs.</h3>
              <div style={titles}>
                <PrismCode
                  code={epocs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>You can see that GPU is almost 15 times faster. We ran only one epoch for benchmarking but for actual training we have to run many epochs and also when data volume is big running deep learning without GPU can consume so much time. This is the reason why GPUs are becoming popular in the field of deep learning.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(IntroAngular));
