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

const simple_interest = `
def simple_interest(p,t,r):
    si = (p * t * r)/100
    
    print('The Simple Interest is', si)
    return si

simple_interest(8, 6, 8)
 `.trim();

const compound_interest = `
def compound_interest(principle, rate, time):

    CI = principle * (pow((1 + rate / 100), time))
    print("Compound interest is", CI)

compound_interest(10000, 10.25, 5) `.trim();

const format = `
def convert24(str1):

    if str1[-2:] == "AM" and str1[:2] == "12":
        return "00" + str1[2:-2]

    elif str1[-2:] == "AM":
        return str1[:-2]

    elif str1[-2:] == "PM" and str1[:2] == "12":
        return str1[:-2]

    else:

        return str(int(str1[:2]) + 12) + str1[2:8]

print(convert24("08:05:45 PM"))`.trim();

const sqrt = `
print(bin(25))
print(oct(0b11001))
print(hex(0b11001))
print(int('052', 8))


#2
import math as m

x=m.sqrt(25)
print(x)


#3
x=m.sqrt(15)
print(m.floor(x))
print(m.ceil(x))`.trim();

const pows = `
import math

print(3**2)
print(math.pow(3,2))
print(math.pi)


#2
from math import sqrt, pow

print(pow(4,5))`.trim();

const triangle = `
a = 5
b = 6
c = 7

s = (a + b + c) / 2                                                         # calculate the semi-perimeter

area = (s*(s-a)*(s-b)*(s-c)) ** 0.5
print('The area of the triangle is %0.2f' %area)`.trim();

const hcf = `
def hcf(x, y):
    if x > y:
        smaller = y
    else:
        smaller = x
    for i in range(1, smaller + 1):
        if ((x % i == 0) and (y % i == 0)):
            hcf = i
    return hcf


num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
print("The H.C.F. of", num1, "and", num2, "is", hcf(num1, num2))`.trim();

const largest = `
num1 = 10
num2 = 14
num3 = 12


if (num1 >= num2) and (num1 >= num3):
   largest = num1
elif (num2 >= num1) and (num2 >= num3):
   largest = num2
else:
   largest = num3

print("The largest number is", largest)`.trim();

const lcm = `
def lcm(x, y):
    if x > y:
        greater = y
    else:
        greater = x
    for i in range(1, greater + 1):
        if ((x % i == 0) and (y % i == 0)):
            lcm = i
    return lcm


num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
print("The L.C.M. of", num1, "and", num2, "is", lcm(num1, num2))`.trim();

const math_function = `

# Random Number
import random

print(random.randint(0,9))


#2 Sum 2 Numbers
number1 = input("First number: ")
number2 = input("Second number: ")

sum = float(number1) + float(number2)
print("The sum of {0} and {1} is {2}" .format(number1, number2, sum))`.trim();

const quadratic = `
import cmath

a = 1
b = 5
c = 6

d = (b**2) - (4*a*c)                                                          # calculate the discriminant

sol1 = (-b-cmath.sqrt(d))/(2*a)
sol2 = (-b+cmath.sqrt(d))/(2*a)

print('The solution are {0} and {1}'.format(sol1,sol2))`.trim();

const reproducable = `
import random

a = random.random()                                                   # random float in [0,1]
a = random.uniform(1,10)                                              # random float in range [a,b]
a = random.randint(1,10)                                              # random integer in range [a,b]. b is included
a = random.randrange(1,10)                                            # random integer in range [a,b]. b is excluded

a = random.normalvariate(0, 1)                               
a = random.choice(list("ABCDEFGHI"))                          
a = random.sample(list("ABCDEFGHI"), 3)                       
a = random.choices(list("ABCDEFGHI"),k=3)                     

print(a)


a = list("ABCDEFGHI")
random.shuffle(a)                                                  
print(a)`.trim();

const seed = `
import random

random.seed(1)
print(random.random())
print(random.uniform(1,10))
print(random.choice(list("ABCDEFGHI")))

print('Re-seeding with 42...')
random.seed(42)                                                                     # Re-seed
`.trim();

const secrets = `
import secrets

a = secrets.randbelow(10)                                             
a = secrets.randbits(5)                                               # return an integer with k random bits.
a = secrets.choice(list("ABCDEFGHI"))

print(a)`.trim();

const pseudorandom = `
import numpy as np

np.random.seed(1)                                        # rand(d0,d1,…,dn)

print(np.random.rand(3))                                 # generate an array with random floats, arrays has size (d0,d1,…,dn)
np.random.seed(1)
print(np.random.rand(3))

values = np.random.randint(0, 10, (5,3))                # generate an array with random integers in range [a,b) with size n
print(values)
                                        # generate an array with Gaussian values, array has size (d0,d1,…,dn)
                                        # values from standard normal distribution with mean 0.0 and standard deviation 1.0
values = np.random.randn(5)
print(values)
                                        # randomly shuffle an array.
                                        # only shuffles the array along the first axis of a multi-dimensional array
arr = np.array([[1,2,3], [4,5,6], [7,8,9]])
np.random.shuffle(arr)
print(arr)`.trim();



class Mathematics extends Component {
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
              <h3>Simple interest</h3>
              <div style={titles}>
                <PrismCode
                  code={simple_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Compound interest</h3>
              <div style={titles}>
                <PrismCode
                  code={compound_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>conver_12_to_24_hour_format</h3>
              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Sqrt</h3>
              <div style={titles}>
                <PrismCode
                  code={sqrt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Pows</h3>
              <div style={titles}>
                <PrismCode
                  code={pows}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Area of triangle</h3>
              <div style={titles}>
                <PrismCode
                  code={triangle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>HCF</h3>
              <div style={titles}>
                <PrismCode
                  code={hcf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Largest number</h3>
              <div style={titles}>
                <PrismCode
                  code={largest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>LCM</h3>
              <div style={titles}>
                <PrismCode
                  code={lcm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Math Function</h3>
              <div style={titles}>
                <PrismCode
                  code={math_function}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Quadratic Equation</h3>
              <div style={titles}>
                <PrismCode
                  code={quadratic}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Random Numbers</h3>
              Python defines a set of functions that are used to generate or manipulate random numbers.
              <ul>
                <li>the random module</li>
                <li>reproduce numbers with random.seed()</li>
                <li>create cryptographically strong random numbers with the secrets module</li>
                <li>create random and arrays with numpy.random</li>
              </ul>
              <br />

              <h3>The random module</h3>
              This module implements pseudo-random number generators for various distributions. It uses the Mersenne
              Twister algorithm as its core generator. It is called pseudo-random, because the numbers seem random,
              but are reproducable.
              <br />
              <br />

              <ul>
                <li><b>normalvariate(): </b>random float from a normal distribution with mu and sigma.</li>
                <li><b>choice(): </b>choose a random element from a sequence.</li>
                <li><b>choices(): </b>choose k elements with replacement, and return k sized list.</li>
                <li><b>sample(): </b>choose k unique random elements from a sequence.</li>
                <li><b>shuffle(): </b>shuffle list in place.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={reproducable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>The seed generator</h3>
              With random.seed(), you can make results reproducible, and the chain of calls after random.seed() will produce the same trail of data. The sequence of random numbers becomes deterministic, or completely determined by the seed value.
              <div style={titles}>
                <PrismCode
                  code={seed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>The secrets module</h3>
              The secrets module is used for generating cryptographically strong random numbers suitable for managing data such as passwords, account authentication, security tokens, and related secrets.
              <div style={titles}>
                <PrismCode
                  code={secrets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Random numbers with NumPy</h3>
              Create random numbers for and arrays. The NumPy pseudorandom number generator is different from the Python standard library pseudorandom number generator.
              Importantly, seeding the Python pseudorandom number generator does not impact the NumPy pseudorandom number generator. It must be seeded and used separately.
              <div style={titles}>
                <PrismCode
                  code={pseudorandom}
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

export default (withStyles(styles)(Mathematics));
