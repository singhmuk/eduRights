import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Queues from '../../../assets/queues.png';

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


const queue = `
function fun(){
  const queue=[1,2,3];

  function enqueue(item){
    queue.push(item)
  }

  function printQueue(){
    return queue.slice()
  }

  function dequeue(){
    return queue.shift()
  }

  function size(){
    return queue.length;
  }

  return {enqueue, printQueue, dequeue, size}
}

const obj=fun();
obj.enqueue(1);
obj.enqueue(2);
console.log(obj.printQueue())
obj.dequeue()
console.log(obj.printQueue())
console.log(obj.size())
`.trim()


class Queue extends Component {
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
              <h3>Queue</h3>
              <img src={Queues} alt="DeadLock" className="responsive" style={redesign} />
              <ol>
                <li>
                  JavaScript is an event-driven programming language which makes it possible to support
                  non-blocking operations. Internally, the browser manages only one thread to run the
                  entire JavaScript code, using the event queue to enqueue listeners and the event loop to
                  listen for the registered events. To support asynchronicity in a single-threaded
                  environment, listener functions
                  dequeue and execute only when the call stack is empty.
                </li>
                <br />

                <li>
                  Queues are just arrays with two primary operations unshift, shift, pop and push.
                  Unshift (add) items to the end of the array, while Pop dequeues them from the
                  beginning of the array.
                </li>
              </ol>

              <div style={titles}>
                <PrismCode
                  code={queue}
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

export default (withStyles(styles)(Queue));
