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


const matplotlib = `
import matplotlib

print(matplotlib.__version__)`.trim();

const Pyplot = `
import matplotlib.pyplot as plt
import numpy as np

x = np.array([1, 2, 6, 8])                            #Multiple Points
y = np.array([3, 8, 1, 10])

plt.plot(x, y)
plt.plot(x, y, 'o')                                   #Draw two points, one at position (0, 0) and (6, 250).
plt.plot(y, marker = 'o')                             #Mark each point with a circle.
plt.plot(y, marker = 'o', ms = 20)                    #ms to set the size of the markers.
plt.plot(y, marker = 'o', mec = 'r')                  #mec to set the color of the edge of the.
plt.plot(y,  ms = 20, mfc = 'r')                      #mfc to set the color inside the edge of the markers.

plt.show()
`.trim();

const Plotting = `
plt.plot(y, linestyle = 'dotted')                     #'dashed', 
plt.plot(y, ls = ':')
plt.plot(y, linewidth = '20.5')

plt.show()
`.trim();

const labels = `
plt.xlabel("Average Pulse")
plt.ylabel("Calorie Burnage")
plt.title("Sports Watch Data")                                      #to set a title for the plot.

plt.show()


#Set Font Properties for
font1 = {'family':'serif','color':'blue','size':20}
plt.xlabel("Average Pulse", fontdict = font1)

plt.show()
`.trim();

const grids = `
plt.grid()
plt.grid(axis = 'x')
plt.grid(color = 'green', linestyle = '--', linewidth = 0.5)

plt.show()
`.trim();

const subplots = `
plt.subplot(1, 2, 1)
plt.suptitle("MY SHOP")
plt.plot(x,y)

plt.show()
`.trim();

const scatter = `
plt.scatter(x, y)
plt.scatter(x, y, color = '#88c999')                         #set color for each scatter plot with the color or c argument.
plt.colorbar()                                               #include the colormap.
plt.scatter(x, y, s=10)                                      #set size.
plt.scatter(x, y, alpha=0.5)                                 #adjust the transparency of the dots.

plt.show()
`.trim();

const bars = `
plt.bar(x,y)
plt.barh(x, y)                                                    #bars to be displayed horizontally.
plt.bar(x, y, color = "red")
plt.bar(x, y, width = 0.1)
plt.barh(x, y, height = 0.1)

plt.show()


#
x = ["APPLES", "BANANAS"]
y = [400, 350]
plt.bar(x, y)
`.trim();

const histogram = `
x = np.random.normal(170, 10, 250)
plt.hist(x)

plt.show()`.trim();

const pie = `
mylabels = ["Apples", "Bananas", "Cherries", "Dates"]                                 #labels to the pie chart.

plt.pie(y, labels = mylabels)
plt.pie(y, labels = mylabels, startangle = 90)
plt.pie(y, labels = mylabels, explode = myexplode)                                    #explode
plt.pie(y, labels = mylabels, shadow = True)                                          #shadow
plt.legend()

plt.show()
`.trim();

class Bagging extends Component {
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
              <h3>Matplotlib (for creating graph)</h3>
              <ul>
                <li>Matplotlib for producing plots and other 2D data visualizations.</li>
                <li>Matplotlib is a low level graph plotting library in python that serves as a data visualization
                  utility. It is a cross-platform library for making 2D plots from data in arrays.</li>
                <li>Matplotlib is mostly written in python, a few segments are written in C, Objective-C and
                  Javascript for Platform compatibility.</li>
                <li>Matplotlib is written in Python and makes use of NumPy.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={matplotlib}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Pyplot</h3>
              Most of the Matplotlib utilities lies under the pyplot submodule, and are under the plt alias.
              <br />

              <b>Types of Plots:</b>
              <ul>
                <ul>
                  <li><b>pyplot():</b></li>
                  <li><b>draw():</b></li>
                  <li><b>show() :</b></li>
                  <li><b>title():</b></li>
                  <li><b>xscale():</b></li>
                  <li><b>xticks():</b></li>
                  <li><b>ylabel():</b></li>
                  <li><b>ylim():</b></li>
                  <li><b>acorr():</b>Plot the autocorrelation of x.</li>
                  <li><b>angle_spectrum():</b>Plot the angle spectrum.</li>
                  <li><b>annotate():</b>Annotate the point xy with text text.</li>
                  <li><b>arrow():</b>Add an arrow to the Axes.</li>
                  <li><b>autoscale():</b>Autoscale the axis view to the data (toggle).</li>
                  <li><b>axes():</b>Add an axes to the current figure and make it the current axes.</li>
                  <li><b>axis():</b>Convenience method to get or set some axis properties.</li>
                  <li><b>bar	Make():</b>a bar plot.</li>
                  <li><b>bar_label():</b>Label a bar plot.</li>
                  <li><b>barbs	Plot():</b>a 2D field of barbs.</li>
                  <li><b>barh():</b>Make a horizontal bar plot.</li>
                  <li><b>box():</b>Turn the axes box on or off on the current axes.</li>
                  <li><b>boxplot():</b>Make a box and whisker plot.</li>
                  <li><b>broken_barh():</b>Plot a horizontal sequence of rectangles.</li>
                  <li><b>cla():</b>Clear the current axes.</li>
                  <li><b>delaxes():</b>Remove an Axes (defaulting to the current axes) from its figure.</li>
                  <li><b>draw():</b>Redraw the current figure.</li>
                  <li><b>draw_if_interactive() :</b>Redraw the current figure if in interactive mode.</li>
                  <li><b>errorbar():</b>Plot y versus x as lines and/or markers with attached errorbars.</li>
                  <li><b>cohere():</b>Plot the coherence between x and y.</li>
                </ul>
                <br />

                <li><b>bar: </b>Make a bar plot.</li>
                <li><b>barh: </b>Make a horizontal bar plot.</li>
                <li><b>boxplot: </b>Make a box and whisker plot.</li>
                <li><b>hist: </b>Plot a histogram.</li>
                <li><b>hist2d: </b>Make a 2D histogram plot.</li>
                <li><b>pie: </b>Plot a pie chart.</li>
                <li><b>plot: </b>Plot lines and/or markers to the Axes.</li>
                <ul>
                  <li>plot() function is used to draw points (markers) in a diagram. By default, it draws a line from
                    point to point.</li>
                  <li>Parameter 1 is an array containing the points on the x-axis.</li>
                  <li>Parameter 2 is an array containing the points on the y-axis.</li>
                  <li>If we do not specify the points in the x-axis, they will get the default values 0, 1, 2, 3,...
                    (depending on the length of the y-points.</li>
                </ul>
                <li><b>polar: </b>Make a polar plot..</li>
                <li><b>scatter: </b>Make a scatter plot of x vs y.</li>
                <li><b>stackplot: </b>Draws a stacked area plot.</li>
                <li><b>stem: </b>Create a stem plot.</li>
                <li><b>step: </b>Make a step plot.</li>
                <li><b>quiver: </b>Plot a 2-D field of arrows.</li>
              </ul>
              <br />

              <b>Image Functions:</b>
              <ul>
                <li><b>imread: </b>Read an image from a file into an array.</li>
                <li><b>imsave: </b>Save an array as in image file.</li>
                <li><b>imshow: </b>Display an image on the axes.</li>
              </ul>
              <br />

              <b>Axis Functions:</b>
              <ul>
                <li><b>axes: </b>Add axes to the figure.</li>
                <li><b>text: </b>Add text to the axes.</li>
                <li><b>title: </b>Set a title of the current axes.</li>
                <li><b>xlabel: </b>Set the x axis label of the current axis.</li>
                <li><b>xlim: </b>Get or set the x limits of the current axes.</li>
                <li><b>xscale: </b></li>
                <li><b>xticks: </b>Get or set the x-limits of the current tick locations and labels.</li>
              </ul>
              <br />

              <b>Figure Functions:</b>
              <ul>
                <li><b>figtext: </b>Add text to figure.</li>
                <li><b>figure: </b>Creates a new figure.</li>
                <li><b>show: </b>Display a figure.</li>
                <li><b>savefig: </b>Save the current figure.</li>
                <li><b>close: </b>Close a figure window.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={Pyplot}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Line</h3>
              We use the keyword argument linestyle, or ls, to change the style of the plotted line.
              <br />

              <ul>
                <li>linestyle can be written as ls.</li>
                <li>dotted can be written as :.</li>
                <li>dashed can be written as --.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={Plotting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Labels and Title</h3>
              Use the xlabel() and ylabel() functions to set a label for the x- and y-axis.
              <br />
              <br />
              use the loc parameter in title() to position the title.
              <br />
              Legal values are: 'left', 'right', and 'center'. Default value is 'center'.
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={labels}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Adding Grid Lines</h3>
              <ul>
                <li>Use the grid() function to add grid lines to the plot.</li>
                <li>Use the axis parameter in the grid() to specify which grid lines to display.</li>
                <li>Also set the line properties of the grid, like: grid(color = 'color', linestyle = 'linestyle',
                  linewidth = number).</li>
                <li></li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={grids}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Subplots</h3>
              <ul>
                <li>subplots() can draw multiple plots in one figure.</li>
                <li>It takes three arguments that describes the layout of the figure.</li>
                <li>The layout is organized in rows and columns, which are represented by the first and second argument,
                  third argument represents the index of the current plot.
                </li>
                <li>Add a title to the entire figure with the suptitle() function.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={subplots}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Scatter</h3>
              <ul>
                <li>Use the scatter() to draw a scatter plot.</li>
                <li>The scatter() function plots one dot for each observation. It needs two arrays of the same length,
                  one for the values of the x-axis, and other for y-axis.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={scatter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Bars</h3>
              <ul>
                <li>Use the bar() function to draw bar graphs.</li>
                <li>The bar() function takes arguments that describes the layout of the bars.</li>
                <li>The categories and their values represented by the first and second argument as arrays.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={bars}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Histograms</h3>
              <ul>
                <li>A histogram is a graph showing frequency distributions. It is a graph showing the number of
                  observations within each given interval.</li>
                <li>Use the hist() function to create histograms.</li>
                <li>The hist() function will use an array of numbers to create a histogram, the array is sent into
                  the function as an argument.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={histogram}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Matplotlib Pie Charts</h3>
              <ul>
                <li>Use the pie() function to draw pie charts.</li>
                <li>The default start angle is at the x-axis, but you can change the start angle by specifying a startangle parameter.</li>
                <li>With explode allow one of the wedges to stand out</li>
                <li>To add a list of explanation for each wedge, use the legend() function.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={pie}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Bagging));
