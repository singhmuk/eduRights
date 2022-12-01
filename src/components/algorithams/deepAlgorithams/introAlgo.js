import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import LinkedList from '../../../assets/linkedList.png';
import Theata from '../../../assets/theta.png';
import Big_O from '../../../assets/big_O.png';
import Omega from '../../../assets/omega.png';
import DeadLocks from '../../../assets/deadlock.png';
import divudeconquers from '../../../assets/divide_conquer.png';
import dis from '../../../assets/dijkastra.jpg';
import di from '../../../assets/di.png';
import greedy from '../../../assets/greedy.png';
import search from '../../../assets/search.png';


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

const code = `
`.trim()


class IntroAlgo extends Component {
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
              <h3>1.How to find middle element of linked list in one pass?</h3>
              <img src={LinkedList} alt="DeadLock" className="responsive" style={redesign} />
              <p>
                We need to maintain two-pointer, one increment at each node while other
                increments after two nodes at a time, when the first pointer reaches the end, the second
                pointer will point to a middle element of the linked list.
              </p>
              <br />

              <h3>2.How to find if a linked list has a loop?</h3>
              <p>
                If we maintain two pointers, and we increment one pointer after processing two nodes and other after processing every
                node, we will find a situation where both pointers will pointing to the same node. This
                happen if a linked list has a loop/ cycle.
              </p>
              <br />

              <h3>3. What is the difference between the Singly Linked List and Doubly Linked List data structure?</h3>
              <p>
                The main difference is the ability to traverse.
                <ol>
                  <li>In a singly linked list, a node only points towards the next node, and there is no pointer to the previous node, So,
                    can not traverse back on a singly linked list.</li>
                  <li>On the other hand, the doubly linked list maintains two pointers,
                    towards the next and previous node, which allows to navigate in both directions in linked list.</li>
                </ol>
              </p>
              <br />

              <h3>4.Generally data structure types?</h3>
              <p>
                At a high level, there are basically three types of data structures.
                <ol>
                  <li><b>Stacks and Queues: </b>Array-like structures that differ only in how items are inserted and removed.</li>
                  <li><b>Linked Lists, Trees, and Graphs:</b>Structures with nodes that keep references to other nodes.</li>
                  <li><b>Hash Tables: </b>Depend on hash functions to save and locate data.</li>
                </ol>
                <br />

                In terms of complexity,
                Stacks and Queues are the simplest and can be constructed from Linked Lists.
                <br />
                Trees and Graphs are the most complex
                because they extend the concept of a linked list. Hash Tables need to utilize these data structures to perform
                reliably.
                <br />
                <br />

                In terms of efficiency, Linked Lists are most optimal for recording and storing of data, while Hash Tables
                are most performant for searching and retrieving of data.
              </p>
              <br />

              <h3>5. What is Divide and Conquer algorithms?</h3>
              <p>
                Divide and Conquer is a pattern for algorithm. It is designed in a way as to take dispute
                on a huge input, break the input into minor pieces, and decide the problem for each of the small pieces. Now merge
                all of the piecewise solutions into a global solution.
                <br />
                <ol>
                  <li><b>Divide: </b>Algorithm divides the original problem into a set of subproblems.</li>
                  <li><b>Conquer: </b>Algorithm solves every subproblem individually.</li>
                  <li><b>Combine: </b>TAlgorithm puts together the solutions of the subproblems to get the solution of whole problem.</li>
                </ol>
                <b>Ex. </b>Merge Sort, Quick Sort, Binary Search, Strassen's Matrix Multiplication, Closest pair.
              </p>
              <img src={divudeconquers} alt="DeadLock" className="responsive" style={redesign} />
              <br />
              <br />

              <h3>6.What is Dijkstra's shortest path algorithm?</h3>
              <img src={di} alt="DeadLock" className="responsive" style={redesign} />
              <img src={dis} alt="DeadLock" className="responsive" style={redesign} />
              <p>
                <ul>
                  <li>Dijkstra's algorithm is an algorithm for finding the shortest path from a starting node to the target node in a
                    weighted graph. </li>
                  <li>Algorithm makes a tree of shortest paths from the starting vertex/ source vertex to all other nodes in the graph.</li>
                </ul>
                <br />

                Suppose you want to go from home to office in the shortest possible way. You know some roads are
                heavily congested (large weight) and challenging to use this,. In Dijkstra's algorithm, the
                shortest path tree found by the algorithm will try to avoid edges with larger weights.
              </p>
              <br />

              <h3>7. What are Greedy algorithms?</h3>
              <img src={greedy} alt="DeadLock" className="responsive" style={redesign} />
              <p>
                A greedy algorithm made for the best optimal choice at each sub stage with the
                goal of teventually leading to a globally optimum solution. This means that the algorithm chooses the best
                solution at the moment without regard for consequences.
                <br />
                <br />

                In other words, an algorithm that always takes the best
                immediate, or local, solution while finding an answer. Greedy algorithms find the overall, ideal solution for some
                idealistic problems, but may discover less-than-ideal solutions for some instances of other problems.
                <br />
                <br />
                <b>Ex. </b>Travelling Salesman Problem, Prim's
                Minimal Spanning Tree Algorithm, Kruskal's Minimal Spanning Tree Algorithm, Dijkstra's Minimal Spanning Tree
                Algorithm, Graph - Map Coloring, Graph - Vertex Cover, Knapsack Problem, Job Scheduling Problem,
              </p>
              <br />

              <h3>8. What is a linear search?</h3>
              <img src={search} alt="DeadLock" className="responsive" style={redesign} />
              <p>
                Technique of traversing a list from start to end by
                visiting properties of all the elements that are found on the way.
                <br />
                <br />

                <ul>
                  <li><b>Step1:  </b>Traverse the array using for loop.</li>
                  <li><b>Step2: </b>In every iteration, compare the target value with the current value of the array.</li>
                  <li><b>Step3: </b>If the values match, return the current index of the array</li>
                  <li><b>Step4: </b>If the values do not match, shift on to the next array element.</li>
                  <li><b>Step5: </b>If no match is found, return -1.</li>
                </ul>
              </p>
              <br />

              <h3>9. Asymptotic Notations</h3>
              Asymptotic analysis is used to measure the efficiency of an algorithm that doesn't
              depend on machine-specific constants and prevents the algorithm from comparing the time
              taking algorithm. Asymptotic notation is a mathematical tool that is used to represent
              the time complexity of algorithms for asymptotic analysis.
              <br />
              <br />
              The three most used asymptotic notation is as follows.
              <br />
              <br />
              <b>θ Notation:</b><br />
              θ Notation defines exact asymptotic behavior. It bounds
              functions from above and below. A convenient way to get Theta notation of an expression
              is to drop low order terms and ignore leading constants.
              <br />
              <img src={Theata} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />

              <b>Big O Notation:</b><br />
              The Big O notation bounds a function from above, it defines an upper bound of an
              algorithm. Let's consider the case of insertion sort, it takes linear time in the best
              case and quadratic time in the worst case. The time complexity of insertion sort is O(n2).
              It is useful when we only have upper bound on time complexity of an algorithm.
              <br />
              <img src={Big_O} alt="Big O" className="responsive" style={redesign} />
              <br />
              <br />

              <b>Ω Notation:</b><br />
              Just like Big O notation provides an asymptotic upper bound, the Ω Notation provides an
              asymptotic lower bound on a function. It is useful when we have lower bound on time
              complexity of an algorithm.
              <br />
              <img src={Omega} alt="Omega" className="responsive" style={redesign} />
              <br />

              <h3>10. Deadlock in Operating System</h3>
              A process in operating systems uses different resources and uses resources in following way.<br />
              <ul>
                <li>1) Requests a resource</li>
                <li>2) Use the resource</li>
                <li>2) Releases the resource</li>
              </ul>
              <br />
              Deadlock is a situation where a set of processes are blocked because each process is holding
              a resource and waiting for another resource acquired by some other process.
              <br />
              <br />

              <b>Ex. </b>When two trains are coming toward each other on same track and there is
              only one track, none of the trains can move once they are in front of each other. Similar
              situation occurs in operating systems when there are two/ more processes hold some
              resources and wait for resources held by other(s).
              <br />
              <br />

              Process 1 is holding Resource 1 and waiting for resource 2 which is acquired by process 2,
              and process 2 is waiting for resource 1.

              <img src={DeadLocks} alt="DeadLock" className="responsive" style={redesign} />
              <br />
              <br />

              <b>Deadlock can arise if following four conditions hold simultaneously</b>
              <br />
              <ol>
                <li>
                  <b>Mutual Exclusion:</b> One/ more than one resource are non-sharable (Only one process
                  can use at a time).
                </li>
                <li><b>Hold and Wait:</b> A process is holding at least one resource and waiting for resources.</li>
                <li><b>No Preemption:</b> A resource cannot be taken from a process unless the process releases the resource.</li>
                <li><b>Circular Wait:</b> A set of processes are waiting for each other in circular form.</li>
              </ol>
              <br />
              <br />

              <h4>Methods for handling deadlock:</h4>
              <b>There are three ways to handle deadlock</b>
              <br />
              <ul>
                <li>
                  <b>1) Deadlock prevention or avoidance: </b>The idea is to not let the system into deadlock state.
                  Prevention is done by negating one of above mentioned necessary conditions for deadlock.
                  By using strategy of “Avoidance”, we have to make
                  an assumption. We need to ensure that all information about resources which process WILL
                  need are known to us prior to execution of the process.
                  <br />
                  <br />
                  We use Banker’s algorithm in order to avoid deadlock.
                </li>
                <br />

                <li>
                  <b>2) Deadlock detection and recovery: </b>Let deadlock occur, then do preemption to handle it once
                  occurred.
                </li>
                <br />

                <li>
                  <b>3) Ignore the problem all together: </b>If deadlock is very rare, then let it happen and reboot
                  the system. This is the approach that both Windows and UNIX take.
                </li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroAlgo));
