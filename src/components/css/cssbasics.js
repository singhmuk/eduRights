import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../ReactJs/styles.css";
import Sidebar from "./sidebar";
import PrismCode from "../ReactJs/prismCode";

import Browser from "../../assets/css1.PNG";
import boxModels from "../../assets/boxings.png";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const flextFloat = `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.item {
  background-color: #eee;
  padding: 20px;
  text-align: center;
  font-size: 30px;
  margin: 10px;
}


//app.html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
`.trim();

const floatele = `
* {
  padding: 0;
  margin: 0/ auto;
  bottom: 0;
  right: 0;
}

.img1, .img2, .img3, .img4{
  width:30%;
  max-width: 500px;
  height:100px;
  border: 2px solid red;
  opacity: 0.5;
}


div{
  outline: 2px solid red;
  float:left/ none/ inherit;
  clear: left / both;
  display: flex/ grid/ block/ inline/ table;
  flex-grow: 3;                                              
  flex-shrink: 2;
  flex-direction: row/ column/ row-reverse/ column-reverse; 
  flex-wrap: wrap/ rap-reverse;
  flex-flow:row-reverse wrap;
  justify-content: center/ space-between/ space-evenly/ space-around;
  align-items: center/ flex-end/ stretch;
  grid-template-columns: 2fr 5fr 2fr 1fr;                               
  grid-template-rows: 1fr 3fr;
  grid-auto-flow: 2fr 5fr;
  grid-gap: 1rem;
  grid-column: 1 / span 2;
  grid-row: 2 / span 3;
  background-color: blue;
  position: static/ relative/ absolute/ inline/ fixed / sticky;
  
}
`.trim();

const psudoele = `
.link::before {
  content: "\f067";
  font-family: FontAwesome;
  margin-right: 5px;
}

//app.html
<a href="#" class="link">Click me!</a>
`.trim();

const pseudoclas = `
a:link {
  color: red;
 
}

//visited link 
a:visited {
  color: green;
}

//mouse over link 
a:hover {
  color: hotpink;
}

//selected link 
a:active {
  color: blue;
}
`.trim();

const table_layout = `table-layout: auto|fixed|initial|inherit;`.trim();

const elements = `
div, p - Selects all <div> elements and all <p> elements
div p - Selects all <p> elements that are anywhere inside a <div> element
div > p - Selects all <p> elements where the immediate parent is a <div> element
div + p - Selects all <p> elements that are placed immediately after a <div> element
div ~ p - Selects all <p> elements that are anywhere preceded by a <div> element

.div, p{
  outline:2px solid pink;
  padding: 10px;
  word-spacing: 20px;
}
`.trim();

const meaning = `
cm - centimeters
em - elements (i.e., relative to the font-size of the element; e.g., 2 em means 2 times the current font size)
in - inches
mm - millimeters
pc - picas (1 pc = 12 pt = 1/6th of an inch)
pt - points (1 pt = 1/72nd of an inch)
px - pixels (1 px = 1/96th of an inch)

.vh{
  width: 20vw; 
  height: 30vh;
  font-size: 100px;
  font-size: 100pt;
  font-size: 2.5em;
  font-size: 100%;
  font-size: 2pc;
  font-size: 2cm;
  font-size: 2mm; 
  font-size: 2in;
}
`.trim();

const inlinestyles = `
//  display: block/ inline/ inline-block; 

.container {
  text-align: center;
}

.box {
  display: inline-block;
  width: 100px;
  margin: 10px;
  background-color: #f2f2f2;
}


//app.html
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
  
`.trim();

const relativestyles = `
.static {
  position: static/ relative/ fixed/ absolute/ sticky;
}
`.trim();

const backgroundImg = `
background-image: url("bgdesert.jpg");
background-repeat: repeat-x/ no-repeat;
background-position: right top;
background-attachment: fixed / scroll;
background: #ffffff url("img_tree.png") no-repeat right top;

border-style: solid;
border-bottom-style: dotted;
max-width: 500px;
outline-style: dotted;
outline-width: thin;
outline-color: red;
outline-offset: 15px;
`.trim();

const hiddenStyles = `
h1.hidden {
  display: none;
  visibility: hidden;
}
`.trim();

const boxModel = `
padding: 25px  50px   75px   100px;                                  //top   right  bottom left. 
padding: 25px 50px;                            //top/bottom padding 25px; right/left padding 50px.

color: blue;
text-align: center / left / right / justify;
vertical-align: baseline / text-top / text-bottom / sub / super;
text-decoration: none / overline / line-through / underline;
text-transform: uppercase / lowercase / capitalize;
text-indent: 50px;
letter-spacing: 5px;
line-height: 0.8;
word-spacing: 10px;
white-space: nowrap;

text-shadow: 2px 2px;
font-family: 'Montserrat';
font-style: normal;
font-weight: bold/ 900;
font-variant: small-caps;
font-size: 1.875em;

z-index: -1 / 1 / 3;

overflow: visible / hidden / scroll / auto;
overflow-y: scroll; 
`.trim();

const supports = `
@supports (display: grid) {
	div {
		display: grid;
	}
}
`.trim();

const tweening = `
p {
  animation-duration: 2s;
  animation-name: slidethrough;
}

@keyframes slidethrough {
  from {
    margin-left: 100%;
    width: 300%; 
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
`.trim();

const sprites = `
.sprites {
  width: 200px;
  background-image: url("abc.png");
  background-position: 0px -200px;  //second image start after 200px. initials 200px occupied by first image
}
`.trim();

const gridspace = `
//display
.container { display: grid | inline-grid; }

      
//grid-template-rows:
.container {
  grid-template-columns: 40px 50px auto;
  grid-template-rows: 25% 100px auto ;
}


.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
`.trim();

const judtifyItems = `
.container {
  align-items: start | end | center | stretch;
}
`.trim();

const justifycontain = `
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;    
}


//
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
`.trim();

const propertieschilds = `
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}

//justify-self
.item {
  justify-self: start | end | center | stretch;
}

//align-self
.item {
  align-self: start | end | center | stretch;
}
`.trim();

const selectors = `
Child selectors: ul > li

targets all list items that are direct children of unordered lists
`.trim();

const horizontallycss = `
<div class="container">
    <div class="element">Center me!</div>
</div>


//css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.element {
  width: 200px;
  height: 200px;
  background-color: red;
  color: white;
  text-align: center;
  line-height: 200px;
}
`.trim();

const horizontallycss2 = `
<div class="container">
    <div class="element">Center me!</div>
</div>


//css
.container {
  position: relative;
  height: 100vh;
}

.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: red;
  text-align: center;
  line-height: 200px;
}
`.trim();

const horizontallycss3 = `
<div class="container">
    <div class="element">Center me!</div>
</div>


//css
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}

.element {
  width: 200px;
  height: 200px;
  background-color: red;
  text-align: center;
  line-height: 200px;
}

`.trim();

const mediaQres = `
@media screen and (min-width: 768px) and (max-width: 1024px) {

}
`.trim();

const animations = `
@keyframes my-animation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.element {
  animation: my-animation 2s infinite;
}`.trim();

const animations2 = `
.element {
  transition: background-color 1s ease-in-out;
}

.element:hover {
  background-color: red;
}`.trim();

const flexboxcss = `display: flex;`.trim();

const flexboxcss2 = `
display: flex;
flex-direction: row; /* or column */`.trim();

const flexboxcss3 = `
.item {
  flex: 1;
}`.trim();

const flexboxcss4 = `
display: flex;
justify-content: center; /* or flex-start, flex-end, space-between, space-around */`.trim();

const flexboxcss5 = `
display: flex;
align-items: center; /* or flex-start, flex-end, baseline, stretch */`.trim();

const flexboxcss6 = `
align-self: flex-end; /* or flex-start, center, baseline, stretch */
`.trim();

const responsivecss = `
<img src="example-image.jpg" alt="Example Image" style="max-width: 100%; height: auto;">
`.trim();

const responsivecss2 = `
<img srcset="example-image-480w.jpg 480w,
             example-image-768w.jpg 768w,
             example-image-1024w.jpg 1024w"
     sizes="(max-width: 768px) 100vw,
            768px"
     src="example-image-768w.jpg" alt="Example Image">
`.trim();

const boxShadow = `
.box {
  width: 200px;
  height: 200px;
  background-color: #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
`.trim();

class CssBasics extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>
                1. How does CSS actually work (under the hood of browser)?
              </h3>
              <ol>
                <li>
                  CSS is a style sheet language used for describing the
                  presentation of web pages. It is used to style and layout HTML
                  elements on a web page.
                </li>
                <br />
                <li>
                  When a web page is loaded in a browser, the browser parses the
                  HTML and CSS code to create the Document Object Model and the
                  CSS Object Model (CSSOM) respectively. The DOM represents the
                  structure of the web page, while the CSSOM represents the
                  styles applied to the elements on the web page.
                </li>
                <br />
                <li>
                  After the DOM and CSSOM are created, the browser uses them to
                  calculate the layout of the web page, a process known as the
                  render tree. The render tree is a visual representation of the
                  web page, showing how each element is positioned and styled
                  relative to other elements.
                </li>
                <br />
                <li>
                  During the rendering process, the browser applies the CSS
                  styles to the corresponding elements in the render tree. It
                  does this by computing the computed style of each element,
                  which is the final style that will be applied to the element.
                  The computed style takes into account the styles specified in
                  the style sheet, as well as any styles inherited from parent
                  elements, and any styles applied by user-agent stylesheets
                </li>
                <br />
                <li>
                  Once the computed styles have been determined, the browser
                  uses them to render the web page on the user's screen. This
                  involves drawing each element in its correct position and with
                  the correct styles applied.
                </li>
                <br />
                <li>
                  Overall, the process of rendering a web page with CSS involves
                  parsing the CSS code, computing the computed styles of each
                  element, and using these styles to lay out and render the web
                  page.
                </li>
              </ol>
              <br />
              <br />
              <h3>2. There are a number of benefits of CSS, including</h3>
              <ol>
                <li>
                  <b>Faster Page Speed: </b>More code means slower page speed.
                  And CSS enables us to use less code. CSS allows to use one CSS
                  rule and apply it to all occurrences of a certain tag within
                  an HTML document.
                </li>
                <br />
                <li>
                  <b>Better User Experience: </b>It allows for user-friendly
                  formatting. When buttons and text are in logical places and
                  well organized, user experience improves.
                </li>
                <br />
                <li>
                  <b>Responsive Design: </b>
                </li>
                <br />
                <li>
                  <b>Improved Performance: </b>
                </li>
                <br />
                <li>
                  <b>Easy Formatting Changes: </b>
                </li>
                <br />
                <li>
                  <b>Compatibility Across Devices: </b>
                </li>
              </ol>
              <br />
              <br />
              <h3>3. Explain the basic rules of CSS Specificity</h3>
              Specificity determines which rules will take precedence.
              <br />
              <ol>
                <li>
                  CSS style applied by referencing external stylesheet has
                  lowest precedence and is overridden by Internal and inline
                  CSS.
                </li>
                <li>Internal CSS is overridden by inline CSS.</li>
                <li>
                  Inline CSS has highest priority and overrides all other
                  selectors.
                </li>
                <li>
                  ID selectors have a higher specificity than attribute
                  selectors.
                </li>
                <li>A class selector beats any number of element selectors.</li>
                <li>Universal selector (*) has no specificity.</li>
              </ol>
              <br />
              <h3>
                4. How do you specify units in the CSS?. What are the different
                ways to do it?
              </h3>
              <b>What is VH/VW (viewport height/ viewport width) in CSS?</b>
              <ol>
                <li>
                  It’s a CSS unit used to measure the height and width in
                  percentage w.r.t viewport. It is used mainly in responsive
                  design techniques.
                  <br /> VH = 1/100 of the height of the viewport.
                </li>
                <li>
                  If the height of the browser is 1000px, 1vh = 10px. Similarly,
                  if the width is 1000px, then 1vw = 10px.
                </li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={meaning}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                5. What is the difference between the font-size and line-height
                properties in CSS?
              </h3>
              <ul>
                <li>
                  <b>font-size : </b> Property sets the size of the font used to
                  display text.
                </li>
                <br />
                <li>
                  <b>line-height: </b>Property sets the height of a line of
                  text. It determines the vertical space between two lines of
                  text.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                6. What are the different types of Selectors in CSS? or
                <br /> How do you use CSS selectors to target specific elements
                in a web page?
              </h3>
              <ol>
                <li>
                  <b>Universal Selector: </b>Selecting all elements on a page.{" "}
                </li>
                <br />
                <li>
                  <b>Type selectors: </b>These selectors target elements based
                  on their tag name. For example, p targets all paragraph
                  elements on a page.
                </li>
                <br />
                <li>
                  <b>Class selectors: </b>These selectors target elements based
                  on their class attribute.
                </li>
                <br />
                <li>
                  <b>ID selectors: </b>These selectors target elements based on
                  their ID attribute.
                </li>
                <br />
                <li>
                  <b>Attribute selectors: </b>These selectors target elements
                  based on their attribute values. For example, [href] targets
                  all elements with an href attribute.
                </li>
                <br />
                <li>
                  <b>Descendant selectors: </b>These selectors target elements
                  that are descendants of another element. For example, ul li
                  targets all list items that are descendants of unordered
                  lists.
                </li>
                <br />
                <li>
                  <b>Child selectors: </b>These selectors target elements that
                  are direct children of another element.
                </li>
                <br />
                <li>
                  <b>Adjacent sibling selectors: </b>These selectors target
                  elements that come immediately after another element. For
                  example, h2 + p targets the first paragraph that comes
                  immediately after an h2 element.
                </li>
                <br />
                <li>
                  <b>General sibling selectors: </b>These selectors target
                  elements that come after another element. For example, h2 ~ p
                  targets all paragraphs that come after an h2 element.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={selectors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                7. What is the difference between ID and class selectors in CSS.
              </h3>
              Both ID and class selectors are used to target specific elements
              on a web page, but they have some differences:
              <br />
              <ul>
                <li>
                  ID selectors start with the "#" symbol, followed by the ID
                  name, while class selectors start with the "." symbol.
                </li>
                <br />
                <li>
                  An ID should be unique and used only once per page, while a
                  class can be used multiple times on a page.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                8. Explain what elements will match each of the following CSS
                selectors
              </h3>
              <div style={titles}>
                <PrismCode
                  code={elements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>9. What are media queries, and how are they used in CSS.</h3>
              Media queries are a feature in CSS that allow you to apply
              different styles to a web page depending on the size and
              capabilities of the device it is being viewed on.
              <br />
              <div style={titles}>
                <PrismCode
                  code={mediaQres}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                10. What are the best practices for optimizing CSS performance?
              </h3>
              <ul>
                <li>
                  <b>Minimize HTTP requests: </b>Reduce the number of requests
                  your web page makes by combining multiple CSS files into one.
                </li>
                <br />
                <li>
                  <b>Use external stylesheets: </b>Move your CSS to external
                  files instead of using inline styles. This will make it easier
                  to cache and reduce the file size of your HTML documents.
                </li>
                <br />
                <li>
                  <b>Use a CSS preprocessor: </b>Use a CSS preprocessor like
                  Sass or Less to streamline your CSS and make it more
                  maintainable.
                </li>
                <br />
                <li>
                  <b>Use CSS resets: </b>CSS resets can help ensure that your
                  styles are consistent across different browsers.
                </li>
                <br />
                <li>
                  <b>Avoid using !important: </b> Using !important in your CSS
                  can make it harder to maintain and override styles later on.
                </li>
                <br />
                <li>
                  <b>Minimize the use of floats: </b>Overuse of floats can cause
                  performance issues, so try to use them sparingly.
                </li>
                <br />
                <li>
                  <b>Use media queries to optimize for different devices: </b>
                  Use media queries to optimize your styles for different screen
                  sizes and devices.
                </li>
                <br />
              </ul>
              <br />
              <br />
              <h3>
                11. How do you use CSS to create animations and transitions
              </h3>
              <ul>
                <li>
                  <b>Animations: </b>Animations in CSS can be created using the
                  @keyframes rule, which defines the keyframes of the animation.
                  This is followed by the animation property, which is used to
                  apply the animation to an element.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={animations}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                The @keyframes rule defines a rotation animation, which rotates
                an element 360 degrees.
                <br />
                <br />
                <li>
                  <b>Transitions: </b>Transitions in CSS can be created using
                  the transition property. This property allows you to specify a
                  transition effect for a property over a specified duration.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={animations2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                The transition property is used to apply a transition effect to
                the background-color property of an element with the class
                element. When the element is hovered over, the background-color
                property changes to red over a duration of 1 second.
              </ul>
              <br />
              <br />
              <h3>12. What are the limitations of CSS?</h3>
              <ol>
                <li>
                  <b>Browser Compatibility: </b>
                </li>
                <li>
                  <b>Cross Browser issue: </b>
                </li>
                <li>
                  <b>There is no parent selector: </b>
                </li>
              </ol>
              <br />
              <h3>13. How do you use CSS to create responsive designs.</h3>
              <p>
                CSS can be used to create responsive designs in several ways.
              </p>
              <ol>
                <li>
                  <b>Media queries: </b>
                </li>
                <br />
                <li>
                  <b>Fluid layouts: </b>A fluid layout is one that adjusts to
                  the size of the viewport, instead of using fixed widths. This
                  is achieved by using percentage-based widths instead of
                  pixel-based widths
                </li>
                <br />
                <li>
                  <b>Flexbox: </b>Flexbox is a CSS layout model that allows you
                  to easily create flexible and responsive layouts. With
                  flexbox, you can easily align elements, distribute space
                  between them, and reorder them based on the viewport size.
                </li>
                <br />
                <li>
                  <b>Grid: </b>
                </li>
              </ol>
              <br />
              <br />
              <h3>
                14. What are the differences between adaptive design and
                responsive design?
              </h3>
              Both responsive and adaptive design attempt to optimize the user
              experience across different devices, adjusting for different
              viewport sizes, resolutions, usage contexts, control mechanisms,
              and so on.
              <table>
                <tr>
                  <th>Property</th>
                  <th>Adaptive Design</th>
                  <th>Responsive Design</th>
                </tr>
                <tr>
                  <td>
                    <b>Flexible vs. fixed layouts: </b>
                  </td>
                  <td>
                    Uses fixed layouts that are designed for specific screen
                    sizes and device types.
                  </td>
                  <td>
                    Responsive design uses fluid grids and flexible images to
                    create a layout that adapts to different screen sizes.
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <b>Breakpoints: </b>
                  </td>
                  <td>
                    Adaptive design uses predefined layouts for specific screen
                    sizes, and switches between them based on the device type.
                  </td>
                  <td>
                    Responsive design uses breakpoints to determine when the
                    layout should change, based on the width of the screen.
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <b>Complexity: </b>
                  </td>
                  <td>
                    Adaptive design is often simpler to implement, as it
                    involves designing specific layouts for specific devices.
                  </td>
                  <td>
                    Responsive design can be more complex than adaptive design,
                    as it requires careful planning and testing to ensure that
                    the layout works well across a range of devices.
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <b>Speed: </b>
                  </td>
                  <td>
                    Adaptive design can be faster than responsive design, as it
                    only needs to load the layout that is designed for the
                    specific device being used.
                  </td>
                  <td>
                    Responsive design may require more code and resources to
                    load, as it has to handle a wider range of screen sizes and
                    device types.
                  </td>
                </tr>
              </table>
              <br />
              <br />
              <i>
                In summary, responsive design uses flexible layouts and adapts
                to different screen sizes using breakpoints, while adaptive
                design uses fixed layouts designed for specific screen sizes and
                device types. Responsive design can be more complex but provides
                more flexibility, while adaptive design can be simpler and
                faster, but provides less flexibility.{" "}
              </i>
              <br />
              <br />
              <h3>
                15. How to determine if the browser supports a certain feature?
              </h3>
              The <b>@support</b> in CSS use to scan if the current browser has
              support for a certain feature.
              <div style={titles}>
                <PrismCode
                  code={supports}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                16. What is progressive rendering? How do you implement
                progressive rendering in the website?. What are the advantages
                of it?
              </h3>
              <ol>
                <li>
                  Techniques used to improve the performance of a webpage to
                  render content for display as quickly as possible.
                </li>
                <li>
                  We can implement the progressive rendering of the page by
                  loading the lazy loading of the images. We can use
                  Intersection Observer API to lazy load the image. The API
                  makes it simple to detect when an element the viewport and
                  take an action when it does. Once the image enters the
                  viewport, we will start loading the images.
                </li>
              </ol>
              <br />
              <br />
              <b>The advantages of progressive rendering are: </b>
              <br />
              <ul>
                <li>Improved perceived performance</li>
                <li>Better user experience</li>
                <li>Optimized for slower connections</li>
              </ul>
              <br />
              <i>
                Overall, progressive rendering is a powerful technique for
                improving website performance and user experience, especially in
                situations where slow loading times are a concern.
              </i>
              <br />
              <br />
              <h3>
                17. What is the difference between inline, inline-block, and
                block?
              </h3>
              <ol>
                <li>
                  <b>Block Element: </b>Always start on a new line. They will
                  also take space for an entire row/ width.
                  <b> Ex. </b>div, p.
                </li>
                <li>
                  <b>Inline Elements: </b>Don't start on a new line, they appear
                  on the same line as the content and tags beside them.{" "}
                  <b>Ex. </b> span , strong, and img tags.
                </li>
                <li>
                  <b>Inline Block Elements: </b>Inline block elements are
                  elements that behave like inline elements in terms of how they
                  flow within a line of text, but can also have a fixed width
                  and height like block elements.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={inlinestyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>
                By using inline block elements, you can create flexible,
                responsive layouts that flow like text but also have a fixed
                size and shape.
              </i>
              <br />
              <br />
              <h3>
                18. What's the difference between a relative, fixed, absolute
                and statically positioned element?
              </h3>
              A positioned element is an element whose computed position
              property is either relative, absolute, fixed or static.
              <ol>
                <li>
                  <b>Static positioning -</b> It default position. the element
                  will flow into the page as it normally would. The top, right,
                  bottom, left and z-index properties do not apply.
                </li>
                <li>
                  <b>Relative positioning -</b> The element's position is
                  adjusted relative to itself, without changing layout.
                  <br />
                  The top, right, bottom, and left properties can be used to
                  adjust the position of the element.
                </li>
                <li>
                  <b>Absolute positioning -</b> The element is removed from the
                  flow of the page and positioned at a specified position
                  relative to its closest positioned ancestor if any, or
                  otherwise relative to the initial containing block. Absolutely
                  positioned boxes can have margins, and they do not collapse
                  with any other margins. These elements do not affect the
                  position of other elements.
                </li>
                <li>
                  <b>Fixed positioning -</b> The element is removed from the
                  flow of the page and positioned at a specified position
                  relative to the viewport and doesn't move when scrolled.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={relativestyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                19. How do you use CSS to create responsive images that adapt to
                different screen sizes
              </h3>
              <ul>
                <li>
                  To create responsive images that adapt to different screen
                  sizes, you can use the CSS max-width property on the img tag.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={responsivecss}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  Use the srcset attribute, which allows you to specify multiple
                  versions of an image at different sizes and resolutions. The
                  browser can then choose the appropriate image to download
                  based on the device's pixel density and screen size.{" "}
                </li>
                <div style={titles}>
                  <PrismCode
                    code={responsivecss2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
              </ul>
              <div style={titles}>
                <PrismCode
                  code={backgroundImg}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                20. What are the different ways to hide the element using CSS?
              </h3>
              <ol>
                <li>
                  <b>display: none: </b>It’s not available for screen readers.
                  The element will not exist in the DOM if <b>display: none</b>{" "}
                  is used.
                </li>
                <li>
                  <b>visibility: hidden: </b>Will take up the space of the
                  element. It will be available to screen reader users. The
                  element will actually be present in the DOM, but not shown on
                  the screen.
                </li>
                <li>
                  <b>position: absolute: </b>Make it available outside the
                  screen.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={hiddenStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>21. When does DOM reflow occur?</h3>
              DOM reflow occurs when
              there is a change to the structure or layout of a web page.
              Whenever there is a change to the DOM of a web page, the browser
              must recalculate the positions and sizes of all elements in the
              page to update the layout accordingly.
              <br />
              <br />
              <b>Reflow occurs when:</b>
              <ol>
                <li>Insert, remove or update an element in the DOM.</li>
                <li>
                  Modify content on the page, e.g. the text in an input box.
                </li>
                <li>Changing the font size or style of text on the page.</li>
                <li>Resizing the browser window.</li>
              </ol>
              <br />
              <h3>
                22. Is there any reason you'd want to use translate() instead of
                absolute positioning.
              </h3>
              <ol>
                <li>
                  <b>Performance: </b>translate() is a CSS transform that can be
                  hardware accelerated by the browser, which means it can be
                  faster and smoother than using absolute positioning for
                  certain types of animations or transitions.
                </li>
                <li>
                  <b>Maintain layout: </b> When you use absolute positioning,
                  the element is removed from the normal document flow, which
                  means other elements on the page may shift around to fill the
                  space left by the positioned element. Using translate() allows
                  the element to remain in its original position in the document
                  flow, which can help maintain the layout of the page.
                </li>
                <li>
                  <b>Responsive design: </b>translate() can be more responsive
                  than absolute positioning when it comes to adapting to
                  different screen sizes or device orientations. When you use
                  translate(), the element's position is relative to its
                  original position, which means it can adjust more easily to
                  changes in screen size or orientation.
                </li>
              </ol>
              <br />
              <h3>25. What is the box model in CSS, and how does it work.</h3>
              The box model is a core concept in CSS that describes how elements
              are laid out on a web page. Every HTML element on a page is
              represented as a rectangular box, which consists of four parts:
              <br />
              <ul>
                <li>
                  <b>Content: </b>This is the actual content of the element,
                  such as text or images.
                </li>
                <br />
                <li>
                  <b>Padding: </b>This is the space between the content and the
                  edge of the element. Padding can be added to any or all of the
                  four sides of the content box.
                </li>
                <br />
                <li>
                  <b>Border: </b>This is a line that surrounds the padding and
                  the content of the element. Borders can be styled with
                  different colors, widths, and styles.
                </li>
                <br />
                <li>
                  <b>Margin: </b>This is the space between the border of the
                  element and the next element on the page. Margins can be added
                  to any or all of the four sides of the border box.
                </li>
                <br />
              </ul>
              <img
                src={boxModels}
                alt=""
                className="responsive"
                style={{ width: "400px", height: "200px", float: "right" }}
              />
              <br />
              The CSS box model is a rectangular layout paradigm for HTML
              elements that consists of the following:
              <ol>
                <li>
                  The box model determines the size and position of each element
                  on the page by adding up the width and height of the content,
                  padding, and border, and then adding the margin to the outside
                  of the box. The total size of the element is known as the
                  "outer box" or "box dimensions".
                </li>
              </ol>
              <br />
              The border is the layer of the CSS box model that sits between
              margin and padding. By default, the border does not have any
              width.
              <br />
              <div style={titles}>
                <PrismCode
                  code={boxModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                26. What is the box-shadow property in CSS, and how can it be
                used to create visual effects on elements?
              </h3>
              The box-shadow property in CSS allows you to add a shadow effect
              to an element's box, creating a visual depth and separation from
              the rest of the page. It takes several values, including:
              <br />
              <ul>
                <li>
                  <b>h-shadow: </b>The horizontal offset of the shadow from the
                  element
                </li>
                <br />
                <li>
                  <b>v-shadow: </b>The vertical offset of the shadow from the
                  element
                </li>
                <br />
                <li>
                  <b>blur: </b>The amount of blurring to apply to the shadow
                </li>

                <br />
                <li>
                  <b>spread: </b>The amount of the shadow to spread outside of
                  the element
                </li>
                <br />
                <li>
                  <b>color: </b>The color of the shadow
                </li>
                <br />
              </ul>
              <div style={titles}>
                <PrismCode
                  code={boxShadow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                27. How do you center an element horizontally and vertically in
                CSS?
              </h3>
              There are multiple ways to center an element horizontally and
              vertically in CSS, depending on the layout and requirements of
              your page.
              <br />
              <ul>
                <li>
                  <b>Using Flexbox: </b>To center an element horizontally and
                  vertically using Flexbox, set the parent container to display:
                  flex, and use the align-items and justify-content properties
                  to center the child element.{" "}
                </li>

                <div style={titles}>
                  <PrismCode
                    code={horizontallycss}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  <b>Using absolute positioning: </b>To center an element using
                  absolute positioning, set the parent container to position:
                  relative, and the child element to position: absolute. Then,
                  use the top, bottom, left, and right properties to center the
                  child element.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={horizontallycss2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />

                <li>
                  <b>Using grid: </b>Set the parent container to display: grid,
                  and use the justify-items and align-items properties to center
                  the child element.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={horizontallycss3}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
              </ul>
              <br />
              <br />
              <h3>28. CSS Flexbox or Grid specs?</h3>
              <ul>
                <li>Flexbox is a way to align items into container.</li>
                <li>
                  Flexbox layout model designed to provide a more efficient and
                  flexible way to arrange items within a container.
                </li>
                <ol>
                  <li>
                    <b>main-axis: </b>Horrizontal
                  </li>
                  <li>
                    <b>cross-axis: </b>Vertical
                  </li>
                </ol>
                <br />
                <li>Flexbox is a 1-D layouts while Grid is 2-D layouts.</li>
              </ul>
              <br />
              <br />
              <h3>29. Grid</h3>
              <ul>
                <li>
                  CSS Grid is a powerful layout system that allows for the
                  creation of complex and flexible grid-based layouts on the
                  web. It is a two-dimensional layout system, meaning it works
                  in both rows and columns.
                </li>
              </ul>
              <br />
              <ol>
                <li>
                  <b>Properties for the Parent (Grid Container):</b>
                </li>
                <ul>
                  <li>
                    <b>Display: </b>
                  </li>
                  <li>
                    <b>Grid-template-rows: </b>Defines the columns and rows of
                    the grid with a space-separated list of values.
                  </li>
                  <li>
                    Grid lines are automatically assigned positive numbers from
                    these assignments.
                  </li>
                  <li>
                    <b>grid-template-areas: </b>
                  </li>
                </ul>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={gridspace}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>30. Justify-items</h3>
              <b>align-items: </b>Aligns grid items along the column. This value
              applies to all grid items inside the container.
              <ol>
                <li>
                  <b>stretch: </b>fills the whole height of the cell (this is
                  the default).
                </li>

                <li>
                  <b>baseline: </b>align items along text baseline.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={judtifyItems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>31. Justify-content</h3>
              <div style={titles}>
                <PrismCode
                  code={justifycontain}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>32. Properties for the Children (Grid Items)</h3>
              Determines a grid item’s location within the grid by referring to
              specific grid lines. grid-column-start/grid-row-start is the line
              where the item begins, and grid-column-end/grid-row-end is the
              line where the item ends.
              <br />
              <br />
              <b>justify-self: </b>Aligns a grid item inside a cell along the
              inline (row) axis (as opposed to align-self which aligns along the
              block (column) axis). This value applies to a grid item inside a
              single cell.
              <br />
              <b>align-self: </b>Aligns a grid item inside a cell along the
              block (column) axis (as opposed to justify-self which aligns along
              the inline (row) axis). This value applies to the content inside a
              single grid item.
              <div style={titles}>
                <PrismCode
                  code={propertieschilds}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>
                33. How do you use flexbox to create flexible layouts in CSS?
              </h3>
              Flexbox is a powerful layout tool in CSS that allows you to create
              flexible and responsive layouts.
              <ol>
                <li>Set the parent element's display property to "flex"</li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>{" "}
                <br />
                <li>Set the flex direction to row or column:</li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>{" "}
                <br />
                <li>Use the flex property to set the size of each item:</li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss3}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>{" "}
                <br />
                <li>
                  Use the justify-content property to align the items
                  horizontally:
                </li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss4}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>{" "}
                <br />
                <li>
                  Use the align-items property to align the items vertically:
                </li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss5}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>{" "}
                <br />
                <li>
                  Use the align-self property to align a single item within the
                  container:
                </li>
                <div style={titles}>
                  <PrismCode
                    code={flexboxcss6}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ol>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={flextFloat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>34. Describe floats and how they work</h3>
              <p>
                <ol>
                  <li>
                    Float is a CSS property that allows elements to be
                    positioned to the left or right of their containing block,
                    allowing text and inline elements to flow around it. Float
                    is commonly used for creating multi-column layouts or
                    positioning images and other media on a webpage.
                  </li>

                  <li>
                    float has 3 properties: <b>Left, Right, None</b>.
                  </li>
                </ol>
              </p>
              <ul>
                <li>
                  <b>flex-direction: </b>By default flex-direction is row.
                </li>
                <li>
                  <b>space-between: </b>Not apply on start and end.
                </li>
                <li>
                  <b>space-evenly: </b>Apply on start and end also.
                </li>
                <li>
                  <b>space-around: </b>Like padding on box.
                </li>
                <li>
                  <b>flex-grow: </b>Adjeced box on the base of screen
                </li>
                <li>
                  <b>fraction (fr): </b>Divide on the basis of screen-size
                </li>
              </ul>
              <br />
              <b>How to Use Float in CSS</b>
              <br />
              <ol>
                <li>float: left/ none/ inherit;</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={floatele}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>35. Purpose of clearing floats in CSS</h3>
              <ol>
                <li>
                  Clearing floats is a technique used in CSS to prevent elements
                  from wrapping around floated elements. When an element is
                  floated, it is taken out of the normal document flow, which
                  can cause issues with layout and positioning if other elements
                  on the page are affected by the float.
                </li>
                <li>
                  To prevent this from happening, we can use the clear property
                  to specify that an element should not be allowed to float next
                  to a floated element. The clear property can be set to left,
                  right, both, or none, depending on which side of the floated
                  element you want to clear.
                </li>
              </ol>
              <br />
              <br />
              <h3>36. Explain the usage of "table-layout" property</h3>
              <p>
                The table-layout property defines the algorithm used to layout
                table cells, rows, and columns.
              </p>
              <ol>
                <li>
                  <b>auto -</b> Browsers use an automatic table layout
                  algorithm. The column width is set by the widest unbreakable
                  content in the cells.
                </li>
                <li>
                  <b>fixed -</b>Fixed layout based on the first row. And the
                  rest of the table follows. If no widths are present on the
                  first row, the column widths are divided equally across the
                  table.
                </li>
                <li>
                  <b>initial -</b> Sets this property to its default value.
                </li>
                <li>
                  <b>inherit -</b> Property from its parent element.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={table_layout}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                37. Describe pseudo-elements and discuss what they are used for.
              </h3>
              <p>
                In CSS, pseudo-elements are used to style a specific part of an
                element, such as the first letter, the first line, or the
                content before or after the element. Pseudo-elements are
                preceded by a double colon (::).
              </p>
              <br />
              <b>Here are some commonly used pseudo-elements:</b>
              <ol>
                <li>
                  <b>::before :</b> Allows you to insert content before the
                  content of an element.
                </li>
                <li>
                  <b>::after :</b>Allows you to insert content after the content
                  of an element.
                </li>
                <li>
                  <b>::first-letter :</b>Targets the first letter of text
                  content within an element.
                </li>
                <li>
                  <b>::first-line :</b>Targets the first line of text content
                  within an element.
                </li>
                <li>
                  <b>::selection :</b>Targets the portion of an element's
                  content that has been selected by the user.
                </li>
              </ol>
              <br />
              Pseudo-elements are useful for adding decorative elements to your
              design, such as icons or borders, without adding extra markup to
              your HTML. They can also be used to style specific parts of text,
              such as the first letter or line of a paragraph
              <br />
              <b>
                example of how to use the ::before pseudo-element to add an icon
                before a link.
              </b>
              <div style={titles}>
                <PrismCode
                  code={psudoele}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>
                There are currently seven pseudo-elements in CSS. They are:{" "}
              </b>
              <br />
              <ul>
                <li>::after</li>
                <li>::before</li>
                <li>::first-letter</li>
                <li>::first-line</li>
                <li>::marker</li>
                <li>::placeholder</li>
                <li>::selection</li>
              </ul>
              <br />
              <b>Pseudo-classes: </b>A pseudo-class is used to define a special
              state of an element.
              <ol>
                <li>Style an element when a user mouses over it.</li>
                <li>Style visited and unvisited links differently.</li>
                <li>Style an element when it gets focus.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={pseudoclas}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>38.LESS: (Leaner Stylesheets)</b>
              <ul>
                <li>
                  <b>Variables: </b>Preprocessors allow the use of variables in
                  CSS, which can make it easier to maintain and update the code.
                  For example, you can define a color variable, and then use
                  that variable throughout your CSS instead of having to repeat
                  the color code each time.
                </li>
                <br />
                <li>
                  <b>Nesting: </b>Preprocessors allow you to nest CSS selectors,
                  which can make your code easier to read and understand. This
                  can be especially useful when dealing with complex selectors,
                  such as those for nested menus or forms.
                </li>
                <br />
                <li>
                  <b>Mixins: </b>Preprocessors allow the creation of reusable
                  code snippets called mixins. This can make it easier to write
                  and maintain code, as you can define a mixin once and then
                  reuse it throughout your project.
                </li>
                <br />
                <li>
                  <b>Functions: </b>Preprocessors allow the use of functions in
                  CSS, which can be used to perform calculations or manipulate
                  values.
                </li>
                <br />
                <li>
                  <b>Modularization: </b>Preprocessors allow you to split your
                  CSS into modular files, making it easier to organize and
                  maintain your code.
                </li>
              </ul>
              <br />
              Overall, using a CSS preprocessor can save time, improve code
              organization and maintainability, and make it easier to create
              complex stylesheets.
              <br />
              <br />
              <h3>39. What is the importance of CSS Sprites?</h3>
              CSS sprites are used for combining multiple images in a single
              larger image. They are commonly used for representing icons that
              are used in the user interfaces. The main advantages of using
              sprites are:
              <br />
              <ol>
                <li>
                  It reduces the number of HTTP requests to get data of multiple
                  images.
                </li>
                <li>
                  It helps in downloading assets in advance that help display
                  icons/ images upon hover/ other pseudo-states.
                </li>
                <li>It use as a background image only.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={sprites}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>40. What do you understand by tweening in CSS?</h3>
              Tweening is the process of filling the gaps between the key
              sequences, i.e between the keyframes that are already created.
              Keyframes are those frames that represent start and end point of
              animation action.
              <br /> we use properties like transforms - matrix, translate,
              scale, rotate etc.
              <br />
              <br />
              In the below example, we are generating intermediate frames of
              paragraph elements to slide through from the start to the right
              edge of the browser.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={tweening}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CssBasics);
