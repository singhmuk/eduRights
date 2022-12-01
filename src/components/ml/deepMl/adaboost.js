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


const stack = `
import numpy as np

# Decision stump used as weak classifier
class DecisionStump:
    def __init__(self):
        self.polarity = 1
        self.feature_idx = None
        self.threshold = None
        self.alpha = None

    def predict(self, X):
        n_samples = X.shape[0]
        X_column = X[:, self.feature_idx]
        predictions = np.ones(n_samples)
        if self.polarity == 1:
            predictions[X_column < self.threshold] = -1
        else:
            predictions[X_column > self.threshold] = -1

        return predictions


class Adaboost:
    def __init__(self, n_clf=5):
        self.n_clf = n_clf
        self.clfs = []

    def fit(self, X, y):
        n_samples, n_features = X.shape

        w = np.full(n_samples, (1 / n_samples))                          # Initialize weights to 1/N

        self.clfs = []
        
        for _ in range(self.n_clf):                                      # Iterate through classifiers
            clf = DecisionStump()
            min_error = float("inf")

            for feature_i in range(n_features):                          # greedy search to find best threshold and feature
                X_column = X[:, feature_i]
                thresholds = np.unique(X_column)

                for threshold in thresholds:
                    p = 1                                                # predict with polarity 1
                    predictions = np.ones(n_samples)
                    predictions[X_column < threshold] = -1

                    misclassified = w[y != predictions]                  # Error = sum of weights of misclassified samples
                    error = sum(misclassified)

                    if error > 0.5:
                        error = 1 - error
                        p = -1

                    if error < min_error:                               # store the best configuration
                        clf.polarity = p
                        clf.threshold = threshold
                        clf.feature_idx = feature_i
                        min_error = error

            # calculate alpha
            EPS = 1e-10
            clf.alpha = 0.5 * np.log((1.0 - min_error + EPS) / (min_error + EPS))

            predictions = clf.predict(X)                                         # calculate predictions and update weights

            w *= np.exp(-clf.alpha * y * predictions)
            # Normalize to one
            w /= np.sum(w)

            self.clfs.append(clf)                                               # Save classifier

    def predict(self, X):
        clf_preds = [clf.alpha * clf.predict(X) for clf in self.clfs]
        y_pred = np.sum(clf_preds, axis=0)
        y_pred = np.sign(y_pred)

        return y_pred
`.trim();

const testings = `
if __name__ == "__main__":
    from sklearn import datasets
    from sklearn.model_selection import train_test_split

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)   
        return accuracy

    data = datasets.load_breast_cancer()
    X, y = data.data, data.target

    y[y == 0] = -1

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=5)

    # Adaboost classification with 5 weak classifiers
    clf = Adaboost(n_clf=5)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)

    acc = accuracy(y_test, y_pred)
    print("Accuracy:", acc)
    `.trim();

const performance = `
Performance of stump = 1/2 * log(1-Total Error) / Total Error

New weights = old weight * e(+-Performanse)
    where, + for Misclassification
           - for Right classification
`.trim();

// const stack = ``.trim();


class Adaboots extends Component {
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
              <h3>Boosting Types</h3>
              <ul>
                <li><b>1. Adaboost: </b></li>
                <li><b>2. Gradient Boosting: </b>Instead of Weights updation, here gradient (residuals, loss) is passed in next model.</li>
                <br />
                <li><b>3. Extream Gradient Boosting: </b></li>
                <ul>
                  <li>Much similar to GB.</li>
                  <li>2nd order Derivatives of Loss function.</li>
                  <li>High Performance.</li>
                  <li>Fast training.</li>
                  <li>Advanced L1 and L2 Loass Regularization.</li>
                  <li>Parallel and Distributed computing (DMLC).</li>
                  <li>It handle missing values.</li>
                  <li>Cache Optimisation</li>
                  <li>It has many hyperparameters. reg_alpha, reg_lambda.</li>
                </ul>
              </ul>

              <br />

              <h3>Adaboost (Adaptive boosting)</h3>
              <ul>
                <li>Used for Classification and Regression.</li>
                <li>Sequencial boosting.</li>
                <li>AdaBoost is one of the first boosting algorithms to be adapted in solving practices. Adaboost helps you combine
                  multiple “weak classifiers” into a single “strong classifier”.</li>
                <li>The weak learners in AdaBoost are decision trees with a single split, called <b>decision stumps</b>.</li>
                <li>AdaBoost works by putting more weight on difficult to classify instances and less on those already handled well.</li>
                <li>Weight increase for misclassification and weight decreses for right classifications.</li>
                <li>Used to exploit dependency between models.</li>
                <li>Stagewise additive MultiModeling using Multiclass Exponential Loss Function.</li>
                <li>Can handle missing values and outliner.</li>
                <li>Can handles mixed predictors as well (Quantitive and Qualitative).</li>
              </ul>
              <br />
              <br />

              <b>Steps for Adaboost Algoritham:</b>
              <ul>
                <li>1. Initialize the weights as 1/n to every n observations.</li>
                <li>2. Select the 1 Feature according to Lowest Gini/Highest information Gain and calculate the total error.</li>
                <li>3. Calculate the Performance of the stump.</li>
                <li>4. Calculate the new weights for each misclassification(increase) and right classification(decrease).</li>
                <li>5. Normalize the new weights so that sum of weight is 1.</li>
                <li>6. Repeat from step 2 to till configured number of estimators reacfied the accuracy achieved.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={performance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

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

export default (withStyles(styles)(Adaboots));
