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

const password = `
def password_check(passwd):
    SpecialSym = ['$', '@', '#', '%']
    val = True

    if len(passwd) < 6:
        print('length should be 6')
        val = False

    if len(passwd) > 20:
        print('length should not > 20')
        val = False

    if not any(char.isdigit() for char in passwd):
        print('Password should have at least one numeral')
        val = False

    if not any(char.isupper() for char in passwd):
        print('Password should have at least one uppercase letter')
        val = False

    if not any(char.islower() for char in passwd):
        print('Password should have at least one lowercase letter')
        val = False

    if not any(char in SpecialSym for char in passwd):
        print('Password should have at least one of the symbols $@#')
        val = False
    if val:
        return val


def main():
    passwd = 'Geek12@'

    if (password_check(passwd)):
        print("Password is valid")
    else:
        print("Invalid Password !!")


if __name__ == '__main__':
    main()`.trim();

const usingRegex = `
import re

def main():
    passwd = 'Geek12@'
    reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
    
    pat = re.compile(reg)                                                                   # compiling regex
    mat = re.search(pat, passwd)                                                            # searching regex

    if mat:
        print("Password is valid.")
    else:
        print("Password invalid !!")


if __name__ == '__main__':
    main()`.trim();

const generators = `
import random
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 
          'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

print("Welcome to the PyPassword Generator!")
nr_letters = int(input("How many letters would you like in your password?: "))
nr_symbols = int(input(f"How many symbols would you like?: "))
nr_numbers = int(input(f"How many numbers would you like?: "))

#Eazy Level
password = ""

for char in range(1, nr_letters + 1):
  password += random.choice(letters)

for char in range(1, nr_symbols + 1):
  password += random.choice(symbols)

for char in range(1, nr_numbers + 1):
  password += random.choice(numbers)

print(password)


#Hard Level
password_list = []

for char in range(1, nr_letters + 1):
  password_list.append(random.choice(letters))

for char in range(1, nr_symbols + 1):
  password_list += random.choice(symbols)

for char in range(1, nr_numbers + 1):
  password_list += random.choice(numbers)

random.shuffle(password_list)                                                         #print(password_list)

password = ""
for char in password_list:
  password += char

print(f"Your password is: {password}")`.trim();

const searching = `
import re

regex = r"([a-zA-Z]+) (\d+)"

match = re.search(regex, "I was born on June 24")

if match != None:
	print ("Match at index %s, %s" % (match.start(), match.end()))
	print ("Full match: %s" % (match.group(0)))
	print ("Month: %s" % (match.group(1)))
	print ("Day: %s" % (match.group(2)))

else:
	print ("The regex pattern does not match.")



#2 
def findMonthAndDate(string):
    regex = r"([a-zA-Z]+) (\d+)"
    match = re.match(regex, string)

    if match == None:
        print("Not a valid date")
        return

    print("Given Data: %s" % (match.group()))
    print("Month: %s" % (match.group(1)))
    print("Day: %s" % (match.group(2)))

findMonthAndDate("Jun 24")
print("")
findMonthAndDate("I was born on June 24")



#3 
string = """Hello my Number is 123456789 and
			my friend's number is 987654321"""

regex = '\d+'

match = re.findall(regex, string)
print(match)`.trim();

const syntex = `
[]  Represent a character class
^   Matches the beginning
$   Matches the end
.   Matches any character except newline
?   Matches zero or one occurrence.
|   Means OR (Matches with any of the characters separated by it.
*   Any number of occurrences (including 0 occurrences)
+   One or more occurrences
{}  Indicate number of occurrences of a preceding RE  to match.
()  Enclose a group of REs


#2
# class [abcde] will match with string with 'a', 'b', 'c', 'd', 'e'.
p = re.compile('[a-e]')

#3
print(p.findall("Aye, said Mr. Gibenson Stark"))


#4
p = re.compile('\d')                                                           
print(p.findall("I went to him at 11 A.M. on 4th July 1886"))

p = re.compile('\d+')                                             
print(p.findall("I went to him at 11 A.M. on 4th July 1886"))



#5
p = re.compile('\w')                                                 
print(p.findall("He said * in some_lang."))

p = re.compile('\w+')                                                 
print(p.findall("I went to him at 11 A.M., he said *** in some_language."))

p = re.compile('\W')                                                 
print(p.findall("he said *** in some_language."))


#6
p = re.compile('ab*')                                              
print(p.findall("ababbaabbb"))


#7
from re import split

print(split('\W+', 'Words, words , Words'))            
print(split('\W+', "Word's words Words"))

print(split('\W+', 'On 12th Jan 2016, at 11:02 AM'))
print(split('\d+', 'On 12th Jan 2016, at 11:02 AM'))              #Splitting occurs at '12', '2016', '11', '02' only


#8
Function sub()

print(re.sub('ub', '~*' , 'Subject has Uber booked already', flags = re.IGNORECASE))
                                    
print(re.sub('ub', '~*' , 'Subject has Uber booked already'))     # Case Sensitivity, 'Ub' in "Uber", will not be reaplced.
                                    
print(re.sub('ub', '~*' , 'Subject', count=1, flags = re.IGNORECASE))      # count=1, maximum times replacement occurs is 1.
                                    
print(re.sub(r'\sAND\s', ' & ', 'Baked', flags=re.IGNORECASE))        # 'r' before the patter denotes RE, \s is for start 
                                                                    #and end of a String.


#9
Function subn()
print(re.subn('ub', '~*' , 'Subject booked already'))
t = re.subn('ub', '~*' , 'Subject booked already', flags = re.IGNORECASE)
print(t)
print(len(t))

print(t[0])


#10 
Function escape()

print(re.escape("This is Awseome even 1 AM"))
print(re.escape("I Asked what is this [a-9], he said \t ^WoW"))`.trim();

// const list = ``.trim();

// const list = ``.trim();


class Regex extends Component {
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
              <h3>Password validation Without using Regex</h3>
              <div style={titles}>
                <PrismCode
                  code={password}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using regex</h3>
              <div style={titles}>
                <PrismCode
                  code={usingRegex}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Password Generator</h3>
              <div style={titles}>
                <PrismCode
                  code={generators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Searching an occurrence of pattern</h3>
              <ul>
                <li><b>re.search(): </b>either returns None (if the pattern doesn’t match), or a <b>re.MatchObject</b> that contains information about
                  the matching part of the string. This method stops after the first match, so this is best suited for testing a regular expression more
                  than extracting data.</li>
                <li><b>re.match(): </b>Matching a Pattern with Text.</li>
                <li><b>re.findall(): </b>Finding all occurrences of a pattern. Return all non-overlapping matches of pattern in string.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={searching}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Syntex</h3>
              <ul>
                <li><b>Function compile(): </b>Regular expressions are compiled into pattern objects, which have methods for various
                  operations such as searching for pattern matches or performing string substitutions.</li>
                <li><b>compile(): </b>creates regular expression character class [a-e], which is equivalent to [abcde].</li>
                <li><b>findall(): </b>searches for the Regular Expression and return a list upon finding.</li>
                <li>Set class [s,.] will match any whitespace character, ‘,’, or,’.’ .</li>
                <li><b>:d </b>is equivalent to [0-9].</li>
                <li><b>:d+ </b>match a group on [0-9], group of one or greater size.</li>
                <li><b>w: </b>equivalent to [a-zA-Z0-9_].</li>
                <li><b>w+: </b>matches to group of alphanumeric character.</li>
                <li><b>W: </b>matches to non alphanumeric characters.</li>
                <li><b>W+: </b>denotes Non-Alphanumeric Characters or group of characters.</li>
                <li><b>ub: </b>matches the string at "Subject" and "Uber".</li>
                <li><b>escape(): </b>returns a string with BackSlash '', before every Non-Alphanumeric Character.</li>
                <li><b>*: </b>replaces the no. of occurrence of a character.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={syntex}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              {/* <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={list}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={list}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Regex));
