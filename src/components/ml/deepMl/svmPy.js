import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Logistic from '../../../assets/ML/svms.PNG'
import svms2 from '../../../assets/ML/svm2.PNG'
import svms3 from '../../../assets/ML/svms3.PNG'
import svms4 from '../../../assets/ML/svm4.PNG'
import svms5 from '../../../assets/ML/svm5.PNG'
import svms6 from '../../../assets/ML/svm6.PNG'
import svms7 from '../../../assets/ML/svm7.PNG'


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

const machines = `
import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data,columns=iris.feature_names)

df['target'] = iris.target

df[df.target==1].head()
df[df.target==2].head()

df['flower_name'] =df.target.apply(lambda x: iris.target_names[x])
df[45:55]

df2 = df[:50]
df2
`.trim();

const sepal = `
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split 

plt.xlabel('Sepal Length')
plt.ylabel('Sepal Width')
plt.scatter(df0['sepal length (cm)'], df0['sepal width (cm)'],color="green",marker='+')
plt.scatter(df1['sepal length (cm)'], df1['sepal width (cm)'],color="blue",marker='.')

plt.xlabel('Petal Length')                                            #Petal length vs Pepal Width (Setosa vs Versicolor)
plt.ylabel('Petal Width')
plt.scatter(df0['petal length (cm)'], df0['petal width (cm)'],color="green",marker='+')
plt.scatter(df1['petal length (cm)'], df1['petal width (cm)'],color="blue",marker='.')

X = df.drop(['target','flower_name'], axis='columns')
y = df.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
len(X_train)

model = SVC()
model.fit(X_train, y_train)

model.score(X_test, y_test)
model.predict([[4.8,3.0,1.5,0.3]])
`.trim();

const Regularizations = `
model_C = SVC(C=1)
model_C.fit(X_train, y_train)
model_C.score(X_test, y_test)

model_C = SVC(C=10)
model_C.fit(X_train, y_train)
model_C.score(X_test, y_test)
`.trim();

const gammas = `
model_g = SVC(gamma=10)
model_g.fit(X_train, y_train)
model_g.score(X_test, y_test)
`.trim();

const kernel = `
model_linear_kernal = SVC(kernel='linear')
model_linear_kernal.fit(X_train, y_train)

model_linear_kernal.score(X_test, y_test)
`.trim();


class SvmPy extends Component {
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
              <h3>Support Vector Machine(SVM) (supervised machine learning algorithms)</h3>
              SVMs are powerful yet flexible ML algorithms which are used both for classification and regression. But generally, they are used in classification problems.
              <br />

              Lately, they are extremely popular because of their ability to handle multiple continuous and categorical variables.
              <br />
              <br />
              <b>Working of SVM: </b>
              An SVM model is basically a representation of different classes in a hyperplane in multidimensional space. The
              hyperplane will be generated in an iterative manner by SVM so that the error can be minimized.
              <br />
              The goal of SVM is to divide the datasets into classes to find a maximum marginal hyperplane (MMH).
              <br />
              <br />
              <i><b>The followings are important concepts in SVM − </b></i>
              <ul>
                <li><b>Support Vectors: </b>Datapoints that are closest to the hyperplane is called support vectors. Separating line
                  will be defined with the help of these data points.</li>
                <li><b>Hyperplane: </b>It is a decision plane or space which is divided
                  between a set of objects having different classes.</li>
                <li><b>Margin: </b>It may be defined as the gap between two lines on the
                  closet data points of different classes. It can be calculated as the perpendicular distance from the line to the
                  support vectors. Large margin is considered as a good margin and small margin is considered as a bad margin. The
                  main goal of SVM is to divide the datasets into classes to find a maximum marginal hyperplane (MMH) and it can be
                  done in the following two steps:</li>
                <ul>
                  <li>1. First, SVM will generate hyperplanes iteratively that segregates the classes in
                    best way. Then, it will choose the hyperplane that separates the classes correctly.</li>
                  <li>SVM Kernels SVM algorithm is
                    implemented with kernel that transforms an input data space into the required form. Kernel converts non-separable
                    problems into separable problems by adding more dimensions to it. It makes SVM more powerful, flexible and accurate.
                    The following are some of the types of kernels used by SVM. Linear Kernel It can be used as a dot product between
                    any two observations. The formula of linear kernel is −
                    <br />
                    <i><b>K(x,xi)=sum(x∗xi)</b></i>
                    <br />
                    From the above formula, we can
                    see that the product between two vectors 𝑥 & 𝑥𝑖 is the sum of the multiplication of each pair of input values.
                    <br />
                    <br />
                    Polynomial Kernel It is more generalized form of linear kernel and distinguish curved or nonlinear input space.
                    Following is the formula for polynomial kernel −<br />
                    <i><b>k(X,Xi)=1+sum(X∗Xi)^d</b></i>
                    <br />
                    <br />
                    Here d is the degree of polynomial, which we
                    need to specify manually in the learning algorithm.
                    <br />
                    <br />
                    <b>Radial Basis Function (RBF) Kernel: </b> RBF kernel, mostly used in SVM
                    classification, maps input space in indefinite dimensional space. Following formula explains it mathematically −
                    <br />
                    <i><b>K(x,xi)=exp(−gamma∗sum(x−xi^2)) </b></i></li>
                  <br />
                  Here, gamma ranges from 0 to 1. We need to manually specify it in the learning algorithm. A good default value of
                  gamma is 0.1. As we implemented SVM for linearly separable data, we can implement it in Python for the data that is
                  not linearly separable. It can be done by using kernels.
                  <br />
                  <br />
                  <b>Pros: </b>
                  SVM classifiers offers great accuracy and work well with high dimensional space. SVM classifiers basically use a
                  subset of training points hence in result uses very less memory.

                  <br />
                  <br />
                  <b>Cons: </b> of SVM classifiers They have high training time
                  hence in practice not suitable for large datasets. Another disadvantage is that SVM classifiers do not work well with
                  overlapping classes.
                </ul>
              </ul>
              <br />

              <h3>Support Vector Machine (Supervised)</h3>
              Used for both classification or regression challenges.
              <br />
              In the SVM algorithm, we plot each data item as a point in n-dimensional space (where n is a number of features we have)
              with the value of each feature being the value of a particular coordinate. Then, we perform classification by
              finding the hyper-plane that differentiates the two classes very well.
              <br />
              <img src={Logistic} alt="Equations" className="responsive" style={redesign} />
              <br />

              We got accustomed to the process of segregating the two classes with a hyper-plane. Now, “How can we identify the
              right hyper-plane?”.
              <br />
              <br />
              <ul>
                <li><b>Identify the right hyper-plane (Scenario-1): </b>We have three hyper-planes (A, B, and C).
                  Now, identify the right hyper-plane to classify stars and circles.</li>
                <br />
                <img src={svms2} alt="Equations" className="responsive" style={redesign} />
                <br />
                <i>Remember a thumb rule to identify the right hyper-plane: “Select the hyper-plane which segregates
                  the two classes better”. Here, hyper-plane B.</i>
                <br />
                <br />

                <li><b>Identify the right hyper-plane (Scenario-2): </b></li>
                <br />
                <img src={svms3} alt="Equations" className="responsive" style={redesign} />
                <br />
                <i>Here, maximizing the distances between nearest data point (either class) and hyper-plane will help us
                  to decide the right hyper-plane. This distance is called as Margin.</i>
                <br />
                <br />
                <i>Above, you can see that the margin for hyper-plane C is high as compared to both A and B. Hence,
                  we name the right hyper-plane as C. Another lightning reason for selecting the hyper-plane with
                  higher margin is robustness. If we select a hyper-plane having low margin then there is high chance
                  of miss-classification.</i>
                <br />
                <br />

                <li><b>Identify the right hyper-plane (Scenario-3): </b></li>
                <br />
                <img src={svms4} alt="Equations" className="responsive" style={redesign} />
                <br />
                <i>Some of you may have selected the hyper-plane B as it has higher margin compared to A. But, here
                  is the catch, SVM selects the hyper-plane which classifies the classes accurately prior to
                  maximizing margin. Here, hyper-plane B has a classification error and A has classified all
                  correctly. Therefore, the right hyper-plane is A.</i>
                <br />
                <br />

                <li><b>Can we classify two classes (Scenario-4): </b>We unable to segregate the two classes using a
                  straight line, as one of the stars lies in the territory of other(circle) class as an outlier. </li>
                <br />
                <img src={svms5} alt="Equations" className="responsive" style={redesign} />
                <br />
                <br />

                <li><b>Find the hyper-plane to segregate to classes (Scenario-5): </b></li>
                <br />
                <img src={svms6} alt="Equations" className="responsive" style={redesign} />
                SVM can solve this problem. Easily! It solves this problem by introducing additional feature. Here,
                we will add a new feature z=x^2+y^2. Now, let’s plot the data points on axis x and z.
                <br />
                <img src={svms7} alt="Equations" className="responsive" style={redesign} />
                <ul>
                  <li>All values for z would be positive always because z is the squared sum of both x and y.</li>
                  <li>In the original plot, red circles appear close to the origin of x and y axes, leading to
                    lower value of z and star relatively away from the origin result to higher value of z.</li>
                  <br />
                  In the SVM classifier, it is easy to have a linear hyper-plane between these two classes. But,
                  another burning question which arises is, should we need to add this feature manually to have a
                  hyper-plane. No, the SVM  algorithm has a technique called the kernel trick. The SVM kernel is a
                  function that takes low dimensional input space and transforms it to a higher dimensional space
                  i.e. it converts not separable problem to separable problem. It is mostly useful in non-linear
                  separation problem. Simply put, it does some extremely complex data transformations, then finds
                  out the process to separate the data based on the labels or outputs you’ve defined.
                </ul>
              </ul>
              <br />

              <h3>Example</h3>
              <div style={titles}>
                <PrismCode
                  code={machines}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Sepal length vs Sepal Width (Setosa vs Versicolor)</h3>
              <div style={titles}>
                <PrismCode
                  code={sepal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Tune parameters</h3>
              <b>1. Regularization (C)</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Regularizations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>2. Gamma</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={gammas}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>3. Kernel</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={kernel}
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

export default (withStyles(styles)(SvmPy));
