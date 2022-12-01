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

const createTuples = `
my_tuple = ("Max", 28, "New York")
my_tuple_2 = "Linda", 25, "Miami"                                              # Parentheses are optional
my_tuple_3 = (25, 1, 2, 3, 4,)

x = my_tuple.count('Max')
x = my_tuple[-1]
x = my_tuple.index(28)                                                         # Return index of first item of 28.
x = len(my_tuple)
x = max(my_tuple_3)
x = min(my_tuple_3)
x = any(my_tuple_3)
x = all(my_tuple_3)
x = enumerate(my_tuple_3)
x = sum(my_tuple_3)
x = sorted(my_tuple_3)
x = tuple(my_tuple_3)                                                         # Convert an iterable to a tuple.

name, age, city = my_tuple

print(x)
print(name, age, city)


#2
tuple_4 = tuple([1,2,3])                     # convert an iterable (list, dict, string) with the built-in tuple function
print(tuple_4)`.trim();

const usefuls = `
my_tuple = ('a', 'b') * 5                                          
print(my_tuple)


#2 convert list to a tuple.
my_list = ['a', 'b', 'c', 'd']
list_to_tuple = tuple(my_list)
print(list_to_tuple)

tuple_to_list = list(list_to_tuple)
print(tuple_to_list)


#3 convert string to tuple.
string_to_tuple = tuple('Hello')
print(string_to_tuple)`.trim();

const unpack = `
my_tuple = (0, 1, 2, 3, 4, 5)
first, *items_between, last = my_tuple
print(first, items_between, last)


#2. Nested tuples
a = ((0, 1), ('age', 'height'))
print(a[0])
`.trim();

const compare = `
# compare the size
import sys
my_list = [0, 1, 2, "hello", True]
my_tuple = (0, 1, 2, "hello", True)
print(sys.getsizeof(my_list), "bytes")
print(sys.getsizeof(my_tuple), "bytes")

# compare the execution time of a list vs. tuple creation statement
import timeit
print(timeit.timeit(stmt="[0, 1, 2, 3, 4, 5]", number=1000000))
print(timeit.timeit(stmt="(0, 1, 2, 3, 4, 5)", number=1000000))`.trim();

const list = `
my_list = ["banana", "cherry", "apple", 5, True, 0, 1, 1]
print(my_list)

list_2 = list()                                                       # Or create an empty list with the list function
print(list_2)

x = my_list.append("orange")                                              
x = my_list.index(1)                                              
x = my_list.insert(1, "blueberry")                                        
x = my_list.pop()                                                        
x = my_list.remove("cherry")                                              
x = my_list.clear()                                                       
x = my_list.reverse()                                                    
x = my_list.sort()  
x = my_list.count(0)  
x = sum(my_list)  
x = max(my_list)  
x = min(my_list)  
x = all(my_list)  
x = any(my_list)  
x = len(my_list)  
x = enumerate(my_list)  

print(x)  


list_with_zeros = [0] * 5                                             # create list with repeated elements
list_concat = list_with_zeros + my_list
string_to_list = list('Hello')                                        # convert string to list
`.trim();

const copylists = `
list_org = ["banana", "cherry", "apple"]
list_copy = list_org.copy()
list_copy.append(True)                                                # modifying the copy not affects the original

print(list_org)
print(list_copy)
`.trim();


const comprehension = `
a = [1, 2, 3, 4, 5, 6, 7, 8]
b = [i * i for i in a] 
print(b)


# nested Lists
a = [[1, 2], [3, 4]]
print(a)
print(a[0])
`.trim();

const format = `
my_set = {"apple", "banana", "cherry"}
my_set_2 = set(["one", "two", "three"])                         # or use the set function and create from an iterable
my_set_3 = set("aaabbbcccdddeeeeeffff")

my_set.add("three") 
my_set.remove("three") 
my_set.discard("three")                                         # removes x
my_set.pop()                                                    # removes x
my_set.clear()  

print(my_set)
`.trim();

const unions = `
odds = {1, 3, 5, 7, 9}
evens = {0, 2, 4, 6, 8}

u = odds.union(evens)
i = odds.intersection(evens)

print(u)`.trim();

const differences = `
setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setB = {1, 2, 3, 10, 11, 12}

diff_set = setA.difference(setB)
diff_set = setB.difference(setA)
diff_set = setA.symmetric_difference(setB)
diff_set = setB.symmetric_difference(setA)
print(diff_set)`.trim();

const updatings = `
setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setB = {1, 2, 3, 10, 11, 12}

setA.update(setB)

setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setA.intersection_update(setB)

setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setA.difference_update(setB)

setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setA.symmetric_difference_update(setB)

setA.update([1, 2, 3, 4, 5, 6])`.trim();

const subsets = `
setA = {1, 2, 3, 4, 5, 6}
setB = {1, 2, 3}

print(setA.issubset(setB))
print(setB.issubset(setA))                                  # issubset(setX): Returns True if setX contains the set


print(setA.issuperset(setB))                                # issuperset(setX): Returns True if the set contains setX
print(setB.issuperset(setA))


setC = {7, 8, 9}
print(setA.isdisjoint(setB))                                # True if both sets have a null intersection
print(setA.isdisjoint(setC))`.trim();

const frozenset = `
odds = frozenset({1, 3, 5, 7, 9})
evens = frozenset({0, 2, 4, 6, 8})

print(odds.union(evens))
print(odds.intersection(evens))
print(odds.difference(evens))`.trim();

const create = `
my_dict = {"name":"Max", "age":28, "city":"New York"}
my_dict_2 = dict(name="Lisa", age=27, city="Boston")    
     
name_in_dict = my_dict["name"]    
my_dict["email"] = "max@xyz.com"                                          # add a new key.
my_dict["email"] = "coolmax@xyz.com"                                      # overwrite the existing key.
del my_dict["email"]                                                      # delete a key-value pair.

print(my_dict)
print("popped value:", my_dict.pop("age"))                                # removes the last inserted key-value pair. 
print("popped item:", my_dict.popitem())
`.trim();

const checkItem = `
my_dict = {"name":"Max", "age":28, "city":"New York"}

if "name" in my_dict:
    print(my_dict["name"])

try:
    print(my_dict["firstname"])
except KeyError:
    print("No key found")`.trim();

const looping = `
for key in my_dict:
    print(key, my_dict[key])


for key in my_dict.keys():
    print(key)


for value in my_dict.values():                                                    # loop over values
    print(value)


for key, value in my_dict.items():                                                # loop over keys and values
    print(key, value)`.trim();

const mergrs = `
my_dict = {"name":"Max", "age":28, "email":"max@xyz.com"}
my_dict_2 = dict(name="Lisa", age=27, city="Boston")

my_dict.update(my_dict_2)
print(my_dict)`.trim();

const possibles = `
my_dict = {3: 9, 6: 36, 9:81}                                   # use numbers as key, but be careful
print(my_dict[3], my_dict[6], my_dict[9])

my_tuple = (8, 7)                                               # use a tuple with immutable elements (e.g. number, string)
my_dict = {my_tuple: 15}

print(my_dict[my_tuple])
print(my_dict[8, 7])


# my_list = [8, 7]                                              # a list is not possible because it is not immutable
# my_dict = {my_list: 15}`.trim();

class Tuples extends Component {
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
              <h3></h3>
              <ul>
                <li><b>Tuple: </b>A tuple is a collection of objects which is ordered and immutable. </li>
                <ul>
                  <li><b>my_tuple = ("Max", 28, "New York")</b></li>
                  <li>Values of a tuple are separated by ‘commas’. Although it is not necessary.</li>
                  <li>Creation of tuple without the use of parentheses is known as Tuple Packing.</li>
                  <li>Add/ change items, Not possible and will raise a TypeError.</li>
                </ul>
                <br />

                <li><b>List: </b>List is a collection data type which is ordered and mutable.</li>
                <ul>
                  <li><b>my_list = ["banana", "cherry", "apple"]</b></li>
                  <li>Useful for preserving a sequence of data and further iterating over it.</li>
                </ul>

                <br />
                <li><b>Set: </b>A Set is an unordered , unindexed, mutable, and has no duplicate elements.</li>
                <ul>
                  <li>Use curly braces or the built-in set function to create a set.</li>
                  <li>An empty set cannot be created with Curly braces, as this is interpreted as dict use set().</li>
                </ul>

                <br />
                <li><b>Dictionary: </b>Is an unordered, mutable and indexed. No duplicate members.</li>
                <ul>
                  <li>Collection of key-value pairs.</li>
                  <li>Dictionary keys are case sensitive.</li>
                  <li>Create a dictionary with braces, or with the built-in dict funtion.</li>
                </ul>
              </ul>
              <br />

              <b>Reasons to use a tuple over a list</b>
              <ul>
                <li>Use tuple for heterogeneous (different) datatypes and list for homogeneous datatypes.</li>
                <li>Since tuple are immutable, iterating through tuple is faster than list.</li>
                <li>Tuples with their immutable elements can be used as key for a dictionary. This is not possible with lists.</li>
              </ul>
              <br />

              <h3>Create a tuple</h3>
              <b>Special case:</b> A tuple with only one element needs to have a comma at the end,
              otherwise it is not recognized as tuple
              <div style={titles}>
                <PrismCode
                  code={createTuples}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Tuple Usefule methods</h3>
              <div style={titles}>
                <PrismCode
                  code={usefuls}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Unpack tuple</h3>
              <ul>
                <li>Number of variables have to match number of tuple elements.</li>
                <li>Unpack multiple elements to a list with *.</li>
                <li><b>Nested tuples: </b>Tuples can contain other tuples (or other container types).</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={unpack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Compare tuple and list</h3>
              <div style={titles}>
                <PrismCode
                  code={compare}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Creating A List</h3>
              <ul>
                <li><b>Extend() :</b>Add all elements of a list to the another list.</li>
                <li><b>copy() :</b>Returns a copy of the list.</li>
                <li><b>reduce() :</b>apply a particular function passed in its argument to all of the list elements stores the intermediate result and only returns the final summation value.</li>
                <li><b>ord() :</b>Returns an integer representing the Unicode code point of the given Unicode character.</li>
                <li><b>cmp() :</b>This function returns 1, if first list is “greater” than second list.</li>
                <li><b>enumerate() :</b>Returns enumerate object of list.</li>
                <li><b>accumulate() :</b>apply a particular function passed in its argument to all of the list elements returns a list containing the intermediate results.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={list}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Copy a list</h3>
              <div style={titles}>
                <PrismCode
                  code={copylists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>List comprehension</h3>
              <ul>
                <li>A elegant and fast way to create a new list from an existing list.</li>
                <li>List comprehension consists of an expression followed by a for statement inside square brackets.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={comprehension}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Sets</h3>
              <ul>
                <li><b>update() :</b>Updates a set with the union of itself and others.</li>
                <li><b>union() :</b>Returns the union of sets in a new set.</li>
                <li><b>difference() :</b>Returns the difference of two or more sets as a new set.</li>
                <li><b>difference_update() :</b>Removes all elements of another set from this set.</li>
                <li><b>discard() :</b>Removes an element from set if it is a member. (Do nothing if the element is not in set).</li>
                <li><b>intersection() :</b>Returns the intersection of two sets as a new set.</li>
                <li><b>intersection_update() :</b>Updates the set with the intersection of itself and another.</li>
                <li><b>isdisjoint() :</b>Returns True if two sets have a null intersection.</li>
                <li><b>issubset() :</b>Returns True if another set contains this set.</li>
                <li><b>issuperset() :</b>Returns True if this set contains another set.</li>
                <li><b>symmetric_difference() :</b>Returns the symmetric difference of two sets as a new set.</li>
                <li><b>symmetric_difference_update() :</b>Updates a set with the symmetric difference of itself and another.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Union and Intersection</h3>
              <b>union() :</b> combine elements from both sets, no duplication. This does not change the two sets
              <br />
              <b>intersection():</b> take elements that are in both sets
              <div style={titles}>
                <PrismCode
                  code={unions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Difference of sets</h3>
              <b>difference() :</b> returns a set with all the elements from the setA that are not in setB.
              <br />
              A.difference(B) is not the same as B.difference(A)
              <br />
              <br />
              <b>symmetric_difference() :</b> returns a set with all the elements that are in setA and setB but not in both
              <br />
              A.symmetric_difference(B) = B.symmetric_difference(A)
              <br />
              <div style={titles}>
                <PrismCode
                  code={differences}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Updating sets</h3>
              <b>update() :</b> Update the set by adding elements from another set.
              <br />
              <br />
              <b>intersection_update() :</b> Update the set by keeping only the elements found in both
              <br />
              <b>difference_update() :</b> Update the set by removing elements found in another set.
              <br />
              <b>symmetric_difference_update() :</b> Update the set by only keeping the elements found in either set, but not in both
              <br />
              <br />
              <b>Note:</b> all update methods also work with other iterables as argument, e.g lists, tuples
              <div style={titles}>
                <PrismCode
                  code={updatings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Subset, Superset, and Disjoint</h3>
              <div style={titles}>
                <PrismCode
                  code={subsets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Frozenset</h3>
              Frozen set is just an immutable version of normal set. While elements of a set can be modified at any
              time, elements of frozen set remains the same after creation.
              <br />
              <b>my_frozenset = frozenset(iterable)</b>
              <div style={titles}>
                <PrismCode
                  code={frozenset}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Dictionaries</h3>
              <ul>
                <li><b>get() :</b>It is a conventional method to access a value for a key.</li>
                <li><b>dictionary_name.values() :</b>returns a list of all the values available in a given dictionary.</li>
                <li><b>str() :</b>Produces a printable string representation of a dictionary.</li>
                <li><b>update() :</b>Adds dictionary dict2’s key-values pairs to dict.</li>
                <li><b>setdefault() :</b>Set dict[key]=default if key is not already in dict.</li>
                <li><b>keys() :</b>Returns list of dictionary dict’s keys.</li>
                <li><b>items() :</b>Returns a list of dict’s (key, value) tuple pairs.</li>
                <li><b>has_key() :</b>Returns true if key in dictionary dict, false otherwise.</li>
                <li><b>fromkeys() :</b>Create a new dictionary with keys from seq and values set to value.</li>
                <li><b>type() :</b>Returns the type of the passed variable.</li>
                <li><b>cmp() :</b>Compares elements of both dict.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={create}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Check for keys</h3>
              <div style={titles}>
                <PrismCode
                  code={checkItem}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Looping through dictionary</h3>
              <div style={titles}>
                <PrismCode
                  code={looping}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Merge two dictionaries</h3>
              Use the update() method to merge 2 dicts
              existing keys are overwritten, new keys are added
              <div style={titles}>
                <PrismCode
                  code={mergrs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Possible key types</h3>
              Any immutable type, like strings or numbers can be used as a key. Also, a tuple can be used if it contains only immutable elements.
              <br />
              <br />
              do not mistake the keys as indices of a list, e.g my_dict[0] is not possible here
              <div style={titles}>
                <PrismCode
                  code={possibles}
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

export default (withStyles(styles)(Tuples));
