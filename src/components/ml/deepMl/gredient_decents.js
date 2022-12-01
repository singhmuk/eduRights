import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import gradient from '../../../assets/ML/output.png'


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


const cluster = `
import numpy as np
import matplotlib.pyplot as plt

%matplotlib inline
def gradient_descent(x,y):
    m_curr = b_curr = 0
    rate = 0.01
    n = len(x)
    plt.scatter(x,y,color='red',marker='+',linewidth='5')
    for i in range(10000):
        y_predicted = m_curr * x + b_curr
        print (m_curr,b_curr, i)
        plt.plot(x,y_predicted,color='green')
        md = -(2/n)*sum(x*(y-y_predicted))
        yd = -(2/n)*sum(y-y_predicted)
        m_curr = m_curr - rate * md
        b_curr = b_curr - rate * yd
        
        
x = np.array([1,2,3,4,5])
y = np.array([5,7,9,11,13])

gradient_descent(x,y) 
`.trim();

const gradientPy = `
import numpy as np

def gradient_descent(x,y):
    m=b = 0
    iterations = 1000
    n = len(x)
    learning_rate = 0.08

    for i in range(iterations):
        y_predicted = m*x + b
        cost = (1/n) * sum([val**2 for val in (y-y_predicted)])
        md = -(2/n)*sum(x*(y-y_predicted))
        bd = -(2/n)*sum(y-y_predicted)
        m = m-learning_rate * md
        b = b-learning_rate * bd
        print ("m {}, b {}, cost {} iteration {}".format(m,b,cost, i))

x = np.array([1,2,3,4,5])
y = np.array([5,7,9,11,13])

gradient_descent(x,y)`.trim();

const chains = `
dl/dw = dl/de * de/dy * dy/dw
`.trim();

class Gradient extends Component {
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
              <h3>Gradient descent</h3>
              Gradient descent is an optimization algorithm that's used when training a ML model. It's based on a
              convex function and tweaks its parameters iteratively to minimize a given function to its local minimum.
              <br />
              <br />
              <b>A gradient measures how much the output of a function changes if you change the inputs a little bit</b>
              <br />

              <h3>WHAT IS A GRADIENT?</h3>
              A gradient is a derivative of a function that has more than one input variable.
              Known as the slope of a function, the gradient simply measures the change in all weights w.r.t the change
              in error.
              <br />
              <br />
              <b>Importance of the Learning Rate:</b>
              <ul>
                <li>How big the steps are gradient descent takes into the direction of the local minimum are determined by
                  the learning rate, which figures out how fast/ slow we will move towards the optimal weights.</li>
                <li>To reach the local minimum we must set the learning rate to an appropriate value, which is neither
                  too low nor too high. This is important because if the steps it takes are too big, it may not reach
                  the local minimum because it bounces back and forth between the convex function of gradient descent.
                  If we set the learning rate to a very small value, gradient descent will eventually reach the local minimum but
                  that may take a while. </li>
              </ul>
              <br />

              <h3>Types of Gradient Descent</h3>
              Three types based on amount of data they use.
              <ul>
                <li><b>BATCH GRADIENT DESCENT(vanilla gradient descen): </b>Calculates the error.</li>
                <ul>
                  <li>Advantages of batch gradient descent are its computational efficient,it produces a
                    stable error gradient and a stable convergence.</li>
                  <li>we go through all training samples and calculate cumulative error.</li>
                  <li>Now back propagate and adjust weights.</li>
                  <li>Good for small training set.</li>
                </ul>
                <br />
                <li><b>STOCHASTIC GRADIENT DESCENT: </b>It updates the parameters for each training example one by one.</li>
                <ul>
                  <li>Use one(randomly picked) sample for a forward pass and then adjust weights.</li>
                  <li>Good when training set is very big and we don't want too much computation.</li>
                </ul>
                <br />
                <li><b>MINI-BATCH GRADIENT DESCENT: </b>Combination of the concepts of SGD and batch gradient descent. </li>
                <ul>
                  <li>It simply splits the training dataset into small batches and performs an update for each of
                    those batches. This creates a balance between the robustness of SGD and the
                    efficiency of batch gradient descent.</li>
                  <li>Is like SGD instead of choosing 1 randomly picked training sample, We will use a batch of randomly picked training samples.</li>
                  <li>Use a batch of (randomly picked) samples for a forward pass and then adjust weights.</li>
                  <li>Common mini-batch sizes range between 50 and 256.</li>
                </ul>
              </ul>
              <br />

              <img src={gradient} alt="gradient" className="responsive" style={redesign} />
              <div style={titles}>
                <PrismCode
                  code={cluster}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>With Python</h3>
              <div style={titles}>
                <PrismCode
                  code={gradientPy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Chain Rule</h3>
              <div style={titles}>
                <PrismCode
                  code={chains}
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

export default (withStyles(styles)(Gradient));
