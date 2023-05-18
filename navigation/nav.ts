import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SkeletonNav} from '../types/skeleton';

export const navRef = createNavigationContainerRef();

export const nav: SkeletonNav = {
  ...navRef,
  tmpTransition: null,
  goTo(name, params, transition) {
    this.tmpTransition = transition;
    navRef.navigate(name as never, params as never);
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  resetTo(name, params, transition) {
    this.tmpTransition = transition;
    navRef.reset({routes: [{name, params}]});
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  replace(name, params, transition) {
    this.tmpTransition = transition;
    navRef.dispatch(StackActions.replace(name, params));
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  push(name, params, transition) {
    this.tmpTransition = transition;
    navRef.dispatch(StackActions.push(name, params));
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  canGoBack: () => navRef.isReady() && navRef.canGoBack(),
};
