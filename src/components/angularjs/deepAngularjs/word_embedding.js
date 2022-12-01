import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Activations from '../../../assets/AI/wordembedding.png'


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
import numpy as np
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Embedding

reviews = ['nice food',
        'amazing restaurant',
        'too good',
        'just loved it!',
        'will go again',
        'horrible food',
        'never go there',
        'poor service',
        'poor quality',
        'needs improvement']

sentiment = np.array([1,1,1,1,1,0,0,0,0,0])
one_hot("amazing restaurant",30)

vocab_size = 30
encoded_reviews = [one_hot(d, vocab_size) for d in reviews]
print(encoded_reviews)

max_length = 4
padded_reviews = pad_sequences(encoded_reviews, maxlen=max_length, padding='post')
print(padded_reviews)

embeded_vector_size = 5

model = Sequential()
model.add(Embedding(vocab_size, embeded_vector_size, input_length=max_length,name="embedding"))
model.add(Flatten())
model.add(Dense(1, activation='sigmoid'))

X = padded_reviews
y = sentiment

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
print(model.summary())

model.fit(X, y, epochs=50, verbose=0)
weights = model.get_layer('embedding').get_weights()[0]

weights[13]
weights[4]
weights[16]
`.trim();

// const pipes = ``.trim();

// const pipes = ``.trim();

// const pipes = ``.trim();


class WordEmbedding extends Component {
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
              <h3>Word Embedding</h3>
              <ul>
                <li>Computers break everything down to numbers. What happens when a software inside a computer (like a ML algorithm) has to operate/ process
                  a word? Simple, this word needs to be given to the computer as the only thing it can understand: as numbers.</li>
                <li>In NLP, the most simple way to do this is by creating a vocabulary with a huge amount of words (100.000), and assigning a number to
                  each word in the vocabulary.</li>
                <li>The first word in our vocabulary (‘apple’ maybe) will be number 0. The second word (‘banana’) will be number 1, and so on up
                  to number 99.998, the previous to last word (‘king’) and 999.999 being assigned to the last word (‘queen’).</li>
                <li>Then we represent every word as a vector of length 100.000, where every single item is a zero except one of them, corresponding
                  to the index of the number that the word is associated with.</li>
                <br />
                <img src={Activations} alt="Theata" className="responsive2" style={redesign} />
                <br />
                <li>This is called one-hot encoding for words.</li>
                <li>The main thing is that word embeddings are vectors that represent words, so that similar meaning words have similar vectors.</li>
                <li>The two most used Word embedding algorithms are Word2Vec and GloVe.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={childsFile}
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
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={childsFile}
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


export default (withStyles(styles)(WordEmbedding));
