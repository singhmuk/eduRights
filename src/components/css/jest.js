import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';

import Browser from '../../assets/css1.PNG';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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


const webservices = ``.trim();

const jasmine = `
describe("Suite Name", function() {
  it("test spec", function() {
      expect( expression ).toEqual(true);
  }); 
});`.trim();

const testBed = `
TestBed.configureTestingModule({
  providers: [AuthService]
});`.trim();

const testBedService = `testBedService = TestBed.get(AuthService);`.trim();

const disable = `
xdescribe('Hello', () => { (1)
  xit('says Hello', () => { (1)
    expect(Hello())
        .toEqual('Hello!');
  });
});`.trim();

// const webservices = ``.trim();

// const webservices = ``.trim();



class Jest extends Component {
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
      <ul>
        <li>The goal of the automated testing is to increase the quality of the s/w.</li>
      </ul>
      <br/>

      <h3>1. Jest Features:</h3>
      <ul>
        <li><b>zero config:</b> Close to none configuration is required to get started with writing tests and deploying them. However, a config file can be supplied to the test suite as well.</li>
        <li><b>snapshots:</b> Jest has the ability to enable snapshot testing as well. Essentially, the snapshots are matched with 
        the saved snapshot and check for matching functionality.</li>
        <li><b>isolated tests:</b> Jest tests are run parallely to improve run time.</li>
      </ul>
      <br/>

      <h3>2. Angular has two types of unit tests:</h3>
      <ul>
        <li><b>Isolated: </b>
        <ul>
          <li>Isolated unit test are when we try to check a single functionality of a single pices or single unit of code.</li>
          <li>An isolated unit test is performed independently without using any Angular dependencies or injected values.</li>
          <li>There are a few Angular units that can be tested in isolation.</li>
          <li><b>Ex. </b>Pipe, Service, Class, Component, Directives.</li>
        </ul>
        </li>
        <br/>
        <li><b>Integration: </b>With integration testing, we test how 2 or more components work with each other. We can do this 
        when components are depending on each other.</li>
      </ul>
      <br/>

      <h3>3. There are 3 types of testing</h3>
        <ul>
          <li>Unit Testing Is done against a single unit of code. Unit of code means a single class.</li>
          <li>E2E Testing</li>
          <li>Integration or Functional Testing</li>
        </ul>
      <br/>
      
      <h3>4. Whenever possible, use TDD</h3>
      TDD is a design process, not a testing process. TDD is a robust way of designing software components ("units") interactively so that their behaviour is specified through unit tests.
      <br/>
      <br/>
      <b>Test-first cycle:</b>
      <br/>
      <ul>
        <li>Write a simple failing test</li>
        <li>Make the test pass by writing the minimum amount of code, don't bother with code quality</li>
        <li>Refactor the code by applying design principles/ patterns</li>
      </ul>
      <br/>
      
      <h3>5. Importance of Test-Driven Development (TDD)</h3>
      Using TDD provides the following benefits:
      <br/>
      <ul>
        <li>You have a clear picture of what you are trying to build before you write the actual code</li>
        <li>High test coverage;</li>
        <li>Bug-free code;</li>
        <li>Easy refactoring of the code;</li>
        <li>It enables developers to write small test codes which are easy to debug.</li>
      </ul>
      <br/>
      
      <h3>6. Why Should You Use Test-Driven Development (TDD) for ReactJS?</h3>
      If you have worked with ReactJS, then you probably know that code grows really fast in ReactJS. The code gets filled up with a lot of complex conditions due to service calls and change of state.
      <br/>
      <br/>
      Every component of your React application that lacks unit tests becomes a legacy code which is very difficult to maintain. Although we can add unit tests after we create the production code, it will be very risky as some scenarios can get overlooked which will cause the issue at the production stage.
      <br/>

      <h3>7. Tell me about Unit Testing in brief.</h3>    
      Unit Testing is used to check the independent modules of a software app during the development phase. An independent module can be anything like procedure, function, etc. Unit testing is done by developers and testers together before the integration testing. They have to write unit test cases as well if needed.
      <br/>

      <h3>8. What is the total number of phases in a Unit Test Case?</h3>
      The working of a unit test case can be divided into 3 phases. At the first stage, it will initialize the specific module of a software app that you want to test. In the second stage, it will execute the test case. In the end, it will analyze the final output.
      <br/>

      <h3>9. What are the various types of Unit Testing for a software app?</h3>
     <br/>
     
     <h3>10. What do you know about state-based Unit Testing?</h3>
     If you want to check if the final output is right or not, then it becomes state-based.
     <br/>
     
     <h3>11. For QA, what is the right time to start with Unit Testing?</h3>
     Starting testing at the last phase is not effective but it should be performed day by day. Mostly, Unit testing starts at the development phase continues until the deployment. When testing is not performed from the very first stage, it saves your time, efforts, and investments too.
     <br/>
     
     <h3>12. What is the purpose of Unit testing for a software app?</h3>
     It acts like documentation where the functionality of each individual component is recorded. Also, you can track quickly, what to test, and when.
     <br/>
     
     <h3>13. What can be avoided using Unit test cases?</h3>
     When you are working with unit test cases, it helps to avoid long classes, functions, procedures, etc. There is no need to write lengthy code but focus on testing functionality of each small component step by step. It will make the development of large apps easy.
     <br/>
     
     <h3>14. What is Mocking?</h3>
     It is a class that is suitable for exceptional handling, and it will give you a detailed idea of when a particular method was called. In case a method was not called by this class then you will be notified for the same.
     <br/>
     
     <h3>15. What is Stubbing?</h3>
     Stubs can set dynamic values when exceptions are thrown by methods. It works similar to mock classes but does not give any idea of either methods were called or not.
     <br/>
     
     <h3>16. Highlight any two or three features of mocking.</h3>
     It helps in working on interactions how different modules are connected to each other. Also, it tests the particular block of the code in isolation.
     <br/>
     
     <h3>17. How to design a good unit test case? Share your past experiences or strategies you have used during your work.</h3>
     <ul>
       <li>A test case is easy to code, and developers or testers don’t have to put more time or efforts.</li>
       <li>It is easy to read, more reliable, and can be executed much faster than your expectations.</li>
       <li>It can interact with other test cases quickly and creates a suitable testing environment too.</li>
       <li>Unit test cases have to satisfy certain conditions like it will not access network resources, any database, or file systems. It is completely free of external factors.</li>
     </ul>
     <br/>
     
     <h3>18. What are the best practices to perform Unit Testing?</h3>
     Here are the steps that you should follow while performing the Unit Testing.
     <br/>
     <ul>
       <li>A developer will write or design test cases at the first stage that will help to check the functionality of each module independently.</li>
       <li>The best unit testing practice is to copy and paste the code in the testing environment instead of using the natural environment.</li>
       <li>You can use a unit test framework like Junit and TestNG for automating the testing process. These frameworks will help you verify either all test cases are written well or not. It will speed up the testing process to a larger extent.</li>
     </ul>
     <br/>
     
     <h3>19. What is Code Coverage?</h3>
     It will give you a complete idea of which extent an application has been tested. It will highlight the area of the code that has not been entertained by test cases yet. You can quickly take actions on the highlighted area and make your application more suitable for the deployment.
     <br/>
     
     <h3>20. What Are the various code coverage techniques in software testing?</h3>
     <ul>
       <li>Statement Coverage</li>
       <li>Decision Coverage</li>
       <li>Branch Coverage</li>
       <li>Condition Coverage</li>
       <li>Finite State Machine Coveragea</li>
     </ul>
     <br/>
     
     <h3>21. What are the different unit testing techniques in QA?</h3>
     <ul>
       <li>White Box Testing</li>
       <li>Black Box Testing</li>
       <li>Grey Box Testing</li>
     </ul>
     <br/>
     
     <h3>22. Why did unit testing need to perform with other testing types?</h3>
     It is not expected to highlight each error in the software program. Also, it cannot work on integration errors but check independent units. This is the reason why unit testing needs to combine with other testing types like integration or performance testing.
      <div style={titles}>
      <PrismCode
        code={webservices}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>23. What is a AAA Pattern.</h3>
        <ul>
          <li><b>Arrange: </b>“arrange” everything like setup ground work for working with tests for execution.</li>
          <b>Ex.</b>Create an object of Component etc.
          <br/>
          <li><b>Act: </b>Act on your unit test case, calling metthods, processing data etc.</li>
          <li><b>Assert: </b>Verifying the actual data of test result and expected data.</li>
        </ul>
      <br/>

      <h3>24. BeforeEach()</h3>
        <ul>
          <li><b>We use an async before each: </b>The purpose of the async is to let all the possible asynchronous code to finish before continuing.</li>
          <li>Before running any test in angular we need to configure an angular testbed.</li>
          <li>This allows to create an angular environment for the component being tested.</li>
          <li>Any module, component or service that we tested component needs have to be included in the testbed. Finally, after setting the configuration, we call the compile component function.</li>
        </ul>
      <br/>

      <h3>25. AfterEach()</h3>
        Like beforeEach(), afterEach() works exactly the same way. It executes after the execution of the spec block.
      <br/>

      <h3>26. TestBed</h3>
        <ul>
          <li> Is the first and largest of the Angular testing utilities.</li>
          <li>It creates an Angular testing module – a <b>@NgModule</b> class – that you configure with the <b>configure TestingModule</b> method to produce the module environment for the class you want to test.</li>
          <li>Configures and initializes environment for unit testing and provides methods for creating components and services in unit tests.</li>
          <li>It creates a dependency injection (DI) context and allows us to override providers, services and whole modules.</li>
          <li>It compiles, instantiates and renders to HTML our components attaching them to the fixture instance. Any module, component or service that your tested component needs have to be included in the testbed.</li>
          <li>Finally, after setting the configuration, You call the comile component function.</li>
        </ul>
      <br/>

      <h3>27. What is angular unit testing?</h3>
      Unit testing is a type of software testing where we test individual components of an application. In AngularJS Unit testing is performed using Jasmine and Karma. Jasmine is the testing framework used for writing the test and Karma is used run tests. We can also use TestBed and async to make testing asynchronous code, components, directives or services easier.
      <br/>

      <h3>28. What is Karma and Jasmine?</h3>
        <ul>
          <li><b>Karma: </b>Karma is a tool of running tests on browsers it lets us spawn browsers and run jasmine tests inside of them.</li>
          <li><b>Jasmine: </b>It is a testing framework for Javascript programming language that supports Behaviour Driven Development (BDD) software development practice.</li>
        </ul>
      <br/>

      <h3>29. How to define a Spec in Jasmine?</h3>
      spec in Jasmine represents a test case inside the test suite. We can define spec by calling the global Jasmine function it, which, like describe takes a string and a function.
      <div style={titles}>
      <PrismCode
        code={jasmine}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>

      <h3>30. Enlist major matchers available in Jasmine?</h3>
      <ul>
        <li>toBeArray()</li>
        <li>toBeArrayOfBooleans()</li>
        <li>toBeFalse()</li>
        <li>toBeCalculable()</li>
        <li>toBeOddNumber()</li>
        <li>toBeEmptyObject()</li>
        <li>any.after(date)</li>
      </ul>
      are few built in matchers in Jasmine.
      <br/>

      <h3>31. What is a headless browser?</h3>
      A headless browser, a browser without any kind of graphical user interface (GUI) provides computerized control of a web page in an environment alike to popular web browsers but is performed through a command-line interface or managing network communication. They are especially useful for examining web pages as they can render and understand HTML the very way a browser would, including styling components such as page layout, color, font selection and execution of JavaScript and AJAX which are usually not possible when using other testing methods.
      <br/>

      <h3>32. How do you mock a service to inject in a unit test?</h3>
        <ol>
          <li><b>Resolving via TestBed: </b>The TestBed acts as a dummy Angular Module and we can configure it like one including with a set of providers like so:</li>
            <div style={titles}>
              <PrismCode
                code={testBed}
                language="js"
                plugins={["line-numbers"]}
              />
            </div>
          <br/>
          We can then ask the TestBed to resolve a token into a dependency using it’s internal injector, like so:
          <div style={titles}>
              <PrismCode
                code={testBedService}
                language="js"
                plugins={["line-numbers"]}
              />
            </div>
            <br/>
            If most of our test specs need the same dependency mocked the same way we can resolve it once in the beforeEach 
            function and mock it there.
        </ol>
      <br/>

      <h3>33. Name some Asymmetric Matchers in Jasmine?</h3>
      Some of the Asymmetric Matchers in Jasmine are as follows:
        <ol>
          <li>jasmine.any</li>
          <li>jasmine.anything</li>
          <li>jasmine.arrayContaining</li>
          <li>jasmine.objectContaining</li>
          <li>jasmine.stringMatching</li>
        </ol>
      <br/>

      <h3>34. How can we disable tests in Jasmine?</h3>
      We can disable tests by using the following Command:
      <div style={titles}>
        <PrismCode
          code={disable}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>

      <h3>35. What is Jasmine Spy?</h3>
      Jasmine Spy allows in spying on our application functions.There are two types of spy technologies:
      <ul>
        <li><b>spyon(): </b>helps by allowing us to spy on a specific piece of code.</li>
        <li><b>createSpy: </b>helps by allowing us to spy on the functionality.</li>
      </ul>
      <br/>

      <h3>36. How do we change return value of Jasmine Spy?</h3>
      We can change the return value by using the command:<br/>
        <b>authService.currentUser.and.returnValue('new');</b>
          </List>
        </Paper>
      </Grid>
    </Grid>
    )
  }
}

export default (withStyles(styles)(Jest));
