import {navRef} from '../navigation/nav';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProps, ScreenConfig} from '../types/skeleton';
import {ModalOverlay} from './ModalOverlay';

export let screenConfigs: ScreenConfig[];
const {Navigator, Screen} = createStackNavigator();

export const App = ({
  screens,
  initialScreenName,
  navigationContainerProps,
  modalOverlayColor,
  ...props
}: AppProps) => {
  const [navigatorReady, setNavigatorReady] = useState(false);
  screenConfigs = screens;

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: 'transparent',
            background: 'transparent',
            card: 'transparent',
            text: 'transparent',
            border: 'transparent',
            notification: 'transparent',
          },
        }}
        {...navigationContainerProps}
        ref={navRef}
        onReady={() => setNavigatorReady(true)}>
        {navigatorReady ? (
          <>
            <Navigator
              initialRouteName={initialScreenName}
              screenOptions={{
                headerShown: false,
                cardOverlay: () => <ModalOverlay color={modalOverlayColor} />,
                cardShadowEnabled: false,
                animationEnabled: false,
                presentation: 'transparentModal',
              }}>
              {screens?.map(config => (
                <Screen
                  {...config}
                  key={config.name}
                  name={config.name}
                  component={config.component}
                  options={
                    config.modal ? {cardOverlayEnabled: true} : undefined
                  }
                />
              ))}
            </Navigator>
          </>
        ) : null}
        {props.children}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
