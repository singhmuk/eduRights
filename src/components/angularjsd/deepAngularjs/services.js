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


const interval = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', myCtrl);

function myCtrl($scope, $interval) {
  $interval(() => {
      $scope.theTime = new Date().toLocaleTimeString();
  }, 1000);
};


//index.html
<body ng-controller="myCtrl">
        <h1>{{theTime}}</h1>
    <p>The $interval service runs a function every specified millisecond.</p>
</body>
`.trim()

const location = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', myCtrl);
    
function myCtrl($scope, $location) {
    $scope.myUrl = $location.absUrl();
};


//index.html
<body ng-controller="myCtrl">
        <p>The url of this page is:</p>
        <h3>{{myUrl}}</h3>
</body>
`.trim()


const timeout = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', myCtrl);

function myCtrl($scope, $timeout) {
  $scope.myHeader = "Hello World!";
  $timeout(function () {
      $scope.myHeader = "How are you today?";
  }, 2000);
};


//index.html
<body ng-controller="myCtrl">
    <h1>{{myHeader}}</h1>
</body>
`.trim()
    
    
const hexafy = `
app.service('hexafy', hexafy);

function hexafy() {
  this.myFunc = function (x) {
    return x.toString(16);
  }
};`.trim()

const intervals = `
var app = angular.module('myApp', []);
    
app.service('hexafy', hexafy);

function hexafy() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
};


app.controller('myCtrl', myCtrl);

function myCtrl($scope, hexafy) {
  $scope.hex = hexafy.myFunc(255);
}`.trim()

const intervalsIndex = `
<!DOCTYPE html>
<html  ng-app="myApp" >
<script src="angular.js"></script>
<script src="app.js"></script>

<body>
    <div ng-controller="myCtrl">
        <p>The hexadecimal value of 255 is:</p>
        <h1>{{hex}}</h1>
    </div>
    
    <p>A custom service with a method that converts a given number into a hexadecimal number.</p>
    
</body>
</html>`.trim()


const factory = `
var mod = angular.module("MyModule", []);

mod.provider("myFactory", myFactory);

function myFactory() {
  this.$get = function() {
      console.log("myFactoryFunction.$get() called."); // ADDED this line
      return "My Value";
  };
};

mod.controller("MyController", function(myFactory) {
  console.log("MyController - myFactory: " + myFactory);
});

mod.controller("MyController2", function(myFactory) { // ADDED this controller
  console.log("MyController2 - myFactory: " + myFactory);
});


//index.html
<body>
<div ng-controller="MyController"></div>
<div ng-controller="MyController2"></div>
</body>
`.trim();


const provider = `
var mod = angular.module("MyModule", []);

mod.provider("myProvider", myProvider);

function myProvider() {
  this.$get = function() {
      console.log("MyProviderFunction.$get() called."); // ADDED this line
      return "My Value";
  };
};

mod.controller("MyController", function(myProvider) {
  console.log("MyController - myProvider: " + myProvider);
});

mod.controller("MyController2", function(myProvider) { // ADDED this controller
  console.log("MyController2 - myProvider: " + myProvider);
});


//index.html
<body>
    <div ng-controller="MyController"></div>
    <div ng-controller="MyController2"></div>
</body>
`.trim();

const service = `
var mod = angular.module("MyModule", []);

mod.service("myService", myService);

function myService() { // CHANGED "factory" to "service"
// NOTE that the only function being passed is the object constructor from before
this.getValue = function() {
    return "My Value";
};
};

mod.controller("MyController", function(myService) {
console.log("MyController - myService: " + myService.getValue());
});

mod.controller("MyController2", function(myService) {
console.log("MyController2 - myService: " + myService.getValue());
});


//index,html
<body>
    <div ng-controller="MyController"></div>
    <div ng-controller="MyController2"></div>
</body>`.trim();


class Services extends Component {
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
      <h3>Services</h3>
      The $interval service is AngularJS' version of the window.setInterval function.
      <br/>
      <b>interval.js</b>
      <div style={titles}>
      <PrismCode
        code={interval}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <h3>built-in $location service to get the absolute url of the page</h3>
        In AngularJS, a service is a function, or object, that is available for, and limited to, your AngularJS application.
        <br/>
AngularJS has about 30 built-in services. One of them is the $location service.
<br/>
The $location service has methods which return information about the location of the current web page:
      <div style={titles}>
      <PrismCode
        code={location}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <h3>This header will change after two seconds</h3>
        The $timeout service runs a function after a specified number of milliseconds.
        <br/>
        The $timeout service is AngularJS' version of the window.setTimeout function.
      <div style={titles}>
      <PrismCode
        code={timeout}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
      <h1>Custom Services</h1>
        <b>hexafy.js</b>
      <div style={titles}>
      <PrismCode
        code={hexafy}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>intervals.js</b>
      <div style={titles}>
      <PrismCode
        code={intervals}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>intervalsIndex.html</b>
      <div style={titles}>
      <PrismCode
        code={intervalsIndex}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <h3>Services vs Provider vs Factory</h3>
      <div style={titles}>
      <PrismCode
        code={factory}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <h3>Provider</h3>
      <div style={titles}>
      <PrismCode
        code={provider}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <h3>Services</h3>
      <div style={titles}>
      <PrismCode
        code={service}
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

export default (withStyles(styles)(Services));
