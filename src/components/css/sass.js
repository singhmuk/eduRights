import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../ReactJs/styles.css";
import Sidebar from "./sidebar";
import PrismCode from "../ReactJs/prismCode";

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

const Calc = `
.foo {
	Width: calc(100px + 50px)
}
`.trim();

const Mixin = `
//To define mixin:
@mixin grid($flex: true /*default argument*/) {
  @if $flex {
      @include flex;
  } @else {
      display: block;
  }
}


.row {
  @include grid(true);
}

/*css*/
.row {
  display: -webkit-flex;
  display: flex;
}
`.trim();

const app = `
import './App.scss';

function App() {
  return (
    <div>
       <p className='text'>Paragraph</p>
       <div className='main'>
       <p className='nesting'>Nesting</p>
       </div>

       <nav>
        <ul>
          <li><a href="#">HTML</a></li>
          <li><a href="#">CSS</a></li>
          <li><a href="#">SASS</a></li>
        </ul>
      </nav>

      <div className="danger">Warning! This is some text.</div>
      <button class="button-basic button-report">Report this</button>
    </div>
  );
}

export default App;
`.trim();

const stylescss = `
//variables
$primaryColor:blue;
$secondaryColor:#008000;

$basePadding:0.75rem;
$borderRadius:10%;

$font-weight:(
    "regular":400,
    "medium":500,
    "bold":600
);
`.trim();

const varNesting = `
h3 { color: $color-primary; }

p { color: $color-blue; }

a { color: $color-blue; }

$color-primary: pink;
$color-blue: blue;
$box-border: 1px solid black;
$border-radius: 5%;
$border-padding: 10px;
$border-with: 50%;

//scss map
$color: (
  blue-color: blue,
  green-color: green,
  yellow-color: yellow,
  red-color: red,
  white-color: white,
);
.box1 {
  background-color: map-get($color, yellow-color);
  border: $box-border;
  border-radius: $border-radius;
}

.box1, h3 {
  font-size: 30px;
  color: rgb(63, 61, 202);
}

.box1, p {
  font-size: 18px;
  color: rgb(41, 143, 75);
}

.box1, a {
  color: rgb(136, 11, 32);
}

.box1 a:hover {
  background-color: red;
}

.box2 {
  background-color: map-get($color, red-color);
  width: $border-with;
}

.box2, h3 {
  font-size: 30px;
  color: rgb(49, 49, 83);
}

//nesting
ul {
  list-style-type: square;
  li {
    padding: 5px;
    button {
      background-color: blue;

      &:hover {
        background-color: green;
      }
    }
    &:first-child {
      border: 1px solid pink;
    }
  }
}


//variable.html
<div class="box1">
  <h3>Best Box</h3>
  <p>Please make box</p>
  <a href="#">link here</a>
</div>
<div class="box2">
  <h3>Best Box2</h3>
  <p>Please make box2</p>
  <a href="#">link here2</a>
</div>
<ul>
  <li><button>Button1</button></li>
  <li><button>Button2</button></li>
  <li><button>Button3</button></li>
  <li><button>Button4</button></li>
  <li><button>Button5</button></li>
  <li><button>Button6</button></li>
</ul>
`.trim();

const varriscss = `
$box-border: 1px solid black;
$border-radius: 5%;
$border-padding: 10px;
$border-with: 50%;
$font-text: 18px;

//scss map
$color: (
  blue-color: blue,
  green-color: green,
  yellow-color: yellow,
  red-color: red,
  white-color: white,
);
`.trim();

const utilitycss = `
@import "./_veriables";

.float { float: left; }

.floatR { float: right; }

.clear { float: both; }

.margin-0 { margin: 0; }

.padding-0 { padding: 0; }
`.trim();

const scssmap = `
$color: (
  blue-color: blue,
  green-color: green,
  yellow-color: yellow,
  red-color: red,
  white-color: white,
);

h2 {
  font-size: $font-text;
  color: map-get($color, yellow-color);
}`.trim();

const mixinscss = `
@import "../scss/base-global";
@import "../scss/_veriables";
@import "../scss/_typography";
@import "../scss/utility";

$box-border: 1px solid black;
$border-radius: 5%;
$border-padding: 10px;
$border-with: 50%;

//scss map
$color: (
  blue-color: blue,
  green-color: green,
  yellow-color: yellow,
  red-color: red,
  white-color: white,
);

//mixin
@mixin block {
  border: $box-border;
  border-radius: $border-radius;
  padding: $border-padding;
  width: $border-with;
  h3 {
    font-size: 30px;
  }
}

.box1 {
  @include block;
  background-color: map-get($color, yellow-color);
}

.box1, h3 {
  @include block;
  color: rgb(63, 61, 202);
}

.box2 {
  @include block;
  background-color: map-get($color, red-color);
}

.box2, h3 {
  @include block;
  color: rgb(49, 49, 83);
}`.trim();

const operatorscss = `
//Comparision Operators: <, >, <=, >=

$val1: 10;
$val2: 5;

.myClass {
  padding: $val1 % $val2 + px;
}

.myClass {
  font-size: $val1 + px;
}

.myClass {
  font-size: $val1 * 2 + px;
}
`.trim();

const extendscss = `
.box {
  border: 2px solid green;
  border-radius: 10px;
  width: 300px;
}

//extends
.greenbox {
  @extend .box;
}

//placeholder
%box2 {
  border: 2px solid green;
  border-radius: 10px;
  width: 300px;
}

.greenbox2 {
  @extend %box2;
}
`.trim();

const functioncss = `
.function {
  background-color: yellow;
  border: 1px solid red;
}

.function:hover {
  background-color: darken(blue, 15%);
  background-color: mix(black, green);
}

//custom function
@function sum($val, $val2) {
  @return $val + $val2;
}

.function {
  font-size: sum(20, 50) * 1px;
}

//image
.header {
  background: url("../image.png");
}`.trim();

const condotionscss = `
$value: high;

.myClass {
  @if $value == high {
    margin: 100px;
  } @else if($value == low) {
    margin: 550px;
  } @else {
    margin: 20px;
  }
}

@mixin myStyle {
  font-size: 10px;
}
.myClass2 {
  @include myStyle();
}`.trim();

const loopcss = `
@for $i from 1 through 4 {
  .box {
    width: 100px;
  }
}

@for $i from 1 to 4 {
  .box {
    width: 100px;
  }
}

//each :Loop iteration happen on the basis of list.
$devices: desktop, mobile, teblet;

@each $active in $devices {
  .myDevice {
    background-color: green;
  }
}

//while
$i: 1;
@while $i<4 {
  .myClass {
    width: 100px;
  }

  $i: $i + 1;
}
`.trim();

const interpolationcss = `
$side: left;
$value: 50;

.gap-#{$side}-#{$value} {
  margin-#{$side}: 50px;
}

@mixin gap($side, $value) {
}

.myClass {
  @include gap(right, 100);
}`.trim();

const contentdirective = `
@mixin myMixin {
  font-size: 20px;
}

.class {
  @include myMixin() {
    background: red;
  }
}

.class2 {
  @include myMixin();
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    background-color: green;
  }
}
`.trim();

class Sass extends Component {
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
              <h3>Features of Sass:</h3>
              Create scss file with <b>_filename</b>.
              <ol>
                <li>Variables</li>
                <li>Nesting</li>
                <li>Partials & Imports</li>
                <li>Mixins</li>
                <li>Extends</li>
                <li>Operators</li>
                <li>Functions</li>
                <li>Conditional Directives</li>
              </ol>
              <br />
              <br />
              <h3>1. How does Calc work?</h3>
              calc() function allows us to perform mathematical operations on
              property values. Instead of declaring.
              <br />
              <br />
              <b>Ex. </b>static pixel values for an element's width, we can use
              calc() to specify that the width is the result of the addition of
              two/ more numeric values.
              <div style={titles}>
                <PrismCode
                  code={Calc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. SASS vs SCSS</h3>
              <ol>
                <li>
                  SASS is based on indentation and SCSS(Sassy CSS) is not.
                </li>
                <li>
                  SASS uses .sass extension while SCSS uses .scss extension.
                </li>
                <li>
                  SASS uses indentation rather than brackets to indicate nesting
                  of selectors, and newlines rather than semicolons to separate
                  properties.
                </li>
              </ol>
              <br />
              <h3>3. What is a Mixin and how to use on?</h3>
              <ol>
                <li>
                  A Mixin is a block of code that lets us group CSS declarations
                  we may reuse throughout our site.
                </li>
                <li>
                  To use a Mixin, we simply use <b>@include</b> followed by the
                  name of the Mixin and a semi-colon.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={Mixin}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Sass Example</h3>
              <b>npm install node-sass</b>
              <br />
              <b>app.js</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={app}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>styles/styles.scss</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={stylescss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>4. Variable & Nesting</h3>
              <div style={titles}>
                <PrismCode
                  code={varNesting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. Variable</h3>
              <div style={titles}>
                <PrismCode
                  code={varriscss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>6. Utility</h3>
              <div style={titles}>
                <PrismCode
                  code={utilitycss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>7. scss-map</h3>
              <div style={titles}>
                <PrismCode
                  code={scssmap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>8. Mixin scss</h3>
              <div style={titles}>
                <PrismCode
                  code={mixinscss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>9. Operators</h3>
              <ul>
                <li>
                  <b>Equality Operators: </b>==, !=
                </li>
                <li>
                  <b>Comparision Operators: </b>
                </li>
                <li>
                  <b>Numeric Operators: </b>+, -, %, /, *
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={operatorscss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>10. Extends & Placeholder</h3>
              <div style={titles}>
                <PrismCode
                  code={extendscss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>11. Functions</h3>
              <ul>
                <li>[[sass built-in feFunctions]]</li>
                <li>darken($colorName, 15%);</li>
                <li>lighten($colorName, 15%);</li>
                <li>mix(black, grin);</li>
                <li>map-get($map, $key)</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={functioncss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>12. Condotions</h3>
              <div style={titles}>
                <PrismCode
                  code={condotionscss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>13. Loop</h3>
              <div style={titles}>
                <PrismCode
                  code={loopcss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>14. Interpolation</h3>
              <div style={titles}>
                <PrismCode
                  code={interpolationcss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>15. Content Directive</h3>
              <div style={titles}>
                <PrismCode
                  code={contentdirective}
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

export default withStyles(styles)(Sass);
