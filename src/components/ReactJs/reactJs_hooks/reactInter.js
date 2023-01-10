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

 const refsReact = `
 Problem:
 this.setState({
   counter: this.state.counter + this.props.increment,
 });
 
 Answer:
 this.setState((state, props) => ({
   counter: state.counter + props.increment
 }));
 `.trim();
 
 const updateState = `
 Problem: Have a component that receives a prop that looks like this:
 const styles = {
   font: {
       size: {
           value: '22',
           unit: 'px'
       },
       weight: 'bold',
       color: '#663300',
       family: 'arial',
       align: 'center'
   }
 };
 
 How to update only the align property?
 
 Answer: 
 const { ...styling } = styles;
 const [style, setStyle] = useState(styling);
 ...
 
 setStyle(prevStyle => ({
       ...prevStyle,
       font: { ...prevStyle.font, align: event.target.value }
   }));
 
 
 `.trim();
 
 const conditionally = `
 var condition = true;
 
 var component = (
   <div
     value="foo"
     { ...( condition && { disabled: true } ) } />
 );
 `.trim();
 
 const useCallback = `
 const fn = () => 42 // assuming expensive calculation here
 const memoFn = useCallback(fn, [dep]) // (1)
 const memoFnReturn = useMemo(fn, [dep]) // (2)
 `.trim();
 
 const passProps = `
 class MyComponent extends React.Component {    
   constructor(props) {
       super(props)
 
       console.log(this.props)
   }
 }
 `.trim();
 
 const getLists = ``.trim();


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
              <h3>1. What does it mean for a component to be mounted in React?</h3>
              It has a corresponding element created in the DOM and is connected to that.
              <br/>

              <h3>2. What is the purpose of using super constructor with props argument in React?</h3>
              A child class constructor cannot make use of this reference until super() method has been called. The same 
              applies for ES6 sub-classes as well. The main reason of passing props parameter to super() call is to access 
              <b> this.props</b> in your child constructors.
              <br/>

              <h3>3. Does React useState Hook update immediately?</h3>
              React <b>useState and setState</b> don’t make changes directly to the state object. they create queues to optimize 
              performance, which is why the changes don’t update immediately. The process to update React state is asynchronous 
              for performance reasons.
              <br/>

              <h3>4. How can I make use of Error Boundaries in functional React components?</h3>
              <ul>
                <li>As of v16.2.0, there's no way to turn a functional component into an error boundary. The 
                  <b> componentDidCatch()</b> method works like a JavaScript <b>catch block</b>, but for components. Only class 
                  components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary 
                  component once and use it throughout your application.</li>
                <li>Also bear in mind that <b>try/catch</b> blocks won't work on all cases. If a component deep in the hierarchy 
                tries to update and fails, the try/catch block in one of the parents won't work -- because it isn't necessarily 
                updating together with the child.</li>
                <li>A few third party packages on npm implement error boundary hooks.</li>
              </ul>
              <br/>

              <h3>5. Why do class methods need to be bound to a class instance?</h3>
              In JavaScript, the value of this changes depending on the current context. Within React class component methods, 
              developers normally expect this to refer to the current instance of a component, so it is necessary to bind these 
              methods to the instance. Normally this is done in the constructor.
            
            <br/>

            <h3>6. React application Bundling.</h3>
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

            <h3>7. What were the techniques you applied to enhance the performance of the application?</h3>
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
            <br/>

            <h3>8. How do you tell React to build in Production mode and what will that do?</h3>
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

            <h3>9. When do you use useLayoutEffect?</h3>
            <p>when we need the browser to paint before the effect runs</p>
            <br />

            <h3>10. When using webpack, why would you need to use a loader?</h3>
            <p>To preprocess files</p>
            <br />

            <h3>11. What is sent to an Array.map() function?</h3>
            <p>A callback function that is called once for each element in the array</p>
            <br />

            <h3>12. Why is it a good idea to pass a function to setState instead of an object?</h3>
            <p>setState is asynchronous and might result in out of sync values.</p>
            <br />

            <h3>13. props Components & React.Children</h3>
              <div style={titles}>
                <PrismCode
                  code={propsComponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. React Children</h3>
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
              <br/>

              <h3>15. What's wrong with that code?</h3>
              <div style={titles}>
                <PrismCode
                  code={refsReact}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <i>Because <b>this.props</b> and <b>this.state</b> may be updated asynchronously, you should not rely on their 
              values for calculating the next state. To fix it, use a second form of <b>setState()</b> that accepts a 
              function rather than an object. That function will receive the previous state as the first argument, and 
              the props at the time the update is applied as the second argument</i>
              <br/>

              <h3>16. How do I update state on a nested object with useState()?</h3>
              <div style={titles}>
                <PrismCode
                  code={updateState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>We need to use spread syntax. Also while trying to update current state based on previous, use the callback pattern 
                  os setState:</i>
              <br/>

              <h3>17. How to conditionally add attributes to React components?</h3>
              For certain attributes, React is intelligent enough to omit the attribute if the value you pass to it is not truthy. 
              <br/>
              <b>Ex. </b>
              <div style={titles}>
                <PrismCode
                  code={conditionally}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>18. How would you go about investigating slow React application rendering?</h3>
              One of the most common issues in React applications is when components re-render unnecessarily. There are two 
              tools provided by React that are helpful in these situations:
              <ul>
                <li><b>React.memo(): </b>This prevents unnecessary re-rendering of function components.</li>
                <li><b>PureComponent: </b>This prevents unnecessary re-rendering of class components</li>
              </ul>
              <br/>
              Both of these tools rely on a shallow comparison of the props passed into the component—if the props have not 
              changed, then the component will not re-render. While both tools are very useful, the shallow comparison brings 
              with it an additional performance penalty, so both can have a negative performance impact if used incorrectly. 
              By using the React Profiler, performance can be measured before and after using these tools to ensure that 
              performance is actually improved by making a given change.
              <br/>

              <h3>19. What is wrong with this code?</h3>
              With <b>useCallback</b> we memoize functions, <b>useMemo</b> memoizes any computed value:
              <ul>
                <li>will return a memoized version of fn - same reference across multiple renders, as long as dep is the same. 
                  But every time you invoke memoFn, that complex computation starts again.</li><br/>
                <li>will invoke fn every time dep changes and remember its returned value (42 here), which is then stored in 
                  memoFnReturn.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={useCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>20. When is it important to pass props to super(), and why?</h3>
              The only one reason when one needs to pass props to <b>super()</b> is when you want to access <b>this.props</b> 
              in constructor:
              <div style={titles}>
                <PrismCode
                  code={passProps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Passing or not passing props to super has no effect on later uses of this.props outside constructor.</i>
              <br/>

              <h3>21. Why would you need to bind event handlers to this?</h3>
              In JavaScript, class methods are not bound by default. If forget to bind <b>this.someEventHandler</b> and pass it 
              to onChange, this will be undefined when the function is actually called.
              <br/>
              <br/>

              <b>22. Which feature can we use to cause a component to render only when its ID changes? </b>
              <p>shouldComponentUpdate</p>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ReactInter));
