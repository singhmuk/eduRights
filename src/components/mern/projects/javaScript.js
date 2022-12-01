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


const item = `
// Create Schema
const ItemSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  date: {type: Date, default: Date.now},
  
  address: [{
    street: {type: String, required: true},
    suite: {type: String, required: true},
    city: {type: String, required: true},
    zipcode: {type: Number, required: true},
    
    geo: [{
      lat: {type: Number },
      lng: {type: Number }
    }]
  }],
  
  phone: {type: Number, required: true},
  website: {type: String },
  company: [{
    name: {type: String, required: true},
    catchPhrase: {type: String, required: true},
    bs: {type: String, required: true},
  }],
  
  Phone_Numbers: [{
    Home_Phone: { type: Number },
    Work_Phone: { type: Number },
    Cell_Phone: { type: Number },
    
    Phone_verified: [{ 
      Home: { type: Boolean },
      Work: { type: Boolean },
      Cell: { type: Boolean }
                  }],
              }],
});

module.exports = Item = mongoose.model('item', ItemSchema);
`.trim();

const routesItem = `
const Item = require('../models/item');

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => { 
      res.json(items);
    console.log('dddddd',items)
    }) 
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    geo: req.body.geo,
    phone: req.body.phone,
    website: req.body.website,
    company: req.body.company,
    Phone_Numbers: req.body.Phone_Numbers,
    Phone_verified: req.body.Phone_verified,
  });

  newItem.save().then(item => res.json(item));
});

router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {
    name:req.body.name,
  }, {new: true}).then(data => {res.send(data)})
})

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


//postman
{ 
   "name": "Leanne Graham",
    "username":"Bret",
    "email":"Sincere@gmail.com",
    "address":[{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"929980"}],
    "geo":[{"lat":"-37.3159","lng":"81.1496"}],
    "phone":"1234567890",
    "website":"hildegard.org",
    "company":[{"name":"Romaguera-Crona", "catchPhrase":"Multi-layered client-server neural-net",
                "bs":"harness real-time e-markets"}],
    "Phone_Numbers":[{"Home_Phone":"123","Work_Phone":"456","Cell_Phone":"7890"}],
    "Phone_verified":[{"Home":"true","Work":"true","Cell":"true"}]
}
`.trim();

const logic = `
const Logic = () => {
  const [ mockData, setmockData ] = useState([])
  const [ mainId ] = useState('5fdb0a046ef19d3384a42f69')
  const [ subParameters ] = useState([])
  const [ city ] = useState('South Christy')
  const [ matchingData ] = useState([])
  const [ name ] = useState('Clementina DuBuque')
  var [ tempObj ] = useState([])
  var [ sum ] = useState(0)
  var [ avg ] = useState(0)
  var [ arrayMet, setArrayMet ] = useState([])

useEffect(() => {
  axios.get("/item")
  .then(res => {
     var mockData= res.data
     setmockData(res.data)
  
  for(var i = 0; i < mockData.length; i++){
      // console.log('api data in the loop',mockData[i])
      if(mainId === mockData[i]._id){
          // console.log('only match id',mockData[i]._id)
          
          mockData.map(val => {
              if(city.indexOf(val.name)===-1){
                  // console.log('only unique user city',val.address)
                  val.address.map(valCity => {
                      subParameters.push(valCity.city)
                      // console.log('Push city name in subParameters',subParameters)
                      
                      let newObj={"id":val._id, "name":val.name,'value':[]}
                      newObj = newObj.value.push(valCity.city)
                      // console.log('Push city name in new created object',newObj)
                      
                      var index=subParameters.indexOf(valCity._id)
                      // console.log('index value',index,":",valCity._id)
                      
                      // subParameters[index].value = subParameters[index].concat(valCity._id)
                      // console.log('index value',subParameters[index].value)
                      
                      if((valCity._id === mainId || valCity._id === mockData._id)){
                          // console.log('matching hard coded value: ',valCity._id,"=",mockData._ids,":",mainId);
                          matchingData=matchingData.concat(valCity._id);
                          // console.log('matching values: ',matchingData)
                      }
                  })
              }
              else{
                  var index=subParameters.indexOf(val.phone)
                  subParameters[index].value = subParameters[index].value.concat(val.id)
                  // console.log('else values: ',subParameters)
                  }
              })
          }
      }
 })
//    console.log('concate city names in the array',subParameters)
  addData();
  pickRecord();
  SumAverage();
  extractKey();
  arrayMethod();
},[])


//Add data in empty array from api values
const addData = () => {
  axios.get("/item")
  .then(res => {
     var mockData= res.data
     setmockData(res.data)
  mockData.map(add => {
      mockData.push(add.name)
      
      if(add.name === name){
          for(let i=0; i<=mockData.length; i++){
              // console.log('Matched name',add.name)
          }
      }
    })
  })  
}


//Pick a record from list
const pickRecord = () => {
  axios.get("/item")
  .then(res => {
     var mockData= res.data
     setmockData(res.data)
     mockData.map(pickRec => {
      if(pickRec._id === mainId){
          mockData.push(pickRec.email);
      }
      
  // apiId = mockData.push(pickRec);
  if(pickRec.name === name){
      for(let i=0; i<=mockData[i].length; i++){
         let obj = [];
         obj.push(mockData.name)
          console.log('matching values',obj)
          }
      }
     })
  })
}


//Add sum/avg of number from a list
const SumAverage = () => {
  axios.get("/item")
  .then(res => {
     var mockData= res.data
     setmockData(res.data)
     
     mockData.map(fields => {
      tempObj.push(fields._id) 
     })
     for(let i =0; i<=tempObj.length;i++){
      sum +=tempObj[i];
      avg = sum/tempObj.length
      // console.log('sum',sum)
      }
  })
  
  //Flattening an array of arrays
  const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  let flat = nested.reduce((acc, it) => [...acc, ...it], []);
  let sumOfArray = flat.reduce((a, b) => a+b)
}


//Extract key/value pair from an object
const extractKey = () => {
  var data = 
         [
          {label:1, quater :'Q1', y:34},
          {label:2, quater:'Q1', y:20},
          {label:3, quater:'Q1', y:30},
   
          {label:1, quater:'Q2', y:77},
          {label:2, quater:'Q2', y:52},
          {label:3, quater:'Q2', y:3},
   
          {label:1, quater:'Q3', y:65},
          {label:2, quater:'Q3', y:12},
          {label:3, quater:'Q3', y:9},
   
          {label:1, quater:'Q4', y:77},
          {label:2, quater:'Q4', y:34},
          {label:3, quater:'Q4', y:5}
         ];
         
 var quartersum = {}
 data.map(function(entry) {
   quartersum[entry.label] = (quartersum[entry.label]||0) + entry.y
 })
 
 data.map(function(entry) {
   entry.percent = entry.y / quartersum[entry.label] * 100;
  //  console.log(JSON.stringify(entry))
 })
 
 
    for(let [key, value] of Object.entries(quartersum)){
         console.log('extract object property',key, value);
    }
    var percentage = parseInt((sum * 100/quartersum.length));
     console.log('percentage',percentage);
}


//Array methods
const arrayMethod = () => {
  axios.get("/item")
  .then(res => {
     var arrayMeth= res.data
     setArrayMet(res.data)
     
     arrayMeth.map(data => {
      arrayMet.push(data._id)
     })
     
     let scores = arrayMet.find(element => element > 4);
     let filterScores = arrayMet.filter(element => element > 4);
     let joinArr = filterScores.join("*");
     let spliceArr = filterScores.splice(0,2)
     let concatArr = filterScores.concat(scores,joinArr,"100");
     
  
     //The slice() method slices out a piece of an array into a new array.
     let sliceArr = filterScores.slice(0,2);
     let toStringArr = arrayMet.toString()
     let position = filterScores.indexOf(8)
     
     
     //The includes() method determines whether an array contains a specified element.
     let includeArr = filterScores.includes(10)
  //    console.log('find',includeArr)
  })
}

    return(
        <div>
            {mockData.map((data,i) => (
                <li key={i}>{data.name}
                </li>
            ))}
        </div>
    )
}

export default Logic;
`.trim();

const Logic_2 = `
const Logic_2 = () => {
  const [ mockData, setmockData ] = useState([]);
  const [ mockData2 ] = useState(["Glenna Reicher", "Kurtis Weissnat", "Ervin Howell","Leanne Graham"]);
  const [ commonElements ] = useState([]);
  var [ str ] = useState('');
  var [ str2 ] = useState('');
  var [ dict ] = useState({});
  var [ obj ] = useState({});
  var [ objKey ] = useState([]);
  var [ arr ] = useState([]);
  var [ personEmail ] = useState([]);

useEffect(() => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
  
     person.map(val => {
       mockData.push(val.name)
     })
     
     var common = mockData.filter(item=>{
      return mockData2.includes(item)
  })
  for(var i=0; i<=common.length; i++){
    commonElements.push(common[i])
    }
 })
 
 commChar();
 arrToObj();
 objTOArr();
 allSum();
 displayDot();
 matchName();
},[])


//Common element in strings
const commChar = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
  
     person.map(val => {
      str=val.name;
      str2=val.username;
       })
       
       for(var i=0; i < str.length; i++) {
        dict[str.charAt(i)] = 1;
      }
      // console.log('str',dict);
      
      var commonChars =[];
    for(var i=0; i < str2.length; i++) {
      if( dict[str2.charAt(i)] == 1) {
        commonChars.push(str2.charAt(i)); // this is optional we can simply print
      }
      // console.log('str2',commonChars);  

    }
    
    dict = commonChars.join(""); 
     })
}


//convert an Array to Object
const arrToObj = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
  })
}


//convert an Object to Array
const objTOArr = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
     
     person.map(val => {
      obj=val
     })
     
     //Convert the keys to Array using - Object.keys()
     objKey = Object.keys(obj)

     //Converts the Values to Array using - Object.values()
     const objVal = Object.values(obj)

     //Converts both keys and values using - Object.entries()
     const objAll = Object.entries(obj)
    //  console.log('objAll',objAll)
  })
}


//Sum of all elements of a given array
const allSum = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
     
     person.map(val=>{
      arr.push(val._id);
  })
  var sum = arr.reduce((a, i) => {
    return a + i;
    });
  })
}


//Dispay dot value  
const displayDot = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
     
     person.map(val=>{
      personEmail.push(val.email);
    })
  })
}


//Last match name
const matchName = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
     
     const mockData = [];
     const names = [];
     const apiId = '5fdb0a616ef19d3384a42f75';
     person.map(val=>{
      mockData.push(val._id);
      
      if(val._id == apiId){
        names.push(val.name)
        for(let i=0; i<=names.length; i++){
          }
       }
    })
  })
}

    return(
        <div>
            {mockData.map((data,i) => (
                <li key={i}>{data.name}
                </li>
            ))}
        </div>
    )
}

export default Logic_2;
`.trim();

const Logic_3 = `
const Logic_3 = () => {
  var [ mockData, setmockData ] = useState([]);
  var [ num ] = useState();

useEffect(() => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
  
     person.map(val => {
       mockData.push(val._id)
       num = Number(mockData[0])
     })
   })
 
   arrayFun();
},[])


const arrayFun = () => {
  axios.get("/item")
  .then(res => {
     var person= res.data
     setmockData(res.data)
  
     person.map(val => {
       mockData.push(val._id)
     })

     const len = mockData.length;   
     const sorting = mockData.sort();
     const z = mockData[mockData.length - 1]
     const joins = mockData.join('*')
     const firstVal = mockData[0] = "cars"
     const deleteFirst = delete mockData[0];  
     const spliceArr = mockData.splice(2, 0, "Lemon", "Kiwi");
     const sliceArr = mockData.slice(1);
     
     console.log(len,'-',sorting,'-',z,'-',joins,'-',firstVal,'-',deleteFirst,'-',spliceArr,'-',sliceArr);
   })
}  

    return(
        <div>
            {mockData.map((data,i) => (
                <li key={i}>{data.name}
                </li>
            ))}
        </div>
    )
}

export default Logic_3;
`.trim();



class MernLoic extends Component {
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
              <h3>Logic</h3>
      model/item.js
      <div style={titles}>
                <PrismCode
                  code={item}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
      routes/item.js
      <div style={titles}>
                <PrismCode
                  code={routesItem}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Logic</h3>
              <div style={titles}>
                <PrismCode
                  code={logic}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Logic 2</h3>
              <div style={titles}>
                <PrismCode
                  code={Logic_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Logic 3</h3>
              <div style={titles}>
                <PrismCode
                  code={Logic_3}
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

export default (withStyles(styles)(MernLoic));
