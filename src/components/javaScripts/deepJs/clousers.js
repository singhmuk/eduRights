import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


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




const closersSet = `
function x(){
  for(var i=0; i<=5; i++){
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
`.trim();

const consoles = `
console.error('This is an error');
console.warn('This is warning');
console.dir(document);
console.table([{name:'Mukesh', eamail:'mukesh@gmail.com', age:27}]);
console.clear();`.trim();

const groups = `
console.group('start group');
console.log('one');
console.log('two');
console.log('three');
console.groupEnd('end group');
    
    
//Time
console.time('start time');
  for(let i=0; i<=10; i++){
    console.log(i);
  }
console.timeEnd('end loop');`.trim();

const applications = `
localStorage.setItem("name","Ritesh");
console.log(localStorage.getItem("name"));
localStorage.clear("name");

sessionStorage.setItem("name","Mukesh"); 
console.log(localStorage.getItem("name"));
console.clear("name");

document.cookie = "username=nitesh";
document.cookie;


//
var a = new Date();
a = new Date(a.getTime()+ 1*60*60*1*1);
document.cookie = 'name=mukesh; expires' +a.toGMTString()+';';
`.trim();

const dateObj = `
//1
function dateObj(){
  let time;
  time = new Date().toLocaleString();
  
  return time;
}


//2
5 numbers specify year, month, day, hour, and minute.
2 numbers specify year and month.

function dateObj() {
  let a,b, c
  a = Date()
  b = Date(2018, 11, 24, 10, 33, 30);
  c = Date(2018, 11);
  
  return [a,"---",b,"---",c];
}`.trim();

const current_time_data = `
var checkoutDate = new Date();
console.log(checkoutDate);

checkoutDate.setDate(checkoutDate.getDate() + 1);
console.log(checkoutDate);`.trim();


const Time_Zone = `
function formatDate(dayOfWeek, day, month, year) {
    var daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      return daysOfWeek[dayOfWeek] + " " + months [month] + " " + day + " " + year;
   }
   
  var birthday = new Date(Date.UTC(2000,0,1));
  console.log("Foo was born on: " + formatDate(
               birthday.getUTCDay(), birthday.getUTCDate(),
                birthday.getUTCMonth(), birthday.getUTCFullYear()));
 `.trim();

 const asyncAwait=`
const mockdata=[
  { name:'Krishana', address:'Gokul' },
  { name:'Ram', address:'Ayodaya' }]

  function getDatas(){
    setTimeout(()=>{
      let output="";
      mockdata.forEach((data, index) => (
      output += '<li>'$'{data.name}</li>'
      ))
    document.body.innerHTML = output;
    },1000);
  }

  function createData(obj){
    setTimeout(()=>{
      mockdata.push(obj)
    },2000)
  }

createData({name:'Payal', address:'Ranchi'})
getDatas();


//callback
const mockdata=[
  { name:'Krishana', address:'Gokul' },
  { name:'Ram', address:'Ayodaya' }]

  function getDatas(){
    setTimeout(()=>{
      let output="";
      mockdata.forEach((data, index) => (
      output += '<li>'$'{data.name}</li>'
      ))
      document.body.innerHTML = output;
    },1000);
  }

  function createData(obj, cb){
    setTimeout(()=>{
      mockdata.push(obj)
      cb()
    },2000)
  }

  createData({name:'Payal', address:'Ranchi'}, getDatas)


//Promise
const mockdata=[
  { name:'Krishana', address:'Gokul' },
  { name:'Ram', address:'Ayodaya' }]

  function getDatas(){
    setTimeout(()=>{
      let output="";
      mockdata.forEach((data, index) => (
        output += '<li>'$'{data.name}</li>'
      ))
      document.body.innerHTML = output;
    },1000);
  }

  function createData(obj){
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        mockdata.push(obj)
        let err=false;
          if(!err){
            resolve();
          }else{
          reject('Something wrong...')
        }
      },2000)
    })
  }

createData({name:'Payal', address:'Ranchi'}).then(getDatas);
createData({name:'Payal', address:'Ranchi'}).then(getDatas).catch(err=>console.log(err));


//Async-Await
const mockdata=[
  { name:'Krishana', address:'Gokul' },
  { name:'Ram', address:'Ayodaya' }]

  function getDatas(){
    setTimeout(()=>{
      let output="";
      mockdata.forEach((data, index) => (
        output += '<li>'$'{data.name}</li>'
      ))
        document.body.innerHTML = output;
    },1000);
  }

  function createData(obj){
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        mockdata.push(obj)
        let err=false;
        if(!err){
          resolve();
        }else{
        reject('Something wrong...')
        }
      },2000)
    })
  }


async function start(){
await createData({name:'Payal', address:'Ranchi'})
getDatas();
}

start()
`.trim();

class Clousers extends Component {
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
              <b>Closers + setTimeout</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={closersSet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Console</h3>
              <div style={titles}>
                <PrismCode
                  code={consoles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Group And Time</h3>
              <div style={titles}>
                <PrismCode
                  code={groups}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. LocalStorage</h3>
              <div style={titles}>
                <PrismCode
                  code={applications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Date Object</h3>
              <div style={titles}>
                <PrismCode
                  code={dateObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Current_time_data:</h3>
              <div style={titles}>
                <PrismCode
                  code={current_time_data}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>8. Time Zone</h3>
              <div style={titles}>
                <PrismCode
                  code={Time_Zone}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>1. Async-Await</h3>
              getDatas() excute and refrece in 1s, and after refrencing browser update getDatas() values. 
              while, createData() excute after 2s which excuite after page refreced so createData() values 
              not update in browser DOM. To solve this proble we can use.
              <ul>
                <li><b>callback: </b>getDatas() called when obj pushed into mockdata and called function as callback.</li>
                <li><b>promise: </b></li>
                <li><b>async-await: </b></li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={asyncAwait}
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

export default (withStyles(styles)(Clousers));
