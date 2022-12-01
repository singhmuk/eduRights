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


const image = `
import cv2
print("Package cv2 imorted");

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
cv2.imshow("output", img)
cv2.waitKey(0)
`.trim()

const video = `
import cv2
cap = cv2.VideoCapture("Resources/test.mp4")

while True:
    success, img = cap.read();
    cv2.imshow("Video", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break;
`.trim()

const webcam = `
import cv2

cap = cv2.VideoCapture(0)  //0 is default for laptop camra
cap.set(3,640)
cap.set(4,640)
import cv2

cap = cv2.VideoCapture(0)  //0 is default for laptop camra
cap.set(3,640)
cap.set(4,640)
`.trim()

const gray = `
import cv2

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cv2.imshow("Gray Image", imgGray)
cv2.waitKey(0)
`.trim()

const blur = `
import cv2

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
imgBlur = cv2.GaussianBlur(img, (7,7),0)

cv2.imshow("Blur Image", imgBlur)
cv2.waitKey(0)
`.trim()

const canny = `
import cv2

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
imgCanny = cv2.Canny(img, 100,100)

cv2.imshow("Canny Image", imgCanny)
cv2.waitKey(0)
`.trim()

const dialation = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
kernel = np.ones((5,5),np.uint8)

imgCanny = cv2.Canny(img, 100,100)
imgDialation = cv2.dilate(imgCanny, kernel, iterations=1)

cv2.imshow("Canny Image", imgCanny)
cv2.imshow("Dialation Image", imgDialation)
cv2.waitKey(0)
`.trim()

const eroded = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
kernel = np.ones((5,5),np.uint8)

imgCanny = cv2.Canny(img, 100,100)
imgDialation = cv2.dilate(imgCanny, kernel, iterations=1)
imgEroded = cv2.erode(imgDialation, kernel, iterations=1)

cv2.imshow("Canny Image", imgCanny)
cv2.imshow("Dialation Image", imgDialation)
cv2.imshow("Eroded Image", imgEroded)
cv2.waitKey(0)
`.trim()

const resize = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
print(img.shape)

imgResize = cv2.resize(img, (300,200))

cv2.imshow("Image",img)
cv2.imshow("Resize",imgResize)

cv2.waitKey(0)
`.trim()

const crop = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")

imgCropped = img[0:200,200:500]

cv2.imshow("Image",img)
cv2.imshow("Cropped",imgCropped)

cv2.waitKey(0)
`.trim()

const shapes = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
img = np.zeros((512,512,3),np.uint8)
print(img)
img[:]= 255,0,0

cv2.imshow("Image", img)
cv2.waitKey(0)
`.trim()

const draw = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
img = np.zeros((512,512,3),np.uint8)

cv2.line(img,(0,0),(300,300),(0,255),3)

cv2.imshow("Image", img)
cv2.waitKey(0)
`.trim()

const Prespective = `
import cv2
import numpy as np

img = cv2.imread("D:\Python\Machin_Learning\openCV\Resources\imgs.jpg")
width,height = 250,350
pts1 = np.float32([[111, 219],[287, 188],[154, 482], [352, 440]])
pts2 = np.float32([[0,0],[width,0],[0,height],[width,height]])
matrix = cv2.getPerspectiveTransform(pts1, pts2)
imgOutput = cv2.warpPerspective(img,matrix,(width,height))

cv2.imshow("Output", imgOutput)
cv2.waitKey(0)
`.trim()


class Capture extends Component {
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
      <h3>Capture image:</h3>
      <div style={titles}>
      <PrismCode
        code={image}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Capture video</h3>
      <div style={titles}>
      <PrismCode
        code={video}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <i>To close video press 'q' on terminal</i>
      <br/>
      <br/>
      <h3>Capture video use webcam:</h3>
      <div style={titles}>
      <PrismCode
        code={webcam}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Basic function: Find Gray Img</h3>
      <div style={titles}>
      <PrismCode
        code={gray}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Blur</h3>
      <div style={titles}>
      <PrismCode
        code={blur}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Canny</h3>
      <div style={titles}>
      <PrismCode
        code={canny}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Dialation</h3>
      <div style={titles}>
      <PrismCode
        code={dialation}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Eroded: Opposite to Dialation</h3>
      <div style={titles}>
      <PrismCode
        code={eroded}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Opencv Convention/Resize Image</h3>
      <div style={titles}>
      <PrismCode
        code={resize}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Crop Image</h3>
      <div style={titles}>
      <PrismCode
        code={crop}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Shapes and Texts:</h3>
      <div style={titles}>
      <PrismCode
        code={shapes}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Line draw:</h3>
      <div style={titles}>
      <PrismCode
        code={draw}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <h3>Earp Prespective:</h3>
      <div style={titles}>
      <PrismCode
        code={Prespective}
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

export default (withStyles(styles)(Capture));
