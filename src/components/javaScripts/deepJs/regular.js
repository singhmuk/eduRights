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

const oneWay = `let re = /ab+c/;`.trim();

const twoWay = `let re = new RegExp('ab+c');`.trim();

const pattern = `
function escapeRegExp(string) {
  return string.replace(/[.*+?^'$'{}()|[\]\\]/g, '\\$&');                        // $& means the whole matched string.
}`.trim();

const Parentheses = `
var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');          //script uses the exec() method to find a match in a string.
`.trim();

const special = `

function testInfo(phoneInput) {
  var OK = re.exec(phoneInput.value);
  
  if (!OK) {
    console.error(phoneInput.value + ' isn\'t a phone number with area code!');
  } else {
    console.log('Thanks, your phone number is ' + OK[0]);
  }
}`.trim();


const separated = `
//1
n+: Matches any string that contains at least one n
    {least()}
    
    function least() {
      var str = "Hellooo World! Hello W3Schools!"; 
      var patt1 = /o+/g;
      var result = str.match(patt1);
      
      return result;
    }
    
    
//2
n*: Matches any string that contains zero or more occurrences of n
    {contains()}
   
    function contains() {
      var str = "Hellooo World! Hello W3Schools!"; 
      var patt1 = /lo*/g;
      var result = str.match(patt1);
      
      return result;
    }
    
//3
n? Matches any string that contains zero or one occurrences of n
    {occurrences()}
    
    function occurrences() {
      var str = "1, 100 or 1000?";
      var patt1 = /10?/g;
      var result = str.match(patt1);
      
      return result;
    }
    `.trim();


const wildCart = `
function wildCart() {
  var str = "Visit W3Schools!"; 
  var n = str.search("W3Schools");
  
 var str = "re, green, red, green, gren, gr, blue, yellow";
 var patt1 = /(red|green)/g;
 var result = str.match(patt1);
  
  return [n,"-",result];
}`.trim();


const whiteSpace = `
function whitespace() {
  var str = "Is this all there is?";
  var patt1 = /s/g;
  var result = str.match(patt1);
  
  return result;
}`.trim();


const searchSpecial = `
function searchSpecial(){
  var str = "HELLO, LOOK AT YOU!"; 
  var patt1 = /LO/;
  var result = str.search(patt1);
  
  return result;
}`.trim();


const unicode = `
function unicode() {
  var str = "Visit W3Schools. Hello World!"; 
  var patt1 = /W/g;
  var result = str.match(patt1);
  
  return result;
}`.trim();



class RegularExp extends Component {
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
              <h3>1. Creating a regular expression in Two ways:</h3>
              1. Using a regular expression literal, which consists of a pattern enclosed between slashes
              <div style={titles}>
                <PrismCode
                  code={oneWay}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              2. Calling the constructor function of the RegExp object.
              <div style={titles}>
                <PrismCode
                  code={twoWay}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Writing a regular expression pattern</h3>
              A regular expression pattern is composed of simple characters, such as '/abc/'', or a combination
              of simple and special characters, such as '/ab*c/'' or '/Chapter (\d+)\.\d*/''. The last example
              includes parentheses, which are used as a memory device.

              <h3>Using simple patterns</h3>
              Simple patterns are constructed of characters for which you want to find a direct match.
              Ex. the pattern /abc/ matches character combinations in strings only when the exact sequence
              "abc" occurs. Such a match would succeed in the strings "Hi, do you know your abc's?"

              <h3>Using special characters</h3>
              When the search for a match requires something more than a direct match, such as finding one
              or more b's, or finding white space, you can include special characters in the pattern.
              <br />
              Ex. to match a single "a" followed by zero or more "b"s followed by "c", you'd use the
              pattern /ab*c/: the * after "b" means "0 or more occurrences of the preceding item." In the
              string "cbbabbbbcdebc", this pattern will match the substring "abbbbc".
              <br />
              <br />
              <h3>3. Escaping</h3>
              <ul>
                <li>If you need to use any of the special characters literally you must escape it by putting a backslash in front of it.</li>
                <br />
                <li>For instance, to search for "a" followed by "*" followed by "b", you'd use /a\*b/ — the backslash "escapes" the
                  "*", making it literal instead of special.</li>
                <br />
                <li>Similarly, if you're writing a regular expression literal and need to match a slash ("/"), you need to escape
                  that (otherwise, it terminates the pattern). For instance, to search for the string "/example/" followed by one
                  or more alphabetic characters, you'd use /\/example\/[a-z]+/i—the backslashes before each slash make them </li>
                <br />
                <li>To match a literal backslash, you need to escape the backslash. For instance, to match the string "C:\" where
                  "C" can be any letter, you'd use /[A-Z]:\\/ — the first backslash escapes the one after it, so the expression
                  searches for a single literal backslash.</li>
                <br />
                <li>/a\*b/ and new RegExp("a\\*b") create the same expression, which searches for "a" followed by a literal "*"
                  followed by "b".</li>
                <br />
                <li>If escape strings are not already part of your pattern you can add them using - String.replace.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={pattern}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. Using parentheses</h3>
              <ul>
                <li>Parentheses around any part of the regular expression pattern causes that part of the matched
                  substring to be remembered. Once remembered, the substring can be recalled for other use.</li>
                <br />
                <li>Regular expressions are used with the RegExp methods test() and exec() and with the String
                  methods match(), replace(), search(), and split().</li>
                <br />
                <li>
                  <b>exec():</b>
                  Executes a search for a match in a string. It returns an array of information or null on a mismatch.
                </li>

                <br />
                <li>
                  <b>test():</b>
                  Tests for a match in a string. It returns true or false.
                </li>
                <br />

                <li>
                  <b>match():</b>
                  Returns an array containing all of the matches, including capturing groups, or null if no match is found.
                </li>
                <br />

                <li>
                  <b>matchAll():</b>
                  Returns an iterator containing all of the matches, including capturing groups.
                </li>
                <br />

                <li>
                  <b>search():</b>
                  Tests for a match in a string. It returns the index of the match, or -1 if the search fails.
                </li>
                <br />

                <li>
                  <b>replace():</b>
                  Executes a search for a match in a string, and replaces the matched substring with a replacement substring.
                </li>
                <br />

                <li>
                  <b>replaceAll()</b>
                  Executes a search for all matches in a string, and replaces the matched substrings with a replacement
                  substring.
                </li>
                <br />

                <li>
                  <b>split():</b>
                  Uses a regular expression or a fixed string to break a string into an array of substrings.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={Parentheses}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Using special characters to verify input</h3>
              The user is expected to enter a phone number. When the user presses the "Check" button, the
              script checks the validity of the number. If the number is valid (matches the character sequence
              specified by the regular expression), the script shows a message thanking the user and confirming
              the number.
              <br />
              <br />
              The regular expression looks for:
              <ul>
                <li>1. three numeric characters \d{3} OR | a left parenthesis \(, followed by three digits \d{3},
                  followed by a close parenthesis \), in a non-capturing group (?:).</li>
                <li>2. followed by one dash, forward slash, or decimal point in a capturing group ().</li>
                <li>3. followed by three digits \d{3}.</li>
                <li>4. followed by the match remembered in the (first) captured group \1.</li>
                <li>5. followed by four digits \d{4}.</li>
              </ul>
              <br />
              <br />
              var re = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/;
              <div style={titles}>
                <PrismCode
                  code={special}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Regexp</h3>
              <h3>5.wildCart(.)</h3>
              <p>A regular expression is a sequence of characters that forms a search pattern.
                The search pattern can be used for text search and text replace operations.
                wildCart(.) means anythings except new character.</p>
              Ex.an -
              <ul>
                <li>man</li>
                <li>tan</li>
                <li>pan</li>
                <li>jan</li>
                <li>@an</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={wildCart}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6.white space</h3>
              <p>The RegExp \s Metacharacter in JavaScript is used to find the whitespace characters. The
                whitespace character can be a space/tab/new line/vertical character. It is same as [ \t\n\r].</p>
              <div style={titles}>
                <PrismCode
                  code={whiteSpace}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>7.SearchSpecial</h3>
              <div style={titles}>
                <PrismCode
                  code={searchSpecial}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8.unicode</h3>
              <div style={titles}>
                <PrismCode
                  code={unicode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>9.Escape Character() </h3>
              Ex .txt -
              <ul>
                <li>file.txt</li>
                <li>filestxt</li>
                <li>file1txt</li>
                <li>file2txt</li>
              </ul>
              <br />

              <h3>10. Character Sets and Ranges</h3>
              Ex [rc]ode : Match either r or c.
              <ul>
                <li>code</li>
                <li>rode</li>
                <li>dsod</li>
              </ul>
              <br />

              <p>Ranges:[a-zA-Z]ziz : </p>
              <ul>
                <li>aziz</li>
                <li>Zziz</li>
                <li>pziz</li>
                <li>dziz</li>
              </ul>
              <ul>
                <br />
                <li>[0-9]</li>
                <li>123-456-789</li>
              </ul>
              <br />
              <p>But for perfect match</p>
              <ul>
                <li>[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9]</li>
              </ul>
              <br />

              <h3>Negative Character(^)</h3>
              <p>means not match given characters in [].</p>
              <br />
              Ex [^rg]oad -
              <ul>
                <li>road</li>
                <li>goad</li>
                <li>toad</li>
                <li>dpoad</li>
                <li>eoad</li>
                <li>1ode</li>
              </ul>
              <br />

              <h3>11. Search a string for "W3Schools", and display the position</h3>
              <ul>
                <li>(x|y):Find any of the alternatives separated with |</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={separated}
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

export default (withStyles(styles)(RegularExp));
