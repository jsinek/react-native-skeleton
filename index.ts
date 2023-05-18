import {App} from './components/App';
import {Screen} from './components/Screen';
import { Spacer } from './components/Spacer';
import { Toaster } from './components/Toaster'
import { nav } from './navigation/nav';
import {toast} from './components/Toaster';
import { onComponentMount, onComponentUnmount } from './hooks';
import { iOS, ANDROID } from './constants';
import { AnimatedValue } from './types/animated';
import { ToastProps, ToastColors } from './components/Toaster/Toast';
import { ScreenProps } from './components/Screen';
import { ScreenConfig } from './types/skeleton';
import { AppProps } from './types/skeleton';
import { SpacerProps } from './components/Spacer';
import { SkeletonNav, Transition, SkeletonNavigationConfig } from './types/skeleton';
import { BeforeRemoveEventData, BeforeRemoveEvent } from './types/util';
import { transition } from './navigation/transition';

export {
  //components
  App,
  Screen,
  Spacer,
  Toaster,

  //utilities
  nav,
  toast,
  onComponentMount,
  onComponentUnmount,
  transition,

  //constants
  iOS,
  ANDROID,
};
  
export type {
  AnimatedValue,
  AppProps,
  BeforeRemoveEventData,
  BeforeRemoveEvent,
  ToastProps,
  ToastColors,
  Transition,
  ScreenProps,
  ScreenConfig,
  SpacerProps,
  SkeletonNav,
  SkeletonNavigationConfig
};
