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


const vote = `
//voter.component.ts
@Component({
  selector: 'app-voter',
  template: '
  <h4>{{name}}</h4>
    <button (click) = "vote(true)" [disabled]="didVote">Agree</button>
    <button (click) = "vote(false)" [disabled]="didVote">Disagree</button>
  '
})
export class VoterComponent {
  @Input()  name = '';
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }
}


//votetaker.component.ts
@Component({
  selector: 'app-vote-taker',
  template: '
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
    <app-voter * ngFor="let voter of voters" [name] = "voter"
        (voted) = "onVoted($event)">
    </app-voter>
  '
})

export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Narco', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}


//app.component.ts
@Component({
  selector: 'app-root',
  template: '
    <a href = "#child-to-parent"> Parent listens for child event</a><br/>
        <div id="child-to-parent">
          <app-vote-taker></app-vote-taker>
        </div>
        '})

export class AppComponent { }
`.trim();

const liftOff = `
//astronaut.component.ts
import { Component, Input, OnDestroy } from '@angular/core';

import { MissionService } from './mission.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-astronaut',
  template: '
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button (click) = "confirm()" [disabled]="!announced || confirmed">Confirm</button>
    </p >
  '
})
export class AstronautComponent implements OnDestroy {
  @Input() astronaut = '';
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}


//countdown-parent.component.ts
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component';

@Component({
  selector: 'app-countdown-parent-lv',
  template: '
  <h3>Countdown to Liftoff (via local variable)</h3>
    <button (click) = "timer.start()">Start</button>
      <button (click) = "timer.stop()">Stop</button>
    <div class="seconds">{{timer.seconds}}</div>
    <app-countdown-timer #timer></app-countdown-timer>
',
  styleUrls: ['../assets/demo.css']
})
export class CountdownLocalVarParentComponent { }

//// View Child version
@Component({
  selector: 'app-countdown-parent-vc',
  template: '
  <h3>Countdown to Liftoff(via ViewChild)</h3>
      <button (click) ="start()">Start</button>
      <button (click) ="stop()"> Stop</button>
  <div class="seconds">{{seconds()}}</div>
  <app-countdown-timer></app-countdown-timer>
  ',
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private timerComponent!: CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}


//countdown-timer.component.ts
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  ngOnDestroy() {this.clearTimer();}

  start() {this.countDown();}
  stop()  {
    this.clearTimer();
    this.message = 'Holding at T-'$'{this.seconds} seconds';
  }

  private clearTimer() {clearInterval(this.intervalId);}

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) {this.seconds = 10;} // reset
        this.message = 'T - '$'{this.seconds} seconds and counting';
      }
    }, 1000);
  }
}



//missioncontrol.component.ts
import { MissionService } from './mission.service';

@Component({
  selector: 'app-mission-control',
  template: '
    <h2> Mission Control</h2>
    <button (click) = "announce()"> Announce mission</button>
      <app-astronaut ngFor="let astronaut of astronauts" [astronaut]="astronaut">
    </app-astronaut >
    <h3>History</h3>
    <ul>
      <li *ngFor="let event of history">{{event}}</li>
    </ul >
  ',
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!', Fly to mars!', 'Fly to Vegas!'];
  nextMission = 0;

  constructor(private missionService: MissionService) {
    missionService.missionConfirmed$.subscribe(
      astronaut => {
        this.history.push(''$'{astronaut} confirmed the mission');
      });
  }

  announce() {
    const mission = this.missions[this.nextMission++];
    this.missionService.announceMission(mission);
    this.history.push('Mission "'$'{mission}" announced');
    if (this.nextMission >= this.missions.length) {this.nextMission = 0;}
  }
}


//mission.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
`.trim();



class Vote extends Component {
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
              <h3>1. Vote</h3>
              <div style={titles}>
                <PrismCode
                  code={vote}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Cutdown_liftoff</h3>
              <b>countdown-parent.component</b>
              <br />
              <ul>
                <li>It takes a bit more work to get the child view into the parent component class.</li>
                <li>First, you have to import references to the ViewChild decorator and the AfterViewInit lifecycle hook.
                </li>
                <li>Next, inject the child CountdownTimerComponent into the private timerComponent property using the @ViewChild
                  property decoration.</li>
                <li>The #timer local variable is gone from the component metadata. Instead, bind the buttons to the parent component's
                  own start and stop methods and present the ticking seconds in an interpolation around the parent component's seconds
                  method.</li>
                <li>These methods access the injected timer component directly.</li>
                <li>The ngAfterViewInit() lifecycle hook is an important wrinkle. The timer component isn't available until after
                  Angular displays the parent view. So it displays 0 seconds initially.</li>
                <li>Then Angular calls the ngAfterViewInit lifecycle hook at which time it is too late to update the parent view's
                  display of the countdown seconds. Angular's unidirectional data flow rule prevents updating the parent view's in the
                  same cycle. The application has to wait one turn before it can display the seconds.</li>
                <li>Use setTimeout() to wait one tick and then revise the seconds() method so that it takes future values from the timer
                  component.</li>
              </ul>
              <br />
              <b>mission.service</b>
              <ul>
                <li>A parent component and its children share a service whose interface enables bi-directional communication within the
                  family.</li>
                <li>The scope of the service instance is the parent component and its children. Components outside this component subtree have
                  no access to the service or their communications.</li>
                <li>This MissionService connects the MissionControlComponent to multiple AstronautComponent children.</li>
              </ul>
              <br />
              <b>MissionControl</b>
              <ul>
                <li>The MissionControlComponent both provides the instance of the service that it shares with its children (through the
                  providers metadata array) and injects that instance into itself through its constructor:</li>
                <li>The AstronautComponent also injects the service in its constructor. Each AstronautComponent is a child of the
                  MissionControlComponent and therefore receives its parent's service instance:</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={liftOff}
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

export default (withStyles(styles)(Vote));
