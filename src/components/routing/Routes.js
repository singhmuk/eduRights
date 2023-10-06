import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderSection from "../../components/dashboard/blog/HeaderSection";


import { components as AngularJs } from "../angularjs";
import { components as MlMains } from "../ml";
import About from "../../components/dashboard/about";

import MainCompo from "../ReactJs/reactJs_hooks/mainCompo";
import AsyncAwait from "../ReactJs/reactJs_hooks/async_await";
import IntroRectJs from "../ReactJs/reactJs_hooks/introReact";
import SSRendering from "../ReactJs/reactJs_hooks/serverSideRend";
import HackeRank from "../ReactJs/reactJs_hooks/hackeRank";
import Models from "../ReactJs/reactJs_hooks/models";
import Like from "../ReactJs/reactJs_hooks/like";
import DropdownSelect from "../ReactJs/reactJs_hooks/dropdownSelect";
import CustomHooks from "../ReactJs/reactJs_hooks/customHooks";
import NumberForm from "../ReactJs/reactJs_hooks/numberFormats";
import TicGame from "../ReactJs/reactJs_hooks/ticGame";
import PureComp from "../ReactJs/reactJs_hooks/pureComp";
import UseStates from "../ReactJs/reactJs_hooks/useStates";
import LinkGet from "../ReactJs/reactJs_hooks/linkGet";
import TextEditors from "../ReactJs/reactJs_hooks/textEditors";
import Kanban from "../ReactJs/reactJs_hooks/kanban";
import ReactInter from "../ReactJs/reactJs_hooks/reactInter";
import SortItems from "../ReactJs/reactJs_hooks/sortItems";

import NodeJsCodes from "../nodeJs/nodeDeep/codes";
import Token from "../nodeJs/nodeDeep/codes";
import ServerSide from "../nodeJs/nodeDeep/serverSide";
import IntroNodeJs from "../nodeJs/nodeDeep/introNodejs";
import Tur1 from "../nodeJs/nodeDeep/tut_1";
import Tut2 from "../nodeJs/nodeDeep/tut_2";
import Tut6 from "../nodeJs/nodeDeep/tut_6";
import Udemy from "../nodeJs/nodeDeep/udemy";
import Ejs from "../nodeJs/nodeDeep/ejsNode";
import Nodetext from "../nodeJs/nodeDeep/nodetext";
import SignUps from "../nodeJs/nodeDeep/authentications";
import BufferNode from "../nodeJs/nodeDeep/buffers";
import ChildsPros from "../nodeJs/nodeDeep/childs";
import SendEmail from "../nodeJs/nodeDeep/sendEmail";
import SearchPagination from "../nodeJs/nodeDeep/search_pagination";
import PushNotifications from "../nodeJs/nodeDeep/push_notifications";
import EvtNode from "../nodeJs/nodeDeep/evtNode";
import FileSys from "../nodeJs/nodeDeep/filSystems";
import UrlShortenerService from "../nodeJs/nodeDeep/url_shortener";
import StripePayment from "../nodeJs/nodeDeep/stripe_payment";
import FileUpload from "../nodeJs/nodeDeep/file_upload";
import EmailAcco from "../nodeJs/nodeDeep/e_acco_veri";
import TwoFA from "../nodeJs/nodeDeep/2fa_speakearst";


import MongoCurd from "../mongoDB/deepMongodb/mongoCurd";
import GridFs from "../mongoDB/deepMongodb/gridFs";
import Intro from "../mongoDB/deepMongodb/intro";
import MongodbMethods from "../mongoDB/deepMongodb/mongodbMethods";
import IntroMD from "../mongoDB/deepMongodb/infoMD";
import CurdOp from "../mongoDB/deepMongodb/curdOp";
import BulkWright from "../mongoDB/deepMongodb/bulkRight";
import MysqlCurd from "../mongoDB/deepMongodb/mysqlCurd";
import Mysql from "../mongoDB/deepMongodb/mySql";
import PostgresSQL from "../mongoDB/deepMongodb/postgressql";
import MongoQueries from "../mongoDB/deepMongodb/mongoQueries";
import SearchErrorHandling from "../mongoDB/deepMongodb/searchErrorHandling";
import JoinOp from "../mongoDB/deepMongodb/joinOp";
import SortOp from "../mongoDB/deepMongodb/sortOp";

import MernLoic from "../mern/projects/javaScript";
import MernReactCurd from "../mern/projects/3_reactCurdMern";
import MernReactHooks from "../mern/projects/4_reactCurdHooks";
import Pagination from "../mern/projects/pagination";
import ImageGallery from "../mern/projects/imageGallery";
import PropsModel from "../mern/projects/propsModel";
import Strips from "../mern/projects/stripes";
import PaginationsMerns from "../mern/projects/paginationsMern";
import GoogleMaps from "../mern/projects/googleMap";
import VideoChat from "../mern/projects/videoChat";
import SetUpFiles from "../mern/projects/setUpFiles";
import QrCode from "../mern/projects/qrSccaners";
import ReactShare from "../mern/projects/react_share";
import SocialSignUp from "../mern/projects/socialSignUp";
import MernSocial from "../mern/projects/mernSocial";

import IntroJs from "../javaScripts/deepJs/introJs";
import Arrays from "../javaScripts/deepJs/array";
import Clousers from "../javaScripts/deepJs/clousers";
import FindOutput from "../javaScripts/deepJs/findOutput";
import JsObject from "../javaScripts/deepJs/jsObjects";
import Logic from "../javaScripts/deepJs/logic";
import Logic2 from "../javaScripts/deepJs/logic2";
import Prototypes from "../javaScripts/deepJs/prototypes";
import ArraysApi from "../javaScripts/deepJs/arrayApi";
import Oops from "../javaScripts/deepJs/oops";
import McqJs from "../javaScripts/deepJs/mcqjs";
import Datatypests from "../javaScripts/deepJs/datatypests";
import TypeScript2 from "../javaScripts/deepJs/typeScript_2";
import TypeScript4 from "../javaScripts/deepJs/typeScript_4";
import KeyedCollections from "../javaScripts/deepJs/keyedCollections";
import RegularExp from "../javaScripts/deepJs/regular";
import HackerRank1 from "../javaScripts/deepJs/hackerRank";
import HackerRank6 from "../javaScripts/deepJs/hackerRank6";

import Middleware from "../express/deepExpress/middleware";
import IntroExpress from "../express/deepExpress/introExpress";
import LoopbackCli from "../express/deepExpress/loopbackcli";
import ResDocs from "../express/deepExpress/resDocs";
import routerDocs from "../express/deepExpress/routerDocs";
import JQueies from "../express/deepExpress/jqueries";
import Backbonejs from "../express/deepExpress/backbonejs";
import UnderscorJs from "../express/deepExpress/underscorejs";
import Networks from "../express/deepExpress/network";

import CssBasics from "../css/cssbasics";
import Sass from "../css/sass";
import ReatAPIS from "../css/restApi";
import Jest from "../css/jest";
import Enzymes from "../css/enzymes";
import Enzymes2 from "../css/enzyme2";
import Enzymes3 from "../css/enzyme3";
import Matchers from "../css/matchers";
import DevTools from "../css/devtools";
import Html1 from "../css/html_1";
import CssCodes from "../css/csscodes";

import IntroAlgo from "../algorithams/deepAlgorithams/introAlgo";
import Graph from "../algorithams/deepAlgorithams/graph";
import LinkedList from "../algorithams/deepAlgorithams/linkedList";
import Queue from "../algorithams/deepAlgorithams/queue";
import Stack from "../algorithams/deepAlgorithams/stack";
import Sort from "../algorithams/deepAlgorithams/sort";
import Search from "../algorithams/deepAlgorithams/searchAlgo";
import Heap from "../algorithams/deepAlgorithams/heap";
import TopTech from "../algorithams/deepAlgorithams/topTech";
import DSLogic from "../algorithams/deepAlgorithams/stringAlgo";
import DSLogic2 from "../algorithams/deepAlgorithams/arrayAlgo";
import DSLogic3 from "../algorithams/deepAlgorithams/nestingArrAlgo";
import DSLogic4 from "../algorithams/deepAlgorithams/numbersAlgo";
import DSLogic5 from "../algorithams/deepAlgorithams/gameAlgo";
import DSLogic6 from "../algorithams/deepAlgorithams/arrayStrAlgo";
import DSLogic7 from "../algorithams/deepAlgorithams/introAlgo";
import DSLogic8 from "../algorithams/deepAlgorithams/dslogic8";
import Trees from "../algorithams/deepAlgorithams/trees";

import IntroRedux from "../Redux/deep/introRedux";
import ReduxState from "../Redux/deep/reduxState";
import CountersRedux from "../Redux/deep/counter";
import ReduxMethods from "../Redux/deep/reduxMethods";
import Git from "../Redux/deep/git";
import ReactRedux from "../Redux/deep/react_redux";
import ContctHooks from "../Redux/deep/contactKeeperApi";
import ExpenseTraMern from "../Redux/deep/expenseTraMern";
import GitConcepts from "../Redux/deep/gitConcepts";
import MernRedux from "../Redux/deep/mernRedux";
import ReduxCurd from "../Redux/deep/reduxCurd";
import SignUp from "../Redux/deep/signUp";
import Skills from "../Redux/deep/skills";
import ComSkils from "../Redux/deep/comskills";
import TechSkils from "../Redux/deep/techskills";
import TechInto from "../Redux/deep/techinto";

import IntroAngulard from "../angularjsd/deepAngularjs/introAngularjs";
import DepenInjection from "../angularjsd/deepAngularjs/depenInjection";
import Aflows from "../angularjsd/angular 12/flows";
import NgModel from "../angularjsd/deepAngularjs/ngModel";
import NgRepeat from "../angularjsd/deepAngularjs/ngRepeat";
import AngularCond from "../angularjsd/deepAngularjs/angularConditions";
import Directives from "../angularjsd/deepAngularjs/directives";
import Fiters from "../angularjsd/deepAngularjs/angularlFlters";
import AngularForm from "../angularjsd/deepAngularjs/form";
import Scope from "../angularjsd/deepAngularjs/scope";
import Services from "../angularjsd/deepAngularjs/services";
import Validations from "../angularjsd/deepAngularjs/validations";
import Filterss from "../angularjsd/deepAngularjs/filter";
import Logic3 from "../angularjsd/deepAngularjs/apiLogic3";
import Projection12 from "../angularjsd/angular 12/projection";
import Outputs from "../angularjsd/angular 12/output";
import AngularCurd12 from "../angularjsd/angular 12/angularCurd";
import FilterPlace from "../angularjsd/angular 12/filterPlace";
import RadioButton12 from "../angularjsd/angular 12/radioButton";
import Services12 from "../angularjsd/angular 12/services12";
import MultiCheck from "../angularjsd/angular 12/multiCheck";
import DropDownAngular from "../angularjsd/angular 12/dropdownsAngu";
import AngularDir from "../angularjsd/angular 12/angularDir";
import AngularFor from "../angularjsd/angular 12/ngFor";
import AngularLifeCycle from "../angularjsd/angular 12/lifeCycleAng";
import DynamicallyLoad from "../angularjsd/angular 12/dynamicallyLoad";
import Rxjs from "../angularjsd/angular 12/rxjs";
import NgrxCurd from "../angularjsd/angular 12/ngrxCurd";
import NgrxCounter from "../angularjsd/angular 12/ngrxCounter";
import Debounce from "../angularjsd/angular 12/debounce";
import Loader from "../angularjsd/angular 12/loader";
import Paginations from "../angularjsd/angular 12/paginations";



import PyIntro from "../pythone/deeppy/pyIntro";
import PyLogic from "../pythone/deeppy/pyLogic";
import IntroPython from "../pythone/deeppy/introPython";
import Collections from "../pythone/deeppy/collections";
import CsvPython from "../pythone/deeppy/csv";
import Json from "../pythone/deeppy/json";
import Logics from "../pythone/deeppy/logic_python";
import Mathematics from "../pythone/deeppy/mathematics";
import OopsPyton from "../pythone/deeppy/oops_";

import Regex from "../pythone/deeppy/regex";
import Tkinter from "../pythone/deeppy/tkinter";
import LogicalsPy from "../pythone/deeppy/logicalspy";
import Abstract from "../pythone/deeppy/abstract";
import Tuples from "../pythone/deeppy/tuples";
import StringPy from "../pythone/deeppy/stringPy";
import IteratorsPy from "../pythone/deeppy/iteratorsPy";
import ExceptionsPy from "../pythone/deeppy/exceptionsPy";
import Logging from "../pythone/deeppy/logging";
import Threadings from "../pythone/deeppy/threadings";
import FlaskSignUp from "../pythone/deeppy/flask_signUp";
import GetSearch from "../pythone/deeppy/get_search";
import LoadSearch from "../pythone/deeppy/load_search";
import Conroures from "../pythone/deeppy/conroutes";
import HttpsMethods from "../pythone/deeppy/httpsMethods";
import FlaskIns from "../pythone/deeppy/flasksIn";

import PyString from "../pythone/deeppy/pyString";
import PyArray from "../pythone/deeppy/pyArray";
import PyNumbers from "../pythone/deeppy/pyNumbers";
import PyLinkedList from "../pythone/deeppy/pyLinkedList";
import PyHash from "../pythone/deeppy/pyHash";
import PyTree from "../pythone/deeppy/pyTree";
import PyGraph from "../pythone/deeppy/pyGraph";
import PyArrStr from "../pythone/deeppy/pyArrStr";


const {
  IntroAngular,
  Calculator,
  ActivationFuns,
  Loss,
  Stochastic,
  Tensorboards,
  AngularCompile,
  NeyralNetwork,
  GradientNeural,
  RegularizationDeep,
  Imbalanced,
  Benchmarking,
  Customer,
  Imbalanced2,
  Convolutionals,
  Transfer,
  WordEmbedding,
  Projection,
  dataAugmentation,
  TensorFlows,
} = AngularJs;


const {
  Capture,
  JoinImages,
  K_Mean,
  Pandas,
  Numpys,
  DecisionTree,
  KnnPy,
  LdaPy,
  InfoML,
  Adaboots,
  LogisticReg,
  NaiveBrs,
  PcaPy,
  LeanearRegression,
  Perceptron,
  RandomForest,
  Rgrations,
  SvmPy,
  Superwise,
  Libraries,
  Gradient,
  Traning,
  LogisticRegs,
  GreedSearch,
  Regularizations,
  Bagging,
  FeaturesEng,
} = MlMains;


const Routes = (props) => {
  return (
    <section className="container">
      <HeaderSection />
      <Switch>
          <Route exact path="/async_await" component={AsyncAwait} />
          <Route exact path="/reactInter" component={ReactInter} />
          <Route exact path="/mainCompo" component={MainCompo} />
          <Route exact path="/pureComp" component={PureComp} />
          <Route exact path="/models" component={Models} />
          <Route exact path="/customHooks" component={CustomHooks} />
          <Route exact path="/introReact" component={IntroRectJs} />
          <Route exact path="/like" component={Like} />
          <Route exact path="/TextEditors" component={TextEditors} />
          <Route exact path="/sortItems" component={SortItems} />
          <Route exact path="/useStates" component={UseStates} />
          <Route exact path="/serverSideRend" component={SSRendering} />
          <Route exact path="/numberFormats" component={NumberForm} />
          <Route exact path="/dropdownSelect" component={DropdownSelect} />
          <Route exact path="/hackeRank" component={HackeRank} />
          <Route exact path="/ticGame" component={TicGame} />
          <Route exact path="/linkGet" component={LinkGet} />
          <Route exact path="/kanban" component={Kanban} />

          <Route exact path="/cssbasics" component={CssBasics} />
          <Route exact path="/csscodes" component={CssCodes} />
          <Route exact path="/sass" component={Sass} />
          <Route exact path="/html_1" component={Html1} />
          <Route exact path="/restApi" component={ReatAPIS} />
          <Route exact path="/jest" component={Jest} />
          <Route exact path="/matchers" component={Matchers} />
          <Route exact path="/enzymes" component={Enzymes} />
          <Route exact path="/enzyme2" component={Enzymes2} />
          <Route exact path="/enzyme3" component={Enzymes3} />
          <Route exact path="/devtools" component={DevTools} />

          <Route exact path="/reduxState" component={ReduxState} />
          <Route exact path="/reduxMethods" component={ReduxMethods} />
          <Route exact path="/git" component={Git} />
          <Route exact path="/skills" component={Skills} />
          <Route exact path="/comskills" component={ComSkils} />
          <Route exact path="/techskills" component={TechSkils} />
          <Route exact path="/techinto" component={TechInto} />
          <Route exact path="/introRedux" component={IntroRedux} />
          <Route exact path="/react_redux" component={ReactRedux} />
          <Route exact path="/contactKeeperApi" component={ContctHooks} />
          <Route exact path="/counter" component={CountersRedux} />
          <Route exact path="/expenseTraMern" component={ExpenseTraMern} />
          <Route exact path="/gitConcepts" component={GitConcepts} />
          <Route exact path="/mernRedux" component={MernRedux} />
          <Route exact path="/reduxCurd" component={ReduxCurd} />
          <Route exact path="/signUp" component={SignUp} />

          <Route exact path="/keyedCollections" component={KeyedCollections} />
          <Route exact path="/regular" component={RegularExp} />
          <Route exact path="/mcqjs" component={McqJs} />
          <Route exact path="/hackerRank" component={HackerRank1} />
          <Route exact path="/hackerRank6" component={HackerRank6} />
          <Route exact path="/datatypests" component={Datatypests} />
          <Route exact path="/typeScript_2" component={TypeScript2} />
          <Route exact path="/typeScript_4" component={TypeScript4} />

          <Route exact path="/jsObjects" component={JsObject} />
          <Route exact path="/array" component={Arrays} />
          <Route exact path="/arrayApi" component={ArraysApi} />
          <Route exact path="/clousers" component={Clousers} />
          <Route exact path="/findOutput" component={FindOutput} />
          <Route exact path="/logic" component={Logic} />
          <Route exact path="/logic2" component={Logic2} />
          <Route exact path="/introJs" component={IntroJs} />
          <Route exact path="/prototypes" component={Prototypes} />

          <Route exact path="/oops" component={Oops} />

          <Route exact path="/codes" component={NodeJsCodes} />
          <Route exact path="/serverSide" component={ServerSide} />
          <Route exact path="/introNodejs" component={IntroNodeJs} />
          <Route exact path="/tut_1" component={Tur1} />
          <Route exact path="/tut_2" component={Tut2} />
          <Route exact path="/tut_6" component={Tut6} />
          <Route exact path="/token" component={Token} />
          <Route exact path="/buffers" component={BufferNode} />
          <Route exact path="/childs" component={ChildsPros} />
          <Route exact path="/evtNode" component={EvtNode} />
          <Route exact path="/filSystems" component={FileSys} />
          <Route exact path="/udemy" component={Udemy} />
          <Route exact path="/ejsNode" component={Ejs} />
          <Route exact path="/authentications" component={SignUps} />
          <Route exact path="/url_shortener" component={UrlShortenerService} />
          <Route exact path="/stripe_payment" component={StripePayment} />
          <Route exact path="/sendEmail" component={SendEmail} />
          <Route exact path="/search_pagination" component={SearchPagination} />
          <Route
            exact
            path="/push_notifications"
            component={PushNotifications}
          />
          <Route exact path="/nodetext" component={Nodetext} />
          <Route exact path="/file_upload" component={FileUpload} />
          <Route exact path="/e_acco_veri" component={EmailAcco} />
          <Route exact path="/2fa_speakearst" component={TwoFA} />

          <Route exact path="/infoMD" component={IntroMD} />
          <Route exact path="/mongoCurd" component={MongoCurd} />
          <Route exact path="/mongoQueries" component={MongoQueries} />
          <Route
            exact
            path="/searchErrorHandling"
            component={SearchErrorHandling}
          />
          <Route exact path="/mysqlCurd" component={MysqlCurd} />
          <Route exact path="/joinOp" component={JoinOp} />
          <Route exact path="/intro" component={Intro} />
          <Route exact path="/curdOp" component={CurdOp} />
          <Route exact path="/sortOp" component={SortOp} />
          <Route exact path="/bulkRight" component={BulkWright} />
          <Route exact path="/mongodbMethods" component={MongodbMethods} />
          <Route exact path="/GridFs" component={GridFs} />
          <Route exact path="/mysql" component={Mysql} />
          <Route exact path="/postgressql" component={PostgresSQL} />

          <Route exact path="/middleware" component={Middleware} />
          <Route exact path="/introExpress" component={IntroExpress} />
          <Route exact path="/loopbackcli" component={LoopbackCli} />
          <Route exact path="/resDocs" component={ResDocs} />
          <Route exact path="/routerDocs" component={routerDocs} />
          <Route exact path="/jqueries" component={JQueies} />
          <Route exact path="/backbonejs" component={Backbonejs} />
          <Route exact path="/underscorejs" component={UnderscorJs} />
          <Route exact path="/network" component={Networks} />

          <Route exact path="/introPython" component={IntroPython} />
          <Route exact path="/pyIntro" component={PyIntro} />
          <Route exact path="/pyLogic" component={PyLogic} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/csv" component={CsvPython} />
          <Route exact path="/json" component={Json} />
          <Route exact path="/logic_python" component={Logics} />
          <Route exact path="/mathematics" component={Mathematics} />
          <Route exact path="/oops_" component={OopsPyton} />
          <Route exact path="/regex" component={Regex} />
          <Route exact path="/tkinter" component={Tkinter} />
          <Route exact path="/logicalspy" component={LogicalsPy} />
          <Route exact path="/abstract" component={Abstract} />
          <Route exact path="/tuples" component={Tuples} />
          <Route exact path="/stringPy" component={StringPy} />
          <Route exact path="/iteratorsPy" component={IteratorsPy} />
          <Route exact path="/exceptionsPy" component={ExceptionsPy} />
          <Route exact path="/logging" component={Logging} />
          <Route exact path="/threadings" component={Threadings} />
          <Route exact path="/flask_signUp" component={FlaskSignUp} />
          <Route exact path="/get_search" component={GetSearch} />
          <Route exact path="/load_search" component={LoadSearch} />
          <Route exact path="/conroutes" component={Conroures} />
          <Route exact path="/httpsMethods" component={HttpsMethods} />
          <Route exact path="/flasksIn" component={FlaskIns} />

          <Route exact path="/pyString" component={PyString} />
          <Route exact path="/pyArray" component={PyArray} />
          <Route exact path="/pyNumbers" component={PyNumbers} />
          <Route exact path="/pyLinkedList" component={PyLinkedList} />
          <Route exact path="/pyHash" component={PyHash} />
          <Route exact path="/pyTree" component={PyTree} />
          <Route exact path="/pyGraph" component={PyGraph} />
          <Route exact path="/pyArrStr" component={PyArrStr} />

          <Route exact path="/introAlgo" component={IntroAlgo} />
          <Route exact path="/graph" component={Graph} />
          <Route exact path="/linkedList" component={LinkedList} />
          <Route exact path="/queue" component={Queue} />
          <Route exact path="/stack" component={Stack} />
          <Route exact path="/sort" component={Sort} />
          <Route exact path="/searchAlgo" component={Search} />
          <Route exact path="/heap" component={Heap} />
          <Route exact path="/topTech" component={TopTech} />
          <Route exact path="/stringAlgo" component={DSLogic} />
          <Route exact path="/arrayAlgo" component={DSLogic2} />
          <Route exact path="/nestingArrAlgo" component={DSLogic3} />
          <Route exact path="/numbersAlgo" component={DSLogic4} />
          <Route exact path="/gameAlgo" component={DSLogic5} />
          <Route exact path="/arrayStrAlgo" component={DSLogic6} />
          <Route exact path="/arrayNumAlgo" component={DSLogic7} />
          <Route exact path="/dslogic8" component={DSLogic8} />
          <Route exact path="/trees" component={Trees} />

          <Route exact path="/introAngular" component={IntroAngular} />
          <Route exact path="/calculator" component={Calculator} />
          <Route exact path="/activationFunctions" component={ActivationFuns} />
          <Route exact path="/loss" component={Loss} />
          <Route exact path="/gradientNeural" component={GradientNeural} />
          <Route exact path="/stochastic" component={Stochastic} />
          <Route exact path="/tensors" component={Tensorboards} />
          <Route exact path="/benchmarking" component={Benchmarking} />
          <Route exact path="/customer" component={Customer} />
          <Route
            exact
            path="/regularizationDeep"
            component={RegularizationDeep}
          />
          <Route exact path="/imbalanced" component={Imbalanced} />
          <Route exact path="/imbalanced2" component={Imbalanced2} />
          <Route exact path="/convolutionals" component={Convolutionals} />
          <Route exact path="/data_augmentation" component={dataAugmentation} />
          <Route exact path="/transfer" component={Transfer} />
          <Route exact path="/word_embedding" component={WordEmbedding} />
          <Route exact path="/tensorflow" component={TensorFlows} />

          <Route exact path="/projection" component={Projection} />
          <Route exact path="/angCompilers" component={AngularCompile} />
          <Route exact path="/neural" component={NeyralNetwork} />

          <Route exact path="/capture" component={Capture} />
          <Route exact path="/joinImages" component={JoinImages} />
          <Route exact path="/k_meanClustring" component={K_Mean} />
          <Route exact path="/pandas" component={Pandas} />
          <Route exact path="/numpyPy" component={Numpys} />
          <Route exact path="/infoMl" component={InfoML} />
          <Route exact path="/about" component={About} />
          <Route exact path="/adaboost" component={Adaboots} />
          <Route exact path="/decisiontree" component={DecisionTree} />
          <Route exact path="/knn" component={KnnPy} />
          <Route exact path="/lda" component={LdaPy} />
          <Route
            exact
            path="/leanearRegression"
            component={LeanearRegression}
          />
          <Route exact path="/logisticRegrations" component={LogisticReg} />
          <Route exact path="/naiveBar" component={NaiveBrs} />
          <Route exact path="/pcaPy" component={PcaPy} />
          <Route exact path="/perceptron" component={Perceptron} />
          <Route exact path="/randomForest" component={RandomForest} />
          <Route exact path="/regrations" component={Rgrations} />
          <Route exact path="/libraries" component={Libraries} />
          <Route exact path="/gredient_decents" component={Gradient} />
          <Route exact path="/training" component={Traning} />
          <Route exact path="/logisticReg" component={LogisticRegs} />
          <Route exact path="/svmPy" component={SvmPy} />
          <Route exact path="/greedSearch" component={GreedSearch} />
          <Route exact path="/regularizations" component={Regularizations} />
          <Route exact path="/bagging" component={Bagging} />
          <Route exact path="/featuresEng" component={FeaturesEng} />
          <Route exact path="/superwise" component={Superwise} />

          <Route exact path="/javaScript" component={MernLoic} />
          <Route exact path="/reactCurdMern" component={MernReactCurd} />
          <Route exact path="/4_reactCurdHooks" component={MernReactHooks} />
          <Route exact path="/pagination" component={Pagination} />
          <Route exact path="/propsModel" component={PropsModel} />
          <Route exact path="/imageGallery" component={ImageGallery} />
          <Route exact path="/stripes" component={Strips} />
          <Route exact path="/paginationsMern" component={PaginationsMerns} />
          <Route exact path="/googleMap" component={GoogleMaps} />
          <Route exact path="/videoChat" component={VideoChat} />
          <Route exact path="/qrSccaners" component={QrCode} />
          <Route exact path="/react_share" component={ReactShare} />
          <Route exact path="/socialSignUp" component={SocialSignUp} />
          <Route exact path="/mernSocial" component={MernSocial} />
          <Route exact path="/setUpFiles" component={SetUpFiles} />

          <Route exact path="/introAngularjs" component={IntroAngulard} />
          <Route exact path="/depenInjection" component={DepenInjection} />
          <Route exact path="/flows" component={Aflows} />
          <Route exact path="/ngModel" component={NgModel} />
          {/* <Route exact path="/calculator" component={Calculators} /> */}
          <Route exact path="/ngRepeat" component={NgRepeat} />
          <Route exact path="/angularConditions" component={AngularCond} />

          <Route exact path="/directives" component={Directives} />
          <Route exact path="/angularlFlters" component={Fiters} />
          <Route exact path="/form" component={AngularForm} />
          <Route exact path="/scope" component={Scope} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/validations" component={Validations} />
          <Route exact path="/apiLogic3" component={Logic3} />
          <Route exact path="/filter" component={Filterss} />
          <Route exact path="/projection" component={Projection} />
          <Route exact path="/projection" component={Projection12} />
          <Route exact path="/outputs" component={Outputs} />
          <Route exact path="/angularCurd" component={AngularCurd12} />
          {/* <Route exact path="/basicts" component={BasicTs} /> */}
          <Route exact path="/filterPlace" component={FilterPlace} />
          <Route exact path="/radioButton" component={RadioButton12} />
          <Route exact path="/services12" component={Services12} />
          <Route exact path="/multiCheck" component={MultiCheck} />
          <Route exact path="/dropdownsAngu" component={DropDownAngular} />
          <Route exact path="/angularDir" component={AngularDir} />
          <Route exact path="/ngFor" component={AngularFor} />
          <Route exact path="/lifeCycleAng" component={AngularLifeCycle} />
          <Route exact path="/dynamicallyLoad" component={DynamicallyLoad} />
          <Route exact path="/rxjs" component={Rxjs} />
          <Route exact path="/ngrxCurd" component={NgrxCurd} />
          <Route exact path="/ngrxCounter" component={NgrxCounter} />
          <Route exact path="/debounce" component={Debounce} />
          <Route exact path="/loader" component={Loader} />
          <Route exact path="/paginations" component={Paginations} />
      </Switch>
    </section>
  );
};

export default Routes;
