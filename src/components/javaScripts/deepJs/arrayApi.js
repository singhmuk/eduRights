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

const parseInts = `
const mockData = [];
const mainId = [];
const subParameters = [];
const city = [];
const matchingData = [];
const name = 'Clementina DuBuque';
var tempObj = [];
var sum = 0;
var avg = 0;
var arrayMet = [];

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json()) 
.then(mockData => {
  mockData.map(val => {
    for(var i = 0; i < mockData.length; i++){
      // console.log('api data in the loop',mockData[i])
      if(mainId === mockData[i]._id){
          // console.log('only match id',mockData[i]._id)
          mockData.map(val => {
            if(city.indexOf(val.name)===-1){
                // console.log('only unique user city',val.address)
                val.address.map(valCity => {
                    subParameters.push(valCity.city)
                    // console.log('Push city name in subParameters',subParameters)
                    
                    let newObj={"id":val._id, "name":val.name,'value':[]}
                    newObj = newObj.value.push(valCity.city)
                    // console.log('Push city name in new created object',newObj)
                    
                    var index=subParameters.indexOf(valCity._id)
                    // console.log('index value',index,":",valCity._id)
                    
                    // subParameters[index].value = subParameters[index].concat(valCity._id)
                    // console.log('index value',subParameters[index].value)
                    
                    if((valCity._id === mainId || valCity._id === mockData._id)){
                        // console.log('matching hard coded value: ',valCity._id,"=",mockData._ids,":",mainId);
                        matchingData=matchingData.concat(valCity._id);
                        // console.log('matching values: ',matchingData)
                    }
                })
            }
            
            else{
              var index=subParameters.indexOf(val.phone)
              subParameters[index].value = subParameters[index].value.concat(val.id)
              // console.log('else values: ',subParameters)
              }
          })
      }
    }
})

addData();
pickRecord();
SumAverage();
extractKey();
arrayMethod();
});


//Add data in empty array from api values
const addData = () => {
fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json()) 
.then(mockData => {
mockData.map(add => {
    mockData.push(add.name)
    
    if(add.name === name){
        // console.log('fields',mockData)
        for(let i=0; i<=mockData.length; i++){
            // console.log('Matched name',add.name)
        }
    }
})
})
// console.log('after map',mockData);
}


//Pick a record from list
const pickRecord = () => {
fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json()) 
.then(mockData => {
   mockData.map(pickRec => {
    if(pickRec._id === mainId){
        mockData.push(pickRec.email);
        // console.log('map function',mockData)
    }
    
// apiId = mockData.push(pickRec);
// console.log('method',name,";",pickRec.name)
if(pickRec.name === name){
    for(let i=0; i<=mockData[i].length; i++){
       let obj = [];
       obj.push(mockData.name)
        console.log('matching values',obj)
        }
    }
   })
})
}


//Add sum/avg of number from a list
const SumAverage = () => {
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json()) 
    .then(mockData => {
   
   mockData.map(fields => {
    tempObj.push(fields._id) 
   })
   for(let i =0; i<=tempObj.length;i++){
    sum +=tempObj[i];
    avg = sum/tempObj.length
    // console.log('sum',sum)
    }
})

//Flattening an array of arrays
const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nested.reduce((acc, it) => [...acc, ...it], []);
let sumOfArray = flat.reduce((a, b) => a+b)
// console.log('flat',flat)
// console.log('Sum ',sumOfArray)
}


//Extract key/value pair from an object
const extractKey = () => {
var data = 
       [
        {label:1, quater :'Q1', y:34},
        {label:2, quater:'Q1', y:20},
        {label:3, quater:'Q1', y:30},
 
        {label:1, quater:'Q2', y:77},
        {label:2, quater:'Q2', y:52},
        {label:3, quater:'Q2', y:3},
 
        {label:1, quater:'Q3', y:65},
        {label:2, quater:'Q3', y:12},
        {label:3, quater:'Q3', y:9},
 
        {label:1, quater:'Q4', y:77},
        {label:2, quater:'Q4', y:34},
        {label:3, quater:'Q4', y:5}
       ];
       
var quartersum = {}
data.map(function(entry) {
 quartersum[entry.label] = (quartersum[entry.label]||0) + entry.y
})

data.map(function(entry) {
 entry.percent = entry.y / quartersum[entry.label] * 100;
//  console.log(JSON.stringify(entry))
})

//    console.log('data',quartersum);
//    console.log('extract object keys',Object.keys(quartersum));
//    console.log('extract object values',Object.values(quartersum));

  for(let [key, value] of Object.entries(quartersum)){
    //   console.log('extract object property',key, value);
  }
  var percentage = parseInt((sum * 100/quartersum.length));
  console.log('percentage',percentage);
}


const arrayMethod = () => {
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json()) 
    .then(arrayMeth => {
   
   arrayMeth.map(data => {
    arrayMet.push(data._id)
    // console.log('method',arrayMet)
   })
   
   let scores = arrayMet.find(element => element > 4);
   let filterScores = arrayMet.filter(element => element > 4);
   let joinArr = filterScores.join("*");
   let spliceArr = filterScores.splice(0,2)
   let concatArr = filterScores.concat(scores,joinArr,"100");
   
    //console.log('method',filterScores)
   

   //The slice() method slices out a piece of an array into a new array.
   let sliceArr = filterScores.slice(0,2);
   let toStringArr = arrayMet.toString()
   let position = filterScores.indexOf(8)
   
   
   //The includes() method determines whether an array contains a specified element.
   let includeArr = filterScores.includes(10)
   console.log('find',includeArr)
})
}`.trim();


const arrays = `
const mockData = [];
  const mockData2 = ["Glenna Reicher", "Kurtis Weissnat", "Ervin Howell","Leanne Graham"];
  const commonElements = [];
  var str = '';
  var str2 = '';
  var dict = {};
  var obj = {};
  var objKey = [];
  var arr = [];
  var personEmail = [];

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json()) 
.then(person => {
    person.map(val => {
      mockData.push(val.name)
    })
    // console.log('push respose into mockdata',mockData)
    var common = mockData.filter(item=>{
      return mockData2.includes(item)
  })
  for(var i=0; i<=common.length; i++){
    commonElements.push(common[i])
    }
    console.log("commonElements",commonElements);
    
     commChar();
     arrToObj();
     objTOArr();
     allSum();
     displayDot();
     matchName();
  })
  
  
  //Common element in strings
const commChar = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()) 
      .then(person => {
     person.map(val => {
      str=val.name;
      str2=val.username;
       })
       
       for(var i=0; i < str.length; i++) {
        dict[str.charAt(i)] = 1;
      }
      // console.log('str',dict);
      
      var commonChars =[];
    for(var i=0; i < str2.length; i++) {
      if( dict[str2.charAt(i)] == 1) {
        commonChars.push(str2.charAt(i)); // this is optional we can simply print
      }
      // console.log('str2',commonChars);  

    }
    
    dict = commonChars.join(""); 
    // console.log('commonChars',dict);
     })
}


//convert an Array to Object
const arrToObj = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()) 
      .then(person => {
          person.map(val => {
     
    //  console.log('arr',person)
    //  console.log('obj',...person)
  })
})
}


//convert an Object to Array
const objTOArr = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()) 
      .then(person => {
     
     person.map(val => {
      obj=val
     })
    //  console.log('obj',obj)
     
     //Convert the keys to Array using - Object.keys()
     objKey = Object.keys(obj)
    //  console.log('objKey',objKey)

     //Converts the Values to Array using - Object.values()
     const objVal = Object.values(obj)
    //  console.log('objVal',objVal)

     //Converts both keys and values using - Object.entries()
     const objAll = Object.entries(obj)
    //  console.log('objAll',objAll)
  })
}


//Sum of all elements of a given array
const allSum = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()) 
      .then(person => {
     
     person.map(val=>{
      arr.push(val._id);
  })
  var sum = arr.reduce((a, i) => {
    return a + i;
  });
console.log('sum',sum)
  })
}


//Dispay dot value  
const displayDot = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json()) 
  .then(person => {
     
     person.map(val=>{
      personEmail.push(val.email);
    })
    // console.log('personEmail',personEmail)
  })
}


//Last match name
const matchName = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json()) 
  .then(person => {
     
     const mockData = [];
     const names = [];
     const apiId = '5';
     person.map(val=>{
      mockData.push(val.id);
      
      if(val._id == apiId){
        names.push(val.name)
        for(let i=0; i<=names.length; i++){
          }
          console.log('inside loop',names)
       }
    })
    
    console.log('unique id',mockData)
  })
}`.trim();


const arrObj = `
const person = {
  firstName: 'Max',
  age: 31,
  hobbies: ['Sport', 'Coocking'],
  greet(){
    console.log('Hi, I am', this.firstName);
  }
};

console.log(person[0]); //undefined
console.log(person['firstName']);

person.lastName = 'Schwarz'
console.log(person);
delete person.age;

person.greet();`.trim();

class ArraysApi extends Component {
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
              <h3>Array method</h3>
              <div style={titles}>
                <PrismCode
                  code={parseInts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Arrays to Object</h3>
              <div style={titles}>
                <PrismCode
                  code={arrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2.Array in Object</h3>
              <div style={titles}>
                <PrismCode
                  code={arrObj}
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

export default (withStyles(styles)(ArraysApi));
