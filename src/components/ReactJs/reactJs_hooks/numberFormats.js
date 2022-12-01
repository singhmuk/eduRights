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

const randoms = `
class App extends Component {
  state = {
      min: 1,
      max: 10,
      number: 1
    }

  componentDidMount() {
   this.setState({ number: this.generateNumber(this.state.min, this.state.max)})
  }
  
  minChange = (event) => {
    this.setState({ min: event.target.value})
  }
  
  maxChange = (event) => {
    this.setState({ max: event.target.value})
  }
  
  generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  getInputs = () => {
    if(this.state.min > this.state.max ){
      const minTemp = this.state.min
      const maxTemp = this.state.max
      this.setState({ 
        min: maxTemp,
        max: minTemp
      }, () =>
        this.setState({
          number: this.generateNumber(this.state.min, this.state.max)  
        })
      );
    } else {
      this.setState({
        number: this.generateNumber(this.state.min, this.state.max)  
      })
    }
  }
  
  render() {
    return (
      <div >
        <p>{ this.state.number }</p>
          <div id="inputs">
            <input type="number" min="-9999999999" max="9999999999" value={this.state.min} onChange={this.minChange} />
            <input type="number" min="-9999999999" max="9999999999" value={this.state.max} onChange={this.maxChange} />
            <input type="submit" value="Generate Number" onClick={ this.getInputs }/>
          </div>
      </div>
    );
  }
}`.trim();

const numberLib = `
import NumberFormat from 'react-number-format';

function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val;
    }
  
    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';
  
    } else if (val > max) {
        val = max;
      }
    }
  
    return val;
  }
  
  function cardExpiry(val) {
    let month = limit(val.substring(0, 2), '12');
    let date = limit(val.substring(2, 4), '31');
  
    return month + (date.length ? '/' + date : '');
  }
  
  class App extends Component {
    constructor() {
      super();
      this.state = {};
    }
    render(){
      return (
        <div>
              Prefix and thousand separator : Format currency in input
            <NumberFormat thousandSeparator={true} prefix={'$'} className="some" inputmode="numeric" />
          <br/>
              Custom thousand separator : Format currency in input
            <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} />
            <br/>
              Format with pattern : Format credit card in an input
            <NumberFormat format="#### #### #### ####" />
          
              Custom format method  : Format credit card expiry time
            <NumberFormat format={cardExpiry}/>
            <br/>
              Format phone number
            <NumberFormat format="+1 (###) ###-####" mask="_"/>
            <br/>
          <NumberFormat thousandSeparator={true} prefix={'$'} decimalScale={2} />
        </div>
      )
    }
  }`.trim();

const numberFor = `
class Currency extends Component {
  formatCurrency(x, decimalPlaces, decimalSeparator, groupSeparator) {
    var zeros = '00000000000';
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
    
    if(parts.length > 1) {
      parts[1] = parts[1] + zeros;
      parts[1] = parts[1].substring(0, decimalPlaces);
    } 
    else {
      parts[1] = zeros.substring(0, decimalPlaces);
    }
    return parts.join(decimalSeparator);
  }

  render() {
    var amount = this.props.amount;    
    var decimalPlaces = this.props.decimalPlaces;
    var currencyCode = this.props.currencyCode;
    var decimalSeparator = ',';
    var groupSeparator = ' ';
    
    if(currencyCode.match(/USD|GBP|THB/i) !== null) {
      decimalSeparator = '.';
      groupSeparator = ',';
    }
    var amountFormatted = this.formatCurrency(amount, decimalPlaces, decimalSeparator, groupSeparator);
    if(currencyCode !== '') {
      amountFormatted = amountFormatted + ' ' + currencyCode;
    } 
    return <span>{amountFormatted}</span>
  }
}


Currency.defaultProps = {
  amount: '0.00000000',
  currencyCode: '',
  decimalPlaces: 2
};


class App extends Component {
  render() {
    return <div>
      <p>
        <ul>
          <li>No amount: <Currency/></li>
          <li>Only amount: <Currency amount="1234.5"/></li>
          <li>With currencyCode: <Currency amount="1234" currencyCode="EUR"/></li>
          <li>Use decimalPlaces if other than the default 2: <Currency amount="1234" decimalPlaces="3"/></li>
          <li>USD/UK decimal and group separator: <Currency amount="1234" currencyCode="USD"/></li>
        </ul>
      </p>  
    </div>;
  }
}`.trim();

const converts = `
// func.js
export const toBinary = (number) => {
  let result = 0;
  let i = 0;


  while(number >= 1) {                                                  // dividing number by 2 until we reach 1 or below.
    let reminder = number % 2;
    if (reminder) {
 
                            //If the reminder is 1 we add it to the power of 10 to get the  place value. ie. 100, 1000 ... 
      result += Math.pow(10, i);
    }
    
    i++;
    number = Math.floor(number / 2);                                  //Reduce the number by dividing it by 2.
  }

  return result;
}


export const toDecimal = (number) => {
  let result = 0;
  let i = 0;

                                                  // Loop through the number by dividing it by 10 until we reach 0 or below.
  while(number > 0) {
    let reminder = number % 10;
    if (reminder) {
      result += Math.pow(2, i);                   //Get the last digit of the binary number and if it is 1,
    }                                             //then add it to the result by 2 to the power of the i.

    i++;
    number = Math.floor(number / 10);
  }
  return result;
}


// converts.js
import { toBinary, toDecimal } from './func';


const App = () => {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [binaryError, setBinaryError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const handleBinaryChange = (e) => {
    const binaryValue = e.target.value;
    setNumberError(false);
    if (isNaN(binaryValue)) {
      setNumberError(true);
      return;
    }
    
    setBinaryError(!/^[0-1]+$/g.test(binaryValue) && binaryValue !== '');
    if (binaryValue !== '') {
      setBinary(binaryValue);
      setDecimal(toDecimal(binaryValue));
    } else {
      setBinary('');
      setDecimal('');
    }
  };

  const handleDecimalChange = (e) => {
    const decimalValue = e.target.value;
    setNumberError(false);
    if (isNaN(decimalValue)) {
      setNumberError(true);
      return;
    }
    if (decimalValue !== '') {
      setDecimal(decimalValue);
      setBinary(toBinary(decimalValue));
    } else {
      setDecimal('');
      setBinary('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDecimal(toDecimal(binary));
  };

  let binaryErrorMessage = 'Enter only Binary value (either 0 or 1)';
  let numberErrorMessage = 'Enter only Numbers';

  return (
    <div className="converter">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Binary"
          onChange={handleBinaryChange}
          value={binary}
        />
        {/* <input type="submit" value="Convert" disabled={binaryError} /> */}
        <input type="text" placeholder="Decimal" onChange={handleDecimalChange} value={binaryError ? '' : decimal}
          disabled={binaryError}
        />
        <span className={error-msg '$'{binaryError || numberError ? 'fadeIn' : ''} }>
          {binaryError && binaryErrorMessage}
          {numberError && numberErrorMessage}
        </span>
      </form>
    </div>
  );
};
`.trim();

const pureComp = `
//1 form validation
const initialState = {
  name: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: '',
}

class App extends Component{
  state = initialState;
  
  handleChange = (e) => {
     const isCheched = e.target.type === "checkText";
     this.setState({
        [e.target.name]: isCheched ? e.target.checked : e.target.value
     })
  };
  
  validate = () => {
     let nameError = '';
     let emailError = '';
     let passwordError = '';
     
     if(!this.state.name){
        nameError = "Name Canot be blank";
     }
     
     if(!this.state.email.includes("@")){
        emailError = "Invalid email";
     }
     
     if(!this.state.password){
        passwordError = "Password not be too small";
     }
     
     if(emailError || nameError || passwordError){
        this.setState({emailError, nameError, passwordError})
        return false;
     }
     return true;
  }
  
  handleSubmit = (e) => {
     e.preventDefault();
     const isValid = this.validate();
     if(isValid){
     console.log(this.state);
     this.setState({initialState});
     }
  }
  
  render(){
     return(
        <>
           <form onSubmit={this.handleSubmit}>
              <input name="name" value={this.state.name} onChange={this.handleChange} />
              <div style={{color:'red'}}>{this.state.nameError}</div>
              <br/>
              <input name="email" value={this.state.email} onChange={this.handleChange} />
              <div style={{color:'red'}}>{this.state.emailError}</div>
              <br/>
              <input name="password" value={this.state.password} onChange={this.handleChange} />
              <div style={{color:'red'}}>{this.state.passwordError}</div>
              <br/>
              <br/>
              <button type="submit">Submit</button>
           </form>
        </>
     );
  }
}


//2 Verify on input
import validateInput from './validateInput';


class Props extends Component {
  state = {
      name: "",
      nameError: "",
      email: "",
      emailError: ""
      };

  handleInputChange = e => {
        let input = e.target;
        let errors = validateInput(input);
        this.setState({ ...this.state, [input.name]: input.value, ...errors });
    };

    onBlur = e => {
      let input = e.target;
      this.setState({ ...this.state, [input.name]: input.value });

      setTimeout(() => { 
          if (!input.contains(document.activeElement)) {
            let errors = validateInput(input); 
            this.setState({ ...this.state, ...errors });
          }
      }, 0);
  };

  handleSubmit = (e) => {
      e.preventDefault();

      console.log(e.target.name.value);
      let errors = validateInput(e.target.name, e.target.email); 
      this.setState({ ...this.state, ...errors }); 

      let nameError = this.state.nameError;
      let emailError = this.state.emailError;

      if (nameError !== "" || typeof nameError !== 'undefined'  || emailError !== "" || typeof emailError !== 'undefined')
       {}
  }

  render() {
      return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div> 
                <label htmlFor="name">Name</label>
                <p>{this.state.nameError}</p>
                <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} 
                  onBlur={this.onBlur} placeholder="bob" data-validation-type="name" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <p>{this.state.emailError}</p>
                <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} 
                  onBlur={this.onBlur} placeholder="bob@bobsplace.com" data-validation-type="email" required />
              </div>

                <p>Recieve notifications by (wip)</p>

                <label>
                    <input onChange={this.handleInputChange} name="notificationRadio" type="radio" value="email" />
                    Email
                </label>

                <label>
                    <input onChange={this.handleInputChange} name="notificationRadio" type="radio" value="text" />
                    Text
                </label>

                <button type="submit">Sumbit</button>

                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2"> <b>current state</b> </td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td> {this.state.name}</td>
                        </tr>
                        <tr>
                            <td>nameError</td>
                            <td> {this.state.nameError}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td> {this.state.email}</td>
                        </tr>
                        <tr>
                            <td>emailError</td>
                            <td> {this.state.emailError}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
          </div>
      );
  }
}


//validateInput.js
var emailRegex = /^S+@S+.S+$/;
var nameRegex = /^[a-zA-Z]/;
var mobileRegex = /^07[0-9]{9,10}$/;


function validateInput() {
    let errors = {};
    
    for (var i = 0 ; i < arguments.length ; i += 1) {       
        let input = arguments[i];
        let validationType = input.getAttribute("data-validation-type");
        if (validationType === null) validationType = input.type;
        let errorName = input.name + "Error";
        console.log("input validation attr:", input.getAttribute("data-validation-type"), "input.value:", input.value);

        errors[errorName] = "";

        if (input.value === "" || input.value.length === 0) {
            errors[errorName] = "please fill this in";
        } 
        else if (validationType === "name") {
            if (input.value.match(nameRegex) === null || input.value.length < 3) {
                errors[errorName] = "Name must be at least 3 characters";
            }
        } 
        else if (validationType === "email") {
            if (input.value.match(emailRegex) === null) {
                errors[errorName] = "Email must be a valid email";
            }
        }
    }

    return errors;
}`.trim();

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

class NumberForm extends Component {
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
              <h3>1. Random Number</h3>
              <div style={titles}>
                <PrismCode
                  code={randoms}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Number format</h3>
              <div style={titles}>
                <PrismCode
                  code={numberLib}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Number format without lib</h3>
              <div style={titles}>
                <PrismCode
                  code={numberFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. Convert Binary to Decimal</h3>
              <div style={titles}>
                <PrismCode
                  code={converts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Form Validation</h3>
              <div style={titles}>
                <PrismCode
                  code={pureComp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Step Input</h3>
              <div style={titles}>
                <PrismCode
                  code={steps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>7. Date_time</h3>
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

export default (withStyles(styles)(NumberForm));
