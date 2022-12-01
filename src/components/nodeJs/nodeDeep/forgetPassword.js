import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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

const checkAuth = `
module.exports = {
  ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      req.flash('error_msg', 'Please log in first!');
      res.redirect('/auth/login');
  },
  forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
          return next();
      }
      res.redirect('/dashboard');
  }
};`.trim()

const Key = `
module.exports = {
  MongoURI: "mongodb://localhost:27017/ShopingList"
}`.trim()

const Passport = `
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //------------ User Matching ------------//
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'This email ID is not registered' });
                }

                //------------ Password Matching ------------//
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect!.' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};`.trim()

const UserSchema = `
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;`.trim()

const AuthController = `
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const User = require('../models/User');

//------------ Register Handle ------------//
exports.registerHandle = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //------------ Checking required fields ------------//
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    //------------ Checking password mismatch ------------//
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //------------ Checking password length ------------//
    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //------------ Validation passed ------------//
        User.findOne({ email: email }).then(user => {
            if (user) {
                //------------ User already exists ------------//
                errors.push({ msg: 'Email ID already registered' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {

        const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });
        const CLIENT_URL = 'http://' + req.headers.host;

        const output = '
        <h2>Please click on below link to activate your account</h2>
        <p>'$'{CLIENT_URL}/auth/activate/'$'{token}</p>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        ';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "nodejsa@gmail.com",
                pass: "nodejs123",
            },
        });

        // send mail with defined transport object
        const mailOptions = {
            from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Account Verification: NodeJS Auth ✔", // Subject line
            html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                req.flash(
                    'error_msg',
                    'Something went wrong on our end. Please register again.'
                );
                res.redirect('/auth/login');
            }
            else {
                console.log('Mail sent : %s', info.response);
                req.flash(
                    'success_msg',
                    'Activation link sent to email ID. Please activate to log in.'
                );
                res.redirect('/auth/login');
            }
        })
        }
        });
    }
}

//------------ Activate Account Handle ------------//
exports.activateHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or expired link! Please register again.'
                );
                res.redirect('/auth/register');
            }
            else {
                const { name, email, password } = decodedToken;
                User.findOne({ email: email }).then(user => {
                    if (user) {
                        //------------ User already exists ------------//
                        req.flash(
                            'error_msg',
                            'Email ID already registered! Please log in.'
                        );
                        res.redirect('/auth/login');
                    } else {
                        const newUser = new User({
                            name,
                            email,
                            password
                        });

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        req.flash(
                                            'success_msg',
                                            'Account activated. You can now log in.'
                                        );
                                        res.redirect('/auth/login');
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    }
                });
            }

        })
    }
    else {
        console.log("Account activation error!")
    }
}

//------------ Forgot Password Handle ------------//
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    let errors = [];

    //------------ Checking required fields ------------//
    if (!email) {
        errors.push({ msg: 'Please enter an email ID' });
    }

    if (errors.length > 0) {
        res.render('forgot', {
            errors,
            email
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                //------------ User already exists ------------//
                errors.push({ msg: 'User with Email ID does not exist!' });
                res.render('forgot', {
                    errors,
                    email
                });
            } else {

            const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;
                const output = '
                <h2>Please click on below link to reset your account password</h2>
                <p>'$'{CLIENT_URL}/auth/forgot/'$'{token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                ';

                User.updateOne({ resetLink: token }, (err, success) => {
                    if (err) {
                        errors.push({ msg: 'Error resetting password!' });
                        res.render('forgot', {
                            errors,
                            email
                        });
                    }
                    else {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: "nodejsa@gmail.com",
                                pass: "nodejs123",
                            },
                        });

                        // send mail with defined transport object
                        const mailOptions = {
                            from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: "Account Password Reset: NodeJS Auth ✔", 
                            html: output, // html body
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                req.flash(
                                    'error_msg',
                                    'Something went wrong on our end.'
                                );
                                res.redirect('/auth/forgot');
                            }
                            else {
                                console.log('Mail sent : %s', info.response);
                                req.flash(
                                    'success_msg',
                  'Password reset link sent to email ID. Please follow the instructions.'
                                );
                                res.redirect('/auth/login');
                            }
                        })
                    }
                })

            }
        });
    }
}

//------------ Redirect to Reset Handle ------------//
exports.gotoReset = (req, res) => {
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or expired link! Please try again.'
                );
                res.redirect('/auth/login');
            }
            else {
                const { _id } = decodedToken;
                User.findById(_id, (err, user) => {
                    if (err) {
                        req.flash(
                            'error_msg',
                            'User with email ID does not exist! Please try again.'
                        );
                        res.redirect('/auth/login');
                    }
                    else {
                        res.redirect(/auth/reset/'$'{_id})
                    }
                })
            }
        })
    }
    else {
        console.log("Password reset error!")
    }
}


exports.resetPassword = (req, res) => {
    var { password, password2 } = req.body;
    const id = req.params.id;
    let errors = [];

    //------------ Checking required fields ------------//
    if (!password || !password2) {
        req.flash(
            'error_msg',
            'Please enter all fields.'
        );
        res.redirect('/auth/reset/'$'{id}');
    }

    //------------ Checking password length ------------//
    else if (password.length < 8) {
        req.flash(
            'error_msg',
            'Password must be at least 8 characters.'
        );
        res.redirect('/auth/reset/'$'{id}');
    }

    //------------ Checking password mismatch ------------//
    else if (password != password2) {
        req.flash(
            'error_msg',
            'Passwords do not match.'
        );
        res.redirect('/auth/reset/'$'{id}');
    }

    else {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                User.findByIdAndUpdate(
                    { _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash(
                                'error_msg',
                                'Error resetting password!'
                            );
                            res.redirect(/auth/reset/'$'{id});
                        } else {
                            req.flash(
                                'success_msg',
                                'Password reset successfully!'
                            );
                            res.redirect('/auth/login');
                        }
                    }
                );
                
            });
        });
    }
}

//------------ Login Handle ------------//
exports.loginHandle = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
}

//------------ Logout Handle ------------//
exports.logoutHandle = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
}`.trim()

const AuthRoutes = `
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.get('/login', (req, res) => res.render('login'));

router.get('/forgot', (req, res) => res.render('forgot'));

router.get('/reset/:id', (req, res) => {
    res.render('reset', { id: req.params.id })
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', authController.registerHandle);

router.get('/activate/:token', authController.activateHandle);

router.post('/forgot', authController.forgotPassword);

router.post('/reset/:id', authController.resetPassword);

router.get('/forgot/:token', authController.gotoReset);

router.post('/login', authController.loginHandle);

router.get('/logout', authController.logoutHandle);

module.exports = router;`.trim()

const IndexRoutes = `
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

router.get('/', (req, res) => {
    res.render('welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

module.exports = router;`.trim()

const Server = `
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

const db = require('./config/key').MongoURI;

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
 })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(Server running on PORT));`.trim()



class ForgetPassword extends Component {
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
      <h5>Forget Password</h5>
      <b>config</b>
      <br/>
      config/checkAuth.js
      <div style={titles}>
      <PrismCode
        code={checkAuth}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      config/Key.js
      <div style={titles}>
        <PrismCode
          code={Key}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      config/Passport.js
      <div style={titles}>
        <PrismCode
          code={Passport}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      models/UserSchema.js
      <div style={titles}>
        <PrismCode
          code={UserSchema}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      controllers/AuthController.js
      <div style={titles}>
        <PrismCode
          code={AuthController}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      routes/AuthRoutes.js
      <div style={titles}>
        <PrismCode
          code={AuthRoutes}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      routes/IndexRoutes.js
      <div style={titles}>
        <PrismCode
          code={IndexRoutes}
          language="js"
          plugins={["line-numbers"]}
        />
      </div>
      <br/>
      <br/>
      Server.js
      <div style={titles}>
        <PrismCode
          code={Server}
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

export default (withStyles(styles)(ForgetPassword));
