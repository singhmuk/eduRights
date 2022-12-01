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


const ngContro = `
var app = angular.module("ngModelEx", []);
app.controller("timeCtrl", timeCtrl);

function ngExample ($scope){
   $scope.textboxChange = function() {
       console.log("Textbox value changed");
    }
}`.trim()

const ngIndex = `<html ng-app="ngModelEx">
<head>
    <title>clock app</title>
    <script src="angular.js"></script>
    <script src="app.js"></script>
</head>

<body>
    <h1>ngModel</h1>
    <div ng-controller="ngExample">
        <input type="text" ng-change="textboxChange()" ng-model="textString"></input>
        <input type="checkbox" ng-model="boolesnValue"></input>
        <input type="date" ng-model="dateValue"></input>
        <p>
            <input type="radio" ng-model="radioValue" value="opt1"></input>
            <input type="radio" ng-model="radioValue" value="opt2"></input>
            <input type="radio" ng-model="radioValue" value="opt3"></input>
        </p>
        <div>
            <p>Text: {{textString}}</p>
            <p>Checkbox: {{boolesnValue}}</p>
            <p>Date: {{dateValue}}</p>
            <p>Radio: {{radioValue}}</p>
        </div>
    </div>        
</body>
</html>`.trim()



class NgModel extends Component {
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
      <h3>ng-model</h3>
      The ng-model directive binds the value of HTML controls (input, select, textarea) to application data.
      <br/>
      The ng-model directive can provide type validation for application data (number, e-mail, required):
      <br/>
      The ng-model directive adds/removes the following classes, according to the status of the form field:
      <br/>
      ng-empty<br/>
      ng-not-empty<br/>
      ng-touched<br/>
      ng-untouched<br/>
      ng-valid<br/>
      ng-invalid<br/>
      ng-dirty<br/>
      ng-pending<br/>
      ng-pristine<br/>
      <br/>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={ngContro}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>index.html</b>
      <div style={titles}>
      <PrismCode
        code={ngIndex}
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

export default (withStyles(styles)(NgModel));
