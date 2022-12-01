import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import ScatterPlot from '../../../assets/ML/scatterplot.JPG'
import ErrorEqu from '../../../assets/ML/error_equation.jpg'
import LinearEqu from '../../../assets/ML/linear_equation.png'
import Equations from '../../../assets/ML/equation.jpg'


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

const oneVarri = `
import pandas as pd
import numpy as np
from sklearn import linear_model
import matplotlib.pyplot as plt

df = pd.read_csv('homeprices.csv')

%matplotlib inline
plt.xlabel('area')
plt.ylabel('price')
plt.scatter(df.area,df.price,color='red',marker='+')

new_df = df.drop('price',axis='columns')
price = df.price

reg = linear_model.LinearRegression()                         # Create linear regression object
reg.fit(new_df,price)

reg.predict([[3300]])                                         #Predict price of a home with area = 3300 sqr ft.
reg.coef_
reg.intercept_


#Y = m * X + b (m is coefficient and b is intercept)
3300*135.78767123 + 180616.43835616432

reg.predict([[5000]])

#Generate CSV file with list of home price predictions
area_df = pd.read_csv("areas.csv")
p = reg.predict(area_df)
area_df['prices']=p

area_df.to_csv("prediction.csv")
`.trim();

const linearPy = `
# Data Preprocessing Template

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('Data.csv')

X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 3].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)


from sklearn.preprocessing import StandardScaler                                    # Feature Scaling
sc_X = StandardScaler()
sc_y = StandardScaler()

X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

y_train = sc_y.fit_transform(y_train)
`.trim();

const independent = `
import pandas as pd
import numpy as np
from sklearn import linear_model

df = pd.read_csv('homeprices.csv')

df.bedrooms.median()                                                          #Fill NA values with median value of a column.
df.bedrooms = df.bedrooms.fillna(df.bedrooms.median())

reg = linear_model.LinearRegression()
reg.fit(df.drop('price',axis='columns'),df.price)

reg.predict([[3000, 3, 40]])
112.06244194*3000 + 23388.88007794*3 + -3231.71790863*40 + 221323.00186540384

reg.predict([[2500, 4, 5]])
`.trim();




const testings = `
if __name__ == "__main__":
    import matplotlib.pyplot as plt
    from sklearn.model_selection import train_test_split
    from sklearn import datasets

    def mean_squared_error(y_true, y_pred):
        return np.mean((y_true - y_pred) ** 2)

    X, y = datasets.make_regression(n_samples=100, n_features=1, noise=20, random_state=4)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1234)

    regressor = LinearRegression(learning_rate=0.01, n_iters=1000)
    regressor.fit(X_train, y_train)
    predictions = regressor.predict(X_test)

    mse = mean_squared_error(y_test, predictions)
    print("MSE:", mse)

    accu = r2_score(y_test, predictions)
    print("Accuracy:", accu)

    y_pred_line = regressor.predict(X)
    cmap = plt.get_cmap("viridis")
    fig = plt.figure(figsize=(8, 6))
    m1 = plt.scatter(X_train, y_train, color=cmap(0.9), s=10)
    m2 = plt.scatter(X_test, y_test, color=cmap(0.5), s=10)
    plt.plot(X, y_pred_line, color="black", linewidth=2, label="Prediction")
    plt.show()`.trim();


class LeanearRegression extends Component {
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
              <h3>Regression</h3>
              Used to find the relationship between variables.
              <br />
              <ul>
                <li><b>R-Squared: </b> If there are no relationship between the values of x-axis and the values of
                  y-axis then linear regression can not be used to predict anything.
                  <br />
                  The relationship is measured with a value of r-squared. The r-squared value ranges from -1 to 1, where 0 means no relationship,
                  and 1, or -1, means 100% related.</li>
                <br />

                <li><b>Predict Future Values: </b>Now we can use the information we have gathered to predict future values.
                  <br />
                  <b>Ex.</b> Predict the speed of a 10 years old car. </li>
              </ul>
              <br />

              <h3>Logistic regression</h3>
              It is a classification algorithm, used to predict binary outcomes for a given set of Independent Variables. The
              dependent Variables outcome is discrete.
              <br />
              <br />

              <b>How is linear and logistic regression different</b>

              <table>
                <tr>
                  <th>Linear Regration</th>
                  <th>Logistic Regression</th>
                </tr>
                <tr>
                  <td>Used to solve Regression problems. The response Variable are continuous in nature. It helps
                    estimate the dependent Variable in the Independent Variable. Is a straight line.</td>
                  <td>Used to solve classification Problems. The response variable is categorical in nature. It helps calculate the possibility of a
                    particular event taking place. An<b> S-curve (S = Sigmoid)</b>.</td>
                </tr>
                <tr>
                  <td><i><b>Linear regression is used to predict the continuous dependent variable using a given set of independent variables.</b></i></td>
                  <td><i><b>Logistic Regression is used to predict the categorical dependent variable using a given set of independent variables.</b></i></td>
                </tr>
                <tr>
                  <td>We predict the value of continuous variables.</td>
                  <td>We predict the values of categorical variables.</td>
                </tr>
                <tr>
                  <td><i><b>We find the best fit line, by which we can easily predict the output.</b></i></td>
                  <td><i><b>We find the S-curve by which we can classify the samples.</b></i></td>
                </tr>
                <tr>
                  <td>Least square estimation method is used for estimation of accuracy.</td>
                  <td>Maximum likelihood estimation method is used for estimation of accuracy.</td>
                </tr>
                <tr>
                  <td><i><b>The output must be a continuous value, such as price, age, etc.</b></i></td>
                  <td><i><b>The output must be a Categorical value such as 0 or 1, Yes or No, etc.</b></i></td>
                </tr>
                <tr>
                  <td>There may be collinearity between the independent variables.</td>
                  <td>There should not be collinearity between the independent variable.</td>
                </tr>
              </table>
              <br />

              <h3>Applications of Logistic Regression</h3>
              <ul>
                <li>Image Segmentation and Categorization Geographic Image Processing.</li>
                <li>Handwriting recognition Healthcare.</li>
                <li>Analyzing a group of over million people for myocardial infarction within a period of 10 years.</li>
                <li>Prediction whether a person is depressed/ not based on bag of words from the corpus seems to be
                  conveniently solvable using logistic regression and SVM.</li>
              </ul>
              <br />

              <h3>Linear Regression With One Variable</h3>
              Below table represents current home prices in monroe township based on square feet area,
              new jersey.
              <table>
                <tr>
                  <th>2600</th>
                  <th>550000</th>
                </tr>
                <tr>
                  <td>3000</td>
                  <td>565000</td>
                </tr>
                <tr>
                  <td>3200</td>
                  <td>610000</td>
                </tr>
                <tr>
                  <td>3600</td>
                  <td>680000</td>
                </tr>
                <tr>
                  <td>4000</td>
                  <td>725000</td>
                </tr>
              </table>
              <br />

              <b>Problem Statement :</b> Given above data build a machine learning model that can predict
              home prices based on square feet area.
              <br />
              You can represent values in above table as a scatter plot (values are shown in red markers).
              After that one can draw a straight line that best fits values on chart.
              <br />
              <img src={ScatterPlot} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              You can draw multiple lines like this but we choose the one where total sum of error is
              minimum.
              <br />
              <img src={ErrorEqu} alt="ErrorEqu" className="responsive" style={redesign} />
              <br />
              Home prices can be presented as following equation.
              <br />
              <i><b>home price = m * (area) + b</b></i>
              <br />
              Generic form of same equation is,
              <br />
              <img src={LinearEqu} alt="LinearEqu" className="responsive" style={redesign} />
              <br />
              <div style={titles}>
                <PrismCode
                  code={oneVarri}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>with Python</h3>
              <div style={titles}>
                <PrismCode
                  code={linearPy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Linear Regression With Multi Variable</h3>
              <table>
                <tr>
                  <th>Area</th>
                  <th>Bedroom</th>
                  <th>Age</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td>2600</td>
                  <td>3</td>
                  <td>20</td>
                  <td>550000</td>
                </tr>
                <tr>
                  <td>3000</td>
                  <td>4</td>
                  <td>15</td>
                  <td>565000</td>
                </tr>
                <tr>
                  <td>3200</td>
                  <td> </td>
                  <td>18</td>
                  <td>610000</td>
                </tr>
                <tr>
                  <td>3600</td>
                  <td>3</td>
                  <td>30</td>
                  <td>595000</td>
                </tr>
                <tr>
                  <td>4000</td>
                  <td>5</td>
                  <td>8</td>
                  <td>760000</td>
                </tr>
                <tr>
                  <td>4100</td>
                  <td>6</td>
                  <td>8</td>
                  <td>810000</td>
                </tr>
              </table>
              Given the Home Price find out price of a home that has,
              3000 sqr ft area, 3 bedroom, 40 years old
              2500 sqr ft area, 5 bedroom, 5 years old
              <br />
              <br />
              We will use regression with multiple varriables, So price can be calculated using.
              <br />
              <img src={Equations} alt="Equations" className="responsive" style={redesign} />
              <br />
              Here, area, bedroom, age are independent varriable or features whereas price is dependent varriable.
              <br />


              <div style={titles}>
                <PrismCode
                  code={independent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />



              <b>Testing</b>
              <div style={titles}>
                <PrismCode
                  code={testings}
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

export default (withStyles(styles)(LeanearRegression));
