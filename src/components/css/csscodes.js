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

const flextFloat = `
.container {
  display: flex;
  justify-content: space-between;
}

.img-box {
  height: 200px;
  width: 150px;
}


<div class="container">
  <img src="imgs.jpg" alt="" class="img-box" />
  <img src="imgs.jpg" alt="" class="img-box" />
  <img src="imgs.jpg" alt="" class="img-box" />
</div>
`.trim();

const columns = `
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.column {
  flex-basis: calc(100% / 3 - 20px);
  margin: 10px;
}

img {
  width: 100%;
  height: auto;
}


<div class="row">
  <div class="column">
    <img src="imgs.jpg" alt="" />
  </div>
  <div class="column">
    <img src="imgs.jpg" alt="" />
  </div>
  <div class="column">
    <img src="imgs.jpg" alt="" />
  </div>
</div>
`.trim();

const gridimgs = `
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
}

.img {
  height: 100px;
  width: 100px;
}

<div class="grid-container">
  <img src="imgs.jpg" alt="" class="img" />
  <img src="imgs.jpg" alt="" class="img" />
  <img src="imgs.jpg" alt="" class="img" />
</div>
`.trim();

const textCenter = `
.circle {
  width: 100px;
  height: 100px;
  background-color: #999;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

<div class="circle">Text Here</div>
`.trim();

const rowColom = `
.circle {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

<div class="circle">
  <p>Text Here</p>
  <p>Text Here</p>
  <p>Text Here</p>
  <p>Text Here</p>
  <p>Text Here</p>
</div>
`.trim();

const btnRit = `
.btn {
  float: right;
}

<button class="btn">Click me!</button>
`.trim();

const boxCircle = `
<style>
  .container {
    width: 400px;
    height: 400px;
    background-color: green;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    height: 100px;
    width: 100px;
    background-color: red;
  }
</style>

<div class="container">
  <p class="box"></p>
</div>
`.trim();

const cusGrid = `
<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .col {
    background-color: #f2f2f2;
    padding: 20px;
  }
</style>

<div class="grid">
  <div class="col">Column 1</div>
  <div class="col">Column 2</div>
  <div class="col">Column 3</div>
</div>
`.trim();

const Animations = `
<style>
  @keyframes fadeInSlide {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fadeInSlide {
    animation-name: fadeInSlide;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
</style>

<div class="fadeInSlide">New element</div>
`.trim();

const fixHeader = `
<style>
  body {
    margin: 0;
    padding: 0;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #ccc;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #ccc;
  }

  main {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: scroll;
    height: calc(
      100vh - 100px
    ); /* set height to take up remaining viewport space */
  }

  .column {
    width: 30%;
    height: 500px;
    margin: 20px 0;
    background-color: #f2f2f2;
  }
</style>

<header>Header</header>
<main>
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</main>
<footer>Footer</footer>
`.trim();

const hamburger = `
<style>
  nav {
    background-color: #333;
    overflow: hidden;
  }

  nav a {
    float: left;
    color: white;
    text-align: center;
    padding: 14px 16px;
  }

  nav button {
    float: right;
    display: none;
    background-color: #333;
    color: white;
    padding: 14px 16px;
    margin-top: 8px;
  }

  @media screen and (max-width: 600px) {
    nav a {
      display: none;
    }
    nav button {
      display: block;
    }
  }
</style>

<nav>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
  <button>&#9776;</button>
</nav>
`.trim();

const scrolls = `
<style>
  .content-section {
    max-height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Optional: prevent wrapping of text */
  }
</style>

<div class="content-section">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel est id
    justo convallis molestie. Nam auctor neque quis sapien bibendum, sed
    convallis enim maximus. Phasellus eu eros quis augue tristique fermentum.
    Sed quis magna vel quam suscipit malesuada vel sed mauris. Suspendisse in
    ullamcorper velit. Fusce vulputate justo vitae malesuada molestie.
  </p>
</div>
`.trim();

const counters = `
h1 {
  counter-increment: category;
}

h1::before {
  content: counter(category) ". ";
}


//app.html
<body>
  <h1>Header1</h1>
  <h1>Header1</h1>
  <h1>Header12</h1>
  <h1>Header12</h1>
</body>
`.trim();

const nthchild = `
ul li:nth-child(2) {
  color: red;                                   //Item 3
}

//nth-of-type()
ul li:nth-of-type(2) {
  color: green;                                 //Not show color
}

//app.css
<ul>
  <li>Item 1</li>
  <p>Item 2</p>
  <li>Item 3</li>
  <li>Item 4</li>
</ul>
`.trim();

class CssCodes extends Component {
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
              <h3>1. Three imgege in row(flex)</h3>
              <div style={titles}>
                <PrismCode
                  code={flextFloat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>2. Three imgege in row(column)</h3>
              <div style={titles}>
                <PrismCode
                  code={columns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>3. Three imgege in row(Grid)</h3>
              <div style={titles}>
                <PrismCode
                  code={gridimgs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>4. Text in center</h3>
              <div style={titles}>
                <PrismCode
                  code={textCenter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. Text row to column</h3>
              <div style={titles}>
                <PrismCode
                  code={rowColom}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>6. Button right</h3>
              <div style={titles}>
                <PrismCode
                  code={btnRit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>7. Box in circle</h3>
              <div style={titles}>
                <PrismCode
                  code={boxCircle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>8. Customizable Grid</h3>
              <div style={titles}>
                <PrismCode
                  code={cusGrid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>9. Fade Animation</h3>
              <div style={titles}>
                <PrismCode
                  code={Animations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>10. Fixed header</h3>
              <div style={titles}>
                <PrismCode
                  code={fixHeader}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>11. Hamburger</h3>
              <div style={titles}>
                <PrismCode
                  code={hamburger}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>12. Nowrap</h3>
              <div style={titles}>
                <PrismCode
                  code={scrolls}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                13. What do you have to do to automatically number the heading
                values of sections and categories?
              </h3>
              To automatically number the heading values of sections and
              categories in a web page, you can use CSS counters.
              <br />
              <div style={titles}>
                <PrismCode
                  code={counters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                14. How is the nth-child() different from nth of type selectors?
              </h3>
              Both are pseudo-classes. Both used to select elements based on
              their position within a parent element. However, they differ in
              the way they count the child elements and the type of element they
              select.
              <ol>
                <li>
                  <b>nth-child(): </b>
                  This selector selects the nth child element of a parent,
                  regardless of its type. It counts all child elements,
                  including text nodes and other non-element nodes.
                </li>
                <li>
                  <b>nth-of-type(): </b>
                  This selector selects the nth child element of a parent, based
                  on its element type. It counts only elements of the same type,
                  ignoring any text nodes or other non-element nodes.
                </li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={nthchild}
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

export default withStyles(styles)(CssCodes);
