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

const format = `
txt = "My name is John, and I am {}"
    
my_string = """Hello                                              
World"""

print(type(my_string))
print(my_string[1])
print(len(my_string))
print(my_string.strip())                            
print(my_string.lower())
print(my_string.upper())
print(my_string.replace("H", "J"))
print(my_string.split(","))
print(len(my_string))  
print("hello".startswith("he"))                                      # startswith and endswith
print("hello".endswith("llo"))
print("Hello".find("o"))                                             # find first index of a given substring, -1 otherwise
print("Hello".count("e"))


my_list = ['How', 'are', 'you', 'doing']                              
str = ' '.join(my_list)                                              # join elements of a list into a string
print(str)

b = my_string[0]                                                     # get character by referring to index
b = my_string[1:3]                                                   # Substrings with slicing
b = my_string[::2]                                                   # start to end with every second item
b = my_string[::-1] 
`.trim();

const iterating = `
my_string = 'Hello'
for i in my_string:
    print(i)`.trim();

const formates = `
a = "Hello {0} and {1}".format("Bob", "Tom")                            # use braces as placeholders
a = "Hello {} and {}".format("Bob", "Tom")                              # positions are optional for the default order
a = "The integer value is {}".format(2)

print(a)


a = "The float value is {0:.3f}".format(2.1234)                         # some special format rules for numbers
a = "The float value is {0:e}".format(2.1234)
a = "The binary value is {0:b}".format(2)

print(a)


print("Hello %s and %s" % ("Bob", "Tom"))                               # must be a tuple for multiple arguments
val =  3.14159265359
print("The decimal value is %d" % val)                                  # old style formatting by using % operator
`.trim();

const fstrings = `
name = "Eric"
age = 25
a = f"Hello, {name}. You are {age}."
print(a)

pi = 3.14159
a = f"Pi is {pi:.3f}"
print(a)

a = f"The value is {2*60}"                                   # f-Strings are evaluated at runtime, which allows expressions
print(a)`.trim();

const concatenation = `
from timeit import default_timer as timer
my_list = ["a"] * 1000000

start = timer()
a = "".join(my_list)
end = timer()
print("concatenate string with join(): %.5f" % (end - start))
`.trim();

const splits = `
import re

#split
str = "Split string into list"
newStr = str.split()
print(newStr) 


#2 sub
newStr = re.sub("s", "9", str)
print(newStr)


#3 subn
str = re.subn('ov', '~*' , 'The rain in Spain', flags = re.IGNORECASE)
print(str)`.trim();

const simpleFunction = `
def sum(a,b):
    c=a+b
    return c
obj=sum(2,3)
print(obj)


#2
f=lambda a,b:a+b
obj=f(2,3)
print(obj)`.trim();

const lambda = `
f=lambda n: 1 if n==0 else n+f(n-1)
print(f(5))

#2
list(filter(lambda x:x>6,range(9))) [7, 8]

list(map(lambda x:x**2,range(5))) [0, 1, 4, 9, 16, 25]

from functools import reduce 
reduce(lambda x,y:x-y,[1,2,3,4,5]) -13`.trim();

const filter = `
f = lambda x: x+10                                          
val1 = f(5)
val2 = f(100)
print(val1, val2)


f = lambda x,y: x*y                          
val3 = f(2,10)
val4 = f(7,5)
print(val3, val4)`.trim();

const variations = `
def myfunc(n):
    return lambda x: x * n

doubler = myfunc(2)
print(doubler(6))
`.trim();

const sorting = `
points2D = [(1, 9), (4, 1), (5, -3), (10, 2)]
sorted_by_y = sorted(points2D, key= lambda x: x[1])
print(sorted_by_y)

mylist = [- 1, -4, -2, -3, 1, 2, 3, 4]
sorted_by_abs = sorted(mylist, key= lambda x: abs(x))
print(sorted_by_abs)`.trim();

const mapFun = `
a  = [1, 2, 3, 4, 5, 6]
b = list(map(lambda x: x * 2 , a))


c = [x*2 for x in a]                                                # Use map if you have an already defined function
print(b)
print(c)`.trim();

const evaluates = `
a = [1, 2, 3, 4, 5, 6, 7, 8]
b = list(filter(lambda x: (x%2 == 0) , a))

c = [x for x in a if x%2 == 0]
print(b)
print(c)`.trim();

const reduces = `
from functools import reduce
a = [1, 2, 3, 4]
product_a = reduce(lambda x, y: x*y, a)
print(product_a)
sum_a = reduce(lambda x, y: x+y, a)
print(sum_a)`.trim();

class StringPy extends Component {
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
              <h3>1. Strings</h3>
              <ul>
                <li>Python strings are immutable.</li>
                <li>Use triple quotes for multiline strings.</li>
              </ul>
              <br />

              <ul>
                <li><b>count(): </b>Returns the number of times a specified value occurs in a string.</li>
                <li><b>endswith(): </b>Returns true if the string ends with the specified value.</li>
                <li><b>find(): </b>Searches the string for a specified value and returns the position.</li>
                <li><b>format(): </b>Formats specified values in a string.</li>
                <li><b>format_map(): </b>Formats specified values in a string</li>
                <li><b>index(): </b>Searches the string for a specified value and returns the position.</li>
                <li><b>isalnum(): </b>Returns True if all characters in the string are alphanumeric.</li>
                <li><b>isalpha(): </b>Returns True if all characters in the string are in the alphabet.</li>
                <li><b>isdecimal(): </b>Returns True if all characters in the string are decimals.</li>
                <li><b>isdigit(): </b>Returns True if all characters in the string are digits.</li>
                <li><b>isidentifier(): </b>Returns True if the string is an identifier.</li>
                <li><b>islower(): </b>Returns True if all characters in the string are lower case.</li>
                <li><b>isupper(): </b></li>
                <li><b>lower(): </b>Converts a string into lower case.</li>
                <li><b>isnumeric(): </b>Returns True if all characters in the string are numeric.</li>
                <li><b>isprintable(): </b>Returns True if all characters in the string are printable.</li>
                <li><b>isspace(): </b>Returns True if all characters in the string are whitespaces.</li>
                <li><b>istitle(): </b>Returns True if the string follows the rules of a title.</li>
                <li><b>join(): </b>Joins the elements of an iterable to the end of the string.</li>
                <li><b>ljust(): </b>Returns a left justified version of the string.</li>
                <li><b>lstrip(): </b>Returns a left trim version of the string.</li>
                <li><b>maketrans(): </b>Returns a translation table to be used in translations.</li>
                <li><b>partition(): </b>Returns a tuple where the string is parted into three parts.</li>
                <li><b>rpartition(): </b>Returns a tuple where the string is parted into three parts.</li>
                <li><b>replace(): </b>Returns a string where a specified value is replaced with a specified value.</li>
                <li><b>rfind(): </b>Searches the string for a specified value and returns the last position of where it was found.</li>
                <li><b>rindex(): </b>Searches the string for a specified value and returns the last position of where it was found.</li>
                <li><b>rjust(): </b>Returns a right justified version of the string.</li>
                <li><b>rstrip(): </b>Returns a right trim version of the string.</li>
                <li><b>rsplit(): </b>Splits the string at the specified separator, and returns a list.</li>
                <li><b>split(): </b>Splits the string at the specified separator, and returns a list</li>
                <li><b>splitlines(): </b>Splits the string at line breaks and returns a list.</li>
                <li><b>startswith(): </b>Returns true if the string starts with the specified value.</li>
                <li><b>strip(): </b>Returns a trimmed version of the string.</li>
                <li><b>swapcase(): </b>Swaps cases, lower case becomes upper case.</li>
                <li><b>title(): </b>Converts the first character of each word to upper case.</li>
                <li><b>translate(): </b>Returns a translated string.</li>
                <li><b>zfill(): </b>Fills the string with a specified number of 0 values at the beginning.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={format}
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

              <h3>2. Format</h3>
              <div style={titles}>
                <PrismCode
                  code={formates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. f-Strings</h3>
              Use the variables directly inside the braces.
              <div style={titles}>
                <PrismCode
                  code={fstrings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>More on immutability and concatenation</h3>
              <ul>
                <li>since a string is immutable, adding strings with + always
                  creates a new string, and therefore is expensive for multiple operations.</li>
                <li>join method is much faster.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={concatenation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. What are split(), sub(), and subn() methods in Python?</h3>
              These methods belong to Python RegEx,  ‘re’ module and are used to modify strings.
              <ul>
                <li><b>split():</b>Used to split a given string into a list.</li>
                <li><b>sub(): </b>Used to find a substring where a regex pattern matches,
                  and then it replaces the matched substring with a different string.</li>
                <li><b>subn(): </b>similar to the sub()
                  method, but it returns the new string, along with the number of replacements.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={splits}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Lambda</h3>
              <div style={titles}>
                <PrismCode
                  code={simpleFunction}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Lambda with Map. Filter</h3>
              <div style={titles}>
                <PrismCode
                  code={lambda}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Lambda functions</h3>
              <ul>
                <li>A lambda function is defined without a name.</li>
                <li>A lambda function can take any number of arguments, but have only one expression.</li>
                <li>Anonymous functions are defined using the lambda keyword.</li>
                <li>It's most common use is as an argument to higher-order functions.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={filter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Lamdba inside another function</h3>
              <div style={titles}>
                <PrismCode
                  code={variations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Custom sorting using a lambda function as key parameter</h3>
              The key function transforms each element before sorting.
              <div style={titles}>
                <PrismCode
                  code={sorting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Use lambda for map function</h3>
              map(func, seq), transforms each element with the function.
              <div style={titles}>
                <PrismCode
                  code={mapFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Use lambda for filter function</h3>
              filter(func, seq), returns all elements for which func evaluates to True.
              <div style={titles}>
                <PrismCode
                  code={evaluates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Reduce</h3>
              reduce(func, seq), repeatedly applies the func to the elements and returns a single value.
              func takes 2 arguments.
              <div style={titles}>
                <PrismCode
                  code={reduces}
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

export default (withStyles(styles)(StringPy));
