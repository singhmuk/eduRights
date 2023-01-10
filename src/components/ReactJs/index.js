import React, { Suspense, lazy } from 'react';


const PureComp = lazy(() => import('./reactJs_hooks/pureComp'));
const MainCompo = lazy(() => import('./reactJs_hooks/mainCompo'));
const AsyncAwait = lazy(() => import('./reactJs_hooks/async_await'));
const LinkGet = lazy(() => import('./reactJs_hooks/linkGet'));
const Models = lazy(() => import('./reactJs_hooks/models'));
const CustomHooks = lazy(() => import('./reactJs_hooks/customHooks'));
const IntroRectJs = lazy(() => import('./reactJs_hooks/introReact'));
const Like = lazy(() => import('./reactJs_hooks/like'));
const SSRendering = lazy(() => import('./reactJs_hooks/serverSideRend'));
const TextEditors = lazy(() => import('./reactJs_hooks/textEditors'));
const SortItems = lazy(() => import('./reactJs_hooks/sortItems'));

const NumberForm = lazy(() => import('./reactJs_hooks/numberFormats'));
const DropdownSelect = lazy(() => import('./reactJs_hooks/dropdownSelect'));
const UseStates = lazy(() => import('./reactJs_hooks/useStates'));
const HackeRank = lazy(() => import('./reactJs_hooks/hackeRank'));
const TicGame = lazy(() => import('./reactJs_hooks/ticGame'));
const Kanban = lazy(() => import('./reactJs_hooks/kanban'));
const ReactInter = lazy(() => import('./reactJs_hooks/reactInter'));



const components = {
  MainCompo, AsyncAwait, IntroRectJs, NumberForm, DropdownSelect, HackeRank, PureComp, 
  TextEditors, Kanban,  Models, UseStates, Like, CustomHooks, SSRendering, 
  TicGame, LinkGet, ReactInter, SortItems
};

export { components };