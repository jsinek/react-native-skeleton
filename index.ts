import {App} from './components/App';
import {Screen} from './components/Screen';
import {Spacer} from './components/Spacer';
import {Toaster} from './components/Toaster';
import {nav} from './navigation/nav';
import {toast} from './components/Toaster';
import {onComponentMount, onComponentUnmount} from './hooks';
import {iOS, ANDROID} from './constants';
import {AnimatedValue} from './types/animated';
import {ToastProps, ToastColors} from './components/Toaster/Toast';
import {ScreenProps} from './components/Screen';
import {ScreenConfig} from './types/skeleton';
import {AppProps} from './types/skeleton';
import {SpacerProps} from './components/Spacer';
import {
  SkeletonNav,
  Transition,
  SkeletonNavigationConfig,
} from './types/skeleton';
import {BeforeRemoveEvent} from './types/events';
import {transitions} from './navigation/transitions';

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
  transitions,

  //constants
  iOS,
  ANDROID,
};

export type {
  AnimatedValue,
  AppProps,
  BeforeRemoveEvent,
  ToastProps,
  ToastColors,
  Transition,
  ScreenProps,
  ScreenConfig,
  SpacerProps,
  SkeletonNav,
  SkeletonNavigationConfig,
};
