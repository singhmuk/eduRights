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
//Counter.js
import React, { useState, useMemo } from 'react'

function Counter() {
    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1)
        }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1)
        }

    // const isEven = () => {
    //     let i = 0
    //     while (i < 2000000000) i++
    //         return counterOne % 2 === 0
    //         }

    const isEven = useMemo(() => {
      console.log('call in button one')
      let i = 0
      while (i < 2000000000) i++
          return counterOne % 2 === 0
        }, [counterOne])

    return (
      <div>
        <div>
          <button onClick={incrementOne}>Count One - {counterOne}</button>
            <span>{isEven ? 'Even' : 'Odd'}</span>
            </div>
            <div>
          <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
        </div>
      </div>
    )
}

export default Counter;
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

const refsReact = `
const App = () => {
  const [count, setCount]=useState([]);
  const inputRef = useRef()

    const handleCount = () => {
      setCount(count+1) 
    }

    const handleRef = () => {
      console.log(inputRef.current)
    }

  return (
    <>
        useState<br/>
        <input type="number" value={count} onChange={(e)=>setCount(e.target.value)} />
        <br/>
        useRef<br/>
        <input type="number" ref={inputRef} value={count} onChange={(e)=>setCount(e.target.value)} /><br/>
        {count}<br/>
        <button onClick={handleCount}>State</button>
        <button onClick={handleRef}>Ref</button>
    </>
  );
};
`.trim();

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

const useReducers2 = `
import React, { useReducer, useRef } from 'react'

const App = () => {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      case "remove":
        return state.filter((_, index) => index != action.index);
      default:
        return state;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => dispatch({ type: "remove", index })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}`.trim();

const useReducersCase = `
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggleShowText" });
        }}
      >
        Click Here
      </button>

      {state.showText && <p>This is a text</p>}
    </div>
  );
};`.trim();


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
                <li>The useRef Hook allows you to persist values between renders.</li>
                <li>It can be used to store a mutable value that does not cause a re-render when updated.</li>
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
              <b>2. useReducer 2</b>
              <div style={titles}>
                <PrismCode
                  code={useReducers2}
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
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(CustomHooks));
