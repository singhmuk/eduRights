import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Activations from '../../../assets/AI/predicted.png'
import logsvalues from '../../../assets/AI/logsvalues.PNG'
import binarycross from '../../../assets/AI/binarycross.PNG'


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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
y_predicted = np.array([1,1,0,0,1])
y_true = np.array([0.30,0.7,1,0,0.5])

def mae(y_predicted, y_true):
    total_error = 0
    for yp, yt in zip(y_predicted, y_true):
        total_error += abs(yp - yt)
        
    print("Total error is:",total_error)
    mae = total_error/len(y_predicted)
    print("Mean absolute error is:",mae)
    return mae
    
mae(y_predicted, y_true)
`.trim();

const easier = `
np.abs(y_predicted-y_true)
np.mean(np.abs(y_predicted-y_true))

def mae_np(y_predicted, y_true):
    return np.mean(np.abs(y_predicted-y_true))
    
mae_np(y_predicted, y_true)
`.trim();

const entropy = `
np.log([0])
epsilon = 1e-15
np.log([1e-15])

y_predicted
y_predicted_new = [max(i,epsilon) for i in y_predicted]
y_predicted_new

1-epsilon
y_predicted_new = [min(i,1-epsilon) for i in y_predicted_new]
y_predicted_new

y_predicted_new = np.array(y_predicted_new)
np.log(y_predicted_new)

-np.mean(y_true*np.log(y_predicted_new)+(1-y_true)*np.log(1-y_predicted_new))

def log_loss(y_true, y_predicted):
    y_predicted_new = [max(i,epsilon) for i in y_predicted]
    y_predicted_new = [min(i,1-epsilon) for i in y_predicted_new]
    y_predicted_new = np.array(y_predicted_new)
    return -np.mean(y_true*np.log(y_predicted_new)+(1-y_true)*np.log(1-y_predicted_new))
    
log_loss(y_true, y_predicted)
`.trim();

const childsFiles = `
revenue = np.array([[180,200,220],[24,36,40],[12,18,20]])
expenses = np.array([[80,90,100],[10,16,20],[8,10,10]])

profit=revenue - expenses
profit
`.trim();

const sales = `
price_per_unit = np.array([1000,400,1200])
units = np.array([[30,40,50],[5,10,15],[2,5,7]])

price_per_unit * units

np.dot(price_per_unit,units)
`.trim();


class Loss extends Component {
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
              <h3>Loss or Cost Function</h3>
              <b>Tensorflow loss value:</b>
              <ul>
                <li>sparse_categorical_cross entropy</li>
                <li>binary_cross entropy</li>
                <li>categorical_cross entropy</li>
                <li>mean_absolute_error</li>
                <li>mean_squared_error</li>
              </ul>
              <br />
              <br />

              <b>Most common loss functions for Machine Learning Regression:</b>
              <ul>
                <li><b>Absolute Error(AE): </b>Refers to the magnitude of difference between the prediction of an observation and the true value of that observation.</li>
                <li><b>Mean Absolute Error (MEA): </b>sum of Absolute Error / Total Number of Observation</li>
                <ul><li>The MEA is an average of the all absolute errors.</li></ul>
                <br />
                <li><b>Mean Squared Error (MSE): </b>Take the difference between our model’s predictions and the ground truth, square it, and
                  average it out across the whole dataset.</li>
                <ul><li>=((AE)2 + (AE)2 + ... +(AE)2) / Total Number of Observation</li></ul>
              </ul>
              <br />

              <i>Implement Mean Absolute Error.</i>
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

              <b>Implement same thing using numpy in much easier way</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={easier}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li><b>Loss Function: </b>A function that associates a cost with a decision.</li>
                <li><b>Ex. </b>Suppose a person moving from source to destinatios, Which have routes A, B and C with cost 10, 15 and 20
                  respectively.</li>
                <br />
                <li><b>Log Loss/ Binary Cross Entropy: </b></li>
                <li><b>Entropy: </b>Means randomness in our observations.</li>
                <li>Binary cross entropy compares each of the predicted probabilities to actual class output which can be either 0 or 1. It
                  then calculates the score that penalizes the probabilities based on the distance from the expected value. That means how
                  close or far from the actual value.</li>
                <li><b>Binary Cross Entropy is the negative average of the log of corrected predicted probabilities.</b></li>
              </ul>
              <br />
              <b>Predicted Probabilities: </b>Output given by the model that tells, the probability object belongs to class 1.
              <br />
              <img src={Activations} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <b>Corrected Probabilities: </b>probability that a particular observation belongs to its original class.  As shown in the above image, ID6 originally
              belongs to class 1 hence its predicted probability and corrected probability is the same i.e 0.94.
              <br />
              <br />
              On the other hand, the observation ID8  is from class 0. In this case, the predicted probability i.e the chances that ID8 belongs to class 1
              is 0.56 whereas, the corrected probability means the chances that ID8 belongs to class 0 is ( 1-predicted_probability) is 0.44. In the same
              way, corrected probabilities of all the instances will be calculated.
              <br />
              <br />
              <b>Log(Corrected probabilities): </b>
              Now we will calculate the log value for each of the corrected probabilities. The reason behind using the log value is, the log value offers
              less penalty for small differences between predicted probability and corrected probability. when the difference is large the penalty will
              be higher.
              <br />
              <img src={logsvalues} alt="Theata" className="responsive2" style={redesign} />
              <br />
              Here we have calculated log values for all the corrected probabilities. Since all the corrected probabilities lie between 0 and 1, all the
              log values are negative.
              <br />
              <br />
              In order to compensate for this negative value, we will use a negative average of the values.
              <br />
              <img src={binarycross} alt="Theata" className="responsive2" style={redesign} />
              <br />
              The value of the negative average of corrected probabilities we calculate 0.214 which is our Log loss/ Binary cross-entropy for this example.


              <h3>Implement Log Loss or Binary Cross Entropy</h3>
              <div style={titles}>
                <PrismCode
                  code={entropy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matrix Math</h3>
              <b>Calculate profit/ loss from revenue and expenses.</b>
              <div style={titles}>
                <PrismCode
                  code={childsFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Calculate total sales from units and price per unit using matrix multiplication</h3>
              <div style={titles}>
                <PrismCode
                  code={sales}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>In above case numpy is using broadcasting so it expands price_per_unit array from 1 row, 3 columns to
                3 row and 3 columns. Correct way to do matrix multiplication is to use dot product as above.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(Loss));
