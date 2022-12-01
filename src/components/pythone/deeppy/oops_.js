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

const objects = `
class Test:
    x=10                                                                //static member varriable
    def __init__(self,a,b):
        self.a=a
        self.b=b
    def show(self):
        print(self.a, self.b)

print(Test.x)                                                           //Static object
obj = Test(3,4)                                   //Instance object, After creating ins obj, Automatically call __init__
obj.show()`.trim();

const sorts = `
#1
l=(4,3,5,6,8,0,1,2)                                                               
print(sorted(l))


#2
l=[4,3,5,6,8,0,1,2]                                                             
print(l.sort())
`.trim();

const managed = `
class Items:
    a=10                                                                  # Static member variables
    def __init__(self):
        self.a=1                                                          # InStance member variable
        y=4                                                               # Local variable
        Items.b=6                                                         # Static variable

    @staticmethod
    def f2():
        Items.d=8                                                         #Static variable

    @classmethod
    def f3(cls):
        cls.e=1                                                           #Static variable
        Items.f=10                                                        #Static variable

Items.g=11                                                                #Static variable
`.trim();

const classeses = `
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("John", 36)

print(p1.name)
print(p1.age)


#2
class Dog:
    attr1 = "mammal"
    attr2 = "dog"

    def fun(self):
        print("I'm a", self.attr1)
        print("I'm a", self.attr2)

Rodger = Dog()

print(Rodger.attr1)
Rodger.fun()`.trim();


const self = `class Rectangle:
def __init__(self, length, breadth, unit_cost=0):
    self.length = length
    self.breadth = breadth
    self.unit_cost = unit_cost
    
def get_area(self):
    return self.length * self.breadth
    
def calculate_cost(self):
    area = self.get_area()
    return area * self.unit_cost

r = Rectangle(160, 120, 2000)
print("%s sq units" % (r.get_area()))
`.trim()

const initMethod = `
class Person:
	def __init__(self, name):                                        
		self.name = name

	def say_hi(self):
		print('Hello, my name is', self.name)

p = Person('Nikhil')
p.say_hi()`.trim();

const Instance = `
class Dog:
    animal = 'dog'

    def __init__(self, breed, color):
        self.breed = breed                                                    # Instance Variable
        self.color = color


Rodger = Dog("Pug", "brown")
Buzo = Dog("Bulldog", "black")

print('Rodger is a', Rodger.animal)
print('Breed: ', Rodger.breed)

print(Dog.animal)`.trim();

const staticVariables = `
class CSStudent:
	stream = 'cse'
	def __init__(self,name,roll):
		self.name = name		                                                        
		self.roll = roll		                                                        

a = CSStudent('Geek', 1)
b = CSStudent('Nerd', 2)

print(a.stream)                                                               
print(b.stream)                                                               
print(CSStudent.stream)                                       # Class variables can be accessed using class name also

a.stream = 'ece'
print(a.stream)                                                                   # prints 'ece'
print(b.stream)                                                                   # prints 'cse'

  
# To change the stream for all instances of the class we can change it directly from the class
CSStudent.stream = 'mech'

print(a.stream)                                                                   # prints 'mech'
print(b.stream)                                                                   # prints 'mech'
`.trim();

const staticmethod = `
from datetime import date

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def fromBirthYear(cls, name, year):
        return cls(name, date.today().year - year)

    
    @staticmethod                                                     # Static method to check if a Person is adult or not.
    def isAdult(age):
        return age > 18

person1 = Person('mayank', 21)
person2 = Person.fromBirthYear('mayank', 1996)

print(person1.age)
print(Person.isAdult(22))`.trim();

const constructors = `
class GeekforGeeks:
	def __init__(self):                                                                 # default constructor
		self.geek = "GeekforGeeks"

	def print_Geek(self):
		print(self.geek)

obj = GeekforGeeks()
obj.print_Geek()


#2 
class Addition:
    first = 0
    second = 0
    answer = 0
    
    def __init__(self, f, s):                                                           # parameterized constructor
        self.first = f
        self.second = s

    def display(self):
        print("First number = " + str(self.first))
        print("Second number = " + str(self.second))
        print("Addition of two numbers = " + str(self.answer))

    def calculate(self):
        self.answer = self.first + self.second

obj = Addition(1000, 2000)
obj.calculate()
obj.display()`.trim();

const destructors = `
class Employee:
	def __init__(self):
		print('Employee created.')

	def __del__(self):                                                            
		print('Destructor called, Employee deleted.')

obj = Employee()
del obj`.trim();

const encapsulations = `
class Computer:

    def __init__(self):
        self.__maxprice = 900

    def sell(self):
        print("Selling Price: {}".format(self.__maxprice))

    def setMaxPrice(self, price):
        self.__maxprice = price

c = Computer()
c.sell()

c.__maxprice = 1000
c.sell()

c.setMaxPrice(1000)                                                                 # using setter function
c.sell()`.trim();

const inherritance = `
class A:
    def features(self):
        print('features1')

    def features2(self):
        print('features2')

class B:
    def features3(self):
        print('features3')
    def features4(self):
        print('features4')

class C(A,B):
    def features4(self):
        print('features5')

a1=A()
# a1.features()
# a1.features2()

b1=B()
c1=C()
c1.features()


#2
class Person(object):
    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

    def isEmployee(self):
        return False


class Employee(Person):
    def isEmployee(self):
        return True

emp = Person("Geek1")
print(emp.getName(), emp.isEmployee())

emp = Employee("Geek2")
print(emp.getName(), emp.isEmployee())`.trim();

const multipleInheritance = `
class Base1(object):
    def __init__(self):
        self.str1 = "Geek1"
        print("Base1")

class Base2(object):
    def __init__(self):
        self.str2 = "Geek2"
        print("Base2")

class Derived(Base1, Base2):
    def __init__(self):
        Base1.__init__(self)
        Base2.__init__(self)
        print("Derived")

    def printStrs(self):
        print(self.str1, self.str2)

ob = Derived()
ob.printStrs()`.trim();

const multilevelInheritance = `
class Base(object):

    def __init__(self, name):
        self.name = name
    def getName(self):
        return self.name


class Child(Base):
    def __init__(self, name, age):
        Base.__init__(self, name)
        self.age = age
    def getAge(self):
        return self.age


class GrandChild(Child):
    def __init__(self, name, age, address):
        Child.__init__(self, name, age)
        self.address = address

    def getAddress(self):
        return self.address

g = GrandChild("Geek1", 23, "Noida")
print(g.getName(), g.getAge(), g.getAddress())`.trim();

const privateMembers = `
class C(object):
	def __init__(self):
		self.c = 21
		self.d = 42
    
class D(C):
	def __init__(self):
		self.e = 84
		C.__init__(self)
object1 = D()

print(object1.d)`.trim();

const overriding_methods = `
class Animal:
    multicellular = True
    eukaryotic = True

    def breathe(self):
        print("I breathe oxygen.")

    def feed(self):
        print("I eat food.")


class Herbivorous(Animal):

    def feed(self):
        print("I eat only plants. I am vegetarian.")


herbi = Herbivorous()
herbi.feed()
herbi.breathe()`.trim();

const polymorphism = `
def add(x, y, z = 0):
	return x + y+z

print(add(2, 3))
print(add(2, 3, 4))


#2
class India():
	def capital(self):
		print("New Delhi")

	def language(self):
		print("Hindi")

	def type(self):
		print("India")

class USA():
	def capital(self):
		print("Washington")

	def language(self):
		print("English")

	def type(self):
		print("USA")

obj_ind = India()
obj_usa = USA()
for country in (obj_ind, obj_usa):
	country.capital()
	country.language()
	country.type()




#3
class Parrot:
    def fly(self):
        print("Parrot can fly")

    def swim(self):
        print("Parrot can't swim")


class Penguin:
    def fly(self):
        print("Penguin can't fly")

    def swim(self):
        print("Penguin can swim")


def flying_test(bird):                                                              # common interface
    bird.fly()

blu = Parrot()                                                                      # instantiate objects
peggy = Penguin()

flying_test(blu)                                                                    # passing the object
flying_test(peggy)
`.trim();


class OopsPyton extends Component {
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
              <h3>Objects</h3>
              We can create one class object and many instance object. Class object has static member varriables.

              <div style={titles}>
                <PrismCode
                  code={objects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Difference between sorted and sort function.</h3>
              <ul>
                <li><b>sort(): </b>Alwase apply on list and return None. sort() do changes on original list.</li>
                <li><b>sorted(): </b>Alwase return list even pass tuples/ string.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={sorts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>How memory managed in Python</h3>
              <ul>
                <li><b>Stack Memory: </b>Have refrences</li>
                <li><b>Private Heap Space: </b>Have Id of declared values, Objects stored here.</li>
              </ul>
              <br />

              <h3>How to create static member variables in class</h3>
              <ul>
                <li>Python don't have static keyword.</li>
                <li>Static variable get mempry inside class objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={managed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>classes</h3>
              <ul>
                <li>The __init__() function is called automatically every time the class is being used to  create a new object.</li>
                <li>Create a class named Person, use the __init__() function to assign values for name and age.</li>
                <li>The self parameter is a reference to the current instance of the class, and is used to access variables that belong to the class.</li>
              </ul>
              <br />
              <b>The self</b>
              <ul>
                <li>Class methods must have an extra first parameter in the method definition. We do not give a value for this parameter when we call the method, Python provides it.</li>
                <li>If we have a method that takes no arguments, then we still to have one argument.</li>
                <li>When we call a method of this object as myobject.method(arg1, arg2), this is automatically converted by Python into MyClass.method(myobject, arg1, arg2) – this is all the special self is about.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={classeses}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <br />
              <br />
              <b>What is __init__  & self in Python?</b>
              <br />
              'self' is used to represent the instance of a class. By using the "self" keyword we access the attributes and methods of the class in python.
              <br />
              <b>__init__ method: </b>
              This method is called when an object is created from a class and it allows the class to initialize the attributes of the class.
              <div style={titles}>
                <PrismCode
                  code={self}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>__init__ method</h3>
              <div style={titles}>
                <PrismCode
                  code={initMethod}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Class and Instance Variables</h3>
              <ul>
                <li><b>Instance variables: </b></li>
                <ul>
                  <li>Instance variables are for data, unique to each instance.</li>
                  <li>Instance variables are variables whose value is assigned inside a constructor/ method with self.</li>
                  <li>Defining instance variable using a constructor. </li>
                </ul>
                <br />

                <li><b>class variables: </b></li>
                <ul>
                  <li>class variables are for attributes and methods shared by all instances of the class.</li>
                  <li>class variables are variables whose value is assigned in the class.</li>
                </ul>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={Instance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Class or Static Variables</h3>
              <ul>
                <li>All variables which are assigned a value in the class declaration are class variables.</li>
                <li>And variables that are assigned values inside methods are instance variables.</li>
              </ul>
              <br />

              <b>class method vs static method</b>
              <ul>
                <li>A static method does not receive an implicit first argument.</li>
                <li>A static method is also a method which is bound to the class and not the object of the class.</li>
                <li>A static method can’t access/ modify class state.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={staticVariables}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>How to define a class method and a static method?</h3>
              <div style={titles}>
                <PrismCode
                  code={staticmethod}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Constructors</h3>
              Constructors are generally used for instantiating an object.The task of constructors is to initialize(assign values) to the data members of the class when an object of class is created.In Python the __init__() method is called the constructor and is always called when an object is created.
              <br />
              <br />
              <ul>
                <li><b>default constructor :</b>The default constructor is simple constructor which doesn’t accept any arguments.It’s definition has only one argument which is a reference to the instance being constructed.</li>
                <li><b>parameterized constructor :</b>The parameterized constructor take its first argument as a reference to the instance being constructed known as self and the rest of the arguments are provided by the programmer.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={constructors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Destructors</h3>
              <ul>
                <li>Destructors are called when an object gets destroyed. In Python, destructors are not needed because Python has a garbage collector that handles memory management automatically.</li>
                <li>The <b>__del__()</b> method is called when all references to the object have been deleted.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={destructors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>Note :</b>The destructor was called after the program ended or when all the references to object are deleted.
              <br />

              <h3>Encapsulation</h3>
              <div style={titles}>
                <PrismCode
                  code={encapsulations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Inherritance</h3>
              <ul>
                <li><b>Single inheritance:  </b>A class inherits only one superclass</li>
                <li><b>Multiple inheritance: </b>When a class inherits multiple superclasses</li>
                <li><b>Multilevel inheritance: </b>When a class inherits a superclass and then another class inherits
                  this derived class forming a ‘parent, child, and grandchild’ class structure</li>
                <li><b>Hierarchical inheritance: </b>When one superclass is inherited by multiple derived classes</li>
              </ul>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={inherritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Multiple inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={multipleInheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Multilevel inheritance</h3>
              When we have a child and grandchild relationship.
              <div style={titles}>
                <PrismCode
                  code={multilevelInheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul>
                <li><b>Hierarchical inheritance :</b>Hierarchical inheritance More than one derived classes are created from a single base.</li>
                <li><b>Hybrid inheritance :</b>This form combines more than one form of inheritance. Basically, it is a blend of more than one type of inheritance.</li>
              </ul>
              <br />

              <h3>Private members of parent class </h3>
              We can make an instance variable by adding double underscores before its name.
              <div style={titles}>
                <PrismCode
                  code={privateMembers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>Note :</b>Since ‘d’ is made private by those underscores, it is not available to the child class ‘D’ and hence the error.
              <br />

              <h3>Overriding Methods</h3>
              <div style={titles}>
                <PrismCode
                  code={overriding_methods}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Polymorphism</h3>
              <div style={titles}>
                <PrismCode
                  code={polymorphism}
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

export default (withStyles(styles)(OopsPyton));
