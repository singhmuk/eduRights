import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';


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

const refsReact = `
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
`.trim();

const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();

// const getLists = ``.trim();


class ReactInter extends Component {
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
              <h3>How to create refs in React?</h3>
              <ul>
                <li>allow you to get direct access to a DOM element.</li>
                <li>Refs are created using React.createRef() method and attached to React elements via the ref attribute.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={refsReact}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>What are advantages of using React Hooks?</h3>
              Enable the extraction and reuse of stateful logic that is common across multiple components without the burden 
              of HOC or render props. Hooks allow to easily manipulate the state of our functional component without convert 
              them into class components.
              <br/>

              <h3>Differences between a Class component and Functional component?</h3>
              <ul>
                <li><b>Class component: </b>
                  <ul>
                    <li>Uses ES6 class syntax. It can make use of the lifecycle methods.</li>
                    <li>Extend from React.Component.</li>
                  </ul>
                </li>
                <br/>
                <li><b>Functional component: </b>
                  <ul>
                    <li>Mainly focuses on the UI of the application, not on the behavior.</li>
                    <li>Can have state and mimic lifecycle events using Reach Hooks</li>
                  </ul>
                </li>
              </ul>
              <br/>

              <h3>What does it mean for a component to be mounted in React?</h3>
              It has a corresponding element created in the DOM and is connected to that.
              <br/>

              <h3>What is the purpose of using super constructor with props argument in React?</h3>
              A child class constructor cannot make use of this reference until super() method has been called. The same 
              applies for ES6 sub-classes as well. The main reason of passing props parameter to super() call is to access 
              <b>this.props</b> in your child constructors.
              <br/>

              <h3>Does React useState Hook update immediately?</h3>
              React <b>useState and setState</b> don’t make changes directly to the state object; they create queues to optimize 
              performance, which is why the changes don’t update immediately. The process to update React state is asynchronous 
              for performance reasons.
              <br/>

              <h3>How can I make use of Error Boundaries in functional React components?</h3>
              <ul>
                <li>As of v16.2.0, there's no way to turn a functional component into an error boundary. The 
                  <b>componentDidCatch()</b> method works like a JavaScript <b>catch block</b>, but for components. Only class 
                  components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary 
                  component once and use it throughout your application.</li>
                <li>Also bear in mind that <b>try/catch</b> blocks won't work on all cases. If a component deep in the hierarchy 
                tries to update and fails, the try/catch block in one of the parents won't work -- because it isn't necessarily 
                updating together with the child.</li>
                <li>A few third party packages on npm implement error boundary hooks.</li>
              </ul>
              <br/>

              <h3>What is prop drilling and how can you avoid it?</h3>
              <ul>
                <li>When building a React application, there is often the need for a deeply nested component to use data provided 
                  by another component that is much higher in the hierarchy. The simplest approach is to simply pass a prop from 
                  each component to the next in the hierarchy from the source component to the deeply nested component. This is 
                  called prop drilling.</li><br/>
                <li>The primary disadvantage of prop drilling is that components that should not otherwise be aware of the data 
                  become unnecessarily complicated and are harder to maintain.</li><br/>
                <li>To avoid prop drilling, a common approach is to use React context. This allows a Provider component that 
                  supplies data to be defined, and allows nested components to consume context data via either a Consumer 
                  component or a useContext hook.</li>
              </ul>
              <br/>

              <h3>What is StrictMode in React?</h3>
              React's StrictMode is sort of a helper component that will help to write better react components, we can wrap a 
              set of components with <b>'StrictMode /'</b> and it'll basically:
              <ul>
                <li>Verify that the components inside are following some of the recommended practices and warn you if not in 
                  the console.</li>
                <li>Verify the deprecated methods are not being used, and if they're used strict mode will warn you in the console.</li>
                <li>Help you prevent some side effects by identifying potential risks.</li>
              </ul>
              <br/>

              <h3>Why do class methods need to be bound to a class instance?</h3>
              In JavaScript, the value of this changes depending on the current context. Within React class component methods, 
              developers normally expect this to refer to the current instance of a component, so it is necessary to bind these 
              methods to the instance. Normally this is done in the constructor.
              <br/>

              <h3>Why we should not update state directly?</h3>
              If you try to update state directly then it won’t re-render the component.
            </List>
            <br/>

            <h3>React application Bundling.</h3>
            <b>What is a Bundle: </b>When it comes to modern web application development using React we all write JS code in a 
            modular way for easy maintainability but when we are serving that code to a browser to parse it and render it we 
            don’t have to worry about this and can serve all our code as a single JS file.
            <br/>
            This single JS file is called a bundle.
            <br/>
            <br/>
            <b>How to create a JS Bundle: </b>Tools like Create React App internally use Webpack for bundling code.
            <br/>
            Bundlers like Webpack import all of our application’s dependencies and merge them into a single bundle.
            <br/>
            <br/>
            <b>Advantages of bundling into a single file: </b>
            <ul>
              <li>Allowing the browser to download our entire application once and handle all the other navigations without any 
                additional network calls to our server.</li>
              <li>Browsers don’t need to load any other files because they are all in a single bundle.</li>
              <li>While these advantages make bundling into a single file look very good, an application bundle can become very 
                large as we add new features to our application, which means it can increase our application load time.</li>
            </ul>
            <br/>
            <ul>
              <li>Also keep in mind that our bundle size increases as you add new features to our application, This means that 
                there can be an increase in our application’s load time.</li>
              <li>The solution to the above problem is to split the bundle into smaller bundles, which ensures that browsers will 
                only download the bundle they need for rendering only the page that the user visits. </li>
              <li>By doing this, we will reduce the size of the bundle that the browser downloads during our application’s initial 
                load and boost our application’s performance.</li>
              <li>Bundle splitting allows us to delay loading the bundles until they are actually needed.</li>
              <li>With <b>React.Lazy</b> we can load a component dynamically.</li>
              <li>Unlike normal imports, which are synchronous, dynamic imports are asynchronous. This enables us to load our 
                components and files on demand.</li>
              <li>If we forget to add a <b>Suspense</b> container we’ll get an error.</li>
            </ul>
            <br/>

            <h3>What were the techniques you applied to enhance the performance of the application?</h3>
            <ul>
              <li>Use <b>React.Fragment</b> to Avoid Adding Extra Nodes to the DOM.</li>
              <li><b>Use Production Build :</b> For optimizing a React app is by making sure we bundle our app for production 
              before deploying. By default, our app is in development mode, which means React will include helpful warnings. 
              This can be very useful while we’re developing, but it can make our app size large and responses slower than usual. 
              If our project is built with create-react-app, we can fix this by running <b>npm run build</b> before deploying, 
              which will create a <b>production-ready</b> build of our app in a <b>build/ folder</b> that we can then deploy.</li>
              <li>Use React.Suspense and React.Lazy for Lazy Loading Components.</li>
              <li><b>React.memo for component memorization: </b></li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ReactInter));
