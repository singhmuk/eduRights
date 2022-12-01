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


const prediction = `
df = pd.read_csv("customer_churn.csv")

df.Churn.value_counts()
517400/ df.shape[0]

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


def print_unique_col_values(df):
       for column in df:
            if df[column].dtypes=='object':
                print(f'{column}: {df[column].unique()}') 
                
print_unique_col_values(df1)

df1.replace('No internet service','No',inplace=True)
df1.replace('No phone service','No',inplace=True)
print_unique_col_values(df1)

yes_no_columns = ['Partner','Dependents','PhoneService','MultipleLines','OnlineSecurity','OnlineBackup',
                  'DeviceProtection','TechSupport','StreamingTV','StreamingMovies','PaperlessBilling','Churn']
for col in yes_no_columns:
    df1[col].replace({'Yes': 1,'No': 0},inplace=True)
    
    
for col in df1:
    print(f'{col}: {df1[col].unique()}') 
    
df1['gender'].replace({'Female':1,'Male':0},inplace=True)
df1.gender.unique()
`.trim();

const categorical = `
from sklearn.preprocessing import MinMaxScaler

df2 = pd.get_dummies(data=df1, columns=['InternetService','Contract','PaymentMethod'])

cols_to_scale = ['tenure','MonthlyCharges','TotalCharges']

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
5163/1869
len(X_train.columns)
`.trim();

const keras = `
from tensorflow_addons import losses
import tensorflow as tf
from tensorflow import keras
from sklearn.metrics import confusion_matrix , classification_report

def ANN(X_train, y_train, X_test, y_test, loss, weights):
    model = keras.Sequential([
        keras.layers.Dense(26, input_dim=26, activation='relu'),
        keras.layers.Dense(15, activation='relu'),
        keras.layers.Dense(1, activation='sigmoid')
    ])

    model.compile(optimizer='adam', loss=loss, metrics=['accuracy'])
    
    if weights == -1:
        model.fit(X_train, y_train, epochs=100)
    else:
        model.fit(X_train, y_train, epochs=100, class_weight = weights)
    
    print(model.evaluate(X_test, y_test))
    
    y_preds = model.predict(X_test)
    y_preds = np.round(y_preds)
    
    print("Classification Report:", classification_report(y_test, y_preds))
    
    return y_preds
    
y_preds = ANN(X_train, y_train, X_test, y_test, 'binary_crossentropy', -1)
`.trim();

const pipes = `
# Method 1: Undersampling
count_class_0, count_class_1 = df1.Churn.value_counts()

df_class_0 = df2[df2['Churn'] == 0]
df_class_1 = df2[df2['Churn'] == 1]

df_class_0_under = df_class_0.sample(count_class_1)
df_test_under = pd.concat([df_class_0_under, df_class_1], axis=0)

print('Random under-sampling:')
print(df_test_under.Churn.value_counts())

X = df_test_under.drop('Churn',axis='columns')
y = df_test_under['Churn']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)
y_train.value_counts()

y_preds = ANN(X_train, y_train, X_test, y_test, 'binary_crossentropy', -1)
`.trim();

// const pipes = ``.trim();


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
              <h3>Handling imbalanced data in customer churn prediction</h3>
              <b>Handling imbalanced dataset:</b>
              <ul>
                <li>1. Under sampling majority class.</li>
                <li>2. Over sampling minority class by duplication.</li>
                <ul>
                  <li>Generate new sample from current sample by simply duplicating them.</li>
                </ul>
                <br />
                <li>3. Over sampling minority class using SMOTE.</li>
                <ul>
                  <li>Generate synthetic example using KNN aglo.</li>
                  <li><b>SMOTE: </b>Synthetic Minority Over-sampling Technique.</li>
                </ul>
                <br />
                <li>Ensemble Method.</li>
                <li>Focal loss.</li>
                <ul>
                  <li>Focal loss will penalize majority samples during loss calculation and give weight to minority class samples.</li>
                </ul>
              </ul>
              <br />

              <i>Customer churn prediction is to measure why customers are leaving a business. Looking at customer churn in telecom business.
                We will build a deep learning model to predict the churn and use precision,recall, f1-score to measure performance of our model.
                We will then handle imbalance in data using various techniques and improve f1-score.</i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={prediction}
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

              <h3>One hot encoding for categorical columns</h3>
              <div style={titles}>
                <PrismCode
                  code={categorical}
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

              <h3>Build a model (ANN) in tensorflow/ keras</h3>
              <div style={titles}>
                <PrismCode
                  code={keras}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Mitigating Skewdness of Data</h3>
              <div style={titles}>
                <PrismCode
                  code={pipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Printing Classification in the last, Scroll down till the last epoch to watch the
                classification report.</i>
              {/* <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
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


export default (withStyles(styles)(Imbalanced));
