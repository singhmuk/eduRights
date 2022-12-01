import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Logistic from '../../../assets/ML/navBayers.png'


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

const predicting = `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB

df = pd.read_csv("titanic.csv")

df.drop(['PassengerId','Name','SibSp','Parch','Ticket','Cabin','Embarked'],axis='columns',inplace=True)
inputs = df.drop('Survived',axis='columns')
target = df.Survived

#inputs.Sex = inputs.Sex.map({'male': 1, 'female': 2})
dummies = pd.get_dummies(inputs.Sex)
inputs = pd.concat([inputs,dummies],axis='columns')
                
inputs.drop(['Sex','male'],axis='columns',inplace=True)                 #Dropping male column of dummy variable trap theory.

inputs.columns[inputs.isna().any()]
inputs.Age[:10]
inputs.Age = inputs.Age.fillna(inputs.Age.mean())

X_train, X_test, y_train, y_test = train_test_split(inputs,target,test_size=0.3)

model = GaussianNB()
model.fit(X_train,y_train)

model.score(X_test,y_test)
X_test[0:10]
y_test[0:10]

model.predict(X_test[0:10])
model.predict_proba(X_test[:10])

from sklearn.model_selection import cross_val_score
cross_val_score(GaussianNB(),X_train, y_train, cv=5)                  #Calculate the score using cross validation
`.trim();

const naiveBease = `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

df = pd.read_csv("spam.csv")
df.groupby('Category').describe()
df['spam']=df['Category'].apply(lambda x: 1 if x=='spam' else 0)

X_train, X_test, y_train, y_test = train_test_split(df.Message,df.spam)

v = CountVectorizer()
X_train_count = v.fit_transform(X_train.values)
X_train_count.toarray()[:2]

model = MultinomialNB()
model.fit(X_train_count,y_train)

emails = ['Hey mohan, can we get?','Upto Dont miss this reward!']
emails_count = v.transform(emails)
model.predict(emails_count)

X_test_count = v.transform(X_test)
model.score(X_test_count, y_test)

clf = Pipeline([('vectorizer', CountVectorizer()),('nb', MultinomialNB())])

clf.fit(X_train, y_train)
clf.score(X_test,y_test)
clf.predict(emails)
`.trim();


class NaiveBrs extends Component {
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
              <h3>Naïve Bayes (lassification technique based)</h3>
              Naïve Bayes algorithms  applying Bayes’ theorem with a strong assumption that
              all the predictors are independent to each other.
              <br />
              <b>Ex.</b> a phone may be considered as smart if it is having touch screen,
              internet facility, good camera etc. Though all these features are dependent on each other, they contribute
              independently to the probability of that the phone is a smart phone.
              <br />
              <br />
              <i>In Bayesian classification, the main interest is find the posterior probabilities i.e.</i>
              <br />
              the probability of a label given some observed features, 𝑃(𝐿 | 𝑓𝑒𝑎𝑡𝑢𝑟𝑒𝑠). With the help of Bayes theorem, we can
              express this in quantitative form as follows −
              <br />
              <b>P(L|features)=P(L)P(features|L)P(features)</b>
              <br />
              <br />
              Here, (𝐿 | 𝑓𝑒𝑎𝑡𝑢𝑟𝑒𝑠) is the posterior probability of class.<br />
              𝑃(𝐿) is the prior probability of class.<br />
              𝑃(𝑓𝑒𝑎𝑡𝑢𝑟𝑒𝑠|𝐿) is the likelihood which is the probability of predictor given class.
              <br />
              𝑃(𝑓𝑒𝑎𝑡𝑢𝑟𝑒𝑠) is the prior probability of predictor.
              <br />
              <br />
              Building model using Naïve Bayes in Python library, Scikit learn. We have the following three types of Naïve Bayes model under Scikit learn Python
              library −
              <br />

              <h3>Gaussian Naïve Bayes</h3>
              It is the simplest Naïve Bayes classifier having the assumption that the data from each label is drawn from a simple
              Gaussian distribution.
              <br />
              <br />
              Multinomial Naïve Bayes Another useful Naïve Bayes classifier in
              which the features are assumed to be drawn from a simple Multinomial distribution. Such kind of Naïve Bayes are most
              appropriate for the features that represents discrete counts.
              <br />
              <br />
              Bernoulli Naïve Bayes Another important model in which features are assumed to be binary (0 and 1). Text classification with ‘bag of words’
              model can be an application of Bernoulli Naïve Bayes.
              <br />
              <br />
              <b>Pros: </b>
              <ul>
                <li>Naïve Bayes classification is easy to implement and fast.</li>
                <li>It will converge faster than discriminative models like logistic regression.</li>
                <li>It requires less training data.</li>
                <li>It is highly scalable in nature, or they scale linearly with the number of predictors and data points.</li>
                <li>It can make probabilistic predictions and can handle continuous as well as discrete data. Naïve Bayes classification
                  algorithm can be used for binary as well as multi-class classification problems both.</li>
              </ul>
              <br />
              <b>Cons: </b>
              Its strong feature independence because in real life it is almost impossible to have a set of features which are completely independent
              of each other. Its ‘zero frequency’ which means that if a categorial variable has a category but not being observed
              in training data set, then Naïve Bayes model will assign a zero probability to it and it will be unable to make a
              prediction.
              <br />
              <br />
              <b>Applications: </b>
              <ul>
                <li><b>Real-time prediction: </b>Due to its ease of implementation and
                  fast computation, it can be used to do prediction in real-time.</li>
                <li><b>Multi-class prediction: </b>It can be used to predict posterior probability of multiple classes of target variable.</li>
                <li><b>Text classification: </b>Due to the feature of multi-class prediction, Naïve Bayes classification algorithms are well
                  suited for text classification. That is why it is also used to solve problems like spam-filtering and sentiment
                  analysis.</li>
                <li><b>Recommendation system: </b>Along with the algorithms like collaborative filtering, Naïve Bayes makes a
                  Recommendation system which can be used to filter unseen information and to predict weather a user would like the
                  given resource or not.</li>
              </ul>
              <br />

              <h3>Naïve Bayes Classifier Algorithm (supervised)</h3>
              The Naïve Bayes algorithm is comprised of two words Naïve and Bayes.
              <ul>
                <li>It is mainly used in text classification that includes a high-dimensional training dataset.</li>
                <li>It is one of the simple and most effective Classification algorithms which helps in building the
                  fast machine learning models that can make quick predictions.</li>
                <li>It is a probabilistic classifier, which means it predicts on the basis of the probability of an object.</li>
                <b>Ex.</b> Spam filtration, Sentimental analysis, and classifying articles.
                <li><b>Naïve: </b>It is called Naïve because it assumes that the occurrence of a certain feature is
                  independent of the occurrence of other features. Such as if the fruit is identified on the bases of
                  color, shape, and taste, then red, spherical, and sweet fruit is recognized as an apple. Hence each
                  feature individually contributes to identify that it is an apple without depending on each other.</li>
                <li><b>Bayes: </b>It is called Bayes because it depends on the principle of Bayes' Theorem.</li>
              </ul>
              <br />
              <b>Bayes' Theorem:</b>
              <br />
              <img src={Logistic} alt="Equations" className="responsive" style={{ width: 300, height: 50 }} />
              <br />
              <br />
              Where,
              <br />
              <b>P(A|B) is Posterior probability: </b>Probability of hypothesis A on the observed event B.
              <br />
              <b>P(B|A) is Likelihood probability: </b>Probability of the evidence given that the probability of a hypothesis is true.
              <br />
              <b>P(A) is Prior Probability: </b>Probability of hypothesis before observing the evidence.
              <br />
              <b>P(B) is Marginal Probability: </b>Probability of Evidence.
              <br />

              <b>Advantages:</b>
              <ul>
                <li>It is one of the fast and easy ML algorithms to predict a class of datasets.</li>
                <li>It can be used for Binary as well as Multi-class Classifications.</li>
                <li>It performs well in Multi-class predictions as compared to the other Algorithms.</li>
                <li>It is the most popular choice for text classification problems.</li>
              </ul>
              <br />

              <b>Disadvantages:</b>
              Naive Bayes assumes that all features are independent or unrelated, so it cannot learn the relationship
              between features.
              <br />

              <b>Applications:</b>
              <ul>
                <li>It is used for Credit Scoring.</li>
                <li>It is used in medical data classification.</li>
                <li>It can be used in real-time predictions because Naïve Bayes Classifier is an eager learner.</li>
                <li>It is used in Text classification such as Spam filtering and Sentiment analysis.</li>
              </ul>
              <br />

              <b>Types of Naïve Bayes Model:</b>
              <ul>
                <li><b>Gaussian :</b>The Gaussian model assumes that features follow a normal distribution. This means
                  if predictors take continuous values instead of discrete, then the model assumes that these values are
                  sampled from the Gaussian distribution.</li>
                <li><b>Multinomial :</b>Used when the data is multinomial distributed. It is primarily used for document
                  classification problems, it means a particular document belongs to which category such as Sports, Politics,
                  education, etc.
                  <br />
                  The classifier uses the frequency of words for the predictors.</li>
                <li><b>Bernoulli :</b>The Bernoulli classifier works similar to the Multinomial classifier, but the
                  predictor variables are the independent Booleans variables. Such as if a particular word is present
                  or not in a document. This model is also famous for document classification tasks.</li>
              </ul>
              <br />

              <h3>Predicting survival from titanic crash</h3>
              <div style={titles}>
                <PrismCode
                  code={predicting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Naive Bayes 2</h3>
              <div style={titles}>
                <PrismCode
                  code={naiveBease}
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

export default (withStyles(styles)(NaiveBrs));
