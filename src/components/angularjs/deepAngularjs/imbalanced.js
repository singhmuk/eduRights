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
import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
%matplotlib inline
import warnings
warnings.filterwarnings('ignore')

df = pd.read_csv("customer_churn.csv")

df.Churn.value_counts()
517400/ df.shape[0]
`.trim();

const customerID = `
df.drop('customerID',axis='columns',inplace=True)
df.TotalCharges.values

pd.to_numeric(df.TotalCharges,errors='coerce').isnull()
df[pd.to_numeric(df.TotalCharges,errors='coerce').isnull()]

df.iloc[488].TotalCharges
df[df.TotalCharges!=' '].shape
df1 = df[df.TotalCharges!=' ']

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

def print_unique_col_values(df):                                                        #Many of the columns are yes, no.
       for column in df:
            if df[column].dtypes=='object':
                print(f'{column}: {df[column].unique()}') 
                
print_unique_col_values(df1)
`.trim();

const service = `
df1.replace('No internet service','No',inplace=True)
df1.replace('No phone service','No',inplace=True)

print_unique_col_values(df1)

#Convert Yes and No to 1 or 0.
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
df2 = pd.get_dummies(data=df1, columns=['InternetService','Contract','PaymentMethod'])
df2.columns

cols_to_scale = ['tenure','MonthlyCharges','TotalCharges']

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
df2[cols_to_scale] = scaler.fit_transform(df2[cols_to_scale])

for col in df2:
    print(f'{col}: {df2[col].unique()}')
`.trim();

const split = `
X = df2.drop('Churn',axis='columns')
y = testLabels = df2.Churn.astype(np.float32)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)

y_train.value_counts()
y.value_counts()
5163/1869

X_train.shape
len(X_train.columns)
`.trim();

const regression = `
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

def log_reg(X_train, y_train, X_test, y_test, weights):
    if weights==-1:
        model = LogisticRegression()
    else:
        model = LogisticRegression(class_weight={0:weights[0], 1:weights[1]})

    model.fit(X_train, y_train)
    acc = model.score(X_test, y_test)
    print("Accuracy", acc)

    y_pred = model.predict(X_test)
    print("preds", y_pred[:5])

    cl_rep = classification_report(y_test,y_pred)
    print(cl_rep)
    
weights = -1                                                      # pass -1 to use Logistics Regression without weights.
log_reg(X_train, y_train, X_test, y_test, weights)

weights = [1, 1.5]                                                # pass -1 to use Logistics Regression without weights.
log_reg(X_train, y_train, X_test, y_test, weights)
`.trim();

const skewdness = `
# Method1: Undersampling
count_class_0, count_class_1 = df1.Churn.value_counts()

df_class_0 = df2[df2['Churn'] == 0]                               # Divide by class.
df_class_1 = df2[df2['Churn'] == 1]


# Undersample 0-class and concat the DataFrames of both class.
df_class_0_under = df_class_0.sample(count_class_1)
df_test_under = pd.concat([df_class_0_under, df_class_1], axis=0)

print('Random under-sampling:')
print(df_test_under.Churn.value_counts())

X = df_test_under.drop('Churn',axis='columns')
y = df_test_under['Churn']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)


y_train.value_counts()                                                        # Number of classes in training Data.
`.trim();

const applying = `
weights = -1                                                    # pass -1 to use Logistics Regression without weights
log_reg(X_train, y_train, X_test, y_test, weights)


# Method2: Oversampling
# Oversample 1-class and concat the DataFrames of both classes
df_class_1_over = df_class_1.sample(count_class_0, replace=True)
df_test_over = pd.concat([df_class_0, df_class_1_over], axis=0)

print('Random over-sampling:', df_test_over.Churn.value_counts())

X = df_test_over.drop('Churn',axis='columns')
y = df_test_over['Churn']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)


y_train.value_counts()                                                        # Number of classes in training Data.
`.trim();

const logistic = `
weights = -1                                                # pass -1 to use Logistics Regression without weights.
log_reg(X_train, y_train, X_test, y_test, weights)

# Method3: SMOTE
X = df2.drop('Churn',axis='columns')
y = df2['Churn']

from imblearn.over_sampling import SMOTE
smote = SMOTE(sampling_strategy='minority')
X_sm, y_sm = smote.fit_sample(X, y)

y_sm.value_counts()


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X_sm, y_sm, test_size=0.2, random_state=15, stratify=y_sm)

y_train.value_counts()


# Logistic Regression
weights = -1                                                 # pass -1 to use Logistics Regression without weights.
log_reg(X_train, y_train, X_test, y_test, weights)


df2.Churn.value_counts()                                    # Method4: Use of Ensemble with undersampling.

X = df2.drop('Churn',axis='columns')                        # Regain Original features and labels.
y = df2['Churn']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)

y_train.value_counts()
model = LogisticRegression()

df3 = X_train.copy()
df3['Churn'] = y_train
df3.head()

df3_class0 = df3[df3.Churn==0]
df3_class1 = df3[df3.Churn==1]

def get_train_batch(df_majority, df_minority, start, end):
    df_train = pd.concat([df_majority[start:end], df_minority], axis=0)
    X_train = df_train.drop('Churn', axis='columns')
    y_train = df_train.Churn
    return X_train, y_train    
    
X_train, y_train = get_train_batch(df3_class0, df3_class1, 0, 1495)
model1 = LogisticRegression()
model1.fit(X_train, y_train)
y_pred1 = model1.predict(X_test)

X_train, y_train = get_train_batch(df3_class0, df3_class1, 1495, 2990)
model2 = LogisticRegression()
model2.fit(X_train, y_train)
y_pred2 = model2.predict(X_test)

X_train, y_train = get_train_batch(df3_class0, df3_class1, 2990, 4130)
model3 = LogisticRegression()
model3.fit(X_train, y_train)
y_pred3 = model3.predict(X_test)

len(y_pred1)

y_pred_final = y_pred1.copy()
for i in range(len(y_pred1)):
    n_ones = y_pred1[i] + y_pred2[i] + y_pred3[i]
    if n_ones>1:
        y_pred_final[i] = 1
    else:
        y_pred_final[i] = 0
        
        
cl_rep = classification_report(y_test, y_pred_final)
print(cl_rep)
`.trim();



class Imbalanced extends Component {
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
              <h3>Handle imbalanced data in churn prediction. Logistic Regression</h3>
              <i>Customer churn prediction is to measure why customers are leaving a business.
                Looking at customer churn in telecom business. We will build a deep learning model to predict
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

              <h3>First of all, drop customerID column as it is of no use</h3>

              <div style={titles}>
                <PrismCode
                  code={customerID}
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

              <h3>Some of the columns have no internet service or no phone service, that can be replaced with a simple No.</h3>
              <div style={titles}>
                <PrismCode
                  code={service}
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

              <h3>Use logistic regression classifier</h3>
              <div style={titles}>
                <PrismCode
                  code={regression}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Mitigating Skewdness of Data</h3>
              <div style={titles}>
                <PrismCode
                  code={skewdness}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Applying Logistic Regression</h3>
              <div style={titles}>
                <PrismCode
                  code={applying}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />

              <h3>Logistic Regression</h3>
              <div style={titles}>
                <PrismCode
                  code={logistic}
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


export default (withStyles(styles)(Imbalanced));
