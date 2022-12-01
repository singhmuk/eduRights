import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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


const app = `
//app.js
var app = angular.module('myApp', []);
var root = 'http://jsonplaceholder.typicode.com/users';

app.controller('myCtrl', function($scope, $http) {
$http({
  method:'get',
  url:'http://jsonplaceholder.typicode.com/users'
})
.then(res => {
  $scope.myData = res.data;
})
})


//index.html
<body ng-controller="myCtrl">
    <div> 
        <li ng-repeat="x in myData | filter : 'L'">
        {{ x.name }}
        <button ng-click="getResult(x)">Click</button>
     </li>
     </div>
</body>`.trim()

const custom = `
var app = angular.module('myApp', []);
  app.filter('myFormat', myFormat);
  
  function myFormat() {
      return function(x) {
          var i, c, txt = "";
          for (i = 0; i < x.length; i++) {
              c = x[i];
              if (i % 2 == 0) {
                  c = c.toUpperCase();
              }
              txt += c;
          }
          return txt;
      };
  };


  app.controller('namesCtrl', namesCtrl);
  function namesCtrl($scope) {
      $scope.names = [
          'Jani',
          'Carl',
          'Margareth',
          'Hege',
          'Joe',
          'Gustav',
          'Birgit',
          'Mary',
          'Kai'
          ];
  };`.trim()

const customIndex = `
<body  ng-controller="namesCtrl">
    <li ng-repeat="x in names">
        {{x | myFormat}}
    </li>
</body>
 `.trim()



class Fiters extends Component {
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
      <h3>Filter</h3>
      <b>Filters can be added in AngularJS to format data:</b>
<br/>
<br/>
currency Format a number to a currency format.<br/>
date Format a date to a specified format.<br/>
filter Select a subset of items from an array.<br/>
json Format an object to a JSON string.<br/>
limitTo Limits an array/string, into a specified number of elements/characters.<br/>
lowercase Format a string to lower case.<br/>
number Format a number to a string.<br/>
orderBy Orders an array by an expression.<br/>
uppercase Format a string to upper case.<br/>
<br/>
Filters can be added to expressions by using the pipe character |, followed by a filter.<br/>
<br/>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
       <br/>
      <h3>custom</h3>
      You can make your own filters by registering a new filter factory function with your module.
<br/>
The myFormat filter will format every other character to uppercase.
<br/>
<br/>
        <b>custom.js</b>
      <div style={titles}>
      <PrismCode
        code={custom}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>customIndex.html</b>
      <div style={titles}>
      <PrismCode
        code={customIndex}
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

export default (withStyles(styles)(Fiters));
