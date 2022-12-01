import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Equations from '../../../assets/ML/perceptrons.png'
import Perceptrons from '../../../assets/ML/perceptrons2.png'
import PerceptronsGrapg from '../../../assets/ML/perceptrons3.png'
import PerceptronsGraps from '../../../assets/ML/perceptrons4.png'


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
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


const stack = `
import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iters=1000):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.activation_func = self._unit_step_func
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # init parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        y_ = np.array([1 if i > 0 else 0 for i in y])

        for _ in range(self.n_iters):

            for idx, x_i in enumerate(X):

                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self.activation_func(linear_output)

                # Perceptron update rule
                update = self.lr * (y_[idx] - y_predicted)

                self.weights += update * x_i
                self.bias += update

    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        y_predicted = self.activation_func(linear_output)
        return y_predicted

    def _unit_step_func(self, x):
        return np.where(x >= 0, 1, 0)
`.trim();

const label = `
if 0.5x + 0.5y => 0, then 1
if 0.5x + 0.5y < 0, then 0.
`.trim();

const testings = `
if __name__ == "__main__":
    # Imports
    import matplotlib.pyplot as plt
    from sklearn.model_selection import train_test_split
    from sklearn import datasets

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)
        return accuracy

    X, y = datasets.make_blobs(
        n_samples=150, n_features=2, centers=2, cluster_std=1.05, random_state=2
    )
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=123
    )

    p = Perceptron(learning_rate=0.01, n_iters=1000)
    p.fit(X_train, y_train)
    predictions = p.predict(X_test)

    print("Perceptron classification accuracy", accuracy(y_test, predictions))

    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    plt.scatter(X_train[:, 0], X_train[:, 1], marker="o", c=y_train)

    x0_1 = np.amin(X_train[:, 0])
    x0_2 = np.amax(X_train[:, 0])

    x1_1 = (-p.weights[0] * x0_1 - p.bias) / p.weights[1]
    x1_2 = (-p.weights[0] * x0_2 - p.bias) / p.weights[1]

    ax.plot([x0_1, x0_2], [x1_1, x1_2], "k")

    ymin = np.amin(X_train[:, 1])
    ymax = np.amax(X_train[:, 1])
    ax.set_ylim([ymin - 3, ymax + 3])

    plt.show()
    `.trim();

// const stack = ``.trim();


class Perceptron extends Component {
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
              <h3>Perceptron – Basics of Neural Networks</h3>
              A single-layer perceptron is the basic unit of a neural network. A perceptron consists of input values, weights
              and a bias, a weighted sum and activation function.
              <br />
              <br />

              <i>Perceptron consists of one/ more inputs, a processor, and only one o/p.</i>
              <br />
              <br />
              A perceptron works by taking in some numerical i/p along with what is known as weights and a bias. It then
              multiplies these i/p with the respective weights(weighted sum). These products are then added together along
              with the bias. The activation function takes the weighted sum and the bias as i/p and returns a final o/p.
              <br />
              <br />

              <ul>
                <li>A perceptron consists of four parts: input values, weights and a bias, a weighted sum, and
                  activation function.</li>
                <li><b>Function may look like: </b>y = xw + x2w2 +...+ xnwn</li>
                <ul>
                  <li>bias  is alwase 1.</li>
                  <li>This function is called the weighted sum because it is the sum of the weights and inputs. This looks like a
                    good function, but what if we wanted the outputs to fall into a certain range 0 to 1.</li>
                  <li>We can do this by using an activation function. An <b>activation function</b> is
                    a function that converts the i/p into a certain o/p based on a set of rules.</li>
                  <br />
                  <img src={Equations} alt="Equations" className="responsive" style={redesign} />
                  <br />
                  <br />
                  There are different kinds of activation functions that exist.
                  <br />
                  <b>1. Hyperbolic Tangent: </b>Used to o/p a number from -1 to 1.<br />
                  <b>2. Logistic Function: </b>Used to o/p a number from 0 to 1.
                </ul>
              </ul>
              <br />

              <b>Why are perceptron's used?</b>
              <br />
              Perceptrons are the building blocks of neural networks. It is typically used for supervised learning of
              binary classifiers.
              <br />
              <img src={Perceptrons} alt="Equations" className="responsive" style={redesign} />
              <br />

              Suppose our goal was to separates this data so that there is a distinction between the blue dots and the red dots.
              <br />
              <br />
              A perceptron can create a decision boundary for a binary classification, where a decision boundary is
              regions of space on a graph that separates different data points.
              <br />
              <br />
              Let wx = -0.5, wy = 0.5 and b = 0
              <br />
              Then the function for the perceptron.<br />
              0.5x + 0.5y = 0
              <br />
              <br />
              and the graph is.
              <br />
              <img src={PerceptronsGrapg} alt="Equations" className="responsive" style={redesign} />
              <br />
              Let’s suppose that the activation function, in this case, is a simple step function that outputs either 0 or 1.
              The perceptron function will then label the blue dots as 1 and the red dots as 0.
              <div style={titles}>
                <PrismCode
                  code={label}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Therefore, the function 0.5x + 0.5y = 0 creates a decision boundary that separates the red and blue points.
              <br />
              <img src={PerceptronsGraps} alt="Equations" className="responsive" style={redesign} />
              <br />

              <b>Overall, we see that a perceptron can do basic classification using a decision boundary.</b>
              <br />

              <h3>Example</h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Testing</h3>
              <div style={titles}>
                <PrismCode
                  code={testings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              {/* <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
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

export default (withStyles(styles)(Perceptron));
