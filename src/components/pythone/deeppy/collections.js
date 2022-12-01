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

const containers = `
from collections import Counter


print(Counter(['B','B','A','B','C','A','B','B','A','C']))                                   # With sequence of items
print(Counter({'A':3, 'B':5, 'C':2}))                                                       # with dictionary
print(Counter(A=3, B=5, C=2))                                                               # with keyword arguments


#2 Updation
coun = collections.Counter()                                                                # also create an empty counter

coun.update(Data)                                                                 # And can be updated via update() method
`.trim();

const increased = `
from collections import Counter

c1 = Counter(A=4, B=3, C=10)
c2 = Counter(A=10, B=3, C=4)

c1.subtract(c2)
print(c1)

z = ['blue', 'red', 'blue', 'yellow', 'blue', 'red']
print(Counter(z))
`.trim();

const orderedDict = `
from collections import OrderedDict

print("This is a Dict:")
d = {}
d['a'] = 1
d['b'] = 2
d['c'] = 3
d['d'] = 4

for key, value in d.items():
	print(key, value)

print("This is an Ordered Dict:")
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3
od['d'] = 4

for key, value in od.items():
	print(key, value)`.trim();

const demonstrate = `
from collections import OrderedDict

print("Befor")
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3
od['d'] = 4
for key, value in od.items():
	print(key, value)

print("After:")
od['c'] = 5
for key, value in od.items():
	print(key, value)`.trim();

const deleting = `
from collections import OrderedDict

print("Before deleting:")
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3
od['d'] = 4

for key, value in od.items():
	print(key, value)

print("After deleting:")
od.pop('c')
for key, value in od.items():
	print(key, value)

print("After re-inserting:")
od['c'] = 3
for key, value in od.items():
	print(key, value)`.trim();

const defaultdict = `
from collections import defaultdict

# Function to return a default values for keys that is not present
def def_value():
    return "Not Present"

d = defaultdict(def_value)
d["a"] = 1
d["b"] = 2

print(d["a"])
print(d["b"])
print(d["c"])`.trim();

const missings = `
from collections import defaultdict

d = defaultdict(lambda: "Not Present")
d["a"] = 1
d["b"] = 2


#Provides the default value for the key
print(d.__missing__('a'))
print(d.__missing__('d'))`.trim();

const userDict = `
from collections import UserDict

d = {'a':1, 'b': 2, 'c': 3}

userD = UserDict(d)                                                           #Creating an UserDict
print(userD.data)`.trim();

const customised = `
from collections import UserDict

class MyDict(UserDict):                                                # Creating a Dictionary where deletion is not allowed
    def __del__(self):                                                        # Function to stop deleltion from dictionary
        raise RuntimeError("Deletion not allowed")
    
    def pop(self, s=None):                                                    # Function to stop pop from dictionary
        raise RuntimeError("Deletion not allowed")
    
    def popitem(self, s=None):                                                # Function to stop popitem from Dictionary
        raise RuntimeError("Deletion not allowed")

d = MyDict({'a': 1, 'b': 2, 'c': 3})
print(d)
d.pop(1)`.trim();

const userList = `
from collections import UserList

L = [1, 2, 3, 4]

userL = UserList(L)
print(userL.data)
`.trim();

const userString = `
from collections import UserString

d = 12344

userS = UserString(d)
print(userS.data)

userS = UserString("")                                                                  # Creating an empty UserDict
print(userS.data)


#2
from collections import UserString

# Creating a Mutable String
class Mystring(UserString):
    def append(self, s):
        self.data += s

    def remove(self, s):
        self.data = self.data.replace(s, "")


s1 = Mystring("Geeks")
print("Original String:", s1.data)

s1.append("s")
print("String After Appending:", s1.data)

s1.remove("e")
print("String after Removing:", s1.data)`.trim();

const namedtuple = `
from collections import namedtuple
Point = namedtuple('Point','x, y')
pt = Point(1, -4)
print(pt)
print(pt._fields)
print(type(pt))
print(pt.x, pt.y)

Person = namedtuple('Person','name, age')
friend = Person(name='Tom', age=25)
print(friend.name, friend.age)`.trim();

const deque = `
from collections import deque
d = deque()

d.append('a')                                                                       # add elements to the right end 
d.appendleft('c')                                                                   # add elements to the left end 
print(d.pop())                                                                      # remove elements from the right
print(d.popleft())                                                                  # remove elements from the left
d.clear()

print(d)

d = deque(['a', 'b', 'c', 'd'])
d.extend(['e', 'f', 'g'])                                                           # extend at right or left side
d.extendleft(['h', 'i', 'j'])                                                       # 'j' is now at the left most position

print(d)


print(d.count('h'))                                                    
d.rotate(1)                                                                         # rotate 1 positions to the right
d.rotate(-2)                                                                        # rotate 2 positions to the left

print(d)`.trim();

const chainMap = `
from collections import ChainMap

d1 = {'a': 1, 'b': 2}
d2 = {'c': 3, 'd': 4}
d3 = {'e': 5, 'f': 6}

c = ChainMap(d1, d2, d3)
print(c)`.trim();

const operations = `
import collections

dic1 = { 'a' : 1, 'b' : 2 }
dic2 = { 'b' : 3, 'c' : 4 }

chain = collections.ChainMap(dic1, dic2)

print (chain.maps)
print (list(chain.keys()))                                                              # printing keys using keys()
print (list(chain.values()))`.trim();

const manilupatings = `
import collections

dic1 = { 'a' : 1, 'b' : 2 }
dic2 = { 'b' : 3, 'c' : 4 }
dic3 = { 'f' : 5 }

chain = collections.ChainMap(dic1, dic2)
print (chain.maps)

chain1 = chain.new_child(dic3)
print (chain1.maps)
print (chain1['b'])

chain1.maps = reversed(chain1.maps)
print (chain1['b'])`.trim();

const heapq = `
import heapq

li = [5, 7, 9, 1, 3]

heapq.heapify(li)                                                           
heapq.heappush(li,4)                                                 
print (list(li))
print (heapq.heappop(li))                                           


//2
li1 = [5, 7, 9, 4, 3]
li2 = [5, 7, 9, 4, 3]

heapq.heapify(li1)                                                 

print (heapq.heappushpop(li1, 2))                   
print (heapq.heapreplace(li2, 2))                   

print(heapq.nlargest(3, li1))                           
print(heapq.nsmallest(3, li1))                          
`.trim();


class Collections extends Component {
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
              <h3>1. Containers</h3>
              <ul>
                <li>Containers are object that hold objects. They provide a way to access the contained objects and iterate over them.
                </li>
                <li>A Counter is a subclass of dict. Therefore it is an unordered collection where elements and their respective count are stored as a dictionary.
                </li>
                <li>A counter is a container that stores elements as dictionary keys, and their counts are stored as dictionary values.</li>
              </ul>
              <br />
              <b>Different ways to create Counter.</b>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={containers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. counter’s data will be increased not replaced</h3>
              <ul>
                <li>Counts can be zero and negative also.</li>
                <li>We can use Counter to count distinct elements of a list or other collections.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={increased}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. OrderedDict</h3>
              <ul>
                <li>An OrderedDict is a dictionary subclass that remembers the order that keys were first inserted. The only difference between
                  dict() and OrderedDict() is that.
                </li>
                <li>OrderedDict preserves the order in which the keys are inserted. A regular dict doesn’t track the insertion order, and
                  iterating it gives the values in an arbitrary order.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={orderedDict}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p><b>Key value Change: </b>If the value of a certain key is changed, the position of the key remains unchanged in OrderedDict.
              </p>

              <h3>A Python program to demonstrate working of key/ value change in OrderedDict</h3>
              <div style={titles}>
                <PrismCode
                  code={demonstrate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Deletion and Re-Inserting:</h3>
              Deleting and re-inserting the same key will push it to the back as OrderedDict however maintains the order of insertion.
              <br />
              <div style={titles}>
                <PrismCode
                  code={deleting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Defaultdict</h3>
              <ul>
                <li>Defaultdict is a sub-class of the dict class that returns a dictionary-like object. The functionality
                  of both dictionaries and defualtdict are almost same except for the fact that defualtdict never raises a
                  KeyError. It provides a default value for the key that does not exists.</li>
                <li>when the KeyError is raised, it might become a problem. To overcome this use Defaultdict.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={defaultdict}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>__missing__()</h3>
              This function is used to provide the default value for the dictionary. This function takes
              default_factory as an argument and if this argument is None, a KeyError is raised otherwise it provides
              a default value for the given key. This method is basically called by the __getitem__() method of the
              dict class when the requested key is not found. __getitem__() return the value returned by
              the __missing__(). method.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={missings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <i>Supports a dictionary like a container called UserDict present in the collections module. This class
                acts as a wrapper class around the dictionary objects. This class is useful when one wants to create
                a dictionary of their own with some modified/ new functionality. It can be
                considered as a way of adding new behaviors for the dictionary. This class takes a dictionary instance
                as an argument and simulates a dictionary that is kept in a regular dictionary. The dictionary is
                accessible by the data attribute of this class.</i>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={userDict}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>create a class inherting from UserDict to implement a customised dictionary.</h3>
              <div style={titles}>
                <PrismCode
                  code={customised}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Collections.UserList</h3>
              This class acts as a wrapper class around the List objects. This class is useful when one wants to
              create a list of their own with some modified/ new functionality. It can be
              considered as a way of adding new behaviors for the list. This class takes a list instance as an
              argument and simulates a list that is kept in a regular list.
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={userList}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Collections.UserString</h3>
              <ul>
                <li>Strings are the arrays of bytes representing Unicode characters. However, Python does not support the character data type. A character is a string of length one.</li>
                <li>This class is useful when one wants to create a string of their own with some modified/ new functionality.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={userString}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Collections</h3>
              Collections in Python implements specialized container datatypes providing alternatives to Python’s general purpose built-in
              containers, dict, list, set, and tuple.
              <br />
              <b>The following tools exist:</b>
              <ul>
                <li><b>namedtuple:</b>factory function for creating tuple subclasses with named fields</li>
                <li><b>OrderedDict:</b>dict subclass that remembers the order entries were added</li>
                <li><b>Counter:</b>dict subclass for counting hashable objects</li>
                <li><b>defaultdict:</b>dict subclass that calls a factory function to supply missing values</li>
                <li><b>deque:</b>list-like container with fast appends and pops on either end</li>
              </ul>
              <br />

              <h3>2. namedtuple</h3>
              namedtuples are easy to create, lightweight object types. They assign meaning to each position in a
              tuple and allow for more readable, self-documenting code. They can be used wherever regular tuples are
              used, and they add the ability to access fields by name instead of position index.
              <br />
              <br />
              create a namedtuple with its class name as string and its fields as string fields have to be separated
              by comma or space in the given string.
              <div style={titles}>
                <PrismCode
                  code={namedtuple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>deque</h3>
              A deque is a double-ended queue. It can be used to add/ remove elements from both ends. Deques
              support thread safe, memory efficient appends and pops from either side of the deque with approximately
              the same O(1) performance in either direction.
              <br />
              <br />

              <b>various Operations on deque :</b>
              <ul>
                <li><b>append() :</b>Used to insert the value in its argument to the right end of deque.</li>
                <li><b>appendleft() :</b>Used to insert the value in its argument to the left end of deque.</li>
                <li><b>pop() :</b>Used to delete an argument from the right end of deque.</li>
                <li><b>popleft() :</b>Used to delete an argument from the left end of deque. </li>
                <li><b>index(ele, beg, end) :</b>Returns the first index of the value mentioned in arguments, starting searching from beg till end index.</li>
                <li><b>insert(i, a) :</b>This function inserts the value mentioned in arguments(a) at index(i) specified in arguments.</li>
                <li><b>remove() :</b>Removes the first occurrence of value mentioned in arguments.</li>
                <li><b>count() :</b>Counts the number of occurrences of value mentioned in arguments.</li>
                <li><b>extend(iterable) :</b>Used to add multiple values at the right end of deque. The argument passed is an iterable.</li>
                <li><b>extendleft(iterable) :</b>Used to add multiple values at the left end of deque. The argument passed is an iterable. Order is reversed as a result of left appends.</li>
                <li><b>reverse() :</b>Used to reverse order of deque elements.</li>
                <li><b>rotate() :</b>Rotates the deque by the number specified in arguments. If the number specified is negative, rotation occurs to left. Else rotation is to right.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={deque}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>ChainMap</h3>
              encapsulates many dictionaries into one unit. ChainMap is member of module “collections“.
              <br />
              <div style={titles}>
                <PrismCode
                  code={chainMap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Access Operations</b>
              <ul>
                <li><b>keys() :</b>Used to display all the keys of all the dictionaries in ChainMap.</li>
                <li><b>values() :</b>Used to display values of all the dictionaries in ChainMap.</li>
                <li><b>maps() :</b>Used to display keys with corresponding values of all the dictionaries in ChainMap.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={operations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>Note: </b>The key named “b” exists in both dictionaries, but only first dictionary key is taken as key value of “b”. Ordering is done as the dictionaries are passed in function.
              <br />

              <h3>Manipulating Operations</h3>
              <ul>
                <li><b>new_child() :</b>Adds a new dictionary in the beginning of the ChainMap.</li>
                <li><b>reversed() :</b>Reverses the relative ordering of dictionaries in the ChainMap.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={manilupatings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Heap queue (heapq)</h3>
              Heap data structure is mainly used to represent a priority queue.
              <br />
              The property of this data structure in Python is that each time the smallest of heap element is popped(min heap). Whenever
              elements are pushed/ popped, heap structure in maintained. The heap[0] element also returns the smallest element each time.
              <ul>
                <li><b>heapify(iterable) :</b>Used to convert the iterable into a heap data structure. i.e. in heap order.</li>
                <li><b>heappush(heap, ele) :</b>Used to insert the element mentioned in its arguments into heap. The order is adjusted, so as heap structure is maintained.</li>
                <li><b>heappop(heap) :</b>Used to remove and return the smallest element from heap. The order is adjusted, so as heap structure is maintained.</li>
                <li><b>heappushpop(heap, ele) :</b>This function combines the functioning of both push and pop operations in one statement, increasing efficiency. Heap order is maintained after this operation.</li>
                <li><b>heapreplace(heap, ele) :</b>This function also inserts and pops element in one statement, but it is different from above function. In this, element is first popped, then the element is pushed.i.e, the value larger than the pushed value can be returned. heapreplace() returns the smallest value originally in heap regardless of the pushed element as opposed to heappushpop().</li>
                <li><b>nlargest(k, iterable, key = fun) :</b>Used to return the k largest elements from the iterable specified and satisfying the key if mentioned.</li>
                <li><b>nsmallest(k, iterable, key = fun) :</b>Used to return the k smallest elements from the iterable specified and satisfying the key if mentioned.</li>
              </ul>
              <br />

              <ul>
                <li>Using heapify to convert list into heap.</li>
                <li>Using heappush() to push elements into heap.</li>
                <li>Using heappop() to pop smallest element.</li>
                <li>Using heappushpop() to push and pop items simultaneously.</li>
                <li>Using heapreplace() to push and pop items simultaneously.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={heapq}
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

export default (withStyles(styles)(Collections));
