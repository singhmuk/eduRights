import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';


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

const appcss = `
@import 'styles/styles';

.text{
    color: $secondaryColor;
    font-weight: map-get($font-weight, bold);
    margin-bottom: $basePadding;
}

//nesting
.main{
    .nesting {
        color: $primaryColor;
        font-weight: map-get($font-weight, medium);  
    }
}

nav {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: inline-block;
    }
    a {
      display: block;
      padding: 6px 12px;
      text-decoration: none;
    }
  }

  
  //@mixin
  @mixin important-text {
    color: red;
    font-size: 25px;
    font-weight: bold;
    border: 1px solid blue;
  }
  
  .danger {
    @include important-text;
    background-color: green;
  }

  //Sass @extend Directive
  .button-basic  {
    border: none;
    padding: 15px 30px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  
  .button-report  {
    @extend .button-basic;
    background-color: red;
  }
  
  .button-submit  {
    @extend .button-basic;
    background-color: green;
    color: white;
  }
`.trim();


class Sass extends Component {
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
              <h3>1. How does Calc work?</h3>
              calc() function allows us to perform mathematical operations on property values. Instead of declaring.
              <br />
              <b>Ex. </b>static pixel values for an element's width, we can use calc() to specify that the width is the result of the addition of
              two/ more numeric values.
              <div style={titles}>
                <PrismCode
                  code={Calc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. What is a CSS Preprocessor. What is SCSS, Sass Less, and Stylus?</h3>
              A CSS Preprocessor is a tool used to extend the basic functionality of default vanilla CSS through its own scripting language. It
              helps us to use complex logical syntax like – variables, functions, mixins, code nesting, and inheritance to name a few, supercharging
              our vanilla CSS.
              <br />
              <br />
              <b>SASS (Syntactically Awesome Style Sheets): </b>SASS can be written in two different syntaxes using SASS or SCSS.
              <br />
              <br />
              <b>SASS vs SCSS</b>
              <ol>
                <li>SASS is based on indentation and SCSS(Sassy CSS) is not.</li>
                <li>SASS uses .sass extension while SCSS uses .scss extension.</li>
                <li>SASS uses indentation rather than brackets to indicate nesting of selectors, and newlines rather than semicolons to separate
                  properties.</li>
              </ol>
              <br />

              <h3>3. What is a Mixin and how to use on?</h3>
              <ol>
                <li>A Mixin is a block of code that lets us group CSS declarations we may reuse throughout our site.</li>
                <li>To use a Mixin, we simply use <b>@include</b> followed by the name of the Mixin and a semi-colon.</li>
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

              <b>App.scss</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={appcss}
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

export default (withStyles(styles)(Sass));
