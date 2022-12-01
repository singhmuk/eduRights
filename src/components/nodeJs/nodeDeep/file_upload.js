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


const fileModel = `
const ProductSchema = new Schems({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
`.trim();

const fileControllers = `
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

module.exports = {
  createProduct,
  getAllProducts,
};`.trim();

const uploadControllers = `
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + '$'{productImage.name}'
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: '/uploads/'$'{productImage.name}' } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
`.trim();

const fileRoutes = `
const { createProduct,  getAllProducts } = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;
`.trim();

const authMiddleware = `
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
`.trim();

const errorHandler = `
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = 'Duplicate value entered for '$'{Object.keys(
      err.keyValue
    )} field, please choose another value'
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = 'No item found with id : '$'{err.value}'
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware;
`.trim();

const noteFound = `
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound;
`.trim();

const badReq = `
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
`.trim();

const commonApi = `
class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomAPIError;
`.trim();

const NotFoundError = `
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
`.trim();

const UnauthenticatedError = `
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
`.trim();

const errorIndex = `
const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
`.trim();

const server = `
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./db/connect');
const productRouter = require('./routes/productRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static('./public'));
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/products', productRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
`.trim();


class FileUpload extends Component {
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
              <h3>File Upload</h3>
              <b>middleware/authentication.js</b>
              <div style={titles}>
                <PrismCode
                  code={authMiddleware}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>middleware/error-handler.js</b>
              <div style={titles}>
                <PrismCode
                  code={errorHandler}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>middleware/not-found.js</b>
              <div style={titles}>
                <PrismCode
                  code={noteFound}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              
              <b>models/product.js</b>
              <div style={titles}>
                <PrismCode
                  code={fileModel}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/productController.js</b>
              <div style={titles}>
                <PrismCode
                  code={fileControllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/uploadsController.js</b>
              <div style={titles}>
                <PrismCode
                  code={uploadControllers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/productRoutes.js</b>
              <div style={titles}>
                <PrismCode
                  code={fileRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>errors/bad-request.js</b>
              <div style={titles}>
                <PrismCode
                  code={badReq}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>errors/custom-api.js</b>
              <div style={titles}>
                <PrismCode
                  code={commonApi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>errors/not-found.js</b>
              <div style={titles}>
                <PrismCode
                  code={NotFoundError}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>errors/unauthenticated.js</b>
              <div style={titles}>
                <PrismCode
                  code={UnauthenticatedError}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>index.js</b>
              <div style={titles}>
                <PrismCode
                  code={errorIndex}
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
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(FileUpload));
