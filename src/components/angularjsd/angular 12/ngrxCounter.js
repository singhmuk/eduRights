import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Ngrx from '../../../assets/ngrx.png';


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


const counters = `
//app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


//app.component.ts
import { Component } from "@angular/core";
import {Store} from "@ngrx/store";
import { Observable } from "rxjs";
import {increment, decrement, reset} from "./counter.actions";

@Component({
  selector:'app-root',
  template:'
    <button id="increment" (click)="increment()">Increment</button>
            {{count | async}}
    <button id="decrement" (click)="decrement()">Decrement</button>
    <button id="reset" (click)="reset()">Reset</button>
  '
})

export class AppComponent{
  count:Observable<number>;

  constructor(private store: Store<{count:number}>){
    this.count=store.select('count')
  }

  increment(){
    this.store.dispatch(increment())
  }

  decrement(){
    this.store.dispatch(decrement())
  }

  reset(){
    this.store.dispatch(reset())
  }
}
`.trim();

const ngrxcounters = `
//counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');


//counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);
`.trim();

const addcomponents = `
//app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { todoReducer } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ todoState: todoReducer })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


//app.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from './interfaces';
import { Add, Remove } from './actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'my-app',
  template:'
  <form>
    	<input type="text" placeholder="Add new TODO task" [(ngModel)]="newTodoText" [ngModelOptions]="{standalone: true}"/>
      <button type="submit" (click)="addTodo()">Add</button>
  </form>
  <div *ngFor="let todo of todos | async">
    <span>{{todo.text}}</span>
    <div>
      <button (click)="removeTodo(todo.id)">Delete</button>
    </div>
  </div>
  '
})
export class AppComponent {
  todos: Observable<Todo[]>;
  newTodoText: string = "";
  constructor(private store: Store<{ todoState: Array<Todo> }>) {
    this.todos = store.select(state => state.todoState);
  }
  addTodo() {
    this.store.dispatch(Add({ text: this.newTodoText || 'Untitled task' }));
    this.newTodoText = '';
  }

  removeTodo(id:any) {
    this.store.dispatch(Remove({ id }));
  }
}
`.trim();

const ngrxcomponents = `
//interfaces.ts
export interface Todo {
  text: string;
  todo: boolean;
  id: string;
}


//actions.ts
import {createAction, props} from '@ngrx/store';

export const Add = createAction('[Todo Component] Add', props<{text: string}>());
export const Remove = createAction('[Todo Component] Remove', props<{id: string}>());
export const Toggle = createAction('[Todo Component] Toggle', props<{id: string}>());


//reducers.ts
import { createReducer, on } from '@ngrx/store';
import { Todo } from './interfaces';
import { Add, Remove, Toggle } from './actions';
import * as uuid from 'uuid';

const initialState: Array<Todo> = [];

export const todoReducer = createReducer(initialState,
  on(Add, (state, action) => ([...state, { id: uuid.v4(), text: action.text, todo: true }])),
  on(Remove, (state, action) => state.filter(i => i.id !== action.id)),
  on(Toggle, (state, action) => state.map(i => i.id === action.id ? {...i, todo: !i.todo} : i)),
)
`.trim();


class NgrxCounter extends Component {
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
              <h3>Counter</h3>
              <div style={titles}>
                <PrismCode
                  code={counters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>ngrxcounters</b>
              <div style={titles}>
                <PrismCode
                  code={ngrxcounters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Add - Delete</h3>
              <div style={titles}>
                <PrismCode
                  code={addcomponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>ngrxadd</b>
              <div style={titles}>
                <PrismCode
                  code={ngrxcomponents}
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

export default (withStyles(styles)(NgrxCounter));
