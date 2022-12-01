import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import GitLogo from "../../../assets/git_imgs.PNG"
import javaScript from '../../mern/projects/javaScript';


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



class TechInto extends Component {
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
              <li>Tim does not speak French, so he has to find someone who can speak English to show him the way.</li>
              <li>Yeah, a little bit. What's the problem?</li>
              <li className='textsFomtate'>Oh, thank god. I'm sorry to disturb you but, how can i get to the Eiffel tower from here?</li>
              <li>Oh, you are almost there actually!</li>
              <li className='textsFomtate'>By the way, why did you live in the US when you were small?</li>
              <li>I can go on my own now! Thank you for spending time with me!</li>
              <li className='textsFomtate'>By the way, your English is really god, where did you learn it?</li>
              <li>No wonder your English is so excellent! You must be a very hard-working student.</li>
              <br/>

              <li>Well, once again, thank you for your service.</li>
              <li className='textsFomtate'>We will bring out your order in a moment.</li>
              <li>Therefore, we would like to ask a bit more about your English proficiency.</li>
              <li>Have you taken any English proficiency tests before?</li>
              <li className='textsFomtate'>Yes, i can use English without much difficulty.</li>
              <li className='textsFomtate'>I have attached a copy of the test result in my document.</li>
              <h3>Making teltphone calls</h3>
              <li>Hello and good morning. May i ask who's calling?</li>
              <li className='textsFomtate'>I'm Jane, and i apologize for calling so early in the morning.</li>
              <li>No problem. Who would you like to speak to?</li>
              <li>Hang on and i'll get her for you.</li>
              <li className='textsFomtate'>I'm sorry. but i won't be able to attend the meeting this morning. I got throat and became feverish last night.</li>
              <li>Don't be concerned about the meeting.</li>
              <li>You should visit a doctor right now. I hope you feel well soon.</li>
              <br/>
              <li>Hello, can i speak to Meena?</li>
              <li className='textsFomtate'>Hold on. Let me check to see if she's here. I'm sorry she's not in.</li>
              <li>Do you happen to know where she is?</li>
              <li>Do you know when she'll return?</li>
              <li className='textsFomtate'>Hmm... perhaps she'll be back in 30 minutes or more.</li>
              <li>Is it okay if i leave a message?</li>
              <li className='textsFomtate'>Without a doubt. Please hold on for a moment so i can get the pen and paper, I will write down your message and pass it on to Mary.</li>
              <li>Could you please have her contact me at... when she retuns?</li>
              <li className='textsFomtate'>Could you kindly repeat that?</li>
              <br/>
              <li>Could you tell me which line i'm supposed to stand in to buy a postcard?</li>
              <li className='textsFomtate'>Yes, you can get them here. Which one do you prefer?</li>
              <li>Can i take a look at these, please?</li>
              <li>Hmm, does this postcard have 2rs each?</li>
              <li className='textsFomtate'>Yes. How many would you like?</li>
              <li>I need three. Wait a minute, Is this the 10rs.</li>
              <br/>
              <li>Yes, i'd like to send this package to Russia. Which number window do i have to go to?</li>
              <li className='textsFomtate'>Go to the "Parcel Post" window number 3.</li>
              <li>I'd want to ship this parcel, I registered.</li>
              <li className='textsFomtate'>Yes, what exactly is in it?</li>
              <li>Sir, Please wait a moment!</li>
              <li className='textsFomtate'>Oh, i'm sorry. I'll fill it out.</li>
              <br/>

              <li>I need to withdraw money today.</li>
              <li className='textsFomtate'>Okay. How much would you like to takt out?</li>
              <li>I need to withdraw 300rs.</li>
              <li className='textsFomtate'>Could you please fill out this form?</li>
              <li className='textsFomtate'>You must write down your name, and the amount of money you desire.</li>
              <li>Really? Can i give it another shot?</li>
              <li>So, how about now?</li>
              <li className='textsFomtate'>It's now right. Please sign your receipt at the bottom of this page.</li>
              <br/>

              <li>So, did you buy a lakeside villa?</li>
              <li className='textsFomtate'>Yes, it is currently being decorated.</li>
              <li>That's great.</li>
              <li className='textsFomtate'>We hired a professional to decorate the house. And we gave them free rein to renovate our house.</li>
              <li>Does your home need to be repaired?</li>
              <li className='textsFomtate'>Yes, the guest rooms will be outfitted with opulent carpets and fixtures.</li>
              <li>You appear to have spent a lot of money in decorating your home.</li>
              <li className='textsFomtate'>Yes, it does cost me a lot of money.</li>
              <br/>

              <li>Bill, the bedroom needs to be redone.</li>
              <li className='textsFomtate'>Let me take a look. Before redecorating, remove all loose paint flakes.</li>
              <li>But i haven't hired an interior designer.</li>
              <li className='textsFomtate'>Why don't we hire Bog to decorate our livung room? He's an expert at decorating.</li>
              <li>How could we have forgotten him?</li>
              <li className='textsFomtate'>But i've heard he's got a jam-packed schedule this week. Perhaps we should postpone untill next week.</li>
              <li>Okay, And i want to expand the balcony area.</li>
              <li className='textsFomtate'>We need to think more about that.</li>
              <li>Er... should we redecorate the living room?</li>
              <li className='textsFomtate'>Well, maybe we can decoratecin a minimalist style.</li>
              <br/>

              <h3>Settling down in a new place</h3>
              <li>What special day is today?</li>
              <li className='textsFomtate'>Oh no, I just want to hold a party to celebrate my husband and i have a new house.</li>
              <li>That sound great. We're all excited to move into our new home.</li>
              <li className='textsFomtate'>Johnny, how about him? Has he moved into the new house yet?</li>
              <li>He did, in fact, settle into his new home.</li>
              <li className='textsFomtate'>Great! We will celebrate it together.</li>
              <li>How would you like to celebrate it?</li>
              <li className='textsFomtate'>Maybe we should celebrate by drinking a lot of water.</li>
              <li>I like it.</li>
              <li className='textsFomtate'>It's a done deal. i'll go get water.</li>
              <br/>

              <li>Oh, hi Linda. it's really fantastic to see you. Cone in, please! And take a look at out new home.</li>
              <li className='textsFomtate'>Congratulations. The house looks great.</li>
              <li>Thanks. How do you see the design of the house?</li>
              <li className='textsFomtate'>Very special design. Your house looks very luxurious and sophisticared.</li>
              <li>Yeah, this house was designed by a famous designer and has a large garden behind the house in London style.</li>
              <li className='textsFomtate'>That's fantastic! I'm envious of you. My boyfriend can't afford a new house, and i can't either.</li>
              <li>In the future, you will have your own. Please visit us whenever you are free. The garden will help you relax.</li>
              <li className='textsFomtate'>Yes, once again Congratulations. I am sure that the new house will bring you and your family a lot of health and luck.</li>
              <br/>

              <h3>Greeting and saying goodbye</h3>
              <li>Good morning. What have you been up to?</li>
              <li className='textsFomtate'>Not so well. I just took the final exam. I mean, it could have been a bad result.</li>
              <li>Oh no. Bad luck.</li>
              <li className='textsFomtate'>I couldn't answer all the questions. I left a question about science.</li>
              <li>You didn't put in much effort this semester, did you?</li>
              <li className='textsFomtate'>To be honest, no i prefer playing computer games to revisioning.</li>
              <li>Did the professor give you a chance to retake the test?</li>
              <li className='textsFomtate'>I believe yes. i'll contact my professor and inquire about it.</li>
              <li>Okay, instead of playing games. study hard. I believe you are a smart man.</li>
              <li className='textsFomtate'>Thanks, i'm going to need to do a lot of exercise.</li>
              <li>I hope you pass! Bye!</li>
              <br/>

              <li>Good morning.</li>
              <li className='textsFomtate'>Good morning, Mina! How's your life?</li>
              <li>Surviving, thanks. Where are you going?</li>
              <li className='textsFomtate'>I am going to the supermarket. I'd like to buy a gift for my father birthday.</li>
              <li>Have you decided what to buy yet?</li>
              <li className='textsFomtate'>No, not yet.</li>
              <li>I think a watch is cool.</li>
              <li className='textsFomtate'>I believe so, but i don't have a lot of money.</li>
              <li>Hmm... so how about a book?</li>
              <li className='textsFomtate'>That is a great idea. I'll look for a book that i can afford.</li>
              <li>Okay. I've got to get going. See ya!</li>
              <br/>

              <h3>Introducing to each other</h3>
              <li>Hello, Khusboo! How's it going?</li>
              <li className='textsFomtate'>Hi Lena, pretty Good. Ah, I would like to introduce you, my new friend.Her name is James, she is Chinese. James, this is Lena, my high school friend.</li>
              <li>Hello, my name is Lena. It's great to meet you!.</li>
              <li>I've previously visited China. It's pretty amazing. I'm a huge fan of Chinese food!</li>
              <li className='textsFomtate'>Yeah. China is a large country.</li>
              <li>That's fantastic! Ah and i also know a little Chinese. Ni hao!</li>
              <li>Sorry for not being able to chat with you longer. I have to go now, See you again.</li>
              <br/>

              <li>Hey there beautiful! How's it goin?</li>
              <li className='textsFomtate'>So so, thanks! It's strange to see you in the park.</li>
              <li>Well... My sister has arrived at my house, and i am responsible for her. She always wants to for a walk after dinner.</li>
              <li className='textsFomtate'>Is she your sister? The girl wears a white dress, right?</li>
              <li>Yes, Kate! Please come here! This is MAry, my best friend.</li>
              <li className='textsFomtate'>Very nice to meet you. What is your age?</li>
              <li>I'm two years younger than my sister, and i'm sisteen.</li>
              <li className='textsFomtate'>So you came here for a holiday and stay at your sister's house.</li>
              <li>Yes, It is a very long vacation. Maybe i will stay there for 2 months.</li>
              <li className='textsFomtate'>Okay. Bye for now! See you ...</li>
              <br/>

              <h3>Inviting Others</h3>
              <li>I'd like to invite you to dinner. That's my treat.</li>
              <li className='textsFomtate'>Great. Thank you very much. What do you want to eat?</li>
              <li>Hmm... i'm still wondering. When do you have free time?</li>
              <li className='textsFomtate'>Any weekend will suffice.</li>
              <li>What about this Sunday evening?</li>
              <li className='textsFomtate'>That's fantastic! will you come to my house and pick me up?</li>
              <li>Not a problem. 7 pm okay?</li>
              <br/>

              <li>I'm hungry, let's eat something.</li>
              <li className='textsFomtate'>I'm afraid i can't. I still have a lot of work to complete.</li>
              <li>Oh, please. Come with me.</li>
              <li className='textsFomtate'>Sorry, i'll stay at home. I still have a lot of work to do. I need to complete my report by Monday.</li>
              <li>What part have you done?</li>
              <li className='textsFomtate'>I've only just begun.</li>
              <li>But you can make up for last time over the weekend. I'm aware that this restaurant serve excellent food. And the service is excellent!</li>
              <li className='textsFomtate'>Okay, i'll go with you. I'm going to need a break anyway. I'm going to get my coat.</li>
              <br/>

              <h3>Arranging an appointment</h3>
              <li>Good morning, Peter. My name is John. I'm calling to see if you like to meet for linch tomorrow.</li>
              <li className='textsFomtate'>Hello, John. I'm sorry, tomorrow is going to be a little difficult. I'm going to have a meeting at that time.</li>
              <li>Oh, I see. What about the following day?</li>
              <li className='textsFomtate'>Yeah, Thursday would be perfect.</li>
              <li>What sort of time would suit you?</li>
              <li className='textsFomtate'>12 am. So, where are we going to eat?</li>
              <li>What about the restaurant down the street? An Italian restaurant.</li>
              <li className='textsFomtate'>Sound great. Where are we going to meet?</li>
              <li>Let's meet at the beginning of Rose street.</li>
              <br/>

              <li>Are you available tomorrow evening?</li>
              <li className='textsFomtate'>Yes, i'm free tomorrow. What's going on?</li>
              <li>We're planning a birthday party, and i'd like to invite you.</li>
              <li className='textsFomtate'>Great! i'd like to attend. When does the birthday party begin?</li>
              <li className='textsFomtate'>When does the party come to an end?</li>
              <li>At ablut 1 am the next morning.</li>
              <li className='textsFomtate'>It's gonna be so much fun. Where do you live?</li>
              <li className='textsFomtate'>Okay, if i get lost, i'll call you. And, by the way, am i allowed to bring anything?</li>
              <li>Yeah, of course. So do you want to bring a pie or a cake?</li>
              <li className='textsFomtate'>Sure. I know how to make an apple pie. It will be delicious.</li>
              <br/>

              <h3>Apology and Responses</h3>
              <li>sorry, I booked a room with a nice view of the beach. However, this room is completely different, it looks terrible.</li>
              <li className='textsFomtate'>May i ask what your name is?</li>
              <li className='textsFomtate'>Please wait a moment while i check the reservation.</li>
              <li className='textsFomtate'>I've reserved a room with a great view of the beach for you. It is without a doubt, our fault. Please accept my sincere apologies.</li>
              <li>Your apologies are accepted. Is there a room where i can enjoy th view of the beach?</li>
              <li className='textsFomtate'> I'm awfully dorry but all rooms with a view of the beach have already been reserved.</li>
              <br/>

              <li>I'm sorry for stamping on your toes. I didn't mean to do it. It's extremely crowded here. Please accept my apologies.</li>
              <li className='textsFomtate'>You didn't inflict any harm on me. Don't be concerned.</li>
              <li>Oh no, I can't believe i got your white shoes dirty. Here's my handkerchief, use it to wipe the stains off your shoes.</li>
              <li className='textsFomtate'>Thank you very much. May i ask where you are going?</li>
              <li className='textsFomtate'>I'm sorry, I can't hear well. Could you please repeat it?</li>
              <li className='textsFomtate'>I've got it. I gotta run. It was great talking to you.</li>
              <br/>

              <h3>Thankfulness and Responses</h3>
              <li>Hello beauty, you look stunning today.</li>
              <li>Is that a new outfit? It looks really nice.</li>
              <li className='textsFomtate'>Yes. I bought it yesterday while walking around with my mother.</li>
              <li>It suits you very well. You look like a fashionista.</li>
              <li className='textsFomtate'>Thank for your compliment.</li>
              <li className='textsFomtate'>As soon as i saw it, I was intrigued. I'm thinking about getting some sandals to go with it. What colors do you think would go weell together?</li>
              <li>Perhaps white will look great.</li>
              <li className='textsFomtate'>Thank you for your advice.</li>
              <li>I'm glad i could help. Do you want to go shopping with me on Saturday?</li>
              <li className='textsFomtate'>Thank you very much for inviting me. I'd be delighted to.</li>
              <br/>

              <li>John, your article has been read by me. It;s quite good, in my opinion.</li>
              <li>However, I recommend that you change the title to something more interesting. A better title will pique the reader's interest and pique their curiosity.</li>
              <li className='textsFomtate'>Thank you for your suggestions and comments, I'll look into it. Whick title do you think would be better?</li>
              <li>How ablout "How to Stay Healthy?"</li>
              <li className='textsFomtate'>Wow, it sound fantastic! Thank you for your assistance.</li>
              <li>It's my pleasure. I am confident that your masterpieces will propel you to prominence as a writer.</li>
              <br/>

              <h3>Congratulating others</h3>
              <li>John informed me that you had been promoted to the position of manager of the advertising department.</li>
              <li className='textsFomtate'>Yes. I received the notice last week.</li>
              <li>Congratulations on your advancement! Your efforts have finally paid off.</li>
              <li>I had a feeling you'd make it someday. You have the ability to be a leader.</li>
              <li className='textsFomtate'>Oh, you're flattering me. Oh, i have a lot to learn yet.</li>
              <li>I'm just telling the truth. You are the most hardworking person i know.</li>
              <li className='textsFomtate'>Actually, i now have a lot of new responsiblities on my shoulders. I need to learn a lot. Anyway, thanks for your comments and directions.</li>
              <li>Don't be so polite.</li>
              <br/>

              <li>Congratulations on your child's birth. You must be feeling very happy.</li>
              <li className='textsFomtate'>Sure. I have been waiting for this for a long time. I feel so lucky and happy.</li>
              <li>Have you named the baby yet?</li>
              <li className='textsFomtate'>His name is Robert. And his household name is Little Potato.</li>
              <li>A nice name for a boy. You seem to be very adept at talking care of babies.</li>
              <br/>

              <h3>Holiday wishes</h3>
              <li>Very ...</li>
              <li className='textsFomtate'>Whishing you warmth and good cheer.</li>
              <li>Please convey my warmest regards to your parents.</li>
              <li>Do you have any special plans for Holi?.</li>
              <li className='textsFomtate'>I'll be a party tomorrow night. Do you want to come?</li>
              <li>That's great. I'd like to come. Thank you very much for inviting me. when does the party begin?</li>
              <br/>

              <li>happy New Year! May prosperity be with you.</li>
              <li className='textsFomtate'>The same to you. Is this a traditional Chinese holiday?</li>
              <li className='textsFomtate'>What do you usually do during Spring Festivals?</li>
              <li>traditionally, we spend the holiday with family. However, since i am now in America. I will celebrate it with some friends. We're going to make dumplings. Do you want to come?</li>
              <li className='textsFomtate'>Great! Dumplings are one of my favorite foods. I'm sure i'll be there.</li>
              <li>It will be even better if you dress in red. It is rhe lucky color in China.</li>
              <li className='textsFomtate'>Really? That is something i was unaware of. Thank you for informing me. I wish you the best of luck.</li>
              <br/>

              <h3>Asking for help</h3>
              <li>Sorry to bother you, but can you give me some suggestions?</li>
              <li className='textsFomtate'>Of course. About what?</li>
              <li>I'm finding a good restaurant nearby.</li>
              <li className='textsFomtate'>Oh, there is a noodle shop nearby. It's my favorite restaurant.</li>
              <li>How can i get to the restaurant?</li>
              <li className='textsFomtate'>Turn right at the intersection. Continue straight until you reach a traffic light.</li>
              <li className='textsFomtate'>There, take a left. It's either the second or third house on the right. It is easy to find. It's just about a ten-minute walk.</li>
              <li>Thank you for your assistance.</li>
              <li className='textsFomtate'>No problem. Also, the seafood noodle soup there is delicious. You should try it out.</li>
              <br/>

              <li>I'd like to ask you a favor.</li>
              <li className='textsFomtate'>Yeah. Tell me what do you need?</li>
              <li>Is it okay if i borrow your cat tomorrow?</li>
              <li className='textsFomtate'>I'm sorry. But i can't. My car has been broken and is being repaired. I'm sorry i can't assist you.</li>
              <li>That's bad. I'll try asking others.</li>
              <li className='textsFomtate'>You can try asking Sam. He also has a car. He will be happy to lend it to you.</li>
              <li className='textsFomtate'>Sorry. Please let me know if there is anything else i can do for you.</li>
              <br/>

              <h3>Agreement and disagreement</h3>
              <li>What a wonderful day. Why don't we go to the movies?</li>
              <li className='textsFomtate'>That's a good idea, but i have an important task to complete right now.</li>
              <li>Oh, that a pity. What about the next day? A new film will be screened.</li>
              <li>Yes, you know this movie? What do you think about this movie?</li>
              <li className='textsFomtate'>I really like it. I have not missed any part.</li>
              <li className='textsFomtate'>Right. But when and where are we going to meet?</li>
              <br/>

              <li>Are you going to be busy this afternoon?</li>
              <li>Chris has invited me to his birthday party. would you like to go with me.</li>
              <li className='textsFomtate'>Perhaps not. He does not consume alcohol.</li>
              <br/>

              <h3>Suggestions and opinions</h3>
              <li>You are from New York, right?</li>
              <li>I want to go to some places to visits New York. Can you give me some recommendations?</li>
              <li className='textsFomtate'>How ablout going to the Museum of Modern Art?</li>
              <li>No, i'm not a fan of museums. It's not intresting at all.</li>
              <li className='textsFomtate'>Why don't you pay a visit to the Empire State Building?</li>
              <br/>

              <li>You don't seem to be in a good mood. What's the problem?</li>
              <li className='textsFomtate'>Oh, nothing noteworthy. I'm just a little exhausted.</li>
              <li>With everything, with everyone.</li>
              <li className='textsFomtate'>A good suggestion for you at this time is that you need a holiday.</li>
              <li className='textsFomtate'>What exaclty do you mean?</li>
              <li>I have to work every dat. Our lives are devoid of variety.</li>
              <br/>

              <h3>Ordering take-away</h3>
              <li>Kate, where are you going to eat lunch? would you like to have lunch with me?</li>
              <li>Did the Indian restaurant just open last week?</li>
              <li>Let me look it up for you. Oh, here is it.</li>
              <li className='textsFomtate'>Great, i'm going to call them right now.</li>
              <br/>

              <li>Yes, what would you want?</li>
              <li className='textsFomtate'>I want to order a pizza. Can you suggest for me the best seller of tthe restaurant?</li>
              <li>Yes, we now serve Margherita Pizza.</li>
              <li className='textsFomtate'>It has been reported that Chise Pixxa is extremely tasty. Please give me one.</li>
              <li>Certainly. would you like anything else?</li>
              <li className='textsFomtate'>Please give me one more cold-drink.</li>
              <li>Okay. It will arrive in 20 minutes.</li>
              <br/>

              <h3>Reserving a table</h3>
              <li>I'd like to make a reservation. Do you have any free tables?</li>
              <li className='textsFomtate'>Sure. How many people are there?</li>
              <li className='textsFomtate'>Yes. Which seat would you prefer?</li>
              <li>I prefer a table near the window.</li>
              <li className='textsFomtate'>Which areas do you prefer, smoking or non-smoking?</li>
              <li className='textsFomtate'>What time would you like your table?</li>
              <li className='textsFomtate'>We look forward to having you with us tonight.</li>
              <br/>

              <li>This is Shogun Restaurant. Can i hepl you?</li>
              <li className='textsFomtate'>Hi, i would like to make a dinner reservation.</li>
              <li>How many people will you need the reservation for?</li>
              <li className='textsFomtate'>Ma'am, would you prefer a table in the main restaurant or a private room?</li>
              <li className='textsFomtate'>Please wait for me a second. I'll look over our reservation list.</li>
              <li>Are there any good seats available?</li>
              <li className='textsFomtate'>I'm sorry, the private room is already booked. Do you mind taking the seat next to the aisle?</li>
              <li className='textsFomtate'>Okay, I've already made a reservation for you.</li>
              <br/>

              <h3>Ordering dishes</h3>
              <li>Hi, i'm Marie, I'll be your server for tonight. What can i do for you?</li>
              <li className='textsFomtate'>Could i see the menu, please?</li>
              <li className='textsFomtate'>Do you have any specials today?</li>
              <li>Would you like to drink something? We have fruit juice.</li>
              <li>Please wait for a minute, your meal will be ready.</li>
              <br/>

              <li>That's enough. I will order later.</li>
              <li className='textsFomtate'>Let me double-check your order. Which includes...</li>
              <li className='textsFomtate'>I apologize. I will fix it right now.</li>
              <li>Is it possible for me to have it right away?</li>
              <br/>

              <h3>Ordering drinks</h3>
              <li>Hi there! What can i get for you?</li>
              <li className='textsFomtate'>Which one do you prefer?</li>
              <li>Hmm... i'll have a cup of tea, please.</li>
              <li className='textsFomtate'>Okay. What size would you like?</li>
              <li className='textsFomtate'>And is that for here or to go?</li>
              <li className='textsFomtate'>Yes, i'll bring you some right away.</li>
              <li>And would it be okay if i smoked here?</li>
              <br/>

              <li>What drink would you like to order?</li>
              <li className='textsFomtate'>Just give me a few minutes, Ok?</li>
              <li>Do you want to have some tea?</li>
              <li className='textsFomtate'>I don't drink tea in the morning. Do you have any specials?</li>
              <li>Of course. anything else besides the drink?</li>
              <br/>

              <h3>Serving the dishes</h3>
              <li>Sir, your dishes are ready. Where can i put it?</li>
              <li>The cold dishes are all here. When should we start bringing in the hot dishes?</li>
              <li className='textsFomtate'>Please, bring dish dub for us right now. Would you please go get me a glass of water?</li>
              <li>Is there anything elae you require?</li>
              <li className='textsFomtate'>More ricr, please.</li>
              <li>Would you like to order that?</li>
              <li>I'm always available to help you. Please contact me if you order any additional dishes.</li>

              <br/>
              <li>Please set it down on the table.</li>
              <li className='textsFomtate'>Please wait a moment. Let me check it again!</li>
              <br/>

              <h3>Service at the table</h3>
              <li>Could you please come over here, waiter?</li>
              <li className='textsFomtate'>Yes, what can i do to assist you?</li>
              <li>Please add a little more cream.</li>
              <br/>

              <li>Would you like more soup?</li>
              <li className='textsFomtate'>No, this dish contains far too much salt. Could you please give me a glass of water?</li>
              <li>Sir, please accept my apologies.</li>
              <li className='textsFomtate'>It's a little salty, but i enjoy it.</li>
              <li className='textsFomtate'>I'd appreciate it if you could bring me a spoon. The child is still unsure of how to use a fork.</li>
              <br/>

              <h3>Giving assessment</h3>
              <li>We're taking the final food order. What more do you need?</li>
              <li className='textsFomtate'>Please bring me more salad.</li>
              <li>Yes. is the food to your taste?</li>
              <li className='textsFomtate'>Yes, this steak is extremely delicious, tender, and fragrant.</li>
              <li>This is also our restaurant's signature dish. I'm glad you enjoy it.</li>
              <li className='textsFomtate'>That's right, I really like it. It's really delicious.</li>
              <li>What about other dishes?</li>
              <li className='textsFomtate'>In my opinion, the potatoes are very crispy and delicious. The soup is very tasty.</li>
              <li>That makes me happy. Please do not hesitate to contact me if you need help.</li>
              <br/>

              <li>Is today's food to your taste? Do you like sweet?</li>
              <li>That dish is also considered to build a reputation for a world-famous chef - Gordon.</li>
              <li className='textsFomtate'>Can you tell me how to make this dish?</li>
              <br/>

              <h3>Aranging a banquet</h3>
              <li>How many people do you intend to invite, and how much money do you want to spend per person?</li>
              <li className='textsFomtate'>We plan to invite around 55 people, and we'd like to spend no more than rs15 per person.</li>
              <li>When will the meal begin?</li>
              <li className='textsFomtate'>Is this an extremely formal party?</li>
              <li>Yes. Please take your time preparing it.</li>
              <li className='textsFomtate'>Don't worry. We will prepare fresh food for the banquet.</li>
              <li>Thank you in advance.</li>
            </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(TechInto));


