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

const progress = `
//html
{{progress}}
<button (click) = "stop($event)" > Stop</button>


export class AppComponent {
  progress = 0;
  isStop = false;

  ngOnInit(){
    setInterval(()=>{
      if(!this.isStop && this.progress <99){
      this.progress = this.progress + 10
    }
    else{
      if(this.progress==100){
        this.progress=0
      }

      this.progress = this.progress
    }
    },1000)
  }

  stop(){
    this.isStop = !this.isStop
  }
}`.trim();

const pureImpure = `
// import Pure, Impure component in app.module.ts

@Pipe({name: 'purePipe'})
export class Pure   {
  transform(item){
    return item.value  * 2;
  }
}

@Pipe({
  name: 'impurePipe',
  pure: false
  })
export class Impure   {
  transform(item){
    return item.value   * 2;
  }
}

@Component({
  selector: 'app-root',
  template: '
  <h1> pure: {{Object | purePipe}}</h1>
     <h1>impure: {{Object | impurePipe}}</h1>
     <button (click) = 'fun()'> change data</button>
      '})

export class AppComponent  {
Object = {value: 1};
  fun() { this.Object.value++; }
}
`.trim();

class Loader extends Component {
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
              <h3>3. Progress Bar</h3>
              <div style={titles}>
                <PrismCode
                  code={progress}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Pure-Impure Pipe</h3>
              <div style={titles}>
                <PrismCode
                  code={pureImpure}
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

export default withStyles(styles)(Loader);
