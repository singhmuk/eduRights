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
class Node:
    def __init__(self, data):
        self.value = data
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = Node(data)
        self.tail = None

    def append(self, item):
        new_node = Node(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

    def print_list(self):
        current_node = self.head
        current = ""

        while current_node:
            current += str(current_node.value)
            if current_node.next:
                current += " -> "
            current_node = current_node.next

        print(current)


obj = LinkedList(2)
obj.append(1)
obj.append(3)
obj.print_list()
`.trim();

const compound_interest = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = ListNode(data)
        self.tail = None

    def append(self, item):
        new_node = ListNode(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

    def traversing(self):
        map_node = self.head

        while map_node:
            print(map_node.value)
            map_node = map_node.next


obj = LinkedList(2)
obj.append(1)
obj.append(3)

obj.traversing()
`.trim();

const format = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = ListNode(data)
        self.tail = self.head
        self.size = 1

    def append(self, item):
        new_node = ListNode(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

        self.size += 1

    def traversing(self):
        map_node = self.head

        while map_node:
            print(map_node.value)
            map_node = map_node.next

    def deletes(self, index):
        if index < 0 or index >= self.size:
            print("Index out of bounds.")
            return

        if index == 0:
            self.head = self.head.next
        else:
            lend = self.head
            counter = 1

            while counter < index - 1:
                lend = lend.next
                counter += 1

            if lend.next:
                next_node = lend.next.next
                lend.next = next_node

        self.size -= 1


obj = LinkedList(2)
obj.append(1)
obj.append(3)
obj.deletes(1)
obj.traversing()
`.trim();

const sqrt = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = ListNode(data)
        self.tail = None

    def append(self, item):
        new_node = ListNode(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

    def searche(self, data):
        result = None
        lead = self.head

        while lead is not None:
            if lead.value == data:
                result = lead
                break
            lead = lead.next

        return result


obj = LinkedList(1)
obj.append(2)
obj.append(3)
result_node = obj.searche(2)

if result_node:
    print(f"Value found: {result_node.value}")
else:
    print("Value not found")
`.trim();

const pows = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = ListNode(data)
        self.tail = None

    def append(self, item):
        new_node = ListNode(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

    def traversing(self):
        current_node = self.head
        while current_node:
            print(current_node.value)
            current_node = current_node.next

    def cyclic(self):
        if self.head and self.tail:
            self.tail.next = self.head

    def breakCycle(self):
        if self.head and self.tail:
            self.tail.next = None


list = LinkedList(1)
list.append(2)
list.append(4)

# list.cyclic()
list.traversing()
# list.breakCycle()
`.trim();

const triangle = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self, data):
        self.head = ListNode(data)
        self.tail = None

    def append(self, item):
        new_node = ListNode(item)

        if self.tail is None:
            self.head.next = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

    def traversing(self):
        current_node = self.head
        while current_node:
            print(current_node.value)
            current_node = current_node.next

    def removeNthFromEnd(self, n):
        fast = self.head
        slow = self.head
        prev = None

        # Move the fast pointer N nodes ahead
        for _ in range(n):
            fast = fast.next

        # Move both pointers until the fast pointer reaches the end
        while fast:
            fast = fast.next
            prev = slow
            slow = slow.next

        # Now, slow points to the Nth node from the end
        # Remove the Nth node by updating the next pointer of the node before it
        if prev:
            prev.next = slow.next
        else:
            self.head = slow.next


list = LinkedList(1)
list.append(2)
list.append(4)

print("After removing 2nd node from the end:")
list.removeNthFromEnd(2)
list.traversing()
`.trim();

const hcf = `
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, item):
        new_node = ListNode(item)

        if self.head is None:
            self.head = new_node
        else:
            temp = self.head
            while temp.next is not None:
                temp = temp.next
            temp.next = new_node

    def traversing(self):
        current_node = self.head

        while current_node:
            print(current_node.value)
            current_node = current_node.next


def sortMerge(headA, headB):
    dummy_node = ListNode(0)
    tail = dummy_node

    while True:
        if headA is None:
            tail.next = headB
            break
        if headB is None:
            tail.next = headA
            break

        if headA.value <= headB.value:
            tail.next = headA
            headA = headA.next
        else:
            tail.next = headB
            headB = headB.next

        tail = tail.next

    return dummy_node.next


def mergeAndPrintSortedLists():
    llist1 = LinkedList()
    llist2 = LinkedList()

    llist1.append(5)
    llist1.append(10)
    llist1.append(15)

    llist2.append(2)
    llist2.append(3)
    llist2.append(20)

    llist1.head = sortMerge(llist1.head, llist2.head)
    llist1.traversing()


mergeAndPrintSortedLists()
`.trim();

const largest = ``.trim();

const lcm = ``.trim();

const math_function = ``.trim();

const quadratic = ``.trim();

const reproducable = ``.trim();

const seed = ``.trim();

const secrets = ``.trim();

const pseudorandom = ``.trim();



class PyLinkedList extends Component {
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
              <h3>Append</h3>
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

              <h3>Search</h3>
              <div style={titles}>
                <PrismCode
                  code={sqrt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Linked List Cycle.</h3>
              <div style={titles}>
                <PrismCode
                  code={pows}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Remove Nth Node From End of List</h3>
              <div style={titles}>
                <PrismCode
                  code={triangle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Merge Two Sorted Lists.</h3>
              <div style={titles}>
                <PrismCode
                  code={hcf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={largest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={lcm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={math_function}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
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

export default (withStyles(styles)(PyLinkedList));
