import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Neural from '../../../assets/AI/hp.jpg'

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
import pandas as pd
import numpy as np
from sklearn import preprocessing
from matplotlib import pyplot as plt
%matplotlib inline

df = pd.read_csv("homeprices_banglore.csv")

sx = preprocessing.MinMaxScaler()
sy = preprocessing.MinMaxScaler()

scaled_X = sx.fit_transform(df.drop('price',axis='columns'))
scaled_y = sy.fit_transform(df['price'].values.reshape(df.shape[0],1))

scaled_y.reshape(20,)
`.trim();

const batch = `
def batch_gradient_descent(X, y_true, epochs, learning_rate = 0.01):
    number_of_features = X.shape[1]
    w = np.ones(shape=(number_of_features)) 
    b = 0
    total_samples = X.shape[0]                                                  # number of rows in X
    cost_list = []
    epoch_list = []
    
    for i in range(epochs):        
        y_predicted = np.dot(w, X.T) + b

        w_grad = -(2/total_samples)*(X.T.dot(y_true-y_predicted))
        b_grad = -(2/total_samples)*np.sum(y_true-y_predicted)
        
        w = w - learning_rate * w_grad
        b = b - learning_rate * b_grad
        
        cost = np.mean(np.square(y_true-y_predicted))                          # MSE (Mean Squared Error)
        
        if i%10==0:
            cost_list.append(cost)
            epoch_list.append(i)
    return w, b, cost, cost_list, epoch_list

w, b, cost, cost_list, epoch_list = batch_gradient_descent(scaled_X,scaled_y.reshape(scaled_y.shape[0],),500)
w, b, cost

plt.xlabel("epoch")
plt.ylabel("cost")
plt.plot(epoch_list,cost_list)

`.trim();

const predictions = `
def predict(area,bedrooms,w,b):
    scaled_X = sx.transform([[area, bedrooms]])[0]
    scaled_price = w[0] * scaled_X[0] + w[1] * scaled_X[1] + b
    return sy.inverse_transform([[scaled_price]])[0][0]

predict(2600,4,w,b)
predict(1000,2,w,b)
predict(1500,3,w,b)
`.trim();

const stochastics = `
import random
random.randint(0,6)                              # randit gives random number between two numbers specified in the argument.

def stochastic_gradient_descent(X, y_true, epochs, learning_rate = 0.01):
    number_of_features = X.shape[1]
    w = np.ones(shape=(number_of_features)) 
    b = 0
    total_samples = X.shape[0]
    
    cost_list = []
    epoch_list = []
    
    for i in range(epochs):    
        random_index = random.randint(0,total_samples-1) # random index from total samples
        sample_x = X[random_index]
        sample_y = y_true[random_index]
        y_predicted = np.dot(w, sample_x.T) + b
    
        w_grad = -(2/total_samples)*(sample_x.T.dot(sample_y-y_predicted))
        b_grad = -(2/total_samples)*(sample_y-y_predicted)
        
        w = w - learning_rate * w_grad
        b = b - learning_rate * b_grad
        cost = np.square(sample_y-y_predicted)
        
        if i%100==0: # at every 100th iteration record the cost and epoch value
            cost_list.append(cost)
            epoch_list.append(i)
    return w, b, cost, cost_list, epoch_list

w_sgd, b_sgd, cost_sgd, cost_list_sgd, epoch_list_sgd = SGD(scaled_X,scaled_y.reshape(scaled_y.shape[0],),10000)
w_sgd, b_sgd, cost_sgd

w , b 
plt.xlabel("epoch")
plt.ylabel("cost")
plt.plot(epoch_list_sgd,cost_list_sgd)

predict(2600,4,w_sgd, b_sgd) 
predict(1000,2,w_sgd, b_sgd)
predict(1500,3,w_sgd, b_sgd)
`.trim();

// const pipes = ``.trim();



class Stochastic extends Component {
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
              <h3>Implementation of stochastic and batch grandient descent in python.</h3>

              <i>We will use home prices data set to implement batch and stochastic gradient descent in
                python. Batch gradient descent uses <b>all</b> training samples in forward pass to calculate cumulitive
                error and than we adjust weights using derivaties. In stochastic GD, we <b>randomly pick one</b> training
                sample, perform forward pass, compute the error and immidiately adjust weights.</i>
              <br />
              <br />
              <ul>
                <li><b>Preprocessing/ Scaling: </b>Since our columns are on different sacle it is important to perform scaling on them.</li>
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
              <i>We should convert target column (price) into one dimensional array. It has become 2D due to
                scaling that we did above but now we should change to 1D</i>
              <br />
              <img src={Neural} alt="Theata" className="responsive2" style={redesign} />

              <h3>Now implement mini batch gradient descent. </h3>
              <ul>
                <li>numpy array with 1 row and columns equal to number of features. In
                  our case number_of_features = 2 (area, bedroom).</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={batch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Lets do some predictions now. </h3>
              <ul>
                <li>Here w1 = w[0] , w2 = w[1], w3 = w[2] and bias is b.</li>
                <li>Equation for price is w1*area + w2*bedrooms + w3*age + bias.</li>
                <li>scaled_X[0] is area.</li>
                <li>scaled_X[1] is bedrooms.</li>
                <li>scaled_X[2] is age.</li>
                <li>Once we get price prediction we need to to rescal it back to original value also since it returns 2D array, to get single value we need to do value[0][0].</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={predictions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Stochastic Gradient Descent Implementation</h3>
              <i>Stochastic GD will use randomly picked single training sample to calculate error and using this error we backpropage to adjust weights.</i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={stochastics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Compare this with weights and bias that we got using gradient descent. They both of quite similar.</i>
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


export default (withStyles(styles)(Stochastic));
