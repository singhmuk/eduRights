import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Stcksval from '../../../assets/stcks.png';

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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


const stack = `
function fun(){
  const stack=[3];

  function pushed(item){
     stack.push(item)
  }

  function peek(){
     return stack[stack.length-1]
  }

  function printStack(){
    return stack.slice()
  }

  function poped(){
    stack.pop()
  }

  function isEmpty(){
    return stack.length ===0
  }

  return {pushed, peek, printStack, poped, isEmpty}
}

const obj= fun();
obj.pushed(1)
obj.pushed(2)
console.log(obj.printStack())

obj.poped()

console.log(obj.printStack())
console.log(obj.isEmpty())
`.trim()


class Stack extends Component {
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
              <h3>Stack</h3>
              <img src={Stcksval} alt="DeadLock" className="responsive" style={redesign} />
              <ol>
                <li>
                  In JavaScript Stack is the call stack where we push in the
                  scope of a function whenever we execute it. Programmatically, it’s just an array with
                  two principled operations push and pop.
                </li>
                <br />

                <li>
                  Can reverse the order of the
                  stack. the bottom becomes the top and the top becomes the bottom. As such, we can use
                  the array’s unshift and shift methods in place of push and pop, respectively.
                </li>
              </ol>
              <br />

              <b>Functions:</b> push, pop, peek, view, length/
              <br />
              <br />


              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>
                As the number of items grows, push/ pop becomes increasingly more performant than
                unshift/ shift because every item needs to be reindexed in the latter but not the former.
              </i>

            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Stack));
