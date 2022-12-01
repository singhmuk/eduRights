import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Activations from '../../../assets/AI/activatins.png'


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


const childsFile = `
def sigmoid(x):
  return 1 / (1 + math.exp(-x))

sigmoid(100)  
sigmoid(1)
sigmoid(-56)
sigmoid(0.5)
`.trim();

const tanh = `
def tanh(x):
  return (math.exp(x) - math.exp(-x)) / (math.exp(x) + math.exp(-x))
  
tanh(-56)
tanh(50)
tanh(1)
`.trim();

const reLU = `
def relu(x):
    return max(0,x)
    
relu(-100)
relu(8)
`.trim();

const leaky = `
def leaky_relu(x):
    return max(0.1*x,x)
    
leaky_relu(-100)
leaky_relu(8)
`.trim();


class ActivationFuns extends Component {
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
              <h3>Neural networks</h3>
              <ul>
                <li>A neural network is a very powerful ML mechanism which basically mimics how a human brain learns.</li>
                <li>The brain receives the stimulus from the outside world, does the processing on the i/p, and then generates the o/p. As
                  the task gets complicated, multiple neurons form a complex network, passing information among themselves.</li>
                <li>Each neuron is characterized by its weight, bias and activation function.</li>
              </ul>
              <br />

              <h3>Popular types of activation functions</h3>
              <ul>
                <li><b>1.Binary Step Activation Function</b></li>
                <ul>
                  <li>Returns value either 0 or 1.</li>
                  <li>Returns 0 if i/p is the less then zero.</li>
                  <li>Returns 1 if the i/p is greater than zero.</li>
                </ul>
                <br />

                <li><b>2.Linear Activation Function</b></li>
                <ul>
                  <li>Returns what it gets as i/p.</li>
                </ul>
                <br />

                <li><b>3.Sigmoid Activation Function</b></li>
                <ul>
                  <li>It returns the value beteen 0 and 1.</li>
                  <li>For activation function in deep learning network, Sigmoid function is considered not good since near the boundaries the
                    network doesn't learn quickly. Because gradient is almost zero near the boundaries.</li>
                </ul>
                <br />

                <li><b>4.Tanh Activation Function</b></li>
                <ul>
                  <li>Tanh is nonlinear activation function. Tanh o/p between -1 and 1. </li>
                  <li>It also suffers from gradient problem near the boundaries</li>
                </ul>
                <br />

                <li><b>5.RELU Activation Function</b></li>
                <ul>
                  <li>RELU is less computational expensive than the other non linear activation functions.</li>
                  <li>Returns 0 if i/p is less than 0.</li>
                  <li>Returns x if i/p is greater than 0.</li>
                </ul>
                <br />

                <li><b>6.Softmax Activation Function</b></li>
                <ul>
                  <li>Softmax turns logits, the numeric o/p of the last linear layer of a multi-class classification neural network into probabilities.</li>
                </ul>
              </ul>
              <br />

              <h3>Implementation of activation functions in python.</h3>
              <img src={Activations} alt="Theata" className="responsive2" style={redesign} />
              <br />
              <br />
              <b>Sigmoid</b>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Tanh</h3>
              <div style={titles}>
                <PrismCode
                  code={tanh}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>ReLU</h3>
              <div style={titles}>
                <PrismCode
                  code={reLU}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Leaky ReLU</h3>
              <div style={titles}>
                <PrismCode
                  code={leaky}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
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


export default (withStyles(styles)(ActivationFuns));
