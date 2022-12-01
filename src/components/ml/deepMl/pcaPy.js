import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Sigmoid from '../../../assets/ML/primer.PNG'
import PCAS from '../../../assets/ML/pca1.png'
import PCAS2 from '../../../assets/ML/pca2.png'
import PCAS3 from '../../../assets/ML/pca3.png'
import PCAS4 from '../../../assets/ML/pca4.png'


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
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


const stack = `
import numpy as np

class PCA:
    def __init__(self, n_components):
        self.n_components = n_components
        self.components = None
        self.mean = None

    def fit(self, X):
        self.mean = np.mean(X, axis=0)
        X = X - self.mean
        
        cov = np.cov(X.T)                                                 # covariance, function needs samples as columns
        eigenvalues, eigenvectors = np.linalg.eig(cov)                                      # eigenvalues, eigenvectors                                           

                                               # -> eigenvector v = [:,i] column vector, transpose for easier calculations
                                                                                            # sort eigenvectors
        eigenvectors = eigenvectors.T
        idxs = np.argsort(eigenvalues)[::-1]
        eigenvalues = eigenvalues[idxs]
        eigenvectors = eigenvectors[idxs]
        
        self.components = eigenvectors[0 : self.n_components]                               # store first n eigenvectors

    def transform(self, X):
        X = X - self.mean
        return np.dot(X, self.components.T)
`.trim();

const testings = `
if __name__ == "__main__":
    import matplotlib.pyplot as plt
    from sklearn import datasets

    # data = datasets.load_digits()
    data = datasets.load_iris()
    X = data.data
    y = data.target

    pca = PCA(2)                                                # Project the data onto the 2 primary principal components
    pca.fit(X)
    X_projected = pca.transform(X)

    print("Shape of X:", X.shape)
    print("Shape of transformed X:", X_projected.shape)

    x1 = X_projected[:, 0]
    x2 = X_projected[:, 1]

    plt.scatter(x1, x2, c=y, edgecolor="none", alpha=0.8, cmap=plt.cm.get_cmap("viridis", 3))

    plt.xlabel("Principal Component 1")
    plt.ylabel("Principal Component 2")
    plt.colorbar()
    plt.show()
`.trim();

const pcaps = `
import pandas as pd
from sklearn.datasets import load_digits
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from matplotlib import pyplot as plt
%matplotlib inline


dataset = load_digits()
dataset.keys()
dataset.data.shape
dataset.data[0]
dataset.data[0].reshape(8,8)

plt.gray()
plt.matshow(dataset.data[0].reshape(8,8))
plt.matshow(dataset.data[9].reshape(8,8))
dataset.target[:5]

df = pd.DataFrame(dataset.data, columns=dataset.feature_names)
df.head()
dataset.target
df.describe()

X = df
y = dataset.target


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_scaled

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=30)

model = LogisticRegression()
model.fit(X_train, y_train)
model.score(X_test, y_test)
`.trim();

const reduceDim = `
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression

pca = PCA(0.95)
X_pca = pca.fit_transform(X)
pca.explained_variance_ratio_
pca.n_components_
X_pca

X_train_pca, X_test_pca, y_train, y_test = train_test_split(X_pca, y, test_size=0.2, random_state=30)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_pca, y_train)
model.score(X_test_pca, y_test)

pca = PCA(n_components=2)                                              #Let's select only two components.
X_pca = pca.fit_transform(X)
X_pca.shape

pca.explained_variance_ratio_

#see both combined retains 0.14+0.13=0.27 or 27% of important feature information.
X_train_pca, X_test_pca, y_train, y_test = train_test_split(X_pca, y, test_size=0.2, random_state=30)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_pca, y_train)
model.score(X_test_pca, y_test)
`.trim();

// const stack = ``.trim();


class PcaPy extends Component {
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


              <h3>Principal Component Analysis (Unsupervised)</h3>
              Primarily used for dimensionality reduction in ML.
              <br />
              PCA is a process of figuring out most important features/ principle components that has the most impact on the target variable.
              <br />
              <br />
              <b>Few things to keep ikn mind before using PCA:</b>
              <ul>
                <li>Scale Features befor applying PCA.</li>
                <li>Accuracy might drop.</li>
              </ul>
              <br />
              <br />
              <b>Steps:</b>
              <ul>
                <li>Load heart disease dataset in pandas dataframe.</li>
                <li>Remove outliers using Z score. Usual guideline is to remove anything that has Z score greater than 3 formula or Z score less-than -3,</li>
                <li>Convert text columns to numbers using label encoding and one hot encoding.</li>
                <li>Apply scaling.</li>
                <li>Build a classification model using various methods (SVM, logistic regression, random forest) and check which model gives you the best accuracy.</li>
                <li>Now use PCA to reduce dimensions, retrain your model and see what impact it has on your model in terms of accuracy. Keep in mind that many times doing PCA reduces the accuracy but computation is much lighter and that's the trade off you need to consider while building models in real life.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={pcaps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Use PCA to reduce dimensions</h3>
              Use components such that 95% of variance is retained
              <div style={titles}>
                <PrismCode
                  code={reduceDim}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>We get less accuancy (~60%) as using only 2 components did not retain much of the feature information. However in real life you will find many cases where using 2 or few PCA components can still give you a pretty good accuracy.</i>
              <br />

              <h3>PCA</h3>
              High dimensionality means that the dataset has a large number of features. The primary problem associated with
              high-dimensionality in the machine learning field is model overfitting.
              <br />
              <br />
              Many algorithms that work fine in low dimensions become intractable when the input is high-dimensional.
              <br />
              <br />
              The ability to generalize correctly becomes exponentially harder as the dimensionality of the training dataset
              grows, as the training set covers a dwindling fraction of the input space. Models also become more efficient as
              the reduced feature set boosts learning rates and diminishes computation costs by removing redundant features.
              <br />
              <br />
              PCA can also be used to filter noisy datasets, such as image compression.
              <br />
              <br />
              <b>Primer:</b>
              <br />
              PCA makes maximum variability in the dataset more visible by rotating the axes. PCA identifies a list of the
              principal axes to describe the underlying dataset before ranking them according to the amount of variance
              captured by each.
              <img src={Sigmoid} alt="Equations" className="responsive" style={redesign} />
              <br />

              <i>the first of the principal components (PC1) is a synthetic variable constructed as a linear combination to
                determine the magnitude and the direction of the maximum variance in the dataset. This component has the
                highest variability of all the components and therefore the most information. The PC2 is also a synthetic
                linear combination which captures the remaining variance in the data set and is not correlated with PC1.
                The following principal components similarly capture the remaining variation without being correlated with the
                previous component.</i>
              <br />
              <br />
              PCA is an unsupervised learning algorithm as the directions of these components is calculated purely from the
              explanatory feature set without any reference to response variables.
              <br />
              <br />
              The number of feature combinations is equal to the number of dimensions of the dataset and in general set the
              maximum number of PCAs which can be constructed.
              <img src={PCAS} alt="Equations" className="responsive" style={redesign} />
              <br />

              <img src={PCAS2} alt="Equations" className="responsive" style={redesign} />
              <br />
              <br />
              <i>Each blue point corresponds to an observation, and each principal component reduces the three dimensions to
                two. The algorithm finds a pair of orthogonal vectors (red arrows) that define a lower-dimensional space
                (grey plane) to capture as much variance as possible from the original dataset.</i>

              <br />
              <br />
              <b>Measurement:</b>
              Eigenvectors and eigenvalues are measures used to quantify the direction and the magnitude of the
              variation captured by each axis. Eigenvector describes the angle or direction of the axis through the
              data space, and the eigenvalue quantifies the magnitude of the variance of the data on the axis.
              <img src={PCAS3} alt="Equations" className="responsive" style={redesign} />
              <ul>
                <li><i>A is an x n matrix, ƛ is the eigenvalue, and the X is the eigenvector.</i></li>
                <li><i>The number of feature combinations is equal to the number of dimensions of the dataset.
                  <b>Ex.</b> A dataset with ten features will have ten eigenvalues/eigenvector combinations.</i></li>
              </ul>
              <br />
              The correlation between each principal component should be zero as subsequent components capture the
              remaining variance. Correlation between any pair of eigenvalue/eigenvector is zero so that the axes are
              orthogonal(perpendicular), to each other in the data space.
              <br />
              <br />
              The line which maximizes the variance of the data once it is projected into the data space is equivalent to
              finding the path which minimizes the least-squares distance of the projection.
              <img src={PCAS4} alt="Equations" className="responsive" style={redesign} />
              <br />

              <b>Assumptions:</b>
              <ul>
                <li><b>Sample size: </b>Minimum of 150 observations and ideally a 5:1 ratio of observation to features.</li>
                <li><b>Correlations: </b>The feature set is correlated, so the reduced feature set effectively
                  represents the original data space.</li>
                <li><b>Linearity: </b>All variables exhibit a constant multivariate normal relationship, and
                  principal components are a linear combination of the original features.</li>
                <li><b>Outliers: </b>No significant outliers in the data as these can have a disproportionate
                  influence on the results.</li>
                <li><b>Large variance implies more structure: </b>High variance axes are treated as principal components,
                  while low variance axes are treated as noise and discarded.</li>
              </ul>

              <br />
              <b>PCA Limitations :</b>
              <br />
              <ul>
                <li><b>Model performance: </b>PCA can lead to a reduction in model performance on datasets with no or
                  low feature correlation or does not meet the assumptions of linearity.</li>
                <li><b>Classification accuracy: </b>Variance based PCA framework does not consider the
                  differentiating characteristics of the classes. Also, the information that distinguishes one class
                  from another might be in the low variance components and may be discarded.</li>
                <li><b>Outliers: </b>PCA is also affected by outliers, and normalization of the data needs to be an
                  essential component of any workflow.</li>
                <li><b>Interpretability: </b>Each principal component is a combination of original features and does
                  not allow for the individual feature importance to be recognized.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={stack}
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

export default (withStyles(styles)(PcaPy));
