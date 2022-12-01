import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';


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


const accept = `
<input type="file" id="soundFile" accept="audio/*">
<input type="file" id="videoFile" accept="video/*">
<input type="file" id="imageFile" accept="image/*" multiple>
<input type="file" id="profile_pic" name="profile_pic" accept=".jpg, .jpeg, .png">
 `.trim();

const iframe = `
<iframe src="https://example.org"
    title="iframe" width="400" height="300">
</iframe>


//
<address>Delhi, India</address>


//
<citr>The Title Of Books</citr> Book written by ...


//
<marquee direction="right">Moving Text</marquee>
<marquee direction="up">Moving Text</marquee><br/>
 `.trim();

const autocapitalize = `
#syntex
<tag_name autocapitalize="off | none | on | sentences | words | characters" />


#Ex.
div.a { text-transform: uppercase/ lowercase/ capitalize; }
<div class="a">Uppercase.</div>


//
<a href="https://www.google.com" target="_blank">Open new tab</a><br/>
<a href="#local">SPA</a>
<p id="local">Move to SPA Block</p>
`.trim();

const audio = `
<figure>
    <figcaption>Listen to the T-Rex:</figcaption>
    <audio controls>
      <source src="horse.mp3" type="audio/mpeg">
    </audio>
</figure>`.trim();

const video = `
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
</video>
`.trim();

const capture = `
	<input type="file" id="soundFile" capture="user" accept="audio/*">
<input type="file" id="videoFile" capture="environment" accept="video/*">
<input type="file" id="imageFile" capture="user" accept="image/*">
`.trim();

const textarea = `
<textarea id="story" name="story" rows="5" cols="33">
  It was a dark and stormy night...
</textarea>
`.trim();

const area = `
<map name="planetmap">
  <area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.htm">
  <area shape="circle" coords="90,58,3" alt="Mercury" href="mercur.htm">
  <area shape="circle" coords="124,58,8" alt="Venus" href="venus.htm">
</map>
`.trim();

const object = `
<object data="movie.mp4" width="400" height="300"></object>

<object data="snippet.html" width="500" height="200"></object>
`.trim();

const optgroup = `
<form action="/action_page.php">
  <label for="cars">Choose a car:</label>
  <select name="cars" id="cars">
    <optgroup label="Swedish Cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
    </optgroup>
  </select>
  <input type="submit" value="Submit">
</form>
`.trim();

const outputs = `
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="a" value="50">
  +<input type="number" id="b" value="25">
  =<output name="x" for="a b"></output>
</form>
`.trim();

const section = `
<section>
  <p>The he World Wildlife Fund. WWF was founded in 1961.</p>
</section>
`.trim();

const autocomplete = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
  box-sizing: border-box;
}

body {
  font: 16px Arial;
}

.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>
</head>
<body>

<h2>Autocomplete</h2>

<p>Start typing:</p>

<form autocomplete="off" action="/action_page.php">
  <div class="autocomplete" style="width:300px;">
    <input id="myInput" type="text" name="myCountry" placeholder="Country">
  </div>
  <input type="submit">
</form>

<script>
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      
      closeAllLists();                                                   //close already open lists of autocompleted values
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
                                                              //check item starts with the same letters as text field value
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");                             //create DIV element for each matching element
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";           //make matching letters bold
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";                   //insert current array item's
      
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
 
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        
        currentFocus++;                                        //If arrow DOWN key is pressed increase the currentFocus
        addActive(x);                                          //make the current item more visible
      } 
      else if (e.keyCode == 38) {                            //up
        currentFocus--;                                        //If arrow UP key is pressed,decrease
        addActive(x);
      } 
      else if (e.keyCode == 13) {                            //If ENTER pressed, prevent the form being submitted
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();                     //simulate a click on the "active" item
        }
      }
  });
  
  function addActive(x) {
    if (!x) return false;                                    //function to classify an item as "active"
    removeActive(x);                                         //start by removing the "active" class on all items
    
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");    //add class "autocomplete-active"
  }
  
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina",
"Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
"Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands",
"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands",
"Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire",
"Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
"Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji",
"Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar",
"Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras",
"Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica",
"Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
"Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi",
"Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
"Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands",
"Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman",
"Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino",
"Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
"Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
"St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
"Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey",
"Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
"United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
"Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

autocomplete(document.getElementById("myInput"), countries);
</script>`.trim();

const geolocation = `
//index.js
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

var x = document.getElementById("demo");


//index.html
  <body>
    <button onclick="getLocation()">Get Location</button>
    <p id="demo"></p>
    <script type="text/javascript" src="index.js"></script>
  </body>
`.trim();

const dragDrop = `
//index.js
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}


//index.html
<style>
#div1, #div2 {
  float: left;
  width: 100px;
  height: 35px;
  border: 1px solid black;
}
</style>
  <script type="text/javascript" src="index.js"></script>
</head>

<body>
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
  <img src="img_w3slogo.gif" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
</div>

  <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
</body>
`.trim();

const workerWorker = `var worker = new Worker("sample_prog.js"﴿;`.trim();

const serverSentEvent = `
var source = new EventSource("sse_demo.php");
source.onmessage = function(event) {
document.getElementById("result").innerHTML += event.data + "<br>";
};
`.trim();

const element = `
<script>
document.createElement﴾"myElement"﴿
</script>


//It can be used in the HTML as.
<myElement>hello</myElement>
`.trim();

const Session = `
//Use setItem() function to store data in Session Storage
sessionStorage.setItem (‘key’,’value’);

sessionStorage.setItem (‘username’,’Meenakshi’)


//Use getItem() function to retrieve data from Session Storage
sessionStorage.getItem(‘key’);

var username= sessionStorage.getItem(‘username’);


/*
  We can only store String in Session Storage. To save the objects in Session, first, convert 
  the object into JSON string and then store this string in Session Storage as
*/

sessionStorage.setItem (‘object’, JSON.stringify(object));


//If JSON string gets stored in Session Storage, then first convert it into an object as follows.

var object=JSON.parse(sessionStorage.getItem(‘object’));


//Use removeItem() function to delete a particular key from Session Storage.
sessionStorage.removeItem(‘key’);

`.trim();

const pres = `
<pre>
   My Bonnie lies over the ocean.
</pre>`.trim();

const htmlStyles = `
<tagname style="property:value;">`.trim();

const quotation = `
q for: <q>Short Quotations.</q>

<abbr title="World Health Organization">WHO</abbr>

<bdo dir="rtl">This text will be written from right to left</bdo>
`.trim();

const address = `
<p>Email link <a href="mailto: admin@gmail.com">admin@gmail.com</a></p>


//
Read Pdf by embed, iframe and object.
<embed src="CM_Process.pdf" type="application/pdf"><br/>
`.trim();

const htmltags = `
Tags: There are 2 types of HTML Tags.
1. Cntainer Tag <p></p>
2. Empty Tag <hr/>

Element: Element is combination of Tag and containt.
Ex. <p>Here is containt</p>

HTML Attributes: Attributes provide additional information about an element.
Always specifed in the start tag.
Come in name/ value pairs. Like name="value"
Ex. <p title="about paragraph">Here is containt</p>
`.trim();

const metertags = `
Temp: <meter min=0 max=10 value=".5" low="3" high="8" optimum="5"></meter>
Download: <progress max="100" value="80"></progress>
`.trim();

const cellSpacing = `
table {
  border-spacing: 30px;
}
`.trim();

const cellPadding = `
th, td {
  padding: 15px;
}
`.trim();


class Html1 extends Component {
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
              <ol>
                <li><b>Html: </b>Structure</li>
                <li><b>css: </b>Styles</li>
              </ol>
              <br />
              <b>Div and Span are used to structure webpage. They are structure element.</b>
              <ol>
                <li><b>div: </b>Block Element</li>
                <li><b>span: </b>Inline Element</li>
              </ol>
              <br />

              <h3>1.What is a tag in HTML?</h3>
              A tag instructs the Browser about how to format the HTML properly.<br /><br />
              <br />

              <h3>2.What is the difference between HTML elements and tags?</h3>
              HTML elements communicate to the Browser how to represent the text. They become HTML tags when enclosed within angular brackets.
              <br />
              <div style={titles}>
                <PrismCode
                  code={htmltags}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3.HTML Attributes</h3>
              HTML attributes provide additional information about HTML elements.
              <ol>
                <li>All HTML elements can have <b>attributes.</b></li>
                <li>Attributes provide <b>additional information </b>about elements.</li>
                <li>Attributes are always specified in <b>the start tag.</b></li>
                <li>Attributes usually come in name/value pairs like: <b>name="value"</b></li>
              </ol>
              <br />

              <h3>4.pre Element</h3>
              <ol>
                <li>The HTML 'pre' element defines preformatted text.</li>
                <li>The text inside a 'pre' element is displayed in a fixed-width font (usually Courier), and it preserves both spaces and line breaks.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={pres}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5.HTML Style Attribute</h3>
              <div style={titles}>
                <PrismCode
                  code={htmlStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. What is the difference between the ‘id’ attribute and the ‘class’ attribute of HTML elements?</h3>
              <ol>
                <li> Multiple elements in HTML can have the same class value.</li>
                <li>id attribute of one element cannot be associated with another HTML element.</li>
              </ol>
              <br />

              <h3>7.Non-semantic elements</h3>
              These elements are without any definition. They don’t describe anything about their structure such as 'span' and 'div'.
              <br />

              <h3>8. What are void elements in HTML?</h3>
              HTML elements which don't have closing Tags are Void elements. For Example br, img, hr, etc.
              <br />

              <h3>9. What is the advantage of collapsing white space?</h3>
              A blank sequence of whitespace characters is treated as a single space character Because the browser collapses multiple
              spaces into a single space character this helps as.
              <ol>
                <li>A developer to indent lines of text without worrying about multiple spaces</li>
                <li>Maintain readability and understandability of HTML codes.</li>
              </ol>
              <br />

              <h3>10. Is it possible to change an inline element into a block level element?</h3>
              Yes, it is possible using the “display” property with its value as “block”, to change the inline element into a block-level elemen.
              <br />

              <h3>11.What would happen if the HTML Document does not contain '!DOCTYPE'?</h3>
              <ol>
                <li>It instructs the Web Browser about the version of HTML used for creating the Web page.</li>
                <li><b>What happens if you miss !DOCTYPE.</b></li>
                <ol>
                  <li>then new features and tags provided by HTML5 will not be supported.</li>
                  <li>HTML enter Quirks mode.</li>
                  <li>The correct page display is not guaranteed</li>
                  <li>With !DOCTYPE declaration, browser knows what type of document to expect.</li>
                </ol>
              </ol>
              <br />

              <h3>12. What is the major difference between, Transitional and Strict doctype?</h3>
              <b>Strict: </b>
              <br />
              This DTD contains all HTML components and properties. However, it does NOT INCLUDE presentational or expostulated components (like text style). It does not permit the use of Framesets.

              <br />
              <br />
              <b>Transitional: </b>
              <br />
              This DTD contains all HTML components and properties, INCLUDING presentational and belittled components (like textual style). It does not allow the use of Framesets.
              <br />

              <h3>13. What are the different kinds of Doctypes available?</h3>
              <ol>
                <li>Strict Doctype</li>
                <li>Transitional Doctype</li>
                <li>Frameset Doctype</li>
              </ol>
              <br />

              <h3>14. Most Important HTML Tags for SEO, This tags should goes inside head tags.</h3>
              <ol>
                <li>Title tag</li>
                <li>Meta description tag</li>
                <li>Heading (H1-H6) tags</li>
                <li>Schema markup</li>
                <li>HTML5 semantic tags</li>
                <li>Canonical tags</li>
              </ol>
              <br />

              <h3>15.accept</h3>
              <b>input</b> accept Attribute is used to specifies the type of file that the server accepts.
              <div style={titles}>
                <PrismCode
                  code={accept}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16.iframe</h3>
              <ol>
                <li>The iframe tag specifies an inline frame.</li>
                <li>An inline frame is used to embed another document within the current HTML document.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={iframe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17.autocapitalize</h3>
              autocapitalize attribute is used to define whether the text present inside the HTML element should be automatically capitalized or not.
              <b>Features: </b>
              <br />
              <ol>
                <li>It specifies how the text will be automatically capitalized.</li>
                <li>It indicates that the first letter of the word or sentence woold be in Capital.</li>
                <li>It does not support input tag with type URL, Email, and Password.</li>
                <li>It is a Global Attribute.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={autocapitalize}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18.audio</h3>
              <b>audio</b> element is used to play an audio file on a web page.
              <ol>
                <li><b>embed -</b>It provides a container for an external application.</li>
                <li><b>track -</b>It defines text tracks for video and audio.</li>
              </ol>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={audio}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19.Video</h3>
              <b>video</b> element is used to show a video on a web page.
              <div style={titles}>
                <PrismCode
                  code={video}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20.capture</h3>
              The capture attribute specifies that, optionally, a new file should be captured, and which device should be used to capture that
              new media of a type defined by the accept attribute.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={capture}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21.textarea</h3>
              <ol>
                <li>Defines a multi-line text input control.</li>
                <li>textarea element is often used in a form, to collect user inputs like comments or reviews.</li>
                <li>The size of a text area is specified by the <b>cols</b> and <b>rows</b> attributes</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={textarea}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22.area</h3>
              <ol>
                <li>The <b>area</b> tag defines an area inside an image map (an image map is an image with clickable areas).</li>
                <li><b>area</b> elements are always nested inside a <b>map</b> tag.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={area}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23.object</h3>
              <ol>
                <li><b>object</b> tag defines a container for an external resource.</li>
                <li>The external resource can be a web page, a picture, a media player, or a plug-in application.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={object}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24.optgroup</h3>
              The <b>optgroup</b> tag is used to group related options in a "select" element (drop-down list).
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={optgroup}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25.output</h3>
              <b>output</b> tag is used to represent the result of a calculation.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={outputs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26.section</h3>
              <ol>
                <li>Defines a section in a document.</li>
                <li>Global Attributes.</li>
                <li>Also supports the Event Attributes in HTML.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={section}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>27.Quotation and Citation Elements</h3>
              <ul>
                <li><b>q: </b>Short Quotations.</li>
                <li><b>abbr: </b>For Abbreviations</li>
                <li><b>bdo: </b>For Bi-Directional Override</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={quotation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>28.How can we create a new HTML element?</h3>
              <div style={titles}>
                <PrismCode
                  code={element}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>29. What is a meter tag? What is the difference between progress tag and a meter tag?</h3>
              <ol>
                <li>Defines a scalar measurement within a known range or a fractional value. We can also call it a gauge.</li>
                <li>Items represented using 'meter' tag are Disk usage, the relevance of a query resot.</li>
                <li><b>N: </b> The 'meter' tag should not be used to indicate progress (as in a progress bar). For progress bars, use the 'progress' tag.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={metertags}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>The 'meter' tag provides the support of the following attributes.</b>
              <ol>
                <li><b>min: </b>Specifies the minimum value of the range.</li>
                <li><b>max: </b>Specifies the maximum value of the range.</li>
                <li><b>low: </b>Defines a range that represents 'low' value.</li>
                <li><b>high: </b>Defines a range that represents “high” value.</li>
                <li><b>value: </b>Mandatory element. It defines the current value of the gauge.</li>
                <li><b>optimum: </b>Mandatory element with a numeric value. It specifies the optimum, or the best value, for the element.
                  If this value is higher than the “high” value, this indicates that the higher the value, the better it is. If it’s lesser than the
                  'low' mark, it means that the lower values are better. If it is, in between, then it indicates that neither high nor low values are good.</li>
                <li><b>form: </b>It specifies one/ more forms that define the 'meter' element. It has value form_id.</li>
              </ol>
              <br />

              <h3>33. Web Workers API</h3>
              A web worker is a JavaScript running in the background, without affecting the performance of the page.
              <br />
              When executing scripts in an HTML page, the page becomes unresponsive until the script is finished.
              <br />
              A web worker is a JavaScript that runs in the background, independently of other scripts, without affecting the
              performance of the page. You can continue to do whatever you want. clicking, selecting things, etc., while the
              web worker runs in the background.
              <br />
              <br />
              Web Workers are initialized with the URL of a JavaScript file, which contains the code the worker will execute.
              This code sets event listeners and communicates with the script that spawned it from the main page.
              <br />
              <br />
              <b>Types of Web Workers:</b>
              <ol>
                <li><b>Dedicated Web Workers: </b>The dedicated worker can be accessed by only one script which has called it.</li>
                <li><b>Shared Web Workers: </b>It can be shared by moltiple scripts and can communicate using the port. Shared
                  workers can be accessed by different windows, iframes or workers.</li>
              </ol>
              <br />
              <b>Since Web workers are in external files, they do not have access to the following JavaScript objects.</b>
              <br />
              <ol>
                <li>The window object</li>
                <li>The document object</li>
                <li>The parent object</li>
              </ol>
              <br />

              <b>34. How does a Web worker work?</b>
              <br />
              A Web worker gets initialized with the URL of a JavaScript file that contains its code. This code sets event listeners and starts
              communication with the script that invoked the worker from the main page. The Syntax is as follows.
              <div style={titles}>
                <PrismCode
                  code={workerWorker}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>35. Server-Sent Events - One Way Messaging</h3>
              A server-sent event is when a web page automatically gets updates from a server.
              <ol>
                <li>HTML5 Server-Sent Events (SSE) is a new way for the web pages to communicate with the web server. It enables a webpage to get
                  updates from a server automatically. It was possible earlier also, but for this, the web page needs to ask if any updates were
                  available. The client makes a request and waits for the server to respond with data. Once the web server provides its response,
                  the communication is over.</li>
                <br />
                <li>However, there are some situations, where web pages require a long-term connection with the web server. A typical example is stock
                  quotes on finance websites where price update happens automatically. Other examples are news feeds, sports resolts that run
                  continuously on media websites, Facebook/ Twitter updates.</li>
                <br />
                <li>We can achieve the above, using HTML5 using SSE. It enables a web page to hold an open connection to the web server so that it can
                  send a response automatically at any time. Thus there’s no need to reconnect and run the same server script from scratch over and
                  over again.</li>
              </ol>
              <br />

              <h3>36.Receive Server-Sent Event Notifications.</h3>
              The EventSource interface contains the Server-Sent event API. We need to create an EventSource object to receive the Server-Sent
              event notifications.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={serverSentEvent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>Above code performs following steps.</b>
              <ol>
                <li>First, create a new EventSource object, and specify the URL of the page sending the updates</li>
                <li>Every time an update arrives, onmessage event gets triggered.</li>
                <li>When an onmessage event occurs, it places the received data into the element that has id = resolt.</li>
              </ol>
              <br />

              <h3>37.What is the concept of Application Cache in HTML5? What are its advantages?</h3>
              Following are the key advantages of Application Cache.
              <br />
              <ol>
                <li><b>Offline browsing –</b>Users can use the application even when they are offline.</li>
                <li><b>Speed  – </b>Cached resources load faster as compared to content that gets
                  downloaded, directly from the server.</li>
                <li><b>Reduced server load –</b>The browser will only download updated/ modified resources from
                  the server.</li>
              </ol>
              <br />

              <h3>38.What is a Manifest file?</h3>
              A Manifest file is a simple text file, that tells the browser what to cache and what not to cache.
              <br />
              <br />
              A Manifest file contains three Sections as
              <br />
              <ol>
                <li><b>CACHE MANIFEST – </b>HTML5 performs the caching of files listed under this section after
                  they get downloaded for the first time.</li>
                <li><b>NETWORK – </b>Files listed here, always need a connection to the server. The browser can never cache them.</li>
                <li><b>FALLBACK –</b> Files listed here specify the fallback pages, if any page in it is not accessible.</li>
              </ol>
              <br />

              <h3>39.What are the new features introduced in HTML5?</h3>
              <ol>
                <li><b>New Semantic Elements –</b>'header', 'footer', and 'section'.</li>
                <li><b>Forms 2.0 –</b> It contains improvements to HTML web forms. It has introduced new attributes for the 'input' tag.</li>
                <li><b>Persistent Local Storage –</b>With HTML5, it is possible to achieve <b>Local Storage</b>, without resorting to third-party plugins.</li>
                <li><b>WebSocket –</b> Setting up a bidirectional communication for web applications.</li>
                <li><b>Server-Sent Events(SSE) –</b>The direction of the flow of the execution of these events is from the server to the Web Browser.</li>
                <li><b>Canvas –</b> It supports a 2D drawing surface that is programmable using JavaScript.</li>
                <li><b>Geolocation –</b> It facilitates the visitors to share their physical location with the web application.</li>
                <li><b>Microdata –</b> It allows building our personal vocaolary beyond HTML5 and extends our web pages with those custom semantics.</li>
                <li><b>Drag and drop –</b> It supports to Drag and Drop the items from one location to another location on the same Web page.</li>
                <li><b>datalist: </b>It represents a list of pre-defined options for input controls.</li>
                <li><b>keygen: </b>It defines a key-pair generator field (for forms).</li>
                <li><b>output: </b>It represents the reolt of the calculation.</li>
              </ol>
              <br />

              <h3>40.What are the various tags provided for better structuring in HTML5?</h3>
              <ol>
                <li><b>article: </b>This tag defines an article.</li>
                <li><b>aside: </b>It defines content other than the page content.</li>
                <li><b>bdi: </b>This tag isolates a part of the text for formatting in a different direction, from another text present there.</li>
                <li><b>command: </b>It defines a command button to be invoked by the user.</li>
                <li><b>details: </b>It outlines the additional details that a user can hide or view as per choice.</li>
                <li><b>dialog: </b>It defines a dialog box.</li>
                <li><b>figure: </b>This tag specifies content like illustrations, diagrams, photos, code listings, etc.</li>
                <li><b>figcaption: </b>It provides a caption for a 'figure' element.</li>
                <li><b>footer: </b>This tag defines a footer for a document or a section.</li>
                <li><b>header: </b>This tag describes a header for a document or a section.</li>
                <li><b>hgroup: </b>When there are oltiple levels in a heading, it groups a set of 'h1' to 'h6' elements.</li>
              </ol>
              <br />

              <h3>41.Describe Form Input Types in HTML5?</h3>
              <ol>
                <li><b>color –</b>It’s applicable for HTML elements that represent color.</li>
                <li><b>date –</b>It allows the user to select a date.</li>
                <li><b>DateTime –</b>It enables the user to select a date and time (with time zone).</li>
                <li><b>DateTime-local –</b> It allows the user to select a date and time (without time zone).</li>
                <li><b>email –</b>It is applicable for input fields that contain an e-mail address.</li>
                <li><b>month – </b>It permits the user to select a month and year.</li>
                <li><b>number –</b>It is applicable for input fields that accept a numeric value. It allows setting restriction on the data type of the number, this field takes.</li>
                <li><b>range –</b>It is applicable for input fields that accept a value from a range of numbers. It allows setting restriction on the data type of the number, this field takes.</li>
                <li><b>search –</b>It gets used for search fields.</li>
                <li><b>tel –</b>It defines a field for entering a telephone number.</li>
                <li><b>time –</b> It allows the user to select a time.</li>
                <li><b>URL –</b>It is applicable for the input fields that contain a URL address.</li>
                <li><b>week –</b> It allows the user to select a week and a year.</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={address}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>42.What are the new attributes provided in HTML5 for 'input' element?</h3>
              <ul>
                <b>1.autofocus</b>
                <br />
                <li>It is a Boolean attribute.</li>
                <li>'input' element should automatically come into focus when the page gets loaded.</li>
                <br />

                <b>2.formaction</b>
                <li>Defines the URL of a file, that will process the input control after the form gets submitted.</li>
                <li>This attribute is used along with type=”submit” and type=”image”.</li>
                <li>Also, it overrides the action attribute of the 'form' element.</li>
                <br />
                <b>3.formenctype</b>
                <li>This attribute defines, the method to encode the form data before submitting it to the server.</li>
                <li>It gets used with type=”submit” and type=”image”.</li>
                <li>Also, it overrides the enctype attribute of the 'form' element.</li>
                <br />
                <b>4.formmethod</b>
                <li>It defines the HTTP method used for sending form related data to the action URL.</li>
                <li>It gets used with type=”submit” and type=”image”.</li>
                <li>It overrides the method attribute of the 'form' element.</li>
                <br />
                <b>5.formnovalidate</b>
                <li>It is a boolean attribute.</li>
                <li>It gets used with type= “submit”.</li>
                <li>It indicates that the validation of the 'input' element, should not be done at the time of submission.</li>
                <li>It overrides the novalidate attribute of the 'form' element.</li>
                <br />
                <b>6.formtarget</b>
                <br />
                <li>It specifies a name or a keyword of the area where response received after submitting the form will be displayed.</li>
                <li>It gets used with type=”submit” and type=”image”.</li>
                <br />
                <b>7.height and width</b>
                <br />
                <li>It specifies the height and width of an 'input' element.</li>
                <li>It gets used only with  input type='image'.</li>
                <br />
                <b>8.list</b>
                <br />
                <li>It refers to a 'datalist' element, which contains a list of pre-defined options for an 'input' element.</li>
                <li></li>
                <br />
                <b>9.min and max</b>
                <br />
                <li>It specifies the minimum and maximum value for an 'input' element.</li>
                <li>It works with the following input types, number, range, date, datetime, datetime-local, month, time, and week</li>
                <br />
                <b>10.multiple</b>
                <br />
                <li>It is a boolean attribute.</li>
                <li>It specifies that the user is allowed to enter more than one value in the 'input' element.</li>
                <li>It works with the following input types: email and file.</li>
                <br />
                <b>11.pattern</b>
                <br />
                <li>It specifies a regular expression with which the value of the 'input' element gets compared.</li>
                <li>It works with the following input types: text, search, URL, tel, email, and password.</li>
                <br />
                <b>12.placeholder</b>
                <br />
                <li>It displays a short hint that indicates the expected value of an input field.</li>
                <li>It works with the following input types: text, search, URL, tel, email, and password.</li>
                <br />
                <b>13.required</b>
                <br />
                <li>It is a boolean attribute.</li>
                <li>It indicates that it is mandatory to fill the particular field, before submitting the form.</li>
                <br />
                <b>14.step</b>
                <br />
                <li>It specifies the legal number intervals for an 'input' element.</li>
                <li>It works with the following input types: number, range, date, datetime, datetime-local, month, time, and week.</li>
              </ul>
              <br />

              <h3>43. How can we club two or more rows or columns into a single row or column in an HTML table?</h3>
              With <b>rowspan</b> and <b>colspan</b> to make a cell span to multiple rows and columns respectively.
              <br />

              <h3>44. How is Cell Padding different from Cell Spacing?</h3>
              <ol>
                <li>HTML tables can adjust the padding inside the cells, and also the space between the cells.</li>
                <li><b>Cell Spacing: </b></li>
                <ul>
                  <li>Cell spacing is the space between each cell.</li>
                  <li>By default the space is set to 2 pixels.</li>
                  <li>To change the space between table cells, use the CSS border-spacing property on the table element</li>
                </ul>
                <div style={titles}>
                  <PrismCode
                    code={cellSpacing}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <li><b>Cell Padding: </b></li>
                <ul>
                  <li>is the space between the cell edges and the cell content.</li>
                  <li>By default the padding is set to 0.</li>
                  <li>To add padding on table cells, use the CSS padding property.</li>
                </ul>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={cellPadding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>45.What is HTML5 Graphics?</h3>
              In HTML5, there are two types of graphics.
              <br />
              <br />
              <b>Scalable Vector Graphics (SVG):</b>
              <ol>
                <li>The HTML5 element is a container for SVG graphics. It provides several methods for drawing boxes, paths, text, circles, and graphic images.</li>
                <li>SVG using in high-resolution devices (iPads and Monitors), so it becomes impressive as designs, logos, and charts scale
                  according to the requirement, maintaining the picture quality.</li>
                <li>SVG is XML based, which means that every element is available within the SVG DOM. It treats every shape as an object. If the user changes the attributes of any SVG object, the browser will automatically re-render the shape.</li>
              </ol>
              <br />

              <b>Canvas:</b>
              <br />
              <ol>
                <li>It is a rectangoar area on the HTML page for drawing graphics on the fly, using JavaScript.</li>
                <li>The default size of the canvas is 300 PX × 150 PX (width × height).</li>
                <li>It is a container for the Canvas graphics. Canvas gets executed on the pixel by pixel basis.</li>
                <li>In Canvas, browser forgets the graphic, after drawing it. If the user tries to modify it, the entire scene needs to be redrawn, including all the objects present in the graphic.</li>
              </ol>
              <br />

              <h3>46.Explain the key differences between SVG and Canvas?</h3>
              <ol>
                <li>Canvas is resolution dependent while SVG is not.</li>
                <li>Canvas does not provide any support for event handlers while SVG does.</li>
                <li>Canvas is suitable for graphic-intensive games while SVG is not suitable for gaming.</li>
                <li>Canvas is suitable for small rendering areas while SVG is suitable for large rendering areas like Google maps.</li>
                <li>Canvas provides a less interactive animated user interface. Whereas, the interface provided by SVG is very highly interactive.</li>
              </ol>
              <br />

              <h3>47. Drag and Drop API</h3>
              <div style={titles}>
                <PrismCode
                  code={dragDrop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>48.Geolocation API</h3>
              The HTML Geolocation API is used to locate a user's position.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={geolocation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>49.autocomplete</h3>
              <div style={titles}>
                <PrismCode
                  code={autocomplete}
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

export default (withStyles(styles)(Html1));