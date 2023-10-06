import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';
import UseStates from '../../../assets/useState_useReducers.PNG'


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


const DocTitleOne = `
const App = () => {
  const [message, setMessage] = useState('Hello');
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setMessage('Updated Message');
  };

  const handleCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  console.log('ParentComponent re-rendered.');

  // Memoize the MessageComponent using useMemo
  const memoizedMessageComponent = useMemo(() => {
    return <MessageComponent message={message} count={count} />;
  }, [message, count]); // Add message and count as dependencies

  return (
    <div>
      {memoizedMessageComponent}
      <button onClick={handleButtonClick}>Message</button>
      <button onClick={handleCount}>Counts</button>
    </div>
  );
};


//
const MessageComponent = ({ message, count }) => {
  console.log('MessageComponent re-rendered.');

  return(
    <div>
      {message} - {count}
    </div>
  );
};
`.trim();

const customs = `
function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return data;
}

// import useFetch from "./useFetch";
function App(props) {
  const data = useFetch("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}`.trim();

const customsCount =`
const useCount = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return [count, handleClick];
};

function App() {
  const [count, handleClick] = useCount();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}`.trim();

const refsReact = `
const App = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}`.trim();

const useReducers = `
function App() {
  const [sum, dispatch] = useReducer((state, action) => {
    return state + action;
  }, 0);

  return (
    <>
      {sum}
      <button onClick={() => dispatch(1)}>Add</button>
    </>
  );
}`.trim();

const useReducersCase = `
const App = () => {
  const [count, dispatch] = useReducer((state, action)=>{
      switch(action.type){
        case 'inc':
          return state+1;
        case 'dec':
          return state-1;
        case 'reset':
          return state=0;
        default:
          return state;
      }
  },0);

  return(
    <div>
      {count}<br/>
      <button onClick={()=>dispatch({type:'inc'})}>Count</button>
      <button onClick={()=>dispatch({type:'dec'})}>Dec</button>
      <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
    </div>
  )
}

export default App;
`.trim();

const useReducersc = `
const App = () => {
  const [counts, setCounts] = useState(0);
  const [counts2, setCounts2] = useState(0);

  const handleSecond = () => {
    setCounts(counts + 2);
  };

  const handleCount = useCallback(() => {
    setCounts2((prevCount) => prevCount + 1);
  }, []);

  console.log('App');
  return (
    <div>
      {counts}<br/>
      <button onClick={handleSecond}>Count</button>
      <CountComp count={counts2} handleCount={handleCount} />
    </div>
  );
};


//
import { memo } from "react";

const CountComp = (props) => {
  console.log('Child')
  return (
    <div>
      {props.count}<br/>
      <button onClick={props.handleCount}>+</button>
    </div>
  )
}

export default memo(CountComp);
`.trim();

const usecall = `
const App = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}`.trim();


class CustomHooks extends Component {
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
              <h3>Step use to improves the performance of a react web application</h3>
              Improving the performance of a React web application involves various steps that aim to optimize rendering, reduce unnecessary work, and improve the overall user experience. 
              <br/>
              <ul>
                <li><b>Use React.memo or useMemo: </b>Employ React.memo for functional components and useMemo for memoizing expensive calculations and preventing unnecessary re-renders.</li><br/>
                <li><b>Key-based Lists: </b>When rendering lists, provide unique keys to list items. This helps React to efficiently update the DOM when elements are added, removed, or rearranged.</li><br/>
                <li><b>Avoid Rendering Unchanged Data: </b>Ensure that components rendering large datasets do not re-render if the data hasn't changed.</li><br/>
                <li><b>Use Event Delegation: </b>For handling events, consider using event delegation to avoid attaching listeners to individual elements.</li><br/>
                <li><b>Lazy Loading and Code Splitting: </b>Use dynamic imports and React.lazy to load components and resources only when needed, reducing the initial load time and improving performance.</li><br/>
                <li><b>Optimize Images: </b>Compress and resize images to reduce page loading time.</li><br/>
                <li><b>Use React Profiler: </b>Utilize React Profiler to identify performance bottlenecks and components causing excessive re-renders.</li><br/>
                <li><b>Use Webpack: </b>To optimize and bundle your application code for production.</li><br/>
                <li><b>Caching and Memoization: </b>Implement caching and memoization for expensive API calls and calculations to avoid redundant computations.</li><br/>
                <li><b>Use Production Builds: </b>Ensure that your application is running in production mode during deployment to benefit from React's production optimizations.</li><br/>
                <li><b>Reduce DOM Manipulation: </b>Minimize direct DOM manipulation and prefer manipulating state or props to trigger re-renders.</li><br/>
                <li><b>Use React DevTools: </b>Utilize React DevTools to inspect component hierarchies, re-renders, and performance profiles during development.</li><br/>
                <li><b>Use Performance Budgets: </b>Set performance budgets to track and manage your application's performance metrics.</li><br/>
                <li><b>Optimize Network Requests: </b> Minimize HTTP requests, leverage caching, and use HTTP/2 to optimize network performance.</li><br/>
                <li><b>Enable Gzip Compression: </b>Enable Gzip compression on the server to reduce the size of your assets when serving them over the network</li><br/>
              </ul>
              <br/>

            <h3>1. What are advantages of using React Hooks?</h3>
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

              <h3>2. Custom Hooks</h3>
              <p>
                Instead of HOCs and render props, we can encapsulate our logic in a React hook and then import that hook whenever
                we feel the need. In our example we can create a custom hooks for fetching data.
                A custom hook is a JavaScript function whose name starts with "use".
                     </p>
              <div style={titles}>
                <PrismCode
                  code={customs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <div style={titles}>
                <PrismCode
                  code={customsCount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Explain why and when would you use useMemo()?</h3>
              useMemo/ useCallback are use for performance optimization.<br/>
              In the lifecycle of a component, React re-renders the component when an update is made. When React checks for any 
              changes in a component, it may detect an unintended or unexpected change due to how JavaScript handles equality 
              and shallow comparisons. This change in the React application will cause it to re-render unnecessarily.
              <br/>
              <br/>
              useMemo takes in a function and an array of dependencies. The dependency’s list are the elements useMemo watches: 
              if there are no changes, the function result will stay the same. Otherwise, it will re-run the function. If they 
              don’t change, it doesn’t matter if our entire component re-renders, the function won’t re-run but instead return 
              the stored result.
              <div style={titles}>
                <PrismCode
                  code={DocTitleOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. useRef</h3>
              <ul>
                <li>allows you to store values that persist across renders. It can be used to keep track of data that you want to access or modify without causing the component to re-render.</li>
                <li>It can be used to access a DOM element directly.</li>
                <li>Refs are created using useRef() method and attached to React elements via the ref attribute.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={refsReact}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <img src={UseStates} alt="Omega" className="responsive" />

              <h3>5. useReducer</h3>
              <p>
                useReducer is another hook, convenient for dealing with more complex state changes in React components.
                A “reducer” is a fancy word for a function that takes 2 values and returns 1 value.
                reducer receives the current state and an action, and returns the new state.
              </p>
              <br />
              <div style={titles}>
                <PrismCode
                  code={useReducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>2. useReducer Case</b>
              <div style={titles}>
                <PrismCode
                  code={useReducersCase}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. useCallback</h3>
              The useCallback and useMemo Hooks are similar. The main difference
              is that useMemo returns a memoized value and useCallback returns a
              memoized function.
              <br/>
              <br/>
              The useCallback hook in React is used to optimize the performance of functional components by memoizing callback 
              functions. It is particularly useful in scenarios where the callback functions are passed as props to child 
              components.
              <br/>
              <br/>
              <b>why we use useCallback: </b>
              <ul>
                <li>Prevent unnecessary re-rendering.</li>
                <li>Memoize expensive computations: Sometimes, a callback function might involve heavy computations or calculations. 
                  By wrapping the function with useCallback, we can memoize the result, ensuring that the computation is only 
                  performed when the dependencies change. This helps avoid repeated expensive computations, improving performance.</li>
                <li>Maintain referential equality: When a callback function is passed as a prop to a child component, it's important 
                  to maintain referential equality to avoid unnecessary re-renders of the child component. </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={usecall}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <h3>Memo</h3>
              When play with value only than use memo and when retun function than useCallback.
              <br/>
              by using this way we prevent from rerendring todos componetn when click on handleCount.
              <div style={titles}>
                <PrismCode
                  code={useReducersc}
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

export default (withStyles(styles)(CustomHooks));
