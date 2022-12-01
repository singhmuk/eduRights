import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import logsvalues from '../../../assets/AI/convolutinal.png'

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
(X_train, y_train), (X_test,y_test) = datasets.cifar10.load_data()
X_train.shape
X_test.shape
y_train[:5]

y_train = y_train.reshape(-1,)
y_test = y_test.reshape(-1,)
`.trim();

const images = `
def plot_sample(X, y, index):
    plt.figure(figsize = (15,2))
    plt.imshow(X[index])
    plt.xlabel(classes[y[index]])
    
plot_sample(X_train, y_train, 0)
plot_sample(X_train, y_train, 1)
`.trim();

const normalize = `
X_train = X_train / 255.0
X_test = X_test / 255.0
`.trim();

const artificial = `
ann = models.Sequential([
  layers.Flatten(input_shape=(32,32,3)),
  layers.Dense(3000, activation='relu'),
  layers.Dense(1000, activation='relu'),
  layers.Dense(10, activation='sigmoid')    
])

ann.compile(optimizer='SGD',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy'])

ann.fit(X_train, y_train, epochs=5)


from sklearn.metrics import confusion_matrix , classification_report
import numpy as np
y_pred = ann.predict(X_test)
y_pred_classes = [np.argmax(element) for element in y_pred]

print("Classification Report: nL", classification_report(y_test, y_pred_classes))
`.trim();

const imagesp = `
cnn = models.Sequential([
  layers.Conv2D(filters=32, kernel_size=(3, 3), activation='relu', input_shape=(32, 32, 3)),
  layers.MaxPooling2D((2, 2)),
  
  layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'),
  layers.MaxPooling2D((2, 2)),
  
  layers.Flatten(),
  layers.Dense(64, activation='relu'),
  layers.Dense(10, activation='softmax')
])


cnn.compile(optimizer='adam', loss='sparse_categorical_crossentropy',metrics=['accuracy'])
              
cnn.fit(X_train, y_train, epochs=10)
cnn.evaluate(X_test,y_test)
cnn.evaluate(X_test,y_test)

y_pred = cnn.predict(X_test)
y_pred[:5]

y_classes = [np.argmax(element) for element in y_pred]
y_classes[:5]
y_test[:5]

plot_sample(X_test, y_test,3)
classes[y_classes[3]]
classes[y_classes[3]]
`.trim();

const childsFile2 = `
(X_train, y_train) , (X_test, y_test) = keras.datasets.mnist.load_data()
X_train.shape
X_train[0].shape

plt.matshow(X_train[0])
X_train = X_train / 255
`.trim();

const classifications = `
model = keras.Sequential([
  keras.layers.Flatten(input_shape=(28, 28)),
  keras.layers.Dense(100, activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(X_train, y_train, epochs=10)
model.evaluate(X_test,y_test)
X_train = X_train.reshape(-1,28,28,1)
X_train.shape

X_test = X_test.reshape(-1,28,28,1)
X_test.shape
`.trim();

const pipes = `
model = keras.Sequential([
    
  layers.Conv2D(30, (3,3), activation='relu', input_shape=(28, 28, 1)),
  layers.MaxPooling2D((2,2)),

  layers.Flatten(),
  layers.Dense(100, activation='relu'),
  keras.layers.Dense(10, activation='sigmoid')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=5)

y_train[:5]
model.evaluate(X_test,y_test)
`.trim();

// const pipes = ``.trim();


class Convolutionals extends Component {
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
              <h3>1. Small Image Classification Using Convolutional Neural Network (CNN)</h3>
              In deep learning, CNN/ConvNet is a class of deep neural networks, most commonly applied to analyze visual imagery. In mathematics
              convolution is a mathematical operation on two functions that produces a third function that expresses how the shape of one is modified by
              the other.
              <br />
              <br />
              <img src={logsvalues} alt="Theata" className="responsive2" style={redesign} />

              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Plot some images to see what they are</h3>
              <div style={titles}>
                <PrismCode
                  code={images}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Normalizing the training data</h3>
              Normalize the images to a number from 0 to 1. Image has 3 channels (R,G,B) and each value in the channel
              can range from 0 to 255. Hence to normalize in 0--1 range, we need to divide it by 255.
              <br />
              <div style={titles}>
                <PrismCode
                  code={normalize}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Build simple artificial neural network for image classification</h3>
              <div style={titles}>
                <PrismCode
                  code={artificial}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Now let us build a convolutional neural network to train our images</h3>
              To handle variety in digits we use simple artificial Neural network (ANN).
              <ul>
                <li>1.Loopy Pattern detector.</li>
                <li>2.Vertical line detector.</li>
                <li>3.Diagonal line detector.</li>
              </ul>
              <br />
              <br />

              <b>Disadvantages of using ANN for image classification:</b>
              <ul>
                <li> 1.Too much computation.</li>
                <li>2.Treats local pixels same as pixels far apart.</li>
                <li>3.Sensitive to location of an object in an image.</li>
              </ul>
              <br />
              <br />

              <b>ReLU helps with making the model nonlinear.</b>
              <ul>
                <li>1.Introduces nonlinearity.</li>
                <li>2.Speeds up training, faster to compute.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={imagesp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>With CNN, at the end 5 epochs, accuracy was at around 70.28% which is a significant improvement over ANN. CNN's are best for image classification and gives superb accuracy. Also computation is much less compared to simple ANN as maxpooling reduces the image dimensions while still preserving the features.</i>
              <br />

              <h3>Pooling</h3>
              Pooling layer is used to reduce the size.
              <br />
              <br />
              <b>Benifits of Pooling:</b>
              <ul>
                <li>1.Reduce dimensions & computation.</li>
                <li>2.Reduce overfitting as there are less parameter.</li>
                <li>3.Model is tolerant towards variations, distotions.</li>
              </ul>
              <br />

              <h3>Convolution</h3>
              <ul>
                <li>1.Connections sparsity reduces overfitting.</li>
                <li>2.Conv + Pooling gives location invariant feature detection.</li>
                <li>3.Parameter sharing.</li>
              </ul>
              <br />
              <br />
              <b>CNN by itself dpesn't take care of Rotation and Scale.</b>
              <ul>
                <li>1.You need to have rotated, scaled samples in training dataset.</li>
                <li>2.If you don't have such samples than data augmentation methods to generate new rotated/ scaled samples from existing training samples.</li>
              </ul>
              <br />
              <br />
              <b>Convolution padding and stride:</b>
              <ul>
                <li><b>Disadvantage: </b>Corner pixels don't contribute as much in feature detection.</li>
                <li><b>Valid Connections: </b>Np Padding.</li>
                <li><b>Same Connections: </b>Pad such that o/p is same.</li>
              </ul>
              <br />

              <h3>2. Handwritten digits classification using CNN</h3>
              <i>We will classify handwritten digits using a simple neural network (ANN) first and than repeat same
                thing with convolutional neural network. We will see how accuracy improves clickly when you use convolutional
                neural network.</i>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={childsFile2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using ANN for classification</h3>
              <div style={titles}>
                <PrismCode
                  code={classifications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Using CNN for classification</h3>
              <div style={titles}>
                <PrismCode
                  code={pipes}
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


export default (withStyles(styles)(Convolutionals));
