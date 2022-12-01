import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
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



const authentication = `
class App extends Component {
  state={
    email:null,
    password:null,
    login:false,
    token:null,
  }
  
  componentDidMount(){
    this.storeCollector();
  }
  
  storeCollector(){
    let store = JSON.parse(localStorage.getItem('login'));
    this.setState({store:store})
    
    if(store && store.login){
      this.setItem({login:true})
    }
    console.log(store)
  }
  
  login = () => {
    console.log('form data', this.state);
    fetch('http://localhost:3000/api/login', {
      method:"POST",
      body:JSON.stringify(this.state)
    })
    .then((res) => {
      res.json().then((result) => {
        console.log(result);
        
        //to store token into local
        localStorage.setItem('login', JSON.stringify({
          login:true,
          token:result.token
        }))
        
        this.setState({login:true})
        this.storeCollector();
      })
    } )
  }
  
  post(){
    let token = 'Bearer' + this.state.store.token;
    console.log(token)
    
    console.log('form data', this.state.post);
    fetch('http://localhost:3000/api/login', {
      method:"POST",
      // To pass token
      headers:{'Authorization': token},
      body:JSON.stringify(this.state.pos)
    })
    .then((res) => {
      res.json().then((result) => {
        console.log(result);
        
        
      })
    })
  }
  
  render(){
  return (
    <div className="App">
     <h3>Jwt Token</h3>
     {!this.state.login ? 
     <div>
       <input type="text" onChange={(e) => {this.setState({email:e.target.value})}} /><br/>
     <input type="password" onChange={(e) => {this.setState({password:e.target.value})}} /><br/>
     <button onClick={this.login()}>Submit</button>
      </div>
      :
      <div>
        <textarea onChange={(e) => {this.setState={post:e.target.value}}}>
          
        </textarea>
        <button onClick={()=>{this.post()}}>post</button>
      </div>
      }
      </div>
  );
}
}`.trim();

const multi = `
import { Multiselect } from 'multiselect-react-dropdown';

function App() {
  const data = [
        {name: 'Srigar', id: 1},
        {name: 'Sam', id: 2},
        {name: 'Sam', id: 3},
        {name: 'Sam', id: 4},
        {name: 'Sam', id: 5}
      ]
              
  const [ options ] = useState(data);
  return (
    <div>
      <Multiselect
        options={options} 
        displayValue="name" 
        />
    </div>
  );
}`.trim();

const moveButton = `
const MoveButton = (props) => {
  return (
      <button onClick={props.onClick}>
          Click To Move
      </button>
  );
}

const BoxOne = () => <p>Box1</p>;

const BoxTwo = () => <p>Box2</p>;


class App extends Component {
state = { positions: 0 }

handleClick = () => {
  this.setState({ positions: (this.state.positions + 1) % 3 })
}

render () { 
const positions = this.state.positions;
  return (
      <div>
          { positions === 0 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxOne />
          { positions === 1 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxTwo />
          { positions === 2 ? <MoveButton onClick={this.handleClick}/> : ''}
      </div>
  );
}
}`.trim();


const navigations = `
import React,{useState, useCallback}  from "react";

function App() {
  const [selected, updateSelection] = useState('HOME'),
        onMenuClick = useCallback((page)=>{
            updateSelection(page);
        });
  return (
    <div className="layout-column justify-content-center align-items-center">
      <div className="layout-row justify-content-around align-items-center mt-20 links"
           data-testid="navigation-tabs">
          <a onClick={onMenuClick.bind(null, 'HOME')}>Home</a>
          <a onClick={onMenuClick.bind(null, 'NEWS')}>News</a>
          <a onClick={onMenuClick.bind(null, 'CONTACT')}>Contact</a>
          <a onClick={onMenuClick.bind(null, 'ABOUT')}>About</a>
      </div>

      <div className="card w-20 ma-0">
        <section className="card-text" data-testid="tab-content">
          <span>{selected} PAGE</span>
        </section>
      </div>
    </div>
  );
}`.trim();

const searchNum = `
import React, {useState, useCallback}  from "react";

function App() {
  const [movies, updateMovies] = useState([]),
        [year, updateYear] = useState(null),
        onSearch = useCallback(()=>{
          if(year){
            window.fetch('https://jsonmock.hackerrank.com/api/movies?Year='$'{year}').then((res)=> res.json())
            .then(({data})=>{
              updateMovies(data);
            });
          }
        }),
        onChange = useCallback((e)=>{
          updateYear(e.target.value);
        });

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input onChange={onChange} type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input"/>
        <button onClick={onSearch} className="" data-testid="submit-button">Search</button>
      </section>

      <ul className="mt-50 styled" data-testid="movieList">
  {movies.map(({Title}, index)=> <li key={index} className="slide-up-fade-in py-10">{Title}</li>)}
        
      </ul>

      {year && !movies.length && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>}
    </div>
  );
}`.trim();


class SSRendering extends Component {
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

              <h3>1. Jwt Authentication</h3>
              <div style={titles}>
                <PrismCode
                  code={authentication}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Multi_selects</h3>
              <div style={titles}>
                <PrismCode
                  code={multi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>3. onClick move button</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={moveButton}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>4. Tab Button</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={navigations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>5. Search year</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={searchNum}
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

export default (withStyles(styles)(SSRendering));
