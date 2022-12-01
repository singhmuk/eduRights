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


const docstring = `def power(a, b):
"""Returns arg1 raised to power arg2."""
return a ** b

print(power.__doc__)
`.trim()

const determine = `class Test:
def __init__(self, name):
    self.cards = []
    self.name = name

def __str__(self):
    return '{} holds ...'.format(self.name)


obj = Test('obj')
print(obj)
`.trim()

const complexs = `
num=2+3j
print(num.real)
print(num.imag)
`.trim();

const nonlocal = `
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter`.trim();

const firstClass = `
def shout(text):
    return text.upper()
print (shout('Hello'))
    
    
    
#2
def shout(text):
  return text.upper()

def whisper(text):
  return text.lower()

def greet(func):
  greeting = func("""Hi, I am created by a function.""")
  print (greeting)

greet(shout)
greet(whisper)
    
    
#3
def create_adder(x):
  def adder(y):
    return x+y
  return adder

add_15 = create_adder(15)
print (add_15(10))
`.trim();

const docstrings = `
def myFun(x):
      x[0] = 20
      lst = [10, 11, 12, 13, 14, 15]
      myFun(lst)
      print(lst)
    
def myFun(x, y=50):                                                             # Default arguments.
  print("x: ", x)
  print("y: ", y)

myFun(10)                                                            
`.trim();

const closure = `
    def oF(text):
      text = text
      def iF():
        print(text)
      return iF                                                           # returning function WITHOUT parenthesis
    
    if __name__ == '__main__':
      myFunction = oF('Hey!')
      myFunction()
    `.trim();

const logging = `
import logging
logging.basicConfig(filename='example.log', level=logging.INFO)

def logger(func):
    def log_func(*args):
        logging.info('Running "{}" with arguments {}'.format(func.__name__,args))
        print(func(*args))

    return log_func

def add(x, y):
    return x + y

def sub(x, y):
    return x - y

add_logger = logger(add)
sub_logger = logger(sub)

add_logger(3, 3)
add_logger(4, 5)
`.trim();

const kwargs = `
def student(firstname, lastname):
  print(firstname, lastname)

student(lastname='Practice', firstname='Geeks')                      # Keyword arguments
    
    
#2 Variable-length arguments:
def myFun(*argv):
  for arg in argv:
    print(arg)

myFun('Hello', 'Welcome', 'to', 'GeeksforGeeks')
    
    
# 3
def myFun(**kwargs):
  for key, value in kwargs.items():
    print("%s == %s" % (key, value))

myFun(first='Geeks', mid='for', last='Geeks')
    
    
    
#4 with one extra argument.
def myFun(arg1, **kwargs):
    for key, value in kwargs.items():
        print("%s == %s" % (key, value))

myFun("Hi", first='Geeks', mid='for', last='Geeks')
    
    
    
#5 To call a function
def myFun(arg1, arg2, arg3):
    print("arg1:", arg1)
    print("arg2:", arg2)
    print("arg3:", arg3)

args = ("Geeks", "for", "Geeks")
myFun(*args)

kwargs = {"arg1": "Geeks", "arg2": "for", "arg3": "Geeks"}
myFun(**kwargs)
`.trim();

const variables = `
    #1
    def f():
      s = "Me too."
      print(s)
    
    s = "I love Geeksforgeeks"
    f()
    
    
    #2
    a=10
    def something():
      global a
      a=15
      print('in function ',a)
    
    something()
    print('outside', a)
    
    
    #3
    a = 10
    print(id(a))
    
    def something():
        a = 20
        x = globals()['a']
        print(id(x))
        print('in function ', a)
    
        globals()['a'] = 15
    
    something()
    print('outside', a)`.trim();

const parameters = `
def print_name(name):                                                     # name is the parameter
    print(name)

print_name('Alex')                                                        # 'Alex' is the argument
`.trim();

const rearrange = `
#positional argument
def f1(a,b):
    print("a=",a,"b=",b)
f1(1,2)


#keyword argument
def f1(a,b):
    print("a=",a,"b=",b)
f1(b=1,a=2)
    
    
    
#3
def foo(a, b, c):
    print(a, b, c)
    
foo(1, 2, 3)                                                        # positional arguments
foo(a=1, b=2, c=3)                                                  # keyword arguments
foo(c=3, b=2, a=1)                                                  # Order is not important
foo(1, b=2, c=3)                                                    

# This is not allowed:
foo(1, b=2, 3)                                                      # positional argument after keyword argument
foo(1, b=2, a=3)                                                    # multiple values for argument 'a'`
  .trim();

const defaultargs = `
def foo(a, b, c, d=4):                                                  # default arguments
    print(a, b, c, d)

foo(1, 2, 3)
foo(1, b=2, c=3, d=100)

def foo(a, b=2, c, d=4):                                                # default arguments must be at the end
    print(a, b, c, d)
`.trim();

const forced = `
def foo(a, b, *, c, d):
    print(a, b, c, d)

foo(1, 2, c=3, d=4)
# foo(1, 2, 3, 4)                                                               # not allowed:

                                                
def foo(*args, last):
    for arg in args:
        print(arg)
    print(last)

foo(8, 9, 10, last=50)
`.trim();

const unpacking = `
def foo(a, b, c):
    print(a, b, c)

my_list = [4, 5, 6] # or tuple
foo(*my_list)                                                     # list/tuple unpacking, length must match

my_dict = {'a': 1, 'b': 2, 'c': 3}                                # dict unpacking, keys and length must match
foo(**my_dict)

# my_dict = {'a': 1, 'b': 2, 'd': 3}                              # not possible since wrong keyword
`.trim();

const passing = `
# immutable objects 
def foo(x):
    x = 5                                 # x += 5 also no effect since x is immutable and a new variable must be created

var = 10
print('var before foo():', var)
foo(var)
print('var after foo():', var)


#2 mutable objects 
def foo(a_list):
    a_list.append(4)
    
my_list = [1, 2, 3]
print('my_list before foo', my_list)
foo(my_list)
print('my_list after foo', my_list)
    
    
#3 immutable objects within a mutable object 
a_list[0] = -100
a_list[2] = "Paul"

my_list = [1, 2, "Max"]
print('my_list before foo', my_list)
foo(my_list)
print('my_list after foo', my_list)


#4 Rebind a mutable reference 
def foo(a_list):
    a_list = [50, 60, 70]                                   # a_list is now a new local variable within the function
    a_list.append(50)
    
my_list = [1, 2, 3]
print('my_list before', my_list)
foo(my_list)
print('my_list after', my_list)
`.trim();

const operators = `
val = input("Enter your value: ")
print(val)


#2. Ternary
a, b = 10, 20
min = a if a < b else b      

print(min)
print("Both equal" if a == b else "a > b" if a > b else "b > a")                   # Ternary operator as nested if-else


#3. Direct Method by using tuples, Dictionary and lambda Python.
print((b, a)[a < b])                                                               # Use tuple for selecting an item
print({True: a, False: b}[a < b])                                                  # Use Dictionary for selecting an item


#4. Only one expression will be evaluated unlike in tuple and Dictionary.
print((lambda: b, lambda: a)[a < b]())
`.trim();

const overloadings = `
class A:
    def __init__(self, a):
        self.a = a

    def __add__(self, o):
        return self.a + o.a                                                             // adding two objects


ob1 = A(1)
ob2 = A(2)
ob3 = A("Geeks")
ob4 = A("For")

print(ob1 + ob2)
print(ob3 + ob4)


// 2
class complex:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def __add__(self, other):
        return self.a + other.a, self.b + other.b

Ob1 = complex(1, 2)
Ob2 = complex(2, 3)
print(Ob1 + Ob2)


// 3
class A:
    def __init__(self, a):
        self.a = a

    def __gt__(self, other):
        if (self.a > other.a):
            return True
        else:
            return False

ob1 = A(2)
ob2 = A(3)
if (ob1 > ob2):
    print("ob1 is greater than ob2")
else:
    print("ob2 is greater than ob1")
`.trim();

const divisions = `
print (5//2)

print (-5.0/2)
`.trim();

const anyAll = `
boolean_list = ['True', 'True', 'True']
result = all(boolean_list)
result = any(boolean_list)

print(result)

`.trim();

const assignment = `
import operator

a = 3
b = 3
c = 4

x = operator.add(a, b)
x = operator.sub(a, b)
x = operator.mul(a, b)
x = operator.truediv(a, b)
x = operator.floordiv(a, b)
x = operator.pow(a, b)
x = operator.mod(a, b)

print(x)                                         



if (operator.lt(a, b)):                                         # using lt() to check if a is less than b
    print(a)
else:
    print("a !< b")


if (operator.le(a, b)):                                         # using le() to check if a is less than or equal to b
    print("a<=b")
else:
    print(b)


if (operator.eq(a, b)):                                         # using eq() to check if a is equal to b
    print("a==b")
else:
    print(c)
    
    

if (operator.gt(a, b)):                                         # using gt() to check if a is greater than b
    print("a>b")
else:
    print(b)


if (operator.ge(a, b)):                                         # using ge() to check if a is greater than or equal to b
    print("a=>b")
else:
    print(a)


if (operator.ne(a, b)):                                         # using ne() to check if a is not equal to b
    print("a!==b")
else:
    print(b)


    
//5
li = [1, 5, 6, 7, 8]

for i in range(0,len(li)):
	print (li[i],end=" ")

operator.setitem(li,3,3)                                      # using setitem() to assign 3 at 4th position

for i in range(0,len(li)):                                    # printing modified list after setitem()
	print (li[i],end=" ")

operator.delitem(li,1)                                        # using delitem() to delete value at 2nd index

for i in range(0,len(li)):
	print (li[i],end=" ")

print (operator.getitem(li,3))                                # using getitem() to access 4th element


//6
li = [1, 5, 6, 7, 8]

for i in range(0,len(li)):
	print (li[i],end=" ")

operator.setitem(li,slice(1,4),[2,3,4])                      # using setitem() to assign 2,3,4 at 2nd,3rd and 4th index

for i in range(0,len(li)):
	print (li[i],end=" ")

operator.delitem(li,slice(2,4))                              # using delitem() to delete value at 3rd and 4th index

for i in range(0,len(li)):
	print (li[i],end=" ")

print (operator.getitem(li,slice(0,2)))                     # using getitem() to access 1st and 2nd element


//7
s1 = "geeksfor"
s2 = "geeks"
print (operator.concat(s1,s2))

if (operator.contains(s1,s2)):                              # contains() to check if s1 contains s2                         
	print ("geeksfor")
else : print ("not contain geeks")



//8 Python code to demonstrate working of and_(), or_(), xor(), invert()

print (operator.and_(a,b))                                  # using and_() to display bitwise and operation
print (operator.or_(a,b))                                   # using or_() to display bitwise or operation
print (operator.xor(a,b))                                   # using xor() to display bitwise exclusive or operation
operator.invert(a)                                          # using invert() to invert value of a
print (operator.invert(a))
`.trim();

const iss = `
list1 = []
list2 = []
list3=list1

if (list1 == list2):
	print("True")
else:
	print("False")

if (list1 is list2):
	print("True")
else:
	print("False")


print(id(list1))
print(id(list2))`.trim();

const validate = `
# The ‘in’ operator is used to check if a value exists in a sequence or not.
list1=[1,2,3,4,5]
list2=[6,7,8,9]
for item in list1:
	if item in list2:
		print("overlapping")
else:
	print("not overlapping")


#2 Identity operators
x = 5
if (type(x) is int):
	print("true")
else:
	print("false")


#3 ‘is not’ operator
x = 5.2
if (type(x) is not int):
    print("true")
else:
    print("false")`.trim();

const conditions = `
    print("Welcome to the rollercoaster")
    height = int(input("What is your height in cm? "))
    
    if height >= 120:
        print("You can ride")
        age = int(input("What is your age:"))
        if age <= 12:
          print("Please pay $5")
        elif age <= 18:
          print("Please pay $7")
        else:
          print(("Plese pay $10"))
    else:
        print("Sorry")
    
    
    
#2 Leap year or Not
    year = int(input("Which year you want to check? "))
    
    if year % 4 == 0:
      if year % 100 == 0:
        if year % 400 == 0:
          print(f"Year {year} is leap")
        else:
          print(f"Not Leap Year is {year}")
      else:
        print(f"Year {year} is leap")
    else:
      print(f"Not Leap Year is {year}")
      
      
    
#3 if-elif-else ladder
    i = 20
    if (i == 10):
      print ("i is 10")
    elif (i == 15):
      print ("i is 15")
    elif (i == 20):
      print ("i is 20")
    else:
      print ("i is not present")
    `.trim();

const whileLoop = `
for key, value in enumerate(['The', 'Big', 'Bang', 'Theory']):
  print(key, value)


#2
questions = ['name', 'colour', 'shape']
answers = ['apple', 'red', 'a circle']

for question, answer in zip(questions, answers):                                      
  print('What is your {0}? I am {1}.'.format(question, answer))
    
    
#3
king = {'Akbar': 'The Great', 'Chandragupta': 'The Maurya', 'Modi' : 'The Changer'}

for key, value in king.items():                                        
  print(key, value)


#4 Using reversed()
lis = [ 1 , 3, 5, 6, 2, 1, 3 ]

for i in reversed(lis):
  print (i,end=" ")
`.trim();

const containers = `
keys=['fruite', 'mobile', 'count']
values=['Apple', 'Sony', '1']

newDict=dict(zip(keys, values))
print(newDict)
`.trim();

const address = `
def arguments(num);                                                       #Formal arguments
  print(id(num))
arguments(10)                                                             #Actual arguments
`.trim();

const bits = `
<< (Zero fill left shift) = Shift left by pushing zeros in from the right and let the leftmost bits fall off
  print(10 << 2)

>> (Signed right shift) = Shift right by pushing copies of the leftmost bit in from the left, and rightmost bits fall off
  print(10 >> 2)
`.trim();

const specifies = `
for x in range(6):
  print(x)
else:
  print("Finally finished!")
`.trim();

const decorators = `
# defining a decorator
def hello_decorator(func):
                                                      # inner1 is a Wrapper function in which the argument is called
def inner1():                                         # inner function can access outer local functions "func"
print("Hello, this is before function execution")
func()                                                        # calling the actual function inside the wrapper function.

print("This is after function execution")
	
return inner1

def function_to_be_used():                                    # defining a function, to be called inside wrapper
print("This is inside the function !!")


# passing 'function_to_be_used' inside the decorator to control its behaviour
function_to_be_used = hello_decorator(function_to_be_used)
function_to_be_used()
`.trim();


class IntroPython extends Component {
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
              <h3>1. What is Python?</h3>
              <p>
                Python is a high-level, interpreted, interactive, dynamically typed object-oriented scripting language.
              </p>
              <b>key features: </b>
              <br />
              <ul>
                <li>It doesn’t need to be compiled before execution.</li>
                <li>Python allows programming in OOS and Procedural paradigms.</li>
                <li>Python is a cross-platform language, i.e.,
                  a Python program written on a Windows system will also run on a Linux system with little or no modifications.</li>
              </ul>
              <br />

              <h3>2. purpose of PYTHONPATH environment variable</h3>
              <p>
                PYTHONPATH variable tells Python Interpreter where to locate the module files
                imported into a program. It should include Python source library directory and the directories containing Python source code.
              </p>
              <br />

              <h3>3. Which data types are supported in Python</h3>
              <ul>
                <li><b>Numeric Types: </b>int, float, complex(1j)</li>
                <li><b>Sequence Types:	</b>List, Tuple, Strings</li>
                <li><b>Set:</b> Set, Frozenset</li>
                <li><b>Dictionary: </b></li>
                <li><b>Boollean:	</b></li>
              </ul>
              <br />
              <br />

              <b>What are type annotations? What are generic type annotations?</b>
              <br />
              While Python is a dynamically typed language, there is a way to annotate types for clarity purposes.
              <br />
              <br />
              <b>These are the built-in types:</b>
              <ul>
                <li>int</li>
                <li>float</li>
                <li>bool</li>
                <li>str</li>
                <li>bytes</li>
              </ul>
              <br />

              <b>Complex types from the typing module:</b>
              <ul>
                <li>List</li>
                <li>Set</li>
                <li>Dict</li>
                <li>Tuple</li>
                <li>Optional</li>
              </ul>
              <br />

              <h3>4. How is memory managed in Python?</h3>
              <ul>
                <li>Memory in Python is managed by Python private heap space. All Python objects and data structures are located in a
                  private heap. This private heap manage by Python Interpreter, and a programmer doesn’t have access
                  to this private heap.</li>
                <li>Python memory manager takes care of the allocation of Python private heap space.</li>
                <li>Memory for Python private heap space is made available by Python’s in-built garbage collector, which recycles and
                  frees up all the unused memory.</li>
              </ul>
              <br />
              <br />

              <b>What are loop interruption statements in Python?</b>
              <p>
                <ul>
                  <li>break</li>
                  <li>continue</li>
                </ul>
              </p>
              <br />
              <br />

              <b>Benefits of using Python over the other scripting languages such as Javascript.</b>
              <ul>
                <li>Application development is faster and easy. </li>
                <li>Extensive support of modules for any kind of application development including data analytics/ ML
                  / math-intensive applications. </li>
              </ul>
              <br />

              <h3>5. What is docstring in Python?</h3>
              <ul>
                <li>Docstring used to describe the functionality of the function.</li>
                <li>Python include a description (quick notes) for their methods using
                  docstrings. Docstrings not completely ignored by the Python Interpreter, Python
                  documentation strings can actually be accessed at the run
                  time using the dot operator when docstring is the first statement in a method/ function.</li>
                <li>docstring in functions is optional.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={docstring}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Can you write code to determine the name of an object in Python?</h3>
              No objects in Python have any associated names. So there is no way of getting the one for an object. The assignment is only the means of
              binding a name to the value. The name then can only refer to access the value. The most we can do is to find the reference name of the object.
              <br />
              <div style={titles}>
                <PrismCode
                  code={determine}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>complex</b>
              <br />
              Comples numbers are especially used in electronics, optics and quantum theory for describing waves and periodic phenomena.
              <br />
              <br />
              Uses:
              <ul>
                <li>Fouries transform uses complex numbers.</li>
                <li>Audio signal processing in ML.</li>
                <li>Speech recognition system.</li>
              </ul>
              <br />
              <ul>
                <li>A complex number has real and imaginary part components (a + bj).</li>
                <br />
                <li>Used to convert number or string to complex number. </li>
                <b>Syntex: complex(real, imaginary)</b>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={complexs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Define Pass statement in Python?</h3>
              A Pass statement used when we cannot decide what to do in our code, but we must type something for making syntactically correct.
              <br />

              <h3>8. What does the Python nonlocal statement do</h3>
              <ul>
                <li>nonlocal statement causes the listed identifiers to refer to previously bound variables in the nearest enclosing scope excluding globals.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={nonlocal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Function is First Class</h3>
              A function in Python is an aggregation of related statements designed to perform a computational, logical, or evaluative task.
              <br />
              <br />
              <b>Properties of first class functions:</b>
              <ul>
                <li>A function is an instance of the Object type.</li>
                <li>store them in data structures such as hash tables, lists, …</li>
                <li>Functions can be passed as arguments to other functions.</li>
                <li>Functions can return another function.</li>
                <li>store the function in a variable.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={firstClass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Pass by Reference or pass by value</h3>
              <div style={titles}>
                <PrismCode
                  code={docstrings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li>Memoize_factorial main purpose is to store the intermediate results in the variable called memory.</li>
              </ul>
              <br />

              <h3>11. Closure</h3>
              A Closure is a function object that remembers values if they are not present in memory.
              <div style={titles}>
                <PrismCode
                  code={closure}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>When and why to use Closures:</b>
              <br />
              As closures are used as callback functions.
              <ul>
                <li>For data hiding</li>
                <li>Reduce the use of global variables</li>
              </ul>
              <br />

              <h3>12. Logging</h3>
              <div style={titles}>
                <PrismCode
                  code={logging}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Kwargs</h3>
              We can pass a variable number of arguments to a function using two special symbols:
              <br />
              <br />
              <b>1.)*args (Non-Keyword Arguments)</b>
              <br />
              <ul>
                <li>*args allows take more arguments than the number of formal arguments that
                  previously defined.</li>
                <li>Using *, the variable that associate with * becomes an iterable.</li>
                <li><b>Ex. </b> To make a multiply function that takes any number of arguments and able to multiply them all together. It can be done using *args.</li>
              </ul>
              <br />
              <br />
              <b>2.)**kwargs (Keyword Arguments)</b>
              <ul>
                <li>Used to pass a keyworded, variable-length argument list.</li>
                <li>A keyword argument is where we provide a name to the variable as pass it into the function.</li>
                <li>One can think of the kwargs as being a dictionary that maps each keyword to the value that we pass alongside it. That is why when we iterate over the kwargs there doesn’t seem to be any order in which they were printed out.</li>
              </ul>
              <br />
              <b>N: </b>“We use the <b>*args OR **kwargs</b> – when we have doubts about the number of  arguments pass in a function.”
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={kwargs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Forced keyword arguments</h3>
              keyword-only arguments can enforce with:
              <ul>
                <li>If write '*,' in our function parameter list, all parameters after that must be passed as keyword arguments.</li>
                <li>Arguments after variable-length arguments must be keyword arguments.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={forced}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. Variables</h3>
              <ul>
                <li>Global variables are defined and declared outside a function and we use them inside a function.</li>
                <li>Global keyword is used inside a function only when we want to do assignments or when we want to change a variable. Global is not needed for printing and accessing.</li>
              </ul>
              <br />

              <b>Rules of global keyword:</b>
              <ul>
                <li>If a variable is assigned a value anywhere within the function’s body, it’s assumed to be a local unless explicitly declared as global.</li>
                <li>Variables that are only referenced inside a function are implicitly global.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={variables}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Function Arguments and parameters</h3>
              <div style={titles}>
                <PrismCode
                  code={parameters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Positional and keyword arguments</h3>
              Benefits of keyword arguments can be:
              <ul>
                <li>Call arguments by their names to make it more clear what they represent.</li>
                <li>Most readable.</li>
                <li>assign keyword If not able to assign positional argument.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={rearrange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Default arguments</h3>
              Default arguments with a predefined value, must be defined as the last parameters in a function.
              <div style={titles}>
                <PrismCode
                  code={defaultargs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Unpacking into agruments</h3>
              <ul>
                <li>Lists/ tuples can be unpacked into arguments with (*) if the length of the container matches the number of function parameters.</li>
                <li>Dictionaries can be unpacked into arguments with (**) if the length and keys match the function parameters.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={unpacking}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Parameter passing</h3>
              Parameter passing can be done by <b>Call-by-Object or Call-by-Object-Reference</b>.
              <ul>
                <li>Parameter passed in is actually a reference to an object (but the reference is passed by value).</li>
                <li>Difference between mutable and immutable data types.</li>
              </ul>
              This means that:
              <br />
              <ul>
                <li>Mutable objects (lists,dict) can be changed within a method. But if you rebind the reference in the method, the outer reference
                  will still point at the original object.</li>
                <li>Immutable objects (int, string) cannot be changed within a method.</li>
                But immutable object CONTAINED WITHIN a mutable object can be re-assigned within a method.
              </ul>
              <div style={titles}>
                <PrismCode
                  code={passing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Operators</h3>
              <div style={titles}>
                <PrismCode
                  code={operators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Operator Overloading</b>
              <ul>
                <i>Python magic methods or special functions for operator overloading.</i>
                <li><b>+ :</b>__add__(self, other)</li>
                <li><b>– :</b>__sub__(self, other)</li>
                <li><b>* :</b>__mul__(self, other)</li>
                <li><b>/ :</b>__truediv__(self, other)</li>
                <li><b>// :</b>__floordiv__(self, other)</li>
                <li><b>% :</b>__mod__(self, other)</li>
                <li><b>** :</b>__pow__(self, other)</li>
                <br />
              </ul>
              <div style={titles}>
                <PrismCode
                  code={overloadings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Divisions</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={divisions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Any and All</h3>
              Any and All are used for And/Or.
              <br />
              <ul>
                <li><b>Any: </b>Returns True if any of the elements of a given iterable (List, Dictionary, Tuple, set, etc) are True else False. </li>
                <li><b>All: </b>Returns True if all elements in the given iterable are True. else False.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={anyAll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Assignment</h3>
              <div style={titles}>
                <PrismCode
                  code={assignment}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. ISS (Difference between == and is)</h3>
              List1 and list2 refers to different objects.
              <div style={titles}>
                <PrismCode
                  code={iss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. Membership and Identity Operators</h3>
              Membership operators are operators used to validate the membership of a value. It test for
              membership in a sequence, such as strings, lists, or tuples.
              <br />
              <br />
              <b>Identity operators:</b>
              <br />
              Determine whether a value is of a certain class or type. They are usually used to
              determine the type of data a certain variable contains.
              <br />
              <br />
              ‘is’ operator – Evaluates to True if the variables on either side of the operator point to the same object otherwise False.
              <div style={titles}>
                <PrismCode
                  code={validate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Conditions</h3>
              <div style={titles}>
                <PrismCode
                  code={conditions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26. While</h3>
              <ul>
                <li><b>Using iteritem(): </b>iteritems() is used to loop through the dictionary printing the dictionary key-value pair sequentially.</li>
                <li><b>Using items(): </b>items() performs the similar task on dictionary as iteritems() but have certain disadvantages when compared with iteritems().</li>
                <ul>
                  <li>It is very time-consuming. Calling it on large dictionaries consumes quite a lot of time.</li>
                  <li>Takes lot of memory. Sometimes takes double the memory when called on a dictionary.</li>
                </ul>
              </ul>
              <br />

              <ul>
                <li><b>enumerate(): </b>is used to loop through the containers printing the index number along with the value present in that
                  particular index.</li>
                <li><b>zip(): </b>is used to combine 2 similar containers(list-list or dict-dict) printing the values
                  sequentially. The loop exists only till the smaller container ends.</li>
                <li><b>items: </b>using items to print the dictionary key-value pair.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={whileLoop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>zip()</h3>
              <ul>
                <li>Takes iterable/ containers and returns a single iterator object, having mapped values from all the containers.</li>
                <li>It is used to map the similar index of multiple containers so that they can be used just using a single entity.</li>
                <li>If passed iterators have different lengths, the iterator with the least items decides the length of the new iterator.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={containers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Get address of the varriable</h3>
              Don't Create constant varriable in Python.
              <div style={titles}>
                <PrismCode
                  code={address}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>BitWise Operators</h3>
              <table>
                <tr>
                  <th>Operators</th>
                  <th>Name</th>
                  <th>Explains</th>
                </tr>
                <tr>
                  <td>&</td>
                  <td>AND</td>
                  <td>print(12 & 13)</td>
                </tr>
                <tr>
                  <td>|</td>
                  <td>OR</td>
                  <td>print(12 | 13)</td>
                </tr>
                <tr>
                  <td>^</td>
                  <td>XOR</td>
                  <td>Sets each bit to 1 if only one of two bits is 1. print(12 ^ 13)</td>
                </tr>
                <tr>
                  <td>~</td>
                  <td>NOT</td>
                  <td>Inverts all the bits. print(~12)</td>
                </tr>
              </table>
              <div style={titles}>
                <PrismCode
                  code={bits}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>For Else</h3>
              The else keyword in a for loop specifies a block of code to be executed when the loop is finished.
              <br />
              <div style={titles}>
                <PrismCode
                  code={specifies}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Decorators</h3>
              It allows programmers to modify the behaviour of function or class. Decorators allow us to wrap another function in order to extend the behaviour of the wrapped function, without permanently modifying it.
              <div style={titles}>
                <PrismCode
                  code={decorators}
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

export default (withStyles(styles)(IntroPython));
