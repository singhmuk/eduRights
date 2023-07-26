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

const subscribes = `
obs.subscribe({
  next:(data)=>console.log('obj',data),
  error:(err)=>console.log('obj',err),
  complete:()=>console.log('complate'),
})`.trim();

const mapfil = `
//html
<div *ngFor="let post of posts">{{ post.title }}</div>

export class AppComponent {
  posts: any = [];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((res: any) => res.slice(0, 5)))
      .subscribe((res: any) => {
        this.posts = res;
      });
  }
}
`.trim();

const mergemaps = `
//html
{{ data }}

export class AppComponent {
data: any;
constructor(private http: HttpClient) {}

ngOnInit() {
  this.http.get('https://jsonplaceholder.typicode.com/posts/1')
    .pipe(mergeMap((post: any) =>
        this.http.get('https://jsonplaceholder.typicode.com/users/'$'{post.userId}')
      )
    )
    .subscribe((user: any) => {
      this.data = 'User: '$'{user.id}, Post Title: '$'{user.name}';
    });
  }
}
`.trim();

const catchError = `
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export class AppComponent {
  errorMessage!: string;

  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get('https://api.example.com/data').pipe(catchError((error) => {
          this.errorMessage = error.message;
          return throwError(error);
        })
      )
      .subscribe((data) => console.log(data));
  }
}
`.trim();

const takeUntils = `
//html
<button (click)="start()">Start</button>
<button (click)="stop()">Stop</button>
{{ message }}


import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class AppComponent {
  private destroy$: Subject<void> = new Subject<void>();
  message!: string;

  start(): void {
    const interval$: Observable<number> = interval(1000);
    interval$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => (this.message = 'Count: '$'{count}'));
  }

  stop(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
`.trim();

const debounceTimes = `
//html
<input type="text" [formControl]="searchControl" placeholder="Search..." />
<li *ngFor="let item of filteredItems">{{ item }}</li>


import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

export class AppComponent {
  searchControl = new FormControl();
  items = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  filteredItems: string[] = [];

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredItems = this.items.filter((item) => item.includes(value));
      });
  }
}
`.trim();

const mapipe = `
//import { of } from 'rxjs';
//import { filter, map } from 'rxjs/operators';

export class AppComponent  {
  val:any=[];

  ngOnInit(){
    const squareOdd = of(1, 2, 3, 4, 5)
    .pipe(
      filter(n => n % 2 !== 0),
      map(n => n * n)
    );

    squareOdd.subscribe(x => this.val.push(x));
  }
}
`.trim();

const filter = `
//html
<div *ngFor="let num of numbers">{{ num }}</div>


import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

export class AppComponent {
  numbers: any = [];

  constructor() {
    from([1, 2, 3, 4, 5, 6])
      .pipe(filter((num) => num % 2 === 0))
      .subscribe((num) => this.numbers.push(num));
  }
}
`.trim();

const placeholders = `
//html
<div *ngFor="let item of items$ | async">{{ item }}</div>


import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AppComponent {
  items$: Observable<string[]>;

  constructor() {
    this.items$ = this.getData().pipe(
      tap(data => console.log('Data:', data))
    );
  }

  getData(): Observable<string[]> {
    return of(['item 1', 'item 2', 'item 3']);
  }
}
`.trim();

const otsbservable = `
import { Observable } from "rxjs/Observable";

const obs = new Observable((observer)=>{
  let counter=1;
  const producer = setInterval(()=>{
    observer.next(counter++)
  },1000)
})

const sub = obs.subscribe({
  next:(data)=>console.log('obj1',data),
  error:(err)=>console.log('obj1',err),
  complete:()=>console.log('complate'),
})

setTimeout(()=>{
  sub.unsubscribe();
},5000)`.trim();

const otsbservable6 = `
//html
{{ data$ | async }}

import { from } from 'rxjs';
export class AppComponent {
  data$ = from([1, 2, 3, 4, 5]);

  constructor() {
    this.data$.subscribe((value) => console.log(value));
  }
}
`.trim();

const otsbservable7 = `
//html
<button #myButton>Click me!</button>


import { fromEvent } from 'rxjs';
export class AppComponent {
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    const button = this.elRef.nativeElement.querySelector('button');
    const click$ = fromEvent(button, 'click');

    click$.subscribe((event) => {
      console.log('Button clicked!');
    });
  }
}
`.trim();

const otsbservable9 = `
<p>{{ count }}</p>

import { timer } from 'rxjs';
export class AppComponent {
  count: number = 0;

  constructor() {
    const source = timer(0, 1000); // emits a value after a delay of 0ms, then every 1000ms

    source.subscribe((val) => {
      this.count = val;
    });
  }
}
`.trim();

const otsbservable11 = `
import { generate } from "rxjs";

generate({
  initialState: 1,
  condition: (a) => a < 10,
  iterate: (a) => a + 1,
  resultSelector: (b: number) => "Count" + b,
}).subscribe(console.log);
`.trim();

const otsbservable12 = `
import { ajax } from "rxjs/ajax";

const http3$ = ajax({
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    Authorization: "Bearer",
    Accept: "application/json",
  },
  body: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
});
http3$.subscribe({
  next: (res) => {
    console.log(res.response);
  },
  error: (err) => {
    console.log("Error", err);
  },
});


//if response come from server is html type
const http5$ = ajax({
  url: "https://jsonplaceholder.typicode.com/posts",
  responseType: "text",
});
http5$.subscribe({
  next: (res) => {
    console.log(res.response);
  },
  error: (err) => {
    console.log("Error", err);
  },
});

//post
const http6$ = ajax.post(
  "https://jsonplaceholder.typicode.com/posts",
  { Hi: "Hello" },
  {
    Authorizaion: "Beares",
  }
);
http6$.subscribe({
  next: (res) => {
    console.log(res.response);
  },
  error: (err) => {
    console.log("Error", err);
  },
});
`.trim();

const otsbservable15 = `
import { from, concat, of } from "rxjs";

const num$ = of(1, 2, 3);
const names$ = from(["Mukesh", "Rakesh"]);

concat(num$, names$).subscribe(console.log);`.trim();

class Rxjs extends Component {
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
              <h3>1. What is HttpClient, and what are its benefits?</h3>
              HttpClient is a module in Angular that provides a way to make HTTP
              requests to external APIs or resources. It is a powerful tool for
              retrieving and sending data over HTTP, and it provides several
              benefits over other methods of making HTTP requests.
              <br />
              <b>Advantages:</b>
              <ul>
                <li>
                  <b>Easy to use: </b>HttpClient simplifies the process of
                  making HTTP requests by providing a simple and consistent API
                  for sending and receiving data.
                </li>
                <br />
                <li>
                  <b>Type safety: </b>HttpClient supports TypeScript, which
                  provides type safety for HTTP requests and responses. This
                  means that developers can catch errors at compile time, rather
                  than runtime.
                </li>
                <br />
                <li>
                  <b>Interceptors: </b>HttpClient provides interceptors that
                  allow developers to modify HTTP requests or responses before
                  they are sent or received. This can be useful for adding
                  headers, handling errors, or caching responses.
                </li>
                <br />
                <li>
                  <b>Observables: </b> HttpClient returns Observables by
                  default, which allows for easier handling of asynchronous
                  data. Observables can also be easily combined with other RxJS
                  operators for complex data manipulation.
                </li>
                <br />
                <li>
                  <b>Testing: </b>HttpClient can be easily mocked and tested,
                  which makes it easier to write unit tests for code that relies
                  on HTTP requests.
                </li>
              </ul>
              <br />
              <br />
              <h3>2. Rxjs With Pure Js (Reactive Extension for JavaScript)</h3>
              <ul>
                <li>
                  RxJS is a library for reactive programming using Observables,
                  which makes it easier to compose asynchronous or
                  callback-based code. It provides a way to work with
                  asynchronous data streams in a more functional and declarative
                  way.
                </li>
                <br />

                <li>
                  Some of the key features of RxJS include operators for
                  filtering, transforming, and combining data streams, error
                  handling, and cancellation. It also provides a variety of
                  utility functions for working with Observables, such as
                  merging or combining them, or transforming them into Promises.
                </li>
                <br />

                <li>
                  Observables introduced in Rxjs. it's a data source.
                  Observables work on data stream. to use those stream data we
                  need to subscribe. For subscribe observables data we use
                  Observer. Observer is not useful untill it subscribe.{" "}
                </li>
                <br />
                <li>
                  Observables deals with synchronous and asynchronous both.
                </li>
              </ul>
              <br />
              <ul>
                <b>Create Observables stream: </b>observable can be created
                using the Observable constructor.
                <br />
                <li>User input(click button)</li>
                <li>Http Request</li>
                <li>Array</li>
                <li>Objects</li>
              </ul>
              <br />
              <b>Subscribe accept 3 values: </b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={subscribes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. What are Observables?</h3>
              <ul>
                <li>
                  Observables are declarative which provide support for passing
                  messages between publishers and subscribers in our
                  application.
                </li>
                <br />
                <li>
                  They are mainly used for event handling, asynchronous
                  programming, and handling multiple values. In this case, you
                  define a function for publishing values, but it is not
                  executed until a consumer subscribes to it. The subscribed
                  consumer then receives notifications until the function
                  completes, or until they unsubscribe.
                </li>
              </ul>
              <br />
              <h3>4. What is an Observer?</h3>
              Observer is an interface for a consumer of push-based
              notifications delivered by an Observable. It has three values{" "}
              <b>next, error, complate</b>.
              <br />
              <br />
              <h3>
                5. What will happen if you do not supply handler for observer
              </h3>
              Normally an observer object can define any combination of next,
              error and complete notification type handlers. If you don't supply
              a handler for a notification type, the observer just ignores
              notifications of that type.
              <br />
              <br />
              <h3>6. What are the utility functions provided by RxJS</h3>
              It provides a wide range of utility functions for working with
              Observables and performing common data manipulation tasks.
              <ul>
                <li>
                  <b>map: </b>This function transforms each value emitted by an
                  Observable by applying a function to it.
                </li>
                <br />
                <li>
                  <b>filter: </b>This function filters out values emitted by an
                  Observable that do not meet a certain condition.
                </li>
                <br />
                <li>
                  <b>tap: </b>This function allows you to perform side effects
                  (such as logging) on the values emitted by an Observable,
                  without modifying them.
                </li>
                <br />
                <li>
                  <b>tap: </b>used to perform side effects for each emission in
                  a stream, without modifying the emission itself.
                </li>
                <br />
                <li>
                  <b>mergeMap: </b>This function is similar to switchMap(), but
                  it merges the resulting Observables, rather than cancelling
                  the previous one.
                </li>
                <br />
                <li>
                  <b>catchError: </b>This function catches errors emitted by an
                  Observable and returns a new Observable with a default value
                  or error handling logic.
                </li>
                <br />
                <li>
                  <b>takeUntil: </b>Used to unsubscribe from observables when a
                  certain condition is met.
                </li>
                <br />
                <li>
                  <b>debounceTime: </b> This function emits a value from an
                  Observable only after a specified amount of time has passed
                  since the last emission.
                </li>
                <br />
                <li>
                  <b>distinctUntilChanged: </b>This function only emits a value
                  from an Observable if it is different from the previous
                  emission.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                What is the difference between a cold observable and a hot
                observable.
              </h3>
              The difference between a cold observable and a hot observable is
              related to how they handle subscriptions and the timing of data
              emission.
              <ul>
                <li>
                  <b>Cold observable: </b>Starts emitting data only when a
                  subscription is made to it. Each subscription to a cold
                  observable creates a separate execution of the observable, so
                  each subscriber will receive the same sequence of data
                  starting from the beginning. In other words, a cold observable
                  starts from scratch for each subscriber.
                </li>
                <br />
                <li>
                  <b>Hot observable: </b>Is already emitting data when the
                  subscription is made. The hot observable does not start a new
                  execution for each subscriber, but all subscribers receive the
                  same sequence of data from the point at which they subscribed.
                  The data emission is shared among subscribers, and late
                  subscribers might miss some data that was emitted before they
                  subscribed.
                </li>
              </ul>
              <br />
              <br />
              <h3>7. What are observable creation functions</h3>
              RxJS provides creation functions for the process of creating
              observables from things such as promises, events, timers and Ajax
              requests.
              <br />
              <br />
              <h3>10. What does subscribing mean in RxJS?</h3>
              <ul>
                <li>
                  In RxJS, subscribing means that you are creating an Observer
                  that listens for values emitted by an Observable. When you
                  subscribe to an Observable, you are essentially setting up a
                  pipeline for data to flow from the Observable to the Observer.
                </li>
              </ul>
              <br />
              <br />
              <b>1. Observable</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>6. from: </b>from get values from iterable item.
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable6}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>9. timer</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable9}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>11. generate </b>Allows you to create an Observable that emits
              a sequence of values, based on a generator function that you
              provide.
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable11}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>15. concat</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable15}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Pipe</h3>
              pipe() function is also a method on the RxJS Observable.
              <div style={titles}>
                <PrismCode
                  code={mapipe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Filter</h3>
              This operator takes values from the source Observable, passes them
              through a predicate function and only emits those values that get
              TRUE.
              <div style={titles}>
                <PrismCode
                  code={filter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Tap</h3>
              <div style={titles}>
                <PrismCode
                  code={placeholders}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>7. fromEvent: </b>
              <br />
              fromEvent function can be used in Angular to create an Observable
              that emits events from a DOM element. Here's an example of using
              fromEvent to detect button click events in an Angular component:
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable7}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Map</h3>
              <div style={titles}>
                <PrismCode
                  code={mapfil}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>mergeMap</h3>
              <div style={titles}>
                <PrismCode
                  code={mergemaps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>catchError</h3>
              <div style={titles}>
                <PrismCode
                  code={catchError}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>takeUntil</h3>
              <div style={titles}>
                <PrismCode
                  code={takeUntils}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>debounceTime</h3>
              <div style={titles}>
                <PrismCode
                  code={debounceTimes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>12. ajax</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={otsbservable12}
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

export default withStyles(styles)(Rxjs);
