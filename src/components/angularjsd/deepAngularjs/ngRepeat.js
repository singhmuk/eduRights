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

const resetForm = `
<button ng-click="reset()">RESET</button>`.trim();

const ngRepeat = `
var app = angular.module("myApp", [])
  
app.controller("myCtrl", myCtrl);

function myCtrl($scope) {
  this.myList = [1,2,3,4,'hello']
}

// index.html
<body ng-controller="myCtrl as ctrl">
<div>
    <p ng-repeat="i in ctrl.myList">Hello</p>
    <p  ng-repeat="i in ctrl.myList">{{i}}</p>
</div>
</body>
`.trim()


const scopeCtre = `
var app = angular.module("myApp", [])
  
app.controller("myCtrl", myCtrl);

function myCtrl($scope) {
  $scope.myList = [1,2,3,4,'hello']
}

// index.html
<body ng-controller="myCtrl">
    <div>
        <p ng-repeat="i in myList">Hello</p>
        <p  ng-repeat="i in myList">{{i}}</p>
    </div>
</body>
`.trim();

const ngObject = `
var app = angular.module("myApp", [])
  
app.controller("myCtrl", myCtrl);

function myCtrl($scope) {
   $scope.myList = [
      {'name':"Foo", 'age':20},
      {'name':"Bar", 'age':30},
      {'name':"Baz", 'age':40},
      {'name':"Buzz", 'age':50},
      {'name':"None", 'age':60}
   ]
}


//index.html
<body ng-controller="myCtrl">
        <div  ng-repeat="obj in myList">
            <p>Element: {{ $index }}</p>
            <p>Name: {{ obj.name }}</p>
            <p>Age: {{ obj.age }}</p>
            <hr/>
    </div>
</body>
`.trim()

const moduleContro = `
//app.js
var app = angular.module("myApp", ["myHelloModule"]);
  

// myModule.js
var myHelloModule = angular.module("myApp", []);

myHelloModule.controller("myCtrl", myCtrl);

function myCtrl($scope) {
    $scope.msg = "I'm from the my module";
}


//index.html
<head>
    <script src="app.js"></script>
    <script src="myModule.js"></script>
</head>
<body ng-controller="myCtrl">
           {{msg}}
</body>
}`.trim()



class NgRepeat extends Component {
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
    <h3>Reser Form</h3>
    <div style={titles}>
        <PrismCode
          code={resetForm}
          language="js"
          plugins={["line-numbers"]}
        />
        </div>
        <br/>
      <h3>ng-repeat (with this)</h3>
      <div style={titles}>
      <PrismCode
        code={ngRepeat}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <h3>ng-repeat (with $scope)</h3>
      <div style={titles}>
      <PrismCode
        code={scopeCtre}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <h3>ng-repeate object</h3>
      <div style={titles}>
      <PrismCode
        code={ngObject}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <h3>Module</h3>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={moduleContro}
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

export default (withStyles(styles)(NgRepeat));
