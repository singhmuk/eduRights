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


const pickle = `import pickle
mylist = ['a', 'b', 'c', 'd']
with open('datafile.txt', 'wb') as fh:
   pickle.dump(mylist, fh)
   
   
#2
import pickle
cars = ['A', 'B', 'C', 'D']
file = "myCar.pkl"
fileobj = open(file, 'wb')
pickle.dump(cars, fileobj)

fileobj.close()

# Second Part

file = "myCar.pkl"
fileobj = open(file,'rb')
mycar = pickle.load(fileobj)
print(mycar)
print(type(mycar))
`.trim()

const unpickling = `
import pickle
pickle_off = open ("datafile.txt", "rb")
emp = pickle.load(pickle_off)
print(emp)

O/P: ['a', 'b', 'c', 'd']`.trim()


const monkey_patching = `# monkeyy.py 
class X: 
     def func(self): 
          print "func() is being called"

          
import monkeyy 
def monkey_f(self): 
     print "monkey_f() is being called"                                # replacing address of “func” with “monkey_f”

monkeyy.X.func = monkey_f 
obj = monk.X()                                          # calling “func” whose address got replaced with “monkey_f()”

obj.func()
`.trim()

const monkey_patchings = `
class Test:
    def __init__(self,x):
        self.a=x;
    def get_data(self):
        print("Some code to fetch data from database")
    def f1(self):
        self.get_data()
    def f2(self):
        self.get_data()
t1=Test(5)
# t1.f1()
# t1.f2()

def new_get_data(self):
    print("Some code to fetch data from test data")
Test.get_data = new_get_data
print("After Monkey Patching")
t1.f1()
t1.f2()`.trim();

const generators = `
def my_generator():
        yield 1
        yield 2
        yield 3
              

#2
def evenNumbers(n):
    i=1
    while n:                                                      # Return keyword return value with control.
        yield 2*i                                                 # Yield return value but function paouse not control.
        i+=1
        n-=1

it=evenNumbers(10)
even_list=[]
while True:
    try:
        even_list.append(next(it))
        # even_list += next(it)
    except StopIteration:
        break
print(even_list)
`.trim();

const format = `
def countdown(num):
    print('Starting')
    while num > 0:
        yield num
        num -= 1

cd = countdown(3)                                                         # this will not print 'Starting'
print(next(cd))                                                           # this will print 'Starting' and the first value

print(next(cd))                                                           # will print the next values
print(next(cd))
print(next(cd))                                                           # this will raise a StopIteration
`.trim();

const memory = `
# without a generator
def firstn(n):
    num, nums = 0, []
    while num < n:
        nums.append(num)
        num += 1
    return nums

sum_of_first_n = sum(firstn(1000000))
print(sum_of_first_n)
import sys
print(sys.getsizeof(firstn(1000000)), "bytes")


# with a generator
def firstn(n):
    num = 0
    while num < n:
        yield num
        num += 1

sum_of_first_n = sum(firstn(1000000))
print(sum_of_first_n)
import sys
print(sys.getsizeof(firstn(1000000)), "bytes")
`.trim();

const fibonacci = `
def fibonacci(limit):
    a, b = 0, 1 
    while a < limit:
        yield a
        a, b = b, a + b

fib = fibonacci(30)
print(list(fib))                                                  # generator objects can be converted to a list
`.trim();

const comprehensions = `
mygenerator = (i for i in range(1000) if i % 2 == 0)                # generator expression
print(sys.getsizeof(mygenerator))

mylist = [i for i in range(1000) if i % 2 == 0]                     # list comprehension
print(sys.getsizeof(mylist))`.trim();

const behind = `
class firstn:
    def __init__(self, n):
        self.n = n
        self.num = 0
        
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.num < self.n:
            cur = self.num
            self.num += 1
            return cur
        else:
            raise StopIteration()
             
firstn_object = firstn(1000000)
print(sum(firstn_object))
`.trim();



class PyIntro extends Component {
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
              <h3>Define pickling and unpickling.</h3>
              Pickling is the process of converting Python objects, such as lists, dicts, etc., into a character stream.

              <div style={titles}>
                <PrismCode
                  code={pickle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              In the above code, list – “mylist” contains four elements (‘a’, ‘b’, ‘c’, ‘d’). We open the file in “wb” mode instead of “w” as all the operations are done using bytes in the current working directory. A new file named “datafile.txt” is created, which converts the mylist data in the byte stream.
              <br />
              <i>The process of retrieving the original Python objects from the stored string representation, which is the reverse of the pickling process, is called unpickling.</i>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={unpickling}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Pickle Exceptions</b>
              <br />
              Some of the common exceptions raised while dealing with pickle module:
              <ul>
                <li><b>Pickle.PicklingError: </b>If the pickle object doesn’t support pickling, this exception is raised.</li>
                <li><b>Pickle.UnpicklingError: </b>In case the file contains bad/ corrupted data.</li>
                <li><b>EOFError: </b>In case the end of file is detected, this exception is raised.</li>
              </ul>
              <br />

              <b>Prons:</b><br />
              <ul>
                <li>Save complicated data.</li>
                <li>Easy to use, lighter and doesn’t require several lines of code.</li>
                <li>The pickled file generated is not easily readable and thus provide some security.</li>
              </ul>
              <br />

              <b>Cons:</b><br />
              <ul>
                <li>Languages other than python may not able to reconstruct pickled python objects.</li>
                <li>Risk of unpickling data from malicious sources.</li>
              </ul>
              <br />

              <h3>Monkey patching</h3>
              Change object behavior during run time.
              <br />
              <ul>
                <li>Monkey patching is the process of modifications that are done to a class/ module during the runtime.</li>
                <li>This is done as Python supports changes in the behavior of the program while ssbeing executed.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={monkey_patching}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={monkey_patchings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Generators</h3>
              <ul>
                <li>Generators are functions that can be paused and resumed, returning an object that can be iterated over. </li>
                <li>They are lazy and thus produce items one at a time and only when asked. Furthermore, we do not
                  need to wait until all the elements have been generated before we start to use them.</li>
                <li>They are much more memory efficient when dealing with large datasets.</li>
                <li>A generator is defined like a normal function but use the yield statement instead of return.</li>
              </ul>
              <br />


              <br />
              <div style={titles}>
                <PrismCode
                  code={generators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Execution of a generator function</h3>
              Calling the function does not execute it. Instead, the function returns a generator object which is
              used to control execution.
              <br />
              <ul>
                <li>Generator objects execute when next() is called. When calling next() the
                  first time, execution begins at the start of the function and continues until the first yield statement.</li>
                <li>Subsequent calls to next() continue from the yield statement (and loop around) until another yield is reached.</li>
              </ul>
              <br />
              If yield is not called because of a condition or the end is reached, a StopIteration exception is raised.
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Generators save memory!</h3>
              <ul>
                <li>Without a generator, the complete sequence has to be stored in a list.</li>
                <li>With a generator, no additional sequence is needed to store the numbers.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={memory}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Another example: Fibonacci numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={fibonacci}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Generator expressions</h3>
              <ul>
                <li>Like list, generators can be written in the same syntax except with parenthesis instead of square brackets.</li>
                <li>Generator expressions are slower than list because of the overhead of function calls.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={comprehensions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Concept behind a generator</h3>
              It has to implement <b>__iter__</b> and <b>__next__</b> to make it iterable, keep, and take care of a StopIteration.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={behind}
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

export default (withStyles(styles)(PyIntro));
