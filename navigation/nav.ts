import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SkeletonNav} from '../types/skeleton';
import {navOptions} from '@jsinek/react-native-skeleton/components/App';

export const navRef = createNavigationContainerRef();

let tmpPreventGoBack = false;

export const nav: SkeletonNav = {
  ...navRef,
  tmpTransition: undefined,
  goTo(name, params, options) {
    navOptions.override = options;
    // @ts-ignore
    navRef.navigate(name, params);
    setTimeout(() => {
      this.tmpTransition = undefined;
    });
  },
  resetTo(name, params, options) {
    navOptions.override = options;
    navRef.reset({routes: [{name, params}]});
    setTimeout(() => {
      this.tmpTransition = undefined;
    });
  },
  replace(name, params, options) {
    navOptions.override = options;
    navRef.dispatch(StackActions.replace(name, params));
    setTimeout(() => {
      this.tmpTransition = undefined;
    });
  },
  push(name, params, options) {
    navOptions.override = options;
    navRef.dispatch(StackActions.push(name, params));
    setTimeout(() => {
      this.tmpTransition = undefined;
    });
  },
  goBack(options) {
    if (tmpPreventGoBack && !options?.ignoreCooldown) return;

    tmpPreventGoBack = true;  
    navRef.goBack();

    setTimeout(() => {
      tmpPreventGoBack = false;
    }, options?.cooldownTime || 400);
  },
  canGoBack: () => navRef.isReady() && navRef.canGoBack(),
};
