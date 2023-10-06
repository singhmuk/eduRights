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


const heap = `
function HashTable() {
  const hash = {};

  function hashFunction(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % 100; // You can adjust the size of the hash table as needed.
  }

  function insert(key, value) {
    const index = hashFunction(key);
    if (!hash[index]) {
      hash[index] = {};
    }
    hash[index][key] = value;
  }

  function get(key) {
    const index = hashFunction(key);
    if (hash[index] && hash[index][key] !== undefined) {
      return hash[index][key];
    } else {
      return null; 
    }
  }

  function update(key, value) {
    const index = hashFunction(key);
    if (hash[index] && hash[index][key] !== undefined) {
      hash[index][key] = value;
    } else {
      throw new Error('Key not found');
    }
  }

  function remove(key) {
    const index = hashFunction(key);
    if (hash[index] && hash[index][key] !== undefined) {
      delete hash[index][key];
    } else {
      throw new Error('Key not found');
    }
  }

  function getAll() {
    const values = [];
    for (const index in hash) {
      const keys = Object.keys(hash[index]);
      for (const key of keys) {
        values.push(hash[index][key]);
      }
    }
    return values;
  }

  return { insert, get, update, remove, getAll };
}

const myHashTable = new HashTable();

myHashTable.insert('name', 'John');
myHashTable.insert('country', 'India');
myHashTable.insert('city', 'Noida');
myHashTable.insert('age', 30);

console.log(myHashTable.get('name')); 

myHashTable.update('age', 31);
console.log(myHashTable.get('age')); 

myHashTable.remove('age');
console.log(myHashTable.get('age')); 

console.log(myHashTable.getAll()); 
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
