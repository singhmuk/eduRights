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


const sklearn = `
from sklearn.datasets import load_iris

iris = load_iris()
X = iris.data
y = iris.target

feature_names = iris.feature_names
target_names = iris.target_names

print("Feature names:", feature_names)
print("Target names:", target_names)
print("First 10 rows of X", X[:10])
`.trim();

const accuracy = `
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 1)

X_train.shape
X_test.shape

y_train.shape
y_test.shape
`.trim();

const trains = `
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics

classifier_knn = KNeighborsClassifier(n_neighbors = 3)
classifier_knn.fit(X_train, y_train)
y_pred = classifier_knn.predict(X_test)

# Finding accuracy by comparing actual response values(y_test)with predicted response value(y_pred)
print("Accuracy:", metrics.accuracy_score(y_test, y_pred))

# Providing sample data and the model will make prediction out of that data
sample = [[5, 5, 3, 2], [2, 4, 3, 5]]
preds = classifier_knn.predict(sample)
`.trim();

const stack = `
from sklearn import linear_model
reg = linear_model.LinearRegression()  

from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, Y_train)                       

from sklearn.preprocessing import StandardScaler  
sc_X = StandardScaler()

from sklearn.linear_model import LogisticRegression
model = LogisticRegression()

from sklearn.svm import SVC
svm = SVC(gamma='auto') 

from sklearn.svm import SVC
model = SVC()
model.fit(X_train, y_train)

from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=40)                                                      

from sklearn.model_selection import KFold
kf = KFold(n_splits=3)

from sklearn.neighbors import KNeighborsClassifier 
knn = KNeighborsClassifier(n_neighbors=10)

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
scaler.fit(df[['Income($)']])

from sklearn.pipeline import Pipeline
clf = Pipeline([('vectorizer', CountVectorizer()),('nb', MultinomialNB())])
clf.fit(X_train, y_train)

from sklearn.preprocessing import LabelEncoder
le_company = LabelEncoder()

from sklearn import tree
model = tree.DecisionTreeClassifier()
model.fit(inputs_n, target)

from sklearn.decomposition import PCA
pca = PCA(0.95)
X_pca = pca.fit_transform(X)

from sklearn import preprocessing
encoder = preprocessing.LabelEncoder()
encoder.fit(input_labels)

from sklearn.linear_model import Ridge                                                  
ridge_reg= Ridge(alpha=50, max_iter=100, tol=0.1) 
ridge_reg.fit(train_X, train_y)

from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
scores = cross_val_score(DecisionTreeClassifier(), X, y, cv=5)

from sklearn.model_selection import GridSearchCV
clf = GridSearchCV(svm.SVC(gamma='auto'), {'C': [1,10,20], 'kernel': ['rbf','linear']}, cv=5, return_train_score=False)
clf.fit(iris.data, iris.target)

from sklearn.model_selection import RandomizedSearchCV
rs = RandomizedSearchCV(svm.SVC(gamma='auto'), {'C': [1,10,20],'kernel': ['rbf','linear']}, 
    cv=5, return_train_score=False, n_iter=2)
rs.fit(iris.data, iris.target)

from sklearn.ensemble import BaggingClassifier

bag_model = BaggingClassifier(
    base_estimator=DecisionTreeClassifier(), 
    n_estimators=100, 
    max_samples=0.8, 
    oob_score=True,
    random_state=0
)
bag_model.fit(X_train, y_train)
`.trim();

// const stack = ``.trim();



class LogisticReg extends Component {
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
              <h3>Scikit Learn (common algoritham) - Modelling Process</h3>
              Rather than focusing on loading, manipulating and summarising data, Scikit-learn library is focused on modeling the data. Some of the most popular groups of models provided by Sklearn are as follows −
              <br />
              <br />
              We can do following with scikit Learn.
              <ul>
                <li><b>Classification: </b>SVM, nearest neighbors, random forest, logistic regression, etc.</li>
                <li><b>Regression: </b>Lasso, ridge regression, etc.</li>
                <li><b>Clustering: </b>k-means, spectral clustering, etc.</li>
                <li><b>Dimensionality reduction: </b>PCA, feature selection, matrix factorization, etc.</li>
                <li><b>Model selection: </b>Grid search, cross-validation, metrics.</li>
                <li><b>Preprocessing: </b>.Feature extraction, normalization</li>
              </ul>
              <br />
              <b>Dataset Loading:</b>A collection of data is called dataset. It is having the following two components.
              <br />
              Dataset having the following two components.
              <ul>
                <li><b>Features: </b>The variables of data are called its features.</li>
                <ul>
                  <li><b>Feature matrix: </b>It is the collection of features, in case there are more than one.</li>
                  <li><b>Feature Names: </b>It is the list of all the names of the features.</li>
                </ul>
                <br />
                <li><b>Response: </b>It is the output variable that basically depends upon the feature variables.</li>
                <ul>
                  <li><b>Response Vector: </b>It is used to represent response column. Generally, we have just one response column.</li>
                  <li><b>Target Names: </b>It represent the possible values taken by a response vector.</li>
                </ul>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={sklearn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Some popular groups of models provided by scikit-learn include:</b>
              <ul>
                <li><b>Clustering: </b>For grouping unlabeled data such as KMeans.</li>
                <li><b>Cross Validation: </b>For estimating the performance of supervised models on unseen data.</li>
                <li><b>Datasets: </b>For test datasets and for generating datasets with specific properties for
                  investigating model behavior.</li>
                <li><b>Dimensionality Reduction: </b>For reducing the number of attributes in data for summarization,
                  visualization and feature selection such as Principal component analysis.</li>
                <li><b>Ensemble methods: </b>For combining the predictions of multiple supervised models.</li>
                <li><b>Feature extraction: </b>For defining attributes in image and text data.</li>
                <li><b>Feature selection: </b>For identifying meaningful attributes from which to create supervised models.</li>
                <li><b>Parameter Tuning: </b>For getting the most out of supervised models.</li>
                <li><b>Manifold Learning: </b>For summarizing and depicting complex multi-dimensional data.</li>
              </ul>
              <br />

              <h3>Splitting the dataset</h3>
              To check the accuracy of our model, we can split the dataset into two pieces-a training set and a testing set.
              <div style={titles}>
                <PrismCode
                  code={accuracy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Train the Model</h3>
              Next, we can use our dataset to train some prediction-model. ML algorithms have a consistent interface for fitting, predicting
              accuracy, recall etc.
              <div style={titles}>
                <PrismCode
                  code={trains}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>sklearn Models</h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
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

export default (withStyles(styles)(LogisticReg));
