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

const abstrcts = `
from abc import ABC, abstractmethod

class Computer(ABC):
    @abstractmethod
    def process(self):
        pass

class Laptop(Computer):
    def process(self):
        print("It's running")

obj=Laptop()
obj.process()`.trim();

const decorator = `
def decor_result(result_function):
    def distinction(marks):
        for m in marks:
            if m>=75:
                print("Distinction")
        result_function(marks)
    return distinction

@decor_result
def result(marks):
    for m in marks:
        if m>=33:
            pass
        else:
            print('FAIL')
            break
    else:
        print('PASS')
result([45,67,87,65,78])`.trim();

const decorated = `
@my_decorator
def my_function():
    pass`.trim();

const consequence = `
def start_end_decorator(func):
    
    def wrapper():
        print('Start')
        func()
        print('End')
    return wrapper

def print_name():
    print('Alex')
    
print_name()

print()

print_name = start_end_decorator(print_name)
print_name()`.trim();

const achieve = `
@start_end_decorator
def print_name():
    print('Alex')
    
print_name()`.trim();

const argumentse = `
def start_end_decorator_2(func):
    
    def wrapper(*args, **kwargs):
        print('Start')
        func(*args, **kwargs)
        print('End')
    return wrapper

@start_end_decorator_2
def add_5(x):
    return x + 5

result = add_5(10)
print(result)`.trim();

const inner = `
def start_end_decorator_3(func):
    
    def wrapper(*args, **kwargs):
        print('Start')
        result = func(*args, **kwargs)
        print('End')
        return result
    return wrapper

@start_end_decorator_3
def add_5(x):
    return x + 5

result = add_5(10)
print(result)`.trim();

const identity = `
print(add_5.__name__)
help(add_5)`.trim();

const template = `
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return wrapper`.trim();

const repeats = `
def repeat(num_times):
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat

@repeat(num_times=3)
def greet(name):
    print(f"Hello {name}")
    
greet('Alex')`.trim();

const executed = `
def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"Calling {func.__name__}({signature})")
        result = func(*args, **kwargs)
        print(f"{func.__name__!r} returned {result!r}")
        return result
    return wrapper

@debug
@start_end_decorator_4
def say_hello(name):
    greeting = f'Hello {name}'
    print(greeting)
    return greeting

say_hello(name='Alex')`.trim();

const preserve = `
import functools

class CountCalls:
                                                          # the init needs to have the func as argument and stores it
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0
    
                                                          # extend functionality, execute function, and return the result
    def __call__(self, *args, **kwargs):
        self.num_calls += 1
        print(f"Call {self.num_calls} of {self.func.__name__!r}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello(num):
    print("Hello!")
    
say_hello(5)
say_hello(5)`.trim();


class Abstract extends Component {
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
              <h3>Abstract Class</h3>
              <ul>
                <li>Python default don't support abstract class. But with abc module can do.</li>
                <li>Abstract class has at least one abstract method.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={abstrcts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Decorators</h3>
              A decorator is a function that takes another function and extends the behavior of this function without explicitly modifying it. It allows to add new functionality to an existing function.
              <br />
              <br />
              There are 2 kinds of decorators:
              <ul>
                <li>Function decoratos</li>
                <li>Class decorators</li>
              </ul>
              <br />
              A function is decorated with the <b>@</b> symbol:
              <div style={titles}>
                <PrismCode
                  code={decorated}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Function decorators</h3>
              A decorator function takes another function as argument, wraps its behaviour inside an inner function. and returns the wrapped
              function. The decorated function no has extended functionality.
              <div style={titles}>
                <PrismCode
                  code={consequence}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>The decorator syntax</h3>
              Instead of wrapping our function and asigning it to itself, Achieve same thing by decorating our function with an @.
              <div style={titles}>
                <PrismCode
                  code={achieve}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>What about function arguments</h3>
              If our function has input arguments and we try to wrap it with our decorator above, it will raise a TypeError since we have to call our function inside the wrapper with this arguments, too. However, we can fix this by using *args and **kwargs in the inner function:
              <div style={titles}>
                <PrismCode
                  code={argumentse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Return values</h3>
              Above, we do not get the result back, now return the value from our inner function:
              <div style={titles}>
                <PrismCode
                  code={inner}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>What about the function identity?</h3>
              <div style={titles}>
                <PrismCode
                  code={identity}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>The final template for own decorators</h3>
              <div style={titles}>
                <PrismCode
                  code={template}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Decorator function arguments</h3>
              functools.wraps is a decorator that takes an argument for itself. We can think of this as 2 inner functions, so an inner function
              within inner function.
              <br />
              <br />
              <b>Another example: </b>A repeat decorator that takes a number as input. Within
              this function, we have the actual decorator function that wraps our function and extends its behaviour within another inner function.
              In this case, it repeats the input function the given number of times.
              <div style={titles}>
                <PrismCode
                  code={repeats}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Nested Decorators</h3>
              We can apply several decorators to a function by stacking them on top of each other. The decorators are being executed in the order they are listed.
              <div style={titles}>
                <PrismCode
                  code={executed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Class decorators</h3>
              We can also use a class as a decorator. Therefore, we have to implement the __call__() method to make our object callable. Class decorators are typically used to maintain a state, e.g. here we keep track of the number of times our function is executed. The __call__ method does essentially the same thing as the wrapper() method we have seen earlier. It adds some functionality, executes the function, and returns its result. Note that here we use functools.update_wrapper() instead of functools.wraps to preserve the information about our function.
              <div style={titles}>
                <PrismCode
                  code={preserve}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Some typical use cases</h3>
              <ul>
                <li>Use a timer decorator to calculate the execution time of a function.</li>
                <li>Use a debug decorator to print out some more information about the called function and its arguments.</li>
                <li>Use a check decorator to check if the arguments fulfill some requirements and adapt the bevaviour accordingly.</li>
                <li>Register functions (plugins).</li>
                <li>Slow down code with time.sleep() to check network behaviour.</li>
                <li>Cache the return values for memoization.</li>
                <li>Add information or update a state.</li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Abstract));
