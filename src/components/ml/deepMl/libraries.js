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


const cluster = `
import matplotlib.pyplot as plt
import numpy as np

xpoints = np.array([0, 6])
ypoints = np.array([0, 250])

plt.plot(xpoints, ypoints)
plt.show()


# Line plot :
from matplotlib import pyplot as plt
  
x = [5, 2, 9, 4, 7]
y = [10, 5, 8, 4, 2]
  
plt.plot(x,y)
plt.show()


# Bar plot :
from matplotlib import pyplot as plt
  
x = [5, 2, 9, 4, 7]
y = [10, 5, 8, 4, 2]
  
plt.bar(x,y)
plt.show()


# Histogram :
from matplotlib import pyplot as plt
  
y = [10, 5, 8, 4, 2]
  
plt.hist(y)
plt.show()


# Scatter Plot :
from matplotlib import pyplot as plt
  
x = [5, 2, 9, 4, 7]
y = [10, 5, 8, 4, 2]
  
plt.scatter(x, y)
  
plt.show()`.trim();



const stack = ``.trim();

// const stack = ``.trim();

// const stack = ``.trim();

// const stack = ``.trim();


class Libraries extends Component {
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
              <h3>OpenCv(Image-processing)</h3>
              <b>What is Computer Vision?</b><br />
              Essentially means giving a computer the ability to see the world as we humans do.
              <br />
              <br />
              <b>function:</b>
              <ul>
                <li>cv2.imread(path, flag)</li>
                <li>cv2.IMREAD_COLOR</li>
                <li>cv2.IMREAD_GRAYSCALE</li>
                <li>cv2.IMREAD_UNCHANGED</li>
                <li>cv2.imwrite(filename, image)</li>
              </ul>
              <br />
              <br />
              <b>Applications of Computer Vision:</b><br />
              <ul>
                <li>Robotics Application</li>
                <li>Medicine Application</li>
                <li>Industrial Automation Application</li>
                <li>Security Application(Biometrics, Surveillance)</li>
              </ul>
              <br />
              <br />
              <b>Features</b><br />
              <ul>
                <li>Read and write images</li>
                <li>Capture and save videos</li>
                <li>Process images (filter, transform)</li>
                <li>Perform feature detection</li>
                <li>Detect specific objects such as faces, eyes, cars, in the videos or images.</li>
                <li>Analyze the video, i.e., estimate the motion in it, subtract the background, and track objects in it.</li>
              </ul>
              <br />







              

              {/* <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Libraries));
