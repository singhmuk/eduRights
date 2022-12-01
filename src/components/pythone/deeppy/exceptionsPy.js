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

const exceptions = `
try:                                                           
    a = 5 / 0
except:
    print('some error occured.')
    

#2
try:                                                           
    a = 5 / 0
except Exception as e:
    print(e)
    

#3
try:
    a = 5 / 0
except ZeroDivisionError:
    print('Only a ZeroDivisionError is handled here')
    

#4
try:                                  
    a = 5 / 1 
    b = a + '10'
except ZeroDivisionError as e:
    print('A ZeroDivisionError occured:', e)
except TypeError as e:
    print('A TypeError occured:', e)
`.trim();

const statement = `
try:
    a = 5 / 1
except ZeroDivisionError as e:
    print('A ZeroDivisionError occured:', e)
else:
    print('Everything is ok')`.trim();

const cleanup = `
try:
    a = 5 / 1 
    b = a + '10'
except ZeroDivisionError as e:
    print('A ZeroDivisionError occured:', e)
except TypeError as e:
    print('A TypeError occured:', e)
else:
    print('Everything is ok')
finally:
    print('Cleaning up some stuff...')`.trim();

const handlers = `
class ValueTooHighError(Exception):
    pass

class ValueTooLowError(Exception):                                                  # Add some more information for handlers
    def __init__(self, message, value):
        self.message = message
        self.value = value

def test_value(a):
    if a > 1000:
        raise ValueTooHighError('Value is too high.')
    if a < 5:
        raise ValueTooLowError('Value is too low.', a)                # Note that the constructor takes 2 arguments here
    return a

try:
    test_value(1)
except ValueTooHighError as e:
    print(e)
except ValueTooLowError as e:
    print(e.message, 'The value is:', e.value)`.trim();

const nzec = `
n = int(input())
k = int(input())
print(n," ",k)

n, k = raw_input().split(" ")                                                       
n = int(n)
k = int(k)
print(n," ",k)`.trim();

const names = `
print(__name__)

#2
#cals.py
print("Hi", __name__)

#main.py
import cals;
print(__name__)


#3
class A:
    def __init__(self, a):
        self.a2=a
        print("In init",self.a2)

A(3)


#4 Get address of the memory
class A:
    pass

obj=A()
print(id(obj))
    `.trim();

const copy = `
list1=[1,2,3,4]
list2=list1
list2[1]=1000
print(list1)                                                                      #both have same memory location
print(list2)`.trim();

const shallow = `
# shallow copy
list1=[1,2,3,4]
list2=list1.copy()
list2[1]=1000
print(list1)                                                                     #both have diffrent memory locations
print(list2)


# shallow copy nested list
list1=[[1,2,3,4],[3,4,5,6]]
list2=list1.copy()
list2[1][0]=1000
print(list1)                                                                    #becase items object is copied
print(list2)
    
    
# shallow copy nested list
list1=[[1,2,3,4],[3,4,5,6]]
list2=list1.copy()
list2[1][0]=1000
list1.append([4,5,6,7])
print(list1)
print(list2)                                                                    #becase items is not copied
`.trim();

const deepcopy = `
import copy
list1=[1,2,3,4]
list2=copy.deepcopy(list1)
list2[1]=100

print(list1)
print(list2)`.trim();

const assignments = `
list_a = [1, 2, 3, 4, 5]
list_b = list_a

list_a[0] = -10
print(list_a)
print(list_b)`.trim();

const objectspecific = `
import copy
list_a = [1, 2, 3, 4, 5]
list_b = copy.copy(list_a)

list_b[0] = -10                                                         # not affects the other list
print(list_a)
print(list_b)`.trim();

const nested = `
import copy
list_a = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
list_b = copy.copy(list_a)

list_a[0][0]= -10                                                       # affects the other!
print(list_a)
print(list_b)`.trim();

const copydeepcopy = `
import copy
list_a = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
list_b = copy.deepcopy(list_a)

list_a[0][0]= -10                                                         # not affects the other
print(list_a)
print(list_b)`.trim();

const deepcustom = `
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
                
p1 = Person('Alex', 27)                                               # Only copies the reference
p2 = p1
p2.age = 28
print(p1.age)
print(p2.age)`.trim();

class ExceptionsPy extends Component {
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
              <h3>Common built-in Exceptions</h3>
              <ul>
                <li><b>ImportError:</b> If a module cannot be imported</li>
                <li><b>NameError:</b> Try to use a variable that was not defined.</li>
                <li><b>FileNotFoundError:</b> Try to open a file that does not exist or specify the wrong path.</li>
                <li><b>ValueError:</b> When an operation/ function receives an argument that has the right type but an inappropriate value, e.g. try to remove a value from a list that does not exist</li>
                <li><b>TypeError:</b> Raised when an operation/ function is applied to an object of inappropriate type.</li>
                <li><b>IndexError:</b> Try to access an invalid index of a sequence, e.g a list or a tuple.</li>
                <li><b>KeyError:</b> ITry to access a non existing key of a dictionary.</li>
              </ul>
              <br />

              <h3>Handling Exceptions</h3>
              <ul>
                <li>We can use a try and except block to catch and handle exceptions. If catch an exceptions program won't terminate,
                  and can continue.</li>
                <li>Can run multiple statements in a try block, and catch different possible exceptions.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={exceptions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>else clause</h3>
              Can use an else statement that is run if no exception occured.
              <div style={titles}>
                <PrismCode
                  code={statement}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>finally clause</h3>
              Can use a finally statement that always runs, no matter if there was an exception or not.
              <br />
              <br />
              <b>Example used to make some cleanup operations.</b>
              <div style={titles}>
                <PrismCode
                  code={cleanup}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Define own Exceptions</h3>
              Can define our own exception class that should be derived from the built-in Exception class.
              <br />
              Most exceptions are defined with names that end in 'Error'. Exception classes can be defined like any other class.
              <div style={titles}>
                <PrismCode
                  code={handlers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>NZEC (non zero exit code)</h3>
              <ul>
                <li>NZECas the name suggests occurs when your code is failed to return 0.</li>
                <li>Most of the online coding platforms while testing gives input separated by space and in those cases int(input()) is not able to read the input properly and shows error like NZEC.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={nzec}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Special Syntex</h3>
              <ul>
                <li><b>special variable :</b>__name__</li>
                <li><b>special method :</b>__init__</li>
                <br />
                <b>Every time create an object it is allocated to new space.</b>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={names}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Copy</h3>
              <div style={titles}>
                <PrismCode
                  code={copy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Shallow Copy</h3>
              <div style={titles}>
                <PrismCode
                  code={shallow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Deep Copy</h3>
              deep copy, Create diffrent memory locations.
              <br />
              <b>in 1D, shallow copy===deep copy</b>
              <div style={titles}>
                <PrismCode
                  code={deepcopy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Shallow vs deep copying</h3>
              Assignment statements do not create real copies. It only creates a new variable with the same reference.
              So For 'real' copies we can use the copy module. However, for compound/nested objects (e.g. nested lists or dicts) and custom objects there is an important difference between shallow and deep copying:
              <br />
              <br />
              <ul>
                <li><b>shallow copies:</b> Only one level deep. It creates a new collection object and populates it with references to the nested objects. This means modyfing a nested object in the copy deeper than one level affects the original.</li>
                <li><b>deep copies:</b> A full independent clone. It creates a new collection object and then recursively populates it with copies of the nested objects found in the original.</li>
              </ul>
              <br />

              <h3>Assignment operation</h3>
              <div style={titles}>
                <PrismCode
                  code={assignments}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Shallow copy</h3>
              One level deep. Modifying on level 1 does not affect the other list. Use <b>copy.copy()</b>, or object-specific copy functions/ copy constructors.
              <div style={titles}>
                <PrismCode
                  code={objectspecific}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <ul>
                <li>But with nested objects, modifying on level 2 or deeper does affect the other.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={nested}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Deep copies</h3>
              Full independent clones. Use <b>copy.deepcopy()</b>.
              <br />
              <div style={titles}>
                <PrismCode
                  code={copydeepcopy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Custom objects</h3>
              Use copy module to get shallow or deep copies of custom objects.
              <div style={titles}>
                <PrismCode
                  code={deepcustom}
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

export default (withStyles(styles)(ExceptionsPy));
