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


const pipeFor = `
@Component({
  selector: 'app-birthday',
  template: '<p> Birthday is {{birthday | date}}</p>'
})
export class BirthdayComponent {
  birthday = new Date(1987, 6, 18); 
}`.trim();

const paraPipes = `
@Component({
      selector: 'app-birthday',
      template: '<p> Birthday is {{birthday | date: 'dd/MM/yyyy'}}</p>' // 18/06/1987
    })
    export class BirthdayComponent {
      birthday = new Date(1987, 6, 18);
    }`.trim();

const chainPipe = `
@Component({
          selector: 'app-birthday',
          template: '<p> Birthday is {{birthday | date: 'fullDate' | uppercase}} </p>' // THURSDAY, JUNE 18, 1987
        })
        export class BirthdayComponent {
          birthday = new Date(1987, 6, 18);
        }`.trim();

const flag = `
@Pipe({
  name: 'flyingHeroesImpure',
  pure: false
})`.trim();

const purpose = `
@Component({
  selector: 'async-observable-pipe',
  template: '<div> <code>observable|async</code>:
  Time: {{time | async}}</div >'
})
export class AsyncObservablePipeComponent {
  time = new Observable(observer =>
    setInterval(() => observer.next(new Date().toString()), 2000)
  );
}`.trim();


// const projection = ``.trim();



class AngularPipes extends Component {
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
              <h3>1. Pipes</h3>
              <ul>
                <li>A pipe takes in data as input and transforms it to a desired output. </li>
                <li>Using pipe operator (|), we can apply the pipe's features to any of property in app.</li>
                <li>Pipes used to transform the data before displaying it in a browser. Even we can create custom pipes.
                </li>
                <br />
                <li><b>Parameterize Pipes:</b>  we can pass any number of Parameters to the pipe using colon (:).</li>
                <li>Mutiple Pipes</li>
                <li>Pipes with string</li>
              </ul>
              <br />
              <b>Ex. </b>DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe.
              <br/>
              Let us take a pipe to transform a component's birthday property into a human-friendly date using date pipe.
              <br />
              <div style={titles}>
                <PrismCode
                  code={pipeFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Steps to create custom pipe: </b>
                <ol>
                  <li>Creates a TypeScript class.</li>
                  <li>Decorate the class with "@Pipe" decorator.</li>
                  <li>Implements PipeTransform interface in TypeScript class.</li>
                  <li>Override the transform() method.</li>
                  <li>Configure the class with @NgModule.</li>
                </ol>
              <br/>

              <h3>2. What is a parameterized pipe</h3>
              The parameterized pipe can be created by declaring the pipe name with a colon ( : ) and then the
              parameter value.
              <br />
              <b>Ex. </b>Let's take a birthday example with a particular format(dd/MM/yyyy):
              <div style={titles}>
                <PrismCode
                  code={paraPipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>N: The parameter value can be any valid template expression, such as a string literal or a component property.</b>
              <br />
              <br />

              <h3>3. How do you chain pipes</h3>
              Let's take a birthday property which uses date pipe(along with parameter) and uppercase pipes as below.
              <div style={titles}>
                <PrismCode
                  code={chainPipe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <ul>
                <li>There are two categories of pipes: <b>pure and impure</b>. Pipes are pure by default.</li>
                <li>You make a pipe impure by setting its pure flag to false.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={flag}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <ul>
                <b>Pure pipes: </b>
                <br />
                <li>Angular executes a pure pipe only when it detects a pure change to the input value. A pure change is either a change to a primitive input value (String, Number, Boolean, Symbol) or a changed object reference (Date, Array, Function, Object).</li>
                <li>Angular ignores changes within (composite) objects. It won't call a pure pipe if you change an input month, add to an input array, or update an input object property.</li>
                <li>This may seem restrictive but it's also fast. An object reference check is fast—much faster than a deep check for differences—so Angular can quickly determine if it can skip both the pipe execution and a view update.</li>
                <li>A pure pipe uses pure functions. Pure functions process inputs and return values without detectable side effects. Given the same input, they should always return the same output.</li>
                <br />
                <b>Impure pipes:</b>
                <br />
                <li>Angular executes an impure pipe during every component change detection cycle. An impure pipe is called as every keystroke or mouse-move.</li>
              </ul>
              <br />

              <h3>4. What is the purpose of async pipe</h3>
              The AsyncPipe subscribes to an observable or promise and returns the latest value it has emitted. When a new value is emitted, the pipe marks the component to be checked for changes.
              <br />
              <br />
              Let's take a time observable which continuously updates the view for every 2 seconds with the current time.
              <div style={titles}>
                <PrismCode
                  code={purpose}
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

export default (withStyles(styles)(AngularPipes));
