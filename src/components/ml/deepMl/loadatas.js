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


const stack = `
import csv
import numpy as np
import pandas as pd

# Download data from https://archive.ics.uci.edu/ml/datasets/spambase
FILE_NAME = "spambase.data"


with open(FILE_NAME, "r") as f:                                           # 1) load with csv file
    data = list(csv.reader(f, delimiter=","))

data = np.array(data, dtype=np.float32)
print(data.shape)


# skiprows=1
data = np.loadtxt(FILE_NAME, delimiter=",", dtype=np.float32)             # 2) load with np.loadtxt()
print(data.shape, data.dtype)


# skip_header=0, missing_values="---", filling_values=0.0                 # 3) load with np.genfromtxt()
data = np.genfromtxt(FILE_NAME, delimiter=",", dtype=np.float32)
print(data.shape)


n_samples, n_features = data.shape                                        # split into X and y
n_features -= 1

X = data[:, 0:n_features]
y = data[:, n_features]

print(X.shape, y.shape)
print(X[0, 0:5])
# X = data[:, 1:n_features+1]
# y = data[:, 0]
`.trim();

// const stack = ``.trim();



class Loadatas extends Component {
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
              <h3></h3>

              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              {/* <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>*/}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Loadatas));
