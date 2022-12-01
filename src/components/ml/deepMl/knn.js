import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Sigmoid from '../../../assets/ML/knn2.png'
import Knn3 from '../../../assets/ML/knn3.png'
import Knn4 from '../../../assets/ML/knn4.png'
import Knn5 from '../../../assets/ML/knn5.png'


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

const kFold = `
import numpy as np
from sklearn.datasets import load_digits
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier

digits = load_digits()

X_train, X_test, y_train, y_test = train_test_split(digits.data,digits.target,test_size=0.3)
lr = LogisticRegression(solver='liblinear',multi_class='ovr')                                     #Logistic Regression
lr.fit(X_train, y_train)
lr.score(X_test, y_test)

svm = SVC(gamma='auto')                                                                           #SVM
svm.fit(X_train, y_train)
svm.score(X_test, y_test)


rf = RandomForestClassifier(n_estimators=40)                                                      #Random Forest
rf.fit(X_train, y_train)
rf.score(X_test, y_test)
`.trim();

const kFoldVal = `
from sklearn.model_selection import KFold
kf = KFold(n_splits=3)

for train_index, test_index in kf.split([1,2,3,4,5,6,7,8,9]):
    print(train_index, test_index)
    
def get_score(model, X_train, X_test, y_train, y_test):
    model.fit(X_train, y_train)
    return model.score(X_test, y_test)
    
    from sklearn.model_selection import StratifiedKFold
folds = StratifiedKFold(n_splits=3)

scores_logistic = []
scores_svm = []
scores_rf = []

for train_index, test_index in folds.split(digits.data,digits.target):
    X_train, X_test, y_train, y_test = digits.data[train_index], digits.data[test_index], \
    
                                       digits.target[train_index], digits.target[test_index]
                                       
    scores_logistic.append(get_score(LogisticRegression(solver='liblinear',multi_class='ovr'), 
                                      X_train, X_test, y_train, y_test))  
                                      
    scores_svm.append(get_score(SVC(gamma='auto'), X_train, X_test, y_train, y_test))
    scores_rf.append(get_score(RandomForestClassifier(n_estimators=40), X_train, X_test, y_train, y_test))
    
scores_logistic
scores_svm
scores_rf
`.trim();

const valScor = `
from sklearn.model_selection import cross_val_score

#Logistic regression model performance using cross_val_score
cross_val_score(LogisticRegression(solver='liblinear',multi_class='ovr'), digits.data, digits.target,cv=3)

#svm model performance using cross_val_score
cross_val_score(SVC(gamma='auto'), digits.data, digits.target,cv=3)

#random forest performance using cross_val_score
cross_val_score(RandomForestClassifier(n_estimators=40),digits.data, digits.target,cv=3)
`.trim();

const tunning = `
scores1 = cross_val_score(RandomForestClassifier(n_estimators=5),digits.data, digits.target, cv=10)
np.average(scores1)

scores2 = cross_val_score(RandomForestClassifier(n_estimators=20),digits.data, digits.target, cv=10)
np.average(scores2)

scores3 = cross_val_score(RandomForestClassifier(n_estimators=30),digits.data, digits.target, cv=10)
np.average(scores3)

scores4 = cross_val_score(RandomForestClassifier(n_estimators=40),digits.data, digits.target, cv=10)
np.average(scores4)
`.trim();

const knnClassifications = `
import pandas as pd
import seaborn as sn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
%matplotlib inline

iris = load_iris()
iris.feature_names
iris.target_names

df = pd.DataFrame(iris.data,columns=iris.feature_names)
df['target'] = iris.target
df[df.target==1].head()
df[df.target==2].head()

df['flower_name'] =df.target.apply(lambda x: iris.target_names[x])

df[45:55]
df0 = df[:50]
df1 = df[50:100]
df2 = df[100:]

#Sepal length vs Sepal Width (Setosa vs Versicolor)
plt.xlabel('Sepal Length')
plt.ylabel('Sepal Width')
plt.scatter(df0['sepal length (cm)'], df0['sepal width (cm)'],color="green",marker='+')
plt.scatter(df1['sepal length (cm)'], df1['sepal width (cm)'],color="blue",marker='.')

#Petal length vs Pepal Width (Setosa vs Versicolor)
plt.xlabel('Petal Length')
plt.ylabel('Petal Width')
plt.scatter(df0['petal length (cm)'], df0['petal width (cm)'],color="green",marker='+')
plt.scatter(df1['petal length (cm)'], df1['petal width (cm)'],color="blue",marker='.')

X = df.drop(['target','flower_name'], axis='columns')
y = df.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)
len(X_train)
len(X_test)

knn = KNeighborsClassifier(n_neighbors=10)
knn.fit(X_train, y_train)
knn.score(X_test, y_test)
knn.predict([[4.8,3.0,1.5,0.3]])

y_pred = knn.predict(X_test)
cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(7,5))
sn.heatmap(cm, annot=True)
plt.xlabel('Predicted')
plt.ylabel('Truth')

#Print classification report for precesion, recall and f1-score for each classes
print(classification_report(y_test, y_pred))
`.trim();


class KnnPy extends Component {
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
              <h3>KNN(K-nearest neighbors) supervised ML algorithm</h3>
              KNN algorithm is  used for both classification as well as regression predictive problems.
              <br />
              <br />
              Two properties define KNN well:
              <ul>
                <li><b>1. Lazy learning algorithm: </b>KNN is a lazy learning algorithm because it does not have a specialized training phase and uses all the data for
                  training while classification.</li>
                <li><b>Non-parametric learning algorithm: </b>It doesn’t assume anything about the underlying data.</li>
              </ul>
              <br />

              <b>Working of KNN Algorithm: </b>
              KNN algorithm uses ‘feature similarity’ to predict the values of new data points which further means that the new data
              point will be assigned a value based on how closely it matches the points in the training set.
              <br />
              <br />

              <ul>
                <li>First step of KNN, we must load the training as well as test data.</li>
                <li>Next, we need to choose the value of K.</li>
                <li><i><b>For each point in the test data do the following −</b></i></li>
                <ul>
                  <li>Calculate the distance between test data and each row of training data with the help of any of the method
                    namely: Euclidean(commonly), Manhattan or Hamming distance. </li>
                  <li>Now, based on the distance value, sort them in ascending order.</li>
                  <li>Next, it will choose the top K rows from the sorted array.</li>
                  <li>Now, it will assign a class to the test point based on most frequent class of these rows.</li>
                </ul>
                <br />
                <li>End Ex: Suppose we have a dataset which can be plotted dot. Now, we need to classify new data point with
                  black dot (at point 60,60) into blue/ red class. We are assuming K = 3 i.e.
                  it would find three nearest data points.</li>
              </ul>
              <br />

              <h3>KFold Cross Validation</h3>
              <div style={titles}>
                <PrismCode
                  code={kFold}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>KFold cross validation</h3>
              <div style={titles}>
                <PrismCode
                  code={kFoldVal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>cross_val_score function</h3>
              <div style={titles}>
                <PrismCode
                  code={valScor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />

              <h3>Parameter tunning using k fold cross validation</h3>
              <div style={titles}>
                <PrismCode
                  code={tunning}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Here we used cross_val_score to
                fine tune our random forest classifier and figured that having around 40 trees in random forest gives best result. </i>
              <br />

              <h3>KNN (K Nearest Neighbors) Classification: Using Python Sklearn</h3>
              From sklearn.datasets load digits dataset and do following:
              <ul>
                <li>Classify digits (0 to 9) using KNN classifier. You can use different values for k neighbors and need to figure out a value of K that gives you a maximum score. You can manually try different values of K or use gridsearchcv.</li>
                <li>Plot confusion matrix.</li>
                <li>Plot classification report.</li>
              </ul>
              <br />

              <b>Why do we need a K-NN Algorithm?</b><br />
              Suppose there are two categories, Category A and Category B, and we have a new data point x1, so this
              data point will lie in which of these categories. To solve this type of problem, we need a K-NN
              algorithm. With the help of K-NN, we can easily identify the category or class of a particular dataset.
              <br />
              <img src={Sigmoid} alt="Equations" className="responsive" style={redesign} />
              <br />

              <b>Steps</b>
              <ul>
                <li>Select the number K of the neighbors.</li>
                <li>Calculate the Euclidean distance of K number of neighbors.</li>
                <li>Take the K nearest neighbors as per the calculated Euclidean distance.</li>
                <li>Among these k neighbors, count the number of the data points in each category.</li>
                <li>Assign the new data points to that category for which the number of the neighbor is maximum.</li>
                <li>Our model is ready.</li>
              </ul>
              <br />
              Suppose we have a new data point and we need to put it in the required category.
              <br />
              <img src={Knn3} alt="Equations" className="responsive" style={redesign} />
              <ul>
                <li>Firstly, we will choose the number of neighbors, so we will choose the k=5.</li>
                <li>Next, we will calculate the Euclidean distance between the data points. It can be calculated as:</li>
                <br />
                <img src={Knn4} alt="Equations" className="responsive" style={redesign} />
                <br />
                <li>By calculating the Euclidean distance we got the nearest neighbors, as three nearest neighbors in category A and two nearest neighbors in category B.</li>
                <br />
                <img src={Knn5} alt="Equations" className="responsive" style={redesign} />
                <br />
                <li>As we can see the 3 nearest neighbors are from category A, hence this new data point must belong to category A.</li>
              </ul>
              <br />
              <b>How to select the value of K in the K-NN Algorithm?</b>
              <br />
              <ul>
                <li>There is no particular way to determine the best value for "K", so we need to try some values to
                  find the best out of them. The most preferred value for K is 5.</li>
                <li>A very low value for K such as K=1 or K=2, can be noisy and lead to the effects of outliers in the model.</li>
                <li>Large values for K are good, but it may find some difficulties.</li>
              </ul>
              <br />

              <b>Advantages: </b>
              <ul>
                <li>It is simple to implement.</li>
                <li>It is robust to the noisy training data.</li>
                <li>It can be more effective if the training data is large.</li>
              </ul>
              <br />

              <b>Disadvantages: </b>
              <ul>
                <li>Always needs to determine the value of K which may be complex some time.</li>
                <li>The computation cost is high because of calculating the distance between the data points for all
                  the training samples.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={knnClassifications}
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

export default (withStyles(styles)(KnnPy));
