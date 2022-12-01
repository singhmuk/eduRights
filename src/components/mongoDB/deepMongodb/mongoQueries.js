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


const arraysSchema = `
const arraysSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: Number,          //count number of messages
  nameHistory: [String],      //every time name chage
  testScore: [Number]
})

module.exports = mongoose.model('arraysOp', arraysSchema);


//controllers
const Users = require('../models/arrayOp');

router.all = async (req, res) => {
    Users.find()
      .sort({ date: -1 })
      .then(main => res.json(main));
}

router.search = async (req, res) => {
    Users.find({
      testScore: { $all: [10, 20, 30] }
    })
      .then(main => res.json(main))
}

router.size = async (req, res) => {
    Users.find({
      testScore: { $size: 3 }
    })
      .then(main => res.json(main))
}

router.elementMatch = async (req, res) => {
    Users.find({
      testScore: { $elemMatch: { $gt: 20 } }
    })
      .then(main => res.json(main))
}

router.creates = async = (req, res) => {
    const newUsers = new Users({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      testScore: req.body.testScore,
    })

    newUsers.save().then(item => res.json(item));
}
`.trim();

const conditional = `
const reqString = { type: String, required: true }

const messageSchema = new Schema({
  userId: reqString,
  text: reqString
})

const userSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  level: Number,
  messages: [messageSchema],
  nameHistory: [String]
}, {
  timeStamps: true
})

module.exports = mongoose.model('conditional', userSchema);


//controllers
const Items = require('../models/conditional');

router.findLevel = async (req, res) => {
    //Search an user level > 10
    Items.find({
      level: {
        $exists: true,                    //check value exixt or not
        // $gte: 10, $lt: 15               //gte = greater than or equal to
      }
    })
      .then(main => res.json(main));
}

router.messages = async (req, res) => {
    Items.findOne({
      'messages.text': 'Text'
    })
      .then(main => res.json(main));
}

router.creates = async = (req, res) => {
    const newItems = new Items({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      level: req.body.level,
    })

    newItems.save().then(item => res.json(item));
}
`.trim();

const increase = `
const reqString = { type: String, required: true }

const userSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: Number,          //count number of messages
})

module.exports = mongoose.model('users', userSchema);


//controllers
const Items = require('../models/conditional');

router.findLevel = async (req, res) => {
    //Search an user level > 10
    Items.find({
      level: {
        $exists: true,                    //check value exixt or not
        // $gte: 10, $lt: 15               //gte = greater than or equal to
      }
    })
      .then(main => res.json(main));
}

router.messages = async (req, res) => {
    Items.findOne({
      'messages.text': 'Text'
    })
      .then(main => res.json(main));
}

router.creates = async = (req, res) => {
    const newItems = new Items({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      level: req.body.level,
    })

    newItems.save().then(item => res.json(item));
}
`.trim();

const insertMany = `
const reqString = { type: String, required: true }

const plurizedSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: {
    type: Number, default: 5, min: 0, max: 10
  },
  nameHistory: [String]
}, {
  timeStamps: true
})

module.exports = mongoose.model('manyQry', plurizedSchema);


//controllers
const Items = require('../models/insertMany');

router.all = async (req, res) => {
    Items.find()
      .sort({ date: -1 })
      .then(main => res.json(main));
}

router.inserts = async = (req, res) => {
    Items.insertMany([{
      "email": "valid@gmail.com", "username": "min", "password": "password"
    },
    {
      "email": "valid2@gmail.com", "username": "min2", "password": "password2"
    },
    {
      "email": "valid3@gmail.com", "username": "min3", "password": "password3"
    }]).then(function () {
      console.log("Data inserted")  // Success
    })
}

router.remove = async = (req, res) => {
    Items.deleteMany({
      username: ['min', 'min2']
    }).then(function () {
      console.log("Data inserted")  // Success
    })
}
`.trim();

const itemsModels = `
const MainSchema = new Schema({
  title: { type: String, required: true },
  age: { type: Number, required: true },
  list: { type: Array, required: true },
  status: { type: String, required: false },
  qty: { type: Number },
});

module.exports = mains = mongoose.model('mains', MainSchema);


//controllers
const Items = require('../models/items');

router.all = async (req, res) => {
    Items.find()
      .sort({ date: -1 })
      .then(main => res.json(main));
}

router.getOne = async (req, res) => {
    Items.findById(req.params.id)
      .then(main => res.json(main))
}

router.creates = async = (req, res) => {
    const newItems = new Items({
      title: req.body.title,
      age: req.body.age,
      list: req.body.list,
      status: req.body.status,
      qty: req.body.qty,
    })

    newItems.save().then(item => res.json(item));
}

router.updates = async = (req, res) => {
    Items.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      age: req.body.age,
      list: req.body.list,
      status: req.body.status,
      qty: req.body.qty,
      size: {
        h: req.body.h,
        w: req.body.w,
        uom: req.body.uom,
      }
    }, { new: true }).then(data => { res.json(data) })
}

router.remove = async (req, res) => {
    Items.findByIdAndRemove(req.params.id)
      .then(main => main.remove().then(() => res.json({ success: true })))
}
`.trim();

const nested = `
const reqString = { type: String, required: true }

const messageSchema = new Schema({
  userId: reqString,
  text: reqString
})

const userSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: [messageSchema],
  nameHistory: [String]
}, {
  timeStamps: true
})

module.exports = mongoose.model('nested', userSchema);


//controllers
const Items = require('../models/nested');

router.all = async (req, res) => {
    Items.find()
      .sort({ date: -1 })
      .then(main => res.json(main));
}

router.messages = async (req, res) => {
    Items.findOne({
      'messages.text': 'Text'
    })
      .then(main => res.json(main));
}

router.creates = async = (req, res) => {
    const newItems = new Items({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      messages: [
        {
          userId: req.body.email,
          text: 'Text'
        },
      ]
    })

    newItems.save().then(item => res.json(item));
}
`.trim();

const PluralizedCollectioName = `
const reqString = { type: String, required: true }

const plurizedSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: {
    type: Number, default: 5, min: 0, max: 10
  },
  nameHistory: [String]       //every time name chage
}, {
  timeStamps: true          //created and updated time automatically manage
})

module.exports = mongoose.model('plurized', plurizedSchema);
/*
collection name=plurized
collection name is default create plural, if want singular collection name than follow as
module.exports = mongoose.model('plurized', plurizedSchema,'plurized');
*/


//controllers
const Items = require('../models/PluralizedCollectioName');

router.all = async (req, res) => {
    Items.find()
      .sort({ date: -1 })
      .then(main => res.json(main));
}

router.getOne = async (req, res) => {
    Items.findById(req.params.id)
      .then(main => res.json(main))
}

router.creates = async = (req, res) => {
    const newItems = new Items({
      title: req.body.title,
      age: req.body.age,
      list: req.body.list,
      status: req.body.status,
      qty: req.body.qty,
    })

    newItems.save().then(item => res.json(item));
}
`.trim();

const primaryUniqeId = `
const reqString = { type: String, required: true }

const arraysSchema = new Schema({
  _id: reqString,            //to use own id
  email: reqString,
  username: reqString,
  password: reqString,
  messages: Number,          //count number of messages
  nameHistory: [String],      //every time name chage
  testScore: [Number]
})

module.exports = mongoose.model('keysIds', arraysSchema);


//controllers
const Users = require('../models/primaryUniqeId');

router.all = async (req, res) => {
    Users.find()
      .then(main => res.json(main));
}

router.creates = async = (req, res) => {
    const newUsers = new Users({
      _id: req.body._id,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    })

    newUsers.save().then(item => res.json(item));
}
`.trim();

const renameDoc = `
const reqString = { type: String, required: true }

const messageSchema = new Schema({
  userId: reqString,
  text: reqString
})

const userSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  level: Number,
  messages: [messageSchema],
  nameHistory: [String]
}, 
{ timeStamps: true })

module.exports = mongoose.model('renameRemoveDocs', userSchema);


//controllers
const Items = require('../models/renameDoc.js');

router.all = async (req, res) => {
    Items.find()
      .then(main => res.json(main));
}

router.updates = async = (req, res) => {
    const newItems = Items.updateMany({}, {
      // $rename: { password: req.body.password },   // rename password to pass
      $unst: { pass: '' },                           // remove field
    })
      .then(main => res.json(main));

    newItems.save().then(item => res.json(item));
}
`.trim();

const timeStamps = `
const reqString = { type: String, required: true }

const timeSchema = new Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  messages: {
    type: Number, default: 5, min: 0, max: 10
  },
  nameHistory: [String]       //every time name chage
},
{ timeStamps: true          //created and updated time automatically manage
})

module.exports = mongoose.model('timeStamps', timeSchema);


//controllers
const Users = require('../models/timeStamps');

router.all = async (req, res) => {
    Users.find()
      .then(main => res.json(main))
}


router.creates = async = (req, res) => {
    const newItems = new Users({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      messages: req.body.messages,
    })

    // const valid = new Promise((res) => {
    //   newItems.validate((err) => {
    //     if (err) {
    //       res(false)
    //     } else {
    //       res(true)
    //     }
    //   })
    // })

    // if (valid) {
    //   newItems.save()
    // }
    newItems.save().then(item => res.json(item));
}
`.trim();


class MongoCurd extends Component {
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
              <b>arrayOp.js</b>
              <div style={titles}>
                <PrismCode
                  code={arraysSchema}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>conditional.js</b>
              <div style={titles}>
                <PrismCode
                  code={conditional}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>increase.js</b>
              <div style={titles}>
                <PrismCode
                  code={increase}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>insertMany.js</b>
              <div style={titles}>
                <PrismCode
                  code={insertMany}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>items.js</b><br/>
              <div style={titles}>
                <PrismCode
                  code={itemsModels}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>nested.js</b>
              <div style={titles}>
                <PrismCode
                  code={nested}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>PluralizedCollectioName.js</b>
              <div style={titles}>
                <PrismCode
                  code={PluralizedCollectioName}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>primaryUniqeId.js</b>
              <div style={titles}>
                <PrismCode
                  code={primaryUniqeId}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>renameDoc.js</b>
              <div style={titles}>
                <PrismCode
                  code={renameDoc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>timeStamps.js</b>
              <div style={titles}>
                <PrismCode
                  code={timeStamps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
             <br/>
             <br/>

             <h3></h3>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(MongoCurd));
