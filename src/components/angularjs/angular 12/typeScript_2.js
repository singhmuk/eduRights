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

const arrow = `
npm install -g typescript
tsc --version
tsc --help
tsc app.ts                                             #to run app.ts file.                                             

let doLog = (msg) => {console.log(msg)}
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
 // constructor(public x?: number, public y?:number){ }

  getVal(){
    console.log(this.x, this.y)
  }
}

let obj = Point();
obj.getVal();
`.trim();

const interfaces = `
interface User {
  name: string;
  id: number;
}

const user: User = {
  username: "Hayes",
  Type '{username: string; id: number;}' is not assignable to type 'User'.
  Object literal may only specify known properties, and 'username' does not exist in type 'User'.
  id: 0,
};`.trim();

const userAccount = `
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
console.log(user)`.trim();

const annotate = `
class Player{
  name:string;
  id:number;
  
  greet(){
     console.log(My name is '$'{this.name})
  }
}

const obj = new Player();
obj.name='Mukesh';
obj.id=1;

const obj2 = new Player();
obj2.name='Rakesh';

obj.greet()
obj2.greet()
`.trim();

const privates = `
class Player{
  private name:string;
  private id:number;
  
  setName(name:string){
     if(name.length<3){
        console.log('Please write full name')
        return;
     }
     this.name=name;
  }
  
  getName(){
     return this.name;
  }
}

const obj=new Player()
obj.setName('Rakesh');

console.log(obj.getName())
`.trim();

const inherritances = `
class Animal{
  hunger:number;
  health:number;
  
  eat(){
     console.log('Eating')
  }
  sleep(){
     console.log('Sleeping')
  }
  move(){
     console.log('Moving')
  }
  makeNoise(){
     console.log('Make noise')
  }
  
}

class Dog extends Animal{
  makeNoise(){
     console.log('Bark')
  }
}

class Cat extends Animal{}

const dog = new Dog();
const cat = new Cat();
dog.makeNoise()
cat.makeNoise()

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

const alias = `
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
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

const param = `
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
  
  constructor(heroId: number, hunger: number, health: number){
     super(hunger, health)
     this.heroId=heroId;
  }
  
  setHeroId(heroId: number): void{
     this.heroId = heroId;
  }
}


const obj = new Hero(10,30,100)
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
  readonly heroId: number;                                                              //cannot mutate after initialize
  
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

const dataType = `
Array:
var list : number[] = [1, 3, 5];
var list : Array<number> = [1, 3, 5]; 


//2
let a: [string, number];


//3
interface Calc {
    subtract (first: number, second: number): any;
}

let Calculator: Calc = {
    subtract(first: number, second: number) {
        return first - second;
    }
}



//4
class Student {
    RollNo: number;
    Name: string;
    constructor(RollNo: number, Name: string)  {
        this.RollNo = RollNo;
        this.Name = Name;
    }
    showDetails() {
        console.log(this.RollNo + " : " + this.Name);
    }
}


const obj=new Student(1, 'aaa');
obj.showDetails()


//5
enum Color {
        Red, Green, Blue
};
let c: Color;
ColorColor = Color.Green;



Functions:
function add(a: number, b: number): number {
            return a + b;
}
`.trim();

const decorators = `
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

class C {
    @f()
    method() {}
} 
`.trim();


class TypeScript2 extends Component {
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

              <h3>3. How without passing constructor parameter run ts</h3>
              <div style={titles}>
                <PrismCode
                  code={constructors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>npm install -g typescript / tsc test.ts</h3>
              TypeScript can build a type-system that accepts JavaScript code but has types. This offers a type-system without needing to add extra
              characters to make types explicit in our code.
              <ul>
                <li>We can then declare that a JavaScript object conforms to the shape of our new interface by using syntax : <b>TypeName after a variable declaration</b>.</li>
                <li>If provide an object that doesn’t match the interface we have provided, TypeScript will warn.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={interfaces}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={userAccount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Object</h3>
              <div style={titles}>
                <PrismCode
                  code={annotate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Encapsulation, and private variables</h3>
              <div style={titles}>
                <PrismCode
                  code={privates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={inherritances}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Multi level Inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={inheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Type Alias</h3>
              <ul>
                <li>type alias is exactly that - a name for any type.</li>
                <li><b>N: </b>aliases are only aliases - you cannot use type aliases to create different/ distinct “versions” of the same type.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={alias}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Interface Declaration</h3>
              interface declaration is another way to name an object type.
              <br />
              <br />
              Type aliases and interfaces are very similar, and in many cases we can choose between them freely. Almost all features of an
              interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface
              which is always extendable.
              <div style={titles}>
                <PrismCode
                  code={declaration}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Multiple Inheritance, and Interfaces</h3>
              <div style={titles}>
                <PrismCode
                  code={inherritancesMul}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Polymorphism</h3>
              <div style={titles}>
                <PrismCode
                  code={poly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Function Overloading</h3>
              <div style={titles}>
                <PrismCode
                  code={Overloading}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Constructors, Static, Parameter, and Readonly Properties</h3>
              <div style={titles}>
                <PrismCode
                  code={polyAbs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Parameter</h3>
              <div style={titles}>
                <PrismCode
                  code={param}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. Static</h3>
              <div style={titles}>
                <PrismCode
                  code={statics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Readonly</h3>
              <div style={titles}>
                <PrismCode
                  code={readOnly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Narrowing</h3>
              <div style={titles}>
                <PrismCode
                  code={narrowing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Static Types</h3>
              static types mean "at compile time".
              <br />
              Static types can be further divided into two sub-categories:
              <br />
              <b>1. Built-in or Primitive Type: </b>
              Number, String, Boolean, Void, Null.
              <br />
              <br />

              <b>2. User-Defined DataType: </b>
              Array, Touple, Enum, Functions, Class, Interface.
              <ul>
                <li><b>Touple: </b>Tuple is a data type which includes two sets of values of different data types.</li>
                <li><b>Interface: </b>It cannot be instantiated but can be referenced by the class which implements it.</li>
                <li><b>Class: </b>Classes are used to create reusable components and acts as a template for creating objects. It is a logical entity
                  which store variables and functions to perform operations.</li>
                <li><b>Enums: </b>Define a set of named constant. TypeScript provides both string-based and numeric-based enums. By default, enums
                  begin numbering their elements starting from 0, but we can also change this by manually setting the value to one of its elements.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={dataType}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Decorators</h3>
              A decorator is a special of data type which can be attached to a class declaration, method, property, accessor, and parameter. It provides
              a way to add both annotations and a meta-programing syntax for classes and functions. It is used with <b>@</b> symbol.
              <div style={titles}>
                <PrismCode
                  code={decorators}
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

export default (withStyles(styles)(TypeScript2));
