import React, { Suspense, lazy } from 'react';


const PureComp = lazy(() => import('./reactJs_hooks/pureComp'));
const MainCompo = lazy(() => import('./reactJs_hooks/mainCompo'));
const AsyncAwait = lazy(() => import('./reactJs_hooks/async_await'));
const LinkGet = lazy(() => import('./reactJs_hooks/linkGet'));
const Models = lazy(() => import('./reactJs_hooks/models'));
const ContextHooks = lazy(() => import('./reactJs_hooks/contextHooks'));
const CustomHooks = lazy(() => import('./reactJs_hooks/customHooks'));
const IntroRectJs = lazy(() => import('./reactJs_hooks/introReact'));
const Like = lazy(() => import('./reactJs_hooks/like'));
const SSRendering = lazy(() => import('./reactJs_hooks/serverSideRend'));
const TextEditors = lazy(() => import('./reactJs_hooks/textEditors'));
const SortItems = lazy(() => import('./reactJs_hooks/sortItems'));

const NumberForm = lazy(() => import('./reactJs_hooks/numberFormats'));
const DropdownSelect = lazy(() => import('./reactJs_hooks/dropdownSelect'));
const UseStates = lazy(() => import('./reactJs_hooks/useStates'));
const UseReducers = lazy(() => import('./reactJs_hooks/useReducersSta'));
const JsonPlaceholder = lazy(() => import('./reactJs_hooks/jsonPlaceholder'));
const HackeRank = lazy(() => import('./reactJs_hooks/hackeRank'));
const TicGame = lazy(() => import('./reactJs_hooks/ticGame'));
const ContextMeth = lazy(() => import('./reactJs_hooks/contextMethods'));
const Kanban = lazy(() => import('./reactJs_hooks/kanban'));
const ReactInter = lazy(() => import('./reactJs_hooks/reactInter'));
const CodingInter = lazy(() => import('./reactJs_hooks/codingInter'));



const components = {
  MainCompo, AsyncAwait, IntroRectJs, ContextMeth, NumberForm, DropdownSelect, HackeRank, PureComp, 
  TextEditors, Kanban,  Models, ContextHooks, UseStates, UseReducers, Like, CustomHooks, SSRendering, 
  JsonPlaceholder, TicGame, LinkGet, ReactInter, CodingInter, SortItems
};

export { components };