import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Stcksval from '../../../assets/stcks.png';

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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

const uniqueStr=`
function unique(){
  let str="Java is great Grails is also great";
  let uniqueStr = str.split(' ');
  
  let result=new Set(uniqueStr);
  console.log(result);
  console.log(result.size);
}

unique();
`.trim();

const non_repeating_character = `
// find sub string
function common(){
  var str='India is my home';
  var str2=str.includes('is');
  
  console.log(str2);
}

common();


// ss2
function unique() {
  const str="apple";
    let result="";

    for(let i=0; i<str.length; i++){
        let count=0
        for(let j=0; j<str.length; j++){
            if(str.charAt(i)==str.charAt(j)){
                count +=1;
            }
        }
        if(count>1){                                        //Double
    // if(count<=1){                                        //Unique
            result += str.charAt(i);
        }
    }
    console.log(result)
}

unique();


//3
function common() {
  let i, str='onely', str2='ony', result=[];

  for (i=0; i<=str.length; i++) {
    if (str2.indexOf(str[i]) == -1) result.push(str[i]);
    }

  return console.log(result.join(""));
}

common()
`.trim()

const findVowel = `
function vowel(){
  const str='appleou';
  var str2='';
  
  for(let i=0; i<str.length; i++){
    if(str[i]=='a'||str[i]=='e'||str[i]=='i'||str[i]=='o'||str[i]=='u') str2 += str[i];
    }
  console.log(str2)
}

vowel();


//2
function vowel() {
  var str='apple';
  let vowelList = 'AEIOUaeiou'
  let vowels = '';
  
   for(var i = 0; i < str.length ; i++){
      if (vowelList.indexOf(str[i]) !== -1) vowels += str[i];
      }
    console.log(vowels);
  }
  
vowel();
  
  
//3
function getCount() {
  var str = 'appleo';
  var matches;

  for (var i = 0; i < str.length; i++) {
    if (str && (matches = str.match(/[aeiou]/g))) { }
  }
  console.log(matches);
}

getCount();
  `.trim();

const combinations = `
function permu(str){
  let currentNum=[];
  let remainingNum=[];
  let result=[];

  let i,j;
  if(str.length===0) return "";
  if(str.length===1) return str;

  for(i=0; i<str.length; i++){
    currentNum = str[i];
    remainingNum = str.slice(0,i) + str.slice(i+1);

    for(j=0; j<remainingNum.length; j++){
      result.push(currentNum+permu(remainingNum)[j]);
    }
  }
  return result;
}

console.log(permu('abc'));


//
function permu(str){
  let currentNum=[];
  let currentNum2=[];
  let remainingNum=[];
  let remainingNum2=[];
  let result=[];

  let i,j;
  if(str.length===0) return "";
  if(str.length===1) return str;

  for(i=0; i<str.length; i++){
    currentNum = str[i];
    currentNum2 = str.toUpperCase()[i];
    remainingNum = str.slice(0,i) + str.slice(i+1);
    remainingNum2 = (str.slice(0,i) + str.slice(i+1)).toUpperCase();

    for(j=0; j<remainingNum.length; j++){
      result.push(currentNum+permu(remainingNum)[j]);
    }
    for(let k=0; k<remainingNum2.length; k++){
      result.push(currentNum2+permu(remainingNum2)[k]);
    }
  }
  
  return result;
}

console.log(permu('ab'));
`.trim();

const isIsomorphic = `
function longStr() {
  const str1 = 'egg';
  const str2 = 'add';

  const isIsomorphic = (str1 = '', str2 = '') => {
  if (str1.length !== str2.length) {
      return false;
  };
  for (let i = 0; i< str1.length; i++) {
      const a=str1.indexOf(str1[i]);
      const b=str2.indexOf(str2[i]);
      if (str2[a] !== str2[i] || str1[b] !== str1[i]) {
          return false;
      };
  };
  return true;
  };
  console.log(isIsomorphic(str1, str2));
}

longStr()
`.trim();

const wordBreak = `
function wordBreak (s, wordDict = []){
  const memo = {}

  function aux (current = '') {
    if (memo[current] !== undefined) return memo[current];
    if (current === s) return true;
    if (s.indexOf(current) === -1) return false;

    memo[current] = wordDict.some(word => aux(current + word))
    return memo[current]
  }
  return aux()
}

console.log(wordBreak("leetcode", wordDict = ["leet", "code"]))
`.trim();

const removeDuplicates = `
function removeDup(){
  const str = 'wwelcomee';
  const stack=[];

  for(let c of str){
    if(c===stack[stack.length - 1]){
      while(stack[stack.length - 1]===c){
        stack.pop()
      }
    }
    else {stack.push(c)}
  }
  return console.log(stack.join(''))
}

removeDup();
`.trim();

const lonStr = `
function lonStr(){
  const str = 'second item is longer than the third one';
  const arr=str.split(' ');
  
  let lgth = 0;
  let longest;
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length > lgth) {
      lgth = arr[i].length;
      longest = arr[i];
    }
  }
  
  console.log(longest);
}

lonStr();
`.trim();

const lengthOfLongestSubstring = `
function longStr() {
  const str='applaaopsf';
  let currentStr = [];
  let strLen = 0;

  for (let i=0; i<str.length; i++) {
      const currentCharPos = currentStr.indexOf(str[i]);

      if (currentCharPos !== -1) {
          currentStr.splice(0, currentCharPos + 1);
      }
      
      currentStr.push(str[i]);
      strLen = Math.max(strLen, currentStr.length);
  }
  console.log(currentStr)
  console.log(strLen);
}

longStr()
`.trim();

const ladderLength = `
function ladderLength(beginWord, endWord = '', wordList = []){
  function distance(a = '', b = ''){
    let count = 0
    for (let index = 0; index < b.length; index++) {
      if (a[index] !== b[index]) {
        count += 1
      }
    }
    return count === 1
  }

  let current = [beginWord]
  const visited = {
  }
  
  let count = 1
  while (current.length > 0) {
    const next = []
    for (const word of current) {
      if (word === endWord) {
        return count
      }
      if (!visited[word]) {
        next.push(...wordList.filter(word2 => distance(word, word2) && !visited[word2]))
      }
      visited[word] = true
    }
    count += 1
    current = next
  }
  return 0
}

console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]))
`.trim();

const longestPalindrome = `
function longestPalindrome(s = ''){
  const memo = {}

  function isPalindrome(left, right){
    if (left === right) return true;

    for (let i = left; i <= Math.floor((left + right) / 2); i++) {
      if (s[i] !== s[right - i + left]) {
        return false
      }
    }
    return true
  }

  function aux(left, right){
    if (left > right) return '';

    memo[left] = memo[left] || {}
    if (memo[left][right] !== undefined) {
      return memo[left][right]
    }
    if (isPalindrome(left, right)) {
      return s.substring(left, right + 1)
    }
    memo[left][right] = aux(left + 1, right).length > aux(left, right - 1).length
      ? aux(left + 1, right) : aux(left, right - 1)
    return memo[left][right]
  }
  return aux(0, s.length - 1)
}

console.log(longestPalindrome("babad"))`.trim();

const isPalindromes = `
function palindromNum(){
  let num=121, result=0;
  let temp=num;

  while(temp>0){
    result = result*10 + temp%10;
    temp=Math.floor(temp/10);
  }
  if(result==num) console.log('Palindrom', result)
      else{console.log('Not a Palindrom', result)}
}

palindromNum();
`.trim();

const Palindrom = `
function palindrom(){
  let i, str='madam', result='';
  
  for(i=str.length-1; i>=0; i-- ){
    result += str[i]; 
  }
  if(str==result){console.log('Palindrom', result)}
  else{console.log('Not Palindrom', result)}
}

palindrom();
`.trim()

const partition = `
function partition(s = ''){
  function isPalindrome(left, right){
    if (left === right) return true;

    for (let i = left; i <= right; i++) {
      if (s[i] !== s[right - i + left]) {
        return false
      }
    }
    return true
  }
  
  const result = []
  function aux(index = 0, current = []){
    if (index === s.length) {
      result.push(current)
    }
    for (let i = index; i < s.length; i++) {
      if (isPalindrome(index, i)) {
        aux(i + 1, [...current, s.substring(index, i + 1)])
      }
    }
  }
  aux()
  return result
}

console.log(partition("aab"))
`.trim();

const reverseWords = `
const reverseWords = str => str.split("").reverse().join("")
console.log(reverseWords("the sky is blue"))
`.trim();

class DSLogic extends Component {
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
            <b>javaScript logicals: https://beizhedenglong.github.io/leetcode-solutions/docs/edit-distance</b>
            <br/>
            <h3>1. Reverse Words in a String.</h3>
              <b>Note: </b>
              <ul>
                <li>A word is defined as a sequence of non-space characters.</li>
                <li>Input string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.</li>
                <li>You need to reduce multiple spaces between two words to a single space in the reversed string.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={reverseWords}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Unique String.</h3>
              <div style={titles}>
                <PrismCode
                  code={uniqueStr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Unique Char.</h3>
              <div style={titles}>
                <PrismCode
                  code={non_repeating_character}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Find vowel</h3>
              <div style={titles}>
                <PrismCode
                  code={findVowel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Palindrom</h3>
              <div style={titles}>
                <PrismCode
                  code={Palindrom}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Palindrome Number.</h3>
              Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
              <br/> <br/>
              Input: 121 
              <div style={titles}>
                <PrismCode
                  code={isPalindromes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Find all the combinations of a string in lowercase and uppercase (Permutation).</h3>
              <div style={titles}>
                <PrismCode
                  code={combinations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Word Break.</h3>
              Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.
              <br/>
              <br/>
              <b>Note: </b>
              <ul>
                <li>The same word in the dictionary may be reused multiple times in the segmentation.</li>
                <li>You may assume the dictionary does not contain duplicate words.</li>
              </ul>
              <br/>
              Input: s = "leetcode", wordDict = ["leet", "code"]<br/>
              Output: true<br/>
              Explanation: Return true because "leetcode" can be segmented as "leet code".
              <div style={titles}>
                <PrismCode
                  code={wordBreak}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>9. Remove All Adjacent Duplicates In String.</h3>
              <b>Input: </b>"abbaca" <br/>
              <b>Output: </b>"ca" <br/>
              <b>Explanation: </b>
              For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

              <div style={titles}>
                <PrismCode
                  code={removeDuplicates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>10. Longest Substring from a String.</h3>
              <div style={titles}>
                <PrismCode
                  code={lonStr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/> 

              <h3>11. Longest Substring Without Repeating Characters.</h3>
              <div style={titles}>
                <PrismCode
                  code={lengthOfLongestSubstring}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>            

              <h3>12. Isomorphic Strings.</h3>
              Given two strings s and t, determine if they are isomorphic.
              <br/>
              Two strings are isomorphic if the characters in s can be replaced to get t.
              <br/>
              All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.
              <br/><br/>
              Input: s = "egg", t = "add"<br/>
              Output: true<br/><br/>
              <div style={titles}>
                <PrismCode
                  code={isIsomorphic}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>13. Word Ladder.</h3>
              Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:
              <br/><br/>
              <ul>
                <li>Only one letter can be changed at a time.</li>
                <li>Each transformed word must exist in the word list.</li>
              </ul>
              <br/>
              <b>Note: </b>
              <ul>
                <li>Return 0 if there is no such transformation sequence.</li>
                <li>All words have the same length.</li>
                <li>All words contain only lowercase alphabetic characters.</li>
                <li>You may assume no duplicates in the word list.</li>
                <li>You may assume beginWord and endWord are non-empty and are not the same.</li>
              </ul>
              <br/>
              Example 1:
              <br/>
              Input:<br/>
              beginWord = "hit",<br/>
              endWord = "cog",<br/>
              wordList = ["hot","dot","dog","lot","log","cog"]<br/>
              Output: 5
              <br/><br/>

              Explanation: As one shortest transformation is "hit" - "hot" - "dot" - "dog" - "cog",
              return its length 5.
              <div style={titles}>
                <PrismCode
                  code={ladderLength}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>14. Palindrome Partitioning.</h3>
              Input: "aab"<br/><br/>
              Output:
              [<br/>
                ["aa","b"],<br/>
                ["a","a","b"]
]
              <div style={titles}>
                <PrismCode
                  code={partition}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>15. Longest Palindromic Substring.</h3>
              Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
              <br/>
              Example 1:
              <br/>
              Input: "babad"<br/>
              Output: "bab"<br/>
              Note: "aba" is also a valid answer.<br/><br/>
              Example 2:<br/>

              Input: "cbbd"<br/>
              Output: "bb"
              <div style={titles}>
                <PrismCode
                  code={longestPalindrome}
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

export default (withStyles(styles)(DSLogic));
