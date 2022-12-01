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

const commonArray = `
var mockData=[];
var mockData2 = [6,7,8,9,23];
var commonEle = [];
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then((res) => {
        person = res.data;
        person.map(val=>{
            mockData.push(val.id)
        })

    var common = mockData.filter(item=>{
        return mockData2.includes(item)
    })

    for(var i=0; i<=common.length; i++){
        commonEle.push(common[i])
    }
    console.log("commonEle",commonEle);
    })
}`.trim()

const commonStr = `var str='';
var str2='';
var dict = {};
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        person = res.data;
        person.map(val=>{
            str=val.name;
            str2=val.username;
        })
        
        for(var i=0; i < str.length; i++) {
            dict[str.charAt(i)] = 1;
          }
          console.log('str',dict);

          var commonChars =[];
      for(var i=0; i < str2.length; i++) {
        if( dict[str2.charAt(i)] == 1) {
          commonChars.push(str2.charAt(i)); // this is optional we can simply print
        }
        console.log('str2',commonChars);  

      }
      
      dict = commonChars.join(""); 
      console.log('commonChars',dict);
    })
}`.trim()

const arrObj = `var arr = [];
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        person = res.data;
        
        console.log('arr',person)
        console.log('obj',...person)
        
       })
}`.trim()

const objArr = `var obj = {};
var objKey = [];
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        person = res.data;
        person.map(val=>{
            obj=val;
        })
        console.log('obj',obj)

        //Convert the keys to Array using - Object.keys()
        objKey = Object.keys(obj)
        console.log('objKey',objKey)

        //Converts the Values to Array using - Object.values()
        objVal = Object.values(obj)
        console.log('objVal',objVal)

        //Converts both keys and values using - Object.entries()
        objAll = Object.entries(obj)
        console.log('objAll',objAll)
       })
}`.trim()

const sumAll = `var arr=[];
var sum = 0;
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        person = res.data;
        person.map(val=>{
            arr.push(val.id);
        })
        
        var sum = arr.reduce((a, i) => {
            return a + i;
          });
        console.log('sum',sum)
       })
}`.trim()

const dotVal = `var person=[];
var personEmail=[];
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        $scope.person = res.data;
        $scope.person.map(val=>{
             personEmail.push(val.email);
        })
        console.log('personEmail',personEmail)
        $scope.personEmail=personEmail
    })
}`.trim()

const lastMatch = `
var mockData=[];
 var apiId = 10;
 var names = [];
function myCtrl($scope, $http){
    $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(mySuccess = (res) => {
        $scope.person = res.data;
        $scope.person.map(val=>{
             mockData.push(val.id);
             if(val.id == apiId){
                names.push(val.name)
                for(let i=0; i<=names.length; i++){
                    console.log('inside loop',names)
                }
             }
        })
    })
}
`.trim()

const functions = `
var app = angular.module("myApp", []);
app.controller("myCtrl", myCtrl);

var mainId=1;
var subParameters=[];
var subParametersIds=[];
var matchingData=[];

function myCtrl ($scope, $http){
      $http({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/users'
      }).then(res => {
        $scope.person = res.data;
          
        for(var i = 0; i < $scope.person.length; i++){
         // console.log('json placeholder data in loop',$scope.person[i].id)
         if(mainId == $scope.person[i].id){
             // console.log('only match id',$scope.person[i].id)
             
             $scope.person.map(score=>{
                 if(subParametersIds.indexOf(score.id)==-1){
                     // console.log('only unique records',score.id)
                     let newObj={"id":score.id, "name":score.name,'value':[]}
                     // console.log('push object',newObj)
                     $scope.newObj = newObj.value.push(score.address.zipcode)
                     // console.log('after push object',newObj)
                     subParametersIds.push(score.id);
                     $scope.subParameters = subParameters.push(newObj);
                     
                     let scores={"ids":["2"]}
                     // console.log('hard coded',scores.ids)
                     
                     var index=subParameters.indexOf(score.id)
                     // console.log('index value',index,":",score.id)
                     // subParameters[index].value = subParameters[index].concat(score.id)
                     
                     if((score.id == scores.ids || score.id == mainId)){
                         console.log('matching hard coded value: ',score.id,"=",scores.ids,":",mainId);
                         matchingData=matchingData.concat(score.id);
                         console.log('matching values: ',matchingData)
                     }
                     
                 }
                 else{
                 var index=subParameters.indexOf(score.phone)
                 subParameters[index].value = subParameters[index].value.concat(score.id)
                 }
             })
         }
     }
    })
    console.log('concate data in the array',subParameters)
 }`.trim()

const functionsH = `
<body>
    <div ng-controller="myCtrl">
        <table>
            <tr>
              <th>Country</th>
              <th>Address</th>
              <th>Geo</th>
            </tr>
            <tr ng-repeat="persons in person">
              <td>{{persons.name}}</td>
              <td>{{persons.address.street}}</td>
              <td>{{persons.address.geo.lat}}</td>
            </tr>
          </table> 
          <h1>SubParameters</h1>
          {{subParameters}}
          <br/>
          <b>New object</b>
          {{newObj}}
    </div>  
</body>
`.trim()

const empty = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', timeCtrl);
  
 var mockData=[];
 var apiId = 10;
 var names = [];
 function timeCtrl ($scope, $http){
   $http({
     method:'get',
     url:'https://jsonplaceholder.typicode.com/users'
   }).then(res => {
    $scope.person = res.data;
    $scope.person.map(fields => {
              mockData.push(fields.id);
              
              if(fields.id == apiId){
                  console.log('fields',mockData)
                  for(let i=0; i<=mockData.length; i++){
                      console.log('Matched Id',fields.id)
                  }
              }
          })
       console.log('after map',mockData);
   })
}


//index.html
<body ng-controller="myCtrl">
</body>
`.trim();

const Pick = `
var app = angular.module('myApp', []);
app.controller('myCtrl', timeCtrl);
  
var mockData=[];
var apiId = 2;
var names = ['Bret'];
nameObj = []
 function timeCtrl ($scope, $http){
   $http({
     method:'get',
     url:'https://jsonplaceholder.typicode.com/users'
   }).then(res => {
    $scope.person = res.data;
    $scope.person.map(fields => {
        if(fields.id == apiId){
            mockData.push(fields);
            console.log('map function',mockData)
        }
    // apiId = mockData.push(fields);
    if(fields.username == names){
        for(let i=0; i<=mockData.length; i++){
            nameObj.push(mockData)
        }
    }
})
console.log('inside for loop',nameObj)
console.log('after map',mockData);
});
}`.trim();

const sum = `
var app = angular.module('myApp', []);
app.controller('myCtrl', timeCtrl);
  
var tempObj = [];
var sum = 0;
var avg;
 function timeCtrl ($scope, $http){
   $http({
     method:'get',
     url:'https://jsonplaceholder.typicode.com/users'
   }).then(res => {
    $scope.person = res.data;
            $scope.person.map(fields => {
                tempObj.push(fields.id) 
        });
        for(let i =0; i<=tempObj.length;i++){
            sum +=tempObj[i];
            avg = sum/tempObj.length
            console.log('sum',sum)
            console.log('avg',avg)
        }
     });
   
//Flattening an array of arrays
     const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
     let flat = nested.reduce((acc, it) => [...acc, ...it], []);
     console.log('flat',flat)
  }`.trim();

const object = `
var percentage;
 var sum=0;
 function timeCtrl (){
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
 
 quartersum = {}
 data.map(function(entry) {
   quartersum[entry.label] = (quartersum[entry.label]||0) + entry.y
 })
 
 data.map(function(entry) {
   entry.percent = entry.y / quartersum[entry.label] * 100;
   console.log(JSON.stringify(entry))
 })
 
 console.log('data',quartersum);
 console.log('extract object keys',Object.keys(quartersum));
 console.log('extract object values',Object.values(quartersum));
 
        for(let [key, value] of Object.entries(quartersum)){
            console.log('extract object property',key, value);
        }
        percentage = parseInt((sum*100/quartersum.length));
        console.log('percentage',percentage);
}`.trim();

const Array = `
var app = angular.module('myApp', []);
app.controller('myCtrl', timeCtrl);
  
var names = [];
 function timeCtrl ($scope, $http){
   $http({
     method:'get',
     url:'https://jsonplaceholder.typicode.com/users'
   }).then(res => {
    $scope.person = res.data;
    $scope.person.map(data => {
      names.push(data.id)
    })
    let scores = names.find(element => element > 4);
    let filterScores = names.filter(element => element > 4);
    let joinArr = filterScores.join("*");
    let spliceArr = filterScores.splice(0,2)
    let concatArr = filterScores.concat(scores,joinArr,"100");
    
    //The slice() method slices out a piece of an array into a new array.
    let sliceArr = filterScores.slice(0,2);
    let toStringArr = names.toString()
    let position = filterScores.indexOf(8)
    
    //The includes() method determines whether an array contains a specified element.
    let includeArr = filterScores.includes(10)
    console.log('find',includeArr)
  });
}
`.trim();


class Logic3 extends Component {
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
              <h3>Common element in arrays</h3>
              <div style={titles}>
                <PrismCode
                  code={commonArray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Common element in strings</h3>
              <div style={titles}>
                <PrismCode
                  code={commonStr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>convert an Array to Object</h3>
              <div style={titles}>
                <PrismCode
                  code={arrObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Convert an Object into an Array </h3>
              <div style={titles}>
                <PrismCode
                  code={objArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Sum of all elements of a given array</h3>
              <div style={titles}>
                <PrismCode
                  code={sumAll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Dispay dot value</h3>
              <div style={titles}>
                <PrismCode
                  code={dotVal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Last match name</h3>
              <div style={titles}>
                <PrismCode
                  code={lastMatch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Apply deep logic</h3>
              <b>functions.js</b>
              <div style={titles}>
                <PrismCode
                  code={functions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>functions.html</b>
              <div style={titles}>
                <PrismCode
                  code={functionsH}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Add data in empty array from api values</h3>
              <div style={titles}>
                <PrismCode
                  code={empty}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Pick a record from list of records</h3>
              <div style={titles}>
                <PrismCode
                  code={Pick}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Add sum/avg of number from a list</h3>
              <div style={titles}>
                <PrismCode
                  code={sum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Avrage and keys/valuue pair extract from an object</h3>
              <div style={titles}>
                <PrismCode
                  code={object}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Array methods</h3>
              <div style={titles}>
                <PrismCode
                  code={Array}
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

export default (withStyles(styles)(Logic3));
