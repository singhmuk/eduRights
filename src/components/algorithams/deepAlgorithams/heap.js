import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Hash from '../../../assets/hash.png';
import Hips from '../../../assets/maxhip.png';

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


const heap = `class MinPriorityQueue {
  constructor(c) {
    this.heap = [];
    this.capacity = c;
    this.size = 0;
  }

  
  insert(key) {                               //inserts key at end and rearranges, so the binary heap in appropriate order.
    if (this.isFull()) return;
    this.heap[this.size + 1] = key;
    let k = this.size + 1;
    
    while (k > 1) {
      if (this.heap[k] < this.heap[Math.floor(k / 2)]) {
        let temp = this.heap[k];
        this.heap[k] = this.heap[Math.floor(k / 2)];
        this.heap[Math.floor(k / 2)] = temp;
      }
      k = Math.floor(k / 2);
    }
    this.size++;
  }

  
  peek() {                                                            // returns the highest priority value.
    return this.heap[1];
  }

  
  isEmpty() {                                                        
    if (0 == this.size) return true;
    return false;
  }

  
  isFull() {                                                          
    if (this.size == this.capacity) return true;
    return false;
  }


  print() {                                                          
    console.log(this.heap.slice(1));
  }
                                                                       
  heapSort() {                                                        // heap sorting done by delete function to the 
    for (let i = 1; i < this.capacity; i++) {                         //number of times of the size of the heap it returns
      this.delete();                                                  //reverse sort because it is a min priority queue.
    }
  }


  sink() {                                                            // this function reorders the heap after every delete.
    let k = 1;
    while (2 * k <= this.size || 2 * k + 1 <= this.size) {
      let minIndex;
      if (this.heap[2 * k] >= this.heap[k]) {
        if (2 * k + 1 <= this.size && this.heap[2*k+1] >= this.heap[k]) {
          break;
        }
        else if(2*k+1 > this.size){
          break;
        }
      }
      if (2 * k + 1 > this.size) {
        minIndex = this.heap[2 * k] < this.heap[k] ? 2 * k : k;
      } else {
        if (
          this.heap[k] > this.heap[2 * k] ||
          this.heap[k] > this.heap[2 * k + 1]
        ) {
          minIndex =
            this.heap[2 * k] < this.heap[2 * k + 1] ? 2 * k : 2 * k + 1;
        } else {
          minIndex = k;
        }
      }
      let temp = this.heap[k];
      this.heap[k] = this.heap[minIndex];
      this.heap[minIndex] = temp;
      k = minIndex;
    }
  }

  
  delete() {                                                            // deletes the highest priority value from the heap.
    let min = this.heap[1];
    this.heap[1] = this.heap[this.size];
    this.heap[this.size] = min;
    this.size--;
    this.sink();
    return min;
  }
}


q = new MinPriorityQueue(8);

q.insert(5);
q.insert(2);
q.insert(4);
q.insert(1);
q.insert(7);

q.print();                                                              // [ 1, 2, 3, 5, 7, 6, 4, 8 ]
q.heapSort();
q.print();                                                              // [ 8, 7, 6, 5, 4, 3, 2, 1 ]
`.trim()


class Heap extends Component {
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
              <h3>Hash Table</h3>
              <img src={Hash} alt="DeadLock" className="responsive" style={redesign} />
              <ul>
                <li>
                  A Hash Table is a dictionary-like structure that pairs keys/ values. The location in
                  memory of each pair is determined by a hash function, which accepts a key and returns the
                  address where the value should be inserted and retrieved. Collisions can result if two/
                  more keys convert to the same address. For robustness, getters and setters should
                  anticipate these events to ensure that all data can be recovered and no data is
                  overwritten.
                </li>
                <br />

                <li>
                  If we know our addresses will be in integer sequences, we can simply use Arrays to store
                  our key-value pairs. For more complex address mappings, we can use Maps or Objects. Hash
                  tables have insertion and lookup of constant time on average. Because of collisions and
                  resizing.
                </li>
              </ul>
              <br />

              <h3>Heap</h3>
              <img src={Hips} alt="DeadLock" className="responsive" style={redesign} />
              <br />

              <b>Minimum Priority Queue: </b>
              <ul>
                <li>It is a part of heap data structure</li>
                <li>
                  A heap is a specific tree based data structure in which all the nodes of tree are in a specific order.
                  that is the children are arranged in some  respect of their parents, can either be greater/ less than the parent. This makes
                  it a min priority queue or max priority queue.
                </li>
                <br />
              </ul>

              <b>Functions: </b>insert, delete, peek, isEmpty, print, heapSort, sink etc.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={heap}
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

export default (withStyles(styles)(Heap));
