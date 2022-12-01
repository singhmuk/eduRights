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


const hasCycle = `
const hasCycle = (head) => {
  const aux = (current, next) => {
    if (!current || !next || !next.next || !next.next.next) {
      return false
    }
    if (current === next) {
      return true
    }
    return aux(current.next, next.next.next)
  }
  if (!head || !head.next) {
    return false
  }
  return aux(head, head.next)
}

console.log(hasCycle(3,2,0,-4, 1))`.trim();

const removeNthFromEnd = `
const removeNthFromEnd = (head, n) => {
  let h1 = head
  let h2 = null
  let count = 0
  while (h1) {
    count += 1
    h1 = h1.next
    if (h2) {
      h2 = h2.next
    }
    if (count === n + 1) {
      h2 = head
    }
  }
  if (!h2) {
    return head ? head.next : null
  }
  h2.next = h2.next.next
  return head
}`.trim();

const mergeTwoLists = `
const mergeTwoLists = (l1, l2) => {
  const aux = (current1, current2, acc) => {
    if (!current1) {
      acc.next = current2
      return acc
    }
    if (!current2) {
      acc.next = current1
      return acc
    }
    if (current1.val < current2.val) {
      acc.next = {
        val: current1.val,
        next: null,
      }
      return aux(current1.next, current2, acc.next)
    }
    acc.next = {
      val: current2.val,
      next: null,
    }
    return aux(current2.next, current1, acc.next)
  }
  const head = { val: null, next: null }
  aux(l1, l2, head)
    return head.next
}`.trim();

const swap = `const swap = (a, b, arr) => { 
  if (a !== b) {
    const temp = arr[a]
    arr[a] = arr[b] 
    arr[b] = temp 
  }
}

const Heap = compareFn => (arr = []) => {
  const left = index => 2 * index + 1
  const right = index => 2 * index + 2
  const parent = index => Math.floor((index - 1) / 2)
  const size = () => arr.length

  // log(n)
  const heapify = (index) => {
    const l = left(index)
    const r = right(index)
    let current = index
    if ((l < size()) && compareFn(arr[current], arr[l]) > 0) {
      current = l
    }
    if ((r < size()) && compareFn(arr[current], arr[r]) > 0) {
      current = r
    }
    if (current !== index) {
      swap(current, index, arr)
      heapify(current)
    }
  }
  // log(n)
  const heapifyUp = (index) => {
    const p = parent(index)
    if (p >= 0 && compareFn(arr[p], arr[index]) > 0) {
      swap(p, index, arr)
      heapifyUp(p)
    }
  }
  // O(n)
  const buildHeap = () => {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      heapify(i)
    }
  }
  const extract = () => {
    swap(0, arr.length - 1, arr)
    const top = arr.pop()
    heapify(0)
    return top
  }
  const remove = (item) => {
    const index = arr.findIndex(x => compareFn(x, item) === 0)
    if (index === -1) {
      return
    }
    arr[index] = arr.pop() // eslint-disable-line
    const p = parent(index)
    if (p < 0 || compareFn(p, arr[index]) < 0) {
      heapify(index)
    } else {
      heapifyUp(index)
    }
  }
  buildHeap()
  return {
    getHeap: () => arr,
    peek: () => {
      if (arr.length === 0) {
        return null
      }
      return arr[0]
    },
    add: (item) => {
      arr.push(item)
      heapifyUp(arr.length - 1)
    },
    extract,
    remove,
    size,
  }
}

const mergeKLists = (lists = []) => {
  const minHeap = Heap((a, b) => a.val - b.val)([])
  lists.forEach((node) => {
    if (node) {
      minHeap.add(node)
    }
  })
  const head = minHeap.extract() || null
  let current = head
  while (minHeap.size() > 0) {
      console.log(minHeap.size())
    if (current.next) {
      minHeap.add(current.next)
    }
    current.next = minHeap.extract()
    current = current.next
  }
  return head
}

console.log(swap([[1,4,5],[1,3,4],[2,6]]))`.trim();


class LinkedList extends Component {
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
              <h3>Linked List</h3>
              <ol>
                <li>
                  Like arrays, Linked Lists store data elements in sequential order. Instead of keeping
                  indexes, linked lists hold pointers to other elements. The first node is called the
                  head while the last node is called the tail.
                </li>
                <br />

                <li>
                  Linked lists have constant-time insertions and deletions because we can just change the
                  pointers. To do the same operations in arrays requires linear time because subsequent
                  items need to be shifted over.
                </li>
                <br />

                <li>
                  Like arrays, linked lists can operate as stacks. It’s as simple as having the head be the
                  only place for insertion and removal.
                  <br />

                  Linked lists can also operate as queues with the help of doubly-linked list, where insertion occurs at the tail and removal
                  occurs at the head.
                </li>
                <br />

                <li>
                  Linked lists are useful on both the client and server.</li>
                <ul>
                  <li>On the client, state management libraries like Redux structure its middleware logic in a linked-list fashion. When
                    actions are dispatched, they are piped from one middleware to the next until all is visited before reaching the reducers.</li>
                  <li>On the server, web frameworks like Express also structure its middleware logic in a similar fashion. When a request is received,
                    it is piped from one middleware to the next until a response is issued.</li>
                </ul>
                <br />

                <li>Links in a linked list do not have indexes.</li>
                <li>A linked list grows and shrinks as it is edited. Do not need to predetermine it's size.</li>
              </ol>
              <br />

              <b>Functions -</b> add, remove, indexOf, elementAt, addAt, removeAt, view.
              <br />
              
              <h3>1. Linked List Cycle.</h3>
              Given head, the head of a linked list, determine if the linked list has a cycle in it.
              <br />
              There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
              <br />
              Return true if there is a cycle in the linked list. Otherwise, return false
              <div style={titles}>
                <PrismCode
                  code={hasCycle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Remove Nth Node From End of List</h3>
              <div style={titles}>
                <PrismCode
                  code={removeNthFromEnd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Merge Two Sorted Lists.</h3>
              Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.
              <div style={titles}>
                <PrismCode
                  code={mergeTwoLists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>8. Merge k Sorted Lists.</h3>
                You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
                <br/>
                Merge all the linked-lists into one sorted linked-list and return it.<br/><br/>

                <b>Example: </b><br/>

                <b>Input: </b>lists = [[1,4,5],[1,3,4],[2,6]]<br/>
                <b>Output: </b>[1,1,2,3,4,4,5,6]
              <div style={titles}>
                <PrismCode
                  code={swap}
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

export default (withStyles(styles)(LinkedList));
