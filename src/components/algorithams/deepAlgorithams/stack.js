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
class Stack {
  constructor() {
      this.items = []
      this.count = 0
  }

  
  push(element) {                                                             // Add element to top of stack.
      this.items[this.count] = element
      console.log('$'{element} added to '$'{this.count})
      this.count += 1
      return this.count - 1
  }

  
  
  pop() {
      if(this.count == 0) return undefined                                    // Return undefined if stack is empty.
      let deleteItem = this.items[this.count - 1]
      this.count -= 1                                                         // Return and remove top element in stack.
      console.log('$'{deleteItem} removed)
      return deleteItem
  }

  
  peek() {                                                                    // Check top element in stack.
      console.log(Top element is '$'{this.items[this.count - 1]})
      return this.items[this.count - 1]
  }

  
  isEmpty() {                                                                 // Check if stack is empty.
      console.log(this.count == 0 ? 'Stack is empty' : 'Stack is NOT empty')
      return this.count == 0
  }


  size() {                                                                     // Check size of stack.
      console.log('$'{this.count} elements in stack)
      return this.count
  }

  
  print() {                                                                     
      let str = ''
      for(let i = 0; i < this.count; i++) {
          str += this.items[i] + ' '
      }
      return str
  }

  clear() {
      this.items = []
      this.count = 0
      console.log('Stack cleared..')
      return this.items
  }
}

const stack = new Stack()

stack.isEmpty()
stack.push(100)
stack.peek()
stack.push(300)

console.log(stack.print())

stack.pop()
stack.clear()

console.log(stack.print())

stack.size()
stack.isEmpty()`.trim()


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
