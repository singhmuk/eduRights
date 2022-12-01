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


const approach = `
f(x) = b0 + {n(sigma)n=0 (bi * wi)}  
where bi = input
      wi = weighteg
      b0 = bias
`.trim();

const sigmoid = `
f(x) = 1/ 1+ e(-x)
                
Hyperbolic Tengent range(1,-1)
Hyperbolic Tengent tanh(z): cosh x = e(x) + e(-x)/ 2
                            sinh x = e(x) - e(-x)/ 2
                            tanh x = sinh x/ cosh x
                          
Rectified Linear Unit(reLU): Most useful and relatiely simple function, max(0,z)
`.trim();

const cost = `
c = sigma(y - a)O2/ n 
y = mx + c 
`.trim();

const entropy = `
Cross Entropy: c =-1/n * n(sigma)n=0 (y * ln(a) + (1 - y) * ln(1 - a))
`.trim();

const piplines = `
tf_dataset = tf.data.Dataset.list_files('images/*').map(process_img).flter(filter_fun).map(lambda x:x/255)

      where images = Load images from folder.
            process_img = Convert image content to numpy array. Extract label from folder.
            filter_fun = Filter Blurred images
            map = Scaling
`.trim();

const childsFile = ``.trim();

// const pipes = ``.trim();


class IntroAngular extends Component {
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
              <h3>What is intelligent.</h3>
              <ul>
                <li>Capacity for learning, reasoning, understanding and similar forms of mental activity.</li>
              </ul>
              <br />
              <b>AI: What is the natural of Intelligent Thought.</b>
              <br />

              <b>Ablity to perceive and act in the world.</b>
              <ul>
                <li><b>Reasoning: </b>Proving theorems, medical diagnosis.</li>
                <li><b>Planning: </b>Take decision.</li>
                <li><b>Learning and Adaptation: </b>Recommend movies, learn traffic patterns.</li>
                <li><b>Understanding: </b>text, speech, visual scene.</li>
              </ul>
              Or System that act rationaly.
              <br />

              <h3>Weak AI Hypothesis vs. Strong AI Hypothesis.</h3>
              <ul>
                <li><b>Weak Hyp: </b>Machines could act as if they are intelligent.</li>
                <li><b>Strong Hyp: </b>Machines that act intelligent hae to think intelligently too.</li>
              </ul>
              <br />

              <h3>What is State?</h3>
              All information necessary to make a decision for the task at hand.
              <br />
              <b>state type:</b>
              <br />
              <ul>
                <li>Atomic</li>
                <li>Propositional</li>
                <li>Relational</li>
                <li>First-Order</li>
              </ul>
              <br />

              <table>
                <tr>
                  <th>State Type</th>
                  <th>Description</th>
                  <th>Focus</th>
                </tr>
                <tr>
                  <td>Atomic</td>
                  <td>State are indivisible. No internal structure.</td>
                  <td>Search on atomic state.</td>
                </tr>
                <tr>
                  <td>Propositional</td>
                  <td>State are made of state variables that take values.</td>
                  <td><b>Search</b> + <b>Inference</b> in logic and probabilistic representations.</td>
                </tr>
                <tr>
                  <td>Relational</td>
                  <td>State describe the objects in the world and their inter-relation.</td>
                  <td><b>Search</b> + <b>Inference</b> in predicate logic.</td>
                </tr>
                <tr>
                  <td>First-Order</td>
                  <td><b>+function</b> over objects.</td>
                  <td><b>Search</b> + <b>Inference</b> in first order logic.</td>
                </tr>
              </table>
              <br />

              <h3>DFS</h3>
              <ul>
                <li><b>Time complexity of tree: </b>O(bpm)</li>
                <li><b>Space complexity of tree: </b>O(bm)</li>
              </ul>
              <br />

              <h3>BFS</h3>
              <ul>
                <li><b>Time complexity of tree: </b>O(bpm)</li>
                <li><b>Space complexity of tree: </b>O(bpm)</li>
                <li>Not optimal because, lest cost and sortest path are not same.</li>
              </ul>
              <br />

              <h3>Uniform cost Search</h3>
              <ul>
                <li>Cheapest first.</li>
                <li><b>Time complexity of tree: </b></li>
                <li><b>space complexity of tree:</b></li>
                <li>optimal</li>
              </ul>
              <br />

              <b>Slope: </b>
              <ul>
                <li>Used for linear equation.</li>
                <li>It is a constant.</li>
              </ul>
              <br />

              <b>Derivation:</b>
              <ul>
                <li>Used for non linear equation.</li>
                <li>It is a function.</li>
              </ul>
              why we use log loss for Logistic regression.
              <br />

              <h3>Neural Networks</h3>
              <ul>
                <li><b>Neurons/ Perceptron's: </b>
                  <ul>
                    <li>Neurons is also known as Perceptron. Artificial Neurons Networks are based on Neural biological systems.</li>
                    <li>ANN is a s/w based approach to replicate these biological Neurons.</li>
                    <li><b>Perceptron mathematical model: </b>also called regression Function.
                      <br />
                      <div style={titles}>
                        <PrismCode
                          code={approach}
                          language="js"
                          plugins={["line-numbers"]}
                        />
                      </div>
                    </li>
                  </ul>
                </li>
                <br />
                <li><b>Activation Function: </b>This is known as sigmoid function.
                  <br />
                  <div style={titles}>
                    <PrismCode
                      code={sigmoid}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li><b>Cost Function: </b>
                  <br />
                  <div style={titles}>
                    <PrismCode
                      code={cost}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li><b>Cross Entropy: </b>
                  <br />
                  <div style={titles}>
                    <PrismCode
                      code={entropy}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li><b>Gradient descent: </b><ul>
                  <li>Is an optimization algorithm for finding the minimum of a function.</li>
                  <li>Gradient descent (in 1D)</li>
                </ul>
                </li>
                <br />
                <li><b>backpropagation: </b></li>
              </ul>
              <br />
              <ul>
                <li>Tensor is an array.</li>
                <li><b>Data augmentation: </b>Generate new sample from available samples.</li>
                <li><b>Transfer Learning: </b>It save lot of computation power.</li>
              </ul>
              <br />

              <h3>Image Classification vs Object Detection vs Image Segmentation</h3>
              <ul>
                <li><b>Image Classification: </b>Entire image is one of the classes.</li>
                <ul>
                  <li>Process of assidning labels is called annotation.</li>
                </ul>
                <br />
                <li><b>Object Detection: </b>What is there in image and where.</li>
                <ul>
                  <li>When detect the object within an image with rectangular bounding boxes.</li>
                </ul>
                <br />
                <li><b>Image Segmentation: </b>Which pixels belong to which object.</li>
                <ul>
                  <li>When classify each of the pixels as one of the classes.</li>
                </ul>
              </ul>

              <h3>Popular datasets for computer vision</h3>
              <ul>
                <li><b>ImageNet: </b></li>
                <ul>
                  <li>14 million hand annotated images.</li>
                  <li>Annotated bounding boxes for at least 1 million images.</li>
                  <li>Annotated using crowdsourcing amazon mechanical turk.</li>
                </ul>
                <li><b>Coco: </b></li>
                <li><b>Google Open images: </b></li>
              </ul>
              <br />

              <h3>YOLO algorithm</h3>
              <ul>
                <li>Object detection algorithm.</li>
                <li>So fast.</li>
              </ul>
              <br />

              <h3>Recurrent Neural Network(RNN)</h3>
              Mainly for NLP.
              <br />
              <b>RNN Applicatons:</b>
              <ul>
                <li>Email auto-computation.</li>
                <li>text translation.</li>
                <li>Named Entity Recognization (NER).</li>
                <li>Sentiment Analysis.</li>
              </ul>
              <br />

              <b>Issues using ANN for sequence problems.</b>
              <ul>
                <li>Variable size of i/o neurons.</li>
                <li>Too much computation.</li>
                <li>No Parameter Sharing.</li>
              </ul>
              <br />

              <b>Types of RNN:</b>
              <ul>
                <li>Many to Many</li>
                <li>Many yo One</li>
                <li>One to Many</li>
              </ul>

              <h3>GRU (Gated Recurrent Units)</h3>
              Bidirectional RNN
              <br />

              <h3>Technique to compute Word embedding</h3>
              <ul>
                <li><b>Using Supervised Learning:</b> Take an NLP problem and try to solve it. In that pursuit as a side effect, we got word embedding.</li>
                <li>Self-Supervised learning.</li>
              </ul>
              <br />

              <h3>Word2Vec</h3>
              <ul>
                <li>embeddings are not hand crafted. Instead, they are learnt during neural network training.</li>
                <li>Meaning of word can be inferred by surrounding words. This surrounding words also called context.</li>
              </ul>
              <br />

              <ul>
                <li>1.Take a fake problem.</li>
                <ul>
                  <li><b>Fake problem: </b>Fill in a missing word in a sentence.</li>
                </ul>
                <li>2.Solve it using neural network.</li>
                <li>3.You get word embeddings as a side effect.</li>
                <li><b>COBW (Continuous Bag Of Words): </b>Given context words predict target word.</li>
                <li><b>Skip Gram: </b>Given the target predict context words.</li>
              </ul>
              <br />

              <h3>Tensorflow Input Pipeline</h3>
              In this case use special DS that is tf.data.Dataset.
              <br />

              <div style={titles}>
                <PrismCode
                  code={piplines}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>tf.data i/p Pipeline: </b>ETL: Extract, Transform, Load.
              <br />
              <br />

              <b>Tensorflow i/p Pipeline Benifits: </b>
              <ul>
                <li>1.Handling huge datasets by streaming them from disk using batching.</li>
                <li>2.Apply tranformations to make dataset ready for model training.</li>
              </ul>
              <br />

              <h3>BERT</h3>
              <ul>
                <li>Bidirectional Encoding Representations from Transformers.</li>
                <li>Can generate contextualized embeddings.</li>
                <li>How can we capture similarities b/w two words.</li>
              </ul>
              <br />
              <br />
              <b>tf serving: </b>Makes model version management and model serving very easy.
              <br />

              <h3>Quantization</h3>
              Is a process of reducing model size So that can run on EDGE devices.
              <br />
              <br />
              <b>Benifits of Quantization:</b>
              <ul>
                <li>Run ML models efficient on EDGE devices.</li>
                <li>Faster interference.</li>
              </ul>
              <br />

              <b>Two ways to perform quantization:</b>
              <ul>
                <li>Post training Quantization.</li>
                <ul>
                  <li><b>tf.lite convert</b></li>
                </ul>
                <br />

                <li>Quantization aware training.</li>
                <ul>
                  <li><b>q_model = quantize_model(tf_model)</b></li>
                </ul>
              </ul>
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


export default (withStyles(styles)(IntroAngular));
