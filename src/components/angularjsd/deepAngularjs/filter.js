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

const hover = `
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.count = 0;
});


//index.html
<body ng-controller="myCtrl">
    <h1 ng-mousemove="count = count + 1">Mouse Over Me!</h1>
    <h2>{{ count }}</h2>
</body>
`.trim()

const ngClick = `
Same controoler

//index.html
    <button ng-click="count = count + 1">Click Me!</button>
    <p>{{ count }}</p>
`.trim()

const functions = `
// app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.count = 0;
    $scope.myFunction = function() {
      $scope.count++;
  }
});


//index.html
<body ng-controller="myCtrl">
    <button ng-click="myFunction()">Click Me!</button>
    <p>{{ count }}</p>
</body>
`.trim()

const Toggle = `
// app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', myCtrl)

function myCtrl($scope) {
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
};


//index.html
<body ng-controller="myCtrl">
    <div>
        <button ng-click="myFunc()">Click Me!</button>
        <div ng-show="showMe">
            <h1>Menu:</h1>
            <div>Pizza</div>
            <div>Pasta</div>
            <div>Pesce</div>
        </div>
    </div>
</body>
`.trim()

const event = `
// app.js
var app = angular.module('myApp', []);
app.controller('myCtrl', myCtrl)

function myCtrl($scope) {
    $scope.myFunc = function(myE) {
        $scope.x = myE.clientX;
        $scope.y = myE.clientY;
    }
};


// index.html
<body ng-controller="myCtrl">
    <h1 ng-mousemove="myFunc($event)">Mouse Over Me!</h1>
    <p>Coordinates: {{x + ', ' + y}}</p>
</body>
`.trim()

const updateText = `
// app.js
var app = angular.module("myApp", []); 
app.controller("MyCtrl", MyCtrl);

function MyCtrl ($scope){
    $scope.title = "Stay Home Stay Safe"
    console.log('initial title: ',$scope.title);

    $scope.changeValue = () => {
        $scope.title = "Stay Home Stay Time"
        console.log('title change: ',$scope.title);
    }
}


// index.html
<body ng-controller="MyCtrl">
    <h1 class="text-center">{{title}}</h1>
    <button ng-click="changeValue()">button</button>
</body>
`.trim()


class Filterss extends Component {
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
              <h3>AngularJS Events</h3>
              AngularJS event listeners to your HTML elements by using one or more of these directives:
              <br/>
              ng-blur<br/>
              ng-change<br/>
              ng-click<br/>
              ng-copy<br/>
              ng-cut<br/>
              ng-dblclick<br/>
              ng-focus<br/>
              ng-keydown<br/>
              ng-keypress<br/>
              ng-keyup<br/>
              ng-mousedown<br/>
              ng-mouseenter<br/>
              ng-mouseleave<br/>
              ng-mousemove<br/>
              ng-mouseover<br/>
              ng-mouseup<br/>
              ng-paste<br/>
              <br/> 
              The event directives allows us to run AngularJS functions at certain user events.
              <br/> 
An AngularJS event will not overwrite an HTML event, both events will be executed.
              <h3>Mouse Events</h3>
              Mouse events occur when the cursor moves over an element, in this order:
              <br/> 
              <br/> 
              ng-mouseover<br/> 
              ng-mouseenter<br/> 
              ng-mousemove<br/> 
              ng-mouseleave<br/> 
              Or when a mouse button is clicked on an element, in this order:
              <br/> 
              <br/> 
              ng-mousedown<br/> 
              ng-mouseup<br/> 
              ng-click<br/> 
              <br/> 
              <b>Mouse hover Example</b>
              <div style={titles}>
                <PrismCode
                  code={hover}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
       <br/>
       <br/>
       <b>The ng-click Directive</b><br/>
              <div style={titles}>
              <PrismCode
                code={ngClick}
                language="js"
                plugins={["line-numbers"]}
              />
           </div>
       <br/>
       <br/>
       <b>You can also refer to a function:</b>
       <div style={titles}>
              <PrismCode
                code={functions}
                language="js"
                plugins={["line-numbers"]}
              />
           </div>
       <br/>
       <br/>
       <b>Toggle, True/False</b>
       <div style={titles}>
              <PrismCode
                code={Toggle}
                language="js"
                plugins={["line-numbers"]}
              />
           </div>
           <br/>
           <h3>$event Object</h3>
           You can pass the $event object as an argument when calling the function.
<br/>
The $event object contains the browser's event object:
           <div style={titles}>
              <PrismCode
                code={event}
                language="js"
                plugins={["line-numbers"]}
              />
           </div>
           <br/>
           <h3>Text change on button click</h3>
           <div style={titles}>
              <PrismCode
                code={updateText}
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

export default (withStyles(styles)(Filterss));
