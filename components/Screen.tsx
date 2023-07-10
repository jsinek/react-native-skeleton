import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {Spacer} from './Spacer';
import {AnimatedValue} from '../types/animated';
import {nav} from '../navigation/nav';
import {useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/util';
import { UI } from './UI';
export const screenHeaderHeights: { [key: string]: AnimatedValue; } = {};
export const screenFooterHeights: {[key: string]: AnimatedValue} = {};
export const screenDimensions = Dimensions.get('screen');

export interface ScreenProps extends ScrollViewProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onBeforeRemove?: (BeforeRemoveEvent) => Promise<void>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  uiSpacing?: boolean;
  background?: React.ReactNode;
}

export const Screen = ({
  onFocus,
  onBlur,
  onBeforeRemove,
  header,
  footer,
  uiSpacing = true,
  ...props
}: ScreenProps) => {
  const screen = useRef(nav.getCurrentRoute()?.name || '');
  const screenConfig = useScreenConfig();
  const navigation = useNavigation();
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;
  
  useEffect(() => {
    navigation.setOptions({
      header: () => <UI header={header} footer={footer} />
    });
  }, [header, footer])

  if (!screenHeaderHeights[screen.current]) {
    screenHeaderHeights[screen.current] = new Animated.Value(0);
  }
  if (!screenFooterHeights[screen.current]) {
    screenFooterHeights[screen.current] = new Animated.Value(0);
  }

  const focus = () => {
    if(screenConfig?.modal){
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({ headerMode: 'float' });
    }
    onFocus?.();
  };

  const blur = () => {
    if(!screenConfig?.modal){
      navigation.setOptions({ headerMode: 'screen' });
    }
    onBlur?.();
  };

  const beforeRemove = (e) => {
    if (onBeforeRemove) {
      e.preventDefault();
      onBeforeRemove?.(e).then(() => {
        nav.dispatch(e.data.action);
      })
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

  return (
    <>
      <Animated.View style={[{flex: 1}]}>
        <Component
          importantForAccessibility="no"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...props}
          style={[styles.flex, props.style]}
          contentContainerStyle={[styles.flexGrow, props.contentContainerStyle]}
        >
          {uiSpacing ? <Spacer header={!!header} safeTop /> : null}
          {props.children}
          {uiSpacing ? <Spacer footer={!!footer} safeBottom /> : null}
        </Component>
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
