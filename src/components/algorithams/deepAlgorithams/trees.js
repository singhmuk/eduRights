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


const generateTrees = `
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
function isValidBST(root) {
  const aux = (node) => {
    if (!node) return [true, null, null];

    const [leftValid, leftMin, leftMax] = aux(node.left)
    const [rightValid, rightMin, rightMax] = aux(node.right)
    let valid = leftValid && rightValid

    if (leftMax !== null && leftMax >= node.val) {
      valid = false
    }
    if (rightMin !== null && rightMin <= node.val) {
      valid = false
    }
    
    const currentMin = leftMin === null ? node.val : leftMin
    const currentMax = rightMax === null ? node.val : rightMax
    return [valid, currentMin, currentMax]
  }
  return aux(root)[0]
}

console.log(isValidBST(3))
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
function isSameTree(p, q) {
  if ((p && !q) || (!p && q)) return false;
  if (!p && !q) return true;

  const leftSame = isSameTree(p.left, q.left)
  const rightSame = isSameTree(p.right, q.right)
  
  return leftSame && rightSame && (p.val === q.val)
}

console.log(isSameTree([1,3,null,2], [1,3,null,2]))
`.trim();

const isSymmetric = `
function isSymmetric(root){
  function aux (node, level, result){
    if (!result[level]) {
      result[level] = []
    }

    if (!node) {
      result[level].push(null)
      return result
    }

    result[level].push(node.val)
    aux(node.left, level + 1, result)
    aux(node.right, level + 1, result)
    return result
  }

  function isSymmetricHelper (values = []){
    for (let i = 0; i <= values.length / 2; i++) {
      if (values[i] !== values[values.length - 1 - i]) {
        return false
      }
    }
    return true
  }

  const result = aux(root, 0, [])
  for (let i = 0; i < result.length; i++) {
    if (!isSymmetricHelper(result[i])) {
      return false
    }
  }
  return true
}

console.log(isSymmetric([1,2,2,3,4,4,3]))
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
function sortedListToBST(head) {
  const nodes = []

  while (head) {
    head.left = null
    head.right = null
    nodes.push(head)
    head = head.next
  }

  const aux = (nodes, low, high) => { 
    if (low > high) return null;

    const middle = Math.floor((low + high) / 2)
    nodes[middle].left = aux(nodes, low, middle - 1)
    nodes[middle].right = aux(nodes, middle + 1, high)
    return nodes[middle]
  }
  return aux(nodes, 0, nodes.length - 1)
}

console.log(sortedListToBST([-10,-3,0,5,9]))
`.trim();

const minDepth = `
function minDepth (root){
  if (!root) return 0;

  const aux = (node, depth) => {
    if (!node || (!node.left && !node.right)) return depth;

    if (node.left && !node.right) {
      return aux(node.left, depth + 1)
    }

    if (node.right && !node.left) {
      return aux(node.right, depth + 1)
    }

    const leftDepth = aux(node.left, depth + 1)
    const rightDepth = aux(node.right, depth + 1)
    return leftDepth < rightDepth ? leftDepth : rightDepth
  }

  return aux(root, 1)
}

console.log(minDepth([3,9,20,null,null,15,7]))
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
              Given a binary tree, determine if it is a valid binary search tree (BST).
              <br/>
              Assume a BST is defined as follows:
              <ul>
                <li>The left subtree of a node contains only nodes with keys less than the node's key.</li>
                <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
                <li>Both the left and right subtrees must also be binary search trees.</li>
              </ul>
              <br/>
              <b>Input: </b> [2,1,3]
              <b>Output: </b> true
              <br/>
              <br/>
              <b>Example 2: </b> 
              <b>Input: </b>[5,1,4,null,null,3,6]<br/>
              <b>Output: </b>false<br/>
              <b>Explanation: </b>The root node's value is 5 but its right child's value is 4.
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
