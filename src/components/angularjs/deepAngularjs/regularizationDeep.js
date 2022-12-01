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


const childsFile = `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings

warnings.filterwarnings('ignore')

df = pd.read_csv("./sonar_dataset.csv", header=None)

df.isna().sum()                                                                               #check for nan values.
df.columns
df[60].value_counts()                                                                         #label is not skewed

X = df.drop(60, axis=1)
y = df[60]

y = pd.get_dummies(y, drop_first=True)
y.value_counts()
`.trim();

const pipes = `
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

X_train.head()
`.trim();

const learning = `
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
  keras.layers.Dense(60, input_dim=60, activation='relu'),
  keras.layers.Dense(30, activation='relu'),
  keras.layers.Dense(15, activation='relu'),
  keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=100, batch_size=8)

model.evaluate(X_test, y_test)
`.trim();

const accuracy = `
from sklearn.metrics import confusion_matrix , classification_report

y_pred = model.predict(X_test).reshape(-1)
y_pred = np.round(y_pred)                                             # round the values to nearest integer.
print(y_pred[:10])

y_test[:10]

print(classification_report(y_test, y_pred))
`.trim();

const dropout = `
modeld = keras.Sequential([
  keras.layers.Dense(60, input_dim=60, activation='relu'),
  keras.layers.Dropout(0.5),
  keras.layers.Dense(30, activation='relu'),
  keras.layers.Dropout(0.5),
  keras.layers.Dense(15, activation='relu'),
  keras.layers.Dropout(0.5),
  keras.layers.Dense(1, activation='sigmoid')
])

modeld.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
modeld.fit(X_train, y_train, epochs=100, batch_size=8)

modeld.evaluate(X_test, y_test)
`.trim();

const improved = `
from sklearn.metrics import confusion_matrix , classification_report

y_pred = modeld.predict(X_test).reshape(-1)
y_pred = np.round(y_pred)
print(y_pred[:10])

print(classification_report(y_test, y_pred))
`.trim();


class RegularizationDeep extends Component {
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
              <h3>Dropout Regularization In Deep Neural Network</h3>
              <i>
                This is a dataset that describes sonar chirp returns bouncing off different services. The 60 i/p
                variables are the strength of the returns at different angles. It is a binary classification problem
                that requires a model to differentiate rocks from metal cylinders.
              </i>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={pipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using Deep Learning Model.</h3>
              <b>Model without Dropout Layer.</b>
              <div style={titles}>
                <PrismCode
                  code={learning}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Training Accuracy --- Test Accuracy</h3>
              <div style={titles}>
                <PrismCode
                  code={accuracy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Model with Dropout Layer</h3>
              <div style={titles}>
                <PrismCode
                  code={dropout}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Training Accuracy is still good but Test Accuracy Improved</h3>
              using dropout layer test accuracy increased from 0.77 to 0.81.
              <br />
              <div style={titles}>
                <PrismCode
                  code={improved}
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


export default (withStyles(styles)(RegularizationDeep));
