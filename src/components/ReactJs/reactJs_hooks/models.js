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

const modal = `
import Previews from "./previews"

const App = () => {
  const [data, setData] = useState([{
    "id": 1,
    "letter": "J",
    "image": '/images/d1.jpg',
    "barColor": "#28a745",
    "percentage": 50,
    "text": "Live"
  }])

  return (
    <div>
      {data.map((value) => (
        <div>
          {value.text}
          {value.name}
          <div>
            {value.percentage < 70 && <Previews data={value} />}
          </div>
        </div>
      ))}
    </div>
  );
}


//previews.js
import Popup from "reactjs-popup"

const Previews = (props) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(open => !open);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>btn</button>

      <Popup open={open} onClose={handleClickOpen} >
        <div>{props.data.text}</div>
        <div>{props.data.exame}</div>
        <div>{props.data.barColor}</div>
        <div>{props.data.percentage}</div>
      </Popup>
    </div>
  );
}
`.trim();


const childData = `
class App extends Component {
  state={ourData:''}
  
  changeText = (myData) => {
    this.setState({ourData:myData});
  }
  render(){
    return(
      <div>
        {this.state.ourData}
        <First refer = {this.changeText} />
      </div>
    )
  }
}


// first.js
class First extends Component {
  state={data:'first'}
   
   changeText = () => {
     var myData = this.state.data;
     this.props.refer(myData)
   }
   render(){
     return(
       <div>
         <button onClick = {()=>this.changeText()} >Click</button> 
       </div>
     )
   }
 }`.trim();


const download = `
   import {CSVLink, CSVDownload} from 'react-csv';
   import axios from 'axios';

   class CsvFile extends Component {
      state={
         mockData:[]
      }
      
      
     componentDidMount(){
      let url="https://jsonplaceholder.typicode.com/users";
      axios.get(url)
           .then(res => {
              const mockData= res.data
              this.setState({ mockData })
              console.log('ssssssss',res.data)
          })
     }
      
      render(){
         var csvData = this.state.mockData.map(value=>{
            let obj = {};
                obj.name = value.name;
                obj.address = value.address.street;
                
            return obj; 
        })
      return(
         <div>
            <p>Async Await</p>
            {this.state.mockData.map((items) => (
               <li key={items.id}>{items.name}</li>
            ))}
            <CSVLink data={csvData} >Download csv</CSVLink>
         </div>
       )
      }
   }

export default CsvFile;`.trim();

const routers = `
 // 1. Not Found 404
 <Router>
  <Switch>
  <Route exact path = "/" component={Home} />
  <Route exact path = "/*" component={Error} />
  </Switch>
  <Route exact path = "/history/:name/:address" component={History} />
</Router>


// 2.Url value display on UI
function History({match}) {
   return (
     <div>
       <p>History {match.params.name}</p>
     </div>
   )
 }
 
 export default History;
 
 
 // 3.Url value display on UI with hooks
 function History() {
   const { name, address } = useParams();
   return (
     <div>
       <p>History {name}-{address}</p>
     </div>
   )
 }
 
 export default History;
 
 
 //4. History Push
 function History({match}) {
   return (
     <div>
       <p>History {match.params.name}</p>
     </div>
   )
 }
 
 export default History;`.trim();


const protecteds = `
 // auth.js
 class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();


// LandingPage.js
import auth from "./auth";

const LandingPage = props => {
  return (
    <div>
      <h1>Landing Page</h1>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/app");
          });
        }}
      >
        Login
      </button>
    </div>
  );
};


export default LandingPage;


// ProtectedRoute.js
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


export default ProtectedRoute;


//App.js
import auth from "./auth";

export const App = props => {
  return (
    <div>
      <h1>App Layout</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};


export default App;


// index.js
import { App } from './App';
import LandingPage from "./landing_page.js";
import ProtectedRoute from "./protected_route";

import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/App" component={App} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);`.trim();

const loading = `
class App extends Component {
  state = {
          isLoading: false, 
          data: '', 
          mockData: [],
        }

      handleData() {
        axios.get("https://jsonplaceholder.typicode.com/users")
         .then(res => {
            const mockData= res.data
            this.setState({ mockData })
        })
    }

  handleSubmit = () => {
      axios.get("https://jsonplaceholder.typicode.com/users")
       .then(data => this.setState({ data: data }, () => {
            this.handleData()
          }))
          .then(() => this.setState({ isLoading: false }));
  }

  render() {
    let mockData = "Loding";
    if (!this.state.isLoading && this.state.mockData) {
       mockData = (
         <div>
           {this.state.mockData.map(val => (
             <li>{val.id}</li>
           ))}
           <button type="button" onClick={this.handleSubmit}>Click Me!</button>
           </div>
       )
    }
      return (
          <>{mockData}</>
      )
  }
}`.trim();



class Models extends Component {
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
              <h3>1. Modal</h3>
              <div style={titles}>
                <PrismCode
                  code={modal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Call Child Data</h3>
              Snario in which we call state from child to parrent component.<br />
              <i>Here App.js is parent class, and child component (First.js) have state data that we call in App component.</i>
              <div style={titles}>
                <PrismCode
                  code={childData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Download CSV File</h3>
              <div style={titles}>
                <PrismCode
                  code={download}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>4. Loading icon on api fatch</h3>
              <div style={titles}>
                <PrismCode
                  code={loading}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>5. Router</h3>
              <div style={titles}>
                <PrismCode
                  code={routers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. Protected Routes</h3>
              <div style={titles}>
                <PrismCode
                  code={protecteds}
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

export default (withStyles(styles)(Models));