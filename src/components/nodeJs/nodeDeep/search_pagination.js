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


const commentsModel = `
const CommentSchema  = new Schems({
  comment:{ type:String, trim: true },
  author:{ type: mongoose.Schema.Types.ObjectId, required:true, ref:'User' },
  postId:{ type: mongoose.Schema.Types.ObjectId, required:true, ref:'Post' },
  createdAt:{ type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
`.trim();

const postModel = `
const PostSchema  = new Schems({
  title:{ type:String, unique:true, required: true, trim: true },
  description:{ type: String, required:true, trim: true },
  author:{ type: mongoose.Schema.Types.ObjectId, required:true, ref:'User' },
  createdAt:{ type: Date, default: Date.now }
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
`.trim();

const userModel = `
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const Post      = require('./post')

const UserSchema  = Schems({
    name:{ type: String, required: true, trim: true },
    age:{ type: Number, default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{ type: String, required: true, unique:true, trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password:{ type:String, required:true, trim:true, minlength: 7,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password is invalid!')
            }else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    tokens:[{
        token:{ type:String, required: true }
    }],
    createdAt:{ type: Date, default: Date.now }
});

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
})




UserSchema.statics.checkValidCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return user
}

UserSchema.methods.newAuthToken = async function(){
    const user  = this
    const token =  jwt.sign({ _id: user.id.toString()}, "thisiskey")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

UserSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

//hash the plain text password before saving
UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.pre('remove', async function(next){
    const user = this
    await Post.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('User', UserSchema);
module.exports = User;`.trim();

const middleware = `
const jwt  = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        const decoded  =  jwt.verify(token, "thisiskey")
        const user  = await User.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth;
`.trim();

const userRoutes = `
const Post          = require('../models/post')
const Comment       = require('../models/comment')
const {ObjectID}    = require('mongodb')
const  authenticate = require('../middleware/auth')

router.post('/posts',authenticate, async (req,res) => {
    const post =  new Post({
        ...req.body,
        author: req.user._id
    })
    try {
        await post.save()
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/posts',async (req,res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/posts/:id',authenticate, async (req,res) => {
    const _id =  req.params.id
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const post = await Post.findOne({ _id, author: req.user._id })
        if(!post){
            return res.status(404).send()
        }
        res.send(post);
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/posts/:id/comment',authenticate, async (req,res) => {   
    const _id = req.params.id
    const userid = req.user._id

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    if (!ObjectID.isValid(userid)) {
        return res.status(404).send();
    }

    const comment = new Comment({
        ...req.body,
        author: userid,
        postId: _id
    })

    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (error) {
        res.status(400).send(error)
    }

})

//get all the comments related to the post
router.get('/posts/:id/comment', async (req,res) => {
    try {
        const post = await Post.findOne({_id: req.params.id})
        await post.populate('comments').execPopulate()
        res.send(post.comments)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/posts/:id',authenticate, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "title"]
    const isValidOperation  = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'Invalid updates'})
    }
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = await Post.findOne({_id: req.params.id, author:req.user._id})
        
       if(!post){
        res.status(404).send();
       }

       updates.forEach((update) => post[update] = req.body[update])
       await post.save()

       res.send(post);
    } catch (error) {
        res.status(400).send();
    }
})

router.delete('/posts/:id', authenticate,async (req,res) => {
    const _id = req.params.id
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const deletepost = await Post.findOneAndDelete({_id:_id, author: req.user._id})
        if (!deletepost) {
            return res.status(404).send();
        }
        res.send(deletepost)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;`.trim();

const postRoutes = `
const User = require('../models/user')
const {ObjectID} = require('mongodb')

const authenticate  = require('../middleware/auth')

router.post('/users', async (req,res) => {
    const user = new User(req.body);
    try{
        const token = await user.newAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me', authenticate ,async (req,res)=> {
   res.send(req.user)
})


router.patch('/users/me',authenticate ,async (req,res) => {
    const updates  = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id =  req.user._id

    if(!isValidOperation){
        res.status(400).send({error:'Invalid request'})
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {        
        updates.forEach((update) => req.user[update] = req.body[update]) 
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

})

router.delete('/users/me', authenticate, async (req,res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user  = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        console.log(user,token)
        res.send({ user, token})
    } catch (error) {
        console.log(error);
        res.status(400).send({error})        
    }
})

router.post('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;`.trim();

const server = `
const dbCon = require('./db/db');
const userRoutes = require('./router/user')
const PostRoutes = require('./router/post')

app.use("/items",userRoutes)
app.use("/items",PostRoutes)
`.trim();

const postman = `
{
"info": {
	"_postman_id": "2adff8c6-a833-4fdd-8846-929dea464969",
	"name": "NodejsAuth",
	"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
},
	"item": [
		{
			"name": "Create Users",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"name\":\"qwerty\",\n\t\"age\":40,\n\t\"email\":\"dummy1222@gmail.com\",\n\t\"password\":\"12345678\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/users",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Post",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"title\":\"Nodejs blog12\",\n\t\"description\":\"this is new blog on nodejs\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/posts",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts"
					]
				}
			},
			"response": []
		},
		{
			"name": "Read Profile",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/users/me",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"me"
					]
				}
			},
			"response": []
		},
		{
			"name": "Read Single Post",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/posts/5ca765dcde6cdb0017d34fd2",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts",
						"5ca765dcde6cdb0017d34fd2"
					]
				}
			},
			"response": []
		},
		{
			"name": "Comment on single post",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"comment\":\"Nice article\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/posts/5ca765dcde6cdb0017d34fd2/comment",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts",
						"5ca765dcde6cdb0017d34fd2",
						"comment"
					]
				}
			},
			"response": []
		},
		{
			"name": "Fecth comment on single post",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"comment\":\"Nice article\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/posts/5ca765dcde6cdb0017d34fd2/comment",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts",
						"5ca765dcde6cdb0017d34fd2",
						"comment"
					]
				}
			},
			"response": []
		},
		{
			"name": "Read Posts",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/posts",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update user",
			"request": {
				"method": "PATCH",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"name\": \"dummy12\",\n  \"password\":\"1234567890\"\n\t\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/users/me",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"me"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Post",
			"request": {
				"method": "PATCH",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"title\":\"dummy blog\",\n  \"description\":\"this is the first post\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/posts/5ca733287c6a7fe6b373c0d6",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts",
						"5ca733287c6a7fe6b373c0d6"
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete User",
			"request": {
				"method": "DELETE",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"description\":\"goto  sleep\",\n  \"completed\":false\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/users/me",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"me"
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete Post",
			"request": {
				"method": "DELETE",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/posts/5ca733287c6a7fe6b373c0d6",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"posts",
						"5ca733287c6a7fe6b373c0d6"
					]
				}
			},
			"response": []
		},
		{
			"name": "User Login",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "0e178f47-3f34-456f-b738-ca330497c1f3",
						"exec": [
						"if(pm.response.code === 200 ){",
						"pm.environment.set('authtoken', pm.response.json().token)",
						"}"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n \"email\":\"dummy1222@gmail.com\",\n \"password\":\"12345678\"\n}"
				},
				"url": {
					"raw": "{{nodeurl}}/users/login",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Logout ",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/users/logout",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"logout"
					]
				}
			},
			"response": []
		},
		{
			"name": "Logout All",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{nodeurl}}/users/logout",
					"host": [
						"{{nodeurl}}"
					],
					"path": [
						"users",
						"logout"
					]
				}
			},
			"response": []
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "{{authtoken}}",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"id": "9c7ef4d3-64b2-49fe-b1db-65a8c6b26b1a",
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"id": "5df7dc9c-9a59-4ceb-befc-6dcef99063dd",
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	]
}`.trim();


class SearchPagination extends Component {
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
              <h3>Search_Pagination_Sort</h3>
              <b>middleware/auth.js</b>
              <div style={titles}>
                <PrismCode
                  code={middleware}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/commets.js</b>
              <div style={titles}>
                <PrismCode
                  code={commentsModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/post.js</b>
              <div style={titles}>
                <PrismCode
                  code={postModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>models/user.js</b>
              <div style={titles}>
                <PrismCode
                  code={userModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>router/post.js</b>
              <div style={titles}>
                <PrismCode
                  code={userRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>router/user.js</b>
              <div style={titles}>
                <PrismCode
                  code={postRoutes}
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

              <b>postman</b>
              <div style={titles}>
                <PrismCode
                  code={postman}
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

export default (withStyles(styles)(SearchPagination));
