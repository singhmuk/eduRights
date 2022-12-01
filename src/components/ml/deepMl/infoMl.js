import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import ScatterPlot from '../../../assets/ML/image15.png'
import standard from '../../../assets/ML/standard-deviation.jpg'
import Covariance from '../../../assets/ML/Covariance-vs-Correlation.jpg'
import cousions from '../../../assets/ML/cousions.png'
import timeseries from '../../../assets/ML/timeseries.png'
import before from '../../../assets/ML/before_and_after.png'
import confusion from '../../../assets/ML/confusion.png'
import associative from '../../../assets/ML/associative.jpg'
import outliner from '../../../assets/ML/outliner.jpg'
import oversampling from '../../../assets/ML/oversampling.png'
import karnel from '../../../assets/ML/karnel.jpg'
import essamble from '../../../assets/ML/essamble.png'
import instance from '../../../assets/ML/instance.png'
import generatives from '../../../assets/ML/generatives.png'
import silhotte from '../../../assets/ML/silhotte.png'
import gini from '../../../assets/ML/gini.png'
import pvalues from '../../../assets/ML/pvalues.png'
import pruning from '../../../assets/ML/pruning.png'
import underfit from '../../../assets/ML/underfit.png'


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


class InfoML extends Component {
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
              <h3>1. Machine Learning?</h3>
              <b>Steps</b>
              <ul>
                <li>Import the data</li>
                <li>Clean the data</li>
                <li>Split the Data into training/ test Sets</li>
                <li>Create a model</li>
                <li>Train the model</li>
                <li>Make Predictions</li>
                <li>Evaluate and Improve</li>
              </ul>
              <br />

              <h3>2. Importance of Data Feature Selection</h3>
              <ul>
                <li>Performing feature selection before data modeling will reduce the overfitting.</li>
                <li>Increases the accuracy of ML model.</li>
                <li>Reduce the training time Univariate Selection Recursive Feature Elimination.</li>
              </ul>
              <br />

              <b>Recursive feature elimination(RFE): </b>
              Removes the attributes recursively and builds the model with remaining attributes.
              <ul>
                <li>Implement RFE with scikit-learn Python library.</li>
              </ul>
              <br />
              <br />
              <b>Principal Component Analysis (PCA) (feature selection technique): </b>
              PCA generally called data reduction technique, as it uses linear algebra to
              transform the dataset into a compressed form.
              <ul>
                <li>Implement PCA with scikit-learn Python library.</li>
              </ul>
              <br />
              <br />
              <b>Feature Importance: </b>
              Used to choose the importance features. It basically uses a trained supervised classifier to select features.
              <ul>
                <li>Implement with ExtraTreeClassifier class of scikit-learn Python library.</li>
              </ul>
              <br />

              <h3>3. Data Types:</h3>
              Numerical data can be split into two numerical categories:
              <ul>
                <li><b>1.Discrete Data -</b> numbers that are limited to integers.</li>
                <b>Ex.</b> The number of cars passing by.
                <br />
                <br />

                <li><b>2.Continuous Data -</b> numbers that are of infinite value.</li>
                <b>Ex.</b> The price of an item, or the size of an item.
                <br />
                Categorical data are values that cannot be measured up against each other, a color value, or any yes/ no values.
                <br />
                <br />
                <li>Ordinal data are like categorical data, but can be measured up against each other.
                  <br />
                  <b> Ex.</b> school grades where A is better than B and so on.</li>
              </ul>
              <br />

              <ul>
                <li><b>Mean: </b>The average value.</li>
                <li><b>Median: </b>The mid point value.</li>
                <li><b>Mode: </b>The most common value.</li>
              </ul>
              <br />

              <h3>4. Standard Deviation</h3>
              <img src={standard} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              Standard deviation is a number that describes how spread out the values are.
              <ul>
                <li>A low standard deviation means that most of the numbers are close to the mean value.</li>
                <li>A high standard deviation means that the values are spread out over a wider range.</li>
              </ul>
              <br />

              <b>Variance: </b> Is a number that indicates how spread out the values are.<br />
              <ul>
                <li><b>Standard deviation: </b>Is square root of the variance.</li>
                <li><b>Variance: </b>Multiply the standard deviation by itself.</li>
              </ul>
              <br />

              <h3>5. Data Distribution</h3>
              To create big data sets for testing, we use NumPy, which comes with a number of methods to create
              random data sets, of any size.
              <ul>
                <li><b>Histogram: </b> To visualize the data set we can draw a histogram with the data we collected.</li>
                <ul>
                  <li>Histogram is frequency distribussion</li>
                </ul>
                <li><b>Scatter: </b> Plot a diagram where each value in the data set is represented by a dot.</li>
              </ul>
              <br />

              <h3>6. Scale</h3>
              When data has different values, and even different measurement units, it can be difficult to compare them. What
              is kilograms compared to meters? Or altitude compared to time? We can scale data into new values that are easier to compare.
              <br />

              <h3>8. Explain the terms AI, ML and Deep Learning</h3>
              AI is the domain of producing intelligent machines. ML refers to systems that
              can assimilate from experience (training data) and DL states to systems that learn from
              experience on large data sets. ML can be considered as a subset of AI. DL is ML but
              useful to large data sets.
              <br />
              <br />
              <b>In summary, DL is a subset of ML & both were the subsets of AI.</b>
              <br />

              <h3>9. What are the different types of Learning/ Training models in ML?</h3>
              ML algorithms can be primarily classified depending on the presence/ absence of target variables.
              <br />
              <b>1. Supervised learning: (Target is present)</b>
              <ul>
                <li>The machine learns using labelled data. The model is trained on an existing data set before it starts making decisions with the new data.</li>
                <li><b>Target variable is continuous: </b>Linear Regression, polynomial Regression, quadratic Regression.</li>
                <li><b>Target variable is categorical: </b>Logistic regression, Naive Bayes, KNN, SVM, Decision Tree, Gradient Boosting, ADA boosting, Bagging, Random forest etc.</li>
              </ul>
              <br />

              <b>2. Unsupervised learning: (Target is absent)</b>
              <br />
              The machine is trained on unlabelled data and without any proper guidance. It automatically infers
              patterns and relationships in the data by creating clusters. The model learns through observations and
              deduced structures in the data.
              <br />
              <br />
              <b>3. Reinforcement Learning:</b>
              The model learns through a trial and error method. This kind of learning involves an agent that will interact
              with the environment to create actions and then discover errors/ rewards of that action.
              <br />

              <h3>10. What is the difference between deep learning and machine learning?</h3>
              ML involves algorithms that learn from patterns of data and then apply it to decision making. DL is able to learn through processing
              data on its own and is quite similar to the human brain where it identifies something, analyse it, and makes a decision.
              <br />
              <br />
              <b>The key differences are as follow:</b>
              <ul>
                <li>The manner in which data is presented to the system.</li>
                <li>ML algorithms always require structured data and deep learning networks rely on layers of artificial neural networks.</li>
              </ul>
              <br />

              <h3>11. How do you select important variables while working on a data set? </h3>
              <ul>
                <li>Identify and discard correlated variables before finalizing on important variables.</li>
                <li>The variables could be selected based on ‘p’ values from Linear Regression.</li>
                <li>Forward, Backward, and Stepwise selection.</li>
                <li>Lasso Regression.</li>
                <li>Random Forest and plot variable chart.</li>
                <li>Top features can be selected based on information gain for the available set of features.</li>
              </ul>
              <br />

              <h3>12. There are many ML algorithms till now. If given a data set, how can one determine which algorithm to be used for that?</h3>
              ML algorithm to be used purely depends on the type of data in a given dataset. If data is linear then,
              we use linear regression. If data shows non-linearity then, the bagging algorithm would do better. If
              the data is to be analyzed/ interpreted for some business purposes then we can use decision trees or SVM.
              If the dataset consists of images, videos, audios then, neural networks would be helpful to get the
              solution accurately.
              <br />
              <br />
              So, there is no certain metric to decide which algorithm to be used for a given situation.
              We need to explore the data using EDA (Exploratory Data Analysis) and understand the purpose of using the
              dataset to come up with the best fit algorithm.
              <br />
              <br />
              <br />
              <img src={ScatterPlot} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />

              <h3>13. How are covariance and correlation different from one another?</h3>
              <img src={Covariance} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li><b>Covariance: </b>Measures how two variables are related to each other and how one would vary w.r.t.
                  changes in the other variable.</li>
                <ul>
                  <li> If the value is positive it means there is a direct relationship
                    between the variables and one would increase/ decrease with an increase/ decrease in the base
                    variable respectively, when all other conditions remain constant.</li>
                </ul>
                <br />
                <li><b>Correlation: </b>quantifies the relationship between two random variables and has only three specific
                  values, 1, 0, and -1.</li>
                <ul>
                  <li>1 denotes a positive relationship, -1 denotes a negative relationship, and 0 denotes two
                    variables are independent of each other.</li>
                </ul>
              </ul>
              <br />

              <h3>14. State the differences between causality and correlation.</h3>
              <img src={cousions} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li><b>Causality: </b>Applies to situations where one action(X), causes an outcome on other(Y).</li>
                <li><b>Correlation: </b>Just relating one action(X) to another action(Y) but X does not necessarily cause Y.</li>
              </ul>
              <br />

              <h3>15. We look at ML s/w almost all the time. How do we apply ML to Hardware.</h3>
              We have to build ML algorithms in System Verilog which is a Hardware development Language and then
              program it onto an <b>FPGA</b> to apply ML to hardware.
              <br />

              <h3>16. When does regularization come into play in ML.</h3>
              At times when the model begins to underfit/ overfit, regularization becomes necessary. It is a
              regression that diverts/ regularizes the coefficient estimates towards zero. It reduces flexibility
              and discourages learning in a model to avoid the risk of overfitting. The model complexity is reduced
              and it becomes better at predicting.
              <br />

              <h3>17. A data set is given to you and it has missing values which spread along 1standard deviation from the mean. How much of the data would remain untouched.</h3>
              The data is spread across mean so data is spread across an average. So, we can presume that it is a normal distribution.
              <br />
              In a normal distribution, about 68% of data lies in 1standard deviation from averages like mean, mode or median. So, about 32% of the
              data remains uninfluenced by missing values.
              <br />

              <h3>18. A data set is given to you about utilities fraud detection. You have built a classifier model and achieved a performance score
                of 98.5%. Is this a goodmodel? If yes, justify. If not, what can you do about it.</h3>
              Data set about utilities fraud detection is not balanced enough i.e. imbalanced. In such a data set, accuracy score cannot be the measure
              of performance as it may only be predict the majority class label correctly but in this case our point of interest is to predict the minority
              label. But often minorities are treated as noise and ignored. So, there is a high probability of misclassification of the minority label as
              compared to the majority label.
              <br />
              <br />
              For evaluating the model performance in case of imbalanced data sets, we should use Sensitivity
              (True Positive rate) or Specificity (True Negative rate) to determine class label wise performance of the classification model. If the minority
              class label’s performance is not so good, we could do the following:
              <br />
              <br />
              <ul>
                <li>We can use under sampling/ over sampling to balance the data.</li>
                <li>We can change the prediction threshold value.</li>
                <li>We can assign weights to labels such that the minority class labels get larger weights.</li>
                <li>We could detect anomalies.</li>
              </ul>
              <br />

              <h3>19. What is Time series.</h3>
              <img src={timeseries} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li>A Time series is a sequence of numerical data points in successive order.</li>
                <li>It tracks the movement of the chosen data points, over a specified period of time and records the data points at regular intervals.</li>
                <li>Time series doesn’t require any minimum/ maximum time input. Analysts often use Time series to examine
                  data according to their specific requirement.</li>
              </ul>
              <br />

              <h3>20. What is a Box-Cox transformation.</h3>
              <img src={before} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              It transforms non-normal dependent variables into normal
              variables as normality is the most common assumption made while using many statistical techniques.
              <br />
              It has a lambda parameter which when set to 0 implies that this transform is equivalent to log-transform. It is
              used for variance stabilization and also to normalize the distribution.
              <br />

              <h3>21. What is the difference between stochastic gradient descent (SGD) and gradient descent (GD).</h3>
              <ul>
                <li>Both algorithms use to find the set of parameters that will minimize a loss function.</li>
                <li><b>Gradient Descend: </b>All training samples are evaluated for each set of parameters</li>
                <li><b>SGD: </b>Only one training sample is evaluated for the set of parameters identified.</li>
              </ul>
              <br />

              <h3>22. What is a confusion matrix (or error matrix) and why do you need it.</h3>
              <img src={confusion} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li>Confusion matrix is a table that is frequently used to illustrate the
                  performance of a classification model i.e. classifier on a set of test data for which the true
                  values are well-known.</li>
                <li>It allows us to visualize the performance of an algorithm/ model. It allows us to easily identify
                  the confusion between different classes. It is used as a performance measure of a model/ algorithm.</li>
                <li>A confusion matrix is known as a summary of predictions on a classification model. The number of
                  right and wrong predictions were summarized with count values and broken down by each class label.
                  It gives us information about the errors made through the classifier and also the types of errors
                  made by a classifier.</li>
              </ul>
              <br />

              <h3>23. What’s a Fourier transform.</h3>
              <ul>
                <li>It is a mathematical technique that transforms any function of time to a function of
                  frequency. Fourier transform is closely related to Fourier series. It takes any time-based pattern for
                  input and calculates the overall cycle offset, rotation speed and strength for all possible cycles.</li>
                <li>Fourier transform is best applied to waveforms since it has functions of time and space. Once a Fourier
                  transform applied on a waveform, it gets decomposed into a sinusoid.</li>
              </ul>
              <br />

              <h3>24. What do you mean by Associative Rule Mining (ARM).</h3>
              <img src={associative} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              It's a techniques to discover patterns in data like features which occur
              together and features (dimensions) which are correlated. It is mostly used in Market-based Analysis to
              find how frequently an itemset occurs in a transaction. Association rules have to satisfy minimum support
              and minimum confidence at the very same time. Association rule generation generally comprised of two
              different steps:
              <br />
              <br />
              <ul>
                <li>A <b>min support threshold</b> is given to obtain all frequent item-sets in a DB.</li>
                <li>A <b>min confidence constraint</b> is given to these frequent item-sets in order to form the association
                  rules.</li>
              </ul>
              <br />
              <i>
                <ul>
                  <li><b>Support: </b>Is a measure of how often the “item set” appears in the data set.</li>
                  <li><b>Confidence: </b>Is a measure of how often a particular rule has been found to be true.</li>
                </ul>
              </i>
              <br />

              <h3>25. Explain the phrase “Curse of Dimensionality.</h3>
              The Curse of Dimensionality refers to the situation when our data has too many features.
              <br />
              <br />
              The phrase is used to express the difficulty of using brute force or grid search to optimize a function
              with too many inputs.
              <br />
              <br />
              It can also refer to several other issues like:
              <ul>
                <li>If we have more features than observations, we have a risk of overfitting the model.</li>
                <li>When we have too many features, observations become harder to cluster. Too many dimensions cause
                  every observation in the dataset to appear equidistant from all others and no meaningful clusters can
                  be formed.</li>
              </ul>
              <i>Dimensionality reduction techniques like PCA come to the rescue in such cases.</i>
              <br />

              <h3>26. Why is rotation of components so important in PCA.</h3>
              <ul>
                <li>Rotation in PCA maximizes the separation within the variance obtained by all
                  the components because of which interpretation of components would become easier.</li>
                <li>If the components are not rotated, then we need extended components to describe variance of the components.</li>
              </ul>
              <br />

              <h3>27. What are outliers? Mention three methods to deal with outliers.</h3>
              <img src={outliner} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              A data point that is considerably distant from the other similar data points is known as an outlier.
              <br />
              They may occur due to experimental errors or variability in measurement. They are problematic and can mislead a
              training process, which eventually results in longer training time, inaccurate models, and poor results.
              <br />
              <br />
              The three methods to deal with outliers are:
              <ul>
                <li><b>Univariate method: </b>Looks for data points having extreme values on a single variable.</li>
                <li><b>Multivariate method: </b>Looks for unusual combinations on all the variables</li>
                <li><b>Minkowski error: </b>Reduces the contribution of potential outliers in the training process.</li>
              </ul>
              <br />

              <h3>28. What is the difference between regularization and normalisation.</h3>
              <ul>
                <li><b>Normalisation: </b>Adjusts the data</li>
                <li><b>Regularisation: </b>Adjusts the prediction function.</li>
              </ul>
              <br />
              If our data is on very
              different scales (especially low to high), you would want to normalise the data. Alter each column to
              have compatible basic statistics. This can be helpful to make sure there is no loss of accuracy. One of
              the goals of model training is to identify the signal and ignore the noise if the model is given free
              rein to minimize error, there is a possibility of suffering from overfitting. Regularization
              control this by providing simpler fitting functions over complex ones.
              <br />

              <h3>29. Explain the difference between Normalization and Standardization.</h3>
              Both used for feature scaling.
              <ul>
                <li>Normalization refers to re-scaling the values to fit into a range of [0,1].</li>
                <li>Standardization refers to re-scaling data to have a mean of 0 and a standard deviation of 1 (Unit variance).</li>
                <li>Normalization is useful when all parameters need to have the identical positive scale however the outliers from the data
                  set are lost. Hence, standardization is recommended for most applications.</li>
              </ul>
              <br />

              <h3>30. List the most popular distribution curves along with scenarios where you will use them in an algorithm.</h3>
              The most popular distribution curves are.
              <ul>
                <li>Bernoulli Distribution</li>
                <li>Uniform Distribution</li>
                <li>Binomial Distribution</li>
                <li>Normal Distribution</li>
                <li>Poisson Distribution</li>
                <li>and Exponential Distribution.</li>
              </ul>
              <br />
              Each of these distribution curves is used in various scenarios.
              <br />
              <br />
              Bernoulli Distribution can be used to check if a team will win a championship/ not, a newborn child
              is either male/ female, you either pass an exam/ not, etc.
              <br />
              <ul>
                <li><b>Uniform distribution: </b>is a probability distribution that has a constant probability.
                </li>
                <ul><li><b> Ex. </b>Rolling a single dice.</li></ul>
                <br />
                <li><b>Binomial distribution: </b>is a probability with only two possible outcomes, the prefix ‘bi’
                  means twice. </li>
                <ul><li><b>Ex. </b>coin toss.</li></ul>
                <br />
                <li><b>Normal distribution: </b>describes how the values of a variable are distributed. It is
                  typically a symmetric distribution where most of the observations cluster around the central peak.
                  The values further away from the mean taper off equally in both directions.
                </li>
                <ul><li><b>Ex. </b>Height of students in a classroom.</li></ul>
                <br />
                <li><b>Poisson distribution: </b>Helps predict the probability of certain events
                  happening when you know how often that event has occurred. It can be used by businessmen to make
                  forecasts about the number of customers on certain days and allows them to adjust supply according to
                  the demand.</li>
                <br />
                <li><b>Exponential distribution: </b>is concerned with the amount of time until a specific event occurs.
                </li>
                <ul><li><b>Ex. </b>How long a car battery would last, in months.</li></ul>
              </ul>
              <br />

              <h3>31. What is target imbalance? How do we fix it? A scenario where you have performed target imbalance on data. Which metrics and algorithms do you find suitable to input this data onto.</h3>
              <img src={oversampling} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              If we have categorical variables as the target when we cluster them together or perform a frequency
              count on them if there are certain categories which are more in number as compared to others by a very
              significant number. This is known as the target imbalance.
              <br />
              <br />
              <b>Ex. </b> Target column – 0,0,0,1,0,2,0,0,1,1 [0s: 60%, 1: 30%, 2:10%] 0 are in majority.
              <br />
              To fix this, we can perform up-sampling/ down-sampling. Before fixing this problem let’s assume that the
              performance metrics used was confusion metrics. After fixing this problem we can shift the metric
              system to AUC: ROC. Since we added/ deleted data (up sampling or down sampling), we can go ahead with a
              stricter algorithm like SVM, Gradient boosting or ADA boosting.
              <br />

              <h3>32. When does the linear regression line stop rotating or finds an optimal spot where it is fitted on data.</h3>
              <ul>
                <li>A place where the highest RSquared value is found, at this place line comes to rest.</li>
                <li>RSquared represents the amount of variance captured by the virtual linear regression line w.r.t
                  total variance captured by the dataset.</li>
              </ul>
              <br />

              <h3>33. What are Kernels in SVM? List popular kernels used in SVM along with a scenario of their applications.</h3>
              The function of kernel is to take data as input and transform it into the required form.
              <br />
              Popular Kernels used in SVM are as follows:
              <ul>
                <li>RBF</li>
                <li>Linear</li>
                <li>Sigmoid</li>
                <li>Polynomial</li>
                <li>Hyperbolic</li>
                <li>Laplace, etc.</li>
              </ul>
              <br />

              <h3>34. What is Kernel Trick in an SVM Algorithm.</h3>
              <img src={karnel} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              Kernel Trick is a mathematical function which applied on data points, we can find the region of
              classification between two different classes. Based on the choice of function, be it linear or radial,
              which purely depends upon the distribution of data, one can build a classifier.
              <br />

              <h3>35. What are ensemble models? Explain how ensemble techniques yield better learning as compared to traditional classification ML algorithms.</h3>
              <img src={essamble} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li>Ensemble is a group of models that are used together for prediction both in classification and regression class.</li>
                <li>Ensemble learning helps improve ML results because it combines several models. By
                  doing so, it allows a better predictive performance compared to a single model.</li>
                <li>They are superior to individual models as they reduce variance, average out biases, and have lesser
                  chances of overfitting.</li>
              </ul>
              <br />

              <h3>36. What is OOB error and how does it occur.</h3>
              For each bootstrap sample, there is one-third of data that was not used in the creation of the tree,
              i.e., it was out of the sample. This data is referred to as out of bag data.
              <br />
              In order to get an
              unbiased measure of the accuracy of the model over test data, out of bag error is used. The out of bag
              data is passed for each tree is passed through that tree and the outputs are aggregated to give out of bag error.
              This percentage error is quite effective in estimating the error in the testing set and does not require further
              cross-validation.
              <br />

              <h3>37. Why boosting is a more stable algorithm as compared to other ensemble algorithms.</h3>
              Boosting focuses on errors found in previous iterations until they become obsolete. Whereas in bagging
              there is no corrective loop.
              <br />

              <h3>38. List popular cross validation techniques.</h3>
              Six types.
              <ul>
                <li>K fold</li>
                <li>Stratified k fold</li>
                <li>Leave one out</li>
                <li>Bootstrapping</li>
                <li>Random search cv</li>
                <li>Grid search cv</li>
              </ul>
              <br />

              <h3>39. Is it possible to test for the probability of improving model accuracy without cross-validation techniques? If yes, please explain.</h3>
              Yes, We can do so by running the ML model for n number of iterations, recording the accuracy.
              Plot all the accuracies and remove the 5% of low probability values. Measure the left (low) cut off and
              right (high) cut off. With the remaining 95% confidence, we can say that the model can go as low or as
              high.
              <br />

              <h3>40. Explain the term instance-based learning.</h3>
              <img src={instance} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              Instance Based Learning is a set of procedures for regression and classification which produce a class
              label prediction based on resemblance to its nearest neighbors in the training data set. These algorithms
              just collects all the data and get an answer when required.
              <br />
              <br />
              In simple words they are a set of procedures for solving new problems based on the solutions of already solved problems in the past
              which are similar to the current problem.
              <br />

              <h3>41. Explain the difference between Lasso and Ridge.</h3>
              Lasso(L1) and Ridge(L2) are the regularization techniques where we penalize the coefficients to find
              the optimum solution.
              <ul>
                <li><b>Ridge(L2): </b>The penalty function is defined by the sum of the squares of the coefficients</li>
                <li><b>Lasso(L1): </b>Penalize the sum of the absolute values of the coefficients.</li>
                <li><b>ElasticNet: </b>Hybrid penalizing function of both lasso and ridge.</li>
              </ul>
              <br />

              <h3>42. What’s the difference between probability and likelihood.</h3>
              <ul>
                <li><b>Probability: </b>Is the measure of the likelihood that an event will occur that is, what is the certainty
                  that a specific event will occur?.</li>
                <li><b>Likelihood: </b>Function is a function of parameters within the
                  parameter space that describes the probability of obtaining the observed data.</li>
              </ul>
              <br />
              So Probability attaches to possible results while, likelihood attaches to hypotheses.
              <br />

              <h3>43. Why would you Prune your tree.</h3>
              Pruning refers to the process of reducing redundant branches of
              a decision tree. Decision Trees are prone to overfitting, pruning the tree helps to reduce the size and
              minimizes the chances of overfitting.
              <br />
              Pruning involves turning branches of a decision tree into leaf
              nodes and removing the leaf nodes from the original branch. It serves as a tool to perform the tradeoff.
              <br />

              <h3>44. Model accuracy or Model performance? Which one will you prefer and why.</h3>
              This is a trick question, one should first get a clear idea, what is Model Performance? If Performance
              means speed, then it depends upon the nature of the application, any application related to the
              real-time scenario will need high speed as an important feature. <b>Ex. </b>The best of Search Results
              will lose its virtue if the Query results do not appear fast.
              <br />
              <br />
              If Performance is hinted at Why Accuracy is not the most important virtue – For any imbalanced data set,
              more than Accuracy, it will be an F1 score than will explain the business case and in case data is
              imbalanced, then Precision and Recall will be more important than rest.
              <br />

              <h3>45. List the advantages and limitations of the Temporal Difference Learning Method.</h3>
              Temporal Difference Learning Method is a mix of Monte Carlo method and Dynamic programming method. Some of
              the advantages of this method include:
              <ul>
                <li>It can learn in every step online/ offline.</li>
                <li>It can learn from a sequence which is not complete as well.</li>
                <li>It can work in continuous environments.</li>
                <li>It has lower variance compared to MC method and is more efficient than MC method.</li>
              </ul>
              <br />
              <b>Limitations:</b>
              <ul>
                <li>It is a biased estimation.</li>
                <li>It is more sensitive to initialization.</li>
              </ul>
              <br />

              <h3>46. Mention why feature engineering is important in model building and list out some of the techniques used for feature engineering.</h3>
              Algorithms necessitate features with some specific characteristics to work appropriately. The data is
              initially in a raw form. You need to extract features from this data before supplying it to the
              algorithm. This process is called feature engineering.
              <br />
              When you have relevant features, the complexity
              of the algorithms reduces. Then, even if a non-ideal algorithm is used, results come out to be accurate.
              <br />
              <br />
              <b>Feature engineering primarily has two goals:</b>
              <ul>
                <li>Prepare the suitable input data set to be compatible with the ML algorithm constraints.</li>
                <li>Enhance the performance of ML models.</li>
              </ul>
              <br />
              <i>Some of the techniques used for feature engineering include Imputation, Binning, Outliers Handling, Log transform, grouping operations, One-Hot encoding, Feature split, Scaling, Extracting date.</i>
              <br />

              <h3>47. What is the significance of Gamma and Regularization in SVM.</h3>
              The gamma defines influence. Low values meaning ‘far’ and high values meaning ‘close’.
              <ul>
                <li>If gamma is too large, the radius of the area of influence of the support vectors only includes the support vector itself
                  and no amount of regularization with C will be able to prevent overfitting.  </li>
                <li>If gamma is very small, the model is too constrained and cannot capture the complexity of the data.</li>
              </ul>
              <br />
              The regularization parameter (lambda) serves as a degree of importance that is given to
              miss-classifications. This can be used to draw the tradeoff with OverFitting.
              <br />

              <h3>48. What is the difference between a generative and discriminative model.</h3>
              <img src={generatives} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li>A generative model learns the different categories of data.</li>
                <li>Discriminative model will only learn the distinctions between different categories of data.</li>
                <li>Discriminative models perform much better than the generative models when it comes to classification tasks.</li>
              </ul>
              <br />

              <h3>49. Explain Eigenvectors and Eigenvalues.</h3>
              <ul>
                <li>Linear transformations are helpful to understand using eigenvectors. Eigenvectors usa in the
                  creation of covariance and correlation matrices in data science.</li>
                <li>Simply put, eigenvectors are directional entities along which linear transformation features like
                  compression, flip etc. can be applied.</li>
                <br />

                <li>Eigenvalues are the magnitude of the linear transformation features along each direction of an Eigenvector.</li>
              </ul>
              <br />

              <h3>50. How would you define the number of clusters in a clustering algorithm.</h3>
              <img src={silhotte} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              Number of clusters determined by finding the <b>silhouette score</b>.
              <br />
              Silhouette score helps us determine the number of cluster centres to cluster our data along.
              <br />
              <br />
              Another technique is the elbow method.
              <br />

              <h3>51. What is the default method of splitting in decision trees</h3>
              Gini Index.
              <br />
              <img src={gini} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />

              <h3>52. How is p-value useful.</h3>
              <ul>
                <li>The p-value gives the probability of the null hypothesis is true.</li>
                <li>It gives us the statistical significance of our results.</li>
              </ul>
              <img src={pvalues} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              In other words, p-value determines the confidence of a model in a
              particular o/p.
              <br />

              <h3>53. Can logistic regression be used for classes more than 2.</h3>
              No, Becouse it's a binary classifier.
              <br />
              For multi-class classification algorithms like Decision Trees, Naïve Bayes’ Classifiers are better suited.
              <br />

              <h3>54. What are the hyperparameters of a logistic regression model.</h3>
              The trainable hyperparameters of a Logistic Regression Classifier are.
              <ul>
                <li>Classifier penalty</li>
                <li>Classifier solver</li>
                <li>Classifier C</li>
              </ul>
              <br />
              These can be specified exclusively with values in Grid Search to hyper tune a
              Logistic Classifier.
              <br />

              <h3>55. What is a pipeline.</h3>
              A pipeline is a sophisticated way of writing s/w such that each intended action while building a
              model can be serialized and the process calls the individual functions for the individual tasks. The
              tasks are carried out in sequence for a given sequence of data points and the entire process can be run
              onto n threads by use of composite estimators in scikit learn.
              <br />

              <h3>56. What are the benefits of pruning.</h3>
              <img src={pruning} alt="ScatterPlot" className="responsive" style={redesign} />
              <ul>
                <li>Reduces overfitting.</li>
                <li>Shortens the size of the tree.</li>
                <li>Reduces complexity of the model.</li>
                <li>Increases bias.</li>
              </ul>
              <br />

              <h3>57. What is the 68 per cent rule in normal distribution.</h3>
              The normal distribution is a bell-shaped curve. Most of the data points are around the median. Hence
              approximately 68 per cent of the data is around the median. Since there is no skewness and its
              bell-shaped.
              <br />

              <h3>58. What is a chi-square test.</h3>
              <ul>
                <li>A chi-square determines if a sample data matches a population.</li>
                <li>A chi-square test for independence compares two variables in a contingency table to see if they
                  are related.</li>
                <li>A very small chi-square test statistics implies observed data fits the expected data extremely
                  well.</li>
              </ul>
              <br />

              <h3>59. What is a random variable.</h3>
              A Random Variable is a set of possible values from a random experiment.
              <br />
              <b>Ex. </b> Tossing a coin, Rolling of a dice.
              <br />

              <h3>60. What is the degree of freedom.</h3>
              It is the number of independent values/ quantities which can be assigned to a statistical
              distribution. It is used in Hypothesis testing and chi-square test.
              <br />

              <h3>61. What’s the difference between Type I and Type II error.</h3>
              Type I and Type II error in ML refers to false values.
              <ul>
                <li><b>Type I: </b>Is equivalent to a False positive. In Type I error, a hypothesis which ought to
                  be accepted doesn’t get accepted.</li>
                <li><b>Type II: </b>Is equivalent to a False negative. In Type II error, the hypothesis gets rejected which
                  should have been accepted in the first place.</li>
              </ul>
              <br />

              <h3>62. What do you understand by selection bias in ML.</h3>
              Selection bias stands for the bias which was introduced by the selection of individuals, groups or data
              for doing analysis in a way that the proper randomization is not achieved. It ensures that the sample
              obtained is not representative of the population intended to be analyzed and sometimes it is referred to
              as the selection effect. This is the part of distortion of a statistical analysis which results from the
              method of collecting samples.
              <br />
              <br />
              If you don’t take the selection bias into the account then some conclusions of the study may not be accurate.
              <br />
              <br />

              <b>The types of selection bias includes:</b>
              <ul>
                <li><b>Sampling bias: </b>It is a systematic error due to a non-random sample of a population causing
                  some members of the population to be less likely to be included than others resulting in a biased
                  sample.</li>
                <br />

                <li><b>Time interval: </b>A trial may be terminated early at an extreme value (often for ethical
                  reasons), but the extreme value is likely to be reached by the variable with the largest variance, even
                  if all variables have a similar mean.</li>
                <br />

                <li><b>Data: </b>When specific subsets of data are chosen to support a conclusion/ rejection of bad data
                  on arbitrary grounds, instead of according to previously stated or generally agreed criteria.</li>
                <br />

                <li><b>Attrition: </b>Attrition bias is a kind of selection bias caused by attrition (loss of participants)
                  discounting trial subjects/ tests that did not run to completion.</li>
              </ul>
              <br />

              <h3>63. ML</h3>
              <ul>
                <li>ML is about extracting knowledge from data. It is a research field at the
                  intersection of statistics, artificial intelligence, and computer science and is also
                  known as predictive analytics or statistical learning. </li>
                <li>From automatic recommendations of which movies to watch, to what food to order or which
                  products to buy, to personalized online radio and recognizing your friends in your
                  photos, many modern websites and devices have ML algorithms at their
                  core. </li>
                <li>complex website like Facebook, Amazon, or Netflix, it is
                  very likely that every part of the site contains multiple ML models.</li>
              </ul>
              <br />
              <br />
              <b>Using handcoded rules to make decisions has two major disadvantages.</b>
              <ul>
                <li>The logic required to make a decision is specific to a single domain and task.
                  Changing the task even slightly might require a rewrite of the whole system.</li>
                <li>Designing rules requires a deep understanding of how a decision should be made
                  by a human expert.</li>
              </ul>
              <br />
              <b>Ex. </b>handcoded approach will fail is in detecting faces in images.

              <br />
              <h3>1.Supervised learning</h3>
              <ul>
                <li>User provides the algorithm with pairs of i/p and desired o/p, and the algorithm finds a way to produce the desired
                  o/p given an i/p. In particular, the algorithm is able to create an o/p for an i/p it has never seen before without
                  any help from a human. </li>
                <li>ML algorithms that learn from I/O pairs are called supervised learning algorithms.</li>
                <li>Our goal is to make accurate predictions for new, never-before-seen data.</li>
                <li>Supervised learning often requires human effort to build the training set, but afterward
                  automates.</li>
              </ul>
              <br />
              <b>Ex. </b>Identifying the zip code from handwritten digits on an envelope, Determining whether a tumor
              is benign based on a medical image.
              <br />
              <br />
              <b>Supervised learning algorithms: </b>
              <ul>
                <li>Neural networks</li>
                <li>Naive Bayes</li>
                <li>Linear regression</li>
                <li>Logistic regression</li>
                <li>Support vector machine (SVM)</li>
                <li>K-nearest neighbor</li>
                <li>Random forest</li>
              </ul>
              <br />
              <br />

              <b>Two major types of supervised machine learning problems, classification and regression.</b>
              <ul>
                <li><b>Classification: </b>The goal is to predict a class label, which is a choice from a predefined
                  list of possibilities. </li>
                <b>Ex. </b>classifying irises into one of three possible species.
                <br />
                Classifying emails as either spam/ not spam is an example of a binary classification problem.
                <br />
                <br />

                <li><b>Regression: </b>Goal is to predict a continuous number, or a floating-point number in programming terms.</li>
                <b>Ex. </b>Predicting a
                person’s annual income from their education, age, and address.
              </ul>
              <br />

              <h3>Generalization, Overfitting, and Underfitting</h3>
              <img src={underfit} alt="ScatterPlot" className="responsive" style={redesign} />
              <br />
              <b>Generalization: </b>
              <br />
              If a model is able to make accurate predictions on
              unseen data, we say it is able to generalize from the training set to the test set.
              <br />

              <h3>When to use each model</h3>
              <ul>
                <li><b>KNN: </b>For small datasets, good as a baseline, easy to explain.</li>
                <br />
                <li><b>Linear models: </b>Good for very large datasets, good for very high-dimensional data.</li>
                <br />
                <li><b>Naive Bayes: </b>Only for classification. Even faster than linear models, good for very large data‐
                  sets and high-dimensional data. Often less accurate than linear models.</li>
                <br />
                <li><b>Decision trees: </b>Very fast, don’t need scaling of the data, can be visualized and easily explained.</li>
                <br />
                <li><b>Random forests: </b>Nearly always perform better than a single decision tree, very robust and powerful. Don’t need scaling
                  of data. Not good for very high-dimensional sparse data.</li>
                <br />
                <li><b>Gradient boosted decision trees: </b>Often slightly more accurate than random forests. Slower to train but faster to
                  predict than random forests, and smaller in memory. Need more parameter tuning than random forests.</li>
                <br />
                <li><b>SVM: </b>Powerful for medium-sized datasets of features with similar meaning. Require
                  scaling of data, sensitive to parameters.</li>
                <br />
                <li><b>Neural networks: </b>Can build very complex models, particularly for large datasets. Sensitive to scaling of the data and
                  to the choice of parameters. Large models need a long time to train.</li>
              </ul>
              <br />

              <h3>2.Unsupervised algorithms</h3>
              Only the input data is known, and no known output data is given to the algorithm.

              <br />
              <br />
              <b>Ex. </b>Identifying topics in a set of blog posts, Segmenting customers into groups with similar preferences,
              Segmenting customers into groups with similar preferences.
              <br />
              <br />
              <b>In table, Each entity or row is known as a sample, while columns are called features.</b>
              <br />
              <br />

              <b>Each algorithm is different in terms of what kind of data and what problem setting it works best for.
                While you are building a machine learning solution,you should answer, or at least keep in mind, the following questions:</b>
              <ul>
                <li>1.What question(s) am I trying to answer? Do I think the data collected can answer that question?</li>
                <li>2.What is the best way to phrase my question(s) as a machine learning problem?</li>
                <li>3.Have I collected enough data to represent the problem I want to solve?</li>
                <li>4.What features of the data did I extract, and will these enable the right predictions?</li>
                <li>5.How will I measure success in my application?</li>
                <li>6.How will the machine learning solution interact with other parts of my research or business product?</li>
              </ul>
              <br />

              <h3> k-Nearest Neighbors</h3>
              <ul>
                <li>Easy to understand.</li>
                <li> Building this model only consists of
                  storing the training set. To make a prediction for a new data point, the algorithm
                  finds the point in the training set that is closest to the new point. Then it assigns the
                  label of this training point to the new data poin.</li>
              </ul>
              {/* <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid >
    )
  }
}

export default (withStyles(styles)(InfoML));
