import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SkeletonNav} from '../types/skeleton';
import { navOptions } from '@jsinek/react-native-skeleton/components/App';

export const navRef = createNavigationContainerRef();

export const nav: SkeletonNav = {
  ...navRef,
  tmpTransition: null,
  goTo(name, params, options) {
    navOptions.override = options;
    navRef.navigate(name as never, params as never);
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  resetTo(name, params, options) {
    navOptions.override = options;
    navRef.reset({routes: [{name, params}]});
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  replace(name, params, options) {
    navOptions.override = options;
    navRef.dispatch(StackActions.replace(name, params));
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  push(name, params, options) {
    navOptions.override = options;
    navRef.dispatch(StackActions.push(name, params));
    setTimeout(() => {
      this.tmpTransition = null;
    });
  },
  canGoBack: () => navRef.isReady() && navRef.canGoBack(),
};
