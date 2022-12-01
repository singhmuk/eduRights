import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderSection from '../../components/dashboard/blog/HeaderSection';

import { components as ReactMains } from '../ReactJs';

import { components as CssMains } from '../css';


import { components as ReduxMains } from '../Redux';

import { components as JsMains } from '../javaScripts';

import { components as NodeMains } from '../nodeJs';

import { components as MongodbMains } from '../mongoDB';

import { components as ExpressMains } from '../express';

import { components as PyMains } from '../pythone';

import { components as AlMains } from '../algorithams';

import { components as AngularJs } from '../angularjs';

import { components as AngularJsd } from '../angularjsd';

import { components as MlMains } from '../ml';

import { components as MernProjectss } from '../mern';

import About from '../../components/dashboard/about';


const { MainCompo, AsyncAwait, IntroRectJs, SSRendering, HackeRank, Models, Like, DropdownSelect, ContextMeth,
  ContextHooks, CustomHooks, NumberForm, UseReducers, TicGame, PureComp, UseStates, JsonPlaceholder, LinkGet,
  TextEditors, Kanban, ReactInter, CodingInter, SortItems } = ReactMains;

const { CssBasics, Sass, ReatAPIS, Jest, Enzymes, Matchers, Enzymes2, Enzymes3, DevTools,
  Html1 } = CssMains;

const { ReduxState, ReduxMethods, Git, Skills, IntroRedux, ReactRedux, ContctHooks, ExpenseTraMern, GitConcepts,
  CountersRedux, MernRedux, ReduxCurd, SignUp, ComSkils, TechSkils, TechInto } = ReduxMains;

const { Arrays, Clousers, FindOutput, JsObject, Logic, Methods,
  IntroJs, Prototypes, ArraysApi, Oops, Reduce, McqJs,
  KeyedCollections, RegularExp, HackerRank1, HackerRank6 } = JsMains;

const { NodeJsCodes, ServerSide, IntroNodeJs, Tur1, Tut2, Tut6, Udemy, Ejs, Nodetext,
  SignUps, BufferNode, Token, ChildsPros, SendEmail, SearchPagination, PushNotifications,
  EvtNode, FileSys, UrlShortenerService, StripePayment, FileUpload, EmailAcco, TwoFA
 } = NodeMains;

const { GridFs, Intro, MongodbMethods, IntroMD, CurdOp, BulkWright, MysqlCurd, MongoCurd, Mysql, 
  PostgresSQL, MongoQueries, SearchErrorHandling, JoinOp, SortOp
} = MongodbMains;

const { Middleware, IntroExpress, LoopbackCli, ResDocs, routerDocs, JQueies, Backbonejs, UnderscorJs } = ExpressMains;

const { PyIntro, PyLogic, IntroPython, Collections, CsvPython, Json, Logics, Mathematics, OopsPyton,
  Regex, Tkinter, LogicalsPy, Abstract, Tuples, StringPy, IteratorsPy,
  ExceptionsPy, Logging, Threadings, FlaskSignUp, GetSearch, LoadSearch, Conroures, FlaskIns,
  HttpsMethods } = PyMains;

const { Graph, LinkedList, Queue, Stack, Sort, Search, IntroAlgo, Heap, TopTech, 
        DSLogic, DSLogic2, DSLogic3, DSLogic4, DSLogic5, DSLogic6, DSLogic7, DSLogic8,
         Trees } = AlMains;

const { IntroAngular, Calculator, ActivationFuns, Loss, Stochastic, Tensorboards,
  AngularCompile, NeyralNetwork, GradientNeural, RegularizationDeep, Imbalanced, Datatypests,
  Benchmarking, Customer, Imbalanced2, Convolutionals, Transfer, WordEmbedding,
  Projection, dataAugmentation, TypeScript2, TypeScript4, TensorFlows
} = AngularJs;

const { IntroAngulard, NgModel, Calculators, NgRepeat, AngularCond, Rxjs, NgrxCurd, NgrxCounter,
  Logic3, AngularDir, AngularDir2, MetaData, AngularLifeCycle, Aflows,
  Directives, AungularEvents, Fiters, AngularForm, AngularFor, ViewProviders,
  Scope, Services, Validations, Filterss, AngularRoutes,
  Projection12, AngularCurd12, FilterPlace, DynamicallyLoad,
  RadioButton12, Services12, Vote, MultiCheck, DropDownAngular,
  AngularSelector, AngularPipes,
  Debounce, Paginations, Loader
} = AngularJsd;

const { Capture, JoinImages, K_Mean, Pandas, Numpys, DecisionTree, KnnPy, LdaPy,
  InfoML, Adaboots, LogisticReg, NaiveBrs, PcaPy,
  LeanearRegression, Perceptron, RandomForest, Rgrations, SvmPy, Superwise,
  Libraries, Gradient,
  Traning, LogisticRegs, GreedSearch, Regularizations, Bagging, FeaturesEng } = MlMains;

const { MernReactCurd, MernReactHooks, Pagination, MernLoic, ImageGallery,
  PropsModel, Strips, PaginationsMerns, GoogleMaps, VideoChat, SetUpFiles,
  QrCode, ReactShare, SocialSignUp, MernSocial } = MernProjectss;

const Routes = props => {
  return (
    <section className="container">
      <HeaderSection />
      <Switch>
        <Suspense fallback={<div>Loading Page...</div>}>
          <Route exact path="/async_await" component={AsyncAwait} />
          <Route exact path="/reactInter" component={ReactInter} />
          <Route exact path="/codingInter" component={CodingInter} />
          <Route exact path="/mainCompo" component={MainCompo} />
          <Route exact path="/pureComp" component={PureComp} />
          <Route exact path="/models" component={Models} />
          <Route exact path="/contextHooks" component={ContextHooks} />
          <Route exact path="/customHooks" component={CustomHooks} />
          <Route exact path="/introReact" component={IntroRectJs} />
          <Route exact path="/like" component={Like} />
          <Route exact path="/TextEditors" component={TextEditors} />
          <Route exact path="/sortItems" component={SortItems} />
          <Route exact path="/useStates" component={UseStates} />
          <Route exact path="/serverSideRend" component={SSRendering} />
          <Route exact path="/numberFormats" component={NumberForm} />
          <Route exact path="/dropdownSelect" component={DropdownSelect} />
          <Route exact path="/useReducersSta" component={UseReducers} />
          <Route exact path="/jsonPlaceholder" component={JsonPlaceholder} />
          <Route exact path="/hackeRank" component={HackeRank} />
          <Route exact path="/ticGame" component={TicGame} />
          <Route exact path="/linkGet" component={LinkGet} />
          <Route exact path="/contextMethods" component={ContextMeth} />
          <Route exact path="/kanban" component={Kanban} />

          <Route exact path="/cssbasics" component={CssBasics} />
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


          <Route exact path="/jsObjects" component={JsObject} />
          <Route exact path="/this" component={Methods} />
          <Route exact path="/array" component={Arrays} />
          <Route exact path="/arrayApi" component={ArraysApi} />
          <Route exact path="/clousers" component={Clousers} />
          <Route exact path="/findOutput" component={FindOutput} />
          <Route exact path="/logic" component={Logic} />
          <Route exact path="/introJs" component={IntroJs} />
          <Route exact path="/prototypes" component={Prototypes} />

          <Route exact path="/oops" component={Oops} />
          <Route exact path="/reduces" component={Reduce} />

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
          <Route exact path="/push_notifications" component={PushNotifications} />
          <Route exact path="/nodetext" component={Nodetext} />
          <Route exact path="/file_upload" component={FileUpload} />
          <Route exact path="/e_acco_veri" component={EmailAcco} />
          <Route exact path="/2fa_speakearst" component={TwoFA} />


          <Route exact path="/infoMD" component={IntroMD} />
          <Route exact path="/mongoCurd" component={MongoCurd} />
          <Route exact path="/mongoQueries" component={MongoQueries} />
          <Route exact path="/searchErrorHandling" component={SearchErrorHandling} />
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
          <Route exact path="/regularizationDeep" component={RegularizationDeep} />
          <Route exact path="/imbalanced" component={Imbalanced} />
          <Route exact path="/imbalanced2" component={Imbalanced2} />
          <Route exact path="/convolutionals" component={Convolutionals} />
          <Route exact path="/data_augmentation" component={dataAugmentation} />
          <Route exact path="/transfer" component={Transfer} />
          <Route exact path="/word_embedding" component={WordEmbedding} />
          <Route exact path="/tensorflow" component={TensorFlows} />

          <Route exact path="/projection" component={Projection} />
          <Route exact path="/datatypests" component={Datatypests} />
          <Route exact path="/typeScript_2" component={TypeScript2} />
          <Route exact path="/typeScript_4" component={TypeScript4} />
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
          <Route exact path="/leanearRegression" component={LeanearRegression} />
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
          <Route exact path="/flows" component={Aflows} />
          <Route exact path="/ngModel" component={NgModel} />
          <Route exact path="/calculator" component={Calculators} />
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
          <Route exact path="/angularCurd" component={AngularCurd12} />
          {/* <Route exact path="/basicts" component={BasicTs} /> */}
          <Route exact path="/filterPlace" component={FilterPlace} />
          <Route exact path="/radioButton" component={RadioButton12} />
          <Route exact path="/services12" component={Services12} />
          <Route exact path="/vote" component={Vote} />
          <Route exact path="/multiCheck" component={MultiCheck} />
          <Route exact path="/dropdownsAngu" component={DropDownAngular} />
          <Route exact path="/angularSelector" component={AngularSelector} />
          <Route exact path="/angularDir" component={AngularDir} />
          <Route exact path="/angularDir2" component={AngularDir2} />
          <Route exact path="/metedata" component={MetaData} />
          <Route exact path="/ngFor" component={AngularFor} />
          <Route exact path="/pipes" component={AngularPipes} />
          <Route exact path="/anguRoutes" component={AngularRoutes} />
          <Route exact path="/lifeCycleAng" component={AngularLifeCycle} />
          <Route exact path="/viewProvider" component={ViewProviders} />
          <Route exact path="/dynamicallyLoad" component={DynamicallyLoad} />
          <Route exact path="/rxjs" component={Rxjs} />
          <Route exact path="/ngrxCurd" component={NgrxCurd} />
          <Route exact path="/ngrxCounter" component={NgrxCounter} />
          <Route exact path="/debounce" component={Debounce} />
          <Route exact path="/loader" component={Loader} />
          <Route exact path="/paginations" component={Paginations} />
        </Suspense>
      </Switch>
    </section>
  );
};

export default Routes;