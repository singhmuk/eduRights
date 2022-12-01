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

const abstraction = `
  function Vehicle(){  
      this.vehicleName="vehicleName";  
      throw new Error("You cannot create an instance of Abstract Class");  
  }  

  Vehicle.prototype.display=function(){  
      return "Vehicle is: "+this.vehicleName;  
  }  

  function Bike(vehicleName){  
      this.vehicleName=vehicleName;  
  }  
  

  Bike.prototype=Object.create(Vehicle.prototype);  
  var bike=new Bike("Honda");  
  console.log(bike.display());  `.trim()


const encapsulations = `
  class Student  {  
    constructor(){  
      var name;  
      var marks;  
    }  
    
  getName()  {  
    return this.name;  
  } 

  setName(name){  
    this.name=name;  
  }  

  getMarks(){  
    return this.marks;  
  } 

  setMarks(marks){  
    this.marks=marks;  
  }  
}  

  var stud=new Student();  
  stud.setName("John");  
  stud.setMarks(80);  
  console.log(stud.getName()+" "+stud.getMarks());  `.trim()

const inheritance = `
  class Person {
    constructor(name) {
    this.name = name;;
  }

  toString_Person() {
    return "Name of person = " + this.name;
    }
  }

  class Student extends Person {
    constructor(name, Sid) {
      super(name);
      this.Sid = Sid;
    }

  toString_Student() {
    return super.toString_Person() + ", Student Id = " +
    this.Sid
    }
  }
  

var Student_1 = new Student("Sumit", "GFG_123");
console.log(Student_1.toString());`.trim()

const polymorphism = `
class A {  
    display(){  
     console.log("A is invoked");  
   }  
 }  

class B extends A {  
   display(){  
     console.log("B is invoked");  
   }  
 }  
 
    var a=[new A(), new B()]  
    a.forEach(function(msg) {  
          msg.display();  
              })`.trim()


const getSet = `
class Person {
  constructor(name) {
    this._name_ = name;
  }
  get name(){
    return this._name_;
  }
  set name(name){
    this._name_ = name;
    }
 }
 
 var p = new Person("Eden");
 console.log(p.name);
 p.name = "John";
 console.log(p.name);
 console.log("name" in p.__proto__);
 console.log("name" in Person.prototype);
 console.log(Object.getOwnPropertyDescriptor(p.__proto__, "name").set);
 console.log(Object.getOwnPropertyDescriptor(Person.prototype, "name").get);
 console.log(Object.getOwnPropertyDescriptor(p, "_name_").value);
 
 
 //Super
 var obj1 = {
  print(){
  console.log("Hello");
  }
 }
 var obj2 = {
      print(){
      super.print();
    }
  }
 Object.setPrototypeOf(obj2, obj1);
 obj2.print();`.trim();


class Oops extends Component {
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
              <h3>OOP</h3>
              The basic idea of OOP is that we use objects to model real world things that we want to represent inside our programs, and provide
              a simple way to access functionality that is hard/ impossible to make use.
              <br />

              <h3>1.Abstraction</h3>
              Abstraction is a way of hiding the implementation details and showing only the functionality to the users.
              <br />
              <br />
              <b>Points to remember:</b><br />
              <ul>
                <li>We cannot create an instance of Abstract Class.</li>
                <li>It reduces the duplication of code.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={abstraction}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2.Encapsulations</h3>
              Encapsulation is a process of binding the data (variables) with the functions acting on that
              data. It allows us to control the data and validate it.
              <br />
              <br />
              <b>To achieve an encapsulation in JavaScript:</b>
              <br />
              Use setter methods to set the data and getter methods to get that data.
              <br />

              <p>The encapsulation allows us to handle an object using the following properties:</p>
              <ul>
                <li>Read/ Write</li>
                <li>Read Only</li>
                <li>Write Only</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={encapsulations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3.Inheritance</h3>
              It is a concept in which some property and methods of an Object is being used by another Object.
              <br />
              <div style={titles}>
                <PrismCode
                  code={inheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4.Polymorphism</h3>
              It provides an ability to call the same method on different JavaScript objects.
              <br />
              <div style={titles}>
                <PrismCode
                  code={polymorphism}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Get Set:</h3>
              <div style={titles}>
                <PrismCode
                  code={getSet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Transition Group</h3>
              While React manages different components and their behavior to make any web app interactive it contains
              no methodology of adding aesthetics to the app itself. An animation is considered to be one of the most
              used methods to add aesthetics to an app, we can add animation to a React App using an explicit group of
              components known as the React Transition Group.
              <br />
              <br />
              The animation that we can implement using the React Transition Group is pure CSS Transitions, i.e. it
              doesn’t use any property of JavaScript to animate the components.
              <br />
              <br />
              React Transition group consists of three primary components:
              <ul>
                <li>(i) Transition</li>
                <li>(ii) CSSTransition and</li>
                <li>(iii) TransitionGroup</li>
              </ul>
              <br />

              React Transition Group consists only of components i.e. in order to implement animation to any set of
              components or HTML elements we must firstly wrap them within any of the three existing components.
              <br />
              <br />
              How the Transition Group works.: React Transition Group components divide the
              lifecycle of any other child component into specific stages and developers can choose to add specific
              classes in these stages for a timespan known as Timeout. This is where the use of JavaScript ends.
              Now all is left for the developer to give different styles to the classes and add CSS Transitions for
              animation.
              <br />
              <br />
              React Transition group consists of three primary components Transition,
              CSSTransition and TransitionGroup. Let us now describe the following in brief.
              <br />
              <br />
              Transition: The Transition component has a simple API that lets the developer describe a transition from
              one component state to another over time. Primarily it is used to animate the mounting and unmounting of
              a component, but can also be used to create more complex animations.
              <br />
              <br />
              According to the Transition Component, a Transition can be divided into Four Main Stages:
              <ul>
                <li>entering</li>
                <li>entered</li>
                <li>exiting</li>
                <li>exited</li>
              </ul>
              <br />

              CSSTransition: As the name suggests this transition component relies on CSS transitions and animations.
              divided into Three Main Stages:
              <ul>
                <li>appear</li>
                <li>enter</li>
                <li>exit</li>
              </ul>
              <br />

              TransitionGroup: The TransitionGroup component is used to manage a set of Transition components in a list.
              Similarly to the Transition component itself, the TransitionGroup doesn’t directly set up the animations
              it is a state machine as it keeps track of the current state the component is in i.e. mounting or
              unmounting.
              <br />
              The TransitionGroup component is used primarily to have different animations within a component, this can
              be accomplished by wrapping several Transition components within a TransitionGroup component. A
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Oops));
