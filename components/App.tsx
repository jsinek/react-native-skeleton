import {navRef} from '../navigation/nav';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackCardInterpolationProps,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProps, ScreenConfig} from '../types/skeleton';
import {ModalOverlay} from './ModalOverlay';
import {transitions} from '../navigation/transitions';
import {UI} from './UI';
import {UIElementSpacing, UIProvider} from '../context/UI';

export let screenConfigs: ScreenConfig[];
const {Navigator, Screen} = createStackNavigator();
export const navigator = {
  ref: null,
};

type Transition = (props: StackCardInterpolationProps) => {};

export interface NavigationOptions extends StackNavigationOptions {
  cardStyleInterpolator?: Transition;
}

export const navOptions: {override?: NavigationOptions} = {
  override: {},
};

export const App = ({
  screens,
  initialScreenName,
  navigationContainerProps,
  modalOverlayColor,
  uiElements,
  ...props
}: AppProps) => {
  screenConfigs = screens;

  return (
    <UIProvider defaultElements={uiElements}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: 'transparent',
              background: 'white',
              card: 'transparent',
              text: 'transparent',
              border: 'transparent',
              notification: 'transparent',
            },
          }}
          {...navigationContainerProps}
          ref={navRef}>
          <Navigator
            initialRouteName={initialScreenName}
            screenOptions={{
              header: () => <UI />,
              headerStyleInterpolator: () => ({}),
              cardShadowEnabled: false,
              animationEnabled: true,
              headerMode: 'float',
            }}>
            {screens?.map(config => {
              UIElementSpacing.registerScreen(config.name);

              return (
                <Screen
                  {...config}
                  key={config.name}
                  name={config.name}
                  component={config.component}
                  options={() => ({
                    presentation: config.modal ? 'transparentModal' : undefined,
                    cardOverlay: config.modal
                      ? () => <ModalOverlay color={modalOverlayColor} />
                      : undefined,
                    cardOverlayEnabled: config.modal ? true : undefined,
                    cardStyleInterpolator:
                      config.transition || transitions.none,
                    ...navOptions.override,
                  })}
                />
              );
            })}
          </Navigator>
          {props.children}
        </NavigationContainer>
      </SafeAreaProvider>
    </UIProvider>
  );
};
