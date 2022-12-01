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


const config = `
const mongoose = require('mongoose');

const dbCon = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
  })


  module.exports = dbCon;`.trim();

const models = `
const mongoose = require('mongoose');
const Schems = mongoose.Schema;

const ItemSchema = new Schems({
  name: {type:String, required:true, minlength: [3, "Length aleast 3 characters or longer"]},
  rank: {type:Number, required: [true, "Please provide a name to the bootcamp"]},
  counts: [Number],
  isAdmin: { type: Boolean, required: true, default: false },
  followers: {type:Array, default:[]},
  desc: { type: String, max: 500 },
  img: { type: String },
  date: {type:Date, default:Date.now}
  students: [{ type: 'ObjectId', ref: 'Student' }],               //ref name == schemma name
  type: { type: String, required: true, default:'professional' }, //radio
},
{ timestamps: true })

module.exports = Item = mongoose.model('item', ItemSchema);`.trim();

const controllers = `
const express = require('express');
const router = express.Router();
const Item = require('../models/items');


router.getAll = async (req,res) => {
    try{
        Item.find()
             .sort({date:-1})
             .then(item=>res.json(item));
    }catch(err){
        console.log(err)
    }
}

router.createItem = async (req,res) => {
    try{
        const newItem = new Item({
            name: req.body.name
        });

        newItem.save().then(item => res.json(item));
    }catch(err){
        console.log(err)
    }
}

router.getById = async (req,res) => {
    try{
        Item.findById(req.params.id)
            .then(item => res.json(item))
    }catch(err){
        console.log(err)
    }
}

router.remove = async (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => item.remove()
        .then(() => res.json({success:true})))
}

router.updates = async (req,res) => {
    Item.findByIdAndUpdate(req.params.id, {
        name:req.body.name
    }, {new:true}).then(data=>res.send(data))
}


module.exports = router;`.trim();

const routes = `
const express = require('express');
const router = express.Router();
const ItemControllers = require('../controllers/items');

router.route("/").get(ItemControllers.getAll);
router.route("/:id").get(ItemControllers.getById);
router.route("/").post(ItemControllers.createItem);
router.route("/:id").delete(ItemControllers.remove);
router.route("/:id").put(ItemControllers.updates);

module.exports = router;`.trim();

const server = `
const express=require('express');
const app=express();
require('dotenv').config();
const dbCon = require('./config/db');
const itemsRouter = require('./routes/items')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

dbCon;

app.use("/items", itemsRouter);

const port = process.env.PORT;
app.listen(port,()=> console.log('Server is running on port '$'{port}'))`.trim();

const students = `
const classSchema = new Schema({
  name: { type: String, unique: true },
  students: [{ type: 'ObjectId', ref: 'Student' }]
})
//students is refress like objectId not data in a class can be many students should be ref name == schemma name

module.exports = mongoose.model("Class", classSchema);


//studentSchema
const studentSchema = new Schema({
  name: { type: String, unique: true },
  age: Number,
  subject: String,
})

module.exports = mongoose.model("Student", studentSchema);
`.trim();

const controllersClass = `
const Class = require('../models/class');

router.all = async (req, res) => {
    Class.find({}).populate('students').exec((err, docs) => {
      //populate fields which want to pass
      if (err) throw (err);
      res.json(docs)
    })
};

router.createClass = async (req, res) => {
    let newClass = new Class();
    newClass.name = req.body.name;
    newClass.students = [];
    newClass.save((err) => {
      if (err) res.json({ "error": err });
      else res.json(newClass)
    })
};

router.updateClass = async (req, res) => {
    Class.findOneAndUpdate({ _id: req.params.id },
      { $push: { students: req.body.studentsId } }, { new: true }, (err, doc) => {
        //$push used to push data in students array, we push studentsId
        if (err) throw (err);
        else res.json(doc)
      })
};`.trim();

const controllersStudents = `
const Student = require('../models/students');

router.all = async (req, res) => {
    Student.find({}).exec((err, docs) => {
      if (err) throw (err);
      res.json(docs)
    })
};

router.createStudent = async (req, res) => {
    let student = new Student();
    student.name = req.body.name;
    student.age = req.body.age;
    student.subject = req.body.subject;
    student.save((err) => {
      if (err) res.json({ "error": err });
      else res.json(student)
    })
};

router.updateStudent = async (req, res) => {
    Student.findOneAndUpdate({ _id: req.param.id },
      { $set: { age: req.body.age } }, { new: true }, (err, doc) => {
        if (err) throw (err);
        else res.json(doc)
      })
};

// app.put('/students/:id', (req, res) => {
//   Student.findOneAndUpdate({ _id: req.param.id },
//     { $set: { age: req.body.age } }, { new: true }, (err, doc) => {
//       if (err) throw (err);
//       else res.json(doc)
//     })
// })`.trim();

const classRoutes = `
const classCont = require('../controllers/class');

router.route("/").get(classCont.all);
router.route("/").post(classCont.createClass);
router.route("/:id").put(classCont.updateClass);


//Students Routes
const express = require('express');
const router = express.Router();
const studentsCont = require('../controllers/students');

router.route("/").get(studentsCont.all);
router.route("/").post(studentsCont.createStudent);
router.route("/:id").put(studentsCont.updateStudent);
`.trim();

const serverJoin = `
const classRoutes = require('./routes/classRoutes');
const studetsRoutes = require('./routes/studentsRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbCon;

app.use('/class', classRoutes);
app.use('/students', studetsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server listening on port.'));`.trim();

const modelsJoin = `
const courseSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  category: String
});

const studentSchema = new mongoose.Schema({
  name: String,
  enroll: Number,
  courseId: Number
});

const Course = mongoose.model('course', courseSchema);
const Student = mongoose.model('student', studentSchema);

module.exports = { Student, Course }


//ItemsOp
const ItemsOp = mongoose.Schema({
  name: String,
  date: new Date(),
  ItemsOps: [{ type: mongoose.Schema.ObjectId, ref: 'itemsOps' }]
});

module.exports = mongoose.model('itemsOp', ItemsOp);


//ItemsOps
const ItemsOps = mongoose.Schema({
  name: String,
  price: Number,
  ItemsOp: [{ type: mongoose.Schema.ObjectId, ref: 'itemsOp' }]
});

module.exports = mongoose.model('itemsOps', ItemsOps);
`.trim();

const controllersFinds = `
const { Student, Course } = require('../models/finds');

var dbcourse = [];
router.all = async (req, res, next) => {
    Course.find({ category: "database" })
      .then(data => {
        console.log("Database Courses:", data)

        data.map((d, k) => {
          dbcourse.push(d._id);
        })

    Student.find({ courseId: { $in: dbcourse } })
      .then(data => {
        console.log("Students in Database Courses:"+ data +"dbcourse", dbcourse)
      })
      .catch(error => {
        console.log(error);
      })
  })
};`.trim();

const controllersItem = `
const Item = require('../models/item');

router.all = async (req, res, next) => {
    Item.find()
      .populate({
        path: 'itemsOps',
        populate: { path: 'itemsOps' }
      })
      .sort({ date: -1 })
      .then(items => res.json(items));
};

router.getOne = async (req, res, next) => {
    Item.findById(req.params.id)
      .sort({ date: -1 })
      .then(items => res.json(items));
};

router.creates = async (req, res, next) => {
    const newItem = new Item({
      name: req.body.name
    });

    newItem.save().then(item => res.json(item));
};

router.update = async (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    }, { new: true }).then(data => { res.send(data) })
};

router.remove = async (req, res, next) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
};`.trim();

const controllersItemsOp = `
const Item = require('../models/itemsOp');

router.allsorts = async (req, res, next) => {
    Item.find()
      .sort({ price: 1 })
      .then(items => res.json(items));
};

router.creates = async (req, res, next) => {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price
    });

    newItem.save().then(item => res.json(item));
};

//Limit
router.limits = async (req, res, next) => {
    Item.find()
      .limit(2)
      .then(items => res.json(items));
};

//filter Regx
router.filtersRegx = async (req, res, next) => {
  var query = { name: /^C/ };
  
    Item.find(query)
      .then(items => res.json(items));
};

//filter 
router.filters = async (req, res, next) => {
  var query = { name: "Mobile" };
    Item.find(query)
      .then(items => res.json(items));
};

//left join
router.joins = async (req, res, next) => {
  var query = { name: "Mobile" };
    Item.find(query)
      .then(items => res.json(items));
};`.trim();

const routesJoin = `
const itemRoutes = require('../controllers/finds');
router.route("/").get(itemRoutes.all);


//itemRoutes
const itemRoutes = require('../controllers/item');

router.route("/").get(itemRoutes.all);
router.route("/:id").get(itemRoutes.getOne);
router.route("/").post(itemRoutes.creates);
router.route("/:id").patch(itemRoutes.update);
router.route("/:id").delete(itemRoutes.remove);


//itemOpRoutes
const itemRoutes = require('../controllers/itemsOp');

router.route("/").get(itemRoutes.allsorts);
router.route("/").post(itemRoutes.creates);
router.route("/lmt").get(itemRoutes.limits);
router.route("/fltrebx").get(itemRoutes.filtersRegx);
router.route("/flt").get(itemRoutes.filters);
router.route("/ljoins").get(itemRoutes.joins);
`.trim();

const serverJoinRef = `
const itemsOp = require('./routes/itemsOp');
const findsOp = require('./routes/finds');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbCon;

app.use('/itemsOp', itemsOp);
app.use('/finds', findsOp);

const port = process.env.PORT;
app.listen(port, () => console.log('Server listening on port.''));`.trim();


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
              <h3>MongoCurd</h3>
              <b>config/db.js</b>
              <div style={titles}>
                <PrismCode
                  code={config}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={models}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={routes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={server}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>Join</h3>
              <b>models/class.js</b><br/>
              <b>models/students.js</b>
              <div style={titles}>
                <PrismCode
                  code={students}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/class.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllersClass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllersStudents/students.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllersStudents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/items.js</b>
              <div style={titles}>
                <PrismCode
                  code={classRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={serverJoin}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>Join_Ref</h3>
              <b>modelsJoin/finds.js</b><br/>
              <b>modelsJoin/item.js</b><br/>
              <b>modelsJoin/itemsOp.js</b><br/>
              <div style={titles}>
                <PrismCode
                  code={modelsJoin}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <b>controllers/finds.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllersFinds}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <b>controllers/item.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllersItem}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <b>controllers/itemsOp.js</b>
              <div style={titles}>
                <PrismCode
                  code={controllersItemsOp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <b>routes/find.js</b>
              <div style={titles}>
                <PrismCode
                  code={routesJoin}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <br/>

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={serverJoinRef}
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

export default (withStyles(styles)(MongoCurd));
