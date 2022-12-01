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

const htmls = `
<body>
<button>Button Selector</button>
<p>Element Selector</p>
<!-- <button id="btn-id">Button with ID</button>
<button class="btn-class">Button with Class</button> -->

<p>Key Events</p>
<input type="text" name="name" id="name" /> <br /><br />

<p>Form Events</p>
<form action="" method="get" id="form-id">
  <input type="text" name="fname" id="fname" />
  <input type="submit" value="Submit" />
</form>

<input type="text" name="name" id="name" value="GeekyShows" data-sid="3" />
<p>Hello GeekyShows (Mouse Events)</p>
<div id="div-id">This is Geeky Shows</div>
<br />
<img src="image/pic.jpg" alt="" width="300px" id="image-id" /> <br />
<img src="image/zom.png" alt="" height="200px" id="zom-id" /> <br />

<button id="btn-hide">Hide Image</button>
<button id="btn-show">Show Image</button>
<button id="btn-toggle">Toggle Hide/Show Image</button>

<button id="btn-fadeout">Fade Out</button>
<button id="btn-fadein">Fade In</button>
<button id="btn-fadetoggle">Fade Toggle</button>
<button id="btn-fadeto">Fade To</button>

<button id="btn-slideup">Slide Up</button>
<button id="btn-slidedown">Slide Down</button>
<button id="btn-slidetoggle">Slide Toggel</button>

<button id="btn-animate">Animate</button>

<button id="btn-setText">Set Text</button>
<button id="btn-setHTML">Set HTML</button>
<button id="btn-setValue">Set Value</button>
<button id="btn-setAttrValue">Set Attr Value</button>
<button id="btn-setImageAttrValue">Set Image Attr Value</button>
<button id="btn-addClass">Add Class</button>
<button id="btn-removeClass">Remove Class</button>
<button id="btn-toggleClass">Toggle Class</button>

<button id="btn-setCSS">Set CSS</button>
<button id="btn-setMultiCSS">Set Multiple CSS</button>

<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<script src="js/jquery.js"></script>
<script src="js/custom.js"></script>
</body>
`.trim();

const jqueries = `
$/jQuery(selector).action(callback)

Selector: jQuery uses CSS syntex to select elements and in addition, it has some own custom selector.
1.Element selector: Ex. <p>, <div>
2.Id selector: "#btn1"
3.class selector: ".myClass"
4.Universal selector: "*"


//
console.log('jQuery', $);
console.log('jQuery', jQuery);

jQuery("button").click(() => {
  console.log("Button Selector");
});

$("button").click(() => {
  console.log("Button Selector");
});

$(document).ready(() => {
  jQuery("button").click(function () {
    console.log("ready function run after DOM loads");
  });
});

//jQuery.noConflict will reset the $ variable so it's no longer an alias of jQuery
$.noConflict();
jQuery(document).ready(($) => {
  $("button").click(() => {
    console.log("jQuery.noConflict");
  });
});

jQuery.noConflict();
jQuery(document).ready(($) => {
  $("p").click(() => {
    alert("Element Selector");
  });

  $("#btn-id").click(() => {
    console.log("ID Selector");
  });

  $(".btn-class").click(() => {
    console.log("Class Selector");
  });
});

// jQuery.noConflict();
jQuery(document).ready(($) => {
  $("p").click(() => {
    console.log("Mouse Events");
  });
  $("p").dblclick(() => {
    console.log("Double Clicked");
  });
  $("p").mouseenter(() => {
    console.log("Mouse Enter");
  });
  $("p").mouseleave(() => {
    console.log("Mouse Leave");
  });

  //Keyboard Events
  $("#name").keypress(() => {
    console.log("Key Pressed");
  });
  $("#name").keydown(() => {
    console.log("Key Down");
  });
  $("#name").keyup(() => {
    console.log("Key Up");
  });

  //   // Form Events
  $("#fname").focus(() => {
    console.log("Focus Field");
  });
  $("#fname").blur(() => {
    console.log("Blur Field");
  });
  $("#form-id").submit((e) => {
    console.log("Form Submitted");
    e.preventDefault();
  });

  //   // Window Event
  $(window).resize(() => {
    console.log("Window Resized");
  });
});

jQuery.noConflict();
jQuery(document).ready(($) => {
  // Hide
  $("#btn-hide").click(() => {
    $("#image-id").hide(5000, () => {
      console.log("Image Hide Ho Chuka Hai");
    });
  });

  // Show
  $("#btn-show").click(() => {
    $("#image-id").show(5000, () => {
      console.log("Image Show Ho Chuka Hai");
    });
  });

  // Hide and Show - Toggle
  $("#btn-toggle").click(() => {
    $("#image-id").toggle(1000, () => {
      console.log("Image Hide/Show Ho Chuka Hai");
    });
  });

  // Fade Out
  $("#btn-fadeout").click(() => {
    $("#image-id").fadeOut(1000, () => {
      console.log("Image Fade Out Ho Chuka Hai");
    });
  });
  // Fade In
  $("#btn-fadein").click(() => {
    $("#image-id").fadeIn(1000, () => {
      console.log("Image Fade In Ho Chuka Hai");
    });
  });
  // Fade Toggle
  $("#btn-fadetoggle").click(() => {
    $("#image-id").fadeToggle(1000, () => {
      console.log("Image Fade Toggle Ho Chuka Hai");
    });
  });
  // Fade To
  $("#btn-fadeto").click(() => {
    $("#image-id").fadeTo(1000, 0.5, () => {
      console.log("Image Fade To Ho Chuka Hai");
    });
  });

  // Slide Up
  $("#btn-slideup").click(() => {
    $("#image-id").slideUp(1000, () => {
      console.log("Image Slide Up Ho Chuka Hai");
    });
  });
  // Slide Down
  $("#btn-slidedown").click(() => {
    $("#image-id").slideDown(1000, () => {
      console.log("Image Slide Down Ho Chuka Hai");
    });
  });
  // Slide Toggle
  $("#btn-slidetoggle").click(() => {
    $("#image-id").slideToggle(1000, () => {
      console.log("Image Slide Toggle Ho Chuka Hai");
    });
  });

  // Animate - Perform a custom animation of a set of CSS Properties
  $("#btn-animate").click(() => {
    $("#zom-id").animate({ left: "+=80" }, 1000, () => {
      console.log("Image Animate Ho Chuka Hai");
    });
  });

  // Get Text
  let textdata = $("p").text();
  console.log(textdata);
  // Set Text
  $("#btn-setText").click(() => {
    let newtextdata = "This is New Text";
    $("p").text(newtextdata);
  });

  // Get HTML
  let htmldata = $("p").html();
  console.log(htmldata);
  // Set HTML
  $("#btn-setHTML").click(() => {
    let newhtmldata = "<b>This is New Text</b>";
    $("p").html(newhtmldata);
  });

  // Get Value
  let inputValue = $("#name").val();
  console.log(inputValue);
  // Set value
  $("#btn-setValue").click(() => {
    let newInputValue = "Sonam";
    $("#name").val(newInputValue);
  });

  // Get Attribute
  let attrValue1 = $("link").attr("href");
  console.log(attrValue1);

  let attrValue2 = $("#name").attr("data-sid");
  console.log(attrValue2);

  // Set Attribute
  $("#btn-setAttrValue").click(() => {
    // Get Old Data
    console.log("Old Data:", $("#name").attr("data-sid"));

    // Set New Data
    $("#name").attr("data-sid", "20");
    console.log("New Data Set");

    // Get New Data
    console.log("New Data:", $("#name").attr("data-sid"));
  });

  // Set Image src Attribute
  $("#btn-setImageAttrValue").click(() => {
    $("#image-id").attr("src", "image/photo.jpg");
  });

  // Add CSS Class
  $("#btn-addClass").click(() => {
    $("p").addClass("myclass");
  });

  // Remove CSS Class
  $("#btn-removeClass").click(() => {
    $("p").removeClass("myclass");
  });

  // Toggle CSS Class
  $("#btn-toggleClass").click(() => {
    $("p").toggleClass("myclass");
  });

  // Get CSS Property Value
  let divColor = $("#div-id").css("color");
  console.log(divColor);

  // Set CSS Property
  $("#btn-setCSS").click(() => {
    $("#div-id").css("font-size", 70);
  });

  // Set Multiple CSS Property
  $("#btn-setMultiCSS").click(() => {
    $("#div-id").css({ "font-size": 70, "background-color": "yellow" });
  });
});
`.trim();


class JQueies extends Component {
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
              <h3>Html</h3>
              <div style={titles}>
                <PrismCode
                  code={htmls}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>JQuery</h3>
              <div style={titles}>
                <PrismCode
                  code={jqueries}
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

export default (withStyles(styles)(JQueies));
