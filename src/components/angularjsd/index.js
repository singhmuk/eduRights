import React, { Suspense, lazy } from 'react';

const IntroAngulard = lazy(() => import('./deepAngularjs/introAngularjs'));
const DepenInjection = lazy(() => import('./deepAngularjs/depenInjection'));
const Aflows = lazy(() => import('./angular 12/flows'));
const NgModel = lazy(() => import('./deepAngularjs/ngModel'));
const NgRepeat = lazy(() => import('./deepAngularjs/ngRepeat'));
const AngularCond = lazy(() => import('./deepAngularjs/angularConditions'));

const Directives = lazy(() => import('./deepAngularjs/directives'));
const Fiters = lazy(() => import('./deepAngularjs/angularlFlters'));
const AngularForm = lazy(() => import('./deepAngularjs/form'));
const Scope = lazy(() => import('./deepAngularjs/scope'));
const Services = lazy(() => import('./deepAngularjs/services'));
const Validations = lazy(() => import('./deepAngularjs/validations'));
const Filterss = lazy(() => import('./deepAngularjs/filter'));
const Logic3 = lazy(() => import('./deepAngularjs/apiLogic3'));

const Projection12 = lazy(() => import('./angular 12/projection'));
const AngularCurd12 = lazy(() => import('./angular 12/angularCurd'));
const FilterPlace = lazy(() => import('./angular 12/filterPlace'));
const RadioButton12 = lazy(() => import('./angular 12/radioButton'));
const Services12 = lazy(() => import('./angular 12/services12'));
const Vote = lazy(() => import('./angular 12/vote'));
const MultiCheck = lazy(() => import('./angular 12/multiCheck'));
const DropDownAngular = lazy(() => import('./angular 12/dropdownsAngu'));
const AngularDir = lazy(() => import('./angular 12/angularDir'));
const AngularFor = lazy(() => import('./angular 12/ngFor'));
const AngularLifeCycle = lazy(() => import('./angular 12/lifeCycleAng'));
const DynamicallyLoad = lazy(() => import('./angular 12/dynamicallyLoad'));
const Rxjs = lazy(() => import('./angular 12/rxjs'));
const NgrxCurd = lazy(() => import('./angular 12/ngrxCurd'));
const NgrxCounter = lazy(() => import('./angular 12/ngrxCounter'));
const Debounce = lazy(() => import('./angular 12/debounce'));
const Loader = lazy(() => import('./angular 12/loader'));
const Paginations = lazy(() => import('./angular 12/paginations'));


const components = {
  IntroAngulard, NgModel, NgRepeat, AngularCond, AngularDir, Rxjs, Aflows,
  Directives, Fiters, AngularForm, Logic3, NgrxCurd, NgrxCounter,
  Scope, Services12, Validations, Filterss, AngularCurd12, AngularFor,
  Projection12, FilterPlace, MultiCheck, RadioButton12, Services, Vote, DropDownAngular, 
  AngularLifeCycle, DynamicallyLoad,
  Debounce, Loader, Paginations, DepenInjection
};

export { components };