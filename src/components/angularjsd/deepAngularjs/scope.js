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

const scope = `
//app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});


//index.html
  <body ng-controller="myCtrl">
    <input ng-model="name">
    <h1>My name is {{name}}</h1>
  </body>
`.trim()


class Scope extends Component {
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
      <h3>Scope</h3>
      The scope is the binding part between the HTML (view) and the JavaScript (controller).
<br/>
The scope is an object with the available properties and methods.
<br/>
The scope is available for both the view and the controller.
<br/>
When adding properties to the $scope object in the controller, the view (HTML) gets access to these properties.
<br/>
In the view, you do not use the prefix $scope, you just refer to a property name
<br/>
<br/>
<b>If we consider an AngularJS application to consist of:</b>
<br/>
View, which is the HTML.<br/>
Model, which is the data available for the current view.<br/>
Controller, which is the JavaScript function that makes/changes/removes/controls the data.<br/>
Then the scope is the Model.<br/>
<br/>

The scope is a JavaScript object with properties and methods, which are available for both the view and the controller.
<br/>
<br/>
All applications have a $rootScope which is the scope created on the HTML element that contains the ng-app directive.
<br/>
The rootScope is available in the entire application.
<br/>
If a variable has the same name in both the current scope and in the rootScope, the application uses the one in the current scope.
<br/>
<br/>
A variable named "color" exists in both the controller's scope and in the rootScope:
<br/>
<br/>
      <h3>Inpute text show on UI</h3>
      <div style={titles}>
      <PrismCode
        code={scope}
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

export default (withStyles(styles)(Scope));
