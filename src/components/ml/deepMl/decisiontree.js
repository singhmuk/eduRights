import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import DecidionTrees from '../../../assets/ML/dt.png'


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

const decisionClar = `
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn import tree

df = pd.read_csv("salaries.csv")
inputs = df.drop('salary_more_then_100k',axis='columns')
target = df['salary_more_then_100k']

le_company = LabelEncoder()
le_job = LabelEncoder()
le_degree = LabelEncoder()

inputs['company_n'] = le_company.fit_transform(inputs['company'])
inputs['job_n'] = le_job.fit_transform(inputs['job'])
inputs['degree_n'] = le_degree.fit_transform(inputs['degree'])
inputs

inputs_n = inputs.drop(['company','job','degree'],axis='columns')
inputs_n
target

model = tree.DecisionTreeClassifier()
model.fit(inputs_n, target)
model.score(inputs_n,target)

model.predict([[2,1,0]])                                #Is salary of Google, Computer Engineer, Bachelors degree > 100 k
model.predict([[2,1,1]])                                #Is salary of Google, Computer Engineer, Masters degree > 100 k
`.trim();

const Impurity = `
def gini(rows):
    """Calculate the Gini Impurity for a list of rows."""
    counts = class_counts(rows)
    impurity = 1
    
    for lbl in counts:
        prob_of_lbl = counts[lbl] / float(len(rows))
        impurity -= prob_of_lbl**2
    return impurity`.trim();

const training = `
training_data = [
  ['Green', 3, 'Apple'],
  ['Yellow', 3, 'Apple'],
  ['Red', 1, 'Grape'],
  ['Red', 1, 'Grape'],
  ['Yellow', 3, 'Lemon'],
  ]
# Header = ["Color", "diameter", "Label"]

my_tree = build_tree(training_data)
print_tree(my_tree)
`.trim();


class DecisionTree extends Component {
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
              <h3>Decision Tree (supervised algorithms)</h3>
              Decision tree analysis is a predictive modelling tool that can be applied across many areas. Decision
              trees can be constructed by an algorithmic approach that can split the dataset in different ways based on different
              conditions.
              <br />
              It can be used for both classification and regression tasks.
              <br />
              <br />

              The two main entities of a tree are decision nodes,
              where the data is split and leaves, where we got outcome.
              <br />
              <br />

              We have the following two types of decision trees.
              <ul>
                <li><b>1. Classification decision trees: </b>In this kind of decision trees, the decision variable is categorical. The above
                  decision tree is an example of classification decision tree.</li>
                <li><b>Regression decision trees: </b>In this kind of decision trees, the decision variable is continuous.</li>
              </ul>
              <br />

              Implementing Decision Tree Algorithm: Gini Index It is the name of the
              cost function that is used to evaluate the binary splits in the dataset and works with the categorial target variable
              “Success” or “Failure”. Higher the value of Gini index, higher the homogeneity. A perfect Gini index value is 0 and
              worst is 0.5 (for 2 class problem). Split Creation A split is basically including an attribute in the dataset and a
              value. We can create a split in dataset with the help of following three parts − Part 1: Calculating Gini Score.
              <br />

              <h3>Decision Tree (supervised learning)</h3>
              A decision tree is a flowchart-like structure in which each internal node represents a test on a feature, each
              leaf node represents a class label (decision taken after computing all features) and branches represent conjunctions
              of features that lead to those class labels. The paths from root to leaf represent classification rules.
              <br />
              <br />
              decision making with labels (Rain(Yes), No Rain(No)).
              <br />
              <br />
              <img src={DecidionTrees} alt="Equations" className="responsive" style={redesign} />
              <br />
              <br />
              Tree models where the target variable can take a discrete set of values are called classification trees. Decision
              trees where the target variable can take continuous values (typically real numbers) are called regression trees.
              <br />
              <br />
              <b>Gini Impurity:</b>
              Understand the meaning of Pure and Impure.
              <br />
              <ul>
                <li><b>Pure: </b>Means, in a selected sample of dataset all data belongs to same class (PURE).</li>
                <li><b>Impure: </b>Means, data is mixture of different classes.</li>
              </ul>
              <br />

              <b>Definition of Gini Impurity:</b>
              <br />
              Gini Impurity is a measurement of the likelihood of an incorrect classification of a new instance of a
              random variable, if that new instance were randomly classified according to the distribution of class
              labels from the data set.
              <br />
              <br />
              If our dataset is Pure then likelihood of incorrect classification is 0. If our sample is mixture of
              different classes then likelihood of incorrect classification will be high.
              <br />
              <br />
              <b>Calculating Gini Impurity: </b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Impurity}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Steps for Making decision tree:</b>
              <ul>
                <li>Get list of rows (dataset) which are taken into consideration for making decision tree
                  (recursively at each nodes).</li>
                <li>Calculate uncertanity of our dataset or Gini impurity or how much our data is mixed up etc.</li>
                <li>Generate list of all question which needs to be asked at that node.</li>
                <li>Partition rows into True rows and False rows based on each question asked.</li>
                <li>Calculate information gain based on gini impurity and partition of data from previous step.</li>
                <li>Update highest information gain based on each question asked.</li>
                <li>Update best question based on information gain (higher information gain).</li>
                <li>Divide the node on best question. Repeat again from step 1 again until we get pure node (leaf nodes).</li>
              </ul>
              <br />
              <b>Let’s build decision tree based on training data.</b>
              <ul>
                <li>The last column is the label.</li>
                <li>The first two columns are features.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={training}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Advantage :</b>
              <ul>
                <li>Easy to use and understand.</li>
                <li>Can handle both categorical and numerical data.</li>
                <li>Resistant to outliers, hence require little data preprocessing.</li>
              </ul>
              <br />

              <b>Disadvantage :</b>
              <ul>
                <li>Prone to overfitting.</li>
                <li>Require some kind of measurement as to how well they are doing.</li>
                <li>Need to be careful with parameter tuning.</li>
                <li>Can create biased learned trees if some classes dominate.</li>
              </ul>
              <br />

              <b>Why Dropout help with overfitting.</b>
              <ul>
                <li>It can't rely on one i/p as it might be dropped out at random.</li>
                <li>Neurons will not learn redundant details i/p.</li>
              </ul>
              <br />

              <h3>Decision Tree Classification</h3>
              <div style={titles}>
                <PrismCode
                  code={decisionClar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              {/*  <br />

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

export default (withStyles(styles)(DecisionTree));
