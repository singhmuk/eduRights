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


const queue = `var Queue = (function () {
  
  function Queue() {                                                     
    this.queue = [];
  }

  Queue.prototype.enqueue = function (item) {
    this.queue[this.queue.length] = item;                                 //Add a value to the end of the queue.
  };

  Queue.prototype.dequeue = function () {
    if (this.queue.length === 0) {                                        //Removes the value at the front of the queue.
      throw "Queue is Empty";
    }

    var result = this.queue[0];
    this.queue.splice(0, 1);                                              //Remove the item at position 0.

    return result;
  };

  Queue.prototype.length = function () {
    return this.queue.length;                                             
  };

  Queue.prototype.peek = function () {
    return this.queue[0];                                           //Return the item at the front of the queue.
  };

 
  Queue.prototype.view = function () {
    console.log(this.queue);                                        
  };

  return Queue;

}());

var myQueue = new Queue();

myQueue.enqueue(1);
myQueue.enqueue(5);
myQueue.enqueue(76);
myQueue.enqueue(69);
myQueue.enqueue(32);
myQueue.enqueue(54);

myQueue.view();

console.log("Length: " + myQueue.length());
console.log("Front item: " + myQueue.peek());
console.log("Removed " + myQueue.dequeue() + " from front.");
console.log("New front item: " + myQueue.peek());
console.log("Removed " + myQueue.dequeue() + " from front.");
console.log("New front item: " + myQueue.peek());
myQueue.enqueue(55);
console.log("Inserted 55");
console.log("New front item: " + myQueue.peek());

for (var i = 0; i < 5; i++) {
  myQueue.dequeue();
  myQueue.view();
}

//console.log(myQueue.dequeue());                                                              // throws exception!
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
