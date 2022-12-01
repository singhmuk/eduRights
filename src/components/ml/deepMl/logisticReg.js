import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Equations from '../../../assets/ML/linear_regression.png'
import Thersolds from '../../../assets/ML/thersold.png'
import Outliner from '../../../assets/ML/regression_with_outlier.png'
import Sigmoid from '../../../assets/ML/sigmoid_function.png'
import LinearVsLogistic from '../../../assets/ML/LinearVsLogistic.jpg'
import Logistic from '../../../assets/ML/logistic.jpg'


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


const cluster = `
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
%matplotlib inline

df = pd.read_csv("insurance_data.csv")

plt.scatter(df.age,df.bought_insurance,marker='+',color='red')
X_train, X_test, y_train, y_test = train_test_split(df[['age']],df.bought_insurance,train_size=0.8)
model = LogisticRegression()
model.fit(X_train, y_train)

y_predicted = model.predict(X_test)
model.predict_proba(X_test)
model.score(X_test,y_test)

y_predicted
model.coef_                                                       #model.coef_ indicates value of m in y=m*x + b.
model.intercept_                                                  #model.intercept_ indicates value of b in y=m*x + b.


#Lets defined sigmoid function and do the math.
import math
def sigmoid(x):
  return 1 / (1 + math.exp(-x))
  
def prediction_function(age):
  z = 0.042 * age - 1.53 # 0.04150133 ~ 0.042 and -1.52726963 ~ -1.53
  y = sigmoid(z)
  return y
  
age = 35
prediction_function(age)

age = 43
prediction_function(age)
`.trim();

const multiClass = `
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
%matplotlib inline

df = pd.read_csv("insurance_data.csv")

plt.scatter(df.age,df.bought_insurance,marker='+',color='red')
X_train, X_test, y_train, y_test = train_test_split(df[['age']],df.bought_insurance,train_size=0.8)
model = LogisticRegression()
model.fit(X_train, y_train)

y_predicted = model.predict(X_test)
model.predict_proba(X_test)
model.score(X_test,y_test)

y_predicted
`.trim();

const sigmoid = `
import math
def sigmoid(x):
  return 1 / (1 + math.exp(-x))
  
def prediction_function(age):
  z = 0.042 * age - 1.53 # 0.04150133 ~ 0.042 and -1.52726963 ~ -1.53
  y = sigmoid(z)
  return y
  
age = 35
prediction_function(age)

age = 43
prediction_function(age)
  `.trim();

const stack = `
  import numpy as np
  
  
  class LogisticRegression:
      def __init__(self, learning_rate=0.001, n_iters=1000):
          self.lr = learning_rate
          self.n_iters = n_iters
          self.weights = None
          self.bias = None
  
      def fit(self, X, y):
          n_samples, n_features = X.shape
  
          self.weights = np.zeros(n_features)
          self.bias = 0
  
          for _ in range(self.n_iters):
              # approximate y with linear combination of weights and x, plus bias
              linear_model = np.dot(X, self.weights) + self.bias
              y_predicted = self._sigmoid(linear_model)                                 # apply sigmoid function
  
              dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
              db = (1 / n_samples) * np.sum(y_predicted - y)
              
              self.weights -= self.lr * dw
              self.bias -= self.lr * db
  
      def predict(self, X):
          linear_model = np.dot(X, self.weights) + self.bias
          y_predicted = self._sigmoid(linear_model)
          y_predicted_cls = [1 if i > 0.5 else 0 for i in y_predicted]
          return np.array(y_predicted_cls)
  
      def _sigmoid(self, x):
          return 1 / (1 + np.exp(-x))
  `.trim();

const testings = `
if __name__ == "__main__":
      # Imports
      from sklearn.model_selection import train_test_split
      from sklearn import datasets
  
      def accuracy(y_true, y_pred):
          accuracy = np.sum(y_true == y_pred) / len(y_true)
          return accuracy
  
      bc = datasets.load_breast_cancer()
      X, y = bc.data, bc.target
  
      X_train, X_test, y_train, y_test = train_test_split(
          X, y, test_size=0.2, random_state=1234
      )
  
      regressor = LogisticRegression(learning_rate=0.0001, n_iters=1000)
      regressor.fit(X_train, y_train)
      predictions = regressor.predict(X_test)
  
      print("LR classification accuracy:", accuracy(y_test, predictions))
`.trim();

const poly = `
import matplotlib.pyplot as plt

x = [1,2,3,5,6,7,8,9,10,12,13,14,15,16,18,19,21,22]
y = [100,90,80,60,60,55,60,65,70,70,75,76,78,79,90,99,99,100]

plt.scatter(x, y)
plt.show()
`.trim()

const poly_2 = `
x = [1,2,3,5,6,7,8,9,10,12,13,14,15,16,18,19,21,22]
y = [100,90,80,60,60,55,60,65,70,70,75,76,78,79,90,99,99,100]

mymodel = np.poly1d(np.polyfit(x, y, 3))

myline = np.linspace(1, 22, 100)

plt.scatter(x, y)
plt.plot(myline, mymodel(myline))
plt.show()
`.trim()


class LogisticRegs extends Component {
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
              <h3>Logistic Regression (Supervised ML)</h3>
              Used to model the probability of a certain class/ event. It is used when the data is linearly
              separable and the outcome is binary/ dichotomous in nature.
              <br />
              <br />
              <i><b>Ex. of Binary classification</b> Yes/No, Pass/Fail, Win/Lose, Cancerous/Non-cancerous, etc.</i>
              <br />
              <br />
              <b>Types of Logistic Regression</b>
              <ul>
                <li><b>Simple Logistic Regression: </b>A single independent is used to predict the output.</li>
                <li><b>Multiple logistic regression: </b>Multiple independent variables are used to predict the output.</li>
              </ul>
              <br />
              <b>Extensions of Logistic Regression</b>
              <br />
              Although it is said Logistic regression is used for Binary Classification, it can be extended to
              solve multiclass classification problems.
              <br />
              <br />

              <ul>
                <li><b>Multinomial Logistic Regression: </b>The o/p variable is discrete in three/ more classes with no natural ordering.</li>
                <ul>
                  <li><b>Food texture: </b>Crunchy, Mushy, Crispy.</li>
                  <li><b>Hair colour: </b>Blonde, Brown, Brunette, Red​.</li>
                </ul>
                <br />
                <li><b>Ordered Logistic Regression: </b>The o/p variable is discrete in three/ more classes with the ordering of the levels.</li>
                <ul>
                  <li><b>Customer Rating: </b>extremely dislike, dislike, neutral, like, extremely like.</li>
                  <li><b>Income level: </b>low income, middle income, high income.</li>
                </ul>
              </ul>
              <br />
              Now, let us try if we can use linear regression to solve a binary class classification problem. Assume we have a
              dataset that is linearly separable and has the o/p that is discrete in two classes (0, 1).
              <br />
              <img src={Equations} alt="Equations" className="responsive" style={redesign} />
              <br />
              we draw a straight line L1 such that the sum of distances of all the data points to the line is minimal.
              <br />
              <br />
              We define a threshold T = 0.5, above which the o/p belongs to class 1 otherwise class 0.
              <br />
              <img src={Thersolds} alt="Equations" className="responsive" style={redesign} />
              <ul>
                <li><b>Case 1: </b>The predicted value for x1 is ≈0.2 which is less than the threshold, so x1 belongs to class 0.</li>
                <li><b>Case 2: </b>Predicted value for the point x2 is ≈0.6 which is greater than the threshold, so x2 belongs to class 1.</li>
                <li><b>Case 3: </b>Predicted value for the point x3 is beyond 1.</li>
                <li><b>Case 4: </b>Predicted value for the point x4 is below 0.</li>
              </ul>
              The predicted values for the points x3, x4 exceed the range (0,1) which doesn’t make sense because the
              probability values always lie between 0 and 1. And our output can have only two values either 0 or 1. Hence,
              this is a problem with the linear regression model.
              <br />
              <br />
              Now, introduce an outlier and see what happens. The regression line gets deviated to keep the distance of all the
              data points to the line to be minimal.
              <br />
              <img src={Outliner} alt="Equations" className="responsive" style={redesign} />
              <br />
              L2 is the new best-fit line after the addition of an outlier. Seems good till now. But the problem is,
              if we closely observe, some of the data points are wrongly classified. Certainly, it increases the error term
              This again is a problem with the linear regression model.
              <br />
              <br />
              <b>The two limitations of using a linear regression model for classification problems are:</b>
              <ul>
                <li>The predicted value may exceed the range (0,1).</li>
                <li>Error rate increases if the data has outliers.</li>
              </ul>

              <h3>How does Logistic Regression Work?</h3>
              <b>Sigmoid Function: </b>The sigmoid function is useful to map any predicted values of probabilities into another value between 0 and 1.
              <br />
              <img src={Sigmoid} alt="Equations" className="responsive" style={redesign} />
              <br />

              We started with a linear equation and ended up with a logistic regression model with the help of a sigmoid function.
              <br />
              <ul>
                <li><b>Linear model: </b>ŷ = b0+b1x</li>
                <li><b>Sigmoid function: </b>σ(z) = 1/(1+e−z)</li>
                <li><b>Logistic regression model: </b>ŷ = σ(b0+b1x) = 1/(1+e-(b0+b1x))</li>
              </ul>
              <br />
              <img src={LinearVsLogistic} alt="Equations" className="responsive" style={redesign} />
              <br />
              <br />
              The image that depicts the working of the Logistic regression model.
              <br />
              <img src={Logistic} alt="Equations" className="responsive" style={redesign} />
              <br />
              <br />

              <ul>
                <li>A linear equation (z) is given to a sigmoidal activation function (σ) to predict the output (ŷ).</li>
                <li>To evaluate the performance of the model, we calculate the loss. The most commonly used loss function is the mean squared error.</li>
                <li>But in logistic regression, as the output is a probability value between 0 or 1, mean squared error wouldn’t be the right choice. So, instead, we use the cross-entropy loss function.</li>
                <li>The cross-entropy loss function is used to measure the performance of a classification model whose output is a probability value.</li>
              </ul>
              <br />

              <h3>Predicting if a person would buy life insurnace based on his age using logistic regression</h3>
              Above is a binary logistic regression problem as there are only two possible outcomes (i.e. if person buys insurance or doesn't).
              <div style={titles}>
                <PrismCode
                  code={cluster}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Logistic Regression Multiclass</h3>
              Predicting if a person would buy life insurnace based on his age using logistic regression.
              <br />
              <br />
              Above is a binary logistic regression problem as there are only two possible outcomes (i.e. if person buys insurance or doesn't).
              <div style={titles}>
                <PrismCode
                  code={multiClass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Defined sigmoid function and do the math</h3>
              <div style={titles}>
                <PrismCode
                  code={sigmoid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Logistic Regration</h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Testing</b>
              <div style={titles}>
                <PrismCode
                  code={testings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Polynomial Regression:</h3>
              <ul>
                <li>If data points clearly will not fit a linear regression, it might be ideal for polynomial regression.</li>
                <li>Polynomial regression, like linear regression, uses the relationship between the variables x and y to find the best
                  way to draw a line through the data points.</li>
              </ul>
              <br />

              <b>How Does it Work?</b><br />
              Example, we have registered 18 cars as they were passing a certain tollbooth.
              <br />
              We have registered the car's speed, and the time of day (hour) the passing occurred.
              <br />
              <br />
              The x-axis represents the hours of the day and the y-axis represents the speed:
              <br />
              <b>ex. Start by drawing a scatter plot:</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={poly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Draw the line of Polynomial Regression.</b>
              <div style={titles}>
                <PrismCode
                  code={poly_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>R-Squared</h3>
              The relationship is measured with a value of r-squared.
              <br />

              <h3>Multiple Regression:</h3>
              Multiple regression is like linear regression, but with more than one independent value, meaning that we try to
              predict a value based on two/ more variables.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(LogisticRegs));
