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


const output = `
x = ['ab', 'cd']
print(len(list(map(list, x))))
`.trim()

const find = `1.	set([[1,2],[3,4],[4,5]])
2.	set([1,2,2,3,4,5])
3.	{1,2,3,4}
4.	set((1,2,3,4))
`.trim()

const palindrome = `s1 = string
s = string[::-1]

if(s1 == s):
    return 'true'
else:
    return 'false'

print(fun('madam'))
`.trim()

const sum = `
def sum(num):
    if len(num) == 1:
        return num[0]
    else:
        return num[0] + sum(num[1:])

print(sum([2, 4, 5, 6, 7]))
`.trim()

const random = `import random

def read_random(fname):
    lines = open(fname).read().splitlines()
    return random.choice(lines)
`.trim()

const randomize = `
#random() have <shuffle(<list>)> which can randomize any input sequence.

import random

list = [2, 18, 8, 4]

print("Prior Shuffling - 0", list)
random.shuffle(list)

print("After Shuffling - 1", list)
random.shuffle(list)

print("After Shuffling - 2", list)
`.trim()

const output_2 = `
def fast (items= []):
    items.append (1)
    return items

print (fast ())
print (fast ())
`.trim()

const blue = `name = input('what is your name? ')
favorite_color = input('What is your favorite color')
print(name + ' Likes ' + favorite_color)
`.trim()

const For = `
for item in ['Python', 'javaScrupt', 'NodeJs']:
    print(item)

for item in range(10):
    print(item)

for item in range(5, 10):
    print(item)

for item in range(5, 10, 2):
    print(item)
`.trim()

const Nested_loop = `
for x in range(4):
    for y in range(3):
        print(f'({x}, {y})')


numbers = [5, 2, 5, 2, 2]
for x_count in numbers:
    output = ''
    for count in range(x_count):
            output += 'X'
            print(output)
`.trim()

const matrix = `matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

for row in matrix:
  for item in row:
      print(item)
`.trim()

const unpacking = `coordinates = (1, 2, 3)
x, y, z = coordinates
print(x)
print(y)

coordinates = [1, 2, 3]
x, y, z = coordinates
print(z)
`.trim()

const words = `
phone = input("Phone: ")
digits_mapping = {
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four"
  }
  
output = ""
for ch in phone:
  output += digits_mapping.get(ch, "!") + " "
print(output)
  `.trim()

const EMOJ = `message = input(">")
words = message.split(' ')
emojis = {
    ":)":"*",
    ":(":"%"
}
output = ""
for word in words:
    output += emojis.get(word, word) + " "
print(output)
`.trim()

const reusable = `def emoji_converter(message):
words = message.split(" ")
emojis = {
    ":)": "*",
    ":(": "%"
}
output = ""
for word in words:
    output += emojis.get(word, word) + " "
return  output


message = input(">")
print(emoji_converter(message))
`.trim()

const random_ = `import random

for i in range(3):
    print(random.randint(10, 20))
print(random.randint(10, 20))


import random 

class Dice:
    def roll(self):
        first = random.randint(1, 6)
        second = random.randint(1, 6)
        return first, second

dice = Dice()
print(dice.roll())
`.trim()

const spreadsheet = `
import openpyxl as xl

wb = xl.load_workbook('transactions.xlsx')
sheet = wb['Sheet1']
cell = sheet['a1']
cell = sheet.cell(1, 1)
print(cell.value)

print(sheet.max_row)

for row in range(1, sheet.max_row + 1):
    print(row)

for row in range(2, sheet.max_row + 1):
    cell = sheet.cell(row, 3)
    print(cell.value)
`.trim()

const openpyxl = `import openpyxl as xl

wb = xl.load_workbook('transactions.xlsx')
sheet = wb['Sheet1']
cell = sheet['a1']
cell = sheet.cell(1, 1)

for row in range(2, sheet.max_row + 1):
    cell = sheet.cell(row, 3)
    corrected_price = cell.value * 2
    corrected_price_cell = sheet.cell(row, 4)
    corrected_price_cell = corrected_price

wb.save('transactions2.xlsx')
`.trim()

const primeMus = `
def nextPrime(n):
    while True:
        n+=1
        for i in range(2,n):

            if(n%i==0):
                break
            else:
                print(n)
                return n

nextPrime(13)`.trim();

const homogeneous = `
x=(30,4.5,26,3+4j,'abc', True, 5.6,2-1j)
t1,t2,t3,t4,t5=[], [], [], [], []

for e in x:
    if type(e) == int:
        t1.append(e)
    elif type(e) == float:
        t2.append(e)
    elif type(e) == complex:
        t3.append(e)
    elif type(e) == str:
        t4.append(e)
    elif type(e) == bool:
        t5.append(e)

t1=tuple(t1)
t2=tuple(t2)
t3=tuple(t3)
t4=tuple(t4)
t5=tuple(t5)

print(t1, t2, t3, t4, t5, sep='nL')
`.trim();

const greatest = `
print('Enter number')
t1 = tuple([int(e) for e in input().split(',')])
print('Enter Greatest number', max(t1))`.trim();

const sorted = `
t1=(10,20,30,40)
t2=(5,9,12,18,22,25)
t3=[]
i,j,k=0,0,0

while i<len(t1) and j<len(t2):
    if t1[i]<t2[j]:
        t3.append(t1[i])
        i+=1
        k+=1
    else:
        t3.append(t2[j])
        j+=1
        k+=1
        
if i==len(t1):
    while j<len(t2):
        t3.append(t2[j])
        j+=1
        k+=1
        
elif j==len(t2):
    while i<len(t1):
        t3.append(t1[i])
        i+=1
        k+=1
        
t3=tuple(t3)
print(t3)`.trim();

const occurrence = `
l=[eval(x) for x in input("Enter list elements").split(',')]
element=eval(input("Enter element value"))
index=0
while index<len(l):
    if l[index]==element:
        print(index, end='')
    index+=1`.trim();

const sequence = `
def sum(n):
    if n==1:
        return 1
    return n**2+sum(n-1)

sum(4)`.trim();

const multiple = `
def fun():
    return 1,2,3

x=fun()
print(x)`.trim();

const ascii = `
c = input("Enter a character: ")

print("The ASCII value of '" + c + "' is",ord(c)) `.trim();

const conversion = `
dec = int(input("Enter a decimal number: "))

print(bin(dec), "in binary.")
print(oct(dec), "in octal.")
print(hex(dec), "in hexadecimal." )`.trim();

const matrixs = `
X = [[12,7,3],
    [4 ,5,6],
    [7 ,8,9]]

Y = [[5,8,1,2],
    [6,7,3,0],
    [4,5,9,1]]

result = [[0,0,0,0],
         [0,0,0,0],
         [0,0,0,0]]


for i in range(len(X)):                                                             // iterate through rows of X.
   for j in range(len(Y[0])):                                                       // iterate through columns of Y.
       for k in range(len(Y)):                                                      // iterate through rows of Y.
           result[i][j] += X[i][k] * Y[k][j]

for r in result:
   print(r)
`.trim();

const towerOfHanoi = `
def TowerOfHanoi(n , source, destination, auxilliary):
    if n==1:
        print ("Move disk 1 from source",source,"to destination",destination)
        return
    TowerOfHanoi(n-1, source, auxilliary, destination)
    print ("Move disk",n,"from source",source,"to destination",destination)
    TowerOfHanoi(n-1, auxilliary, destination, source)

n = 4
TowerOfHanoi(n,'A','B','C')`.trim();

const calculator = `
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    return x / y


print("Select operation.")
print("1.Add")
print("2.Subtract")
print("3.Multiply")
print("4.Divide")

while True:
    choice = input("Enter choice(1/2/3/4): ")

    if choice in ('1', '2', '3', '4'):                                      // Check if choice is one of the four options.
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))

        if choice == '1':
            print(num1, "+", num2, "=", add(num1, num2))

        elif choice == '2':
            print(num1, "-", num2, "=", subtract(num1, num2))

        elif choice == '3':
            print(num1, "*", num2, "=", multiply(num1, num2))

        elif choice == '4':
            print(num1, "/", num2, "=", divide(num1, num2))
        break
    else:
        print("Invalid Input")
`.trim();


class PyLogic extends Component {
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
              <b>1. What is the output of the following?</b>
              <div style={titles}>
                <PrismCode
                  code={output}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Each element of x is converted into a list.</i>
              <br />
              <br />

              <b>2. Write a Python program to check whether a given string is a palindrome or not, without using an iterative method. </b>
              <div style={titles}>
                <PrismCode
                  code={palindrome}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>3. Write a Python program to calculate the sum of a list of numbers.</b>
              <div style={titles}>
                <PrismCode
                  code={sum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>4. How will you read a random line in a file?</b>
              <div style={titles}>
                <PrismCode
                  code={random}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>5. What is the function to randomize the items of a list in-place?</b>
              <div style={titles}>
                <PrismCode
                  code={randomize}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>6. What is the result of the below lines of code?</b>
              <div style={titles}>
                <PrismCode
                  code={output_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The function fast evaluates its arguments only once after the function gets defined. However, since items is a list, so it’ll get modified by appending a 1 to it.</i>
              <br />
              <br />

              <b>7. Mukesh likes blue</b>
              <div style={titles}>
                <PrismCode
                  code={blue}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>8. For</b>
              <div style={titles}>
                <PrismCode
                  code={For}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>9. Nested loop</b>
              <div style={titles}>
                <PrismCode
                  code={Nested_loop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>10. Unpacking</b>
              <div style={titles}>
                <PrismCode
                  code={unpacking}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>11. Enter Digit o/p words</b>
              <div style={titles}>
                <PrismCode
                  code={words}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>12. Print EMOJ</b>
              <div style={titles}>
                <PrismCode
                  code={EMOJ}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>13. Creating a reusable Functions</b>
              <div style={titles}>
                <PrismCode
                  code={reusable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>14. Generating random Values</b>
              <div style={titles}>
                <PrismCode
                  code={random_}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>15. Excel spreadsheet</b>
              <div style={titles}>
                <PrismCode
                  code={spreadsheet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>16. Create new colom and new excel sheet</b>
              <div style={titles}>
                <PrismCode
                  code={openpyxl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Python function to return next Prime number</h3>
              <div style={titles}>
                <PrismCode
                  code={primeMus}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Create tuples with homogeneous elements from a tuple containing homogeneous elements.</h3>
              <div style={titles}>
                <PrismCode
                  code={homogeneous}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Fing greatest number from a tuple of ini values.</h3>
              <div style={titles}>
                <PrismCode
                  code={greatest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Merge two sorted tuple.</h3>
              <div style={titles}>
                <PrismCode
                  code={sorted}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Print indices of all the occurrence of a given element in a given list.</h3>
              <div style={titles}>
                <PrismCode
                  code={occurrence}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Recursive function to calculate sum of sequence of first N natural numbers.</h3>
              <div style={titles}>
                <PrismCode
                  code={sequence}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. Return multiple values.</h3>
              <div style={titles}>
                <PrismCode
                  code={multiple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. Ascii</h3>
              <div style={titles}>
                <PrismCode
                  code={ascii}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Conversion</h3>
              <div style={titles}>
                <PrismCode
                  code={conversion}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26. Matrix</h3>
              <div style={titles}>
                <PrismCode
                  code={matrix}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Multilpy 2 Matrix</b>
              <div style={titles}>
                <PrismCode
                  code={matrixs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>27. Tower Of Hanoi</h3>
              <div style={titles}>
                <PrismCode
                  code={towerOfHanoi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>28. Calculator</h3>
              <div style={titles}>
                <PrismCode
                  code={calculator}
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

export default (withStyles(styles)(PyLogic));
