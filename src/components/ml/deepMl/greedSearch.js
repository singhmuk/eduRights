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


const cluster = `
from sklearn import svm, datasets
iris = datasets.load_iris()

import pandas as pd
df = pd.DataFrame(iris.data,columns=iris.feature_names)
df['flower'] = iris.target
df['flower'] = df['flower'].apply(lambda x: iris.target_names[x])
df[47:150]
`.trim();

const exactly = `
from sklearn.model_selection import GridSearchCV

clf = GridSearchCV(svm.SVC(gamma='auto'), {'C': [1,10,20], 'kernel': ['rbf','linear']}, cv=5, return_train_score=False)
clf.fit(iris.data, iris.target)
clf.cv_results_

df = pd.DataFrame(clf.cv_results_)
df[['param_C','param_kernel','mean_test_score']]

clf.best_params_
clf.best_score_

dir(clf)
`.trim();

const reduceNum = `
from sklearn.model_selection import RandomizedSearchCV
from sklearn import svm
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

rs = RandomizedSearchCV(svm.SVC(gamma='auto'), {'C': [1,10,20],'kernel': ['rbf','linear']}, 
    cv=5, return_train_score=False, n_iter=2)
    
rs.fit(iris.data, iris.target)
pd.DataFrame(rs.cv_results_)[['param_C','param_kernel','mean_test_score']]


#How about different models with different hyperparameters?

model_params = {
    'svm': {
        'model': svm.SVC(gamma='auto'),
        'params' : {'C': [1,10,20],'kernel': ['rbf','linear']}  
    },
    'random_forest': {
        'model': RandomForestClassifier(),
        'params' : {'n_estimators': [1,5,10]}
    },
    'logistic_regression' : {
        'model': LogisticRegression(solver='liblinear',multi_class='auto'),
        'params': {'C': [1,5,10]}
    }
}


scores = []

for model_name, mp in model_params.items():
    clf =  GridSearchCV(mp['model'], mp['params'], cv=5, return_train_score=False)
    clf.fit(iris.data, iris.target)
    scores.append({'model': model_name,'best_score': clf.best_score_,'best_params': clf.best_params_})
    
df = pd.DataFrame(scores,columns=['model','best_score','best_params'])
df
`.trim();

const approachOne = `
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3)

model = svm.SVC(kernel='rbf',C=30,gamma='auto')
model.fit(X_train,y_train)
model.score(X_test, y_test)
`.trim();

const parameters = `
cross_val_score(svm.SVC(kernel='linear',C=10,gamma='auto'),iris.data, iris.target, cv=5)
cross_val_score(svm.SVC(kernel='rbf',C=10,gamma='auto'),iris.data, iris.target, cv=5)
cross_val_score(svm.SVC(kernel='rbf',C=20,gamma='auto'),iris.data, iris.target, cv=5)


#Above approach is tiresome and very manual. We can use for loop as an alternative.
kernels = ['rbf', 'linear']
C = [1,10,20]
avg_scores = {}
for kval in kernels:
    for cval in C:
        cv_scores = cross_val_score(svm.SVC(kernel=kval,C=cval,gamma='auto'),iris.data, iris.target, cv=5)
        avg_scores[kval + '_' + str(cval)] = np.average(cv_scores)

avg_scores

`.trim();


class GreedSearch extends Component {
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
              <h3>Greedy Algorithms</h3>
              Greedy algorithms aim to make the optimal choice at given moment. Each step it chooses the optimal choice,
              without knowing the future. It attempts to find the globally optimal way to solve the entire problem using this method.
              <br />
              <br />
              <ul>
                <li>Check which Model is best fit for given problem. So it's a Model selection technique. Also check which parameter good for model.</li>
                <li>Greedy algorithms are greedy. They do not look into the future to decide the global optimal
                  solution. They are only concerned with the optimal solution locally. This means that the overall
                  optimal solution may differ from the solution the algorithm chooses.</li>
                <li>Greedy algorithms don’t guarantee solutions, but are very time efficient.</li>
                <li>Greedy algorithms are quick than <b>Divide & Conquer and Dynamic Programming</b>.</li>
              </ul>
              <br />

              <h3>Finding best model and hyper parameter tunning using GridSearchCV</h3>
              For iris flower dataset in sklearn library, we are going to find out best model and best hyper parameters using GridSearchCV.
              <div style={titles}>
                <PrismCode
                  code={cluster}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Approach 1</h3>
              Use train_test_split and manually tune parameters by trial and error.
              <div style={titles}>
                <PrismCode
                  code={approachOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Approach 2: Use K Fold Cross validation.</h3>
              Manually try suppling models with different parameters to cross_val_score function with 5 fold cross validation.
              <div style={titles}>
                <PrismCode
                  code={parameters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Approach 3: Use GridSearchCV</h3>
              GridSearchCV does exactly same thing as for loop above but in a single line of code.
              <div style={titles}>
                <PrismCode
                  code={exactly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Use RandomizedSearchCV to reduce number of iterations and with random combination of parameters. This is useful when you have too many parameters to try and your training time is longer. It helps reduce the cost of computation</h3>
              <div style={titles}>
                <PrismCode
                  code={reduceNum}
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
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(GreedSearch));
