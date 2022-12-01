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

const rnmFor = `
import pandas as pd
import seaborn as sn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix 
import matplotlib.pyplot as plt
%matplotlib inline

digits = load_digits()
dir(digits)

plt.gray() 
for i in range(4):
    plt.matshow(digits.images[i]) 
    
df = pd.DataFrame(digits.data)
df['target'] = digits.target

X = df.drop('target',axis='columns')
y = df.target

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)
model = RandomForestClassifier(n_estimators=20)
model.fit(X_train, y_train)
model.score(X_test, y_test)

y_predicted = model.predict(X_test)
cm = confusion_matrix(y_test, y_predicted)

plt.figure(figsize=(10,7))
sn.heatmap(cm, annot=True)

plt.xlabel('Predicted')
plt.ylabel('Truth')
`.trim();

const stack = `
import numpy as np
from collections import Counter
from .decision_tree import DecisionTree


def bootstrap_sample(X, y):
    n_samples = X.shape[0]
    idxs = np.random.choice(n_samples, n_samples, replace=True)
    return X[idxs], y[idxs]


def most_common_label(y):
    counter = Counter(y)
    most_common = counter.most_common(1)[0][0]
    return most_common


class RandomForest:
    def __init__(self, n_trees=10, min_samples_split=2, max_depth=100, n_feats=None):
        self.n_trees = n_trees
        self.min_samples_split = min_samples_split
        self.max_depth = max_depth
        self.n_feats = n_feats
        self.trees = []

    def fit(self, X, y):
        self.trees = []
        for _ in range(self.n_trees):
            tree = DecisionTree(
                min_samples_split=self.min_samples_split,
                max_depth=self.max_depth,
                n_feats=self.n_feats,
            )
            X_samp, y_samp = bootstrap_sample(X, y)
            tree.fit(X_samp, y_samp)
            self.trees.append(tree)

    def predict(self, X):
        tree_preds = np.array([tree.predict(X) for tree in self.trees])
        tree_preds = np.swapaxes(tree_preds, 0, 1)
        y_pred = [most_common_label(tree_pred) for tree_pred in tree_preds]
        return np.array(y_pred)
`.trim();

const testings = `
if __name__ == "__main__":
    from sklearn import datasets
    from sklearn.model_selection import train_test_split

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)
        return accuracy

    data = datasets.load_breast_cancer()
    X = data.data
    y = data.target

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=1234
    )

    clf = RandomForest(n_trees=3, max_depth=10)

    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    acc = accuracy(y_test, y_pred)

    print("Accuracy:", acc)
`.trim();


class RandomForest extends Component {
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
              <h3>Random Forest (supervised learning algorithm)</h3>
              Random forest is used for both classification as well as regression. But
              however, it is mainly used for classification problems. As we know that a forest is made up of trees and more trees
              means more robust forest. Similarly, random forest algorithm creates decision trees on data samples and then gets the
              prediction from each of them and finally selects the best solution by means of voting. It is an ensemble method which
              is better than a single decision tree because it reduces the over-fitting by averaging the result. Working of Random
              Forest Algorithm.
              <br />
              <br />
              <ul>
                <li>1. Start with the selection of random samples from a given dataset. </li>
                <li>2. This algorithm will construct a decision tree for every sample. Then it will get the prediction result from
                  every decision tree.</li>
                <li>3. Voting will be performed for every predicted result.</li>
                <li>4. At last, select the most voted prediction result as the final prediction result.</li>
              </ul>
              <br />

              <b>Pros: </b>
              <ul>
                <li>It overcomes the problem of overfitting by averaging or combining the results of different decision trees.</li>
                <li>Work well for a large range of data items than a single decision tree does. Random forest has less variance then single decision tree.</li>
                <li>Very flexible and possess very high accuracy.</li>
                <li>Scaling of data does not require in random forest algorithm. It maintains good accuracy even after providing data without scaling.</li>
                <li>Maintains good accuracy even a large proportion of the data is missing.</li>
                <li></li>
              </ul>
              <br />
              <b>Cons: </b>
              <ul>
                <li>Complexity is the main disadvantage of Random forest algorithms.</li>
                <li>Construction of Random forests are much harder and time-consuming than decision trees. More computational resources
                  are required to implement Random Forest algorithm.</li>
                <li>It is less intuitive in case when we have a large collection of decision trees. The prediction process
                  using random forests is very time-consuming in comparison with other algorithms.</li>
              </ul>

              <br />
              <h3>Random Forest(Supervised)</h3>
              Used widely in Classification and Regression problems.It builds decision trees on different samples and
              takes their majority vote for classification and average in case of regression.
              <br />
              <br />
              One of the most important features of the Random Forest Algorithm is that it can handle the data set
              containing continuous variables in regression and categorical variables in classification(better results).             for classification problems.
              <br />
              <br />
              A student named X wants to choose a course after his 10+2, and he is confused about the choice of
              course based on his skill set. So he decides to consult various people like his cousins, teachers,
              parents, degree students, and working people. He asks them varied questions like why he should choose,
              job opportunities with that course, course fee, etc. Finally, after consulting various people about the
              course he decides to take the course suggested by most of the people.
              <br />
              <br />
              <b>Ensemble uses two types of methods: </b>
              <ul>
                <li>Bagging (Parallel), Random forest works on the Bagging principle.</li>
                <li>Boosting (Sequential)</li>
              </ul>
              <br />
              <b>Steps involved in random forest algorithm:</b>
              <ul>
                <li>n number of random records are taken from the data set having k number of records.</li>
                <li>Individual decision trees are constructed for each sample.</li>
                <li>Each decision tree will generate an output.</li>
                <li>Final output is considered based on Majority Voting or Averaging for Classification and regression respectively.</li>
              </ul>
              <br />
              <b>Important Features of Random Forest: </b>
              <ul>
                <li><b>Diversity: </b>Not all attributes/variables/features are considered while making an individual
                  tree, each tree is different.</li>
                <li><b>Immune to the curse of dimensionality: </b>Since each tree does not consider all the features,
                  the feature space is reduced.</li>
                <li><b>Parallelization: </b>Each tree is created independently out of different data and attributes.
                  This means that we can make full use of the CPU to build random forests.</li>
                <li><b>Train-Test split: </b></li>
                <li><b>Stability: </b>Stability arises because the result is based on majority voting/ averaging.</li>
              </ul>
              <br />
              <b>Difference Between Decision Tree & Random Forest</b>
              <br />
              Random forest is a collection of decision trees.
              <table>
                <tr>
                  <th>Decision trees</th>
                  <th>Random Forest</th>
                </tr>
                <tr>
                  <td>Normally suffer from the problem of overfitting if it’s allowed to grow without any control.</td>
                  <td>Created from subsets of data and the final output is based on average or majority ranking and
                    hence the problem of overfitting is taken care of.</td>
                </tr>
                <tr>
                  <td>A single decision tree is faster in computation.</td>
                  <td>Comparatively slower.</td>
                </tr>
                <tr>
                  <td>When a data set with features is taken as input by a decision tree it will formulate some set
                    of rules to do prediction.</td>
                  <td>Randomly selects observations, builds a decision tree and the average result is taken. It
                    doesn’t use any set of formulas.</td>
                </tr>
              </table>
              <br />
              <i>Thus random forests are much more successful than decision trees only if the trees are diverse and acceptable.</i>
              <br />

              <h3>Important Hyperparameters</h3>
              Hyperparameters are used in random forests to either enhance the performance and predictive power of models or
              to make the model faster.
              <ul>
                <li><b>n_estimators: </b>number of trees the algorithm builds before averaging the predictions.</li>
                <li><b>max_features: </b>max. number of features random forest considers splitting a node.</li>
                <li><b>mini_sample_leaf: </b>determines the min. number of leaves required to split an internal node.</li>
              </ul>
              <br />

              <b>Following hyperparameters increases the speed: </b>
              <ul>
                <li><b>n_jobs: </b> It tells the engine how many processors it is allowed to use. If the value is 1,
                  it can use only one processor but if the value is -1 there is no limit.</li>
                <li><b>random_state: </b>Controls randomness of the sample. The model will always produce the same
                  results if it has a definite value of random state and if it has been given the same hyperparameters
                  and the same training data.</li>
                <li><b>oob_score : </b>OOB means out of the bag. It is a random forest cross-validation method. In
                  this one-third of the sample is not used to train the data instead used to evaluate its performance.
                  These samples are called out of bag samples.</li>
              </ul>
              <br />

              <b>Advantages:</b>
              <ul>
                <li>It can be used in classification and regression problems.</li>
                <li>It solves the problem of overfitting as output is based on majority voting or averaging.</li>
                <li>It performs well even if the data contains null/missing values.</li>
                <li>Each decision tree created is independent of the other thus it shows the property of parallelization.</li>
                <li>It is highly stable as the average answers given by a large number of trees are taken.</li>
                <li>It maintains diversity as all the attributes are not considered while making each decision tree
                  though it is not true in all cases.</li>
                <li>It is immune to the curse of dimensionality. Since each tree does not consider all the attributes,
                  feature space is reduced.</li>
                <li>We don’t have to segregate data into train and test as there will always be 30% of the data which
                  is not seen by the decision tree made out of bootstrap.</li>
              </ul>
              <br />

              <b>Disadvantages:</b>
              <ul>
                <li>Random forest is highly complex when compared to decision trees where decisions can be made by following
                  the path of the tree.</li>
                <li>Training time is more compared to other models due to its complexity. Whenever it has to make a prediction
                  each decision tree has to generate output for the given input data.</li>
              </ul>
              <br />

              <h3>Example</h3>
              <b>Digits dataset from sklearn</b>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={rnmFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Random Forest 2</h3>
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
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(RandomForest));
