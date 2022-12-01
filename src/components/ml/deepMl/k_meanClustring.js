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

const kmeansClucs = `
from sklearn.cluster import KMeans
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from matplotlib import pyplot as plt
%matplotlib inline

df = pd.read_csv("income.csv")

plt.scatter(df.Age,df['Income($)'])
plt.xlabel('Age')
plt.ylabel('Income($)')

km = KMeans(n_clusters=3)
y_predicted = km.fit_predict(df[['Age','Income($)']])

df['cluster']=y_predicted

km.cluster_centers_

df1 = df[df.cluster==0]
df2 = df[df.cluster==1]
df3 = df[df.cluster==2]

plt.scatter(df1.Age,df1['Income($)'],color='green')
plt.scatter(df2.Age,df2['Income($)'],color='red')
plt.scatter(df3.Age,df3['Income($)'],color='black')
plt.scatter(km.cluster_centers_[:,0],km.cluster_centers_[:,1],color='purple',marker='*',label='centroid')

plt.xlabel('Age')
plt.ylabel('Income ($)')
plt.legend()
`.trim();

const preprocessing = `
scaler = MinMaxScaler()

scaler.fit(df[['Income($)']])
df['Income($)'] = scaler.transform(df[['Income($)']])

scaler.fit(df[['Age']])
df['Age'] = scaler.transform(df[['Age']])

plt.scatter(df.Age,df['Income($)'])

km = KMeans(n_clusters=3)
y_predicted = km.fit_predict(df[['Age','Income($)']])

df['cluster'] = y_predicted
km.cluster_centers_

df1 = df[df.cluster==0]
df2 = df[df.cluster==1]

plt.scatter(df1.Age,df1['Income($)'],color='green')
plt.scatter(df2.Age,df2['Income($)'],color='red')
plt.scatter(df3.Age,df3['Income($)'],color='black')
plt.scatter(km.cluster_centers_[:,0],km.cluster_centers_[:,1],color='purple',marker='*',label='centroid')
plt.legend()
`.trim();

const elbo = `
sse = []
k_rng = range(1,10)
for k in k_rng:
    km = KMeans(n_clusters=k)
    km.fit(df[['Age','Income($)']])
    sse.append(km.inertia_)
    
plt.xlabel('K')
plt.ylabel('Sum of squared error')
plt.plot(k_rng,sse)
`.trim();

const cluster = `      %matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns; sns.set()
import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets.samples_generator import make_blobs
X, y_true = make_blobs(n_samples = 400, centers = 4, cluster_std = 0.60, random_state = 0)
plt.scatter(X[:, 0], X[:, 1], s = 20);
plt.show()
`.trim()

const cluster_2 = `kmeans = KMeans(n_clusters = 4)
kmeans.fit(X)
y_kmeans = kmeans.predict(X)
`.trim()

const cluster_3 = `plt.scatter(X[:, 0], X[:, 1], c = y_kmeans, s = 20, cmap = 'summer')
centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c = 'blue', s = 100, alpha = 0.9);
plt.show()
`.trim()

const cluster_4 = `%matplotlib inline
import matplotlib.pyplot as plt
import seaborn as sns; sns.set()
import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets import load_digits
digits = load_digits()
digits.data.shape
`.trim()


class K_Mean extends Component {
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
              <h3>Clustering With K Means</h3>
              K Means is an Unsuperwised Learning.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={kmeansClucs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Preprocessing using min max scaler</h3>
              <div style={titles}>
                <PrismCode
                  code={preprocessing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Elbow Plot</h3>
              <div style={titles}>
                <PrismCode
                  code={elbo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>K-Means clustering:</h3>
              K-means clustering algorithm computes the centroids and iterates until we it finds optimal centroid. It assumes that
              the number of clusters are already known. It is also called flat clustering algorithm. The number of clusters
              identified from data by algorithm is represented by ‘K’ in K-means.
              <br />
              <br />
              In this, the data points are assigned to a cluster in such a manner that the sum of the squared distance
              between the data points and centroid would be minimum. It is to be understood that less variation within the clusters
              will lead to more similar data points within same cluster.
              <br />
              <br />
              <b>Working of K-Means Algorithm: </b>
              <ul>
                <li>1. We need to specify the number of clusters, K, need to be generated by this algorithm.</li>
                <li>2. Randomly select K data points and assign each data point to a cluster. In simple words, classify the
                  data based on the number of data points.</li>
                <li>3. Now it will compute the cluster centroids.</li>
                <li>4. Keep iterating the following until we find optimal centroid which is the assignment of data points to
                  the clusters that are not changing any more</li>
                <ul>
                  <li>1. The sum of squared distance between data points and centroids would be computed.</li>
                  <li>2. Now, we have to assign each data point to the cluster that is closer than other cluster (centroid).</li>
                  <li>3. At last compute the centroids for the clusters by taking the average of all data points of that cluster.</li>
                </ul>
              </ul>
              <br />

              K-means follows Expectation-Maximization approach to solve the problem. The Expectation-step is used for assigning
              the data points to the closest cluster and the Maximization-step is used for computing the centroid of each cluster.
              <br />
              <br />
              While working with K-means algorithm we need to take care of the following things −
              <ul>
                <li>It is recommended to standardize the data because such
                  algorithms use distance-based measurement to determine the similarity between data points.</li>
                <li>Due to the iterative nature of K-Means and random initialization of centroids, K-Means may stick in a local optimum
                  and may not converge to global optimum. That is why it is recommended to use different initializations of centroids.</li>
              </ul>
              <br />
              <b>Ex.</b> We are going to first generate 2D dataset containing 4 different blobs and after that will apply k-means
              algorithm to see the result.

              <div style={titles}>
                <PrismCode
                  code={cluster}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <i>Next, make an object of KMeans along with providing number of clusters, train the model and do the prediction as
                follows −
              </i>
              <div style={titles}>
                <PrismCode
                  code={cluster_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Now, with the help of following code we can plot and visualize the cluster’s centers picked by k-means Python
              estimator −
              <br />
              from sklearn.datasets.samples_generator import make_blobs<br />
              X, y_true = make_blobs(n_samples = 400, centers = 4, cluster_std = 0.60, random_state = 0)
              <br />
              Next, the following code will help us to visualize the dataset −
              <div style={titles}>
                <PrismCode
                  code={cluster_3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Let us move to another example in which we are going to apply K-means clustering on simple digits dataset.
                K-means will try to identify similar digits without using the original label information.
              </h3>
              <div style={titles}>
                <PrismCode
                  code={cluster_4}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Advantages and Disadvantages:</h3>
              <b>Advantages:</b>
              <ul>
                <li>It is very easy to understand and implement.</li>
                <li>If we have large number of variables then, K-means would be faster than Hierarchical clustering.</li>
                <li>On re-computation of centroids, an instance can change the cluster.</li>
                <li>Tighter clusters are formed with K-means as compared to Hierarchical clustering</li>
              </ul>
              <br />

              <b>Disadvantages:</b>
              <ul>
                <li>It is a bit difficult to predict the number of clusters i.e. the value of k.</li>
                <li>Output is strongly impacted by initial inputs like number of clusters (value of k)
                  Order of data will have strong impact on the final output.</li>
                <li>It is very sensitive to rescaling. If we will rescale our data by means of normalization or standardization, then the
                  output will completely change.</li>
                <li>It is not good in doing clustering job if the clusters have a complicated geometric shape.</li>
              </ul>
              <br />

              <b>Applications:</b>
              To get a meaningful intuition from the data we are working with.
              Cluster-then-predict where different models will be built for different subgroups.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(K_Mean));
