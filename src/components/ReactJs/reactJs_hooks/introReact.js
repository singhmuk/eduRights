import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../dashboard/blog/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';

import Tools from "../../../assets/js/jsToolchain.png";
import Tools2 from "../../../assets/js/jsToolchain_2.png";
import VDom from "../../../assets/js/vDom.png";


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
}

const redesigns = {
  height: 350,
  width: 600
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

const call = `
// assuming this.state = { value: 0 }
this.setState({ value: 1 });
console.log(this.state.value); // 0
`.trim();

const newState = `
// assuming this.state = { value: 0 };
this.setState({ value: this.state.value + 1});
this.setState({ value: this.state.value + 1});
this.setState({ value: this.state.value + 1});`.trim();

const newStates = `
// assuming this.state = { value: 0 };
this.setState((state) => ({ value: state.value + 1}));
this.setState((state) => ({ value: state.value + 1}));
this.setState((state) => ({ value: state.value + 1}));`.trim();

const returnSynchronous = `
render() {
  return <button onClick={this.inc}>Click to update</button>
}

inc() {
  console.log('before: ' + this.state.test);
  this.setState({
    test: this.state.test+1
  });
  console.log('after: ' + this.state.test);
}

// click!
before: 1
after: 1

// click!
before: 2
after: 2`.trim();


const setCallback = `
class App extends Component {
  state = { count: 0 };
  
  handleButton = () => {
    this.setState(previous => ({ count: previous.count + 1 }))
  }
  
  render() {
    return (
      <>
        {this.state.count}
        <button type="button" onClick={this.handleButton}>btn</button>
      </>
    );
  }
}`.trim();

const SetStates = `
setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'))
`.trim();

const props1 = `
const Person = props => {
  const { name, skill } = props;
  return (
    <div>
      <h2>
        I am {name},I know {skill}
      </h2>
    </div>
  );
};


const App =() => {
  const [name, skill]=useState(['Krishan',"skill"])

  return(
    <div>
      <Person name={name} skill={skill} />
    </div>
  )
}

export default App;`.trim();

const props2 = `
//Person.js
const Person = props => {
  const { name, age, skill } = props;
  return (
    <div>
      <h2>
        I am {name},My age is {age},I know {skill}
      </h2>
    </div>
  );
};
export default Person;


//NameList.js
import React from "react";
import Person from "./persons";
function NameList() {
  const persons = [
    {
      id: 1,
      name: "kaptan",
      age: 30,
      skill: "react"
    },
    {
      id: 2,
      name: "rinku",
      age: 29,
      skill: "java"
    },
    {
      id: 3,
      name: "ankit",
      age: 39,
      skill: "vue"
    }
  ];
  const personsList = persons.map(person => <Person person={person} />);
  return <div>{personsList}</div>;
}

export default NameList;
`.trim();

const propsComponents = `
//App.js
function formatDate(date) {
  return date.toLocaleDateString();
}

function App(props) {
  return (
      <div>
        {props.author.name}---
        {props.text}---
        {formatDate(props.date)}
      </div>
  );
}

export default App;


//comment.js
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};  

export { comment }


//index.js
import App from './App';
import { comment } from './comment';

ReactDOM.render(
  <React.StrictMode>
    <App
      date={comment.date}
      text={comment.text}
      author={comment.author}
  />
  </React.StrictMode>,
`.trim();

const Children = `
//Props.js
import Picture from './children_1';

class Props extends Component{
   state={
    picture:[{id:1, src:'One'},
             {id:2, src:'Two'},
             {id:3, src:'Three'},
          ]
   }
   render(){
     let picture = this.state.picture;
     return(
      <div className='container'>
      <Picture key={picture.id} src={picture.src}>
          {picture.map((val) => (
            <li>{val.id}</li>
          ))}
      </Picture>
    </div>
     );
   }
 }
 
 export default Props;
 
 
 //Picture.js
 const Picture = (props) => {
  return (
    <div>
      <img src={props.src}/>
      {props.children}
    </div>
  )
}
 
 export default Picture;`.trim();


const Lazy = `
import React, { Suspense, lazy } from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

consr Routes = () => (
  <Switch>
   <Suspense fallback={<div>Loading Page...</div>}>
    <Route path = "/login" component={Login} />
    <Route exact path = "Home" component={Home} />
   </Suspense>
    <Route component={()=> <h1>Page not found</h1>} />
  </Switch>`.trim();


class IntroRectJs extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <h4><Sidebar /></h4>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>

              <h3>1.Explain the standard JavaScript toolchain, transpilation, JSX, and these items.
                What tools use in the build steps to optimize the compiled output React code?</h3>
              <br />
              <img src={Tools} alt="Omega" className="responsive" style={redesign} />
              <img src={Tools2} alt="Omega" className="responsive" style={redesign} />
              <br />
              <br />

              <p>
                <b>There are a couple primary pillars in the JavaScript toolchain:</b>
              </p>
              <ul>
                <li>1. Dependency Management</li>
                <li>2. Linting</li>
                <li>3. Style-checking</li>
                <li>4. Transpilation and Compilation</li>
                <li>5. Minification</li>
                <li>6. Source-Mapping</li>
              </ul>
              <p>
                Typically, we use build tools like Gulp, Watchify/Browserify, Broccoli, or Webpack to watch the a
                filesystem for file events. After this occurs, the build tool is configured to carry out a group of sequential or
                parallel tasks.
              </p>
              <p>
                <b>Compilation - </b>specifically separate from transpiling ES6 and JSX to ES5, is the act
                of including assets, processing CSS files as JSON, or other mechanisms that can load and inject external assets and
                code into a file.
              </p>
              <p>
                <b>Minification and Compression – </b>It is the act of minifying and compressing a JS file into fewer and/or smaller
                files.
              </p>
              <p>
                <b>Source-Mapping - </b>Help identify the line in
                the original source code that corresponds with the line in the output.
              </p>
              <br />

              <h3>2.How Virtual-DOM is more efficient than Dirty checking</h3>
              <img src={VDom} alt="Omega" className="responsive" style={redesigns} />
              <p>
                In React, each of our components have a state. This state is like an observable. Essentially, React
                knows when to re-render the scene because it is able to observe when this data changes. Dirty checking
                is slower than observables because we must poll the data at a regular interval and check all of the
                values in the data structure recursively.
                <br />
                <br />

                The virtual DOM is used for efficient re-rendering of the DOM. This isn’t really related to dirty
                checking your data. We could re-render using a virtual DOM with or without dirty checking. In fact,
                the diff algorithm is a dirty checker itself.
                <br />
                <br />
                We aim to re-render the virtual tree only when the state changes. So using an observable to check if
                the state has changed is an efficient way to prevent unnecessary re-renders, which would cause lots of
                unnecessary tree diffs. If nothing has changed, we do nothing.
              </p>

              <b>Virtual DOM: </b>Virtual DOM is about avoiding unnecessary changes to the DOM, which are expensive performance-wise, 
              because changes to the DOM usually cause re-rendering of the page. Virtual DOM also allows to collect several changes to 
              be applied at once, so not every single change causes a re-render, but instead re-rendering only happens once after a set 
              of changes was applied to the DOM.
              <br/>
              <br/>
              <b>Explain the Virtual DOM and its working: </b>
              <br />
              A virtual DOM is a lightweight JS object. It is simply a copy of the real DOM.
              <br />
              The render() function in React is responsible for creating a node tree from the React components.
              <br />
              <br />
              <b>Virtual DOM operates in three simple steps:</b>
              <ul>
                <li>1. The entire UI is re-rendered in Virtual DOM representation as data changes.</li>
                <li>2. Now, the difference between the previous DOM representation and the new one is calculated.</li>
                <li>3. After the calculations are successfully, the real DOM is updated in line
                  with only the things that actually underwent changes.</li>
              </ul>
              <br />
              <h3>How does the Real DOM differ from the Virtual DOM: </h3>
              <b>DOM Manipulation – </b> Real DOM supports a very expensive DOM manipulation.
              <br />
              <b>Element Update –</b> Real DOM creates a new DOM when an element updates. While, virtual DOM updates the JSX.
              <br />
              <b>Memory Wastage –</b> Real DOM causes a lot of memory wastage while there is no memory
              wastage for Virtual DOM.
              <br />
              <b>Update Speed –</b> Real DOM updates slowly.
              <br />
              <b>Updating HTML –</b> Real DOM can directly update HTML, while virtual DOM can’t update HTML
              directly.
              <br />

              <h3>3.How do you tell React to build in Production mode and what will that do?</h3>
              There are many ways to produce a production build, so it really depends on how we created our project and the tools
              we are using in it.
              <ul>
                <li>If we used create react app to develop our project, we will need to run `npm run build` or `yarn build`
                  in the command line, on our project’s root folder. This will generate a “build” folder in our project, that has
                  our entire app built ready for production.</li>
                <li>If we set up our project manually, we should consult the bundler we are using. A common
                  bundler is Webpack. If we used Webpack we can run `webpack` command in our command line. We
                  may need to pass a different configuration to a production build. In that case we can tell Webpack
                  what configuration to use when we run the `webpack` command.
                  <br />
                  <br />

                  <b>For example: </b>`webpack —config config.prod.js`. The config has options for how to bundle
                  things together, how to process our stylesheet, images, files, etc.., and where to save the
                  production files. </li>
              </ul>
              <p>
                Ordinarily you'd utilize Webpack's Define Plugin to set NODE_ENV to production. This will strip out things
                like propType approval and additional notices. It's minify ouw code.
              </p>
              <br />
              <h3>4.What do you understand with the term polling?</h3>
              <p>
                The server needs to be monitored for updates w.r.t.time.
                This process is basically considered as pooling. It checks for the updates approximately after every 5 seconds.
                Pooling make sure that no negative information is present on the servers.
              </p>
              <br />

              <h3>5.Why do we use arrow function in React.</h3>
              <p>
                Arrow functions take the this from their surroundings (lexical binding).
                <br />
                The syntax allows an implicit return when there is no body block, resulting in shorter and
                simpler code in some cases.
              </p>

              <h3>6.Difference between redux saga and redux thunk.</h3>
              Use Thunk instead of Saga for simple and trivial tasks like:
              <ul>
                <li>AJAX calls</li>
                <li>data polling and only if they are started directly by the user interaction.</li>
              </ul>
              <br />
              <b>Use Saga for</b>
              <ul>
                <li>intertwined tasks, Ex login example of the docs.</li>
                <li>flows with a lot of steps and waitings for other conditions to happen ("finite-state machine" flows)</li>
                <li>tasks that work in the background and proceed independently from the user interaction (or a mix of background/interactions)</li>
              </ul>
              <br />

              <h3>7.What is React? What are some of its standouts?</h3>
              Writing UI test cases is simple with React, which is also easy to integrate with Angular,
              Meteor, and other popular JS frameworks.
              <ul>
                <li>Excellent for developing complex and interactive web and mobile UI</li>
                <li>Follows the component-based approach and helps in building reusable UI components</li>
                <li>Makes use of the virtual DOM instead of the real DOM</li>
                <li>Relies on server-side rendering</li>
                <li>Supports unidirectional data flow or data binding</li>
              </ul>

              <br />
              <b>Note: </b>JSX is a contraction of the JavaScript and XML.
              <br />
              <br />

              <h3>10. HOC</h3>
              A HOC is a function that takes a component and returns a new component. They can accept any dynamically provided child 
              component but they won’t modify or copy any behavior from their input components.
              <br/>
              <br/>
              <b>Benefits of HOC: </b>
              <ul>
                <li>Reuse of Code.</li>
                <li>Offers a high hacking facility</li>
                <li>Supports state abstraction and manipulation</li>
              </ul>
              <h3>11.Define Reducers in React?</h3>
              Reducers are the pure functions that clearly states as to how the application state changes
              when certain actions are made. This way, it takes into account the previous state and action
              to turn out to a new state.

              <h3>12.State</h3>
              <b>when would you use state?</b>
              <br />
              When a component needs to keep track of information between renderings the component itself update, use state.
              <p>
                Component state is a way of holding, processing information and allows to implement its logic.
                State is usually a POJO (Plain Old JavaScript Object).</p>
              <ul>
                <li>using this.setState, accept an Object that will be eventually merged into Components current state.</li>
                <li>To alter state by writing to this.state directly, it will not lead to the Component re-rendering
                  with new data, and generally lead to state inconsistency.</li>
              </ul>
              <br />
              <b>setState is asynchronous (*)</b>
              <br />
              <p>The setState causes reconciliation (the process of re-rendering
                the components tree) is base of the next property — setState is asynchronous. This
                allows us to have multiple calls to setState in a single scope and not trigger not
                needed re-renders of the whole tree.</p>
              This is why you don’t see the new values in state right after you updated it.
              <div style={titles}>
                <PrismCode
                  code={call}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>React will also try to group or batch setState calls into a single
                call, which leads us to our first “gotcha”:</p>
              <div style={titles}>
                <PrismCode
                  code={newState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>After all the above calls are processed this.state.value will be 1, not 3</i>
              <h3>setState accepts a function as its parameter</h3>
              <p>If you pass a function as the first argument of setState, React will
                call it with the at-call-time-current state and expect you to return an
                Object to merge into state. So updating our example above to:</p>
              <div style={titles}>
                <PrismCode
                  code={newStates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Will give us this.state.value = 3</i>
              <br />
              <h3>13.setState is … synchronous?</h3>
              <p>setState is asynchronous? Well, it not always the case! It depends on the execution context.</p>
              <div style={titles}>
                <PrismCode
                  code={returnSynchronous}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Is setState() is async? Props should not changeWhy is setState() in React Async instead of Sync?</b>
              <br />
              <ul>
                <li>setState() actions are asynchronous and are batched for performance gains. setState() does not immediately mutate
                  this.state but creates a pending state transition. Accessing this.state after calling this method can potentially
                  return the existing value.</li>
                <li>There is no guarantee of synchronous operation of calls to setState and calls may be
                  batched for performance gains. This is because setState alters the state and causes rerendering. </li>
                <li>Thus the setState calls are asynchronous as well as batched for better UI experience and performance.</li>
              </ul>
              <br />
              <br />
              <h3>setState accepts a callback</h3>
              <p>
                If need to execute some function, or verify if the state did indeed update correctly we
                can pass a function as the second argument of setState call, the
                function will be executed once the state was updated. Remember
                since all updates in a scope are batched, if we have multiple calls to
                setState each of their callbacks will be called with the fully-updated
                state.
              </p>
              <div style={titles}>
                <PrismCode
                  code={setCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>What is the purpose of callback function as an argument of setState()?</b>
              <br />
              <p>
                The callback function is invoked when setState finished and the component gets re-ndered. Since setState() is
                asynchronous the callback function is used for any post action.
              </p>
              <div style={titles}>
                <PrismCode
                  code={SetStates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Why can't you update state directly without setState()?.</h3>
              <ul>
                <li>setState alwase trigger re-rendering of the component.</li>
                <li>Mutating state directly can lead to odd bugs, and components that are hard to optimize.</li>
              </ul>
              <br />

              <h3>14.Props should not change</h3>
              You used to be able to change props with setProps and replaceProps but these have been deprecated.
              <br />
              <p>Since props are passed in, and they cannot change, if a React
                component that only uses props as “pure,” that is, it will always
                render the same output given the same input. </p>
              <h3>Render Props</h3>
              <p>A render prop is a way to pass a template to a component which should be used
                while rendering, on the fly.</p>

              <b>Props</b>
              <ul>
                <li>Props are read-only, Whether you declare a component as a function or a class, it must never modify its own props.</li>
                <li>All React components must act like pure functions w.r.t their props.</li>
              </ul>
              <br />
              <p>
                Props prints the name of the user depending on the props that were passed to it.
                Here, the name of the prop will be name
              </p>
              <div style={titles}>
                <PrismCode
                  code={props1}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>The name prop is assigned a value that is displayed accordingly.</i>
              <br />
              <br />
              <b>Props 2</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={props2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>15.props Components & React.Children</h3>
              <div style={titles}>
                <PrismCode
                  code={propsComponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>16.React Children</h3>
              <p>
                In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed to
                components automatically as a special prop: props.children. There are a number of methods available in the React API
                to work with this prop. These include :
              </p>
              <ul>
                <li>React.Children.map</li>
                <li>React.Children.forEach</li>
                <li>React.Children.count</li>
                <li>React.Children.only</li>
                <li>React.Children.toArray</li>
              </ul>
              <br />
              <br />
              The children, refer to the generic box whose contents are unknown until they’re passed from the parent component.
              Means that the component will display whatever is included in between the opening and closing tags while invoking the component.
              <br />
              <br />

              <b>The possible usage are:</b>
              <ul>
                <li>Grouping unknown number of similar elements into a parent element.</li>
                <li>We don’t know elements ahead of the time.</li>
                <li>The nested structure that needs a wrapper.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={Children}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
            <br />
            <h3>17. Lazy Loading</h3>
            We bundle the files in React application using tool such as webpack. Bundling in the end merges the files in the
            sequence of their imports and creates a single file.
            <br />
            <br />
            The problem with this approach is that the bundle file gets larger with the increase in files. User may not be sung
            all the feature components but still bundle is loading them, this could affect the loading of application.
            <br />
            <br />
            To avoid this, code splitting is used in React.
            <div style={titles}>
              <PrismCode
                code={Lazy}
                language="js"
                plugins={["line-numbers"]}
              />
            </div>
            <br />

            <h3>18. When do you use useLayoutEffect?</h3>
            <p>when we need the browser to paint before the effect runs</p>
            <br />

            <h3>19. When might you use React.PureComponent?</h3>
            <p>when we want a default implementation of shouldComponentUpdate()</p>
            <br />

            <h3>20. What is the children prop?</h3>
            <p>a property that lets you pass components as data to other components</p>
            <br />

            <h3>21. When using webpack, why would you need to use a loader?</h3>
            <p>to preprocess files</p>
            <br />

            <h3>22. What is sent to an Array.map() function?</h3>
            <p>a callback function that is called once for each element in the array</p>
            <br />

            <h3>23. Why is it a good idea to pass a function to setState instead of an object?</h3>
            <p>setState is asynchronous and might result in out of sync values.</p>
            <br />

            <h3>25. Output</h3>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroRectJs));
