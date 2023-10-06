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

const simple_interest = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None
            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node


obj = BinarySearchTree()
obj.insert(3)
obj.insert(5)
obj.insert(2)
obj.insert(7)
obj.insert(1)

print(obj.root.data)
`.trim();

const compound_interest = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def show(self):
        return self.data


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None
            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node


def in_order(node):
    if node is not None:
        in_order(node.left)
        print(node.show(), end=" ")
        in_order(node.right)


def pre_order(node):
    if node is not None:
        print(node.show(), end=" ")
        pre_order(node.left)
        pre_order(node.right)


def post_order(node):
    if node is not None:
        post_order(node.left)
        post_order(node.right)
        print(node.show(), end=" ")


# Create a BinarySearchTree object
obj = BinarySearchTree()
obj.insert(3)
obj.insert(5)
obj.insert(2)
obj.insert(7)
obj.insert(1)

# Print the root node
print(obj.root.data)

print("Inorder Traversal")
in_order(obj.root)

print("\nPre-Order Traversal")
pre_order(obj.root)

print("\nPost-Order Traversal")
post_order(obj.root)
`.trim();

const format = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def show(self):
        return self.data


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None

            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node


def in_order(node):
    if node is not None:
        in_order(node.left)
        print(node.show())
        in_order(node.right)


def delete_node(root, key):
    if root is None:
        return root

    if key < root.data:
        root.left = delete_node(root.left, key)
    elif key > root.data:
        root.right = delete_node(root.right, key)
    else:
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left

    return root


obj = BinarySearchTree()
obj.insert(5)
obj.insert(6)
obj.insert(1)
obj.insert(2)
obj.insert(3)

in_order(obj.root)

obj.root = delete_node(obj.root, 6)
print("After Deleting")
in_order(obj.root)
`.trim();

const sqrt = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def show(self):
        return self.data


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None

            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node


def in_order(node):
    if node is not None:
        in_order(node.left)
        print(node.show())
        in_order(node.right)


def update_node(node, target, new_value):
    if node is None:
        return None                                              # Target node not found

    if target < node.data:
        node.left = update_node(node.left, target, new_value)
    elif target > node.data:
        node.right = update_node(node.right, target, new_value)
    else:
        node.data = new_value                                 # Found the target node, update its data

    return node


obj = BinarySearchTree()
obj.insert(4)
obj.insert(1)
obj.insert(2)
obj.insert(3)

in_order(obj.root)

print("Update Node")
obj.root = update_node(obj.root, 4, 10)
in_order(obj.root)
`.trim();

const pows = `
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def generate_trees(n):
    if n == 0:
        return []

    # Helper function to generate BSTs recursively
    def generate_bst(start, end):
        if start > end:
            return [None]
        result = []

        for i in range(start, end + 1):
            left_subtrees = generate_bst(start, i - 1)
            right_subtrees = generate_bst(i + 1, end)

            for left_tree in left_subtrees:
                for right_tree in right_subtrees:
                    root = TreeNode(i)
                    root.left = left_tree
                    root.right = right_tree
                    result.append(root)

        return result

    return generate_bst(1, n)


def pre_order(node):
    if node is not None:
        print(node.val)
        pre_order(node.left)
        pre_order(node.right)


trees = generate_trees(3)

for tree in trees:
    pre_order(tree)
    print("---")
`.trim();

const triangle = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def show(self):
        return self.data


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None
            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node


def in_order(node):
    if node is not None:
        in_order(node.left)
        print(node.show(), end=" ")
        in_order(node.right)


def is_valid_bst(node, min_val=None, max_val=None):
    if node is None:
        return True

    if (min_val is not None and node.data <= min_val) or (
        max_val is not None and node.data >= max_val
    ):
        return False

    return is_valid_bst(node.left, min_val, node.data) and is_valid_bst(
        node.right, node.data, max_val
    )


obj = BinarySearchTree()
obj.insert(3)
obj.insert(5)
obj.insert(2)
obj.insert(7)
obj.insert(1)

in_order(obj.root)

print("\nIs Valid BST:", is_valid_bst(obj.root))
`.trim();

const hcf = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)


def build_tree_from_array(arr):
    if not arr or len(arr) == 0:
        return None

    def build(index):
        if index >= len(arr) or arr[index] is None:
            return None
        return TreeNode(arr[index], build(2 * index + 1), build(2 * index + 2))

    return build(0)


tree1_array = [1, 3, None, 2]
tree2_array = [1, 3, None, 2]

tree1 = build_tree_from_array(tree1_array)
tree2 = build_tree_from_array(tree2_array)

print(is_same_tree(tree1, tree2))
`.trim();

const largest = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_symmetric(root):
    if not root:
        return True  # An empty tree is symmetric.

    def is_mirror(left, right):
        if not left and not right:
            return True  # Both nodes are null, they are mirrors.
        if not left or not right:
            return False  # One of the nodes is null, they are not mirrors.
        if left.val != right.val:
            return False

        # Check if subtrees are mirrors of each other.
        return is_mirror(left.left, right.right) and is_mirror(left.right, right.left)

    # Start by comparing the left and right subtrees.
    return is_mirror(root.left, root.right)


def build_tree_from_array(arr):
    if not arr or len(arr) == 0:
        return None

    def build(index):
        if index >= len(arr) or arr[index] is None:
            return None
        return TreeNode(arr[index], build(2 * index + 1), build(2 * index + 2))

    return build(0)


obj = [1, 2, 2, 3, 4, 4, 3]
tree = build_tree_from_array(obj)

print(is_symmetric(tree))
`.trim();

const math_function = `
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def show(self):
        return self.data


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = TreeNode(data)
        if self.root is None:
            self.root = new_node
        else:
            current = self.root
            parent = None
            while current:
                parent = current
                if data < current.data:
                    current = current.left
                    if current is None:
                        parent.left = new_node
                else:
                    current = current.right
                    if current is None:
                        parent.right = new_node

    def sorted_array_to_bst(self, arr):
        self.root = self.sorted_array(arr, 0, len(arr) - 1)

    def sorted_array(self, arr, start, end):
        if start > end:
            return None

        mid = (start + end) // 2
        node = TreeNode(arr[mid])

        node.left = self.sorted_array(arr, start, mid - 1)
        node.right = self.sorted_array(arr, mid + 1, end)

        return node


def post_order(node):
    if node is not None:
        post_order(node.left)
        post_order(node.right)
        print(node.show(), end=" ")


obj = BinarySearchTree()
obj.sorted_array_to_bst([1, 2, 3, 5, 7])
post_order(obj.root)
`.trim();

const quadratic = ``.trim();

const reproducable = ``.trim();

const seed = ``.trim();

const secrets = ``.trim();

const pseudorandom = ``.trim();



class PyTree extends Component {
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
                  code={simple_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Traversing</h3>
              <div style={titles}>
                <PrismCode
                  code={compound_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Delete</h3>
              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Update</h3>
              <div style={titles}>
                <PrismCode
                  code={sqrt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Unique Binary Search Trees.</h3>
              <div style={titles}>
                <PrismCode
                  code={pows}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Validate Binary Search Tree.</h3>
              <div style={titles}>
                <PrismCode
                  code={triangle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Same Tree.</h3>
              <div style={titles}>
                <PrismCode
                  code={hcf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Symmetric Tree.</h3>
              <div style={titles}>
                <PrismCode
                  code={largest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Convert Sorted List to Binary Search Tree.</h3>
              <div style={titles}>
                <PrismCode
                  code={math_function}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Minimum Depth of Binary Tree.</h3>
              <div style={titles}>
                <PrismCode
                  code={quadratic}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>

              <div style={titles}>
                <PrismCode
                  code={reproducable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={seed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={secrets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={pseudorandom}
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

export default (withStyles(styles)(PyTree));
