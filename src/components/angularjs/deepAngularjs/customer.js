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
from matplotlib import pyplot as plt
%matplotlib inline

df = pd.read_csv("customer_churn.csv")

df.drop('customerID',axis='columns',inplace=True)
df.dtypes
`.trim();

const realize = `
df.TotalCharges.values
pd.to_numeric(df.TotalCharges)                                                   #string Convert it to numbers.

pd.to_numeric(df.TotalCharges,errors='coerce').isnull()                          #some values not numbers but blank string.

df[pd.to_numeric(df.TotalCharges,errors='coerce').isnull()]
df.iloc[488].TotalCharges
df[df.TotalCharges!=' '].shape

df1 = df[df.TotalCharges!=' ']                                                   #Remove rows with space in TotalCharges.
df1.TotalCharges = pd.to_numeric(df1.TotalCharges)
df1.TotalCharges.values
df1[df1.Churn=='No']
`.trim();

const visualization = `
tenure_churn_no = df1[df1.Churn=='No'].tenure
tenure_churn_yes = df1[df1.Churn=='Yes'].tenure

plt.xlabel("tenure")
plt.ylabel("Number Of Customers")
plt.title("Customer Churn Prediction Visualiztion")

blood_sugar_men = [113, 85, 90, 150, 149, 88, 93, 115, 135, 80, 77, 82, 129]
blood_sugar_women = [67, 98, 89, 120, 133, 150, 84, 69, 89, 79, 120, 112, 100]

plt.hist([tenure_churn_yes, tenure_churn_no], rwidth=0.95, color=['green','red'],label=['Churn=Yes','Churn=No'])
plt.legend()


mc_churn_no = df1[df1.Churn=='No'].MonthlyCharges      
mc_churn_yes = df1[df1.Churn=='Yes'].MonthlyCharges      

plt.xlabel("Monthly Charges")
plt.ylabel("Number Of Customers")
plt.title("Customer Churn Prediction Visualiztion")

blood_sugar_men = [113, 85, 90, 150, 149, 88, 93, 115, 135, 80, 77, 82, 129]
blood_sugar_women = [67, 98, 89, 120, 133, 150, 84, 69, 89, 79, 120, 112, 100]

plt.hist([mc_churn_yes, mc_churn_no], rwidth=0.95, color=['green','red'],label=['Churn=Yes','Churn=No'])
plt.legend()
`.trim();

const columns = `
def print_unique_col_values(df):
       for column in df:
            if df[column].dtypes=='object':
                print(f'{column}: {df[column].unique()}') 
                
print_unique_col_values(df1)

#Some columns have no internet service or no phone service, that can be replaced with No.
df1.replace('No internet service','No',inplace=True)
df1.replace('No phone service','No',inplace=True)

print_unique_col_values(df1)
`.trim();

const convert = `
yes_no_columns = ['Partner','Dependents','PhoneService','MultipleLines','OnlineSecurity','OnlineBackup',
                  'DeviceProtection','TechSupport','StreamingTV','StreamingMovies','PaperlessBilling','Churn']
                  
for col in yes_no_columns:
    df1[col].replace({'Yes': 1,'No': 0},inplace=True)
    
for col in df1:
    print(f'{col}: {df1[col].unique()}') 
    
df1['gender'].replace({'Female':1,'Male':0},inplace=True)
df1.gender.unique()
`.trim();

const encoding = `
from sklearn.preprocessing import MinMaxScaler

df2 = pd.get_dummies(data=df1, columns=['InternetService','Contract','PaymentMethod'])
df2.columns

cols_to_scale = ['tenure','MonthlyCharges','TotalCharges']

scaler = MinMaxScaler()
df2[cols_to_scale] = scaler.fit_transform(df2[cols_to_scale])

for col in df2:
    print(f'{col}: {df2[col].unique()}')
`.trim();

const split = `
from sklearn.model_selection import train_test_split

X = df2.drop('Churn',axis='columns')
y = df2['Churn']

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=5)
len(X_train.columns)
`.trim();

const tensorflow = `
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(26, input_shape=(26,), activation='relu'),
    keras.layers.Dense(15, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

# opt = keras.optimizers.Adam(learning_rate=0.01)

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=100)

model.evaluate(X_test, y_test)

yp = model.predict(X_test)
yp[:5]
`.trim();

const compiles = `
y_pred = []
for element in yp:
    if element > 0.5:
        y_pred.append(1)
    else:
        y_pred.append(0)
        
        
y_pred[:10]
y_test[:10]


from sklearn.metrics import confusion_matrix , classification_report
print(classification_report(y_test,y_pred))

import seaborn as sn
cm = tf.math.confusion_matrix(labels=y_test,predictions=y_pred)

plt.figure(figsize = (10,7))
sn.heatmap(cm, annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('Truth')

y_test.shape
round((862+229)/(862+229+137+179),2)                      #Accuracy
`.trim();

const precision = `
round(862/(862+179),2)
round(229/(229+137),2)                             #Precision for 1 class. i.e.Precision for customers who actually churned.

round(229/(229+137),2)
round(862/(862+137),2)                             #Recall for 0 class.

round(862/(862+137),2)
round(229/(229+179),2)
`.trim();

const childsFiles = `
from matplotlib import pyplot as plt
from sklearn.metrics import confusion_matrix , classification_report
import pandas as pd

truth = ["Dog","Not a dog","Dog","Dog", "Dog", "Not a dog", "Not a dog", "Dog", "Dog", "Not a dog"]
prediction = ["Dog","Dog", "Dog","Not a dog","Dog", "Not a dog", "Dog", "Not a dog", "Dog", "Dog"]

cm = confusion_matrix(truth,prediction)
print_confusion_matrix(cm,["Dog","Not a dog"])

print(classification_report(truth, prediction))

2*(0.57*0.67/(0.57+0.67))                                                                 #f1 score for Dog class.
2*(0.33*0.25/(0.33+0.25))                                                                 #f1 score for Not a dog class.
`.trim();

const predictions = `
Precision =  True Positive(TP)/ (TP+FP)

Recall = TP/ (TP + FN)
`.trim();


class Customer extends Component {
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
              <h3>Customer Churn Prediction Using Artificial Neural Network (ANN)</h3>
              Neural networks/ ANNs/ simulated neural networks (SNNs), are a subset of ML and are at the heart of DL algorithms. Their name and structure
              are inspired by the human brain, mimicking the way that biological neurons signal to one another.

              <br />
              <br />
              <i>Customer churn prediction is to measure why customers are leaving a business.
                we look customer churn in telecom business. We will build a deep learning model to predict
                the churn and use precision,recall, f1-score to measure performance of our model.</i>
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
              <br />

              <b>Quick glance at above makes me realize that TotalCharges should be float but it is an object.</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={realize}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Data Visualization</h3>
              <div style={titles}>
                <PrismCode
                  code={visualization}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Many of the columns are yes, no etc. Print unique values in object columns to see data values</h3>
              <div style={titles}>
                <PrismCode
                  code={columns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Convert Yes and No to 1 or 0</h3>
              <div style={titles}>
                <PrismCode
                  code={convert}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>One hot encoding for categorical columns</h3>
              <div style={titles}>
                <PrismCode
                  code={encoding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Train test split</h3>
              <div style={titles}>
                <PrismCode
                  code={split}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Build a model (ANN) in tensorflow/keras</h3>
              <div style={titles}>
                <PrismCode
                  code={tensorflow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Precision for 0 class. i.e. Precision for customers who did not churn.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={precision}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={tensorflow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Precision Recall</h3>
              <ul>
                <li><b>Precision:</b>Is out of all Prediction how many got it right.</li>
                <ul>
                  <li>Think about Prediction as base.</li>
                </ul>
                <br />
                <li><b>Recall:</b>Is out of all True how many got it right.</li>
                <ul>
                  <li>Think about truth is base.</li>
                </ul>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={predictions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={childsFiles}
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


export default (withStyles(styles)(Customer));
