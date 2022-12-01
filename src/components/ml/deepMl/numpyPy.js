import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import gradient from '../../../assets/ML/array_vs_list.png'

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


const ndarray = `
arr = np.array(42)                                                                      #0-D arrays, or Scalars.
arr = np.array([1, 2, 3, 4, 5])                                                         #1-D Arrays
arr = np.array([[1, 2, 3], [4, 5, 6]])                                                  #2-D Arrays
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])                        #3-D arrays
arr2 = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]], dtype=np.float64)
arr3 = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]], dtype=complex)
arrStr = np.array([1, 2, 3, 4], dtype='S')                                              #Creating Arrays With a Data String.
arrFloat = np.array([1.1, 2.1, 3.1])
`.trim()

const pyFuns = `
arr = np.array([1, 2, 3, 6, 7, 8, 9, 0])
arrs = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])
arr2 = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]], dtype=np.float64)
arr3 = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]], dtype=complex)
arr4 = np.array([[1,2],[3,4],[5,6]])
arrStr = np.array([1, 2, 3, 4], dtype='S')                             #array with data type string
arrFloat = np.array([1.1, 2.1, 3.1])


x = arr[0]
x = arr[0, 1]
x = arr[1:5:2]                                                          #[start:end:step]
x = arr.dtype
x = arrFloat.astype(int)                                                #Change data type from float to integer
x = arrFloat.astype(bool)                                               #float to boolean


x = arr.ndim
x = arr.itemsize                                                        # itemsize is 4 bytes
x = arr.size                                                            # total bunber of elements
x = arr.shape                                                           
x = arr4.reshape(2,3)                                                   # information of dimension
x = arr4.ravel()
x = arr4.min() 
x = arr4.max() 
x = arr4.sum()  
x = arr.sum(axis=0)

newarr = np.concatenate((arr, arr2), axis=1)                            #join array
newarr = np.stack((arr, arr2), axis=1)                                  #join array using stack
newarr = np.hstack((arr, arr2))                                         #join array along rows
newarr = np.vstack((arr, arr2))                                         #join array along colom

newarr = np.array_split(arr, 3, axis=0)                                #Splitting breaks one array into multiple.
x = np.where(arr == 7)                                                 #Find the indexes where the value is 7.
x = np.searchsorted(arr, 7)
x = np.sort(arr)

x = np.sqrt(arr)  
x = np.std(arr)                                                         #standard deviation
x = arr + arr2  
x = arr.dot(arr4) 
`.trim()

const zeros = `
x = np.zeros((3,4))
x = np.ones((3,4))
x = np.arange(1, 5, 2)                                                  # 2 steps
x = np.linspace(1, 5, 50)                                               # start, stop, num

print(x)
`.trim()


const numpy = `import numpy as np
ar = np.array([1, 3, 2, 4, 5, 6])
print(ar.argsort()[-3:][::-1])
`.trim()

const Copy = `
#Copy
arr = np.array([1, 2, 3])
arrCopy = arr.copy()
arr[0] = 42

print(arr)
print(arrCopy)


#View
arr = np.array([1, 2, 3])
arrView = arr.view()
arr[0] = 42

print(arr)
print(arrView)
`.trim()

const iterating = `
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])

for x in arr:
  print(x)
`.trim()

// const Series = ``.trim()

// const Series = ``.trim()



class Numpys extends Component {
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
              <h3>Different forms of data</h3>
              <ul>
                <li>Tabular/ spreadsheet-like data in which each column may be a different type (string, numeric, date, etc). </li>
                <li>Multiple tables of data interrelated by key columns (primary/ foreign keys for a SQL user).</li>
              </ul>
              <b>A large percentage of datasets can be transformed into a structured form that is more suitable for analysis and modeling.</b>
              <br />

              <h3>NumPy</h3>
              Benifits of numpy over python list.
              <ul>
                <li>Fast.</li>
                <li>Less Memory.</li>
                <li>NumPy create a N-dimensional array in python.</li>
                <li>Used for working with arrays.</li>
                <li>It also has functions for working in domain of linear algebra, fourier transform, and matrices.</li>
                <li>NumPy aims to provide an array object that is up to 50x faster than traditional Python lists.</li>
                <li>NumPy Data Types is Objects</li>
                <li>It internally stores data in a contiguous block of memory, independent of other built-in Python objects.</li>
              </ul>
              <br />
              <img src={gradient} alt="gradient" className="responsive" style={redesign} />
              <br />

              <h3>Data Types</h3>
              <ul>
                <li><b>i: </b>integer</li>
                <li><b>b: </b>boolean</li>
                <li><b>u: </b>unsigned integer</li>
                <li><b>f: </b>float</li>
                <li><b>c: </b>complex float</li>
                <li><b>m: </b>timedelta</li>
                <li><b>M: </b>datetime</li>
                <li><b>O: </b>object</li>
                <li><b>S: </b>string</li>
                <li><b>U: </b>unicode string</li>
                <li><b>V: </b>fixed chunk of memory for other type ( void )</li>
              </ul>
              <br />

              <h3>Create a NumPy ndarray Object</h3>
              <ul>
                <li>The array object in NumPy is called ndarray.</li>
                <li>An array can have any number of dimensions.</li>
                <li>When the array is created, you can define the number of dimensions by using the ndmin argument.</li>
                <b>arr = np.array([1, 2, 3, 4], ndmin=5)</b>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={ndarray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>zeros</h3>
              <div style={titles}>
                <PrismCode
                  code={zeros}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Write a code to get the indices of N maximum values from a NumPy array.</b>
              <div style={titles}>
                <PrismCode
                  code={numpy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>The Difference Between Copy and View</h3>
              Copy is a new array, and the view is just a view of the original array.
              <div style={titles}>
                <PrismCode
                  code={Copy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Iterating</h3>
              <div style={titles}>
                <PrismCode
                  code={iterating}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Functions:</b>
              <ul>
                <li><b>ndim: </b>Return how many dimensions the array have.</li>
                <li><b>ravel(): </b>Used to change a 2-dimensional array or a multi-dimensional array into a contiguous flattened array
                  (1D array with all the input-array elements and with the same type as it. ravel() return new array.</li>
                <li><b>arr.reshape(4, 3): </b>Reshape From 1-D to 2-D.</li>
                <li><b>arr[0]: </b>Array indexing to access an array element.</li>
                <li><b>dtype: </b>Returns the data type of the array.</li>
                <li><b>arr.shape: </b>Returns a tuple with each index having the number of corresponding elements.</li>
                <li><b>Stack: </b>Stacking is same as concatenation, the only difference is that stacking is done along a new axis.</li>
                <li><b>np.hstack((arr1, arr2)): </b>To stack along rows.</li>
                <li><b>np.vstack((arr1, arr2)): </b>To stack along columns.</li>
                <li><b>np.dstack((arr1, arr2)): </b>To stack along height, which is the same as depth.</li>
                <li><b>np.where(arr == 4): </b>Search an array for a certain value, and return the indexes that get a match.</li>
                <li><b>np.searchsorted(arr, 7, side='right'): </b>Performs a binary search in the array, and returns the index where the specified
                  value would be inserted to maintain the search order.</li>
                <li><b>np.linspace(1, 5, 50): </b>Is Linear list space. Returns evenly separated values over a specified period. The system implicitly
                  calculates the step size.</li>

              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={pyFuns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid >
    )
  }
}

export default (withStyles(styles)(Numpys));
