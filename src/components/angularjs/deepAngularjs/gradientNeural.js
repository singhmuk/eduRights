import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Gradients from '../../../assets/AI/nn.png'

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
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from matplotlib import pyplot as plt
%matplotlib inline

df = pd.read_csv("insurance_data.csv")

X_train, X_test, y_train, y_test = train_test_split(df[['age','affordibility']],df.bought_insurance,test_size=0.2, 
    random_state=25)


#Preprocessing: Scale the data so both age and affordibility are in same scaling range.
X_train_scaled = X_train.copy()
X_train_scaled['age'] = X_train_scaled['age'] / 100

X_test_scaled = X_test.copy()
X_test_scaled['age'] = X_test_scaled['age'] / 100
`.trim();

const keras = `
model = keras.Sequential([
  keras.layers.Dense(1, input_shape=(2,), activation='sigmoid', kernel_initializer='ones', bias_initializer='zeros')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train_scaled, y_train, epochs=5000)

model.evaluate(X_test_scaled,y_test)                                            #Evaluate the model on test set.
model.predict(X_test_scaled)

y_test
`.trim();

const weights = `
import math

coef, intercept = model.get_weights()

def sigmoid(x):
    return 1 / (1 + math.exp(-x))
sigmoid(18)

X_test
`.trim();

const prediction = `
def prediction_function(age, affordibility):
    weighted_sum = coef[0]*age + coef[1]*affordibility + intercept
    return sigmoid(weighted_sum)

prediction_function(.47, 1)
prediction_function(.18, 1)
`.trim();

const descent = `
def sigmoid_numpy(X):
   return 1/(1+np.exp(-X))

sigmoid_numpy(np.array([12,0,1]))

def log_loss(y_true, y_predicted):
    epsilon = 1e-15
    y_predicted_new = [max(i,epsilon) for i in y_predicted]
    y_predicted_new = [min(i,1-epsilon) for i in y_predicted_new]
    y_predicted_new = np.array(y_predicted_new)
    return -np.mean(y_true*np.log(y_predicted_new)+(1-y_true)*np.log(1-y_predicted_new))
`.trim();

const implementse = `
def gradient_descent(age, affordability, y_true, epochs, loss_thresold):
    w1 = w2 = 1
    bias = 0
    rate = 0.5
    n = len(age)
    for i in range(epochs):
        weighted_sum = w1 * age + w2 * affordability + bias
        y_predicted = sigmoid_numpy(weighted_sum)
        loss = log_loss(y_true, y_predicted)

        w1d = (1/n)*np.dot(np.transpose(age),(y_predicted-y_true)) 
        w2d = (1/n)*np.dot(np.transpose(affordability),(y_predicted-y_true)) 

        bias_d = np.mean(y_predicted-y_true)
        w1 = w1 - rate * w1d
        w2 = w2 - rate * w2d
        bias = bias - rate * bias_d

        print (f'Epoch:{i}, w1:{w1}, w2:{w2}, bias:{bias}, loss:{loss}')

        if loss<=loss_thresold:
            break

    return w1, w2, bias
    
gradient_descent(X_train_scaled['age'],X_train_scaled['affordibility'],y_train,1000, 0.4631)

coef, intercept
`.trim();


class GradientNeural extends Component {
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
              <h3>Implement Gradient Descent For Neural Network (or Logistic Regression)</h3>
              An optimization algorithm used to train machine learning models by minimizing errors between predicted and actual results.
              <br />
              <br />

              <b>Predicting if a person would buy life insurnace based on his age using logistic regression</b>
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
              <br />

              <b>Model Building: First build a model in keras/tensorflow and see what weights and bias values it
                comes up with. We will than try to reproduce same weights and bias in our plain python implementation
                of gradient descent. Below is the architecture of our simple neural network</b>
              <br />
              <br />
              <img src={Gradients} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={keras}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Now get the value of weights and bias from the model</h3>
              <div style={titles}>
                <PrismCode
                  code={weights}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Instead of model.predict, write our own prediction function that uses w1,w2 and bias.</h3>
              <div style={titles}>
                <PrismCode
                  code={prediction}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Now we start implementing gradient descent in plain python. Again the goal is to come up with same w1, w2 and bias that keras model calculated. We want to show how keras/tensorflow would have computed these values internally using gradient descent</b>
              <br />
              <br />
              <i>First write couple of helper routines such as sigmoid and log_loss.</i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={descent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>All right now comes the time to implement our final gradient descent function</b>
              <div style={titles}>
                <PrismCode
                  code={implementse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>This shows that in the end we were able to come up with same value of w1,w2 and bias using a plain python implementation of gradient descent function.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(GradientNeural));
