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


const listCtrl = `
//IIFE to avoid polution of the global namespace.
(function(){
    // Creating List controller and attaching it to the main turtleFacts module
    angular
        .module("turtleFacts")
        .controller("listCtrl", ListController);
    
    /*
      Dependency injection. This allows the script to be minified and uglified
      without breaking the code. This is acheived by passing the dependencies 
      as strings in an array through the $inject method to the controller.
     */
    ListController.$inject = ['quizMetrics', 'DataService'];

    /*
      Definition for the List controller. quizMetrics and dataService are two
      services that are created in js/factory/quiz.js and js/factory/dataService.js
      respectively. 
     */
    function ListController(quizMetrics, DataService){
        var vm = this;

        /*
          The interface for the controller. The below code shows all the 
          variables that are available from inside the view. References to 
          named functions are used instead of inline anon functions. This 
          increases readability of the code.
         
          The interface is at the top to provide a quick overview of what is 
          available in the controller while the implementation remains at the 
          bottom.
         */
        
        vm.quizMetrics = quizMetrics; // Controllers reference to the quiz data from factory
        
        // Controller reference to the turtle info created in the factory
        vm.data = DataService.turtlesData; 
        console.log('turtle data comes from dataservice',this.data)
        
        // will be used in the view to hold the data of currently active turtle
        vm.activeTurtle = {}; 
        vm.changeActiveTurtle = changeActiveTurtle;
        
        vm.activateQuiz = activateQuiz;
        
        vm.search = ""; // will hold the search query when user uses search bar in view
        console.log('search field',vm.search);
        
        // simple function to attach the data of the turtle clicked on to the active turtle object
        function changeActiveTurtle(index){
            vm.activeTurtle = index; 
            console.log('active turtle',vm.activeTurtle)
        }

        function activateQuiz(){
            /*
              changeState is a function attached onto the quizMetrics object 
              returned from the factory It takes two arguments. 1. what to 
              change state of (quiz or results) 2. what new state should be.
             */
            quizMetrics.changeState("quiz", true);
            console.log('turtle hide on button click: ',quizMetrics.changeState(true))
        }
    }
})();
`.trim()

const quizCtrl = `
(function(){
  /*
    The quiz controller is added as a named function instead of an anon func
    to keep the code clean and readable.
   */
  angular
      .module("turtleFacts")
      .controller("quizCtrl", QuizController);

  /*
    Angular dependency injection to avoid issues when uglifying the code
    Passing the dependencies as strings avoids them being changed when 
    uglified.
   */
  QuizController.$inject = ['quizMetrics', 'DataService'];

  /*
    function defintion of the quiz controller with quizMetrics as args. 
   
    quizMetrics is a service we created that
    is defined in js/factory/quiz.js
   */
  function QuizController(quizMetrics, DataService){

      var vm = this;

      /*
        All the properties and methods that will be exposed to the view are 
        declared below. Declaring them like this allows you to take a quick 
        look at the code and be able to see what this controller does 
        without having to scroll through all the code.
       
        Any methods declared below are done so by using named functions. 
        These functions are then defined further down the page
       */
      vm.quizMetrics = quizMetrics; // Attaching the quizMetrics object to the view model
      vm.dataService = DataService;
      vm.questionAnswered = questionAnswered; // also a named function defined below
      vm.setActiveQuestion = setActiveQuestion; // setActiveQuestion is a named function below
      vm.selectAnswer = selectAnswer; // also a named function
      vm.finaliseAnswers = finaliseAnswers; //also a named function
      vm.activeQuestion = 0; // currently active question in the quiz
      vm.error = false; // error flag. Will be set when user tries to finish quiz with 
      vm.finalise = false; // finalise flag. Will be set to show prompt to end quiz with
                           // all questions answered

      var numQuestionsAnswered = 0; // This is not needed by the view so is only declared using var

      /*
        setActiveQuestion takes one optional argument.
        
        If no argument is passed it will set the active question in the quiz
        to the next question that has yet to be answered. This allows the 
        user to skip questions and come back to them later, even by clicking
        the "continue" button. It will still take them to the unanswered 
        question.
       
        If an argument is passed into the function then it will simply set
        the activeQuestion to the number that was passed in as an argument
       */
      function setActiveQuestion(index){
          // no argument passed, data = undefined.
          if(index === undefined){
              var breakOut = false;

              /*
                quizLength is set to 1 less than the length of the quiz as it
                is always referenced against the variable activeQuestion 
                which is 0 index. Therefore the length needs to be one less.
               */
              var quizLength = DataService.quizQuestions.length - 1;

              /*
                This while loop will loop continuously until an unanswered 
                question is found. Going back to the first question if the 
                last question is reached witout finding an unanswered question
               */
              while(!breakOut){
                  // check if last question is reach, if not increment. If it
                  // has go back to start.
                  vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                  /*
                    activeQuestion has looped back to start. Meaning user has
                    skipped past questions without answering them. Therefore
                    show a warning. This is done by setting the error flag to
                    true.
                   */
                  if(vm.activeQuestion === 0){
                      vm.error = true;
                  }

                  // if current active question has not been selected, break 
                  // out the while loop
                  if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                      breakOut = true;
                  }
              }
          }else{
              // Data was passed into the function therefore
              // Set activeQuestion to the index of the button pressed
              vm.activeQuestion = index;
          }

      }

      /*
        This method will be triggered everytime the user clicks continue in
        the quiz.
       
        It will then check if the current question as been answered, if it 
        has it will increment the local numQuestionsAnswered variable. Then 
        it checks if the numQuestionsAnswered is equal to the total number
        of questions in the quiz, meaning the user has complected the quiz.
       
        If the quiz has been completed then it sets the finalise flag to 
        true, which removes the quiz from the view and displays a prompt to 
        ensure the user is finished. Then returns from the function
       
        If all the questions have not been answered or the current question 
        has not been selected the setActiveQuestion method is called to 
        increment the active question to the next unanswered question. If 
        the current question is the only unanswered question then it will 
        remain on that question
       */
      function questionAnswered(){
          // set quizLength variable to keep code clean
          var quizLength = DataService.quizQuestions.length;
          
          numQuestionsAnswered = 0;
          //For loop added to loop through all questions and recount questions
          //that have been answered. This avoids infinite loops.
          for(var x = 0; x < quizLength; x++){
              if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
                  numQuestionsAnswered++;
                  if(numQuestionsAnswered >= quizLength){
                      // final check to ensure all questions are actuall answered
                      for(var i = 0; i < quizLength; i++){
                          /*
                            if find a question that is not answered, set it to 
                            active question then return from this function 
                            to ensure finalise flag is not set
                           */
                          if(DataService.quizQuestions[i].selected === null){
                              setActiveQuestion(i);
                              return;
                          }
                      }
                      // set finalise flag and remove any existing warnings
                      vm.error = false;
                      vm.finalise = true;
                      return;
                  }
              }
          }

          /*
            There are still questions to answer so increment to next 
            unanswered question using the setActiveQuestion method
           */
          vm.setActiveQuestion();
      }

      /*
        When a user clicks an answer, this method will set that answer as 
        their selection for that question on the quizMetrics object. This 
        then allows the view to add classes to the answer to indicate it is 
        the current selection
       */
      function selectAnswer(index){
          DataService.quizQuestions[vm.activeQuestion].selected = index;
      }

      /*
        When the final prompt is shown to the user, if they decide they are 
        finished and click yes, this method is called.
       
        This method: 
                 -removes the finalise flag, which will remove the prompt 
                     from the screen. 
                 -Resets the local numQuestionsAnswered variable
                 -Sets the active question back to 0 (for future use)
                 -Calls the markQuiz method from the quizMetrics Object 
                     created in the factory
                 -removes quiz from the view by changing quiz state to false
                 -displays the results in the view by setting the results 
                     state to true
       */
      function finaliseAnswers(){
          vm.finalise = false;
          numQuestionsAnswered = 0;
          vm.activeQuestion = 0;
          quizMetrics.markQuiz();
          quizMetrics.changeState("quiz", false);
          quizMetrics.changeState("results", true);
      }
  }
})();
`.trim()

const resultsCtrl = `
(function(){
  angular
      .module("turtleFacts")
      .controller("resultsCtrl", ResultsController);

  /*
    injecting the custom service quizMetrics into the results controller 
    using the $inject method.
   
    Injecting dependencies like this is done so as to avoid issues when 
    uglifying the code. Function arguments will get shortened during the 
    uglify process but strings will not. Therefore by injecting the argument
    as strings in an array using the $inject method we can be sure angular 
    still knows what we want to do.
   */
  ResultsController.$inject = ['quizMetrics', 'DataService'];

  /*
    definition of the results controller function itself. Taking 
    quizMetrics as an argument
   */
  function ResultsController(quizMetrics, DataService){
      var vm = this;

      /*
        The pattern used in the controllers in this app puts all the 
        properties and methods available to the view at the top of the 
        function. Any methods are referenced as named functions which are 
        defined at the bottom.
       
        This allows the interface of the controller to be seen at a glance. 
        Which is not usually the case when defining methods as anon 
        functions inline.
       */
      vm.quizMetrics = quizMetrics; // binding the object from factory to vm 
      vm.dataService = DataService;
      vm.getAnswerClass = getAnswerClass; // named function defined below
      vm.setActiveQuestion = setActiveQuestion; // named function defined below
      vm.reset = reset; // named function defined below
      vm.calculatePerc = calculatePerc; // named function defined below
      vm.activeQuestion = 0;

      function calculatePerc(){
          // simply calculating the percentage of correct answers and returning the number
           
          return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
      }

      function setActiveQuestion(index){
          //setting active question on the results page
           
          vm.activeQuestion = index;
      }

      function getAnswerClass(index){
          /*
            returning the class to style the answer depending on whether it 
            is right or wrong. quizMetrics can be referenced here without 
            vm. as the object is passed by reference. We can manipulate 
            the object directly here. vm. is only needed when it is being
            manipulated by the view as the view does not have direct access
            to the quizMetrics service. But as we are in the controller
            we can directly manipulate it
           */
          if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
              return "bg-success";
          }else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
              return "bg-danger";
          }
      }

      function reset(){
          /*
            reseting all the data. This includes reverting the results state
            back to false which will return the view to the lists.
           
            Also all the variables on each question object is returned to 
            the default state using the for loop to iterate through all 
            questions.
           */
          quizMetrics.changeState("results", false);
          quizMetrics.numCorrect = 0;

          for(var i = 0; i < DataService.quizQuestions.length; i++){
              var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean

              data.selected = null;
              data.correct = null;
          }
      }
  }
})();
`.trim()

const DataService = `
(function(){

  //Declaring a factory service as part of the existing turtleFacts Module.
   
  angular
      .module("turtleFacts")
      .factory("DataService", DataService);

  //Actual definition of the function used for this factory
  function DataService(){
      /*
        dataObj is used to simulate getting the data from a backend server
        The object will hold data which will then be returned to the other
        factory declared in js/factory/quiz.js which has this factory
        as a dependency
       */

      var dataObj = {
          turtlesData: turtlesData,
          quizQuestions: quizQuestions,
          correctAnswers: correctAnswers
      };

      // returning the dataObj to anything that uses this factory as a
      // dependency
      return dataObj;
  }

  /*
   * all of the below variables are simulating data that would typically be
   * retrieved using an HTTP call to an API endpoint.
   *
   * For simplicity sake this data is hardcoded into the app as this tutorial
   * is about building the angular app, not the backend.
   *
   * The correctAnswers variable would be retrieved when the user has
   * finished the quiz and would be used to mark the users answers against
   * the correct answers
   *
   * the quizQuestions is an array of objects, each containing data
   * pertaining to a single question. This includes:
   *                          - The type of question: image or text
   *                          - Text of the question (aka the actual question)
   *                          - A set of 4 possible answers, either text or
   *                              images as indicated above
   *                          - a selected flag which will be used to know if
   *                              the user has selected
   *                          an answer yet.
   *                          - Whether the user got the question correct or
   *                              not
   *
   * The final turtleData variable hold the information that will be
   * displayed in the list view when the app loads. This includes the name
   * and an image of each turtle as well as other information such as the
   * location and the size of the turtles
   *
   */

  var correctAnswers = [1, 2, 3, 0, 2, 0, 3, 2, 0, 3];

  var quizQuestions  = [
      {
          type: "text",
          text: "How much can a loggerhead weigh?",
          possibilities: [
              {
                  answer: "Up to 20kg"
              },
              {
                  answer: "Up to 115kg"
              },
              {
                  answer: "Up to 220kg"
              },
              {
                  answer: "Up to 500kg"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "What is the typical lifespan of a Green Sea Turtle?",
          possibilities: [
              {
                  answer: "150 years"
              },
              {
                  answer: "10 years"
              },
              {
                  answer: "80 years"
              },
              {
                  answer: "40 years"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "image",
          text: "Which of these is the Alligator Snapping Turtle?",
          possibilities: [
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560
                          /v1538573536/2399413165_bcc8031cac_z_fqaexq.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/
                           v1538573475/olive-ridley1_bdrbzh.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/
                            v1538573717/Leatherback-turtle-007_p1qytx.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573639/
  Alligator_snapping_turtle_-_Geierschildkr_C3_B6te_-_Alligatorschildkr_C3_B6te_-_Macrochelys_temminckii_01_uwqvbi.jpg"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "image",
          text: "Which of these is the Green Turtle?",
          possibilities: [
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573240/
                  Sea-Turtles-Habitat_kiipu7.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573596/
                  Kemp_s_Ridley_sea_turtle_nesting_jqe0fg.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573639/
                  Alligator_snapping_turtle_-_Geierschildkr_C3_B6te.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573676/
                  SCR_290360hawskbill-why-matter-LG_wqf0kl.jpg"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "Where does the Kemp's Ridley Sea Turtle live?'",
          possibilities: [
              {
                  answer: "Tropical waters all around the world"
              },
              {
                  answer: "Eastern Australia"
              },
              {
                  answer: "Coastal North Atlantic"
              },
              {
                  answer: "South pacific islands"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "What is the most common turtle in US waters?",
          possibilities: [
              {
                  answer: "Loggerhead turtle"
              },
              {
                  answer: "Leatherback turtle"
              },
              {
                  answer: "Hawksbill Turtle"
              },
              {
                  answer: "Alligator Snapping Turtle"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "What is the largest sea turtle on earth?",
          possibilities: [
              {
                  answer: "Eastern Snake Necked Turtle"
              },
              {
                  answer: "Olive Ridley Sea Turtle"
              },
              {
                  answer: "Kemp's Ridley Sea Turtle'"
              },
              {
                  answer: "Leatherback"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "image",
          text: "Which of these is the Olive Ridley Turtle?",
          possibilities: [
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573757/
                  loggerheadTurtle_2651448b_fuxtrz.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573676/
                  SCR_290360hawskbill-why-matter-LG_wqf0kl.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573475/
                  olive-ridley1_bdrbzh.jpg"
              },
              {
                  answer: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_560/v1538573596/
                  Kemp_s_Ridley_sea_turtle_nesting_jqe0fg.jpg"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "How Heavy can a leatherback turtle be?",
          possibilities: [
              {
                  answer: "900kg"
              },
              {
                  answer: "40kg"
              },
              {
                  answer: "110kg"
              },
              {
                  answer: "300kg"
              }
          ],
          selected: null,
          correct: null
      },
      {
          type: "text",
          text: "Which of these turtles are herbivores?",
          possibilities: [
              {
                  answer: "Loggerhead Turtle"
              },
              {
                  answer: "Hawksbill Turtle"
              },
              {
                  answer: "Leatherback Turtle"
              },
              {
                  answer: "Green Turtle"
              }
          ],
          selected: null,
          correct: null
      }
  ];

  var turtlesData = [
      {
          type: "Green Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573240/
          Sea-Turtles-Habitat_kiipu7.jpg",
          locations: "Tropical and subtropical oceans worldwide",
          size: "Up to 1.5m and up to 300kg",
          lifespan: "Over 80 years",
          diet: "Herbivore",
          description: "The green turtle is a large, weighty sea turtle with a wide, smooth carapace, or shell. 
          It inhabits tropical and subtropical coastal waters around the world and has been observed clambering 
          onto land to sunbathe. It is named not for the color of its shell, which is normally brown or olive 
          depending on its habitat, but for the greenish color of its skin. There are two types of green 
          turtles—scientists are currently debating whether they are subspecies or separate species—including 
          the Atlantic green turtle, normally found off the shores of Europe and North America, and the Eastern 
          Pacific green turtle, which has been found in coastal waters from Alaska to Chile."
      },
      {
          type: "Loggerhead Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573757/
          loggerheadTurtle_2651448b_fuxtrz.jpg",
          locations: "Tropical and subtropical oceans worldwide",
          size: "90cm, 115kg",
          lifespan: "More than 50 years",
          diet: "Carnivore",
          description: "Loggerhead turtles are the most abundant of all the marine turtle species in U.S. waters. 
          But persistent population declines due to pollution, shrimp trawling, and development in their nesting 
          areas, among other factors, have kept this wide-ranging seagoer on the threatened species list since 1978. 
          Their enormous range encompasses all but the most frigid waters of the world's oceans. They seem to prefer 
          coastal habitats, but often frequent inland water bodies and will travel hundreds of miles out to sea."
      },
      {
          type: "Leatherback Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573717/
          Leatherback-turtle-007_p1qytx.jpg",
          locations: "All tropical and subtropical oceans",
          size: "Up to 2m, up to 900kg",
          lifespan: "45 years",
          diet: "Carnivore",
          description: "Leatherbacks are the largest turtles on Earth, growing up to seven feet (two meters) long and 
          exceeding 2,000 pounds (900 kilograms). These reptilian relics are the only remaining representatives of a 
          family of turtles that traces its evolutionary roots back more than 100 million years. Once prevalent in every 
          ocean except the Arctic and Antarctic, the leatherback population is rapidly declining in many parts of the 
          world. While all other sea turtles have hard, bony shells, the inky-blue carapace of the leatherback is 
          somewhat flexible and almost rubbery to the touch. Ridges along the carapace help give it a more hydrodynamic 
          structure. Leatherbacks can dive to depths of 4,200 feet (1,280 meters)—deeper than any other turtle—and can 
          stay down for up to 85 minutes."
      },
      {
          type: "Hawksbill Sea Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573676/
          SCR_290360hawskbill-why-matter-LG_wqf0kl.jpg",
          locations: "Tropical Coastal areas around the world",
          size: "Over 1m, 45-68kg",
          lifespan: "30-50 Years",
          diet: "Carnivore",
          description: "Dolor possimus voluptas hic aliquam rem doloremque minus maiores accusantium? Laborum 
          perferendis harum blanditiis quod quia? Aspernatur sunt et fuga delectus ab rem excepturi. Ipsa quibusdam 
          facere consequuntur magnam vitae? Consectetur consectetur necessitatibus beatae delectus quibusdam in! Est 
          nobis omnis iusto illum fugiat maxime! Neque fugiat reiciendis sequi corrupti minima facere distinctio 
          aliquam est voluptatibus. Sint incidunt soluta atque ducimus."
      },
      {
          type: "Alligator Snapping Turtle",
        image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573639/
        Alligator_snapping_turtle_-_Geierschildkr_C3_B6te_-_temminckii_01_uwqvbi.jpg",
          locations: "Along the Atlantic Coast of USA",
          size: "around 60cm, up to 100kg",
          lifespan: "20-70 years",
          diet: "Carnivore",
          description: "The prehistoric-looking alligator snapping turtle is the largest freshwater turtle in North 
          America and among the largest in the world. With its spiked shell, beaklike jaws, and thick, scaled tail, 
          this species is often referred to as the 'dinosaur of the turtle world.' Found almost exclusively in the 
          rivers, canals, and lakes of the southeastern United States, alligator snappers can live to be 50 to 100 
          years old. Males average 26 inches (66 centimeters) in shell length and weigh about 175 pounds (80 kilograms), 
          although they have been known to exceed 220 pounds (100 kilograms). The much smaller females top out at 
          around 50 pounds (23 kilograms)."
      },
      {
          type: "Kemp's Ridley Sea Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573596/
          Kemp_s_Ridley_sea_turtle_nesting_jqe0fg.jpg",
          locations: "Coastal areas of the North Atlantic",
          size: "65cm, up to 45kg",
          lifespan: "Around 50 years",
          diet: "Omnivore",
          description: "The Kemp’s ridley turtle is the world’s most endangered sea turtle, and with a worldwide 
          female nesting population roughly estimated at just 1,000 individuals, its survival truly hangs in the 
          balance. Their perilous situation is attributed primarily to the over-harvesting of their eggs during the 
          last century. And though their nesting grounds are protected and many commercial fishing fleets now use 
          turtle excluder devices in their nets, these turtles have not been able to rebound. For this reason, their 
          nesting processions, called arribadas, make for especially high drama. During an arribada, females take over 
          entire portions of beaches, lugging their big bodies through the sand with their flippers until they find a 
          satisfying spot to lay their eggs. Even more riveting is the later struggle to the ocean of each tiny, 
          vulnerable hatchling. Beset by predators, hatchlings make this journey at night, breaking out of their shells 
          using their caruncle, a single temporary tooth grown just for this purpose."
      },
      {
          type: "Olive Ridley Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573475/
          olive-ridley1_bdrbzh.jpg",
          locations: "Tropical coastal areas around the world",
          size: "70cm, 45kg",
          lifespan: "50 years",
          diet: "Omnivore",
          description: "The olive ridley turtle is named for the generally greenish color of its skin and shell, or 
          carapace. It is closely related to the Kemp’s ridley, with the primary distinction being that olive 
          ridleys are found only in warmer waters, including the southern Atlantic, Pacific and Indian Oceans. Olive 
          and Kemp’s ridleys are the smallest of the sea turtles, weighing up to 100 pounds (45 kilograms) and reaching 
          only about 2 feet (65 centimeters) in shell length. The olive ridley has a slightly smaller head and smaller 
          shell than the Kemp’s."
      },
      {
          type: "Eastern Snake Necked Turtle",
          image_url: "https://res.cloudinary.com/djxscnpzf/image/upload/c_scale,w_300/v1538573536/
          2399413165_bcc8031cac_z_fqaexq.jpg",
          locations: "Eastern Australia",
          size: "Up to 30cm",
          lifespan: "25 years",
          diet: "Carnivore",
          description: "Snake-necked turtles, as the name suggests, have an unusually long neck. Their necks may be 
          up to 60 percent of their carapace length. Their carapace is oval and flattened, usually dark-brown to 
          black measuring up to 11 inches (27.5 cm) in length. Scutes are shed as the animals grow. The males have a 
          longer, thicker tail than females and a concave plastron. They are excellent swimmers; they have large, 
          webbed feet with sharp claws used to tear apart food."
      }
  ];
})();
`.trim()

const quizMetrics = `
(function(){
  /*
    creating a factory called quizMetrics and attaching that to the 
    turtleFacts module. 
   
    This factories job is to hold all the data the pertains to the quiz. 
    This could be:
             -the questions themselves. What kind of question it is(text or 
                 image)
             -Whether the current question has been answered or is still 
                 blank. 
             -Hold data to show if quiz is active, results are active or 
                 neither
             -Method to change the state of the quiz and results (active or
                 inactive)
             -Hold what the actual correct answers are
             -Method to mark the answers
             -hold how many correct answers the user gave
   */
  angular
      .module("turtleFacts")
      .factory("quizMetrics", QuizMetrics);

      /*
        dependency injection as seen in all the controllers. See comments 
        there for a deeper explaination of dependency injection
       */
      QuizMetrics.$inject = ['DataService'];

      // function definition for the factory
      function QuizMetrics(DataService){

          /*
           quizObj is an object that will hold all of the above mentioned 
           properties and methods and will be the return value of the 
           factory
          
           As per pattern used in the controllers, the methods will 
           reference named functions that are at the bottom of this function
           */
          var quizObj = {
              quizActive: false,
              resultsActive: false,
              changeState: changeState, // changeState is a named function below
              correctAnswers: [],
              markQuiz: markQuiz, // markQuiz is a named function below
              numCorrect: 0
          };

          /*
            Return the quizObj. This is done near the top of the function to
            allow a quick glance above the fold in the code to see 
            functionality. Implementation of that functionality can then be
            seen by scrolling down.
           */
          return quizObj;

          /*
            Function to change the state of either the quiz or the results.
           
            It accepts two arguments, one is which metric to change (quiz or
            results) and the other is what to change the state too.
           */
          function changeState(metric, state){
              if(metric === "quiz"){
                  quizObj.quizActive = state;
              }else if(metric === "results"){
                  quizObj.resultsActive = state;
              }else{
                  return false;
              }
          }

          /*
            When called, the markQuiz method will loop through all the users
            answers and compare them to the know correct answers to each
            question. The total number of correct answers by the user is 
            calculated and saved in the numCorrect property of the quizObj 
            object
           */
          function markQuiz(){
              quizObj.correctAnswers = DataService.correctAnswers;
              for(var i = 0; i < DataService.quizQuestions.length; i++){
                  if(DataService.quizQuestions[i].selected === DataService.correctAnswers[i]){
                      DataService.quizQuestions[i].correct = true;
                      quizObj.numCorrect++;
                  }else{
                      DataService.quizQuestions[i].correct = false;
                  }
              }
          }
      }
})();
`.trim()

const app = `
(function(){
  /*
    Declaration of main angular module for this appllication.
   
    It is named turtleFacts and has no dependencies (hence the 
    empty array as the second argument)
   */
  angular
      .module("turtleFacts", []);
})();
`.trim();

const index = `
<!DOCTYPE html>
<html lang="en" ng-app="turtleFacts">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Turtle Facts and Quiz</title>
    <!-- Bootstrap css and my own css -->
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
   
    <div class="container">
        <div class="page-header">
            <h1>Turtle Facts Quiz</h1>
            <h3>
                Learn about all the turtles below before you decide to take on the 
                <strong>TURTLE QUIZ</strong>
            </h3>
        </div>
		<!-- Hook on the controller for this view and specify when to show it using ng-hide -->
        <div ng-controller="listCtrl as list" ng-hide="list.quizMetrics.quizActive || list.quizMetrics.resultsActive">
            <form class="form-inline well well-sm clearfix">
                <span class="glyphicon glyphicon-search"></span>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    class="form-control"
                    ng-model="list.search">
                    
                    <!-- dynamically change ng-click value true or false -->
                <button class="btn btn-warning pull-right"
                    ng-click="list.activateQuiz()">
                    <strong>Start Quiz</strong>
                </button>
            </form>
            
            <!-- row to contain the list of turtles. filter list apply on search field -->
            <div class="row">
                <div class="col-sm-6" ng-repeat="turtle in list.data | filter:list.search">
                    <div class="well well-sm">
                        <div class="row">
                            <div class="col-md-6">
                                <img ng-src="{{turtle.image_url}}" 
                                    class="img-rounded img-responsive well-image">
                            </div>
                            <div class="col-md-6">
                            	<!-- getting data from backend -->
                                <h4>{{turtle.type}}</h4>
                                <p><strong>Locations: </strong>{{turtle.locations}}</p>
                                <p><strong>Size: </strong>{{turtle.size}}</p>
                                <p><strong>Average Lifespan: </strong>{{turtle.lifespan}}</p>
                                <p><strong>Diet: </strong>{{turtle.diet}}</p>
                                <!-- data-toggle and data-target are bootstrap attributes to trigger the popup modal,
                                     turtle atribute drow data in pop_up -->
                                <button class="btn btn-primary pull-right"
                                    data-toggle="modal"
                                    data-target="#turtle-info"
                                    ng-click="list.changeActiveTurtle(turtle)">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

			<!-- the markup for the modal -->
            <div class="modal" id="turtle-info">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>{{list.activeTurtle.type}}</h2>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-8 col-xs-offset-2">
                                    <img ng-src="{{list.activeTurtle.image_url}}" class="img-rounded img-responsive">
                                </div>
                            </div>
                            <div class="row top-buffer">
                                <div class="col-md-6">
                                    <p><strong>Locations: </strong>{{list.activeTurtle.locations}}</p>
                                    <p><strong>Size: </strong>{{list.activeTurtle.size}}</p>
                                    <p><strong>Average Lifespan: </strong>{{list.activeTurtle.lifespan}}</p>
                                    <p><strong>Diet: </strong>{{list.activeTurtle.diet}}</p>
                                </div>
                                <div class="col-xs-12 top-buffer">
                                    <p>{{list.activeTurtle.description}}</p>
                                    <button class="btn btn-danger pull-right" 
                                        data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

		<!-- Attach the quizCtrl to the view and ng-show when the quizActive flag is set -->
        <div ng-controller="quizCtrl as quiz" ng-show="quiz.quizMetrics.quizActive">
            <div class="row">
                <div class="col-xs-8">
                    <h2>Progress:</h2>
                    <div class="btn-toolbar">
      <!-- ng-repeat to loop throuh all questions and display the button markup for each -->
  <!-- ng-class conditionally displaying bootstrap classes when a question has been answered or not -->
  <!-- ng-click to call method setActiveQuestion to move to selected question -->
  <!-- the $index argument is an angular variable that contains the index of the current ng-repeat iteration -->
                        <button class="btn"
                            ng-repeat="question in quiz.dataService.quizQuestions"
                            ng-class="{'btn-info': question.selected !== null, 'btn-danger': question.selected === null}" 
                            ng-click="quiz.setActiveQuestion($index)">
	                        
                            <span class="glyphicon"
                                ng-class="{'glyphicon-pencil': question.selected !== null, 'glyphicon-question-sign': 
                                question.selected === null}"></span>
                        </button>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="row">
                        <h4>Legend:</h4>
                        <div class="col-sm-4">
                            <button class="btn btn-info">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>
                            <p>Answered</p>
                        </div>
                        <div class="col-sm-4">
                            <button class="btn btn-danger">
                                <span class="glyphicon glyphicon-question-sign"></span>
                            </button>
                            <p>Unanswered</p>
                        </div>
                    </div>
                </div>
            </div><!-- progress area -->

            <div class="row">
                <div class="alert alert-danger"
                    ng-show="quiz.error">
                    Error! You have not answered all of the questions!
                    <button class="close" ng-click="quiz.error = false">&times</button>
                </div>
                <h3>Question:</h3>
                <div class="well well-sm" ng-hide="quiz.finalise">
                    <div class="row">
                        <div class="col-xs-12">
  <!-- adds 1 to activeQuestion as it is zero index. Then displays the question -->
      <h4>{{quiz.activeQuestion+1 + ". " + quiz.dataService.quizQuestions[quiz.activeQuestion].text}}</h4>
      <!-- ng-if will only render the below markup when true. Unlike ng-show or ng-hide which -->
  <!-- simply doesnt show the markup, but it is still rendered in the source. -->
  <!-- ng-if will not even render the markup -->
  <!-- this is done in the below two sections to aviod a url being displayed as a question -->
  <!-- or text being entered as an image url and causing issues -->
                            
  <div class="row"
      ng-if="quiz.dataService.quizQuestions[quiz.activeQuestion].type === 'text'">
      <div class="col-sm-6" ng-repeat="answer in quiz.dataService.quizQuestions[quiz.activeQuestion].possibilities">
          <h4 class="answer"
              ng-class="{'bg-info': $index === quiz.dataService.quizQuestions[quiz.activeQuestion].selected}"
              ng-click="quiz.selectAnswer($index)">
              {{answer.answer}}
          </h4>
      </div>
  </div>
  <!-- only the below section or the above section will display, never both -->
      <div class="row"
          ng-if="quiz.dataService.quizQuestions[quiz.activeQuestion].type === 'image'">
          <div class="col-sm-6" ng-repeat="answer in quiz.dataService.quizQuestions[quiz.activeQuestion].possibilities">
              <div class="image-answer"
                  ng-class="{'image-selected': $index === quiz.dataService.quizQuestions[quiz.activeQuestion].selected}"
                  ng-click="quiz.selectAnswer($index)">
                  <img ng-src="{{answer.answer}}">
              </div>
          </div>
      </div>
  </div>
</div>

<button class="btn btn-warning" ng-click="quiz.questionAnswered()">Continue</button>
</div>

<!-- this section is the prompt to be show when the user finishes the quiz to ensure they want to continue -->
<!-- it only shows when the finalise flag is true -->
<!-- clicking yes will call the finaliseAnswers method which will send the user to the results page -->
<!-- clicking no will remove the finalise flag and this put the user back into the quiz interface -->
                <div class="well well-sm" ng-show="quiz.finalise">
                    <div class="row">
                        <div class="col-xs-12">
                            <h3>Are you sure you want to submit your answers?</h3>
                            <button class="btn btn-success" ng-click="quiz.finaliseAnswers()">Yes</button>
                            <button class="btn btn-danger" ng-click="quiz.finalise = false">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- quiz controller -->

		<!-- letting angular know which controller to use for this view and when to show the view using ng-show -->
        <div ng-controller="resultsCtrl as results" ng-show="results.quizMetrics.resultsActive">
           <div class="row">
               <div class="col-xs-8">
                   <h2>Results:</h2>
                   <div class="btn-toolbar">
        <!-- The controller got that data from the quiz factory in js/factory/quiz.js -->

        <!-- ng-class is another angular directive. This directive will add a class to the element based  -->
        <!-- on the conditional it is provided. In this case it will add btn-sucess class if question.correct -->
        <!-- is true and will add btn-danger class if question.correct is false -->

        <!-- ng-click is again used to trigger a method on the controller called setActiveQuestion -->
        <!-- the method is passed the $index as an argument. $index is built into angular and holds -->
        <!-- the current index of the ng-repeat loop -->
                       <button class="btn"
                           ng-repeat="question in results.dataService.quizQuestions"
                           ng-class="{'btn-success': question.correct, 'btn-danger': !question.correct}"
                           ng-click="results.setActiveQuestion($index)">

                           <span class="glyphicon"
                                ng-class="{'glyphicon-ok': question.correct, 'glyphicon-remove': 
                                !question.correct}"></span>
                       </button>
                   </div>
               </div>
               <div class="col-xs-4">
                   <div class="row">
                       <h4>Legend:</h4>
                       <div class="col-sm-4">
                           <button class="btn btn-success">
                               <span class="glyphicon glyphicon-ok"></span>
                           </button>
                           <p>Correct</p>
                       </div>
                       <div class="col-sm-4">
                           <button class="btn btn-danger">
                               <span class="glyphicon glyphicon-remove"></span>
                           </button>
                           <p>Incorrect</p>
                       </div>
                   </div>
               </div>
           </div>

			<!-- display the score and percentage to the user -->
   <div class="row">
       <div class="col-xs-12 top-buffer">
       		<!-- the score is displayed using simple angular expressions -->
            <h2>You Scored {{results.quizMetrics.numCorrect}} / {{results.dataService.quizQuestions.length}}</h2>
            <!-- the percentage is calculated using a method which is then filtered using the number filter -->
    		<!-- which ensures only 2 decimal places will be shown -->
            <h2><strong>{{results.calculatePerc() | number:2}}%</strong></h2>
       </div>
   </div>

           <div class="row">
               <h3>Questions:</h3>
               <div class="well well-sm">
                   <div class="row">
                       <div class="col-xs-12">
		                    <!-- the below may look strange. -->
		                    <!-- the angular expression will add 1 to the active question, because it is 0 index -->
		                    <!-- it then displays it with a . after it followed by the question. -->
		                    <!-- something like this "3. This is the third question:" -->
<h4>{{results.activeQuestion+1 +". "+results.dataService.quizQuestions[results.activeQuestion].text}}</h4>
<div class="row"
   ng-if="results.dataService.quizQuestions[results.activeQuestion].type === 'text'">
   <div class="col-sm-6" ng-repeat="answer in results.dataService.quizQuestions[results.activeQuestion].
   possibilities">
       <h4 class="answer"
           ng-class="results.getAnswerClass($index)">
           {{answer.answer}}
           <!-- more usage of the ng-show directive to selectively show the elements on condition -->
           <p class="pull-right"
                ng-show="$index !== results.quizMetrics.correctAnswers[results.activeQuestion] && 
                $index === results.dataService.quizQuestions[results.activeQuestion].selected">Your Answer</p>
           <p class="pull-right"
                ng-show="$index === results.quizMetrics.correctAnswers[results.activeQuestion]">Correct Answer</p>
       </h4>
   </div>
</div>

 <div class="row"
     ng-if="results.dataService.quizQuestions[results.activeQuestion].type === 'image'">
     <div class="col-sm-6" ng-repeat="answer in results.dataService.quizQuestions[results.activeQuestion].
     possibilities">
         <div class="image-answer"
             ng-class="results.getAnswerClass($index)">
             <img ng-src="{{answer.answer}}">
         </div>
     </div>
 </div>
</div>
</div>
</div>
               
				<!-- ng-click calling the reset method on the controller -->
               <button class="btn btn-primary btn-lg" ng-click="results.reset()">Go Back To Facts</button>
           </div>
        </div>
    </div>

    <!-- third party js -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.2/angular.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" 
                  integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" 
                  crossorigin="anonymous"></script>

    <!-- Our application scripts -->
    <script src="js/app.js"></script>
    <script src="js/controllers/list.js"></script>
    <script src="js/controllers/quiz.js"></script>
    <script src="js/controllers/results.js"></script>
    <script src="js/factories/quizMetrics.js"></script>
    <script src="js/factories/dataservice.js"></script>
</body>
</html>
`.trim();


class Tables extends Component {
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
      <h3>Turtle</h3>
      <b>controller/listCtrl.js</b>
      <div style={titles}>
      <PrismCode
        code={listCtrl}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>controller/quizCtrl.js</b>
      <div style={titles}>
      <PrismCode
        code={quizCtrl}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>controller/resultsCtrl.js</b>
      <div style={titles}>
      <PrismCode
        code={resultsCtrl}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>factories/DataService.js</b>
      <div style={titles}>
      <PrismCode
        code={DataService}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>factories/quizMetrics.js</b>
      <div style={titles}>
      <PrismCode
        code={quizMetrics}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <br/>
        <b>index.js</b>
      <div style={titles}>
      <PrismCode
        code={index}
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

export default (withStyles(styles)(Tables));
