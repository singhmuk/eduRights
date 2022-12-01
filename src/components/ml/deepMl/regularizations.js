import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Overfitting from '../../../assets/ML/overfitting.png'


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

const redesign = {
  height: 350,
  width: 600
}


const cluster = `
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

import warnings                                                                     # Suppress Warnings for clean notebook
warnings.filterwarnings('ignore')

df = pd.read_csv('./Melbourne_housing_FULL.csv')
df.head()
df.nunique()

# use limited columns which makes more sense for serving our purpose
cols_to_use = ['Suburb', 'Rooms', 'Type', 'Method', 'SellerG', 'Regionname', 'Propertycount', 
               'Distance', 'CouncilArea', 'Bedroom2', 'Bathroom', 'Car', 'Landsize', 'BuildingArea', 'Price']

df = df[cols_to_use]
df.isna().sum()                                                                 

cols_to_fill_zero = ['Propertycount', 'Distance', 'Bedroom2', 'Bathroom', 'Car']     
df[cols_to_fill_zero] = df[cols_to_fill_zero].fillna(0)

# other continuous features can be imputed with mean for faster results since our focus is on Reducing overfitting
# using Lasso and Ridge Regression

df['Landsize'] = df['Landsize'].fillna(df.Landsize.mean())
df['BuildingArea'] = df['BuildingArea'].fillna(df.BuildingArea.mean())

df.dropna(inplace=True)                                                        
df.shape
`.trim();

const cagorical = `
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression  

df = pd.get_dummies(df, drop_first=True)

X = df.drop('Price', axis=1)
y = df['Price']

train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=2)                             
model = LinearRegression()
model.fit(train_X, train_y)

model.score(test_X, test_y)
model.score(train_X, train_y)
`.trim();

const regularized = `
from sklearn import linear_model
from sklearn.linear_model import Ridge   

lasso_reg = linear_model.Lasso(alpha=50, max_iter=100, tol=0.1)
lasso_reg.fit(train_X, train_y)

lasso_reg.score(test_X, test_y)
lasso_reg.score(train_X, train_y)
                                               
ridge_reg= Ridge(alpha=50, max_iter=100, tol=0.1)                                      #Using Ridge Regression Model.
ridge_reg.fit(train_X, train_y)

ridge_reg.score(test_X, test_y)
ridge_reg.score(train_X, train_y)
`.trim();

const clustering = `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("diabetes.csv")
df.isnull().sum()
df.Outcome.value_counts()

#There is slight imbalance in our dataset but since it is not major we will not worry about it!
X = df.drop("Outcome",axis="columns")
y = df.Outcome

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_scaled[:3]

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, stratify=y, random_state=10)

y_train.value_counts()
y_test.value_counts()
`.trim();

const standAlone = `
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier

scores = cross_val_score(DecisionTreeClassifier(), X, y, cv=5)
scores.mean()
`.trim();

const bagging = `
from sklearn.ensemble import BaggingClassifier

bag_model = BaggingClassifier(
    base_estimator=DecisionTreeClassifier(), 
    n_estimators=100, 
    max_samples=0.8, 
    oob_score=True,
    random_state=0
)
bag_model.fit(X_train, y_train)
bag_model.oob_score_

bag_model = BaggingClassifier(
  base_estimator=DecisionTreeClassifier(), 
  n_estimators=100, 
  max_samples=0.8, 
  oob_score=True,
  random_state=0
)

scores = cross_val_score(bag_model, X, y, cv=5)
scores.mean()
`.trim();

const improvement = `
from sklearn.ensemble import RandomForestClassifier

scores = cross_val_score(RandomForestClassifier(n_estimators=50), X, y, cv=5)
scores.mean()
`.trim();


class Regularizations extends Component {
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
              <h1>1. What is overfitting and underfitting ?</h1>
              <ul>
                <b>Overfitting:</b>
                <li>Overfitting refers to the scenario where a ML model can’t generalize or
                  fit well on unseen dataset. A clear sign of ML overfitting is if its error on the
                  testing/ validation dataset is much greater than the error on training dataset.</li>
                <li>Overfitting happens when a model learns the detail and noise in the training dataset to the
                  extent that it negatively impacts the performance of the model on a new dataset. This means that
                  the noise/ random fluctuations in the training dataset is picked up and learned as concepts by
                  the model. The problem is that these concepts do not apply to new datasets and negatively impact
                  the model’s ability to generalize.</li>
                <br />

                <b>Underfitting:</b>
                <li>Underfitting refers to a model that can neither model the training dataset nor generalize to new
                  dataset. An underfit ML model is not a suitable model and will be obvious as it will
                  have poor performance on the training dataset.</li>
              </ul>
              <br />
              <b>Example: </b>
              Let’s three students have prepared for a mathematics examination.

              The first student has only studied Addition mathematic operations and skipped other mathematics operations
              such as Subtraction, Division, Multiplication etc.

              The second student has a particularly good memory. Thus, second student has memorized all the problems presented
              in the textbook.

              And the third student has studied all mathematical operations and is well prepared for the exam.

              In the exam student one will only be able to solve the questions related to Addition and will fail in problems or
              questions asked related to other mathematics operations.

              Student two will only be able to answer questions if they happened to appear in the textbook and will not be able
              to answer any other questions.

              Student three will be able to solve all the exam problems reasonably well.
              <br />
              <br />
              ML algorithms have similar behavior to our three students, sometimes the model generated by the
              algorithm are similar to the first student. They learn from only from a small part of the training dataset, in
              such cases the model is <b>Underfitting</b>.
              <br />
              <br />
              Sometimes the model will memorize the entire training dataset, like the second student. They perform very
              well on known instances, but faulter badly on unseen data. In such cases the model is
              said to be <b>Overfitting</b>.
              <br />
              <br />
              And when model does well in both the training dataset and unseen data, it is a good fit.
              <br />
              <br />
              <br />
              <b>Example: </b>
              Consider you have visited a city “X” and took a ride in a taxi. On speaking to friends, you later realize that
              the taxi driver charged you twice/ three times more than the standard fare. This occurred as you were new in
              the city and driver quite literally took you for a ride.

              Also, you purchased some items from a street vendor, and you again ended up paying more than they were worth. You
              finally decide that the people in the city “X” are dishonest. Which is a human trait, people often generalize.
              <br />
              <br />
              ML models also have this weakness if we are not careful to avoid bias during the development stages:
              modeling, selecting algorithms, features, training dataset etc.
              <br />
              Suppose in the same city “X” another taxi driver charged you reasonably and as per the meter, but based
              on experience, you consider that this driver has also charged more. This is called Overfitting.
              <br />
              <br />
              So can say that, if model performs well on test or unseen dataset then it is a
              best fit/ good model. And if did not perform well on test or unseen dataset but did well on training
              dataset then it is an Overfit model. And any model that did not do well in the training dataset nor in
              test dataset then it is a Underfit model.
              <br />
              <img src={Overfitting} alt="Equations" className="responsive" style={redesign} />
              <br />
              <br />

              <b>Detecting Overfitting or Underfitting :</b>
              <br />
              A key challenge of detecting any kind of fit (underfitting or best fit or overfitting), is almost
              impossible before you test the data.
              <br />
              <br />
              <ul>
                <li>If our model does much better on the training dataset than on the test dataset, then we’re likely overfitting.</li>
                <li>If our model does much better on the test dataset than on the training dataset, then we are likely underfitting.</li>
                <li>If our model does well on both the training and test datasets then we have the best fit.</li>
              </ul>
              <br />

              Another simple way to detect this is by using cross-validation. This attempts to examine the trained
              model with a new data set to check its predictive accuracy. Given a dataset, some portion of this is
              held back (30%) while the rest is used in training the model. Once the model has been trained the
              reserved data is then used to check the accuracy of the model compared to the accuracy of derived from
              the data used in training. A significant variance in these two flags overfitting.
              <br />
              <br />
              <b>How to Prevent Overfitting or Underfitting :</b>
              <br />
              Detecting overfitting or underfitting is useful, but it does not solve the problem. Here are a few of the most popular solutions.
              <br />
              <b>1. Cross-validation:</b>
              <ul>
                <li>Cross-validation is a powerful preventative measure against overfitting.</li>
                <li>Use initial training data to generate multiple mini train-test splits. Use these splits to tune
                  your model.</li>
                <li>In standard k-fold cross-validation, we partition the data into k subsets, called folds. Then,
                  we iteratively train the algorithm on k-1 folds while using the remaining fold as the test set or
                  holdout fold.</li>
                <li>Cross-validation allows to tune hyperparameters with only original training dataset.
                  This allows to keep test dataset as a truly unseen dataset for selecting final model.</li>
              </ul>
              <br />

              <b>2. Train with more data:</b>
              <ul>
                <li>It won’t work every time, but training with more data can help algorithms detect the signal better.</li>
                <li>As the user feeds more training data into the model, it will be unable to overfit all the samples
                  and will be forced to generalize to obtain results.</li>
                <li>However, this method is considered expensive, and, therefore, users should ensure that the data
                  being used is relevant and clean.</li>
                <li>If we just add more noisy data, this technique will not
                  help. That is why we should always ensure our data is clean and relevant.</li>
              </ul>
              <br />

              <b>3. Data augmentation:</b>
              <ul>
                <li>If unable to continually collect more data, we can make the available data sets appear diverse.</li>
                <li>Data augmentation makes a data sample look slightly different every time it is processed by the
                  model. The process makes each data set appear unique to the model and prevents the model from
                  learning the characteristics of the data sets.</li>
              </ul>
              <br />

              <b>4. Reduce Complexity or Data Simplification:</b>
              <ul>
                <li>Overfitting can occur due to the complexity of a model, such that, even with large volumes of
                  data, the model still manages to overfit the training dataset.</li>
                <li>Reduce overfitting by decreasing the complexity of the model to make it simple enough that it does not overfit.</li>
                <li>Some actions that can be implemented include pruning a decision tree, reducing the number
                  of parameters in a Neural Networks, and using dropout on a Neural Networks.</li>
              </ul>
              <br />

              <b>5. Regularization:</b>
              <ul>
                <li>Regularization refers to a broad range of techniques for artificially forcing our model to be simpler.</li>
                <li>The method will depend on the type of learner we are using.</li>
                <li>Oftentimes, the regularization method is a hyperparameter as well, which means it can be tuned through
                  cross-validation.</li>
              </ul>
              <br />

              <b>6. Ensembling:</b>
              <ul>
                <li>Ensembles are ML methods for combining predictions from multiple separate models. There are
                  different methods for ensembling, but the two most common are. <b>Boosting and Bagging</b>.</li>
                <li>Boosting works by using simple base models to increase their aggregate complexity. It trains a
                  large number of weak learners arranged in a sequence, such that each learner in the sequence learns
                  from the mistakes of the learner before it.</li>
                <br />
                <b>Boosting: </b>
                <ul>
                  <li>Attempts to improve the predictive flexibility of simple models.</li>
                  <li>Combines all the weak learners in the sequence to bring out one strong learner.</li>
                </ul>
                <br />
                <b>Bagging: </b>
                <ul>
                  <li>It works by training many strong learners arranged in a parallel pattern and then combining
                    them to optimize their predictions.</li>
                  <li>Attempts to reduce the chance of overfitting complex models.</li>
                  <li>It combines all the strong learners together to "smooth out" their predictions.</li>
                </ul>
              </ul>
              <br />

              <b>7. Early Stopping:</b>
              <ul>
                <li>When training a learning algorithm iteratively, we can measure how well each iteration of the
                  model performs.</li>
                <li>Up until a certain number of iterations, new iterations improve the model. After that point,
                  however, the model’s ability to generalize can weaken as it begins to overfit the training data.</li>
                <li>Early stopping refers stopping the training process before the learner passes that point.</li>
                <li>Today, this technique is mostly used in deep learning while other techniques (regularization)
                  are preferred for classical machine learning.</li>
              </ul>
              <br />

              <h3>2. L1 and L2 Regularization</h3>
              We are going to use Melbourne House Price Dataset where we'll predict House Predictions based on
              various features.
              <br />
              <br />
              <i>housing price prediction where we will see a model overfit when we use simple linear regression.
                Then we will use Lasso regression (L1 regularization) and ridge regression (L2 regression) to address
                this overfitting issue.</i>
              <br />
              <br />
              <b>Steps to handling Missing values:</b>
              <ul>
                <li>Some feature's missing values can be treated as zero (or NA values).</li>
                <li>Like 0 for Propertycount, Bedroom2 will refer to other class of NA values.</li>
                <li>like 0 for Car feature will mean that there's no car parking feature with house.</li>
              </ul>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={cluster}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Let's one hot encode the categorical features</h3>
              <div style={titles}>
                <PrismCode
                  code={cagorical}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Here training score is 68% but test score is 13.85% which is very low.</i>
              <br />

              <h3>4. Normal Regression is clearly overfitting the data, let's try other models</h3>
              Using Lasso (L1 Regularized) Regression Model.
              <div style={titles}>
                <PrismCode
                  code={regularized}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>We see that Lasso and Ridge Regularizations prove to be beneficial when our Simple Linear Regression Model overfits. These results may not be that contrast but significant in most cases.Also that L1 & L2 Regularizations are used in Neural Networks too.</i>
              <br />
              <br />

              <h3>5. Ensemble Learning: Bagging</h3>
              We will use pima indian diabetes dataset to predict if a person has a diabetes or not based on certain features such as blood pressure, skin thickness, age etc. We will train a standalone model first and then use bagging ensemble technique to check how it can improve the performance of the model.
              <div style={titles}>
                <PrismCode
                  code={clustering}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Train using stand alone model</h3>
              <div style={titles}>
                <PrismCode
                  code={standAlone}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Train using Bagging</h3>
              <div style={titles}>
                <PrismCode
                  code={bagging}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. We can see some improvement in test score with bagging classifier as compared to a standalone classifier</h3>
              <b>Train using Random Forest</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={improvement}
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

export default (withStyles(styles)(Regularizations));
