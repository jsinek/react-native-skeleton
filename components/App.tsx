import {navRef} from '../navigation/nav';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackCardInterpolationProps,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProps, ScreenConfig} from '../types/skeleton';
import {ModalOverlay} from './ModalOverlay';
import {transitions} from '../navigation/transitions';
import {UIProvider} from '../context/UI';

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
  const [navigatorReady, setNavigatorReady] = useState(false);

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
          ref={navRef}
          onReady={() => setNavigatorReady(true)}>
          {navigatorReady && (
            <>
              <Navigator
                initialRouteName={initialScreenName}
                screenOptions={{                  
                  cardShadowEnabled: false,
                  headerMode: 'float',
                  headerStyle: { height: 0 }
                }}>
                {screens?.map(config => {
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
              </>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </UIProvider>
  );
};
