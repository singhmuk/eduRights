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

const armstrongs = `
num = int(input("Enter a number: "))

sum = 0

temp = num
while temp > 0:
   digit = temp % 10
   sum += digit ** 3
   temp //= 10

if num == sum:
   print(num,"is an Armstrong number")
else:
   print(num,"is not an Armstrong number")`.trim();

const each_vowel = `
vowels = 'aeiou'

ip_str = 'Hello, have you tried our tutorial section yet?'

ip_str = ip_str.casefold()

count = {}.fromkeys(vowels,0)

for char in ip_str:
   if char in count:
       count[char] += 1

print(count)`.trim();

const factorial = `
def factorial(n):
   if n == 1:
       return n
   else:
       return n * factorial(n-1)

num = int(input("Enter a number: "))

if num < 0:
   print("Sorry, factorial does not exist for negative numbers")
elif num == 0:
   print("The factorial of 0 is 1")
else:
   print("The factorial of",num,"is",factorial(num))`.trim();

const fibonacci = `
a, b = 0, 1

while b < 80:
    c=a+b
    print(c)
    a=b
    b=c`.trim();

const palindrome = `
my_str = 'aIbohPhoBiA'

my_str = my_str.casefold()

rev_str = reversed(my_str)

if list(my_str) == list(rev_str):
   print("The string is a palindrome.")
else:
   print("The string is not a palindrome.")`.trim();

const prime = `
numprimes = input('How many primes to print?  ')
count = 0
potentialprime = 2

def primetest(potentialprime):
    divisor = 2
    while divisor <= potentialprime:
        if potentialprime == 2:
            return True
        elif potentialprime % divisor == 0:
            return False
            break
        while potentialprime % divisor != 0:
            if potentialprime - divisor > 1:
                divisor += 1
            else:
                return True

while count < int(numprimes):
    if primetest(potentialprime) == True:
        print ('Prime #' + str(count + 1), 'is', potentialprime)
        count += 1
        potentialprime += 1
    else:
        potentialprime += 1`.trim();

const interval = `
lower = 900
upper = 1000

print("Prime numbers between", lower, "and", upper, "are:")

for num in range(lower, upper + 1):
   if num > 1:
       for i in range(2, num):
           if (num % i) == 0:
               break
       else:
           print(num)`.trim();

const shuffle = `
import itertools, random

# make a deck of cards
deck = list(itertools.product(range(1,14),['Spade','Heart','Diamond','Club']))

# shuffle the cards
random.shuffle(deck)

# draw five cards
print("You got:")
for i in range(5):
   print(deck[i][0], "of", deck[i][1])`.trim();


class Logics extends Component {
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
              <h3>Armstrong</h3>
              <div style={titles}>
                <PrismCode
                  code={armstrongs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Count_Number_of_Each_Vowel</h3>
              <div style={titles}>
                <PrismCode
                  code={each_vowel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Factorial</h3>
              <div style={titles}>
                <PrismCode
                  code={factorial}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Fibonacci</h3>
              <div style={titles}>
                <PrismCode
                  code={fibonacci}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Palindrome</h3>
              <div style={titles}>
                <PrismCode
                  code={palindrome}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Prime</h3>
              <div style={titles}>
                <PrismCode
                  code={prime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>print_prime_numbers_an_interval</h3>
              <div style={titles}>
                <PrismCode
                  code={interval}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Shuffle_Deck_of_Cards</h3>
              <div style={titles}>
                <PrismCode
                  code={shuffle}
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

export default (withStyles(styles)(Logics));
