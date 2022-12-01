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

const decBinar = `
binary_num,base = 0,1
decimal_num = int(input("Enter a Decimal number:")) #10

while (decimal_num > 0):
    remainder = decimal_num % 2
    binary_num = binary_num + remainder * base
    decimal_num = decimal_num // 2
    base = base * 10
print(binary_num)
`.trim();

const decimals = `
decimal_val,base = 0,1
binary_val = 1010

while (binary_val > 0):
    rem = binary_val % 10
    decimal_val = decimal_val + rem * base
    binary_val = binary_val // 10 
    base = base * 2
print(decimal_val)
`.trim();

const factorials = `
n = 4
fact = 1
for i in range(1,n+1):
   fact *= i
print(fact)
`.trim();

const firstNum = `
def printFun():
  num = 10
  for i in range(1, num):
    print(i, end=",")
  
printFun()
`.trim();

const firstNums = `
def printFun():
  num = 10
  result = 0
  for i in range(1, num):
    result += i
  print(result, end=",")
  
printFun()
`.trim();

const multiply = `
def multiply():
    num1 = 3
    num2 = 4
    product = 0
    for i in range(0, num2):
        product += num1
    print(product)
    
multiply()
`.trim();

const reverseNum = `
def printFun():
  num = 10
  for i in range(num, 0, -1):
    print(i, end=",")
  
printFun()
`.trim();

const reverseNums = `
def firstDigit():
    n = 123
    while (n > 10):
        n = n // 10
    print(n)
firstDigit()
`.trim();

const reverseNump = `
def firstEODigit():
    n=10
    for i in range(1,n):
      if(i%2==0):
        print('even',i)
      else:
        print('Odd',i)
    
firstEODigit()
`.trim();

const armstongs = `
num = 407
sum = 0
temp = num

while temp > 0:
   digit = temp % 10
   sum += digit ** 3
   temp //= 10

if num == sum:
   print(num,"is an Armstrong number")
else:
   print(num,"is not an Armstrong number")
`.trim();

const countVowel = `
vowels = 'aeiou'
str = 'Hello, have you tried our tutorial section yet?'

str = str.casefold()
count = {}.fromkeys(vowels,0)

for char in str:
   if char in count:
       count[char] += 1

print(count)
`.trim();

const fibnacci = `
a, b = 0, 1

while b < 80:
    c=a+b
    print(c)
    a=b
    b=c`.trim();

const palindrom = `
def palindrom():
  str='madam'
  str2=''
  
  for i in str:
    str2 = i + str2
  
  if(str==str2):
    print('Palindeom',str2)
  else:
    print('Not Palindrom',str2)
    
palindrom()
`.trim();

const printNums = `
for num in range(0, 10 + 1):
     for i in range(2, num):
         if (num % i) == 0:
             break
     else:
         print(num)

//2
def pyraminds():
    num = 100
    for i in range(1, num):
        count = 0
        for j in range(2, i):
            if (i % j == 0):
                count += 1
            else:
                count = count
        if(count<1):
            print(i)
pyraminds()

`.trim();

const shuffle = `
import itertools, random

deck = list(itertools.product(range(1,14),['Spade','Heart','Diamond','Club']))        # make a deck of cards
random.shuffle(deck)                                                                  # shuffle the cards

for i in range(5):
   print(deck[i][0], "of", deck[i][1])`.trim();

const star = `
n=3
for i in range (n, 0, -1):
   print((n-i) * ' ' + i * '*')
`.trim();

const double_sided_start = `
def pattern():
 n = 10
 for i in range(1,n+1):
     k =i + 1 if(i % 2 != 0) else i

     for g in range(k,n):
         if g>=k:
             print(end="  ")

     for j in range(0,k):
         if j == k - 1:
             print(" * ")
         else:
             print(" * ", end = " ")
   
pattern()
`.trim();

const print_G = `
   def Pattern(line):
       pat=""
       for i in range(0,line):
           for j in range(0,line):
               if ((j == 1 and i != 0 and i != line-1) or ((i == 0 or
                   i == line-1) and j > 1 and j < line-2) or (i == ((line-1)/2)
                   and j > line-5 and j < line-1) or (j == line-2 and
                   i != 0 and i != line-1 and i >=((line-1)/2))):
                   pat=pat+"*"
               else:
                   pat=pat+" "
           pat=pat+"nL"
       return pat
   
line = 7
print(Pattern(line)) 
`.trim();

const percentiles = `
import numpy as np

a = np.array([1,2,3,4,5,6,7])
p = np.percentile(a, 50)
print(p)
`.trim()

const int = `birth_year = input('Birth Year: ')
print(type(birth_year))
age = 2019 - int(birth_year)
print(age)
`.trim()

const Pound = `weight_lbs = input('Weight(lbs):')
weight_kg = int(weight_lbs) * 0.45
print(weight_kg)
`.trim()

const duplicate = `numbers = [5,4,3,6,7,3,6]
uniques = []
for number in numbers:
    if number not in uniques:
        uniques.append(number)
    print(uniques)
`.trim()

const maximum = `numbers = [10,3,6,2]
max = numbers[0]
for number in numbers:
    if number > max:
        max = number
print(max)


//sum of three max number
def maxSum():
    num=[2,3,5,6,0,8]
    sum=0

    num.sort()
    sum = num[-1] + num[-2] + num[-3]
    print(sum)
maxSum()

`.trim()

const tuples = `
print("Entr element separated by comma for frst tuple")
t1=tuple([eval(e) for e in input().split(',')])

print("Entr element separated by comma for second tuple")
t2=tuple([eval(e) for e in input().split(',')])

if t1==t2:
    print("Tuples")
else:
    print("Not tuples")
`.trim();

const duplicates = `
s = 'Enter a string'
i = 0
s1 = ""
for x in s:
    if s.index(x) == i:
        s1 += x
    i += 1
print(s1)
`.trim();

const dictionary = `
print("Enter three city names")
a,b,c=input(), input(), input()
if a<b<c:
    print(a,b,c)
elif a<c<b:
    print(a,c,b)
elif b<a<c:
    print(b,a,c)
elif b<c<a:
    print(b,c,a)
elif c<a<b:
    print(c,a,b)
else:
    print(c,b,a)
`.trim();


class LogicalsPy extends Component {
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
              <h3>1. Decimal-Binary</h3>
              <div style={titles}>
                <PrismCode
                  code={decBinar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Binary-Decimal</h3>
              <div style={titles}>
                <PrismCode
                  code={decimals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Factorial</h3>
              <div style={titles}>
                <PrismCode
                  code={factorials}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. First N Numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={firstNum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Sum of natural numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={firstNums}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Multiply N numbers without *</h3>
              Insteaded multiply num1 and num2, just add num1 for num2 times.
              <br />

              <div style={titles}>
                <PrismCode
                  code={multiply}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Reverse numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={reverseNum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. First digit of number</h3>
              Given number is continuously divided by 10, till it becomes lesser than 10 and greater than 0.
              and the final answer is first digit of given number.
              <div style={titles}>
                <PrismCode
                  code={reverseNums}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Odd or Even Number.</h3>
              <div style={titles}>
                <PrismCode
                  code={reverseNump}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Armstrong number</h3>
              The number whose sum of each digit powered with the total number of digits is the same as the given number.
              <div style={titles}>
                <PrismCode
                  code={armstongs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Count number of each vowel</h3>
              <div style={titles}>
                <PrismCode
                  code={countVowel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Fibonci</h3>
              <div style={titles}>
                <PrismCode
                  code={fibnacci}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Palindome</h3>
              <div style={titles}>
                <PrismCode
                  code={palindrom}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Prime number</h3>
              <div style={titles}>
                <PrismCode
                  code={printNums}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. Shuffle deck of cards</h3>
              <div style={titles}>
                <PrismCode
                  code={shuffle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Star</h3>
              <div style={titles}>
                <PrismCode
                  code={star}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Double sided star</h3>
              <div style={titles}>
                <PrismCode
                  code={double_sided_start}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Print_G</h3>
              <div style={titles}>
                <PrismCode
                  code={print_G}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. What is the easiest way to calculate percentiles when using Python?</h3>
              <div style={titles}>
                <PrismCode
                  code={percentiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Data conversion: int(), float(), bool()</h3>
              <div style={titles}>
                <PrismCode
                  code={int}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Pound convert into Kilogram</h3>
              <div style={titles}>
                <PrismCode
                  code={Pound}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Write a programe to remove duplicate in a list</h3>
              <div style={titles}>
                <PrismCode
                  code={duplicate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. Find maximum number in array</h3>
              <div style={titles}>
                <PrismCode
                  code={maximum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. Compare two tuples whether they contain the same elements in same order or nat.</h3>
              <div style={titles}>
                <PrismCode
                  code={tuples}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Remove duplicate character from the string.</h3>
              <div style={titles}>
                <PrismCode
                  code={duplicates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26. Arrange three words in dictionary order.</h3>
              <div style={titles}>
                <PrismCode
                  code={dictionary}
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

export default (withStyles(styles)(LogicalsPy));
