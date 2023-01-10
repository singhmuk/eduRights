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
  const [mockdata, setMockdata] = useState([]);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];

    result = mockdata.filter((data) => {
      return data.title.search(value) != -1;
    });
    setMockdata(result);
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(res => {
        setMockdata(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div>
      <input type="text" onChange={(event) => handleSearch(event)} />
      {mockdata.map((items) => (
        <li>{items.title}</li>
      ))}
    </div>
  )
}
`.trim();

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

const MoveButton = `
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
}

export default App;`.trim();

const steps = `
class App extends Component {
   state = { inputValue: "" };
 
 handleUpdate = (e) => {
   if (e.target.validity.valid) {
     this.setState({ inputValue: e.target.value }); 
   }
 }
 
 reset = () => {
   this.setState({ inputValue: "" }); 
 }
 
 render() {
   return (
     <div>
       <input type="number" value={this.state.inputValue} onChange={this.handleUpdate} step="any" />
       <button onClick={this.reset}>reset</button>
     </div>
   )
 }  
 }`.trim();

const dateTime = `
 //1
 function date_time() {
   return Date();
 }
 
 //2
 function formatDate(dayOfWeek, day, month, year) {
   var daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
   var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
       return daysOfWeek[dayOfWeek] + " " + months[month] + " " + day + " " + year; }
 
   var birthday = new Date(Date.UTC(2000,0,1)); 
   var birthDay = formatDate(birthday.getUTCDay(), birthday.getUTCDate(),     
   birthday.getUTCMonth(), birthday.getUTCFullYear())
 
 
 export { date_time, birthDay }`.trim();


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
              <h3>1. Get Lists</h3>
              <div style={titles}>
                <PrismCode
                  code={getLists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Async-Await</h3>
              <div style={titles}>
                <PrismCode
                  code={App}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Recived data from two different APIS in one function to multiple calls.</h3>
              <div style={titles}>
                <PrismCode
                  code={multiple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Search items</h3>
              <div style={titles}>
                <PrismCode
                  code={Uncontroll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Mouse Hover on Card</h3>
              <div style={titles}>
                <PrismCode
                  code={mouseHovers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6.onClick move button</h3>
              <div style={titles}>
                <PrismCode
                  code={MoveButton}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Step Input</h3>
              <div style={titles}>
                <PrismCode
                  code={steps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              
              <h3>8. Date_time</h3>
              <div style={titles}>
                <PrismCode
                  code={dateTime}
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
