import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import GitLogo from "../../../assets/git_imgs.PNG"


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
}

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



class Skills extends Component {
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
              <h3></h3>
              <ul>
                <li>May god bless you.</li>
                <li>I'm on the way.</li>
                <li>Do you speak english.</li>
                <li>Could you please repeat that.</li>
                <li>I didn't understand.</li>
                <li>What are you taiking about.</li>
                <li>Stay away from my stuff (Mere chizo se door raho).</li>
                <li>Can i ask you something.</li>
                <li>It was nice meeting you.</li>
                <li>Sorry for the inconvenience.</li>
                <li>What can i do for you.</li>
                <li>Could you help me with this.</li>
                <li>Where is your office.</li>
                <li>I'll try my level best.</li>
                <li>Tell me your addres.</li>
                <li>I'm sorry to interrupt you.</li>
                <li>How can i go to the city.</li>
                <li>Do me a favor.</li>
                <li>I haven't done my home work.</li>
                <li>You will not be able to deal with him.</li>
                <li>I have a lot to talk about.</li>
              </ul>
              <br />

              <h3></h3>
              <ul>
                <li>I've just come back to my trip to india.</li>
                <li>My friend was attending a conference there.</li>
                <li>And she convinced me to tag along.</li>
                <li>Do you like Indian food.</li>
                <li>Have you been to India (Aap bhaarat kabhee gaye ho).</li>
                <li>How long have you been studying english.</li>
                <li>How old are you.</li>
                <li>What did you say.</li>
                <li>What's your phone number.</li>
                <li>Where are you from.</li>
                <li>Where did you learn english.</li>
                <li>Where do you work.</li>
                <li>Where's the bathroom.</li>
              </ul>
              <br />

              <h3></h3>
              <ul>
                <li>I brought you something special.</li>
                <li>Take a break i'll do the cleaning today.</li>
                <li>The budget is unlimited.</li>
                <li>There'll be a bonus at the end of the month.</li>
                <li>You did a great job.</li>
                <li>How much is this.</li>
                <li>This isn't what i ordered.</li>
                <li>Could we have the menu, please (क्या हमारे पास मेनू हो सकता है, कृपया).</li>
                <li>Do you have any vegetarian dishes.</li>
                <li>Could you take a picture of me, please.</li>
                <li>I'd like to have a non-smoking seat, please.</li>
                <li>Could i get a map.</li>
                <li>I think i ate something good.</li>
                <li>I can't find the way back to my codes.</li>
                <li>Is there a pharmacy nearby.</li>
              </ul>
              <br />

              <h3></h3>
              <ul>
                <li>Let me check if we have butter.</li>
                <li>You're listening to the weather forecast.</li>
                <li>Sun will start coming out again.</li>
                <li>I think it makes the text a little too small.</li>
                <li>Which design did they decide on.</li>
                <li>I did'n realize she was sad.</li>
                <li>Is there anything good here.</li>
                <li>What do you recommend.</li>
                <li>Anything to drink.</li>
                <li>She is so annoying.</li>
                <li>I don't want to talk to her anymore.</li>
              </ul>
              <br />

              <h3></h3>
              <ul>
                <li>I found it on the internet.</li>
                <li>You can keep it.</li>
                <li>Do you have an idea.</li>
                <li>Of course i do.</li>
                <li>Something smells bad.</li>
                <li>That's not enough.</li>
                <li>Can you come back later.</li>
                <li>Where do you live.</li>
                <li>How long have you lived there.</li>
                <li>Have you heard the news.</li>
                <li>The book is under the table.</li>
                <li>Let me know if you find.</li>
                <li>Can you carry this for me.</li>
                <li>This isn't heavy at all.</li>
                <li>It's next to the pharmacy.</li>
                <li>We have to wait in line.</li>
                <li>I'm not ready yet.</li>
                <li>I'm looking for my brother.</li>
                <li>You need to make a decision soon.</li>
                <li>How long does the trip take.</li>
                <li>I have a lot of things to do today.</li>
                <li>What is this made of.</li>
                <li>How many languages do you speak.</li>
                <li>How do you spell it.</li>
                <li>Do you know how it solved.</li>
                <li>He prevented me from going to the event.</li>
                <li>Let's get something to eat.</li>
                <li>I want to get something to drink.</li>
                <li>Can i get another key for my room.</li>
                <li>I'm going to sleep now.</li>
                <li>What time does the store open.</li>
                <li>I'm going to be late.</li>
                <li>I need to order this online.</li>
                <li>Is it supposed to solve today.</li>
                <li>How much do i owe you for the work (काम के लिए मैं आपको कितना देय हूँ).</li>
                <li>Can i pay you later.</li>
                <li>When are you going to pay me back.</li>
                <li>Can you lend me some money please.</li>
                <li>How much money do you need.</li>
                <li>How long does it take to get there (कितना समय लगेगा वहा तक जाने के लिए).</li>
                <li>It should take about four hours.</li>
                <li>I don't have my own house.</li>
                <li>Where did you park.</li>
                <li>What kind of car do you drive.</li>
                <li>How often do you drive this car.</li>
                <li>I just brought it.</li>
                <li>Can i show you something.</li>
                <li>Can you open the door, please.</li>
                <li>I have one brother and two sisters.</li>
                <li>What's wrong with it.</li>
                <li>How would you like to pay.</li>
                <li>What are the others doing.</li>
                <li>I have never seen him before.</li>
                <li>She is taller than i am.</li>
                <li>What do you mean.</li>
                <li>In a mean time, I can read a book.</li>
              </ul>
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Skills));