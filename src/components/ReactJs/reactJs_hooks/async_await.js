import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const multiple = `
const App = () => {
  const [mockdata, setMockdata] = useState([]);
  const [mockdata2, setMockdata2] = useState([]);

  const getMockdata = axios.get("https://jsonplaceholder.typicode.com/users");

  const getMockdata2 = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
  };

  useEffect(() => {
    Promise.all([getMockdata, getMockdata2()]).then((res) => {
      setMockdata(res[0].data);
      setMockdata2(res[1].data);
    });
  }, []);

  return (
    <div>
      <h1>Data One</h1>
      <ul>
        {mockdata.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h1>Data Two</h1>
      <ul>
        {mockdata2.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}; 
`.trim();

const getLists = `
const App = () => {
  const [mocks, setMocks] = useState([]);
  const [user, setUser] = useState('');

  const handleApi = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    setMocks(res.data)
  }

  useEffect(()=>{
    handleApi();
  },[])

  const filterdata = mocks.filter(item => (
      item.name.toLowerCase().includes(user.toLowerCase()))
    );

  return (
    <div>
      <input type="text" name="user" value={user} onChange={(e)=>setUser(e.target.value)} />
     {filterdata.map(items=>(
      <li>{items.name}</li>
     ))}
    </div>
  );
};`.trim();

const steps = `
const App = () => {
  const [step, setStep] = useState(0);

  return (
    <div>
      <input type="number" value={step} min="0" max="10" step="2" onChange={(e) => setStep(e.target.value)} />
    </div>
  );
};
`.trim();

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

const minMaxs = `
const App = () => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const handleMinDateChange = (e) => {
    const selectedDate = e.target.value;
    setMinDate(selectedDate);
    if (maxDate < selectedDate) {
      setMaxDate("");
    }
  };

  const handleMaxDateChange = (e) => {
    const selectedDate = e.target.value;
    setMaxDate(selectedDate);
  };

  return (
    <div>
      Minimum Date: <input type="date" id="minDate" value={minDate} onChange={handleMinDateChange} />
      Maximum Date: <input type="date" id="maxDate" value={maxDate} min={minDate} onChange={handleMaxDateChange} />
    </div>
  );
};
`.trim();

class AsyncAwait extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
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
              <br />

              <h3>1. Min-Max date</h3>
              <div style={titles}>
                <PrismCode
                  code={minMaxs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>
                3. Recived data from two different APIS in one function to
                multiple calls.
              </h3>
              <div style={titles}>
                <PrismCode
                  code={multiple}
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
    );
  }
}

export default withStyles(styles)(AsyncAwait);
