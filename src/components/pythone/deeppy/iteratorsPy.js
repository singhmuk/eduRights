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

const addition = `
class MyNumbers:
  def __iter__(self):
    self.a = 1
    return self

  def __next__(self):
    if self.a <= 20:
      x = self.a
      self.a += 1
      return x
    else:
      raise StopIteration

myclass = MyNumbers()
myiter = iter(myclass)

for x in myiter:
  print(x)
`.trim()

const product = `
from itertools import product

prod = product([1, 2], [3, 4])
print(list(prod))                                                       # convert the iterator to a list

prod = product([1, 2], [3], repeat=2)
print(list(prod))                             
`.trim();

const permutations = `
from itertools import permutations

perm = permutations([1, 2, 3])
print(list(perm))

perm = permutations([1, 2, 3], 2)                                         # optional: the length of the permutation tuples
print(list(perm))`.trim();

const combinations = `
from itertools import combinations, combinations_with_replacement


comb = combinations([1, 2, 3, 4], 2)              # second argument is mandatory and specifies length of the output tuples.
print(list(comb))

comb = combinations_with_replacement([1, 2, 3, 4], 2)
print(list(comb))`.trim();

const accumulate = `
from itertools import accumulate

acc = accumulate([1,2,3,4])                                       # return accumulated sums
print(list(acc))


# other possible functions are possible
import operator
acc = accumulate([1,2,3,4], func=operator.mul)
print(list(acc))

acc = accumulate([1,5,2,6,3,4], func=max)
print(list(acc))`.trim();

const groupby = `
from itertools import groupby

def smaller_than_3(x):                                                              # use a function as key
    return x < 3

group_obj = groupby([1, 2, 3, 4], key=smaller_than_3)
for key, group in group_obj:
    print(key, list(group))
    
    
# or use a lamda expression, e.g. words with an 'i':
group_obj = groupby(["hi", "nice", "hello", "cool"], key=lambda x: "i" in x)
for key, group in group_obj:
    print(key, list(group))
    
persons = [{'name': 'Tim', 'age': 25}, {'name': 'Dan', 'age': 25}, 
           {'name': 'Lisa', 'age': 27}, {'name': 'Claire', 'age': 28}]

for key, group in groupby(persons, key=lambda x: x['age']):
    print(key, list(group))`.trim();

const repeat = `
from itertools import count, cycle, repeat

for i in count(10):                                                 # count(x): count from x: x, x+1, x+2, x+3...
    print(i)
    if  i >= 13:
        break


sum = 0
for i in cycle([1, 2, 3]):                                         # cycle infinitely through an iterable
    print(i)
    sum += i
    if sum >= 12:
        break


for i in repeat("A", 3):                                           # repeat x infinitely or n times
    print(i)`.trim();

const iteration = `
d = dict()
d['xyz'] = 123
d['abc'] = 345

for i in d:
    print("% s % d" % (i, d[i]))
    
    
    
#2 
for letter in 'geeksforgeeks':
  if letter == 'e' or letter == 's':                              #Returns the control to the beginning of the loop.
    continue
  print('Current Letter :', letter)
    
    
    
#3 
for letter in 'geeksforgeeks':
  if letter == 'e' or letter == 's':
    break                                                         #Brings control out of the loop.

print('Current Letter :', letter)
    
    
#4 pass
function and classes.
for letter in 'geeksforgeeks':
  pass
print('Last Letter :', letter)


#5 
def addition(n):                                                  #Pass one or more iterable to the map() function.
    return n + n 

numbers = (1, 2, 3, 4) 
result = map(addition, numbers) 
print(list(result))
`.trim();

const arraysTypes = `
from array import  *

vals = array('i', [1,2,3,4,5,-6,7,8,9,10])                                  // Creating an Array
floatArr = array('d', [2.5, 3.2, 3.3])                                      // creating an array with float type

print(vals.typecode)
vals.append(100)
vals.insert(1, 4)
vals.remove(1)
vals.pop(2)
vals.index(2)
vals[2] = 6                                                                # Updating an Elements in an Array
print(len(vals))
`.trim();

const arrays = `
import array as arr                                           

a = arr.array('i', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])                                         
for i in range(0, 3):
    print(a[i], end=" ")

    
//2. Sum of the array
def _sum(arr):
    return(sum(arr))

ans = _sum([12, 3, 4, 15])
print (ans)


//3. Slpit Array
def splitArr(arr, n, k):
    for i in range(0, k):
        x = arr[0]
        for j in range(0, n-1):
            arr[j] = arr[j + 1]

        arr[n-1] = x


arr = [12, 10, 5, 6, 52, 36]
n = len(arr)
position = 2

splitArr(arr, n, position)

for i in range(0, n):
    print(arr[i], end = ' ')
`.trim();

const arrayRotetions = `
def leftRotate(arr, d, n):
    for i in range(d):
        leftRotatebyOne(arr, n)

def leftRotatebyOne(arr, n):
    temp = arr[0]
    for i in range(n-1):
        arr[i] = arr[i+1]
    arr[n-1] = temp


def printArray(arr,size):
    for i in range(size):
        print ("%d"% arr[i],end=" ")


arr = [1, 2, 3, 4, 5, 6, 7]
leftRotate(arr, 2, 7)
printArray(arr, 7) 
 `.trim();

const reverseRotetions = `
def rverseArray(arr, start, end):
    while (start < end):
        temp = arr[start]
        arr[start] = arr[end]
        arr[end] = temp
        start += 1
        end = end-1

def leftRotate(arr, d):
    n = len(arr)
    rverseArray(arr, 0, d-1)
    rverseArray(arr, d, n-1)
    rverseArray(arr, 0, n-1)

def printArray(arr):
    for i in range(0, len(arr)):
        print (arr[i])

arr = [1, 2, 3, 4, 5, 6, 7]
leftRotate(arr, 2)                                                                           # Rotate array by 2
printArray(arr)`.trim();

const monotonic = `
def isMonotonic(A):
    return (all(A[i] <= A[i + 1] for i in range(len(A) - 1)) or  all(A[i] >= A[i + 1] for i in range(len(A) - 1)))

A = [6, 5, 4, 4]
print(isMonotonic(A))
`.trim();


class IteratorsPy extends Component {
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
              <h3>Stop after 20 iterations</h3>
              <div style={titles}>
                <PrismCode
                  code={addition}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>For</h3>
              <ul>
                <li>To prevent the iteration to go on forever, use the StopIteration statement.</li>
                <li>Use pass statement to write empty loops.</li>
                <li>Pass is also used for empty control statements</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={iteration}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>product()</h3>
              <ul>
                <li>It computes the cartesian product of input iterables.</li>
                <li>To allow the product of an iterable with itself, specify the number of repetitions</li>
                <li>It is equivalent to nested for-loops.</li>
                <ul>
                  <li><b>Ex. product(A, B) returns the same as ((x,y) for x in A for y in B).</b></li>
                </ul>

              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={product}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>permutations()</h3>
              This tool returns successive length permutations of elements in an iterable, with all possible orderings, and no repeated elements.
              <div style={titles}>
                <PrismCode
                  code={permutations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>combinations() and combinations_with_replacement()</h3>
              r-length tuples, in sorted order. So, if the input iterable is sorted, the combination tuples will be produced in sorted order. combinations() does not allow repeated elements, but combinations_with_replacement() does.
              <div style={titles}>
                <PrismCode
                  code={combinations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>accumulate()</h3>
              Make an iterator that returns accumulated sums, or accumulated results of other binary functions.
              <div style={titles}>
                <PrismCode
                  code={accumulate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>groupby()</h3>
              Make an iterator that returns consecutive keys and groups from the iterable. The key is a function computing a key value for each
              element. If not specified, key defaults to an identity function and returns unchanged element.
              <div style={titles}>
                <PrismCode
                  code={groupby}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Infinite iterators: count(), cycle(), repeat()</h3>
              <div style={titles}>
                <PrismCode
                  code={repeat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Array</h3>
              <b>Array don't have fixed size.</b>
              <br />
              <br />

              <i><b>append()</b>	Adds an element at the end of the list<br />
                <b>clear()</b>	Removes all the elements from the list<br />
                <b>copy()</b>	Returns a copy of the list<br />
                <b>count()</b>	Returns the number of elements with the specified value<br />
                <b>extend()</b>	Add the elements of a list (or any iterable), to the end of the current list<br />
                <b>index()</b>	Returns the index of the first element with the specified value<br />
                <b>insert()</b>	Adds an element at the specified position<br />
                <b>pop()</b>	Removes the element at the specified position<br />
                <b>remove()</b>	Removes the first item with the specified value<br />
                <b>reverse()</b>	Reverses the order of the list<br />
                <b>sort()</b>	Sorts the list<br />
                <br />
              </i>
              <div style={titles}>
                <PrismCode
                  code={arraysTypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={arrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Array Rotation</h3>
              <div style={titles}>
                <PrismCode
                  code={arrayRotetions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Reverse Array Rotation</h3>
              <div style={titles}>
                <PrismCode
                  code={reverseRotetions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Monotonic</h3>
              <div style={titles}>
                <PrismCode
                  code={monotonic}
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

export default (withStyles(styles)(IteratorsPy));
