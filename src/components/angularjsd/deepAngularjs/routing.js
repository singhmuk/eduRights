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
var app = angular.module('routingApp', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'Default.html'}).
            when('/one', {templateUrl: 'One.html', controller: OneController}).
            when('/two', {templateUrl: 'Two.html', controller: TwoController}).
            when('/three', {templateUrl: 'Three.html', controller: ThreeController}).
            otherwise({redirectTo: '/error', templateUrl:'RouteMissingError.html'});
    }]);`.trim()

const OneController = `
function OneController($scope){
  $scope.doSomething = function(){
      alert('Hello from OneController');
  };
}`.trim()

const TwoController = `
function TwoController($scope){
  $scope.doSomething = function(){
      alert('Hello from TwoController');
  };
}`.trim()

const ThreeController = `
function ThreeController($scope){
  $scope.doSomething = function(){
      alert('Hello from ThreeController');
  };
}`.trim()

const one = `<button class="btn btn-warning" ng-click='doSomething()'>ONE!</button>`.trim()

const two = `<button class="btn btn-warning" ng-click='doSomething()'>TWO!</button>`.trim()

const three = `<button class="btn btn-warning" ng-click='doSomething()'>Three!</button>`.trim()

const Default = `<h2>Default!</h2>`.trim()

const index = `
<!DOCTYPE html>
<html>
<head>
    <title>Routing</title>

    <link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
    <script src="app.js"></script>
    <script src="OneController.js"></script>
    <script src="TwoController.js"></script>
    <script src="ThreeController.js"></script>
    
    <style type="text/css">
      
    </style>

</head>

<body ng-app="routingApp">

    <h1>Routing</h1>

    <a href="#one">Section One</a>
    <a href="#two">Section Two</a>
    <a href="#three">Section Three</a>

    <div ng-view></div>
    
		<div class="modal-footer">
			<a href="#" id="lock-block-ok" class="btn btn-danger" ng-click="lockBlockOk()">
				Ok
			</a>
			<a href="#" id="cancel-end-complete" class="btn btn-warning" ng-click="lockBlockCancel()">
				Cancel
			</a>

		</div>


</body>
</html>`.trim()


class Routing extends Component {
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
      <h3>Routing</h3>
      <b>OneController.js</b>
      <div style={titles}>
      <PrismCode
        code={OneController}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>TwoController.js</b>
      <div style={titles}>
      <PrismCode
        code={TwoController}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>ThreeController.js</b>
      <div style={titles}>
      <PrismCode
        code={ThreeController}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
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
        <b>one.html</b>
      <div style={titles}>
      <PrismCode
        code={one}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>two.html</b>
      <div style={titles}>
      <PrismCode
        code={two}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>three.html</b>
      <div style={titles}>
      <PrismCode
        code={three}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>Default.html</b>
      <div style={titles}>
      <PrismCode
        code={Default}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>index.html</b>
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

export default (withStyles(styles)(Routing));
