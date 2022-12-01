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


const outliers = `
import pandas as pd

df = pd.read_csv("heights.csv")

min_thresold = df['height'].quantile(0.05)
max_thresold = df['height'].quantile(0.95)
min_thresold
max_thresold

df[df['height']<min_thresold]
df[df['height']>max_thresold]
`.trim();

const removeOutliner = `
df[(df['height']<max_thresold) & (df['height']>min_thresold)]
df = pd.read_csv("bhp.csv")


#Explore samples that are above 99.90% and below 1% rank
min_thresold, max_thresold = df.price_per_sqft.quantile([0.001, 0.999])
min_thresold, max_thresold

df[df.price_per_sqft < min_thresold]
df[df.price_per_sqft > max_thresold]

df2 = df[(df.price_per_sqft<max_thresold) & (df.price_per_sqft>min_thresold)]
`.trim();

const pandasDes = `
import matplotlib
from matplotlib import pyplot as plt
from scipy.stats import norm
%matplotlib inline

matplotlib.rcParams['figure.figsize'] = (10,6)

df = pd.read_csv("heights.csv")

plt.hist(df.height, bins=20, rwidth=0.8)
plt.xlabel('Height (inches)')
plt.ylabel('Count')
plt.show()


#Plot bell curve along with histogram for dataset
plt.hist(df.height, bins=20, rwidth=0.8, density=True)
plt.xlabel('Height (inches)')
plt.ylabel('Count')

rng = np.arange(df.height.min(), df.height.max(), 0.1)
plt.plot(rng, norm.pdf(rng,df.height.mean(),df.height.std()))


df.height.mean()
df.height.std()

#Outlier detection and removal using 3 standard deviation.
upper_limit = df.height.mean() + 3*df.height.std()

lower_limit = df.height.mean() -3*df.height.std()

df[(df.height>upper_limit) | (df.height<lower_limit)]
`.trim();

const generateOutliner = `
df_no_outlier_std_dev = df[(df.height<upper_limit) & (df.height>lower_limit)]

df_no_outlier_std_dev.head()
df_no_outlier_std_dev.shape
`.trim();

const usingScore = `
df['zscore'] = ( df.height - df.height.mean() ) / df.height.std()

#first record with height 73.84, z score is 1.94. Means 73.84 is 1.94 standard deviation away from mean.
(73.84-66.37)/3.84

#Get data points that has z score higher than 3 or lower than -3. Another way of saying same thing is get data 
#points that are more than 3 standard deviation away.
df[df['zscore']>3]

df[df['zscore']<-3]

df[(df.zscore<-3) | (df.zscore>3)]                                                  #List of all outliers.
`.trim();

const dataFrame = `
df_no_outliers = df[(df.zscore>-3) & (df.zscore<3)]

df_no_outliers.head()
df_no_outliers.shape
`.trim();

const detectionData = `
import pandas as pd
df = pd.read_csv("heights.csv")


#Detect outliers using IQR
Q1 = df.height.quantile(0.25)
Q3 = df.height.quantile(0.75)

IQR = Q3 - Q1

lower_limit = Q1 - 1.5*IQR
upper_limit = Q3 + 1.5*IQR
lower_limit, upper_limit

df[(df.height<lower_limit)|(df.height>upper_limit)]                                 #Outliers

df_no_outlier = df[(df.height>lower_limit)&(df.height<upper_limit)]                 #Remove outliers
df_no_outlier
`.trim();


class FeaturesEng extends Component {
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
              <h3>Feature engineering</h3>
              <ul>
                <li>Feature engineering is the process of using domain knowledge of the data to create features that make ML
                  algorithms work. If feature engineering is done correctly, it increases the predictive power of ML
                  algorithms by creating features from raw data that help facilitate the ML process.</li>
                <li>Feature engineering creates the huge difference between a good model and a bad model.</li>
              </ul>
              <br />
              Suppose, we are given a data “flight date time vs status”. Then, given the date-time data, we have to predict
              the status of the flight.
              <br />
              <br />

              <table>
                <tr>
                  <th>S No.</th>
                  <th>Date Time</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>2018-02-14 20:40</td>
                  <td>Delayed</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2018-02-15 10:30</td>
                  <td>On Time</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2018-02-14 07:40</td>
                  <td>On Time</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2018-02-15 18:10</td>
                  <td>Delayed</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>2018-02-14 10:20</td>
                  <td>On Time</td>
                </tr>
              </table>
              <br />
              <br />
              As the status of the flight depends on the hour of the day, not on the date-time. We will create the new feature
              “Hour_Of_Day”. Using the “Hour_Of_Day” feature, the machine will learn better as this feature is directly related
              to the status of the flight.
              <br />
              <br />

              <table>
                <tr>
                  <th>S No.</th>
                  <th>Hour Of Day</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>20</td>
                  <td>Delayed</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>10</td>
                  <td>On Time</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>7</td>
                  <td>On Time</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>18</td>
                  <td>Delayed</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>10</td>
                  <td>On Time</td>
                </tr>
              </table>
              <br />
              <br />
              <i>Here, creating the new feature “Hour_Of_Day” is the feature engineering.</i>
              <br />

              <h3>Detect outliers using percentile</h3>
              <div style={titles}>
                <PrismCode
                  code={outliers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Remove outliers</h3>
              <div style={titles}>
                <PrismCode
                  code={removeOutliner}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Outlier detection and removal using z-score and standard deviation in python pandas</h3>
              We are going to use heights dataset from kaggle.com. Dataset has heights and weights both but I have removed weights to make it simple.
              <div style={titles}>
                <PrismCode
                  code={pandasDes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Above the heights on higher end is <b>78 inch which is around 6 ft 6 inch (unusual height)</b>. It is ok to remove those data points.
                Similarly on lower end it is <b>54 inch = 4 ft 6 inch</b>. So it is safe to consider both of these cases as outliers</i>
              <br />
              <br />

              <h3>Now remove these outliers and generate new dataframe</h3>
              <div style={titles}>
                <PrismCode
                  code={generateOutliner}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Above shows original dataframe data 10000 data points. Out of that we removed 7 outliers (i.e. 10000-9993).</i>
              <br />

              <h3>Outlier detection and removal using Z Score</h3>
              <ul>
                <li>Z score is a way to achieve same thing that we did above.</li>
                <li>Z score indicates how many standard deviation away a data point is.</li>
                <li>For example in our case mean is 66.37 and standard deviation is 3.84.</li>
                <li>If a value of a data point is 77.91 then Z score for that is 3 because it is 3 standard deviation away (77.91 = 66.37 + 3 * 3.84).</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={usingScore}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Remove the outliers and produce new dataframe</h3>
              <div style={titles}>
                <PrismCode
                  code={dataFrame}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Outlier Detection and Removal Using IQR</h3>
              <div style={titles}>
                <PrismCode
                  code={detectionData}
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

export default (withStyles(styles)(FeaturesEng));
