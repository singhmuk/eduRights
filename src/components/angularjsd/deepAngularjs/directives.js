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
var app = angular.module("myApp", []);
app.directive("myDir", function() {
    return {
        restrict : "A",
        template : "<h1>Made by a directive!</h1>"
    };
});


//index.html
<body>
    <div my-Dir></div>
</body>
`.trim()


class Directives extends Component {
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
      <h3>Directives</h3>
      <b>The legal restrict values are:</b>
<br/>
<br/>
E for Element name<br/>
A for Attribute<br/>
C for Class<br/>
M for Comment<br/>
<br/>
By default the value is EA, meaning that both Element names and attribute names can invoke the directive.
<br/>
By adding a restrict property with the value "A", the directive can only be invoked by attributes:
<br/>
<br/>
<b>The ng-model directive adds/removes the following classes, according to the status of the form field:</b><br/>
ng-empty<br/>
ng-not-empty<br/>
ng-touched<br/>
ng-untouched<br/>
ng-valid<br/>
ng-invalid<br/>
ng-dirty<br/>
ng-pending<br/>
ng-pristine<br/>
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

export default (withStyles(styles)(Directives));
