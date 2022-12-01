import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

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



const arrow = `
let doLog = (msg) => {console.log(msg)}`.trim();

const annotations = `
let drawPoint = (point: {x:number, y:number}){
  //...
}

drawPoint({x:1, y:2});

 // Better way is use interface as
 interface Poiny{
   x:number,
   y:number
 }

let drawPoint = (point: Poiny){
  //...
}`.trim();

const constructors = `
class Point{
  x: number;
  y: number;

  constructor(x?: number, y?:number){
    this.x = x;
    this.y = y
  }

  getVal(){
    console.log(this.x, this.y)
  }
}

let obj = Point();
obj.getVal();


//Access modifier
class Point{
  constructor(private x?: number, private y?:number){ }
 // constructor(public x?: number, public y?:number){ }

  getVal(){
    console.log(this.x, this.y)
  }
}

let obj = Point();
obj.getVal();
`.trim();


class BasicTs extends Component {
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
              <h3>1. Cohesion And Coupling Principle</h3>
              <ul>
                <li>Component connection inside modules is Cohesion.</li>
                <li>Connection b/w model is coupling.</li>
                <li>High Cohesion and Low Coupling.</li>
              </ul>
              <br />

              <p>type annotation means declaye data types during varriable initializtion:</p>
              let a:number = 1;
              <br />

              

              <h3>3. Arrow function</h3>
              <div style={titles}>
                <PrismCode
                  code={arrow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Inline annotation</h3>
              <div style={titles}>
                <PrismCode
                  code={annotations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. How without passing constructor parameter run ts</h3>
              <div style={titles}>
                <PrismCode
                  code={constructors}
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

export default (withStyles(styles)(BasicTs));
