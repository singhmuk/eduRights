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


const Image = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', CountryCtrl)

function CountryCtrl($scope, $http){
  $http({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/users'
  }).then(res =>{
    $scope.countries = res.data;
  })
  
  $http({
    method:'get',
    url:'//upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg'})
    .then((imgs) => {
    $scope.imgs = imgs;
  })
};


//index.html
  <body ng-controller="myCtrl">
    <table>
      <tr ng-repeat="country in countries | filter:query | orderBy:'name':reverse">
        <td>{{country.name}}</td>
        <td>{{country.address.street}}</td>
        <td><img src={{imgs}} width="100"></td>
      </tr>
    </table>
  </body>
`.trim()

const fetching = `
var countryApp = angular.module('myApp', []);
countryApp.controller('myCtrl', CountryCtrl)

function CountryCtrl($scope, $http){
  $http({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/users'
  }).then(res =>{
    $scope.countries = res.data;
  })
};


//index.html
<body ng-controller="myCtrl">
    <table>
      <tr>
        <th>Country</th>
        <th>Address</th>
        <th>Geo</th>
        <th>Phone</th>
        <th>Company</th>
      </tr>
      <tr ng-repeat="country in countries">
        <td>{{country.name}}</td>
        <td>{{country.address.street}}</td>
        <td>{{country.address.geo.lat}}</td>
        <td>{{country.phone}}</td>
        <td>{{country.company.name}}</td>
      </tr>
    </table>
  </body>`.trim()


const search = `
Same controller

//index.html
<body ng-controller="myCtrl">
    Search:<input ng-model="query" type="text"/>
    <table>
      <tr>
        <th>Country</th>
        <th>Address</th>
      </tr>
      <tr ng-repeat="country in countries | filter:query">
        <td>{{country.name}}</td>
        <td>{{country.address.street}}</td>
      </tr>
    </table>
  </body>
`.trim()



const sort = `
 Same controlles

//index.html
<tr>
  <th><a href="" ng-click="sortField ='name'; reverse = !reverse">Country</a></th>
</tr>
<tr ng-repeat="country in countries | filter:query | orderBy:'name':reverse"">
  <td>{{country.name}}</td>
</tr>
`.trim()


class Controller extends Component {
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
      <h3>API</h3>
      <p>Image</p>
      <div style={titles}>
      <PrismCode
        code={Image}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
      <h3>Fetching</h3>
      <div style={titles}>
	    <PrismCode
        code={fetching}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <h3>Search</h3>
      <div style={titles}>
	    <PrismCode
        code={search}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <h3>Sort</h3>
      <div style={titles}>
	    <PrismCode
        code={sort}
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

export default (withStyles(styles)(Controller));
