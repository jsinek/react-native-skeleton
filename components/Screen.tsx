import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  LayoutChangeEvent,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {Spacer} from './Spacer';
import {AnimatedValue} from '../types/animated';
import {nav} from '../navigation/nav';
import {getScreenConfig, useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/util';
export const screenHeaderHeights: {[key: string]: AnimatedValue} = {};
export const screenFooterHeights: {[key: string]: AnimatedValue} = {};
export const screenDimensions = Dimensions.get('screen');

export interface ScreenProps extends ScrollViewProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onBeforeRemove?: BeforeRemoveEvent;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  uiSpacing?: boolean;
  background?: React.ReactNode;
}

export const Screen = ({
  onFocus,
  onBlur,
  onBeforeRemove,
  Header,
  Footer,
  uiSpacing = true,
  ...props
}: ScreenProps) => {
  const screen = useRef(nav.getCurrentRoute()?.name || '');
  const screenConfig = useScreenConfig();
  const [transition] = useState(new Animated.Value(0));
  const [uiOpacity] = useState(new Animated.Value(0));
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;

  if (!screenHeaderHeights[screen.current]) {
    screenHeaderHeights[screen.current] = new Animated.Value(0);
  }

  if (!screenFooterHeights[screen.current]) {
    screenFooterHeights[screen.current] = new Animated.Value(0);
  }

  const onHeaderLayout = (e: LayoutChangeEvent) => {
    screenHeaderHeights[screen.current].setValue(e.nativeEvent.layout.height);
  };

  const onFooterLayout = (e: LayoutChangeEvent) => {
    screenFooterHeights[screen.current].setValue(e.nativeEvent.layout.height);
  };

  const focus = () => {
    uiOpacity.setValue(1);
    Animated.timing(transition, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
      easing: Easing.out(Easing.circle),
    }).start();
    onFocus?.();
  };

  const blur = () => {
    if (!getScreenConfig()?.modal) {
      uiOpacity.setValue(0);

      Animated.timing(transition, {
        toValue: 2,
        duration: 160,
        useNativeDriver: true,
        easing: Easing.out(Easing.circle),
      }).start();

      onBlur?.();
    }
  };

  const beforeRemove = (e) => {
    if (e.data.action.type !== 'RESET') {
      e.preventDefault();

      Animated.timing(transition, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
        easing: Easing.out(Easing.circle),
      }).start(() => {
        try {
          nav.dispatch(e.data.action);
        } catch (e) {}
      });
    }
  };

  onComponentMount(() => {
    addListener('focus', focus);
    addListener('blur', blur);
    addListener('beforeRemove', beforeRemove);

    return () => {
      removeListener('focus', focus);
      removeListener('blur', blur);
      removeListener('beforeRemove', beforeRemove);
    };
  });

  const screenTransition =
    nav.tmpTransition?.(transition) || screenConfig?.transition?.(transition);

  return (
    <>
      <Animated.View
        style={[styles.header, {opacity: uiOpacity}]}
        onLayout={onHeaderLayout}
      >
        {Header}
      </Animated.View>
      <Animated.View style={[{flex: 1}, screenTransition]}>
        <Component
          importantForAccessibility="no"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...props}
          style={[styles.flex, props.style]}
          contentContainerStyle={[styles.flexGrow, props.contentContainerStyle]}
        >
          {uiSpacing ? <Spacer header={!!Header} safeTop /> : null}
          {props.children}
          {uiSpacing ? <Spacer footer={!!Footer} safeBottom /> : null}
        </Component>
      </Animated.View>
      <Animated.View
        style={[styles.footer, {opacity: uiOpacity}]}
        onLayout={onFooterLayout}
      >
        {Footer}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
