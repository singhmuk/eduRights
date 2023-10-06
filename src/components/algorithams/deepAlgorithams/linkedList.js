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

const simple = `
function createList(data){
  const head={value:data, next:null};
  let tail=null;

  function append(item){
    let newnode={value:item, next:null}

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function print(){
    let currentNode=head;
    let current='';

    while(currentNode){
      current += currentNode.value;
      if(currentNode.next){
        current += '->'
      }
      currentNode=currentNode.next;
    }
    console.log(current)
  }

  return {append, print}
}

const obj=new createList(2);
obj.append(1)
obj.append(3)
obj.print()
`.trim();

const traversing = `
function createList(data){
  const head={value:data, next:null};
  let tail=null;

  function append(item){
    let newnode={value:item, next:null}

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing(){
    let mapnode=head;

    while(mapnode){
      console.log(mapnode.value);
      mapnode=mapnode.next
    }
  }

  return {append, traversing}
}

const obj=new createList(2);
obj.append(1)
obj.append(3)
obj.traversing()
`.trim();

const deleted = `
function createList(data){
  const head={value:data, next:null};
  let tail=null;
  let size=1;

  function append(item){
    let newnode={value:item, next:null}

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing(){
    let mapnode=head;

    while(mapnode){
      console.log(mapnode.value);
      mapnode=mapnode.next
    }
  }

  function deletes(index){
    let lend=head;
    let counter=1;

    while(counter < index-1){
      lend=lend.next;
      counter++;
    }
    if(lend.next){
      let nextNode=lend.next.next;
      lend.next=nextNode;
    }
    size -= 1;
  }

  return {append, traversing, deletes}
}

const obj=new createList(2);
obj.append(1)
obj.append(3)
obj.deletes(1)
obj.traversing()
`.trim();

const searche = `
function createList(data) {
  let head = { value: data, next: null };
  let tail = null;

  function append(item){
    const newnode={value:item, next:null}
    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function searche(data){
    let result = undefined;
    let lead= head;
    
    while (lead !== null) {
      if (lead.value === data) {
        result = lead;
        break; 
      }
      lead = lead.next;
    }
    
    console.log(result);
  }

  return { append, searche };
}

const obj = createList(1);
obj.append(2);
obj.append(3);
obj.searche(2)
`.trim();

const hasCycle = `
function createList(data) {
  const head = { value: data, next: null };
  let tail = null;

  function append(item){
    let newnode={value:item, next:null}

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing() {
    let currentNode = head;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  function cyclic() {
    tail.next = head;
  }

  function breakCycle() {
    tail.next = null;
  }

  return { append, traversing, cyclic, breakCycle };
}

const list = createList(1);
list.append(2);
list.append(4);

// list.cyclic();
list.traversing();
list.breakCycle();
`.trim();

const removeNthFromEnd = `
function createList(data) {
  const head = { value: data, next: null };
  let tail=null;

  function append(item){
    let newnode={value:item, next:null}

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing() {
    let currentNode = head;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  function removeNthFromEnd(data) {
    let fast = head;
    let slow = head;
    let prev = null;

    // Move the fast pointer N nodes ahead
    for (let i = 0; i < data; i++) {
      fast = fast.next;
    }

    // Move both pointers until the fast pointer reaches the end
    while (fast) {
      fast = fast.next;
      prev = slow;
      slow = slow.next;
    }

    // Now, slow points to the Nth node from the end
    // Remove the Nth node by updating the next pointer of the node before it
    if (prev) {
      prev.next = slow.next;
    } else {
      head = slow.next;
    }

  }

  return { append, traversing, removeNthFromEnd };
}

const list = createList(1);
list.append(2);
list.append(4);

console.log("After removing 2nd node from the end:");
list.removeNthFromEnd(2);
list.traversing();
`.trim();

const mergeTwoLists = `
function createList(data) {
  return { value: data, next: null };
}

function createLinked() {
  return { head: null }; 
}

function append(linkedList, item) {
  const newNode = createList(item);

  if (linkedList.head === null) {
    linkedList.head = newNode;
  } else {
    let temp = linkedList.head;
    while (temp.next !== null){
      temp = temp.next;
    }
    temp.next = newNode;
  }
}

function traversing(linkedList) {
  let currentNode = linkedList.head;

  while (currentNode) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
}

function sortMerge(headA, headB) {
  let dummyNode = createList(0);
  let tail = dummyNode;
  while (true) {
    if (headA === null) {
      tail.next = headB;
      break;
    }
    if (headB === null) {
      tail.next = headA;
      break;
    }

    if (headA.value <= headB.value) {
      tail.next = headA;
      headA = headA.next;
    } else {
      tail.next = headB;
      headB = headB.next;
    }

    tail = tail.next;
  }
  return dummyNode.next;
}

function mergeAndPrintSortedLists() {
  let llist1 = createLinked();
  let llist2 = createLinked();

  append(llist1, 5);
  append(llist1, 10);
  append(llist1, 15);

  append(llist2, 2);
  append(llist2, 3);
  append(llist2, 20);

  llist1.head = sortMerge(llist1.head, llist2.head);
  traversing(llist1);
}

mergeAndPrintSortedLists();
`.trim();

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

              <h3>Append</h3>
              <div style={titles}>
                <PrismCode
                  code={simple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Traversing</h3>
              <div style={titles}>
                <PrismCode
                  code={traversing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Delete</h3>
              <div style={titles}>
                <PrismCode
                  code={deleted}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Search</h3>
              <div style={titles}>
                <PrismCode
                  code={searche}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
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
              To remove the Nth node from the end of a singly linked list, you can use a two-pointer approach. 
              <div style={titles}>
                <PrismCode
                  code={removeNthFromEnd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <b>break</b>
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
