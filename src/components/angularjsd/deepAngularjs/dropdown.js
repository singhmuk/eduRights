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
app.controller('myCtrl', myCtrl)

function myCtrl($scope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
};


//index.html
<body ng-controller="myCtrl">
        <select ng-model="selectedName" ng-options="x for x in names"></select>
    </body>
`.trim()

const index = `
//app.js
var app = angular.module("myApp", ['angular.filter']);
app.controller("myCtrl", myCtrl);

var dummydata = []
function myCtrl($scope,$http) {
    $http({
      method:'get',
      url:'https://jsonplaceholder.typicode.com/users'
    }).then(res => {
      $scope.dummydata = res.data;
      
      $scope.data = $scope.dummydata;
      $scope.selected = {};
      $scope.data = $scope.data;
    })
}


//index.html
<body  ng-controller="myCtrl">
    <form>
      <div class="form-group">
        <label for="caregory">Name</label>
        <select id="caregory" data-ng-model="selected.name" ng-options="option as option.name for option in data
         |  orderBy:'name'">
          <option value="">None</option>
        </select>
        <br />
        <br />
        <label for="filters">Product type</label>
        <select id="filters" ng-model="selected.address" ng-options="option as option.address for option in data 
        | unique: 'address'">
          <option value="">None</option>
        </select>
        <br>
        <br>
        <label for="filters">Price</label>
        <select id="filters" ng-model="selected.id" ng-options="option as option.id for option in data 
        | filter: { product: selected.type.product } | orderBy: 'id'">
          <option value="">None</option>
        </select>
      </div>
      <div class="form-group" ng-if="selected.id">
        <button class="btn btn-primary" ng-click="search(selected.id)">Search</button>
      </div>
      
      <div ng-if="searchPredicate">
        Searching for <b>{{searchPredicate.name}}</b> in <b>{{searchPredicate.id}}</b> 
                         with price <b>{{searchPredicate.price | currency}}</b>
        </div>
    </form>
  </body>
  `.trim()


class Dropdown extends Component {
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
      <h3>Dropdown</h3>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <h3>Three drop down select than appear search field</h3>
      <div style={titles}>
      <PrismCode
        code={index}
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

export default (withStyles(styles)(Dropdown));
