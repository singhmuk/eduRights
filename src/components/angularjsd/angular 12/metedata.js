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


const folding = `
let selector = 'app-root';
@Component({
  selector: selector
})

//Will be folded into inline selector

@Component({
      selector: 'app-root'
    })`.trim();

const typeFunc = `
template:
  '{{ $any(user).contacts.email }}'
  
  
//The $any() cast function also works with this to allow access to undeclared members of the component.
   template:
   '{{ $any(this).contacts.email }}'`.trim();

const transition = `
transition('open => closed', [
  animate('500ms')
]),`.trim();

const assertionOpp = `@Component({
  selector: 'my-component',
  template: '<span *ngIf="user"> {{user.name}} contacted through {{contact!.email}} </span>'
})
class MyComponent {
  user?: User;
  contact?: Contact;

  setData(user: User, contact: Contact) {
    this.user = user;
    this.contact = contact;
  }
}`.trim();

const narrowing = `
@Component({
  selector: 'my-component',
  template: '<span *ngIf="user"> {{user.contact.email}} </span>'
})
class MyComponent {
  user?: User;
}`.trim();

const stateFun = `
state('open', style({
  height: '300px',
  opacity: 0.5,
  backgroundColor: 'blue'
})),`.trim();

const dslSyntax = `
(): Used for Output and DOM events.
[]: Used for Input and specific DOM element attributes.
*: Structural directives(*ngFor or *ngIf) will affect/change the DOM structure.`.trim();

const lazyLoading = `{path: ‘user’, loadChildren: () => import(‘./users/user.module’).then(m => m.UserModule)};`.trim();





// const pipes = ``.trim();




class MetaData extends Component {
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
              <h3>1. Metadata</h3>
              MetaData is used to decorate a class. So it always represented in the decorator. This helps the class exhibit the desired behavior.
              <br/>
              <br/>
              <b>Restrictions of metadata</b><br/>
              In Angular, You must write metadata with the following general constraints,
              <br />
              <ul>
                <li>Write expression syntax within the supported range of javascript features.</li>
                <li>The compiler can only reference symbols which are exported.</li>
                <li>Only call the functions supported by the compiler</li>
                <li>Decorated and data-bound class members must be public.</li>
              </ul>
              <br />

              <h3>2. What is the purpose of metadata json files</h3>
              The metadata.json file can be treated as a diagram of the overall structure of a decorator's metadata,
              represented as an abstract syntax tree(AST). During the analysis phase, the AOT collector scan the metadata
              recorded in the Angular decorators and outputs metadata information in .metadata.json files, one per .d.ts file.
              <br />

              <h3>3. Can I use any javascript feature for expression syntax in AOT</h3>
              No, the AOT collector understands limited JavaScript features. If an expression uses
              unsupported syntax, the collector writes an error node to the .metadata.json file. Later point of time,
              the compiler reports an error if it needs that piece of metadata to generate the application code.
              <br />

              <h3>4. What is folding</h3>
              The compiler can only resolve references to exported symbols in the metadata. Whereas some of the non-exported members are folded while generating the code.
              <br />
              <br />
              Folding is a process in which the collector evaluates an expression during collection and record the result in the .metadata.json instead of the original expression.
              <div style={titles}>
                <PrismCode
                  code={folding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Remember that the compiler can’t fold everything. For example, spread operator on arrays, objects created using new keywords and function calls.
              <br />

              <h3>5. What is metadata rewriting</h3>
              Metadata rewriting is the process in which the compiler converts the expression initializing the
              fields such as useClass, useValue, useFactory, and data into an exported variable, which replaces the
              expression.
              <br />

              <h3>6. What is the purpose of any type cast function</h3>
              You can disable binding expression type checking using $any() type cast function.
              <div style={titles}>
                <PrismCode
                  code={typeFunc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. What is Non null type assertion operator</h3>
              You can use the non-null type assertion operator to suppress the Object is possibly 'undefined' error.
              <br />
              <br />
              In the following example, the user and contact properties are always set together, implying that contact is always non-null if user is non-null. The error is suppressed in the example by using contact!.email.
              <div style={titles}>
                <PrismCode
                  code={assertionOpp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. What is type narrowing</h3>
              Dynamic checks and predicates gives us information about values at run-time. type narrowing is the
              process of reflecting this information in the type-checker at compile time.
              <div style={titles}>
                <PrismCode
                  code={narrowing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. What is the purpose of common module</h3>
              The commonly-needed services, pipes, and directives provided by @angular/common module. 
              <br />

              <h3>10. What is angular animation</h3>
              <ul>
                <li>Angular animations are based on CSS web transition functionality, so anything that can be styled or
                  transformed in CSS can be animated the same way in Angular.</li>
                <li>Angular animations allow you to: Set animation timings, styles, keyframes, and transitions.</li>
              </ul>
              <br />

              <h3>11. What is State function</h3>
              Angular's state() function is used to define different states to call at the end of each transition. This function takes two arguments:
              <ul>
                <li>A unique name like open or closed.</li>
                <li><b>A style() function: </b>The style function is used to define a set of styles to associate with a given state name. You
                  need to use it along with state() function to set CSS style attributes.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={stateFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. What is transition function</h3>
              <ul>
                <li>The animation transition function is used to specify the changes that occur between one state and another over a period of time.
                  It accepts two arguments:
                </li>
                <ul>
                  <li>First argument accepts an expression that defines the direction between two transition states.</li>
                  <li>Second argument accepts an animate() function.</li>
                </ul>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={transition}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>13. What is Angular DSL (Domain-specific language)</h3>
              A DSL is a computer language specialized to a particular application domain. Angulard DSL allows us to write
              Angular specific html-like syntax on top of
              normal html. It has its own compiler that compiles this syntax to html that the browser can understand.
              This DSL is defined in NgModules such as animations, forms, routing and navigation.
              <br />
              <br />
              Basically you will see 3 main syntax in Angular DSL.
              <div style={titles}>
                <PrismCode
                  code={dslSyntax}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Explain Lazy Loading in Angular.</h3>
              <ul>
                <li>Lazy loading in Angular Routing brings down the size of large files.</li>
                <li>This is done by lazily loading the files that are required occasionally.</li>
                <li>
                  loadChildren expects a function that uses the dynamic import syntax to import our lazy-loaded module
                  only when it’s needed. Dynamic import is promise-based and gives you access to the module, where the
                  module’s class can be called.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={lazyLoading}
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

export default (withStyles(styles)(MetaData));
