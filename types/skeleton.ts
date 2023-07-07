import {ScreenContainerProps} from 'react-native-screens';
import {JSXElementConstructor} from 'react';
import {navRef} from '../navigation/nav';
import {Animated, ViewStyle} from 'react-native';
import {AnimatedValue} from './animated';
import {ToastProps} from '../components/Toaster/Toast';
import { StackCardStyleInterpolator } from '@react-navigation/stack';

//NativeStackScreenProps;
export interface ScreenConfig {
  name: string;
  component: (props: any) => JSX.Element;
  transition?: StackCardStyleInterpolator;
  modal?: boolean;
}

export interface AppProps {
  navigationContainerProps?: Omit<ScreenContainerProps, 'children'>;
  screens: ScreenConfig[];
  initialScreenName?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  background?: React.ReactNode;
  toast?: JSXElementConstructor<ToastProps>;
  children?: React.ReactNode;
  modalOverlayColor?: string;
}

export type Transition = (
  animatedValue: AnimatedValue,
) => Animated.WithAnimatedObject<ViewStyle> | null;

export type SkeletonNavigationConfig = (
  name: string,
  params?: object,
  transition?: Transition,
) => void;

type Nav = typeof navRef;
export interface SkeletonNav extends Nav {
  tmpTransition?: Transition;
  goTo: SkeletonNavigationConfig;
  resetTo: SkeletonNavigationConfig;
  replace: SkeletonNavigationConfig;
  push: SkeletonNavigationConfig;
}
