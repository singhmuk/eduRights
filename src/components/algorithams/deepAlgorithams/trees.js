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

const insertData = `
function Nodes(data, left, right){
  this.data=data;
  this.left=left;
  this.right=right;
  this.show=show;
}

function show(){
  return this.data;
}

function bst(){
  this.root=null;
  this.insert=insert;
}

function insert(data){
  const node=new Nodes(data,null,null)
  if(this.root === null){
    this.root=node;
  }else{
    var current=this.root;
    var parrent;
    while(current){
      parrent=current;
      if(data < current.data){
        current=current.left;
        if(current === null){
          parrent.left=node;
        }
      }else{
        current = current.right;
        if(current === null){
          parrent.right = node;
        }
      }
    }
  }
}

const obj= new bst();
obj.insert(3)
obj.insert(5)
obj.insert(2)
obj.insert(7)
obj.insert(1)

console.log(obj.root)`.trim()

const traversing = `
function Nodes(data, left, right){
  this.data=data;
  this.left=left;
  this.right=right;
  this.show=show;
}

function show(){
  return this.data;
}

function bst(){
  this.root=null;
  this.insert=insert;
}

function insert(data){
  const node=new Nodes(data,null,null)
  if(this.root === null){
    this.root=node;
  }else{
    var current=this.root;
    var parrent;
    while(current){
      parrent=current;
      if(data < current.data){
        current=current.left;
        if(current === null){
          parrent.left=node;
        }
      }else{
        current = current.right;
        if(current === null){
          parrent.right = node;
        }
      }
    }
  }
}

function inOrder(node){
  if(!(node==null)){
    inOrder(node.left);
    console.log(node.show()+ " ")
    inOrder(node.right)
  }
}

function preOrder(node) {
  if (node !== null) {
    console.log(node.show() + " ");
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  if (node !== null) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + " ");
  }
}

const obj= new bst();
obj.insert(3)
obj.insert(5)
obj.insert(2)
obj.insert(7)
obj.insert(1)

console.log(obj.root)

console.log('Inorder Traversal')
inOrder(obj.root)

console.log('Pre-Order Traversal');
preOrder(obj.root);

console.log('Post-Order Traversal');
postOrder(obj.root);`.trim()

const deleteNode = `
function Node(data,left,right){
  this.data=data;
  this.left=left;
  this.right=right;
  this.show=show;
}

function show(){
  return this.data;
}

function bst(){
  this.root=null;
  this.insert=insert;
}

function insert(data){
  const node=new Node(data,null,null);

  if(this.root===null){
    this.root=node;
  }else{
    var current=this.root;
    var parent;

    while(current){
      parent=current;
      if(data < current.data){
        current=current.left;
        if(current === null){
          parent.left = node;
        }
      }else{
        current = current.right;
        if(current === null){
          parent.right = node;
        }
      }
    }
  }
}

function inOrder(node){
  if(!(node === null)){
    inOrder(node.left)
    console.log(node.show())
    inOrder(node.right)
  }
}

function deleteNode(root, key){
  if(root === null){
    return root;
  }

  if(key < root.data){
    root.left = deleteNode(root.left, key)
  }else if(key > root.data){
    root.right = deleteNode(root.right, key)
  }else {
    if(root.left === null){
      return root.right;
    }else if(root.right === null){
      return root.right;
    }
  }
  return root;
}

const obj = new bst()
obj.insert(5)
obj.insert(6)
obj.insert(1)
obj.insert(2)
obj.insert(3)

inOrder(obj.root)

obj.root = deleteNode(obj.root, 6)
console.log('After Deleting')
inOrder(obj.root)`.trim()

const updates = `
function Node(data,left,right){
  this.data=data;
  this.left=left;
  this.right=right;
  this.show=show;
}

function show(){
  return this.data;
}

function bst(){
  this.root=null;
  this.insert=insert;
}

function insert(data){
  const node=new Node(data,null,null)
  if(this.root===null){
    this.root=node;
  }else{
    var current=this.root;
    var parrent;
    while(current){
      parrent=current;
      if(data<current.data){
        current=current.left;;
        if(current===null){
          parrent.left=node;
        }
      }else{
        current=current.right;
        if(current===null){
          parrent.right=node;
        }
      }
    }
  }
}

function inOrder(root){
  if(!(root===null)){
    inOrder(root.left)
    console.log(root.show())
    inOrder(root.right)
  }
}

function updateNode(node, target, newValue) {
  if (node === null) {
    return null;                                // Target node not found
  }

  if (target < node.data) {
    node.left = updateNode(node.left, target, newValue);
  } else if (target > node.data) {
    node.right = updateNode(node.right, target, newValue);
  } else {
    node.data = newValue;                       // Found the target node, update its data
  }

  return node;
}

const obj=new bst()
obj.insert(4)
obj.insert(1)
obj.insert(2)
obj.insert(3)

inOrder(obj.root)

console.log('Update Node');
obj.root = updateNode(obj.root, 4, 10);
inOrder(obj.root);
`.trim()

// const traversing = ``.trim()

const generateTrees = `
function Node(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function generateTrees(n) {
  if (n === 0) return [];

  // Helper function to generate BSTs recursively
  function generateBST(start, end) {
    if (start > end) return [null];
    const result = [];

    for (let i = start; i <= end; i++) {
      const leftSubtrees = generateBST(start, i - 1);
      const rightSubtrees = generateBST(i + 1, end);

      for (const leftTree of leftSubtrees) {
        for (const rightTree of rightSubtrees) {
          const root = new Node(i);
          root.left = leftTree;
          root.right = rightTree;
          result.push(root);
        }
      }
    }

    return result;
  }

  return generateBST(1, n);
}

function preOrder(node) {
  if (node !== null) {
    console.log(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }
}

const obj = generateTrees(3);

for (const tree of obj) {
  preOrder(tree);
  console.log('---');
}


//2
function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}

const generateTrees = (n) => {
  if (n === 0) return [];

  const numbers = new Array(n).fill(0).map((v, index) => index + 1)
  const memo = {}

  const compose = (number, left, right) => {
    const result = []
    for (let i = 0; i < left.length; i++) {
      for (let j = 0; j < right.length; j++) {
            const node = new TreeNode(number)
            node.left = left[i]
            node.right = right[j]
            result.push(node)
          }
        }
        return result
      }

  const aux = (list = []) => {
    const key = list.toString()
    if (memo[key] !== undefined) {
      return memo[list.toString()]
    }

    if (list.length === 0) return [null]

    memo[key] = list.reduce((acc, number) => {
        acc.push(...compose(number, aux(list.filter(x => x < number)), aux(list.filter(x => x > number)),
          ),
        )
        return acc
      },
      [],
    )
    return memo[key]
  }
  
  return aux(numbers)
}

console.log(generateTrees(3))
`.trim();

const isValidBST = `
function Nodes(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function bst() {
  this.root = null;
  this.insert = insert;
  this.isValidBST = isValidBST; 
}

function insert(data) {
  const node = new Nodes(data, null, null);
  if (this.root === null) {
    this.root = node;
  } else {
    let current = this.root;
    let parent;
    while (current) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = node;
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
        }
      }
    }
  }
}

function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.left);
    console.log(node.show() + " ");
    inOrder(node.right);
  }
}

function isValidBST(node, min = null, max = null) {
  if (node === null) return true;

  if ((min !== null && node.data <= min) || (max !== null && node.data >= max)) {
    return false;
  }

  return (
    isValidBST(node.left, min, node.data) && isValidBST(node.right, node.data, max)
  );
}

const obj = new bst();
obj.insert(3);
obj.insert(5);
obj.insert(2);
obj.insert(7);
obj.insert(1);

inOrder(obj.root);

console.log('Is Valid BST:', obj.isValidBST(obj.root));
`.trim();

const recoverTree = `
function recoverTree(root) {
  let first = null
  let second = null
  let prev = null

  const aux = (node) => {
    if (node) {
      aux(node.left)
      if (prev && prev.val > node.val) {
        if (!first) {
          first = prev
          second = node
        } else {
          second = node
        }
      }
      prev = node
      aux(node.right)
    }
  }
  aux(root)

  if (first && second) {
    const temp = first.val
    first.val = second.val
    second.val = temp
  }
}

console.log(recoverTree([1,3,null,2]))`.trim();

const isSameTree = `
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function isSameTree(p, q) {
  if (!p && !q) return true; 
  if (!p || !q) return false;                     // One of the nodes is null, they are different.
  if (p.val !== q.val) return false;              // Values are different.

  // Recursively compare left and right subtrees.
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function buildTreeFromArray(arr) {
  if (!arr || arr.length === 0) return null;

  const build = (index) => {
    if (index >= arr.length || arr[index] === null) {
      return null;
    }
    return new TreeNode(arr[index], build(2 * index + 1), build(2 * index + 2));
  };

  return build(0);
}

const tree1Array = [1, 3, null, 2];
const tree2Array = [1, 3, null, 2];

const tree1 = buildTreeFromArray(tree1Array);
const tree2 = buildTreeFromArray(tree2Array);

console.log(isSameTree(tree1, tree2)); 
`.trim();

const isSymmetric = `
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function isSymmetric(root) {
  if (!root) return true;                           // An empty tree is symmetric.

  function isMirror(left, right) {
    if (!left && !right) return true;               // Both nodes are null, they are mirrors.
    if (!left || !right) return false;              // One of the nodes is null, they are not mirrors.
    if (left.val !== right.val) return false; 

    // Check if subtrees are mirrors of each other.
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  // Start by comparing the left and right subtrees.
  return isMirror(root.left, root.right);
}

function buildTreeFromArray(arr) {
  if (!arr || arr.length === 0) return null;

  const build = (index) => {
    if (index >= arr.length || arr[index] === null) {
      return null;
    }
    return new TreeNode(arr[index], build(2 * index + 1), build(2 * index + 2));
  };

  return build(0);
}

const obj = [1, 2, 2, 3, 4, 4, 3];
const tree = buildTreeFromArray(obj);

console.log(isSymmetric(tree)); 
 `.trim();

const sortedArrayToBST = `
function sortedArrayToBST (nums = []){
  const aux = (low, high) => {
    if (low <= high) {
      const middle = Math.floor((low + high) / 2)
      const node = { val: nums[middle] }
      
      node.left = aux(low, middle - 1)
      node.right = aux(middle + 1, high)
      return node
    }
    return null
  }
  return aux(0, nums.length - 1)
}

console.log(sortedArrayToBST([3,9,20,null,null,15,7]))
`.trim();

const sortedListToBST = `
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function bst() {
  this.root = null;
  this.insert = insert;
  this.sortedArrayToBST = sortedArrayToBST;
}

function insert(data) {
  const node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node;
  } else {
    let current = this.root;
    let parent;
    while (current) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = node;
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
        }
      }
    }
  }
}

function sortedArrayToBST(arr) {
  this.root = sortedArray(arr, 0, arr.length - 1);
}

function sortedArray(arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid], null, null);

  node.left = sortedArray(arr, start, mid - 1);
  node.right = sortedArray(arr, mid + 1, end);

  return node;
}

function postOrder(node) {
  if (node !== null) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + " ");
  }
}

const obj = new bst();

obj.sortedArrayToBST([1, 2, 3, 5, 7]);
postOrder(obj.root);
`.trim();

const minDepth = `
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.insertArray = insertArray;
}

function insert(data) {
  const node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node;
  } else {
    let current = this.root;
    let parent;
    while (current) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = node;
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
        }
      }
    }
  }
}

function insertArray(arr) {
  for (const data of arr) {
    this.insert(data);
  }
}


function minDepth(root) {
  let depth = 0;
  const queue = [root];

  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();

      // If a leaf node is encountered, return the depth.
      if (currentNode.left === null && currentNode.right === null) {
        return depth;
      }

     
      if (currentNode.left !== null) {                       // Add the child nodes to the queue.
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  return depth;
}


const obj = new BST();
const sortedArray = [3,9,20,null,null,15,7];
obj.insertArray(sortedArray);

const minimumDepth = minDepth(obj.root);
console.log("Minimum Depth of Binary Tree:", minimumDepth);
`.trim();

const hasPathSum = `
function hasPathSum (root, sum){
  function aux (node, currentSum){
    if (!node) return false;

    if (node && !node.left && !node.right) {
      return (currentSum + node.val) === sum
    }
    const isLeftHas = aux(node.left, currentSum + node.val)
    const isRightHas = aux(node.right, currentSum + node.val)
    return (isLeftHas || isRightHas)
  }

  if (root === null) return false;
  return aux(root, 0)
}

console.log(hasPathSum([5,4,1],10))
`.trim();

const connect = `
function connect (root){
  if (!root) return null;
  let frontier = [root];

  while (frontier.length) {
    const next = []
    frontier.forEach((node, index) => {
      if (frontier[index + 1]) {
        node.next = frontier[index + 1]
      } else {
        node.next = null
      }
      if (node.left) {
        next.push(node.left)
      }
      if (node.right) {
        next.push(node.right)
      }
    })
    frontier = next
  }
  return root
}

console.log(connect([1,2,3,4,5,null,7]))
`.trim();


class Trees extends Component {
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
              <h3>Create Tree</h3>
              <div style={titles}>
                <PrismCode
                  code={insertData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>Traversing</h3>
              <div style={titles}>
                <PrismCode
                  code={traversing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>Delete</h3>
              <div style={titles}>
                <PrismCode
                  code={deleteNode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>Update</h3>
              <div style={titles}>
                <PrismCode
                  code={updates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>1. Unique Binary Search Trees.</h3>
              <b>Input: </b>3<br/>
              <b>Output: </b>
              [<br/>
                [1,null,3,2],<br/>
                [3,2,null,1],<br/>
                [3,1,null,null,2],<br/>
                [2,1,3],<br/>
                [1,null,2,null,3]
              ]
              <div style={titles}>
                <PrismCode
                  code={generateTrees}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Validate Binary Search Tree.</h3>
              To validate whether a binary tree is a binary search tree (BST), you can use an inorder traversal approach. In a BST, 
              when you traverse the tree in inorder, the values should be in ascending order. If they are not, the tree is not a 
              valid BST.
              <div style={titles}>
                <PrismCode
                  code={isValidBST}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Recover Binary Search Tree.</h3>
              Two elements of a binary search tree (BST) are swapped by mistake.
              <br/>
              Recover the tree without changing its structure. <br/><br/>
              <b>Input: </b> [3,1,4,null,null,2]<br/>
              <b>Output: </b> [2,1,4,null,null,3]
              <div style={titles}>
                <PrismCode
                  code={recoverTree}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Same Tree.</h3>
              Given two binary trees, write a function to check if they are the same or not.
              <br/>
              Two binary trees are considered the same if they are structurally identical and the nodes have the same value.
              <div style={titles}>
                <PrismCode
                  code={isSameTree}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Symmetric Tree.</h3>
              Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
              <div style={titles}>
                <PrismCode
                  code={isSymmetric}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Convert Sorted Array to Binary Search Tree.</h3>
              Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
              <br/>
              For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
              <div style={titles}>
                <PrismCode
                  code={sortedArrayToBST}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. Convert Sorted List to Binary Search Tree.</h3>
              Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
              <br/>
              For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
              <br/>
              <br/>
              <b>Input: </b>head = [-10,-3,0,5,9]<br/>
              <b>Output: </b>[0,-3,9,-10,null,5]
              <div style={titles}>
                <PrismCode
                  code={sortedListToBST}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>8. Minimum Depth of Binary Tree.</h3>
              The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
              <div style={titles}>
                <PrismCode
                  code={minDepth}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>9. Path Sum.</h3>
              Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
              <div style={titles}>
                <PrismCode
                  code={hasPathSum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>10. Populating Next Right Pointers in Each Node.</h3>
              Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
              <br/>
              Initially, all next pointers are set to NULL.
              <br/>
              <ul>
                <li>You may only use constant extra space.</li>
                <li>Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={connect}
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

export default (withStyles(styles)(Trees));
