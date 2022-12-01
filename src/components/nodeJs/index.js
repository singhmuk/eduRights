import React, { Suspense, lazy } from 'react';

const IntroNodeJs = lazy(() => import('./nodeDeep/introNodejs'));
const NodeJsCodes = lazy(() => import('./nodeDeep/codes'));
const ServerSide = lazy(() => import('./nodeDeep/serverSide'));
const Tur1 = lazy(() => import('./nodeDeep/tut_1'));
const Tut2 = lazy(() => import('./nodeDeep/tut_2'));
const Tut6 = lazy(() => import('./nodeDeep/tut_6'));
const BufferNode = lazy(() => import('./nodeDeep/buffers'));
const ChildsPros = lazy(() => import('./nodeDeep/childs'));
const EvtNode = lazy(() => import('./nodeDeep/evtNode'));
const FileSys = lazy(() => import('./nodeDeep/filSystems'));
const Udemy = lazy(() => import('./nodeDeep/udemy'));
const Ejs = lazy(() => import('./nodeDeep/ejsNode'));
const SignUps = lazy(() => import('./nodeDeep/authentications'));

const UrlShortenerService = lazy(() => import('./nodeDeep/url_shortener'));
const StripePayment = lazy(() => import('./nodeDeep/stripe_payment'));
const SendEmail = lazy(() => import('./nodeDeep/sendEmail'));
const SearchPagination = lazy(() => import('./nodeDeep/search_pagination'));
const PushNotifications = lazy(() => import('./nodeDeep/push_notifications'));
const Nodetext = lazy(() => import('./nodeDeep/nodetext'));
const FileUpload = lazy(() => import('./nodeDeep/file_upload'));
const EmailAcco = lazy(() => import('./nodeDeep/e_acco_veri'));
const TwoFA = lazy(() => import('./nodeDeep/2fa_speakearst'));


const components = {
  NodeJsCodes, ServerSide, IntroNodeJs, Tut2, Tut6, Nodetext, FileUpload, EmailAcco,
  BufferNode, ChildsPros, EvtNode, FileSys, Tur1, Udemy, Ejs, SignUps, SearchPagination,
  UrlShortenerService, StripePayment, SendEmail, PushNotifications, TwoFA
};

export { components };

