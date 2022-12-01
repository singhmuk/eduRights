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


const cluster = `
import numpy as np


class LDA:
    def __init__(self, n_components):
        self.n_components = n_components
        self.linear_discriminants = None

    def fit(self, X, y):
        n_features = X.shape[1]
        class_labels = np.unique(y)

        # SW = sum((X_c - mean_X_c)^2 )                                                     # Within class scatter matrix:
        # SB = sum( n_c * (mean_X_c - mean_overall)^2 )                                     # Between class scatter:

        mean_overall = np.mean(X, axis=0)
        SW = np.zeros((n_features, n_features))
        SB = np.zeros((n_features, n_features))
        for c in class_labels:
            X_c = X[y == c]
            mean_c = np.mean(X_c, axis=0)
            
            SW += (X_c - mean_c).T.dot((X_c - mean_c))                            # (4, n_c) * (n_c, 4) = (4,4) -> transpose
            n_c = X_c.shape[0]                                                    # (4, 1) * (1, 4) = (4,4) -> reshape
            mean_diff = (mean_c - mean_overall).reshape(n_features, 1)
            SB += n_c * (mean_diff).dot(mean_diff.T)

        
        A = np.linalg.inv(SW).dot(SB)                                      # Determine SW^-1 * SB
                                                                           # Get eigenvalues and eigenvectors of SW^-1 * SB
        eigenvalues, eigenvectors = np.linalg.eig(A)
                                                            # eigenvector v = [:,i] column vector, transpose for easier cal.
        
        eigenvectors = eigenvectors.T                                      # sort eigenvalues high to low
        idxs = np.argsort(abs(eigenvalues))[::-1]
        eigenvalues = eigenvalues[idxs]
        eigenvectors = eigenvectors[idxs]
        
        self.linear_discriminants = eigenvectors[0 : self.n_components]   # store first n eigenvectors

    def transform(self, X):
        return np.dot(X, self.linear_discriminants.T)                     # project data
`.trim();

const testings = `
if __name__ == "__main__":
    # Imports
    import matplotlib.pyplot as plt
    from sklearn import datasets

    data = datasets.load_iris()
    X, y = data.data, data.target

    # Project the data onto the 2 primary linear discriminants
    lda = LDA(2)
    lda.fit(X, y)
    X_projected = lda.transform(X)

    print("Shape of X:", X.shape)
    print("Shape of transformed X:", X_projected.shape)

    x1, x2 = X_projected[:, 0], X_projected[:, 1]

    plt.scatter(
        x1, x2, c=y, edgecolor="none", alpha=0.8, cmap=plt.cm.get_cmap("viridis", 3)
    )

    plt.xlabel("Linear Discriminant 1")
    plt.ylabel("Linear Discriminant 2")
    plt.colorbar()
    plt.show()
`.trim();

// const stack = ``.trim();

// const stack = ``.trim();


class LdaPy extends Component {
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
              <h3>Linear Discriminant Analysis</h3>
              It is a linear model for classification and dimensionality reduction. Most commonly used for feature extraction in pattern classification problems.
              <br />
              <br />
              <b>Why LDA:</b>
              <ul>
                <li>Logistic Regression perform well for binary classification but falls short in the case of multiple classification problems
                  with well-separated classes. While LDA handles these.</li>
                <li>LDA also used in data preprocessing to reduce the number of features just as PCA which
                  reduces the computing cost significantly.</li>
                <li>LDA is also used in face detection algorithms. In Fisherfaces LDA is used to extract useful data
                  from different faces. Coupled with eigenfaces it produces effective results.</li>
              </ul>
              <br />

              <b>Shortcomings:</b>
              <ul>
                <li>Linear decision boundaries may not effectively separate non-linearly separable classes. More
                  flexible boundaries are desired.</li>
                <li>In cases where the number of observations exceeds the number of features, LDA might not perform
                  as desired. This is called Small Sample Size (SSS) problem. Regularization is required.</li>
              </ul>
              <br />

              <b>Assumptions:</b>
              LDA makes some assumptions about the data:
              <br />
              <ul>
                <li>Assumes the data to be distributed normally/ Gaussian distribution of data points i.e. each
                  feature must make a bell-shaped curve when plotted. </li>
                <li>Each of the classes has identical covariance matrices.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={cluster}
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
              {/* <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
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

export default (withStyles(styles)(LdaPy));
