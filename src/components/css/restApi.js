import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';

import Browser from '../../assets/css1.PNG';


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


const webservices = `<protocol>://<service-name>/<ResourceType>/<ResourceID>`.trim();


class ReatAPIS extends Component {
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
              <h3>1.Explain REST?</h3>
              REST stands for Representational State Transfer. REST is an architectural style of developing web services which take advantage of the ubiquity of HTTP protocol and leverages HTTP method to define actions. It revolves around resource where every component is a resource which can be accessed by a common interface using HTTP standard methods.
              <br />
              <br />
              In REST each resource is identified by URIs or global IDs. REST uses different ways to represent a resource like text, JSON, and XML. XML and JSON are the most popular representations of resources these days.
              <br />

              <h3>2.Explain the RESTFul Web Service?</h3>
              Mostly, there are two kinds of Web Services which are quite popular.
              <ol>
                <li>SOAP (Simple Object Access Protocol) which is an XML-based way to expose web services.</li>
                <li>Web services developed using REST style are known as RESTfo web services. These web services use HTTP methods to implement the concept of REST architecture. A RESTful web service usually defines a URI, Uniform Resource Identifier a service, provides resource representation such as JSON and set of HTTP Methods.</li>
              </ol>
              <br />

              <h3>3.Explain what is a “Resource” in REST?</h3>
              <ol>
                <li>REST architecture treats every content as a resource. These resources can be either text files, HTML pages, images, videos or dynamic business data.</li>
                <li>REST Server provides access to resources and REST client accesses and modifies these resources. Here each resource is identified by URIs/ global IDs.</li>
              </ol>
              <br />

              <h3>4.Which protocol is used by RESTful web services?</h3>
              RESTful web services make use of HTTP protocol as a medium of communication between client and server.
              <br />

              <h3>5.Mention some key characteristics of REST?</h3>
              <ol>
                <li>REST is stateless, therefore the SERVER has no state (or session data)</li>
                <li>With a well-applied REST API, the server could be restarted between two calls as every data is passed to the server</li>
                <li>Web service mostly uses POST method to make operations, whereas REST uses GET to access resources</li>
              </ol>
              <br />

              <h3>6.Mention what is the difference between AJAX and REST?</h3>
              <b>Ajax:</b>
              <br />
              <ol>
                <li>In Ajax, the request are sent to the server by using XMLHttpRequest objects. The response is used by the JavaScript code to dynamically alter the current page</li>
                <li>Ajax is a set of technology; it is a technique of dynamically updating parts of UI without having to reload the page</li>
                <li>Ajax eliminates the interaction between the client and server asynchronously</li>
              </ol>
              <br />

              <b>REST:</b>
              <br />
              <ol>
                <li>REST requires the interaction between the client and server</li>
                <li>REST have a URL structure and a request/response pattern the revolve around the use of resources</li>
                <li>REST is a type of software architecture and a method for users to request data or information from servers</li>
                <li>REST requires the interaction between the client and server</li>
              </ol>
              <br />

              <h3>7.What is a Resource in Restful web services?</h3>
              Resource is the fundamental concept of Restful architecture. A resource is an object with:
              <ol>
                <li>a type</li>
                <li>relationship with other resources and</li>
                <li>methods that operate on it.</li>
              </ol>
              <br />
              Resources are identified with:
              <br />
              <ul>
                <li>their URI</li>
                <li>HTTP methods they support and</li>
                <li>request/response data type and format of data.</li>
              </ul>
              <br />

              <h3>8.What is purpose of a URI in REST based webservices?</h3>
              URI stands for Uniform Resource Identifier. Each resource in REST architecture is identified by its URI. Purpose of an URI is to locate a resource(s) on the server hosting the web service.
              <br />
              <br />
              <i>A URI is of following format:</i>
              <div style={titles}>
                <PrismCode
                  code={webservices}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9.Mention what are the HTTP methods supported by REST?</h3>
              <ol>
                <li>GET</li>
                <li>POST</li>
                <li>PUT</li>
                <li>DELETE</li>
                <li>OPTIONS</li>
                <li>HEAD</li>
              </ol>
              <br />

              <h3>10.What are the best practices to create a standard URI for a web service?</h3>
              Following are important points to be considered while designing a URI:
              <br />
              <ol>
                <li><b>Use Plural Noun −</b> Use plural noun to define resources. For example, we've used users to identify users as a resource.</li>
                <li><b>Avoid using spaces −</b> Use underscore(_) or hyphen(-) when using a long resource name, for example, use authorized_users instead of authorized%20users.</li>
                <li><b>Use lowercase letters −</b> Although URI is case-insensitive, it is good practice to keep url in lower case letters only.</li>
                <li><b>Maintain Backward Compatibility −</b> As Web Service is a public service, a URI once made public should always be available. In case, URI gets updated, redirect the older URI to new URI using HTTP Status code, 300.</li>
                <li><b>Use HTTP Verb -</b> Always use HTTP Verb like GET, PUT, and DELETE to do the operations on the resource. It is not good to use operations names in URI.</li>
              </ol>
              <br />

              <h3>11.What are the disadvantages of statelessness in RESTful Webservices?</h3>
              Web services need to get extra information in each request and then interpret to get the client's state in case client interactions are to be taken care of.
              <br />

              <h3>12.What are the primary security issues of web service?</h3>
              To ensure reliable transactions and secure confidential information, web services requires very high level of security which can be only achieved through Entrust Secure Transaction Platform. Security issues for web services are broadly divided into three sections as described below
              <br />
              <br />
              <b>1) Confidentiality:</b>
              A single web service can have multiple applications and their service path contains a potential weak link at its nodes. Whenever messages or say XML requests are sent by the client along with the service path to the server, they must be encrypted. Thus, maintaining the confidentiality of the communication is a must.
              <br />
              <br />
              <b>2) Authentication:</b>
              Authentication is basically performed to verify the identity of the users as well as ensuring that the user using the web service has the right to use or not? Authentication is also done to track user’s activity. There are several options that can be considered for this purpose
              <ol>
                <li>Application level authentication</li>
                <li>HTTP digest and HTTP basic authentication</li>
                <li>Client certificates</li>
              </ol>
              <br />

              <b>3) Network Security: </b>This is a serious issue which requires tools to filter web service traffic.
              <br />

              <h3>13.What is addressing in RESTful webservices?</h3>
              Addressing refers to locating a resource or multiple resources lying on the server.
              <br />

              <h3>14.What is statelessness in RESTful Webservices?</h3>
              As per REST architecture, a RESTful web service should not keep a client state on server. This restriction is called statelessness. It is responsibility of the client to pass its context to server and then server can store this context to process client's further request. For example, session maintained by server is identified by session identifier passed by the client.
              <br />

              <h3>15.What is the use of Accept and Content-Type Headers in HTTP Request?</h3>
              <b>Accept headers: </b>tells web service what kind of response client is accepting, so if a web service is capable of sending response in XML and JSON format and client sends Accept header as application/xml then XML response will be sent. For Accept header application/json, server will send the JSON response.
              <br />
              <br />
              <b>Content-Type header: </b>is used to tell server what is the format of data being sent in the request. If Content-Type header is application/xml then server will try to parse it as XML data. This header is useful in HTTP Post and Put requests.
              <br />

              <h3>16.What are the advantages of statelessness in RESTful Webservices?</h3>
              <ol>
                <li>Web services can treat each method request independently.</li>
                <li>Web services need not to maintain client's previous interactions. It simplifies application design.</li>
                <li>As HTTP is itself a statelessness protocol, RESTful Web services work seamlessly with HTTP protocol.</li>
              </ol>
              <br />

              <h3>17.What should be the purpose of OPTIONS method of RESTful web services?</h3>
              It should list down the supported operations in a web service and should be read only.
              <br />

              <h3>18.Explain the caching mechanism?</h3>
              Caching is a process of storing server response at the client end. It makes the server save significant time from serving the same resource again and again.
              <br />
              <br />
              The server response holds information which leads a client to perform the caching. It helps the client to decide how long to archive the response or not to store it at all.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ReatAPIS));
