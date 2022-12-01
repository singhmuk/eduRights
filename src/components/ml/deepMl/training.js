import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Equations from '../../../assets/ML/oneHotEncodung.png'


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
import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline

df = pd.read_csv("carprices.csv")

newPlt = plt.scatter(df['Mileage'],df['Sell Price($)'])                              
newPlt = plt.scatter(df['Age(yrs)'],df['Sell Price($)'])

X = df[['Mileage','Age(yrs)']]
Y = df['Sell Price($)']  

df.shape
df.head()
df.isna().sum() 
df.describe()
newPlt
`.trim();

const reason = `
from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3) 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3, random_state=10)             #random_state argument
 
X_train
X_test
`.trim();

const regrationModal = `
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, Y_train)

model.coef_
model.intercept_

model.predict(X_test)
model.predict([[69000,6]])
model.score(X_test, Y_test)
`.trim();

const pickle = `
import pickle

with open('model_pickle','wb') as file:
    pickle.dump(model,file)
    
with open('model_pickle','rb') as file:                                                  # Load save modal.
    mp = pickle.load(file)
`.trim();

const sklearn = `
from sklearn.externals import joblib                                                     

joblib.dump(model, 'model_joblib')

mj = joblib.load('model_joblib')                                                         # Load save modal.
`.trim();

const stack = `
import csv
import numpy as np
import pandas as pd

# Download data from https://archive.ics.uci.edu/ml/datasets/spambase
FILE_NAME = "spambase.data"

with open(FILE_NAME, "r") as f:                                           # 1) load with csv file
    data = list(csv.reader(f, delimiter=","))
    
data = np.array(data, dtype=np.float32)
data.shape
data.dtype


# skiprows=1
data = np.loadtxt(FILE_NAME, delimiter=",", dtype=np.float32)             # 2) load with np.loadtxt()


# skip_header=0, missing_values="---", filling_values=0.0                 # 3) load with np.genfromtxt()
data = np.genfromtxt(FILE_NAME, delimiter=",", dtype=np.float32)


n_samples, n_features = data.shape                                        # split into X and y
n_features -= 1

X = data[:, 0:n_features]
y = data[:, n_features]

X[0, 0:5]
`.trim();

const clusters = `
import pandas as pd

df = pd.read_csv("homeprices.csv")

dummies = pd.get_dummies(df.town)                                                 # Using Pandas to create dummy varriables.
merged = pd.concat([df,dummies],axis='columns')

final = merged.drop(['town'], axis='columns')
final
`.trim();

const dummyVar = `
final = final.drop(['west windsor'], axis='columns')

X = final.drop('price', axis='columns')
y = final.price

from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X,y)
model.predict(X)                                                                   # 2600 sqr ft home in new jersey
`.trim();

const sklearns = `
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

dfle = df
le = LabelEncoder()
dfle.town = le.fit_transform(dfle.town)

X = dfle[['town','area']].values
Y = dfle.price.values

#Use OHE to create dummy variables for each of the town.
ct = ColumnTransformer([('town', OneHotEncoder(), [0])], remainder = 'passthrough')

X = ct.fit_transform(X)
X = X[:,1:]

model.fit(X,y)

model.predict([[0,1,3400]])
model.predict([[1,0,2800]])
`.trim();

const encoding = `
import numpy as np
from sklearn import preprocessing

input_labels = ['red','black','red','green','black','yellow','white']           #input labels.

encoder = preprocessing.LabelEncoder()                                          #create the label encoder and train it
encoder.fit(input_labels)


#Check the performance by encoding the random ordered list

test_labels = ['green','red','black']
encoded_values = encoder.transform(test_labels)
print("Labels =", test_labels)
print("Encoded values =", list(encoded_values))

encoded_values = [3,0,4,1]
decoded_list = encoder.inverse_transform(encoded_values)
print("Encoded values =", encoded_values)
print("Decoded labels =", list(decoded_list))
`.trim()


class Traning extends Component {
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
              <h3>1. Training And Testing Available Data</h3>
              We have a dataset containing prices of used BMW cars. We are going to analyze this dataset
              and build a prediction function that can predict a price by taking mileage and age of the car
              as input. We will use sklearn <b>train_test_split</b> method to split training and testing dataset.
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
              <br />

              <b>we are going to split available data in two sets.</b>
              <ol>
                <li><b>Training: </b>We will train our model on this dataset.</li>
                <li><b>Testing: </b>We will use this subset to make actual predictions using trained model.</li>
              </ol>
              <br />

              <div style={titles}>
                <PrismCode
                  code={reason}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Run linear regression model</h3>
              <div style={titles}>
                <PrismCode
                  code={regrationModal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Save Model</h3>
              There are two ways we can save a model in scikit learn.
              <ul>
                <li><b>1.Pickle string: </b>Algorithm for serializing and de-serializing a Python object structure. </li>
                <ul>
                  <li><b>pickle.dump: </b>Use to serialize an object hierarchy.</li>
                  <li><b>pickle.load : </b>Use to deserialize a data stream.</li>
                </ul>
                <br />
                <li><b>2.Pickled model as a file using joblib: </b>It is more efficient on objects that carry large numpy arrays. These functions
                  also accept file-like object instead of filenames.</li>
                <ul>
                  <li><b>joblib.dump: </b>To serialize an object hierarchy </li>
                  <li><b>joblib.load: </b>To deserialize a data stream</li>
                </ul>
              </ul>
              <br />
              <br />

              <b>Save Trained Modal using Python Pickle</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={pickle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Save Trained Modal using joblib</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={sklearn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Diffrent way to load data</h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. What is One Hot Encoding?</h3>
              <ul>
                <li>OHE is a process of converting categorical data variables so they can be provided to ML algorithms
                  to improve predictions.</li>
                <br />

                <li>Categorical data refers to variables that are made up of label values, for example, a “color” variable could have
                  the values “red“, “blue, and “green”. Think of values like different categories that sometimes have a natural
                  ordering to them.</li>
                <br />

                <li>Some ML algorithms can work directly with categorical data depending on implementation, such as a decision tree, but
                  most require any i/p or o/p variables to be a numeric in value. This means that any categorical
                  data must be mapped to integers.</li>
                <br />

                <li>OHE is one method of converting data to prepare it for an algorithm and get a better prediction. With
                  one-hot, we convert each categorical value into a new categorical column and assign a binary value of 1 or 0 to
                  those columns. Each integer value is represented as a binary vector. All the values are zero, and the index is
                  marked with a 1.</li>
              </ul>
              <br />

              <img src={Equations} alt="Equations" className="responsive" style={redesign} />

              <br />
              <b>Why use OHE?</b>
              <ul>
                <li>OHE is useful for data that has no relationship to each other.</li>
                <li>ML algorithms read a higher number as better/ more important than a lower number.</li>
                <li>OHE makes our training data more useful and expressive, and it can be rescaled
                  easily. By using numeric values, we more easily determine a probability for our values.</li>
              </ul>
              <br />
              <b>How to convert categorical data to numerical data</b>
              <br />
              Manually converting our data to numerical values includes two basic steps:
              <ul>
                <li><b>Integer encoding:</b>We need to assign each category value with an integer, value. If we had
                  the values red, yellow, and blue, we could assign them 1, 2, and 3 respectively.</li>
                <li>One hot encoding</li>
              </ul>
              <br />

              <h3>6. Categorical Variables and One Hot Encoding</h3>
              <div style={titles}>
                <PrismCode
                  code={clusters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Dummy Varriable Trap</h3>
              When you can derive one variable from other variables, they are known to be multi-colinear.
              <br />
              Here if you know values of california and georgia then you can easily infer value of new jersey state, i.e.
              california=0 and georgia=0. There for these state variables are called to be multi-colinear. In this
              situation linear regression won't work as expected. Hence you need to drop one column.
              <br />
              <br />
              <b>N: </b>sklearn library takes care of dummy variable trap hence even if you don't drop one of the
              state columns it is going to work.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={dummyVar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Using sklearn OneHotEncoder</h3>
              First step is to use label encoder to convert town names into numbers.
              <div style={titles}>
                <PrismCode
                  code={sklearns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. What is Label Encoding?</h3>
              Most of the sklearn functions expect that the data with number labels rather than word labels. Hence, we need to
              convert such labels into number labels. This process is called label encoding. We can perform label encoding of data
              with the help of <b>LabelEncoder()</b> function of scikit-learn Python library.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={encoding}
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

export default (withStyles(styles)(Traning));
