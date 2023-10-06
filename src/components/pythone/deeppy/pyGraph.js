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
def create_graph():
    return {
        "vertices": {},
    }


def add_vertex(graph, vertex):
    if vertex not in graph["vertices"]:
        graph["vertices"][vertex] = []
    return graph


def add_edge(graph, vertex1, vertex2):
    if vertex1 in graph["vertices"] and vertex2 in graph["vertices"]:
        graph["vertices"][vertex1].append(vertex2)
        graph["vertices"][vertex2].append(vertex1)
    return graph


graph = create_graph()

add_vertex(graph, "A")
add_vertex(graph, "B")
add_vertex(graph, "C")
add_vertex(graph, "D")

add_edge(graph, "A", "B")
add_edge(graph, "B", "C")
add_edge(graph, "C", "D")
add_edge(graph, "D", "A")

print(graph)
`.trim();

const compound_interest = `
def create_graph():
    return {"vertices": {}}


def add_vertex(graph, vertex):
    if vertex not in graph["vertices"]:
        graph["vertices"][vertex] = []
    return graph


def add_edge(graph, vertex1, vertex2):
    if vertex1 in graph["vertices"] and vertex2 in graph["vertices"]:
        graph["vertices"][vertex1].append(vertex2)
        graph["vertices"][vertex2].append(vertex1)
    return graph


def remove_vertex(graph, vertex):
    if vertex in graph["vertices"]:
        neighbors = graph["vertices"][vertex]
        for neighbor in neighbors:
            adj_list = graph["vertices"][neighbor]
            if vertex in adj_list:
                adj_list.remove(vertex)
        del graph["vertices"][vertex]
    return graph


def remove_edge(graph, vertex1, vertex2):
    if vertex1 in graph["vertices"] and vertex2 in graph["vertices"]:
        if vertex2 in graph["vertices"][vertex1]:
            graph["vertices"][vertex1].remove(vertex2)
        if vertex1 in graph["vertices"][vertex2]:
            graph["vertices"][vertex2].remove(vertex1)
    return graph


graph = create_graph()

add_vertex(graph, "A")
add_vertex(graph, "B")
add_vertex(graph, "C")

add_edge(graph, "A", "B")
add_edge(graph, "A", "C")
print(graph)

remove_vertex(graph, "B")
print("Graph after removing B:")
print(graph)
`.trim();

const format = `
def create_graph():
    return {"vertices": {}}


def add_vertex(graph, vertex):
    if vertex not in graph["vertices"]:
        graph["vertices"][vertex] = []
    return graph


def add_edge(graph, vertex1, vertex2):
    if vertex1 in graph["vertices"] and vertex2 in graph["vertices"]:
        graph["vertices"][vertex1].append(vertex2)
        graph["vertices"][vertex2].append(vertex1)
    return graph


def update_vertex(graph, old_vertex, new_vertex):
    if old_vertex in graph["vertices"]:
        neighbors = graph["vertices"][old_vertex]
        del graph["vertices"][old_vertex]
        graph["vertices"][new_vertex] = neighbors

        for vertex, adj_list in graph["vertices"].items():
            if old_vertex in adj_list:
                index = adj_list.index(old_vertex)
                adj_list[index] = new_vertex
    return graph


graph = create_graph()

add_vertex(graph, "A")
add_vertex(graph, "B")
add_vertex(graph, "C")

add_edge(graph, "A", "B")
add_edge(graph, "A", "C")
print(graph)

update_vertex(graph, "A", "D")
print("Graph after updating vertex A to D:")
print(graph)
`.trim();

const sqrt = ``.trim();

const pows = ``.trim();

const triangle = ``.trim();

const hcf = ``.trim();

const largest = ``.trim();

const lcm = ``.trim();

const math_function = ``.trim();

const quadratic = ``.trim();

const reproducable = ``.trim();

const seed = ``.trim();

const secrets = ``.trim();

const pseudorandom = ``.trim();



class PyGraph extends Component {
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
              <h3>Create</h3>
              <div style={titles}>
                <PrismCode
                  code={simple_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Remove</h3>
              <div style={titles}>
                <PrismCode
                  code={compound_interest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Update</h3>
              <div style={titles}>
                <PrismCode
                  code={format}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={sqrt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={pows}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={triangle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
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

export default (withStyles(styles)(PyGraph));
