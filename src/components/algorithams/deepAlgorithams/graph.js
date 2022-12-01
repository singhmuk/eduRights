import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Tree from '../../../assets/tree.gif';
import Graphs from '../../../assets/graph.jpg';


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


const graph = `class Graph {
  constructor() {
      this.adjacencyMap = {}
  }

  addVertex(v) {
      this.adjacencyMap[v] = [];
  }
  
  containsVertex(vertex) {
      return typeof(this.adjacencyMap[vertex]) !== "undefined"
  }
  
  addEdge(v, w) {
      let result = false
      if (this.containsVertex(v) && this.containsVertex(w)) {
          this.adjacencyMap[v].push(w);
          this.adjacencyMap[w].push(v);
          result = true
      }
      return result
  }

  printGraph() {
      let keys = Object.keys(this.adjacencyMap);
      for (let i of keys) {
          let values = this.adjacencyMap[i];
          let vertex = "";
          for (let j of values)
              vertex += j + " ";
          console.log(i + " -> " + vertex);
      }
    }
  }

const example = () => {
  let g = new Graph()
  g.addVertex(1)
  g.addVertex(2)
  g.addVertex(3)
  g.addEdge(1, 2)
  g.addEdge(1, 3)
  g.printGraph()
}`.trim()


class Graph extends Component {
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
              <h3>Tree</h3>
              <img src={Tree} alt="DeadLock" className="responsive" style={redesign} />
              <br />
              <br />

              <ul>
                <li>
                  In Binary Search Tree is each node can have no more than two children.
                  We can search for any value in logarithmic time because we can ignore one-half of the branching with
                  each iteration. Inserting and deleting can also happen in logarithmic time. Moreover, the
                  smallest and largest value can easily be found at the leftmost and rightmost leaf,
                  respectively.
                </li>
                <li>Traversal through the tree can happen in a vertical or horizontal procedure.</li>
                <li>In DFT the vertical direction, Nodes traversed in.</li>
                <br />
                <br />

                <b>Depth-First Traversal (DFT): </b>
                <ul>
                  <li><b>pre-order (Root, Left, Right): </b>1 2 4 5 3 </li>
                  <li><b>in-order (Left, Root, Right): </b>4 2 5 1 3 </li>
                  <li><b>post-order (Left, Right, Root): </b>4 5 2 3 1</li>
                </ul>
                <br />
                <br />
                <b>Breadth-First Traversal (BFT): </b>
                <ul>
                  <li>Level order traversal of a tree is breadth first traversal for the tree.</li>
                  <li>
                    BFT In the horizontal direction. This requires the use of a queue to
                    track all the children nodes with each iteration.
                    If the shape of a tree is wider than deep, BFT is a better choice than
                    DFT.
                  </li>
                </ul>

              </ul>
              <br />

              <h3>Graph</h3>
              <img src={Graphs} alt="DeadLock" className="responsive" style={redesign} />
              <br />
              If a tree is free to have more than one parent, it becomes a Graph.

              <ul>
                <li>Edges that connect nodes together in a graph can be directed/ undirected, weighted/ unweighted</li>
                <li>Edges that have both direction and weight are analogous to vectors.</li>
                <li>
                  Multiple inheritances in the form of Mixins and data objects that have many-to-many
                  relationships produce graph structures.
                </li>
                <b>Ex. </b>Social network and the Internet.
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={graph}
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

export default (withStyles(styles)(Graph));
