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


const dropdownSelect = `
//app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, of, forkJoin, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, switchMap, filter, first, startWith, delay } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Action stream
  private userSelectedSubject = new BehaviorSubject<string>('');
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  // All Users
  users$ = this.http.get<User[]>(this.userUrl)
    .pipe(
      // tap(data => console.log('users', JSON.stringify(data))),
      catchError(err => throwError('Error occurred'))
    );

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  // Uses forkJoin
  dataForUser$ = this.userSelectedAction$
    .pipe(
      // Handle the case of no selection
      filter(userName => Boolean(userName)),
      // Get the user given the user name
      switchMap(userName => this.http.get<User[]>(''$'{this.userUrl}?username = '$'{userName}')
        .pipe(
          // The query returns an array of users, we only want the first one
          map(users => users[0]),
          tap(user => console.log(user)),
          switchMap(user =>
            // Pull in any related streams
            combineLatest([
              this.http.get<ToDo[]>(''$'{this.todoUrl}?userId = '$'{user.id} ')
                .pipe(startWith([] as ToDo[])),
              this.http.get<Post[]>(''$'{this.postUrl}? userId = '$'{user.id}')
                .pipe(startWith([] as Post[]))
            ])
              .pipe(
                tap(data => console.log('data', data)),
                // Map the data into the desired format for display
                map(([todos, posts]) => ({
                  name: user.name,
                  todos: todos,
                  posts: posts
                }) as UserData)
              )
          )
        )
      )
    );

  constructor(private http: HttpClient) { }

  onSelected(userName: string): void {
    this.userSelectedSubject.next(userName);
  }
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  website?: string;
}

export interface UserData {
  name: string;
  posts: Post[];
  todos: ToDo[];
}


//app.module.ts
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
   HttpEventType } from '@angular/common/http';

import { AppComponent } from './app.component';

import { timer, Observable } from 'rxjs';
import { tap, delay, switchMap } from 'rxjs/operators';


@Injectable()
export class PreRequestDelayInterceptor implements HttpInterceptor {
  static count = -2;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timerDelay = timer(5);
    const start = Date.now();

    // Gradually increase the delay
    PreRequestDelayInterceptor.count = PreRequestDelayInterceptor.count > 6 ? 0 : PreRequestDelayInterceptor.count + 2;

    return timerDelay
      .pipe(
        delay(1000 * PreRequestDelayInterceptor.count),
        switchMap(() => next.handle(req)),
        tap(event => {
          if (event.type == HttpEventType.Response) {
            const elapsed = Date.now()-start;
            console.log('Request for '$'{req.urlWithParams} took '$'{elapsed} ms.');
          }
        }));
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule,
    HttpClientModule],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PreRequestDelayInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//app.component.html
<div *ngIf='users$ | async as users'>
	<select (change)="onSelected($event.target.value)">
    <option value="">--Select a user--</option>
    <option *ngFor="let user of users"
            [value]="user.username">{{ user.name }}</option>
  </select>
</div>

<div *ngIf='dataForUser$ | async as data'>
	<h2>Data for: {{data.name}}</h2>
	<table *ngIf="data.todos">
		<thead>
			<tr>
				<th>User</th>
				<th>Title</th>
				<th>Completed?</th>
			</tr>
		</thead>
		<tbody *ngFor="let todo of data.todos">
			<tr>
				<td>{{todo.userId}}</td>
				<td>{{todo.title}}</td>
				<td>{{todo.completed}}</td>
			</tr>
		</tbody>
	</table>
	<p></p>
	<table *ngIf="data.posts">
		<thead>
			<tr>
				<th>User</th>
				<th>Title</th>
				<th>Body</th>
			</tr>
		</thead>
		<tbody *ngFor="let post of data.posts">
			<tr>
				<td>{{post.userId}}</td>
				<td>{{post.title}}</td>
				<td>{{post.body}}</td>
			</tr>
		</tbody>
	</table>
</div>
`.trim();

const dropdowns = `
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '
    <div *ngFor="let hero of heroes" (click)="onSelect(hero)">
      {{hero.id}}
      {{hero.name}}
    </div >

  <div *ngIf="selectedHero">
    <h2>{{selectedHero.name | uppercase}}</h2>
      id: {{selectedHero.id}}
      name: {{selectedHero.name}}
    </div >',
  })

export class AppComponent {
  constructor(private http: HttpClient){}

  heroes:any=[]
  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(val=>{
            this.heroes = val
        })
      }

  selectedHero?;
  onSelect(hero):void {
     this.selectedHero = hero
  }
}

`.trim();


class DropDownAngular extends Component {
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
              <h3>Pick a data from list</h3>
              <div style={titles}>
                <PrismCode
                  code={dropdowns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>On dropdown select data</h3>
              <div style={titles}>
                <PrismCode
                  code={dropdownSelect}
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

export default (withStyles(styles)(DropDownAngular));
