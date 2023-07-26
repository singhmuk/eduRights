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

const Uncontrolled = `
function App() {
  const inputRef = useRef(null);
  
  const handleSubmitButton = () => {
    alert(inputRef.current.value);
  };
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <input type="submit" value="submit" onClick={handleSubmitButton} />
    </div>
  );
}`.trim();

const Update = `
class App extends Component{
  forceUpdateHandler = () => {
    this.forceUpdate();
  };
  
  render(){
    return(
      <div>
        <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button>
        <h4>Random Number : { Math.random() }</h4>
      </div>
    );
  }
}`.trim();

const code = `
class App extends Component{
  constructor(){
      super();
      this.state={count:0}
  }

  componentDidMount(){
      console.log('When component render first time')
  }

  increment(){
      this.setState({count:this.state.count + 1})
  }

  componentDidUpdate(prevProps, prevState){
      console.log(prevState.count)
      if(prevState.count !=this.state.count){
          console.log('component update')
      }
  }

  componentWillUnmount(){
      console.log('countis about to be unmounted.')
  }

  render(){
      return(
          <div>
              {this.state.count}
              {/* <button onClick={this.increment.bind(this)}>bindThis</button> */}
              <button onClick={()=>this.increment()}>clickMe</button>
          </div>
      )
  }
}


//functional component
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(()=>{
      console.log('Mounting')
      console.log('Updating', count)

      return ()=>{
          console.log('Unmount')
      }
  },[count])

  const increment = () => {
      setCount(count+1)
  }

      return(
          <div>
              {count}
              <button onClick={increment}>clickMe</button>
          </div>
      )
  }
`.trim();




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
                <li>5. Minification and Compression</li>
                <li>6. Source-Mapping</li>
              </ul>
              <br />

              <h3>2. How Virtual-DOM is more efficient than Dirty checking</h3>
              <img src={VDom} alt="Omega" className="responsive" style={redesigns} />
              <p>
                In React, each of our components have a state. This state is like an observable. Essentially, React
                knows when to re-render the scene because it is able to observe when this data changes. Dirty checking
                is slower than observables because we must poll the data at a regular interval and check all of the
                values in the data structure recursively.
              </p>

              <b>Virtual DOM: </b>Virtual DOM is about avoiding unnecessary changes to the dom. 
              Virtual DOM also allows to collect several changes to 
              be applied at once, so not every single change causes a re-render, but instead re-rendering only happens once after a set 
              of changes was applied to the DOM.
              <br/>
              <br/>
              A virtual DOM is a lightweight JS object. It is simply a copy of the real DOM.
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
              <ul>
                <li><b>DOM Manipulation: </b>Real DOM supports a very expensive DOM manipulation.</li>
                <li><b>Element Update: </b>Real DOM creates a new DOM when an element updates. While, virtual DOM updates the JSX.</li>
                <li><b>Memory Wastage: </b>Real DOM causes a lot of memory wastage while there is no memory
              wastage for Virtual DOM.</li>
                <li><b>Update Speed: </b>Real DOM updates slowly.</li>
                <li><b>Updating HTML: </b>Real DOM can directly update HTML, while virtual DOM can’t update HTML directly.</li>
              </ul>
              <br />
              
              <h3>3. What do you understand with the term polling?</h3>
              <p>
                The server needs to be monitored for updates w.r.t.time.
                This process is basically considered as pooling. It checks for the updates approximately after every 5 seconds.
                Poling make sure that no negative information is present on the servers.
              </p>

              <h3>4. Difference between redux saga and redux thunk.</h3>
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

              <h3>5. What is React? What are some of its standouts?</h3>
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

              <h3>6. HOC</h3>
              A higher-order component (HOC) is a function that takes a component as input and returns a new component with enhanced functionality. It allows for code reuse, abstraction, and the addition of new features to existing components in a flexible and composable manner.
              <br/>
              <br/>
              <b>Benefits of HOC: </b>
              <ul>
                <li>Reuse of Code.</li>
                <li>Offers a high hacking facility</li>
                <li>Supports state abstraction and manipulation</li>
              </ul>
              <br/>

              <h3>7. Define Reducers in React?</h3>
              Reducers are functions that specify how the application's state should change in response to different actions.
              <br/>
              <h3>State</h3>
              state refers to the data that represents the current state of a component. It determines how the component appears and behaves at a given point in time. State is used to store and manage dynamic information within a component.
              <br/>
              
              <h3>8. When would you use state</h3>
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
              <p>The setState causes reconciliation is base of the next property — setState is asynchronous. This
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
              <br />

              <b>setState accepts a function as its parameter</b><br/>
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

              <h3>9. setState is … synchronous?</h3>
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

              <b>Is setState() is async? Props should not change. Why is setState() in React Async instead of Sync?</b>
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

              <h3>10. Why can't you update state directly without setState()?.</h3>
              <ul>
                <li>setState alwase trigger re-rendering of the component.</li>
                <li>Mutating state directly can lead to odd bugs, and components that are hard to optimize.</li>
              </ul>
              <br />

              <h3>11. Props should not change</h3>
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
            <br />

            <h3>12. Lazy Loading</h3>
            <ul>
              <li>We bundle the files in React application using tool such as webpack. Bundling in the end merges the files in the
            sequence of their imports and creates a single file.</li>
              <li>The problem with this approach is that the bundle file gets larger with the increase in files. User may not be sung
            all the feature components but still bundle is loading them, this could affect the loading of application.</li>
            </ul>
            <br />
            <div style={titles}>
              <PrismCode
                code={Lazy}
                language="js"
                plugins={["line-numbers"]}
              />
            </div>
            <br />

            <h3>13. When might you use React.PureComponent?</h3>
            <p>When we want a default implementation of shouldComponentUpdate()</p>
            <br />

            <h3>14. What is the children prop?</h3>
            <p>A property that lets you pass components as data to other components</p>
            <br />

            <h3>15. What is prop drilling and how can you avoid it?</h3>
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

              <h3>17. Controlled component</h3>
              We have 2 ways to handle the input value: Controlled & Uncontrolled
              <p>In a controlled component, form data is handled by a React component. While in uncontroll, form data is handled 
                by the DOM itself.</p>
              <ul>
                <li>In a controlled component, the form data is handled by the state within the component.</li>
                <li>The controlled component is a way that can handle the form input value using the state and to change the input 
                  value by using setState or useState</li>
                <li>Change this state using one of the events like onChange and when the user starts writing any character 
                  setState or useState will be called and update the state of this input then it will add the new value inside 
                  the input.</li>
              </ul>
              <br />

              <b>Uncontrolled Components</b>
              <br />
              <p>The uncontrolled component is like traditional HTML form inputs that you will not be able to handle the value by yourself but the DOM will take care of handling the value of the input and save it then you can get this value using React Ref</p>

              <div style={titles}>
                <PrismCode
                  code={Uncontrolled}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Use the controlled component when you create</b>
              <ul>
                <li>Form validation so you always need to know the value of the input when typing to check if it’s a valid character or not!</li>
                <li>Disable the submit button unless all fields have valid data</li>
                <li>If you have a specific format like the credit card input</li>
              </ul>
              <br/>

              <h3>18. Force Update</h3>
              Calling forceUpdate() will cause render() to be called on the component and skip shouldComponentUpdate().<br />
              It will skip shouldComponentUpdate(), so you're not getting the optimization benefit.<br />
              Also, using forceUpdate() "bypasses" the proper lifecycle, making your code less straight-forward and possibly harder to understand and maintain.
              <div style={titles}>
                <PrismCode
                  code={Update}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>19. Lifecycle of Components</h3>
              Each component in React has a lifecycle which you can monitor and manipulate during its
              three main phases.
              <br />
              1. Mounting<br />
              2. Updating and<br />
              3. Unmounting<br />
              <br />
              <b>Mounting: </b>Mounting means putting elements into the DOM.
              <br />
              React has four built-in methods that gets called, in this order, when mounting a component:
              <br />
              <br />
              1. constructor()<br />
              3. <b>render():</b>  required and will always be called, the others are optional and will be called if you define them.<br />
              4. componentWillMount()<br />
              4. componentDidMount()<br />

              <br />
              <br />
              <b>constructor(): </b>Is called before anything else, when the component is initiated,
              and it is the natural place to set up the initial state and other initial values.
              <br />
              <br />
              The constructor() method is called with the props, as arguments, and you should always start
              by calling the super(props) before anything else, this will initiate the parent's constructor
              method and allows the component to inherit methods from its parent.
              <br />
              <br />
              <b>componentDidMount: </b>Method is called after the component is rendered.
              <br />
              This is where you run statements that requires that the component is already placed in the
              DOM.
              <br />
              <br />
              <b>Updating: </b>
              A component is updated whenever there is a change in the component's state or props.
              <br />
              <ul>
                <li>shouldComponentUpdate()</li>
                <li>render()</li>
                <li>componentDidUpdate()</li>
              </ul>
              <br />

              <b>shouldComponentUpdate: </b>
              In the shouldComponentUpdate() we can return a Boolean value that specifies whether
              React should continue with the rendering or not.
              <br />
              <b>The default value is true.</b>
              <br />
              <br />

              <b>render:</b>
              Method is called when a component gets updated, it has to re-render
              the HTML to the DOM, with the new changes.
              <br />
              <br />

              <b>componentDidUpdate: </b>
              The componentDidUpdate method is called after the component is updated in the DOM.
              <br />
              <br />
              <b>Unmounting: </b>
              componentWillUnmount:
              <br />
              This method is called when the component is about to be removed from the
              DOM.
              <br />
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any
                child component. </p>
              <ul>
                <li>b. componentDidCatch</li>
              </ul>
              <br />

              <h3>20. Event</h3>
              <p>
                In React, events are the triggered reactions to specific actions like mouse hover, mouse click, key press, etc.
              </p>
              <ul>
                <li>1. Events are passed as functions instead of strings. </li>
                <li>
                  2. The event argument contains a set of properties, which are specific to an event. Each event type contains its own
                  properties and behavior which can be accessed via its event handler only.
                </li>
              </ul>
              <br />

              <h3>21. What are synthetic events in React?</h3>
              <p>
                Synthetic events are the objects which act as a cross-browser wrapper around the browser’s native event. They combine
                the behavior of different browsers into one API. This is done to make sure that the events show consistent properties
                across different browsers.
              </p>
              <b>Ex. </b>preventDefault
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroRectJs));
