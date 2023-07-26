import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

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

const objects = `
const car: { type: string, model: string, year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009
};

console.log(car);
`.trim();

const insignature = `
const nameAgeMap: { [index: string]: number } = {};

nameAgeMap.Jack = 25;
nameAgeMap.Mark = "Fifty"; 

console.log(nameAgeMap);
`.trim();

const arrow = `
npm install -g typescript
tsc --version
tsc --help
tsc app.ts                                             #to run app.ts file.                                             
`.trim();

const classtypes = `
class Dog{
  age: number
  breed: string

  constructor(age, breed){
      this.age = age
      this.breed = breed
  }
  show(){
      return console.log(this.age * 7)
  }
}

const obj = new Dog(2, 'Labrador');
obj.show();
`.trim();

const constructors = `
class Point{
  x: number;
  y: number;

  constructor(x?: number, y?:number){
    this.x = x;
    this.y = y
  }

  getVal(){
    console.log(this.x, this.y)
  }
}

let obj = Point();
obj.getVal();


//Access modifier
class Point{
  constructor(private x?: number, private y?:number){ }

  getVal(){
    console.log(this.x, this.y)
  }
}

let obj = Point();
obj.getVal();
`.trim();

const inheritancetypes = `
class Animal{
  age: number
  breed: string
  constructor(age, breed){ 
      this.age = age
      this.breed = breed
  }
  show(sound: string): void{
      console.log(sound)
  }
}

class Dog extends Animal{
  bool: boolean
  constructor(age: number, breed: string, bool: boolean){
       super(age, breed)                            //call parent constructor
       this.bool = bool
  }
  makeSound(): void{
      super.show('Dog')
  }
  getAgeInHumanYears(): number{
      return this.age * 7   
  }
}

const obj = new Dog(1, 'Obj', true)
obj.makeSound();

class Cat extends Dog{
  newbool: boolean;
  constructor(age: number, breed: string, bool, newbool){
      super(age, breed, bool)
  }
  makeSound(): void{
      super.show('Cat')
  }
}

const obj2 = new Cat(2, 'Obj2', false, true);
obj2.makeSound();
`.trim();

const inheritance = `
class Animal {
    eat():void {
        console.log("Eating")
     }
}

class Dog extends Animal {
   bark():void {
      console.log("Barking")
   }
}

class BabyDog extends Dog{
    weep():void {
        console.log("Weeping")
     }
}
let obj = new BabyDog();
obj.eat();
obj.bark();
obj.weep()
`.trim();

const declaration = `
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({x: 100, y: 100});
`.trim();

const inherritancesMul = `
abstract class Character{
  hunger:number;
  health:number;
  
  abstract eat(): void
}

interface Hero extends Character{
  heroId:number;
}

interface Enemy extends Character{
  enemyId:number
}

class Spy implements Hero, Enemy{
  hunger:number;
  health:number;
  heroId:number;
  enemyId:number;
  
  eat() {
      this.hunger -= 1
  }
} 

const hero: Hero = new Spy();
const enemy: Enemy = new Spy();
`.trim();

const Overloading = `
class A {
    public foo(s: string): number;
    public foo(n: number): string;

    public foo(arg: any): any {
        if (typeof(arg) === 'number')
            return arg.toString();
        if (typeof(arg) === 'string')
            return arg.length;
    }
}

let obj = new A();
console.log("Result: " +obj.foo(101));
console.log("Length of String: " +obj.foo("JavaTpoint"));
`.trim();

const poly = `
class Hero{
  hunger:number;
  health:number;
  
  attack(){
     console.log('Attacking')
  }
  move(){
     console.log('Moving')
  }
  eat(){
     console.log('Eating')
  }
}

class Archer extends Hero{
  arrows:number;
  attack(){
     super.attack()
     console.log('Firing an Arrow')
     this.arrows -= 1
  }
}

class Mage extends Hero{
  mana:number
  
  attack(): void {
      super.attack()
      console.log('Throwing a portion')
      this.mana -= 1
  }
}

class Knight extends Hero{
  shield:number
  attack(){
     console.log('Knight')
  }
}

const archer:Hero=new Archer();
const mage:Hero=new Mage();
const knight:Hero=new Knight();

archer.attack();
mage.attack();
knight.attack();

class Tribe{
  private heros:Hero[];
  setHeros(heros:Hero[]){
     this.heros = heros;
  }
  
  attack(): void{
     for(let hero of this.heros){
        hero.attack();
     }
  }
}

const heros: Hero[] = [archer, mage, knight];
const tribe = new Tribe();
tribe.setHeros(heros);
tribe.attack()
`.trim();

const polyAbs = `
class Character{
  private hunger:number;
  private health:number;
  
  constructor(hunger: number, health: number){
     this.hunger=hunger;
     this.health=health;
  }
   
  setHunger(hunger: number): void{
     this.hunger = hunger;
  }
  
  setHealth(health: number): void {
     this.health = health;
  }
  
  getHunger():number{
     return this.hunger;
  }
  
  getHealth():number{
   return this.health;
}
}

class Hero extends Character{
  private heroId: number;
  
  setHeroId(heroId: number): void{
     this.heroId = heroId;
  }
}


const obj = new Hero(10,100)
console.log(obj.getHunger())
console.log(obj.getHealth())
`.trim();

const statics = `
class Character{
  static characterCount = 0;
  private hunger:number;
  private health:number;
  
  constructor(hunger: number, health: number){
     Character.characterCount +=1;
     console.log(Character.characterCount)
     this.hunger=hunger;
     this.health=health;
  }
   
  setHunger(hunger: number): void{
     this.hunger = hunger;
  }
  
  setHealth(health: number): void {
     this.health = health;
  }
  
  getHunger():number{
     return this.hunger;
  }
  
  getHealth():number{
   return this.health;
}
}

class Hero extends Character{
  private heroId: number;
  
  constructor(heroId: number, hunger: number, health: number){
     super(hunger, health)
     this.heroId=heroId;
  }
  
  setHeroId(heroId: number): void{
     this.heroId = heroId;
  }
}

const obj = new Hero(10,30,100)
const obj2 = new Hero(10,30,100)
const obj3 = new Hero(10,30,100)
`.trim();

const readOnly = `
class Character{
  static characterCount = 0;
  private hunger:number;
  private health:number;
  
  constructor(hunger: number, health: number){
     Character.characterCount +=1;
     console.log(Character.characterCount)
     this.hunger=hunger;
     this.health=health;
  }
   
  setHunger(hunger: number): void{
     this.hunger = hunger;
  }
  
  setHealth(health: number): void {
     this.health = health;
  }
  
  getHunger():number{
     return this.hunger;
  }
  
  getHealth():number{
   return this.health;
}
}

class Hero extends Character{
  readonly heroId: number;                                              //cannot mutate after initialize
  
  constructor(heroId: number, hunger: number, health: number){
     super(hunger, health)
     this.heroId=heroId;
  }
}


const obj = new Hero(10,30,100)
const obj2 = new Hero(10,30,100)
const obj3 = new Hero(10,30,100)
`.trim();

const narrowing = `
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}

padLeft({padding:'1'},{input:'input'})


2. Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);`.trim();

const omitted = `
function greet(name:string, greeting:string='Ritesh'):string{
  return greeting
}

console.log(greet('Rakesh'))
`.trim();

const parameters = `
function greet(name:string, greeting?:string){
  return console.log(name, greeting)
}

greet('Rakesh')


//2
function printName(obj: {first: string; last?: string}) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
  }

  console.log(obj.last?.toUpperCase());
}

printName({ first: "Bob" });
printName({first: "Alice", last: "Alisson"})
`.trim();

class TypeScript2 extends Component {
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
              <h3>1. Cohesion And Coupling Principle</h3>
              <ul>
                <li>Component connection inside modules is Cohesion.</li>
                <li>Connection b/w model is coupling.</li>
                <li>High Cohesion and Low Coupling.</li>
              </ul>
              <p></p>
              <h3>2. Arrow function</h3>
              <div style={titles}>
                <PrismCode
                  code={arrow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Object Types</h3>
              <div style={titles}>
                <PrismCode
                  code={objects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Index Signatures</h3>
              Index signatures can be used for objects without a defined list of
              properties.
              <div style={titles}>
                <PrismCode
                  code={insignature}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. How without passing constructor parameter run ts</h3>
              <div style={titles}>
                <PrismCode
                  code={constructors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Class </h3>
              <div style={titles}>
                <PrismCode
                  code={classtypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. inheritance using super</h3>
              <div style={titles}>
                <PrismCode
                  code={inheritancetypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>9. Multi level Inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={inheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>10. Interface Declaration</h3>
              <ul>
                <li>
                  Interface is a structure that defines the contract in our
                  application. It defines the syntax for classes to follow.
                </li>
                <li>
                  TypeScript compiler does not convert interface to JavaScript.
                  It uses interface for type checking. This is also known as
                  "duck typing" or "structural subtyping".
                </li>
                <li>
                  Interface is defined with the keyword interface and it can
                  include properties and method declarations using a function
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={declaration}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>11. Multiple Inheritance, and Interfaces</h3>
              <div style={titles}>
                <PrismCode
                  code={inherritancesMul}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>12. Polymorphism</h3>
              <div style={titles}>
                <PrismCode
                  code={poly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>13. Function Overloading</h3>
              <div style={titles}>
                <PrismCode
                  code={Overloading}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                14. Constructors, Static, Parameter, and Readonly Properties
              </h3>
              <div style={titles}>
                <PrismCode
                  code={polyAbs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>16. Static</h3>
              <div style={titles}>
                <PrismCode
                  code={statics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>17. Readonly</h3>
              <div style={titles}>
                <PrismCode
                  code={readOnly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>18. Narrowing</h3>
              <div style={titles}>
                <PrismCode
                  code={narrowing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>19. Default Parameters</h3>
              <ul>
                <li>
                  TypeScript provides the Option to add default values to
                  Parameters. So, if the user does not provide a value to an
                  argument, TypeScript will initialize the Parameter with the
                  default value. Default Parameters have the same behaviour as
                  Optional Parameters. If a value is not passed for the default
                  Parameters in a function call, the default Parameter must
                  follow the required Parameters in the function signature.
                  Hence, default Parameters can be omitted while calling a
                  function. However, if a function signature has a default
                  Parameter before a required Parameter, the function can still
                  be called, provided the default Parameter is passed a value of
                  undefined.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={omitted}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>20. Optional Parameter</h3>
              <ul>
                <li>
                  The parameters that may or may not receive a value can be
                  appended with a '?' to mark then as optional.
                </li>
                <li>
                  All optional parameters must follow required parameters and
                  should be at the end.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={parameters}
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

export default withStyles(styles)(TypeScript2);
