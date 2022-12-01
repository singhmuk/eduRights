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


const bind = `
<body ng-init="hoursOfDay = 9">
    <p ng-if="hoursOfDay < 12">Good Morning</p>
    <p ng-if="hoursOfDay > 12">Keep on</p>
    <p>The hour of the day is: <span ng-bind="hoursOfDay + 1"></span></p>
</body>`.trim()


const printVarri = `
<body ng-init="hoursOfDay = 9">
    <p ng-if="hoursOfDay < 12">Good Morning</p>
    <p ng-if="hoursOfDay > 12">Keep on</p>
    <p>The hour of the day is: {{hoursOfDay}}</p>
</body>`.trim()


const dissabled = `
<div ng-init="mySwitch=true">
    <button ng-disabled="mySwitch">Click Me!</button><br/>
    <input type="checkbox" ng-model="mySwitch"/><br/>
    Button: {{ mySwitch }}
</div>`.trim()



class AngularCond extends Component {
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
      <h3>Bind</h3>
      <div style={titles}>
      <PrismCode
        code={bind}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <h3>Print Varriable</h3>
      <div style={titles}>
      <PrismCode
        code={printVarri}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <h3>Dissabled button</h3>
      <div style={titles}>
      <PrismCode
        code={dissabled}
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

export default (withStyles(styles)(AngularCond));
