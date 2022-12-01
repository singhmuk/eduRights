import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';

import Browser from '../../assets/css1.PNG';
import contentsImg from '../../assets/contents.png';
import marginImg from '../../assets/marginImgs.png';
import boxModels from '../../assets/boxings.png';


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
h1::before {
  content: url(smiley.gif);
}

h1::after {
  content: url(smiley.gif);
}

//for list items 
::marker {
  color: red;
  font-size: 23px;
}

p::first-letter {
  font-size: 100px;
}

li::first-line {
  color: pink;
}

p::selection {
  background-color: green;
  color: red;
}

::placeholder {
  text-align: center;
}
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

const sass = `
//sass
$color: red

=my-border($color)
  border: 1px solid $color

body
  background: $color
  +my-border(green)
  
  
//.scss
$color: red;

@mixin my-border($color) {
  border: 1px solid $color;
}

body {
  background: $color;
  @include my-border(green);
}
`.trim();

const website = `
@media (min-width: 601px) {
  .my-class {
    font-size: 24px;
  }
}
@media (max-width: 600px) {
  .my-class {
    font-size: 12px;
  }
}

.my-class {
  font-size: 12px;
}
`.trim();

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

const would = `
Select every <a> element whose href attribute value begins with “https”:
a[href^="https"]

Select every <a> element whose href attribute value ends with “.pdf”:
a[href$=".pdf"]

Select every <a> element whose href attribute value contains the substring “css”:
a[href*="css"]
`.trim();

const importants = `
.imp{
  outline:2px solid pink;
  outline: 2px solid red !important;
}
`.trim();

const browserspecific = `
@-moz-document url-prefix(){
  body {
      color: #000;
  }
  div{
     margin:-4px;
  }
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  body {
      color: #90f;
  }
}
`.trim();

const inlinestyles = `
span.a {
  display: inline; 
  width: 100px;
  height: 100px;
  border: 1px solid rgb(0, 255, 21);  
}

span.b {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid blue;    
}

span.c {
  display: block;
  width: 100px;
  height: 100px;
  border: 1px solid rgb(255, 0, 191);    
}


//HTML
  <span class="a">Aliquam</span> <span class="a">venenatis</span>
  <span class="b">Aliquam</span> <span class="b">venenatis</span>
  <span class="c">Aliquam</span> <span class="c">venenatis</span>
`.trim();

const relativestyles = `
.static {
  border: 3px solid #73AD21;
  position: static;
  position: relative;
  position: fixed;
  position: absolute;
  position: sticky;
}
`.trim();

const backgroundImg = `
background-image: url("bgdesert.jpg");
background-repeat: repeat-x/ no-repeat;
background-position: right top;
background-attachment: fixed / scroll;
background: #ffffff url("img_tree.png") no-repeat right top;

border-style: solid;
border-width: 5px;
border-color: blue;
border-bottom-style: dotted;
border-radius: 5px;

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
padding: 25px 50px;                                                  //top/bottom padding 25px; right/left padding 50px.

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

const hidden = `
div {
  width: 150px;
  height: 50px;
  overflow: hidden;
}
`.trim();

const counters = `
body {
  counter-reset : h2;
    }
  
h2 {
  counter-reset : h3;
  }
  
h3 {
  counter-reset : h4;
  }
  
h4 {
  counter-reset : h5;
  }
  
h5 {
  counter-reset : h6;
  }
  
article h2:before {
  content : counter(h2,decimal) ". ";
  counter-increment : h2;
  }
  
article h3:before {
  content : counter(h2,decimal) "." counter(h3,decimal) ". ";
  counter-increment : h3;
    }
    
article h4:before {
  content : counter(h2,decimal) "." counter(h3,decimal) "." counter(h4,decimal) ". ";
  counter-increment : h4;
  }
      
article h5:before {
  content : counter(h2,decimal) "." counter(h3,decimal) "." counter(h4,decimal) "." counter(h5,decimal) ". ";
  counter-increment : h5;
  }

article h6:before {
  content : counter(h2,decimal) "." counter(h3,decimal) "." counter(h4,decimal) "." counter(h5,decimal)
   "." counter(h6,decimal) ". ";
  counter-increment : h6;
  }
  
h2.nocount:before, h3.nocount:before, h4.nocount:before, h5.nocount:before, h6.nocount:before {
  content : "";
  counter-increment : none;
    }
            
            
//HTML
<article>
<h1>Article H1 title</h1>
  <h2>H2 Title</h2>
  <h2>H2 Title</h2>
    <h3>H3 Title</h3>
      <h4>H4 Title</h4>
        <h5>H5 Title</h5>
          <h6>H6 Title</h6>
</article>
`.trim();

const nthchild = `
div:nth-child(2) {
  background: red;
}

/* Selects the second li element in a list */
li:nth-child(2) {
  background: lightgreen;
}

/* Selects every third element among any group of siblings */
:nth-child(3) {
  background: yellow;
}

//HTML
<div>
  <p>This is some text.</p>
</div>

<div>
  <p>This is some text.</p>
</div>

<div>
  <p>This is some text.</p>
</div>

<ul>
  <li>First list item</li>
  <li>Second list item</li>
  <li>Third list item</li>
  <li>Fourth list item</li>
  <li>Fifth list item</li>
</ul>
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

const defoultcss = `
.resto {
  color: green;
}

#blue {
  color: blue;
}

#initial {
  color: initial;
}

#inherit {
  color: inherit;
}
`.trim();

const sprites = `
.sprites {
  width: 200px;
  background-image: url("abc.png");
  background-position: 0px -200px;                //second image start after 200px. initials 200px occupied by first image
}
`.trim();

const gridspace = `
//display
Values:
	grid – generates a block-level grid
	inline-grid – generates an inline-level grid

	.container {
      display: grid | inline-grid;
      }

      
//grid-template-rows:
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}


//Note that a line can have more than one name. For example, here the second line will have 
//two names: row1-end and row2-start:
.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}


//If your definition contains repeating parts, you can use the repeat() notation to streamline things:
.container {
  grid-template-columns: repeat(3, 20px [col-start]);

 	Which is equivalent to this
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start];
}


//If multiple lines share the same name, they can be referenced by their line name and count
.item {
  grid-column-start: col-start 2;
}.


//grid-template-areas
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
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

const gridtemplates = `
//
.container {
  grid-template: none | grid-template-rows / grid-template-columns;
}


//Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows
.container {
	column-gap: 15px 10px;
	row-gap: 15px 10px;
	grid-column-gap: 15px 10px;
	Grid-row-gap: 15px 10px;
    }

//A shorthand for row-gap and column-gap.
//If no row-gap is specified, it’s set to the same value as column-gap.
.container {
  gap: 15px 10px;
}
`.trim();

const judtifyItems = `
//
.container {
  justify-items: start | end | center | stretch;
}

//align-items
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
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;    
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

const boxProperties = `
.content-box {
  box-sizing: content-box;
  width: 125px;
  height: 125px;
  border-width: 10px;
  padding: 40px;
}

//
.border-box {
  box-sizing: border-box;
  width: 125px;
  height: 125px;
  border-width: 10px;
  padding: 40px;
}
`.trim();

class CssBasics extends Component {
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
              <h3>1. How does CSS actually work (under the hood of browser)?</h3>
              When a browser displays a document, it must combine the document's content with its style information. It processes the document in two stages:
              <ol>
                <li>The browser converts HTML and CSS into the DOM. The DOM represents the document in the computer's memory. It combines the document's
                  content with its style.</li>
                <li>The browser displays the contents of the DOM.</li>
              </ol>
              <img src={Browser} alt="" className="responsive" />
              <br />
              <br />
              <ul>
                <li>CSS is a design language that makes a website look more appealing than just plain or uninspiring pieces of text.</li>
                <li>A website can run without CSS, but it certainly isn’t pretty. CSS makes the front-end of a website shine and it creates a great user experience. Without CSS, websites would be less pleasing to the eye and likely much harder to navigate.</li>
              </ul>
              <br />

              <h3>2. There are a number of benefits of CSS, including</h3>
              <ol>
                <li><b>Faster Page Speed: </b>More code means slower page speed. And CSS enables you to use less code. CSS allows you to use one CSS rule and apply it to all occurrences of a certain tag within an HTML document.</li>
                <li><b>Better User Experience: </b>It allows for user-friendly formatting. When buttons and text are in logical places and well organized, user experience improves.</li>
                <li><b>Easy Formatting Changes: </b></li>
                <li><b>Compatibility Across Devices: </b></li>
              </ol>
              <br />

              <h3>3. What does Accessibility (a11y) mean?</h3>
              a11y is a measure of a computer system's accessibility is to all people, including those with disabilities/
              impairments. It concerns both software and hardware and how they are configured in order to enable a disabled/ impaired person
              to use that computer system successfully.
              <br />
              <br />
              <i>Accessibility is also known as assistive technology.</i>
              <br />

              <h3>4. Explain the basic rules of CSS Specificity</h3>
              Specificity determines which rules will take precedence.
              <br />
              <ol>
                <li>CSS style applied by referencing external stylesheet has lowest precedence and is overridden by Internal and inline CSS.</li>
                <li>Internal CSS is overridden by inline CSS.</li>
                <li>Inline CSS has highest priority and overrides all other selectors.</li>
                <li>ID selectors have a higher specificity than attribute selectors.</li>
                <li>A class selector beats any number of element selectors.</li>
                <li>Universal selector (*) has no specificity.</li>
              </ol>
              <br />

              <h3>5. How do you specify units in the CSS?. What are the different ways to do it?</h3>
              <ol>
                <li>px gives fine-grained control and
                  maintains alignment because 1 px or multiple of 1px to look sharp. px is not cascade.
                  Em, will cascade 1em is equal to the current font-size of the element or the browser
                  default. The common practice is to set default body font-size to 62.5% (equal to 10px).</li>
                <li>1em = 16px (Pixel).</li>
                <li>pt(point) are traditionally used in print. 1pt = 1/72 inch and it is a fixed-size unit.</li>
                <li>%(percentage) sets font-size relative to the font size of the body. Hence, you have to set the font-size of the body to a
                  reasonable size.</li>
              </ol>
              <br />
              <b>What is VH/VW (viewport height/ viewport width) in CSS?</b>
              <ol>
                <li>It’s a CSS unit used to measure the height and width in percentage w.r.t viewport. It is used mainly in responsive
                  design techniques. The measure VH is equal to 1/100 of the height of the viewport.</li>
                <li>If the height of the browser is 1000px, 1vh is equal to 10px. Similarly, if the width is 1000px, then 1 vw is equal to 10px.</li>
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

              <h3>6. What are the different types of Selectors in CSS?</h3>
              <ol>
                <li><b>Universal Selector: </b>Selecting all elements on a page. </li>
                <li><b>Element Type Selector: </b>Selector matches one or more HTML elements of the same name.</li>
                <li><b>ID Selector: </b></li>
                <li><b>Class Selector: </b></li>
                <li><b>Descendant Combinator: </b></li>
                <li><b>Child Combinator: </b></li>
                <li><b>General Sibling Combinator: </b></li>
                <li><b>Adjacent Sibling Combinator: </b></li>
                <li><b>Attribute Selector: </b></li>
              </ol>
              <br />

              <h3>7. Explain what elements will match each of the following CSS selectors</h3>
              <div style={titles}>
                <PrismCode
                  code={elements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. In CSS3, how would you select</h3>
              <div style={titles}>
                <PrismCode
                  code={would}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. What does !important mean in CSS?</h3>
              The important will have the highest precedence and it overrides the cascaded property.
              <div style={titles}>
                <PrismCode
                  code={importants}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Can you name the four types of @media properties?</h3>
              <ol>
                <li><b>All: </b>It’s the default property. Used for all media-type devices.</li>
                <li><b>Screen: </b>Used for computer screen, mobile screen.</li>
                <li><b>Print: </b>Used for printers.</li>
                <li><b>Speech: </b>Used for screen readers.</li>
              </ol>
              <br />

              <h3>12. What are the limitations of CSS?</h3>
              <ol>
                <li><b>Browser Compatibility: </b>Some style selectors are supported and some are not. We have to determine which style is
                  supported or not using the @support selector.</li>
                <li><b>Cross Browser issue: </b>Some selectors behave differently in a different browser</li>
                <li><b>There is no parent selector: </b>Currently, Using CSS, we can’t select a parent tag.</li>
              </ol>
              <br />

              <h3>13. Difference between coding a website to be responsive versus using a mobile-first strategy?</h3>
              <p>
                Making a website responsive means the some elements will respond by adapting its size or other functionality according to the
                device's screen size, typically the viewport width, through CSS media queries.
              </p>
              A mobile-first strategy has 2 main advantages:
              <ol>
                <li>It's more performant on mobile devices, since all the roes applied for them don't have to be validated against any media queries.</li>
                <li>It forces to write cleaner code in respect to responsive CSS rules.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={website}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. What are the differences between adaptive design and responsive design?</h3>
              Both responsive and adaptive design attempt to optimize the user experience across different devices, adjusting for different
              viewport sizes, resolutions, usage contexts, control mechanisms, and so on.
              <table>
                <tr>
                  <th>Adaptive Design</th>
                  <th>Responsive Design</th>
                </tr>
                <tr>
                  <td>Responsive design works on the principle of flexibility.</td>
                  <td>Adaptive design detects the device and other features, and then provides the appropriate feature and layout based on a predefined set of
                    viewport sizes and other characteristics.</td>
                </tr>
                <br />
                <tr>
                  <td>Responsive websites uses media queries, flexible grids, and responsive images that flexes and changes based on a multitude of factors.</td>
                  <td>The site detects the type of device used, and delivers the pre-set layout for that device.</td>
                </tr>
                <br />
                <tr>
                  <td>Focuses on developing websites based on multiple fixed layout sizes.</td>
                  <td>Rocuses on showing content on the basis of available browser space.</td>
                </tr>
                <br />
                <tr>
                  <td>When a website developed using adaptive design is opened on the desktop browser, first the available space is detected and
                    then the layout with most appropriate sizes are picked and used for the display of contents. Resizing of browser window has
                    no affect on the design.</td>
                  <td>When a website developed using responsive design is opened on a desktop browser and when we try to resize the browser window,
                    the content of the website is dynamically and optimally rearranged to accomodate the window.</td>
                </tr>
                <br />
                <tr>
                  <td>Usually, adaptive designs use six standard screen widths - 320 px, 480 px, 760 px, 960 px, 1200 px, 1600 px. These sizes are
                    detected and appropriate layouts are loaded.</td>
                  <td>Design makes use of CSS media queries for changing styles depending on the target devices properties for adapting to
                    different screens.</td>
                </tr>
                <br />
                <tr>
                  <td>It takes a lot of time and effort to first examine the options and realities of the end users and then design best possible
                    adaptive solutions them.</td>
                  <td>Generally, Responsive design takes much less work to build and design fluid websites that can accomodate content from screen
                    depending on the screen size.</td>
                </tr>
                <br />
                <tr>
                  <td>Gives a lot of control over the design to develop sites for specific screens.</td>
                  <td>No much control over the design is offered here.</td>
                </tr>
              </table>
              <br />

              <h3>15. How to determine if the browser supports a certain feature?</h3>
              The <b>@support</b> in CSS use to scan if the current browser has support for a certain feature.
              <div style={titles}>
                <PrismCode
                  code={supports}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. What is progressive rendering? How do you implement progressive rendering in the website?. What are the advantages of it?</h3>
              <ol>
                <li>Techniques used to improve the performance of a webpage (improve
                  perceived load time) to render content for display as quickly as possible.</li>
                <li>We can implement the progressive rendering of the page by loading the lazy loading of the images.  We can use Intersection
                  Observer API to lazy load the image. The API makes it simple to detect when an element the viewport and take an action
                  when it does. Once the image enters the viewport, we will start loading the images.</li>
              </ol>
              <br />

              <h3>17. How will you fix browser-specific styling issues?</h3>
              Different ways to fix browser-specific issues.
              <br />
              <ul>
                <li>We can write browser-specific styles separately in different sheets and load that only when the specific browser is used. This
                  makes use of the server-side rendering technique.</li>
                <li>We can use auto-prefix for automatically adding vendor prefixes in the code.</li>
                <li>We can also use normalize.css or reset CSS techniques.</li>
              </ul>
              <br />
              There are some ways for avoiding browser compatibility issues. They are as follows:
              <ol>
                <li><b>Validate HTML and CSS: </b>We
                  need to validate our HTML and CSS files for the missing closing tags, or missing semicolons in the syntaxes because there are chances
                  that the old browsers will throw errors while rendering the code. We can avoid those errors by:</li>
                <ul>
                  <li>Maintaining well-aligned code that helps in easy readability.</li>
                  <li>Inserting comments at necessary places.</li>
                  <li>Make use of validation tools like Jigsaw CSS validator, W3C HTML Validators to identify syntax issues in the code.</li>
                </ul>
                <br />

                <li><b>Maintain Cross-Browser Compatibility in the Layouts: </b>Cross-Browser compatibility is a must while developing web applications.
                  We expect our application to be responsive across all devices, browsers and platforms. Some of the effects of layout incompatibilities
                  are unresponsiveness of the layouts in mobile devices, the difference in layout rendering between modern and old browsers, etc. These
                  incompatibilities can be avoided by using:</li>
                <ul>
                  <li><b>CSS Multi-Column layouts: </b>For maintaining proper layouts w.r.t columns and containers.</li>
                  <li><b>HTML viewport metatag: </b>For ensuring content is properly spanned across mobile devices.</li>
                  <li><b>CSS Flexbox and Grids: </b>To layout child elements depending on the content and available space.</li>
                  <li><b>CSS resets stylesheets: </b>For reducing browser inconsistencies in default line heights, font sizes, margins etc.</li>
                </ul>
                <br />

                <li><b>Check JavaScript Library issues: </b>Ensure the libraries are used judiciously and the ones used are supported by the browsers.</li>
                <br />
                <li><b>Check DOCTYPE tag keyword: </b>The DOCTYPE keyword is meant for defining rules of what needs to be used in the code.
                  Older browser versions check for DOCTYPE tag at the beginning and if not found, the application rendering won't be proper.</li>
                <br />
                <li><b>Test on real devices: </b>Although applications can be tested on virtual environments, it would be more beneficial if the
                  testing is carried out on real devices and platforms. We can use tools like Testsigma for this purpose that enables us to test in
                  real devices parallelly.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={browserspecific}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. What is the difference between inline, inline-block, and block?</h3>
              <ol>
                <li><b>Block Element: </b>Always start on a new line. They will also take space for an entire row/ width.
                  List of block elements are div, p.</li>
                <li><b>Inline Elements: </b>Don't start on a new line, they appear on the same line as the content and tags
                  beside them. <b>Ex. </b> span , strong, and img tags.</li>
                <li><b>Inline Block Elements: </b>Similar to inline elements, except they can have padding and margins
                  and set height and width values.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={inlinestyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. What's the difference between a relative, fixed, absolute and statically positioned element?</h3>
              A positioned element is an element whose computed position property is either relative, absolute, fixed or sticky.
              <ol>
                <li><b>static -</b> It default position. the element will flow into the page as it normally would. The top, right, bottom,
                  left and z-index properties do not apply.</li>
                <li><b>relative -</b> The element's position is adjusted relative to itself, without changing layout.</li>
                <li><b>absolute -</b> The element is removed from the flow of the page and positioned at a specified position relative to its
                  closest positioned ancestor if any, or otherwise relative to the initial containing block. Absolutely positioned boxes can have
                  margins, and they do not collapse with any other margins. These elements do not affect the position of other elements.</li>
                <li><b>fixed -</b> The element is removed from the flow of the page and positioned at a specified position relative to the
                  viewport and doesn't move when scrolled.</li>
                <li><b>sticky -</b> Combination of relative and fixed positioning. The element is treated as relative positioned
                  until it crosses a specified threshold, at which point it is treated as fixed positioned.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={relativestyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Background-Image</h3>
              <div style={titles}>
                <PrismCode
                  code={backgroundImg}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. How does the absolute positioning work?</h3>
              Absolute positioning allows users to place any element wherever they want in an
              exact location. The CSS properties right, left, top, bottom and define the exact locations where you need to place the element.
              In absolute positioning, the following points need to be considered:
              <br />
              <ul>
                <li>The element to which the absolute positioning is applied is removed from the normal workflow of the HTML document.</li>
                <ul>
                  <li>The HTML layout does not create any space for that element in its page layout.</li>
                </ul>
                <br />
                <li>The element is positioned relative to the closest positioned ancestor. If no such ancestor is present, then the element is
                  placed relative to the initial container block.</li>
                <li>The final position of the element is determined based on values provided to the top, right, left, bottom.</li>
              </ul>
              <br />

              <h3>22. What is a z-index, how does it function?</h3>
              z-index is used for specifying the vertical stacking of the overlapping elements that occur at the time of its positioning. It
              specifies the vertical stack order of the elements positioned that helps to define how the display of elements should happen in
              cases of overlapping.
              <br />
              <br />
              The default value of this property is 0 and can be either positive or negative. Apart from 0, the values of the z-index can be:
              <br />
              <ul>
                <li><b>Auto: </b>The stack order will be set equal to the parent.</li>
                <li><b>Number: </b>The number can be positive or negative. It defines the stack order.</li>
                <li><b>Initial: </b>The default value of 0 is set to the property.</li>
                <li><b>Inherit: </b>The properties are inherited from the parent.</li>
              </ul>
              The elements having a lesser value of z-index is stacked lower than the ones with a higher z-index.
              <br />

              <h3>23. What are the different ways to hide the element using CSS?</h3>
              <ol>
                <li><b>display: none: </b>It’s not available for screen readers. The element will not exist in the DOM if <b>display: none</b> is used.</li>
                <li><b>visibility: hidden: </b>Will take up the space of the element. It will be available to screen reader users. The element
                  will actually be present in the DOM, but not shown on the screen.</li>
                <li><b>position: absolute: </b>Make it available outside the screen.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={hiddenStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. How does this property work overflow: hidden?</h3>
              Used for specifying whether the content has to be clipped or the scrollbars have to be added to
              the content area when the content size exceeds the specified container size where the content is enclosed. If the value of
              overflow is hidden, the content gets clipped post the size of the container thereby making the content invisible.
              <div style={titles}>
                <PrismCode
                  code={hidden}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. How do I restore the default value of a property?</h3>
              initial keyword used to reset css default value.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={defoultcss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26. When does DOM reflow occur?</h3>
              Reflow is the web browser process for re-calculating the positions and geometries of elements in the document, for the
              purpose of re-rendering part or all of the document.
              <br />
              <br />
              <b>Reflow occurs when:</b>
              <ol>
                <li>Insert, remove or update an element in the DOM.</li>
                <li>Modify content on the page, e.g. the text in an input box.</li>
                <li>Move a DOM element.</li>
                <li>Animate a DOM element.</li>
                <li>Take measurements of an element such as offsetHeight or getComputedStyle.</li>
                <li>Change a CSS style.</li>
              </ol>
              <br />

              <h3>27. Is there any reason you'd want to use translate() instead of absolute positioning.</h3>
              <ol>
                <li>translate() is a value of CSS transform. Changing transform/ opacity does not trigger browser reflow/ repaint but does
                  trigger compositions, whereas changing the absolute positioning triggers reflow.</li>
                <li>Transform causes the browser to create a GPU
                  layer for the element but changing absolute positioning properties uses the CPU. Hence translate() is more efficient and will
                  result in shorter paint times for smoother animations.</li>
                <li>When using translate(), the element still occupies its original space (like position: relative), unlike in changing the
                  absolute positioning.</li>
              </ol>
              <br />

              <h3>28. Difference between reset vs normalize CSS?. How do they differ?</h3>
              <ol>
                <li><b>Reset CSS: </b>CSS resets aim to remove all built-in browser styling. For example margins, paddings, font-sizes of all
                  elements are reset to be the same. </li>
                <li><b>Normalize CSS: </b>Aims to make built-in browser styling consistent across browsers. It also corrects bugs
                  for common browser dependencies.</li>
              </ol>
              <br />

              <h3>29. What do you have to do to automatically number the heading values of sections and categories?</h3>
              We can use the concept of CSS counters. This lets us adjust the appearance of the content based on the location in a document.
              While using this, we need to first initialize the value of the counter-reset property which is 0 by default. The same property is
              also used for changing the value to any number that we need. Post initialization, the counter’s value can be incremented or
              decremented by using the counter-increment property. The name of the counter cannot be CSS keywords like “none”, “initial”,
              “inherit” etc. If the CSS keywords are used, then the declaration would be ignored.
              <br />
              <br />
              We can use the concept of CSS counters. This lets us adjust the appearance of the content based on the location in a document. While using this, we need to first initialize the value of the counter-reset property which is 0 by default. The same property is also used for changing the value to any number that we need. Post initialization, the counter’s value can be incremented or decremented by using the counter-increment property. The name of the counter cannot be CSS keywords like “none”, “initial”, “inherit” etc. If the CSS keywords are used, then the declaration would be ignored.

              <div style={titles}>
                <PrismCode
                  code={counters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>30. How is the nth-child() different from nth of type selectors?</h3>
              <ol>
                <li>Both are pseudo-classes. The
                  nth-child() pseudo-class is used for matching elements based on the number that represents the position of an element based on
                  the siblings. The number is used to match an element on the basis of the element’s position amongst its siblings.</li>
                <li>The nth-of-type() is similar to the nth-child but it helps in matching the selector based on a number that
                  represents the position of the element within the elements that are the siblings of its same type. The number can also be given
                  as a function or give keywords like odd or even.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={nthchild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>31. Padding</h3>
              <ul>
                <li>A transparent area surrounding the content (amount of space between the border and the content).
                  the padding property controls the space inside an element.</li>
                <li>The element below has padding of 10px on the left and right sides, and padding of 15px on the top and bottom sides:</li>
                <li>To create the gap, the padding either grows the element’s size or shrinks the content inside. By default, the size of the element increases. If you want to create the gap by shrinking the content, set the box-sizing property to border-box (i.e. box-sizing: border-box).</li>
              </ul>
              <br />
              <img src={contentsImg} alt="" className="responsive" style={{ width: "400px", height: "200px", float: 'right' }} />
              <br />
              <b>Uses for Padding: </b>
              <ol>
                <li>Add Space Between Content and Its Border.</li>
              </ol>
              <br />
              <b>How to Add Padding in CSS</b>
              <ul>
                <li>padding has four sides to be declared: top, right, bottom, and left.</li>
                <li>CSS Margins and Padding: Similar, But Not the Same.</li>
              </ul>
              <br />

              <h3>32. Margin</h3>
              <ul>
                <li>A transparent Space between the border and any neighboring elements.</li>
                <li>This means that there will be at least 10 pixels of space between this element and adjacent page elements — the margin “pushes away” its neighbors. If we put multiple of these elements together, we see how margins create whitespace between them, giving them room to breathe:</li>
                <img src={marginImg} alt="" className="responsive" style={{ width: "400px", height: "200px", float: 'right' }} />
              </ul>
              <br />
              <b>Uses for Margins:</b>
              <ol>
                <li><b>Change an Element’s Position on the Page: </b>CSS margins can move an element up or down on the page, as well as left or right. If the width of your page is fixed, centering an element horizontally is simple: Just assign the value margin: auto.</li>
                <li><b>Set the Distance Between Nearby Elements: </b></li>
                <li><b>Overlap Elements: </b>On the flip side, a negative margin value lets you overlap page elements. This can come in handy when trying to achieve a broken grid effect.</li>
              </ol>
              <br />

              <h3>33. Explain the CSS “box model” and the layout components that it consists of Provide some usage examples.</h3>
              The CSS box model is used for page design and layout.  Essentially, every HTML element in a document is wrapped inside a layered box that consists of the margin, border, padding, and content.
              <img src={boxModels} alt="" className="responsive" style={{ width: "400px", height: "200px", float: 'right' }} />
              <br />
              The CSS box model is a rectangular layout paradigm for HTML elements that consists of the following:
              <ol>
                <li><b>Content -</b> The content of the box, where text and images appear</li>
                <li><b>Padding -</b> A transparent area surrounding the content (amount of space between the border and the content).</li>
                <li><b>Border -</b> A border surrounding the padding (if any) and content.</li>
                <li><b>Margin -</b> A transparent area surrounding the border (Space between the border and any neighboring elements).</li>
              </ol>
              <br />
              The border is the layer of the CSS box model that sits between margin and padding. By default, the border does not have any width, but you can set one with the CSS border property.
              <br />
              <div style={titles}>
                <PrismCode
                  code={boxModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>34. Different Box Sizing Property?</h3>
              The box-sizing CSS property sets how the total width and height of an element are calculated.
              <br />
              <ol>
                <li><b>Content-box: </b>Is the default value box-sizing property. The height and the width properties consist only of the
                  content by excluding the border and padding.</li>
                <li><b>Padding-box: </b>Width and height values apply to the element's content and its padding. The border is added to the
                  outside of the box.</li>
                <li><b>Border-box: </b>Property includes the content, padding and border in the height and width properties..</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={boxProperties}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>35. CSS Flexbox or Grid specs?</h3>
              <ul>
                <li>Flexbox is a way to align items into container.</li>
                <li>Flexbox = Flexible + box</li>
                <ol>
                  <li><b>main-axis: </b>Horrizontal</li>
                  <li><b>cross-axis: </b>Vertical</li>
                </ol>
                <br />
                <li>Flexbox is a 1-dimensional layouts while Grid is 2-dimensional layouts.</li>
                <li>Flexbox solves problems such as vertical centering of elements within a container, sticky footer, etc.</li>
                <li>Grid use for creating grid-based layouts.</li>
              </ul>
              <br />
              <br />

              <h3>36. Grid</h3>
              <ul>
                <li>A grid is a set of intersecting horizontal and vertical lines defining columns and rows. Elements can be placed onto the grid within these column and row lines.</li>
                <li>Grid is 2-dimensional layouts.</li>
              </ul>
              <br />
              <ol>
                <li><b>Properties for the Parent (Grid Container):</b></li>
                <ul>
                  <li><b>Display: </b>Defines the element as a grid container and establishes a new grid formatting context for its contents.</li>
                  <li><b>Grid-template-rows: </b>Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.</li>
                  <li>Grid lines are automatically assigned positive numbers from these assignments (-1 being an alternate for the very last row).</li>
                  <li><b>grid-template-areas: </b>Defines a grid template by referencing the names of the grid areas which are specified with the grid-area property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell.</li>
                  <li></li>
                  <li></li>
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

              <h3>37. Grid-Template</h3>
              <div style={titles}>
                <PrismCode
                  code={gridtemplates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>38. Justify-items</h3>
              Aligns grid items along the inline (row) axis (as opposed to align-items which aligns along the block (column) axis). This value applies to all grid items inside the container
              <br />
              <br />
              <b>align-items: </b>Aligns grid items along the block (column) axis (as opposed to justify-items which aligns along the inline (row) axis). This value applies to all grid items inside the container.
              <ol>
                <li><b>stretch: </b>fills the whole height of the cell (this is the default).</li>
                <li><b>start: </b>aligns items to be flush with the start edge of their cell.</li>
                <li><b>end: </b>aligns items to be flush with the end edge of their cell.</li>
                <li><b>center: </b>aligns items in the center of their cell.</li>
                <li><b>baseline: </b>align items along text baseline. There are modifiers to baseline — first baseline and last baseline which will use the baseline from the first or last line in the case of multi-line text.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={judtifyItems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>39. Justify-content</h3>
              <ol>
                <li><b>justify-content: </b>Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the inline (row) axis (as opposed to align-content which aligns the grid along the block (column) axis).</li>
                <li><b>align-content: </b>Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the block (column) axis (as opposed to justify-content which aligns the grid along the inline (row) axis).</li>
                <li><b>grid-auto-rows: </b>Specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid.</li>
                <li><b>grid-auto-flow: </b>If you have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items. This property controls how the auto-placement algorithm works.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={justifycontain}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>40. Properties for the Children (Grid Items)</h3>
              Determines a grid item’s location within the grid by referring to specific grid lines. grid-column-start/grid-row-start is the line where the item begins, and grid-column-end/grid-row-end is the line where the item ends.
              <ol>
                <li><b>line: </b>can be a number to refer to a numbered grid line, or a name to refer to a named grid line.</li>
                <li><b>span(number): </b>the item will span across the provided number of grid tracks.</li>
                <li><b>span(name): </b>the item will span across until it hits the next line with the provided name.</li>
                <li><b>auto: </b>indicates auto-placement, an automatic span, or a default span of one.</li>
              </ol>
              <br />
              <b>justify-self: </b>Aligns a grid item inside a cell along the inline (row) axis (as opposed to align-self which aligns along the block (column) axis). This value applies to a grid item inside a single cell.
              <br />
              <b>align-self: </b>Aligns a grid item inside a cell along the block (column) axis (as opposed to justify-self which aligns along the inline (row) axis). This value applies to the content inside a single grid item.
              <div style={titles}>
                <PrismCode
                  code={propertieschilds}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>41. Properties of flexbox?</h3>
              Flexbox main purpose of providing an efficient way to handle
              layouts, align elements within them and distribute spaces amongst the items in dynamic/ responsive conditions. It provides an
              ability to alter the dimensions of the items and make use of the available space in the container efficiently. In order
              to achieve this, CSS3 provides some properties.
              <br />
              <br />
              <ul>
                <li><b>flex-direction: </b>Defining the direction.</li>
                <ol>
                  <li><b>row: </b>Stacks items horizontally from left to right in the flex container.</li>
                  <li><b>column: </b>Stacks items vertically from top to bottom in the flex container.</li>
                  <li><b>row-reverse: </b>Horizontally from right to left.</li>
                  <li><b>column-reverse: </b>Vertically from bottom to top.</li>
                </ol>
                <br />

                <li><b>flex-wrap: </b>Specifies of the flex items should be wrapped/ not. Possible values are:</li>
                <ol>
                  <li><b>wrap: </b>The flex items wood be wrapped if needed.</li>
                  <li><b>nowrap: </b>default value.</li>
                  <li><b>wrap-reverse: </b>Wrapped in reverse order.</li>
                </ol>
                <br />

                <li><b>flex-flow: </b>This property is used for setting both flex-direction and flex-wrap properties in one statement.</li>
                <br />

                <li><b>justify-content: </b>Used for aligning the flex items. Possible values are:</li>
                <ol>
                  <li><b>center: </b>All the flex items are present at the center of the container.</li>
                  <li><b>flex-start: </b>States that the items are aligned at the start of the container. This is the default value.</li>
                  <li><b>flex-end: </b>Items are aligned at the end of the container.</li>
                  <li><b>space-around: </b>Displays the items having space between, before, around the items.</li>
                  <li><b>space-between: </b>Displays items with spaces between the lines.</li>
                </ol>
                <br />
                <li><b>align-items: </b>Used for aligning flex items.</li>
                <br />
                <li><b>align-content: </b>Used for aligning the flex lines.</li>
              </ul>
              <br />

              <h3>42. Describe floats and how they work</h3>
              <p>
                <ol>
                  <li>Float is a CSS positioning property. Floated elements remain a part of the flow of the web page.</li>
                  <li>Absolutely positioned page elements are removed from the flow of the webpage.</li>
                  <li>Float has 3 properties: Left, Right None and inherit(The element inherits the float value of its parent).</li>
                  <li>Each value indicates how an element should float. When float is set, each element will get out of its normal  flow and will be shifted to the specified direction, until it gets its container or another floated element.</li>
                  <li>float has 2 properties: <b>Left, Right</b>.</li>
                  <li>div took 100% row space.</li>
                  <li>img don't took 100% row space.</li>
                </ol>
              </p>
              <ul>
                <li><b>flex-direction: </b>By default flex-direction is row.</li>
                <li><b>space-between: </b>Not apply on start and end.</li>
                <li><b>space-evenly: </b>Apply on start and end also.</li>
                <li><b>space-around: </b>Like padding on box.</li>
                <li><b>flex-grow: </b>Adjeced box on the base of screen</li>
                <li><b>fraction (fr): </b>Divide on the basis of screen-size</li>
              </ul>
              <br />
              <b>How to Use Float in CSS</b>
              <br />
              <ol>
                <li>Use float in CSS, you only need a CSS selector and the defined float property inside the brackets</li>
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

              <h3>43. Purpose of clearing floats in CSS</h3>
              <ol>
                <li>The clear CSS property specifies whether an element can be next to floating elements that precede it or must be moved down
                  (cleared)
                  below them.</li>
                <li>Clearing floats (or clearfixing) basically forces the containing element to expand to contain its child elements. It thus
                  forces the
                  subsequent elements to appear below it.</li>
                <li>The CSS clear controls the behavior of the floating element by preventing the overlapping of consecutive elements over the floating element.</li>
                <li>The whole problem is that floated objects do not add to the height of the object the reside in properly.</li>
                <li>The value of the property clear specifies the side on which the floating element is not supposed to float. The values of clear property can be none, left, right, both, inherit, inline-start, and inline-end.</li>
              </ol>
              <br />

              <h3>44. Explain the usage of "table-layout" property</h3>
              <p>The table-layout property defines the algorithm used to layout table cells, rows, and columns.</p>
              <ul>
                <li>The table-layout property defines what algorithm the browser should use to lay out table rows, cells, and columns.</li>
                <li>table layout in general is usually a matter of taste and will vary depending on design choices. Browsers will, however, automatically apply certain constraints that will define how tables are laid out. This happens when the table-layout property is set to auto (the default). But these constraints can be lifted when table-layout is set to fixed.</li>
              </ul>
              <ol>
                <li><b>auto -</b> Browsers use an automatic table layout algorithm. The column width is set by the widest unbreakable content in
                  the cells.</li>
                <li><b>fixed -</b>Fixed layout based on the first row. And the rest of the table follows. If no
                  widths are present on the first row, the column widths are divided equally across the table.</li>
                <li><b>initial -</b> Sets this property to its default value.</li>
                <li><b>inherit -</b> Property from its parent element.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={table_layout}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>45. Describe pseudo-elements and discuss what they are used for.</h3>
              <p>
                A CSS pseudo-element is a keyword added to a selector that style a specific part of the selected element. It can
                be used for decoration (:first-line, :first-letter) or adding elements to the markup without modify the markup (:before, :after).
              </p>
              <br />
              A CSS pseudo-element is a keyword added to a CSS selector that lets you style a specific part of the selected HTML element. In CSS3, they are usually denoted by two colons — for example, ::first-line.
              <br />
              <br />
              <ol>
                <li><b>:first-line</b> and <b>:first-letter</b> can be used to decorate text.</li>
                <li><b>.clearfix</b> used to add a zero-space element with <b>clear: both</b>.</li>
                <li>Triangular arrows in tooltips use <b>:before</b> and <b>:after</b>.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={psudoele}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>There are currently seven pseudo-elements in CSS. They are: </b>
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
              There are a few properties that can be used on the ::selection pseudo-element: color, background-color, cursor, caret-color, outline, text-decoration, text-emphasis-color, and text-shadow.
              <br />
              <br />

              <b>Pseudo-classes: </b>A pseudo-class is used to define a special state of an element.
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

              <b>LESS: (Leaner Stylesheets)</b>
              <ol>
                <li> LESS is easy to add to any javascript projects by using NPM or less.js file.</li>
                <li>uses the extension .less.</li>
              </ol>
              <br />
              <b>Stylus:</b>
              <br />
              Stylus offers a great deal of flexibility in writing syntax, supports native CSS as well as allows omission of brackets, colons, and
              semicolons.
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={sass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>47. What is the importance of CSS Sprites?</h3>
              CSS sprites are used for combining multiple images in a single larger image. They are commonly used for representing icons that are
              used in the user interfaces. The main advantages of using sprites are:
              <br />
              <ol>
                <li>It reduces the number of HTTP requests to get data of multiple images as they are acquired only by sending a single request.</li>
                <li>It helps in downloading assets in advance that help display icons/ images upon hover/ other pseudo-states.</li>
                <li>When there are multiple images, the browser makes separate calls to get the image for each of them. Using sprites, the images
                  are combined in one and we can just call all images using one call.</li>
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

              <h3>48. What do you understand by tweening in CSS?</h3>
              Tweening is the process of filling the gaps between the key sequences, i.e between the keyframes that are already created.
              Keyframes are those frames that represent start and end point of animation action. Tweening involves generating intermediate
              keyframes between two images that give the impression that the first one has evolved smoothly to the second image. For this
              purpose, we use properties like transforms - matrix, translate, scale, rotate etc.
              <br />
              <br />
              In the below example, we are generating intermediate frames of paragraph elements to slide through from the start to the right
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
    )
  }
}

export default (withStyles(styles)(CssBasics));
