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


const scipy = `
from scipy import constants

x = constants.liter                                                                     #0.001
x = constants.pi
x = dir(constants)

x = constants.minute                                                                    #60.0
x = constants.hour                                                                      #3600.0
x = constants.day                                                                       #86400.0
x = constants.week                                                                      #604800.0
x = constants.year                                                                      #31536000.0
x = constants.Julian_year                                                               #31557600.0

x = constants.inch                                                                      #0.0254
x = constants.foot                                                                      #0.30479999999999996

x = constants.yard                                                                      #0.9143999999999999
x = constants.atm   
x = constants.atmosphere                                                                #101325.0

x = constants.acre                                                                      #4046.8564223999992
x = constants.litre                                                                     #0.001
x = constants.gallon                                                                    #0.0037854117839999997

x = constants.kmh                                                                       #0.2777777777777778          
x = constants.                                                                          #0.44703999999999994
x = constants.speed_of_sound                                                            #340.5

x = constants.zero_Celsius                                                              #273.15  
x = constants.degree_Fahrenheit                                                         #0.5555555555555556

x = constants.electron_volt                                                             #1.602176634e-19
x = constants.calorie                                                                   #4.184

x = constants.hp                                                                        #745.6998715822701   
x = constants.horsepower                                                                #745.6998715822701

x = constants.dyn                                                                       #1e-05
x = constants.kilogram_force                                                            #9.80665
`.trim();

const optimizers = `
from scipy.optimize import root
from math import cos

def eqn(x):
  return x + cos(x)

myroot = root(eqn, 0)

print(myroot.x)


#2
from scipy.optimize import minimize

def eqn(x):
  return x**2 + x + 2

mymin = minimize(eqn, 0, method='BFGS')

print(mymin)
`.trim();

const sparse = `
import numpy as np
from scipy.sparse import csr_matrix

arr = np.array([0, 0, 0, 0, 0, 1, 1, 0, 2])
arr2 = np.array([[0, 0, 0], [0, 0, 1], [1, 0, 2]])

print(csr_matrix(arr))
print(csr_matrix(arr2).count_nonzero())                                             #Counting non-zeros.
mat.eliminate_zeros()                                                               #Removing zero-entries from the matrix.

mat = csr_matrix(arr2)                                                              #Eliminating duplicate entries.
mat.sum_duplicates()

newarr = csr_matrix(arr).tocsc()                                                    #Converting from csr to csc.
`.trim();

const scipyGraph = `
import numpy as np
from scipy.sparse.csgraph import connected_components
from scipy.sparse.csgraph import dijkstra
from scipy.sparse import csr_matrix

arr = np.array([
  [0, 1, 2],
  [1, 0, 0],
  [2, 0, 0]
])

newarr = csr_matrix(arr)

print(connected_components(newarr))
print(dijkstra(newarr, return_predecessors=True, indices=0))

`.trim();

const depth = `
import numpy as np
from scipy.sparse.csgraph import depth_first_order
from scipy.sparse import csr_matrix

arr = np.array([
  [0, 1, 0, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 0],
  [0, 1, 0, 1]
])

newarr = csr_matrix(arr)

print(depth_first_order(newarr, 1))


#
from scipy.sparse.csgraph import breadth_first_order

arr = np.array([
  [0, 1, 0, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 0],
  [0, 1, 0, 1]
])

newarr = csr_matrix(arr)

print(breadth_first_order(newarr, 1))
`.trim();

const spatials = `
import numpy as np
from scipy.spatial import Delaunay
from scipy.spatial import KDTree
import matplotlib.pyplot as plt

points = np.array([
  [2, 4],
  [3, 4],
  [3, 0],
  [2, 2],
  [4, 1]
])

simplices = Delaunay(points).simplices
plt.triplot(points[:, 0], points[:, 1], simplices)
plt.scatter(points[:, 0], points[:, 1], color='r')

kdtree = KDTree(points)
res = kdtree.query((1, 1))

plt.show()
print(res)
`.trim();

const distances = `
#Find the euclidean distance between given points.
from scipy.spatial.distance import euclidean

p1 = (1, 0)
p2 = (10, 2)

res = euclidean(p1, p2)
print(res)


#cityblock
from scipy.spatial.distance import cityblock

p1 = (1, 0)
p2 = (10, 2)

res = cityblock(p1, p2)
print(res)


#Cosine Distance
from scipy.spatial.distance import cosine

p1 = (1, 0)
p2 = (10, 2)

res = cosine(p1, p2)
print(res)


#Hamming Distance
from scipy.spatial.distance import hamming

p1 = (True, False, True)
p2 = (False, True, True)

res = hamming(p1, p2)
print(res)
`.trim();

const matlabs = `
from scipy import io
import numpy as np

arr = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,])

io.savemat('arr.mat', {"vec": arr})                               #vec to display only the array from the matlab data.

mydata = io.loadmat('arr.mat')

print(mydata)

`.trim();

const corresponding = `
from scipy.interpolate import interp1d
import numpy as np

xs = np.arange(10)
ys = 2*xs + 1

interp_func = interp1d(xs, ys)

newarr = interp_func(np.arange(2.1, 3, 0.1))

print(newarr)


#2
xs = np.arange(10)
ys = xs**2 + np.sin(xs) + 1

interp_func = UnivariateSpline(xs, ys)
newarr = interp_func(np.arange(2.1, 3, 0.1))

print(newarr)


#3
xs = np.arange(10)
ys = xs**2 + np.sin(xs) + 1

interp_func = Rbf(xs, ys)
newarr = interp_func(np.arange(2.1, 3, 0.1))

print(newarr)
`.trim();

const statistical = `
import numpy as np
from scipy.stats import ttest_ind

v1 = np.random.normal(size=100)
v2 = np.random.normal(size=100)

res = ttest_ind(v1, v2)
res = ttest_ind(v1, v2).pvalue                                      #return only the p-value.
print(res)
`.trim();

const stack = `
import numpy as np
from scipy.stats import describe

v = np.random.normal(size=100)
res = describe(v)

print(res)


#2
import numpy as np
from scipy.stats import skew, kurtosis

v = np.random.normal(size=100)

print(skew(v))
print(kurtosis(v))
`.trim();


class Rgrations extends Component {
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
              <h3>Scientific Python</h3>
              <ul>
                <li>SciPy is a scientific computation library that uses NumPy underneath.</li>
                <li>It provides more utility functions for optimization, stats and signal processing.</li>
                <li>SciPy has optimized and added functions that are frequently used in NumPy and Data Science.</li>
                <li>As SciPy is more focused on scientific implementations, it provides many built-in scientific
                  constants. These constants can be helpful when you are working with Data Science.</li>
                <li>A list of all units under the constants module can be seen using the dir() function.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={scipy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Collection of packages addressing a number of different standard problem domains in scientific computing. </b>
              <ul>
                <li><b>scipy.integrate: </b>Numerical integration routines and differential equation solvers.</li>
                <li><b>scipy.linalg: </b>Linear algebra routines and matrix decompositions extending beyond those pro‐vided in numpy.linalg.</li>
                <li><b>scipy.optimize: </b>Function optimizers (minimizers) and root finding algorithms.</li>
                <li><b>scipy.signal: </b>Signal processing tools.</li>
                <li><b>scipy.sparse: </b>Sparse matrices and sparse linear system solvers.</li>
                <li><b>scipy.special: </b>Wrapper around SPECFUN, a Fortran library implementing many common mathematical functions, such as the gamma function.</li>
              </ul>

              <h3>SciPy Optimizers</h3>
              Either find the minimum value of a function, or the root of an equation.
              <br />
              <br />
              <b>x + cos(x)</b> for this use SciPy's optimze.root function.
              <ul>
                <li><b>Minimizing a Function: </b>A function, in this context, represents a curve, curves have high
                  points(maxima) and low points(minima).</li>
                <ul>
                  <li>The highest point in the whole curve is called global maxima, whereas the rest of them are called local maxima.</li>
                  <li>The lowest point in whole curve is called global minima, whereas the rest of them are called local minima.</li>
                </ul>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={optimizers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Sparse Data</h3>
              <ul>
                <li><b>Sparse Data: </b>Sparse data is data that has mostly unused elements (elements don't carry any information).</li>
                <li><b>Dense Array: </b>Most of the values are not zero.</li>
                <li>When we are dealing with partial derivatives in linear algebra we will come across sparse data.</li>
                <br />

                <b>There are primarily two types of sparse matrices that we use:</b>
                <li><b>CSC: </b>Compressed Sparse Column. For efficient arithmetic, fast column slicing.</li>
                <li><b>CSR: </b>Compressed Sparse Row. For fast row slicing, faster matrix vector products</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={sparse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Graphs</h3>
              <ul>
                <li>Use the dijkstra method to find the shortest path in a graph from one element to another.</li>
                <br />
                <b>It takes following arguments:</b>
                <ul>
                  <li><b>return_predecessors: </b>boolean (True to return whole path of traversal otherwise False).</li>
                  <li><b>indices: </b>index of the element to return all paths from that element only.</li>
                  <li><b>limit: </b>max weight of path.</li>
                </ul>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={scipyGraph}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Depth First Order</h3>
              The depth_first_order() method returns a depth first traversal from a node.
              <br />
              <br />
              <b>This function takes 2 arguments:</b>
              <ul>
                <li>The graph.</li>
                <li>The starting element to traverse graph from.</li>
              </ul>
              <br />

              <b>Breadth First Order:</b>
              <ul>
                <li>The breadth_first_order() method returns a breadth first traversal from a node.</li>
                <br />
                <br />

                <b>This function takes 2 arguments:</b>
                <ul>
                  <li>The graph.</li>
                  <li>The starting element to traverse graph from.</li>
                </ul>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={depth}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Spatial Data</h3>
              <ul>
                <li>Spatial data refers to data that is represented in a geometric space.
                  <b>Ex. </b>points on a coordinate system, finding if a point is inside a boundary or not.
                </li>
                <br />

                <b>Triangulation: </b>

                <ul>
                  <li>A Triangulation of a polygon is to divide the polygon into multiple triangles with which we can
                    compute an area of the polygon.</li>
                  <li>A Triangulation with points means creating surface composed triangles in which all of the given
                    points are on at least one vertex of any triangle in the surface.</li>
                  <li>Method to generate these triangulations through points is the Delaunay() Triangulation.</li>
                </ul>
              </ul>
              <br />

              <b>KDTrees:</b>
              KDTrees are a datastructure optimized for nearest neighbor queries.
              <ul>
                <li>KDTree() method returns a KDTree object.</li>
                <li>query() method returns the distance to the nearest neighbor and the location of the neighbors.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={spatials}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Distance Matrix</h3>
              <ul>
                <li>There are many Distance Metrics used to find various types of distances between two points in
                  data science, Euclidean distsance, cosine distsance etc.</li>
                <li>The distance between two vectors may not only be the length of straight line between them, it
                  can also be the angle between them from origin, or number of unit steps required etc.</li>
                <li><b>Cityblock Distance: </b>Is the distance computed using 4 degrees of movement.
                  we can only move: up, down, right, or left, not diagonally.</li>
                <li>Is the value of cosine angle between the two points A and B.</li>
                <li>Is the proportion of bits where two bits are difference. It's a way to measure distance for
                  binary sequences.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={distances}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Matlab Arrays</h3>
              <ul>
                <li>SciPy provides us with the module scipy.io, which has functions for working with Matlab arrays.</li>
                <li>savemat() function allows us to export data in Matlab format.</li>
                <li>The loadmat() function allows us to import data from a Matlab file.</li>
                <li>array originally was 1D, but on extraction it has increased one dimension. to resolve this we
                  can pass an additional argument squeeze_me=True</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={matlabs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Interpolation</h3>
              <ul>
                <li>Interpolation is a method for generating points between given points.
                  <b>Ex. </b>for points 1 and 2, we may interpolate and find points 1.33 and 1.66.
                </li>
                <li>SciPy provides scipy.interpolate which has many functions to deal with interpolation.</li>
                <br />
                <b>1D Interpolation:</b>
                <ul>
                  <li>interp1d() is used to interpolate a distribution with 1 variable.</li>
                  <li>It takes x and y points and returns a callable function that can be called with new x and
                    returns corresponding y.</li>
                </ul>
              </ul>
              <br />

              <b>Spline Interpolation:</b>
              <ul>
                <li>In 1D interpolation the points are fitted for a single curve whereas in Spline interpolation the points
                  are fitted against a piecewise function defined with polynomials called splines.</li>
                <li>The UnivariateSpline() function takes xs and ys and produce a callable funciton that can be called with new xs.</li>
                <li><b>Piecewise function: </b>A function that has different definition for different ranges.</li>
                <li><b>Interpolation with Radial Basis Function: </b>It a function that is defined corresponding to a
                  fixed reference point.</li>
                <li>Rbf() function also takes xs and ys as arguments and produces a callable function that can be
                  called with new xs.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={corresponding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>SciPy Statistical Significance Tests</h3>
              <ul>
                <li>In statistics, statistical significance means that the result that was produced has a reason
                  behind it, it was not produced randomly, or by chance.</li>
                <br />

                <b>T-Test:</b>
                <ul>
                  <li>T-tests are used to determine if there is significant deference between means of two variables.
                    and lets us know if they belong to the same distribution.</li>
                  <li>It is a two tailed test.</li>
                  <li>The function ttest_ind() takes two samples of same size and produces a tuple of t-statistic and p-value.</li>
                </ul>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={statistical}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Statistical Description of Data</h3>
              To see a summary of values in an array, we can use the describe() function.
              <br />
              It returns the following description:
              <ul>
                <li>number of observations (nobs)</li>
                <li>minimum and maximum values = minmax</li>
                <li>mean</li>
                <li>variance</li>
                <li>skewness</li>
                <li>kurtosis</li>
              </ul>
              <br />

              <b>Normality: </b>This tests based on the skewness and kurtosis.
              normaltest() function returns p value for the null hypothesis.
              <br />
              <br />
              <b>Skewness: </b>
              <ul>
                <li>A measure of symmetry in data. For normal distributions it is 0.</li>
                <li>If it is negative, it means the data is skewed left. If it is positive it means the data is skewed right.</li>
              </ul>
              <br />

              <b>Kurtosis: </b>
              <ul>
                <li>A measure of whether the data is heavy or lightly tailed to a normal distribution.</li>
                <li>Positive kurtosis means heavy tailed.</li>
                <li>Negative kurtosis means lightly tailed.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={stack}
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

export default (withStyles(styles)(Rgrations));
