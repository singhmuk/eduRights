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

const App = `
const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = filteredData.filter((data) => {
      return data.title.search(value) != -1;
    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(response => {
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div>
      <input type="text" onChange={(event) => handleSearch(event)} />
      {filteredData.map((items) => (
        <li>{items.title}</li>
      ))}
    </div>
  )
}`.trim();

const multiple = `
const App = () => {
  const [playerName, setPlayerName]=useState([]);
  const [playerPic, setPlayerPic]=useState([]);
 
  const getData = () => {
   const playerAPI = "https://www.balldontlie.io/api/v1/players/237";
   const PlayerPic = "https://nba-players.herokuapp.com/players/james/lebron";
 
   const getPlayerApi = axios.get(playerAPI);
   const getPlayerPic = axios.get(PlayerPic);
 
   axios.all([getPlayerApi, getPlayerPic])
         .then(axios.spread((...allData) => {
           const allDataPlayer = allData[0].data.first_name
           const getNbaPlayerPic = allData[1].config.url;
 
           setPlayerName(allDataPlayer);
           setPlayerPic(getNbaPlayerPic);
         }))
  }
 
 useEffect(()=>{
   getData();
 },[])
 
  return(
   <div>
     Player name: {playerName}
     <img src={playerPic} /> 
   </div>
  )
 }`.trim();

const Uncontroll = `
const App = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(data=>setEmployee(data))
  },[])

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();

    let result = [];
    result = employee.filter(data=>{
      return data.title.search(value) !=-1;
    });
setEmployee(result);
  }

  return(
    <div>
      <input type="text" onChange={e=>handleSearch(e)} />
      {employee.map(val=>(
        <li key={val.id}>{val.title}</li>
      ))}
    </div>
  )
}`.trim();

const sideMenus = `
//App.js
const navLinks = [
  { url: '/about-us', name: 'About Us' },
  { url: '/projects', name: 'Projects' },
  { url: '/services', name: 'Services' },
  { url: '/contact-us', name: 'Contact Us' },
];

class App extends React.Component {  
    state = {
      style:"menu",
      menuStatus:"open"
    };

  handleClick = () => {
    switch(this.state.menuStatus) {
      case "open":
        this.setState({
          menuStatus:"close",
          style:"menu active"
        });
        break;
      case "close":
        this.setState({
          menuStatus:"open",
          style:"menu"
        });
        break;
    }        
  }

  render() {
    return (      
      <div>
        <button onClick={this.handleClick}>menu</button>
        <div className={this.state.style}>               
            {navLinks.map(({ url, name }) => (
              <li>
                <a href={url}>{name}</a>
              </li>
            ))}
        </div>
      </div>
    );
  }
}



//index.css
.menu {
  background: #34495e;
  height: 100vh;
  width: 250px;
  opacity:0; 
  transition: all 0.25s ease;
}

  a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 20px;
  }

.active {
  opacity:1;
  visibility: visible;
  transition: all 0.25s ease;
  transform: translateX(0);
}`.trim();

const mouseHovers = `
const App = () => {
  const [isHovering, setHovering] = useState(false);

  const handleMouseHover = () => {
    setHovering(isHovering => !isHovering);
  }

  return (
    <div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
      >
        Hover Me
      </div>
      {isHovering && <div>Hovering right me</div>}
    </div>
  );
}`.trim();

const ssr = `
1. ReactDOM.render(<App />, document.getElementById('root'));

 replace with 
 
ReactDOM.hydrate(<App />, document.getElementById('root'));


2. npm install express
   npm install @babel/register @babel/preset-env @babel/preset-react ignore-styles
  
3. Let’s create an entry point in server/index.js:
require('ignore-styles')

require('@babel/register')({
 ignore: [/(node_modules)/],
 presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server')
   
4. Make Build and run with node
    npm run build
    node server/index.js
 
    
//App.js
function App() {
  return (
    <div>
      <h1>Server Side Rendering.</h1>
    </div>
  );
}


//server/server.js
import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom';

import App from '../src/App'

const PORT = 8080
const app = express()

const router = express.Router()


app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
      // <StaticRouter location={req.url} context={context}>
        <App />
      // </StaticRouter>
    );
  
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', '<div id="root">'$'{app}</div>')
      );
    });
  });


  
router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

// tell the app to use the above rules
app.use(router)

app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(SSR running on port '$'{PORT})
})


//index.js
require('ignore-styles')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server')
`.trim();

const getLists = `
const App =() => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  return(
    <div>
      {users.map(vals=>(
        <li key={vals.id}>{vals.id}</li>
      ))}
    </div>
  )
}`.trim();


class AsyncAwait extends Component {
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
              <h3>Get Lists</h3>
              <div style={titles}>
                <PrismCode
                  code={getLists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>1. Async-Await</h3>
              <div style={titles}>
                <PrismCode
                  code={App}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br/>

              <h3>2. Recived data from two different APIS in one function to multiple calls.</h3>
              <div style={titles}>
                <PrismCode
                  code={multiple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>2. Search items</h3>
              <div style={titles}>
                <PrismCode
                  code={Uncontroll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Side Menu</h3>
              <div style={titles}>
                <PrismCode
                  code={sideMenus}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Mouse Hover on Card</h3>
              <div style={titles}>
                <PrismCode
                  code={mouseHovers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. SSR</h3>
              <div style={titles}>
                <PrismCode
                  code={ssr}
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

export default (withStyles(styles)(AsyncAwait));
