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

const modelOps = `
//html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js" type="text/javascript"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.0/backbone.localStorage-min.js" 
type="text/javascript"></script>  


//
var modelOp = Backbone.Model.extend({
  initialize: function () {
    console.log('Model created')
  }
});

var obj = new modelOp();


//2
var modelOp = Backbone.Model.extend();

var obj = new modelOp({
  name: 'Tushar Garg',
  teach: 'Backbone js',
  platform: 'YouTube'
});


//3
var modelOp = Backbone.Model.extend();
var obj = new modelOp();

// obj.set("name", "Tushar");                                                           //set use to store/set data

obj.set({                                                                               //set json data
  name: 'Tushar Garg',
  teach: 'Backbone Js'
});

/*
obj.get("teach")
obj.toJSON()
obj.unset('teach')
obj.has('teach')
obj.clear()
*/


//4
var modelOp = Backbone.Model.extend({
  defaults: {
    platform: 'youtube'
  }
});

var obj = new modelOp();

obj.set({
  name: 'Tushar Garg',
  teach: 'Backbone Js'
});
`.trim();

const modelInheritance = `
var modelInheri = Backbone.Model.extend({
  show: function () {
    console.log("colors Tv");
  }
});


var modelInheritance = modelInheri.extend({
  show: function () {
    modelInheri.prototype.show.apply();                                                     //extends super class function
    console.log('Sony Tv');
  }
});

var obj = new modelInheritance();

//obj.show()
`.trim();

const modelVals = `
var modelOp = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.age < 1) {
      return "age should not be negative";
    }
  }
});

var obj = new modelOp({
  name: 'Tushar Garg',
  age: -1
});


//obj.isValid()
obj.validate
`.trim();

const modelCols = `
var Team = Backbone.Model.extend();                                                             //create model

var player1 = new Team({
  Name: 'Dhoni',
  PlayedFrom: 'India',
  Performance: 'Excellent',
  runs: 98
});

var player2 = new Team({
  Name: 'Virat Kholi',
  PlayedFrom: 'India',
  Performance: 'Good',
  runs: 75
});

var players = Backbone.Collection.extend();                                                    //create collection
var p = new players([
  player1,
  player2
]);


/*
p
p.add({'name':'Kishan','PlayedFrom':'Mumbai'})
p.unshift({'name':'Kishan','PlayedFrom':'Mumbai'})
p.add(new Team({'name':'Kishan','PlayedFrom':'Mumbai'}),{at:2})                               // at specific index
p.pop()
p.remove('c1')
*/


//2
var Team = Backbone.Model.extend();                                                           //create model

var player1 = new Team({
  Name: 'Dhoni',
  PlayedFrom: 'India',
  Performance: 'Excellent',
  runs: 98
});

var player2 = new Team({
  Name: 'Virat Kholi',
  PlayedFrom: 'India',
  Performance: 'Good',
  runs: 75
});

var players = Backbone.Collection.extend();                                                 //create collection
var p = new players([
  player1,
  player2
]);

var res = p.where(function (player) {
  return player.get('runs') > 74;
});

var res1 = p.filter(function (player) {
  return player.get('runs') > 74;
});


/*
p
p.add({'name':'Kishan','PlayedFrom':'Mumbai'})
p.unshift({'name':'Kishan','PlayedFrom':'Mumbai'})
p.add(new Team({'name':'Kishan','PlayedFrom':'Mumbai'}),{at:2})                            // at specific index
p.pop()
p.remove('c1')
p.where({'Name':'Dhoni'})
res1

p.each(function(player){
    console.log(player);
});
*/


//3
var students = Backbone.Model.extend({
  initialize: function () {
    this.bind('change:name', function (model) {                                           //run console only if name change
      console.log("Model Changed");
    })
    // console.log("Working");
  }
});

var student = new students({
  name: 'Tushar Garg',
  RollNo: 1
});


//student.set('name','tutorials')
`.trim();

const custmEvent = `
var Objects = {
  test: function () {
    this.trigger("alerts", "an event")
    this.trigger("title", "an title")
  }
};

_.extend(Objects, Backbone.Events);
Objects.on("alerts title", function (msg) {
  alert('Alert msg', msg)
  console.log('Title')
})

Objects.trigger("alert", "an event")


//2
var Objects = {
  test: function () {
    this.trigger("alerts", "an event")
    this.trigger("title", "an title")
  }
};

_.extend(Objects, Backbone.Events);
Objects.on("all", function (msg) {
  alert('Alert msg', msg)
  console.log('Title')
})
`.trim();

const dataChange = `
var students = Backbone.Model.extend({
  initialize: function () {
    this.bind('change:name', function (model) {                                           //run console only if name change
      console.log("Model Changed");
    })
    // console.log("Working");
  }
});

var obj = new students({
  name: 'Tushar Garg',
  RollNo: 1
});


//obj.set('name','tutorials')
`.trim();

const eventHandler = `
//html
<div id="demo"></div>


//js
var firstModel = Backbone.Model.extend();

var fm = new firstModel({
  Title: 'Jugnu',
  artist: 'Baadshah'
});


var Song = Backbone.View.extend({
  events: {
    'click': 'Onclick',
    'click .btnStop': 'OnClickStop'
  },
  Onclick: function () {
    console.log("Song Played");
  },
  OnClickStop: function (e) {
    e.stopPropagation();
    console.log("Song Stopped");

  },
  render: function () {
    this.$el.html(this.model.get('Title') + "<button>Play</button> <button class='btnStop'>Stop</button>");
  }
});

var song = new Song({
  el: '#demo',
  model: fm
});
song.render();
`.trim();

const modelView = `
//html
<div id="demo"></div>
  <div id="testing"></div>
  <script src="main_4.js"></script>
  
  
//js
var firstView = Backbone.View.extend({
  render: function () {
    console.log("Hello");
  }
});

var obj = new firstView();
obj.render(); 


//2
var firstView = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    console.log("Hello");
  }
});

var obj = new firstView();


//3
var firstView = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html("Backbone Js View Demo");
  }
});

var obj = new firstView({ el: '#demo' });


//4
var firstView = Backbone.View.extend({
  el: '#testing',
  tagName: 'h1',
  initialize: function () {
    this.render();
  },
  render: function () {
    // console.log("Hello");
    this.$el.html("Backbone Js View Demo");
    console.log(this.el);                                                       //contain div element its DOM element
    console.log(this.$el);                                                      //jQuery object
  }
});

var obj = new firstView({ el: '#demo' });
`.trim();

const addLists = `
//html
<input type="text" placeholder="Enter friend's name" id="input" />
<button id="add-input">Add Friend</button>
<ul id="friends-list"></ul>
  
//2
<div id="container">Loading...</div>
<div id="container"></div>


//js
$(function () {
  FriendList = Backbone.Collection.extend({
    initialize: function () {
    }
  });

  FriendView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click #add-input': 'getFriend',
    },

    initialize: function () {
      var thisView = this;
      this.friendslist = new FriendList;
      _.bindAll(this, 'render');
      this.friendslist.bind("add", function (model) {
        alert("hey");
        thisView.render(model);
      })
    },

    getFriend: function () {
      var friend_name = $('#input').val();
      this.friendslist.add({ name: friend_name });
    },

    render: function (model) {
      $("#friends-list").append("<li>" + model.get("name") + "</li>");
      console.log('rendered')
    },
  });

  var view = new FriendView({ el: 'body' });
});


//2
var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
  render: function () {
    this.$el.html(this.model.get("title") + "<button>Listen</button>")
    return this;
  }
});

var song = new Song({ title: "Blue in Green" });
var songView = new SongView({ el: "#container", model: song })
songView.render()
`.trim();

const passingData = `
var Player = Backbone.Model.extend();

var player1 = new Player({
  Name: 'Dhoni',
  playedFrom: 'India'
});

var PlayerView = Backbone.View.extend({
  render: function () {
    this.$el.html('Passing data');
  }
});

var obj = new PlayerView({ el: '#demo' });
obj.render();


//2
var Player = Backbone.Model.extend();

var player = new Player({
  Name: 'Dhoni',
  playedFrom: 'India'
});

var PlayerView = Backbone.View.extend({
  render: function () {
    this.$el.html('Passing data');
    this.$el.html(this.model.get('Name'));
    // this.$el.html(this.model.get('playedFrom'));
  }
});


var pv = new PlayerView({
  el: '#demo',
  model: player
});
pv.render();
`.trim();

const templates = `
//html
<div id="demo"></div>
<script id="demoTemplate" type="text/html">This is the external template example</script>


//js
var view = Backbone.View.extend({
  template: _.template("This is Inline Templates Example"),

  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.template());
  }
});

var v = new view({ el: '#demo' });


//2
var view = Backbone.View.extend({

  template: _.template($('#demoTemplate').html()),
  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.template());
  }
});

var v = new view({ el: '#demo' });
`.trim();

const templatesCon = `
//html
<div id="container"></div>
<script id="songTemplate" type="text/html">
   <%= title %>
   <button>Listen</button>
   
   <% if(plays >1000){%>
    <span class="popular">Popular</span>
 <%}%>
</script>
<script src="main.js"></script>
  
 
//js
var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
  render: function () {
    var template = _.template($("#songTemplate").html())
    var html = template(this.model.toJSON())
    this.$el.html(html)
    return this;
  }
});

var song = new Song({ title: "Blue in Green", plays: 1001 });
var songView = new SongView({ el: "#container", model: song })
songView.render()
`.trim();

const routers = `
//html
<div id="demo"></div>
<vav id="orderNav">
 <ul>
   <li data-url="firstOrder">First Order</li>
   <li data-url="secondOrder">Second Order</li>
   <li data-url="thirdOrder">Third Order</li>
 </ul>
</vav>
<script src="main.js"></script>


//2
<div id="demo"></div>
<ul>
 <li><a href="#/first/10">First</a></li>
 <li><a href="#/second">Second</a></li>
 <li><a href="#/third/10/anythings">Third</a></li>
</ul>


//js
var routeExample = Backbone.Router.extend({
  routes: {
    'view1': 'firstView',
    'view2': 'secondView',
    '': 'thirdView'
  },
  firstView: function () {
    console.log("This is our first View");
  },
  secondView: function () {
    console.log("This is our second View");
  },
  thirdView: function () {
    console.log("This is our thired View");
  }
});

var router = new routeExample();
Backbone.history.start();

//file:///D:/Qc/backbone/docs/router/index.html#/view1
  

//3
var first = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    console.log("This is our first View");
  }
});


var second = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    console.log("This is our second View");
  }
});


var third = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    console.log("This is our third View");
  }
});


var routeExample = Backbone.Router.extend({
  routes: {
    'view1': 'firstView',
    'view2': 'secondView',
    '': 'thirdView'
  },
  firstView: function () {
    var fv = new first();
  },
  secondView: function () {
    var sv = new second();
  },
  thirdView: function () {
    var tv = new third();
  }
});

var router = new routeExample();
Backbone.history.start();


//4
var pizza = Backbone.View.extend({
  render: function () {
    this.$el.html("You ordered Pizza");
  }
});
var momos = Backbone.View.extend({
  render: function () {
    this.$el.html("You ordered momos");
  }
});
var burger = Backbone.View.extend({
  render: function () {
    this.$el.html("You ordered burger");
  }
});


var routerDemo = Backbone.Router.extend({
  routes: {
    'firstOrder': 'pizzaOrder',
    'secondOrder': 'momosOrder',
    'thirdOrder': 'burgerOrder',
    '*other': 'default'
  },
  pizzaOrder: function () {
    var view = new pizza({
      el: '#demo'
    });

    view.render();
  },
  momosOrder: function () {
    var view = new momos({
      el: '#demo'
    });

    view.render();
  },
  burgerOrder: function () {
    var view = new burger({
      el: '#demo'
    });

    view.render();
  },
  default: function () {
    console.log("You ordered Nothing");
  },

});

var router = new routerDemo();
Backbone.history.start();

//for ui routing
var foodCourt = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },
  onClick: function (e) {
    var $li = $(e.target);
    router.navigate($li.attr("data-url"), { trigger: true });
  }
});

var v = new foodCourt({
  el: '#orderNav'
});
`.trim();


class Backbonejs extends Component {
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
              <h3>Model</h3>
              <div style={titles}>
                <PrismCode
                  code={modelOps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Model Inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={modelInheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Model Validations</h3>
              <div style={titles}>
                <PrismCode
                  code={modelVals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Collection</h3>
              <div style={titles}>
                <PrismCode
                  code={modelCols}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Custom Event</h3>
              <div style={titles}>
                <PrismCode
                  code={custmEvent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Data Change on custm Event</h3>
              <div style={titles}>
                <PrismCode
                  code={dataChange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Event Handler</h3>
              <div style={titles}>
                <PrismCode
                  code={eventHandler}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>View</h3>
              <div style={titles}>
                <PrismCode
                  code={modelView}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Add List</h3>
              <div style={titles}>
                <PrismCode
                  code={addLists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>View Passing Data</h3>
              <div style={titles}>
                <PrismCode
                  code={passingData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Template</h3>
              <div style={titles}>
                <PrismCode
                  code={templates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Template Conditions</h3>
              <div style={titles}>
                <PrismCode
                  code={templatesCon}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Router</h3>
              <div style={titles}>
                <PrismCode
                  code={routers}
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

export default (withStyles(styles)(Backbonejs));
