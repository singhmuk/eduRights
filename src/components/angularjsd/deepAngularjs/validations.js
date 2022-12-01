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
app.controller('validateCtrl', validateCtrl);
  
  function validateCtrl($scope) {
      $scope.user = 'John Doe';
      $scope.email = 'john.doe@gmail.com';
  }
  
  
//indes.html
  <body ng-controller="validateCtrl">
    <form name="myForm" novalidate>
    <p>Username:<br>
    <input type="text" name="user" ng-model="user" required>
        <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
        <span ng-show="myForm.user.$error.required">Username is required.</span>
        </span>
    </p>
    
    <p>Email:<br>
    <input type="email" name="email" ng-model="email" required>
        <span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">
        <span ng-show="myForm.email.$error.required">Email is required.</span>
        <span ng-show="myForm.email.$error.email">Invalid email address.</span>
        </span>
    </p>
    
    <p>
        <input type="submit"
        ng-disabled="myForm.user.$dirty && myForm.user.$invalid ||  
        myForm.email.$dirty && myForm.email.$invalid">
    </p>
    
    </form>
  </body>
  `.trim()


class Validations extends Component {
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
      <h3>Validation</h3>
      Form State and Input State<br/>
AngularJS is constantly updating the state of both the form and the input fields.
<br/>
<br/>
Input fields have the following states:
<br/>
<br/>
$untouched The field has not been touched yet<br/>
$touched The field has been touched<br/>
$pristine The field has not been modified yet<br/>
$dirty The field has been modified<br/>
$invalid The field content is not valid<br/>
$valid The field content is valid<br/>
They are all properties of the input field, and are either true or false.<br/>
<br/>
Forms have the following states:<br/>
<br/>
$pristine No fields have been modified yet<br/>
$dirty One or more have been modified<br/>
$invalid The form content is not valid<br/>
$valid The form content is valid<br/>
$submitted The form is submitted<br/>
They are all properties of the form, and are either true or false.
<br/>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
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

export default (withStyles(styles)(Validations));
