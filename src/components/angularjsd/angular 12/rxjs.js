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

const subscribes=`
.subscribe(
  (data => console.log(data),
  (err => console.log(err),
  (() => console.log('complate'))
)`.trim();

const rxjsfrom=`
//import { from } from 'rxjs';
export class AppComponent  {
  ngOnInit(){
    const data = from(fetch('https://jsonplaceholder.typicode.com/posts'));

    data.subscribe({
      next(res) { console.log(res); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
  }
}
`.trim();

const mapfil=`
//import { of } from 'rxjs';
//import { map } from 'rxjs/operators';

export class AppComponent  {
  val:any=[];
  
  ngOnInit(){
    const nums = of(1, 2, 3);

    const squr = map((val: number) => val * val);
    const sqNum = squr(nums);

    sqNum.subscribe(x => this.val.push(x));
  }
}
`.trim();

const mapipe=`
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

const stcreate=`
//import { Component, ElementRef, ViewChild } from '@angular/core';
//import { fromEvent } from 'rxjs';

export class AppComponent  {
  constructor(){}
  @ViewChild('addBtn')
  addBtn!: ElementRef;

  //stream create
  ngAfterViewInit(){
    fromEvent(this.addBtn.nativeElement, 'click').subscribe(res=>{
      console.log(res)
    })
  }
}
`.trim();

const unsubscribe=`
//import { interval, Subscription } from 'rxjs';
export class AppComponent  {
  intervalval=0;
  videoSub!: Subscription;

  ngOnInit(){
    const broadcast = interval(1000)
    this.videoSub = broadcast.subscribe(res=>{
      this.intervalval = res;

      if(res>5){
        this.videoSub.unsubscribe()
      }
    })
  }
}
`.trim();

const throttleTime = `
var observable = Rx.Observable.interval(1000);
var observer = {
  next: function (value) {
    console.log(value);
  }
};

observable.map(function (value) {
  return 'Number: ' + value;
}).throttleTime(1900).subscribe(observer);
`.trim();

const fixrxjs = `
var subject = new Rx.Subject();

subject.subscribe({
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log('Complete');
  }
});

subject.subscribe({
  next: function (value) {
    console.log(value);
  }
});

subject.next('A new data piece');
subject.complete();
subject.next('New value');
`.trim();

const filter = `
import {interval} from 'rxjs';
import {filter, map} from "rxjs/operators";

const observable = interval(100).pipe(filter(data=>{
  return data<5
}));

observable.subscribe(data => {
  console.log(data);
})
`.trim();

const rxjxLibrary = `import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';`.trim();

const observableFun = `import { from } from 'rxjs'; // from function
const data = from(fetch('/api/endpoint')); //Created from Promise
data.subscribe({
 next(response) {console.log(response);},
 error(err) {console.error('Error: ' + err);},
 complete() {console.log('Completed');}
});`.trim();

const observableAJAX = `
import { ajax } from 'rxjs/ajax'; // ajax function
const apiData = ajax('/api/data'); // Created from AJAX request
// Subscribe to create the request
apiData.subscribe(res => console.log(res.status, res.response));`.trim();

const observableCount = `
import { interval } from 'rxjs'; // interval function
const secondsCounter = interval(1000); // Created from Counter value
secondsCounter.subscribe(n =>
  console.log('Counter value: '$'{n}'));`.trim();

const observableEvt = `
import { fromEvent } from 'rxjs';
const el = document.getElementById('custom-element');
const mouseMoves = fromEvent(el, 'mousemove');
const subscription = mouseMoves.subscribe((e: MouseEvent) => {
  console.log('Coordnitaes of mouse pointer: '$'{e.clientX} * '$'{e.clientY}');
  });`.trim();

const placeholders = `
//app.component.ts
import {PlaceholderService} from "./services/placeholder.service"

@Component({
  selector: 'app-root',
  template: '
  <button (click)="getApi()">GET</button>
    <div *ngFor="let items of data">
      <p>{{items.id}} - {{items.title}}</p>
    </div>
  ',
})

export class AppComponent implements OnInit{
  data:Array<any>;
  
  constructor( private https:PlaceholderService) { 
    this.data=new Array<any>()
   }

  ngOnInit(): void {}
  getApi(){
    this.https.getData().subscribe((data)=>{
      this.data=data
    })
  }
}


//services/placeholder.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  constructor(private http:HttpClient) { }

  getData(): Observable<any>{
    const url="https://jsonplaceholder.typicode.com/posts";
    return this.http.get<any>(url)
  }
}
`.trim();

const notifications = `
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}
`.trim();


class Rxjs extends Component {
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
            <h3>1. What is HttpClient, and what are its benefits?</h3>
                Angular applications communicate with backend services over HTTP protocol using HttpClient which is based on top of the XMLHttpRequest interface.
                <br/>
                <b>advantages:</b>
                <ul>
                  <li>Contains testability features</li>
                  <li>Provides typed request and response objects</li>
                  <li>Intercept request and response</li>
                  <li>Supports Observable APIs</li>
                  <li>Supports streamlined error handling</li>
                </ul>
                <br/>
                <b>HttpClient implement 'Simplified syntax for headers' while, HTTP not.</b>
              <br/>

              <h3>2. Rxjs With Pure Js (Reactive Extension for JavaScript)</h3>
              <ul>
                <li>Rxjs is an external library, which used in reactive programming. we use observable to achieve asynchronous task.</li>
                <li>Reactive Programming is programming with asynchronous data streams.</li>
              </ul>
              <br/>

              <ul>
                <li>Rxjs can use non-angular projects.</li>
                <li>In angular project Rxjs not need to install because it come with angular.</li>
                <li>RxJS makes it easy for JavaScript developers to write asynchronous code using composable Observables 
                    instead of callbacks and Promises.</li>
              </ul>
              <br/>

              <ul>
                <li>Observables introduced in Rxjs. it's a data source. Observables work on data stream. to use those 
                    stream data we need to subscribe. For subscribe observables data we use Observer. Observer is not 
                    useful untill it subscribe. </li>
                <li>Observables deals with synchronous and asynchronous both.</li>
              </ul>
              <br/>

              <ul>
                <b>Create Observables stream: </b><br/>
                <li>User input(click button)</li>
                <li>Http Request</li>
                <li>Array</li>
                <li>Objects</li>
                <br/>
                <br/>
                <b>Observable handle(Subscribe): </b><br/>
                <li>Data</li>
                <li>Error</li>
                <li>Completion</li>
              </ul>
              <br/>
              <b>Subscribe accept 3 values: </b>
              <br/>
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
                <li>Observables are declarative which provide support for passing messages between publishers and subscribers in 
                  our application.</li><br/>
                <li>They are mainly used for event handling, asynchronous programming, and handling multiple values. In this case,
                   you define a function for publishing values, but it is not executed until a consumer subscribes to it. The 
                   subscribed consumer then receives notifications until the function completes, or until they unsubscribe.</li>
              </ul>
              <br/>

              <h3>4. What is an Observer?</h3>
              Observer is an interface for a consumer of push-based notifications delivered by an Observable. It has below structure.
              <div style={titles}>
                <PrismCode
                  code={notifications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. What is Subscribing</h3>
              <ul>
                <li>A Subscription is an object that represents a disposable resource, usually the execution of an Observable.</li>
                <li>A Subscription has one important method, unsubscribe, that takes no argument and just disposes of the resource 
                  held by the subscription.</li>
              </ul>
              <br />

              <h3>6. What will happen if you do not supply handler for observer</h3>
              Normally an observer object can define any combination of next, error and complete notification type handlers. If 
              you don't supply a handler for a notification type, the observer just ignores notifications of that type.
              <br />

              <h3>7. What is RxJS With Angular</h3>
              RxJS is a library for composing asynchronous and callback-based code in a functional, reactive style using Observables. Many APIs such as HttpClient produce and consume RxJS Observables and also uses operators for processing observables.
              <div style={titles}>
                <PrismCode
                  code={rxjxLibrary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. What are the utility functions provided by RxJS</h3>
              The RxJS library also provides below utility functions for creating and working with observables.
              <ul>
                <li>Converting existing code for async operations into observables</li>
                <li>Iterating through the values in a stream</li>
                <li>Mapping values to different types</li>
                <li>Filtering streams</li>
                <li>Composing multiple streams</li>
              </ul>
              <br />

              <h3>9. What are observable creation functions</h3>
              RxJS provides creation functions for the process of creating observables from things such as promises, events, timers and Ajax requests.
              <br />
              <b>1. Create an observable from a promise</b>
              <div style={titles}>
                <PrismCode
                  code={observableFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. What does subscribing mean in RxJS?</h3>
              In RxJS, when using observables, we need to subscribe to an observable to use the data that flows through that 
              observable. This data is generated from a publisher and is consumed by a subscriber. When we subscribe to an 
              observable, we pass in a function for the data and another function for errors so that, in case there is some error, 
              we can show some message or process the message in some way.
              <br/>

              <h3>From</h3>
              <div style={titles}>
                <PrismCode
                  code={rxjsfrom}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
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

              <h3>Stream create</h3>
              <div style={titles}>
                <PrismCode
                  code={stcreate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Unsubscribe</h3>
              <div style={titles}>
                <PrismCode
                  code={unsubscribe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>RxJS OPERATORS LIKE map() OR throttleTime()</h3>
              <div style={titles}>
                <PrismCode
                  code={throttleTime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>RxJS SUBJECT (~EventEmitter)</h3>
              <div style={titles}>
                <PrismCode
                  code={fixrxjs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              

              <b>2. Create an observable that creates an AJAX request</b>
              <div style={titles}>
                <PrismCode
                  code={observableAJAX}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>3. Create an observable from a counter</b>
              <div style={titles}>
                <PrismCode
                  code={observableCount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>4. Create an observable from an event</b>
              <div style={titles}>
                <PrismCode
                  code={observableEvt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Filter</h3>
              This operator takes values from the source Observable, passes them through a predicate function and only emits those values that get TRUE.
              <div style={titles}>
                <PrismCode
                  code={filter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Placeholders</h3>
              <div style={titles}>
                <PrismCode
                  code={placeholders}
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

export default (withStyles(styles)(Rxjs));
