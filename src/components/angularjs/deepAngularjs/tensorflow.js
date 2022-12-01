import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import NeuralKeras from '../../../assets/ML/perceptrons.png'


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

const tensorlow = `
import tensorflow as tf
import pandas as pd

COLUMN_NAMES = [
        'SepalLength', 
        'SepalWidth',
        'PetalLength', 
        'PetalWidth', 
        'Species'
        ]


training_dataset = pd.read_csv('iris_training.csv', names=COLUMN_NAMES, header=0)                 #Import training dataset
train_x = training_dataset.iloc[:, 0:4]
train_y = training_dataset.iloc[:, 4]

test_dataset = pd.read_csv('iris_test.csv', names=COLUMN_NAMES, header=0)
test_x = test_dataset.iloc[:, 0:4]
test_y = test_dataset.iloc[:, 4]`.trim();

const eager = `
tf.executing_eagerly()                                                                            #True

x = [[2.]]
y = tf.matmul(x,x)
print(y)
`.trim();

const tensorObj = `
x = tf.constant([[1, 2, 3, 4 ,5]])                                        
y = tf.ones((1,5))                                                       
z = tf.zeros((1,5))                                                       
q = tf.range(start=1, limit=6, delta=1)                                   

print(q)
`.trim();

const rankDim = `
a=tf.constant(5)                                                          #Rank-0
b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0])                                #Vector
c = tf.constant([[10,20],[30,40],[50,60],[70,80]])                        #Rank-2
d = tf.constant([[[10,20],[30,40],[50,60],[70,80]]])                      #Rank-3
e = tf.ones([1,2,3,4,5])                                                  #Rank-3
`.trim();

const indexings = `
a = tf.constant([0,1,1,1,2,3,3,3,4,5,6,6])
b = a.numpy()                                                             #for indexing we need to convert tensor to numpy
b[2]
`.trim();

const broadcasting = `
x = tf.constant([1,2,3])
y = tf.constant(2)
z = tf.constant([2,2,2])

print(tf.multiply(x,2))
print(x* y)
print(x * z)


#2
x = tf.reshape(x,[3,1])
y = tf.range(1,5)
print(x, y)
print(tf.multiply(x,y))
`.trim();

const specialTen = `
#1 ragged_tensors
ragged_list = [[1, 2, 3],[4, 5],[6]]
ragged_tensor = tf.ragged.constant(ragged_list)
ragged_tensor


#2 string_tensor
string_tensor = tf.constant(["With this", "code, I am", "creating a String Tensor"])
string_tensor


#3 sparse_tensor
sparse_tensor = tf.sparse.SparseTensor(indices=[[0, 0], [2, 2], [4, 4]], values=[25, 50, 100], dense_shape=[5, 5])
sparse_tensor

ctd = tf.sparse.to_dense(sparse_tensor)                                       #convert sparse tensors to dense
ctd
`.trim();

const graphs = `
x = tf.constant(2)
y = tf.constant(5)
result = x+y
tf.print(result)

print(tf.compat.v1.get_default_graph())                                                       #see generated graph

g = tf.Graph()                                                                                #user define graph
userdefault = tf.compat.v1.get_default_graph()                                                #user define default graph
print(userdefault)
`.trim();

const variables = `
#1 constant
import tensorflow as tf

x = tf.constant([[1,2],[3,4]])
y = tf.add(x, 1)
print(x * y)

z = np.multiply(x, y)
print(a.numpy)


#2 Variables 
var1 = tf.Variable([[1.2,2.1],[3.0,40.]])
t1 = tf.convert_to_tensor(var1)                        # varriable convert to tensor 
print(t1)    


#3 
var1 = tf.Variable([12,30,40,50,60,70,80,90])

amax = tf.argmin(var1)
amin = tf.argmax(var1)
rs = tf.reshape(var1, ([2,4]))


#4
my_tensor = tf.random.uniform((5,5), 0,4)
var1 = tf.Variable(initial_value = my_tensor)                                                 #create variable
print(var1)


#5
tf.__version__
const = tf.constant(10)
mat = tf.fill((5,5),10)
zeros = tf.zeros((5,5))
ones = tf.ones((5,5))
randm = tf.random.normal((4,4), mean=0, stddev=1.0)
randu = tf.random.uniform((4,4), minval=0, maxval=1)
myops = [const, mat, zeros, ones, randu]
print(myops)

a = tf.constant([[2,3],[4,5]])
a.get_shape()


#6
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

tfph = tf.compat.v1.placeholder(tf.float32, shape=(None, 5))
a = tf.compat.v1.placeholder(tf.float32, name='a')
b = tf.compat.v1.placeholder(tf.float32, name='b')
c = tf.add(a, b, name='c')
with tf.Session() as sess:
    sess.run(c, feed_dict={a: 2.1, b: 1.9})
    print(tfph)
`.trim();

const perceptropn = `
np.random.seed(101)
tf.random.set_seed(101)
rand_a = np.random.uniform(0, 100, (5,5))
rand_b = np.random.uniform(0, 100, (5,1))


#2
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

a = tf.compat.v1.placeholder(tf.float32)
b = tf.compat.v1.placeholder(tf.float32)
add = a+b
mul = a*b

with tf.Session() as sess:
    result = sess.run(add, feed_dict={a:rand_a, b:rand_b})
    print(result)
`.trim();

const neuralsnet = `
nf = 1
ndf = 3

bis = tf.Variable(tf.zeros([ndf]))
wgt = tf.Variable(tf.random.normal([nf, ndf]))


import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

x = tf.compat.v1.placeholder(tf.float32,(None, nf))

xw = tf.matmul(x, wgt)                                                                      #y = mx + b
z = tf.add(xw, b)

af = tf.sigmoid(z)                                                                          #activation function

init = tf.compat.v1.global_variables_initializer()
with tf.Session() as sess:
    sess.run(init)
    layer_out = sess.run(af, feed_dict={x:np.random.random([1,nf])})

print(layer_out)
`.trim();

const regressions = `
import tensorflow.compat.v1 as tf

np.random.seed(101)
tf.random.set_seed(101)


x = np.linspace(0, 50, 50)                                                    # Generating random linear data
y = np.linspace(0, 50, 50)
  
x += np.random.uniform(-4, 4, 50)                                             # Adding noise to the random linear data
y += np.random.uniform(-4, 4, 50)
  
n = len(x) # Number of data points

plt.scatter(x, y)
plt.xlabel('x')
plt.xlabel('y')
plt.title("Training Data")
plt.show()


tf.disable_v2_behavior()

X = tf.compat.v1.placeholder("float")
Y = tf.compat.v1.placeholder("float")

W = tf.Variable(np.random.randn(), name = "W")
b = tf.Variable(np.random.randn(), name = "b")

learning_rate = 0.01
training_epochs = 1000


with tf.Session() as sess:                                                # Starting the Tensorflow Session
    sess.run(init)                                                        # Initializing the Variables
      
    for epoch in range(training_epochs):
        for (_x, _y) in zip(x, y):
            sess.run(optimizer, feed_dict = {X : _x, Y : _y})             # Feeding each data point into the optimizer
          
        
        if (epoch + 1) % 50 == 0:                                         # Displaying the result after every 50 epochs
            c = sess.run(cost, feed_dict = {X : x, Y : y})                # Calculating the cost a every epoch
            print((epoch + 1), c, sess.run(W), sess.run(b))
    
    training_cost = sess.run(cost, feed_dict ={X: x, Y: y})               # Storing values to be used outside the Session
    weight = sess.run(W)
    bias = sess.run(b)
`.trim();


class TensorFlows extends Component {
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
              <h3>TensorFlow</h3>
              TensorFlow designed to implement ML and DL concepts in the easiest manner.
              <br />
              <br />
              TensorFlow uses for numerical computation and large-scale ML. TensorFlow bundles
              together a slew of ML and DL (neural networking) models algorithms and makes them
              useful by way of a common metaphor.
              <br />
              <br />

              <b>important features of TensorFlow:</b>
              <ul>
                <li>Defines, optimizes and calculates mathematical expressions easily with the help of
                  multi-dimensional arrays (tensors).</li>
                <li>Support of deep neural networks and ML techniques.</li>
                <li>It includes a high scalable feature of computation with various data sets.</li>
                <li>Uses GPU computing, automating management. It also includes a unique feature of optimization of same
                  memory and the data used.</li>
              </ul>
              <br />

              <h3>Eager Execution</h3>
              Eager execution is an imperative, define-by-run interface where operations are executed immediately as they are called from Python.
              This makes it easier to get started with TensorFlow, and can make research and development more intuitive.
              <div style={titles}>
                <PrismCode
                  code={eager}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Tensors</h3>
              Tensors are TensorFlow’s multi-dimensional arrays with uniform type. They are very similar to NumPy arrays, and immutable.
              <br />
              <br />
              <b>Creating Tensor Objects:</b>
              <ul>
                <li><b>tf.constant(): </b></li>
                <li><b>tf.ones(): </b>Only consisting of 1s.</li>
                <li><b>tf.zeros(): </b>Only consisting of 0s.</li>
                <li><b>tf.range(): </b>To create Tensor objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={tensorObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i><b>N: </b>tf.ones and tf.zeros accepts the shape as the required argument since their element values are pre-determined.</i>
              <br />

              <h3>Rank System and Dimension</h3>
              <ul>
                <li><b>Rank-0 (Scalar) Tensor: </b>A tensor containing a single value and no axes.</li>
                <li><b>Rank-1 (Vector) Tensor: </b>A tensor containing a list of values in a single axis.</li>
                <li><b>Rank-2 Tensor: </b>A tensor containing 2-axes.</li>
                <li><b>Rank-3 Tensor: </b>A tensor containing 3-axes.</li>
                <li><b>Rank-4 Tensor: </b>4th dimension is space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={rankDim}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Operations with Tensors</h3>
              <ul>
                <li>Indexing</li>
                <li>Addition</li>
                <li>Element-wise Multiplication</li>
                <li>Matrix Multiplication</li>
                <li>Finding the Maximum/ Minimum</li>
                <li>Finding the Index of the Max Element</li>
                <li>Computing Softmax Value</li>
              </ul>
              <i>Commas (,) are used to reach deeper levels.</i>
              <div style={titles}>
                <PrismCode
                  code={indexings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Broadcasting with Tensor</h3>
              <ul>
                <li>Broadcasting concept is borrowed from Numpy broadcasting.</li>
                <li>Broadcasting is about bringing the tensors of different dimensions/ shape to the compatible shape such that arithmetic operations
                  can be performed on them.</li>
                <li>In broadcasting, the smaller array is found, the new axes are added as per the larger array and data is added appropriately to
                  the transformed array.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={broadcasting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Special Types of Tensors</h3>
              We tend to generate Tensors in a rectangular shape and store numerical values as elements. However, TensorFlow also supports irregular, or specialized,
              Tensor types, which are:
              <ul>
                <li><b>Ragged Tensors: </b>Are tensors with different numbers of elements along the size axis.</li>
                <li><b>String Tensors: </b>Are stores string objects. We can build a String Tensor just as you create
                  a regular Tensor object. But, we pass string objects as elements instead of numerical objects.</li>
                <li><b>Sparse Tensors: </b>Are rectangular Tensors for sparse data. When we have holes (Null values) in our data, Sparse Tensors
                  are to-go objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={specialTen}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>Variables & Placeholders</h3>
              Two way to initialize varriabble.
              <ul>
                <li><b>constant: </b>initialize constant variable.</li>
                <li><b>Variable: </b></li>
              </ul>
              <br />
              <b>Methods:</b>
              <ul>
                <li><b>argmin(): </b>Show smallest value index number.</li>
                <li><b>argmax(): </b>Show large value index number.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={variables}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Import training dataset</h3>
              <div style={titles}>
                <PrismCode
                  code={tensorlow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Tensorflow Graph</h3>
              <div style={titles}>
                <PrismCode
                  code={graphs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Perceptron</h3>
              Perceptron is an algorithm that, given an inputs features, outputs either 1 or 0.
              <br />
              <img src={NeuralKeras} alt="Theata" className="responsive2" style={redesign} />
              <div style={titles}>
                <PrismCode
                  code={perceptropn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Neural Network</h3>
              <ul>
                <li>Neural networks, a beautiful biologically-inspired programming paradigm which enables a computer to learn from observational data.</li>
                <li>DL, a powerful set of techniques for learning in neural networks.</li>
                <li>Neural networks and DL currently provide the best solutions to many problems in image recognition, speech recognition,
                  and natural language processing.</li>
              </ul>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={neuralsnet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Regression</h3>
              <div style={titles}>
                <PrismCode
                  code={regressions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(TensorFlows));
