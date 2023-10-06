import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../ReactJs/styles.css";
import Sidebar from "./sidebar";
import PrismCode from "../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const iframe = `
const divElement = document.getElementById('myDiv');

console.log(divElement.innerHTML);    //<strong>Hello</strong> World!
console.log(divElement.innerText);    //Hello World!


//html
<div id="myDiv">
    <strong>Hello</strong> World!
</div>
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

const video = `
//Inline script
<script>
    console.log("This is an inline script");
</script>


//Event handler
<script>
function handleClick() {
  console.log("Button clicked");
}
</script>
</head>

<body>
  <button onclick="handleClick()">Click Me</button>
</body>


//function call
<script>
  function sayHello() {
    console.log("Hello World!");
  }
</script>
  </head>

<body>
  <button onclick="sayHello()">Say Hello</button>
</body>
`.trim();

const capture = `
	<input type="file" id="soundFile" capture="user" accept="audio/*">
<input type="file" id="videoFile" capture="environment" accept="video/*">
<input type="file" id="imageFile" capture="user" accept="image/*">
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

const workerWorker = `var worker = new Worker("sample_prog.js"﴿;`.trim();

const serverSentEvent = `
var source = new EventSource("sse_demo.php");
source.onmessage = function(event) {
document.getElementById("result").innerHTML += event.data + "<br>";
};
`.trim();

const element = `
<script>
document.createElement("myElement")
</script>


//It can be used in the HTML as.
<myElement>hello</myElement>
`.trim();

const htmlStyles = `
<tagname style="property:value;">`.trim();

const htmltags = `
HTML Attributes: Attributes provide additional information about an element.
Always specifed in the start tag.
Come in name/ value pairs. Like name="value"
Ex. <p title="about paragraph">Here is containt</p>
`.trim();

const grisCont = `
<style>
  .container {
    display: grid;
    grid-template-columns: auto auto auto;
  }

//2
  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

<body>
  <div class="container">
  <p>Paragraph</p>
  <p>Paragraph2</p>
  <p>Paragraph3</p>
  </div>
</body>`.trim();

const definitionList = `
<dl>
  <dt>Term 1</dt>
  <dd>Definition 1</dd>
  <dt>Term 2</dt>
  <dd>Definition 2</dd>
  <dt>Term 3</dt>
  <dd>Definition 3</dd>
</dl>
`.trim();

const picturecss = `
<picture>
  <source media="(min-width: 1024px)" srcset="large-image.jpg">
  <source media="(min-width: 768px)" srcset="medium-image.jpg">
  <img src="small-image.jpg" alt="An image">
</picture>
`.trim();

class Html1 extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. Grid</h3>
              <div style={titles}>
                <PrismCode
                  code={grisCont}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <ol>
                <li>
                  <b>Html: </b>Structure
                </li>
                <li>
                  <b>css: </b>Styles
                </li>
              </ol>
              <br />
              <b>
                Div and Span are used to structure webpage. They are structure
                element.
              </b>
              <ol>
                <li>
                  <b>div: </b>Block Element
                </li>
                <li>
                  <b>span: </b>Inline Element
                </li>
              </ol>
              <br />
              <br />
              <h3>Html5 API's.</h3>
              <ul>
                <li>Geolocation API</li>
                <li>Canvas API</li>
                <li>Web Storage API</li>
                <li>IndexedDB API</li>
                <li>Web Workers API</li>
                <li>Web Sockets API</li>
                <li>Drag and Drop API</li>
              </ul>
              <br />
              <br />
              <h3>4. What is a tag in HTML?</h3>
              A tag instructs the Browser about how to format the HTML properly.
              <br />
              <h3>5. What is the difference between HTML elements and tags?</h3>
              The HTML element is everything from the start tag to the end tag.
              HTML elements become HTML tags when enclosed within angular
              brackets.
              <br />
              <div style={titles}>
                <PrismCode
                  code={htmltags}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. HTML Attributes</h3>
              HTML attributes provide additional information about HTML
              elements.
              <ol>
                <li>
                  All HTML elements can have <b>attributes.</b>
                </li>
                <li>
                  Attributes are always specified in <b>the start tag.</b>
                </li>
                <li>
                  Attributes usually come in name/value pairs like:{" "}
                  <b>name="value"</b>
                </li>
              </ol>
              <br />
              <br />
              <h3>
                7. What is the purpose of DOCTYPE in HTML, and what are some
                different types of DOCTYPEs?
              </h3>
              The DOCTYPE declaration in HTML is used to specify the version of
              HTML or XHTML used in a web document. It informs the browser how
              to render the page and what rules to follow when parsing the code.
              <br />
              <br />
              There are several types of DOCTYPEs:
              <ul>
                <li>
                  <b>HTML5 DOCTYPE: </b>!DOCTYPE html
                </li>
                <br />
                <li>
                  <b>XHTML 1.0 Strict DOCTYPE: </b>!DOCTYPE html PUBLIC
                  "-//W3C//DTD XHTML 1.0 Strict//EN"
                  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
                </li>
                <br />
                <li>
                  <b>HTML 4.01 Strict DOCTYPE: </b>!DOCTYPE HTML PUBLIC
                  "-//W3C//DTD HTML 4.01//EN"
                  "http://www.w3.org/TR/html4/strict.dtd"
                </li>
                <br />
                <li>
                  <b>Transitional DOCTYPEs: </b>HTML 4.01 Transitional and XHTML
                  1.0 Transitional
                </li>
                <br />
                <li>
                  <b>Frameset DOCTYPEs: </b>HTML 4.01 Frameset and XHTML 1.0
                  Frameset
                </li>
                <br />
              </ul>
              The DOCTYPE should be placed at the beginning of the HTML document
              before any other tags. It is important to include a DOCTYPE
              declaration to ensure that the web page is rendered correctly in
              all browsers.
              <br />
              <br />
              
              <h3>
                9. What are the different types of form inputs in HTML, and how
                do you use them?
              </h3>
              HTML provides different types of form inputs that allow users to
              enter data in various ways. Some of the commonly used form inputs
              are:
              <ul>
                <li>Text Input</li>
                <li>Password Input</li>

                <li>Checkbox Input</li>

                <li>Radio Input</li>

                <li>Select Input</li>

                <li>Textarea Input</li>

                <li>File Input</li>
              </ul>
              <br />
              <br />
              <h3>
                12. How do you use HTML5 tags like 'section', 'article', and
                'header', and what are the benefits of using these tags?
              </h3>
              <ul>
                <li>
                  <b>section: </b>Used to define a section of a document, such
                  as a chapter or a group of related content. It helps to
                  organize the content into meaningful sections.
                </li>
                <br />
                <li>
                  <b>article: </b>Used to define a self-contained article or
                  content block, such as a blog post or news article. It allows
                  for the content to be easily identified and repurposed.
                </li>
                <br />
                <li>
                  <b>header: </b>Used to define a header section for a document
                  or section, such as a page header or a section heading. It
                  helps to give context to the content and improve
                  accessibility.
                </li>
                <br />
              </ul>
              <br />
              <b>Using these tags can provide several benefits</b>
              <br />
              <ul>
                <li>
                  <b>Improved accessibility: </b>
                </li>

                <li>
                  <b>Improved SEO: </b>
                </li>

                <li>
                  <b>Improved readability and maintainability: </b>
                </li>
              </ul>
              <br />
              <br />
              <h3>
                14. What are the different types of lists in HTML, and how do
                you create them?
              </h3>
              There are three types of lists in HTML: ordered lists, unordered
              lists, and definition lists.
              <ul>
                <li>Ordered lists</li>
                <li>Unordered lists</li>
                <li>
                  <b>Definition lists: </b>A definition list is a list where
                  each item is defined with a term and a definition. To create a
                  definition list, you can use the 'dl' tag, the term is
                  represented by the 'dt' tag, and the definition is represented
                  by the 'dd' tag.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={definitionList}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ul>
              <br />
              <br />
              <h3>
                15. Explain the difference between the 'img' and 'picture' tags
                in HTML, and how you might use them.
              </h3>
              <ul>
                <li>
                  <b>img: </b>tag is used to display a single image on a web
                  page. It has two required attributes: src, which specifies the
                  URL of the image, and alt, which provides alternative text for
                  the image. The alt attribute is important for accessibility,
                  as it is used by screen readers and other assistive
                  technologies to describe the image to users who are visually
                  impaired.
                </li>
                <br />
                <li>
                  <b>picture: </b> tag is used to provide different versions of
                  an image for different devices or screen sizes. It can be used
                  to specify multiple sources for an image, each with different
                  resolutions, sizes, or formats. The browser will then choose
                  the best source based on the current device or screen size.
                </li>
                <br />
                <div style={titles}>
                  <PrismCode
                    code={picturecss}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ul>
              <br />
              <br />
              <h3>
                16. How do you use HTML entities, and why might you need to use
                them?
              </h3>
              HTML entities are special codes used to represent characters that
              have a specific meaning or are difficult to display in HTML
              documents. For example, the character 'open bracket' is used as an
              opening tag in HTML, but if you want to display it as regular
              text, you need to use the HTML entity code 'open bracket'.
              Similarly, special characters such as accented letters or symbols
              can be represented using entity codes, such as "é" for "é" or "©"
              for the copyright symbol.
              <br />
              <ul>
                <li>
                  You might need to use HTML entities when you are working with
                  text that contains characters that have a special meaning in
                  HTML, such as the angle brackets used for tags, or when you
                  want to display special characters that are not included in
                  the standard ASCII character set.
                </li>
                <br />
                <li>
                  To use an HTML entity, you simply replace the character you
                  want to display with its corresponding entity code. For
                  example, if you want to display the trademark symbol (™), you
                  can use the entity code "™".
                </li>
                <br />
                <li>
                  Using HTML entities can help ensure that your content is
                  displayed correctly across different browsers and devices, and
                  can also make your code more accessible to users who rely on
                  assistive technologies to access web content.
                </li>
              </ul>
              <br />
              <br />
              <h3>17. HTML Style Attribute</h3>
              <div style={titles}>
                <PrismCode
                  code={htmlStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>18. Non-semantic elements</h3>
              <ul>
                <li>
                  <b>Semantic elements: </b>Are HTML elements that carry a
                  specific meaning beyond their default styling. <b>Ex. </b>
                  header, section, article, footer.
                </li>
                <br />
                <li>
                  <b>Non-semantic elements: </b>div, span, table.
                </li>
              </ul>
              These elements are without any definition. They don’t describe
              anything about their structure such as 'span' and 'div'.
              <br />
              <h3>19. What are void elements in HTML?</h3>
              HTML elements which don't have closing Tags are Void elements.{" "}
              <b>Ex. </b>br, img, hr, etc.
              <br />
              <h3>
                20. Is it possible to change an inline element into a block
                level element?
              </h3>
              Yes, it is possible using the <b>display</b> property with its
              value as “block”, to change the inline element into a block-level
              elemen.
              <br />
              <br />
              <h3>
                22. Most Important HTML Tags for SEO, This tags should goes
                inside head tags.
              </h3>
              <ol>
                <li>
                  <b>title: </b>
                </li>
                <li>
                  <b>meta: </b>
                </li>
                <li>
                  <b>header, footer: </b>
                </li>
                <li>
                  <b>h1 to h6: </b>
                </li>
                <li>
                  <b>img: </b>
                </li>
                <li>
                  <b>a: </b>Helps search engines understand the content of the
                  linked page.
                </li>
                <li>
                  <b>strong, em: </b>
                </li>
              </ol>
              <br />
              It's important to note that while HTML tags can help improve the
              SEO of a web page, they should be used in a natural and relevant
              way. Overusing or stuffing keywords into tags can actually harm
              the SEO of a web page.
              <br />
              <br />
              <h3>23. Diffeence between innerHtml and innerText in Html.</h3>
              The innerHTML and innerText properties are used to manipulate the
              content of an HTML element using JavaScript.
              <br/>
              <br/>
              <ul>
                <li><b>innerHTML :</b>Deals with HTML content, including HTML tags.</li>
                <li><b>innerText :</b>Deals with only the visible text content and ignores any HTML tags within the element.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={iframe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>24. Autocapitalize</h3>
              autocapitalize attribute is used to define whether the text
              present inside the HTML element should be automatically
              capitalized or not.
              <b>Features: </b>
              <br />
              <ol>
                <li>
                  It specifies how the text will be automatically capitalized.
                </li>
                <li>
                  It indicates that the first letter of the word or sentence
                  would be in Capital.
                </li>
                <li>
                  It does not support input tag with type URL, Email, and
                  Password.
                </li>
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
              <br />
              <h3>25. How many ways call javascript in html.</h3>
              <ul>
                <li>
                  <b>Inline script: </b>
                </li>
                <li>
                  <b>Event handler: </b>JavaScript code can be executed when an
                  event occurs on an HTML element, such as a button click.
                </li>
                <li>
                  <b>JavaScript function call: </b>Can be called from within the
                  HTML using the <b>script</b> tag.
                </li>
                <li>
                  <b>: </b>
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={video}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>26. Capture</h3>
              The capture attribute specifies that, optionally, a new file
              should be captured, and which device should be used to capture
              that new media of a type defined by the accept attribute.
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
              <br />
              <h3>How create custom Html tage.</h3>
              <div style={titles}>
                <PrismCode
                  code={element}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>27. Area</h3>
              <ol>
                <li>
                  The <b>area</b> tag defines an area inside an image map.
                </li>
                <li>
                  <b>area</b> elements are always nested inside a <b>map</b>{" "}
                  tag.
                </li>
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
              <h3>28. Object</h3>
              <ol>
                <li>
                  <b>object</b> tag defines a container for an external
                  resource.
                </li>
                <li>
                  The external resource can be a web page, a picture, a media
                  player, or a plug-in application.
                </li>
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
              <h3>29. Cross-browser compatible element.</h3>A cross-browser
              compatible element is an HTML element that renders consistently
              across different web browsers.
              <br />
              <br />
              <h3>34. Web Workers API</h3>
              A web worker is a JavaScript running in the background, without
              affecting the performance of the page.
              <br />
              When executing scripts in an HTML page, the page becomes
              unresponsive until the script is finished.
              <br />
              A web worker is a JavaScript that runs in the background,
              independently of other scripts, without affecting the performance
              of the page. You can continue to do whatever you want. clicking,
              selecting things, etc., while the web worker runs in the
              background.
              <br />
              <br />
              Web Workers are initialized with the URL of a JavaScript file,
              which contains the code the worker will execute. This code sets
              event listeners and communicates with the script that spawned it
              from the main page.
              <br />
              <br />
              <b>Types of Web Workers:</b>
              <ol>
                <li>
                  <b>Dedicated Web Workers: </b>The dedicated worker can be
                  accessed by only one script which has called it.
                </li>
                <li>
                  <b>Shared Web Workers: </b>It can be shared by moltiple
                  scripts and can communicate using the port. Shared workers can
                  be accessed by different windows, iframes or workers.
                </li>
              </ol>
              <br />
              <b>
                Since Web workers are in external files, they do not have access
                to the following JavaScript objects.
              </b>
              <br />
              <ol>
                <li>The window object</li>
                <li>The document object</li>
                <li>The parent object</li>
              </ol>
              <br />
              <b>35. How does a Web worker work?</b>
              <br />A Web worker gets initialized with the URL of a JavaScript
              file that contains its code. This code sets event listeners and
              starts communication with the script that invoked the worker from
              the main page. The Syntax is as follows.
              <div style={titles}>
                <PrismCode
                  code={workerWorker}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>36. Server-Sent Events - One Way Messaging</h3>A server-sent
              event is when a web page automatically gets updates from a server.
              <ol>
                <li>
                  HTML5 Server-Sent Events (SSE) is a new way for the web pages
                  to communicate with the web server. It enables a webpage to
                  get updates from a server automatically. It was possible
                  earlier also, but for this, the web page needs to ask if any
                  updates were available. The client makes a request and waits
                  for the server to respond with data. Once the web server
                  provides its response, the communication is over.
                </li>
                <br />
                <li>
                  However, there are some situations, where web pages require a
                  long-term connection with the web server. A typical example is
                  stock quotes on finance websites where price update happens
                  automatically. Other examples are news feeds, sports results
                  that run continuously on media websites, Facebook/ Twitter
                  updates.
                </li>
                <br />
                <li>
                  We can achieve the above, using HTML5 using SSE. It enables a
                  web page to hold an open connection to the web server so that
                  it can send a response automatically at any time. Thus there’s
                  no need to reconnect and run the same server script from
                  scratch over and over again.
                </li>
              </ol>
              <br />
              <h3>37. Receive Server-Sent Event Notifications.</h3>
              The EventSource interface contains the Server-Sent event API. We
              need to create an EventSource object to receive the Server-Sent
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
                <li>
                  First, create a new EventSource object, and specify the URL of
                  the page sending the updates
                </li>
                <li>
                  Every time an update arrives, onmessage event gets triggered.
                </li>
                <li>
                  When an onmessage event occurs, it places the received data
                  into the element that has id = result.
                </li>
              </ol>
              <br />
              <h3>
                38. What is the concept of Application Cache in HTML5? What are
                its advantages?
              </h3>
              Following are the key advantages of Application Cache.
              <br />
              <ol>
                <li>
                  <b>Offline browsing –</b>Users can use the application even
                  when they are offline.
                </li>
                <li>
                  <b>Speed – </b>Cached resources load faster as compared to
                  content that gets downloaded, directly from the server.
                </li>
                <li>
                  <b>Reduced server load –</b>The browser will only download/
                  updated/ modified resources from the server.
                </li>
              </ol>
              <br />
              <h3>39. What is a Manifest file?</h3>
              A Manifest file is a simple text file, that tells the browser what
              to cache and what not.
              <br />
              <br />
              A Manifest file contains three Sections as
              <br />
              <ol>
                <li>
                  <b>CACHE MANIFEST – </b>HTML5 performs the caching of files
                  listed under this section after they get downloaded for the
                  first time.
                </li>
                <li>
                  <b>NETWORK – </b>Files listed here, always need a connection
                  to the server. The browser can never cache them.
                </li>
                <li>
                  <b>FALLBACK –</b> Files listed here specify the fallback
                  pages, if any page in it is not accessible.
                </li>
              </ol>
              <br />
              <h3>40. What are the new features introduced in HTML5?</h3>
              <ol>
                <li>
                  <b>New Semantic Elements –</b>'header', 'footer', and
                  'section'.
                </li>
                <li>
                  <b>Forms 2.0 –</b> It contains improvements to HTML web forms.
                  It has introduced new attributes for the 'input' tag.
                </li>
                <li>
                  <b>Persistent Local Storage –</b>With HTML5, it is possible to
                  achieve <b>Local Storage</b>, without resorting to third-party
                  plugins.
                </li>
                <li>
                  <b>WebSocket –</b> Setting up a bidirectional communication
                  for web applications.
                </li>
                <li>
                  <b>Server-Sent Events(SSE) –</b>The direction of the flow of
                  the execution of these events is from the server to the Web
                  Browser.
                </li>
                <li>
                  <b>Canvas –</b> It supports a 2D drawing surface that is
                  programmable using JavaScript.
                </li>
                <li>
                  <b>Geolocation –</b> It facilitates the visitors to share
                  their physical location with the web application.
                </li>
                <li>
                  <b>Microdata –</b> It allows building our personal vocaolary
                  beyond HTML5 and extends our web pages with those custom
                  semantics.
                </li>
                <li>
                  <b>Drag and drop –</b> It supports to Drag and Drop the items
                  from one location to another location on the same Web page.
                </li>
              </ol>
              <br />
              <br />
              <h3>
                42. How can we club two or more rows or columns into a single
                row or column in an HTML table?
              </h3>
              With <b>rowspan</b> and <b>colspan</b> to make a cell span to
              multiple rows and columns respectively.
              <br />
              <br />
              <h3>43. Explain the key differences between SVG and Canvas?</h3>
              <table>
                <tr>
                  <th>Property</th>
                  <th>SVG</th>
                  <th>Canvas</th>
                </tr>
                <tr>
                  <td>Resolution dependent</td>
                  <td>No</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Games</td>
                  <td>Not suitable for gaming.</td>
                  <td>Canvas is suitable for graphic-intensive games.</td>
                </tr>
                <tr>
                  <td>Rendering areas</td>
                  <td>Suitable for large rendering areas like Google maps.</td>
                  <td>Canvas is suitable for small rendering areas.</td>
                </tr>
                <tr>
                  <td>Animation</td>
                  <td>Interface provided by SVG is very highly interactive.</td>
                  <td>
                    Canvas provides a less interactive animated user interface.
                  </td>
                </tr>
              </table>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Html1);
