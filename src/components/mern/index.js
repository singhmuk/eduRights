import React, { Suspense, lazy } from 'react';


const MernLoic = lazy(() => import('./projects/javaScript'));
const MernReactCurd = lazy(() => import('./projects/3_reactCurdMern'));
const MernReactHooks = lazy(() => import('./projects/4_reactCurdHooks'));
const Pagination = lazy(() => import('./projects/pagination'));
const PropsModel = lazy(() => import('./projects/propsModel'));
const ImageGallery = lazy(() => import('./projects/imageGallery'));
const Strips = lazy(() => import('./projects/stripes'));
const PaginationsMerns = lazy(() => import('./projects/paginationsMern'));
const ReactWeb = lazy(() => import('./projects/reactWebrtc'));
const GoogleMaps = lazy(() => import('./projects/googleMap'));
const VideoChat = lazy(() => import('./projects/videoChat'));
const QrCode = lazy(() => import('./projects/qrSccaners'));
const ReactShare = lazy(() => import('./projects/react_share'));
const SocialSignUp = lazy(() => import('./projects/socialSignUp'));
const MernSocial = lazy(() => import('./projects/mernSocial'));
const SetUpFiles = lazy(() => import('./projects/setUpFiles'));



const components = {
  MernLoic, MernReactCurd, MernReactHooks, ImageGallery, ReactWeb, SocialSignUp, MernSocial, SetUpFiles, QrCode,
  Pagination, PropsModel, Strips, PaginationsMerns, GoogleMaps, VideoChat, ReactShare
};

export { components };