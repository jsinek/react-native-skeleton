import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  LayoutChangeEvent,
  Animated,
  Dimensions,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {Spacer} from './Spacer';
import {AnimatedValue} from '../types/animated';
import {nav} from '../navigation/nav';
import {useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/util';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const screenHeaderHeights: {[key: string]: AnimatedValue} = {};
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
  const safeInsets = useSafeAreaInsets();
  const screen = useRef(nav.getCurrentRoute()?.name || '');
  const screenConfig = useScreenConfig();
  const navigation = useNavigation();
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;
  
  useEffect(() => {
    navigation.setOptions({ header: () => header });
  }, [header])

  if (!screenHeaderHeights[screen.current]) {
    screenHeaderHeights[screen.current] = new Animated.Value(0);
  }

  if (!screenFooterHeights[screen.current]) {
    screenFooterHeights[screen.current] = new Animated.Value(0);
  }

  const onFooterLayout = ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => {
    const footerHeight = height ? height - safeInsets.bottom : 0;
    const screenName = nav.getCurrentRoute().name;
    if (!screenFooterHeights[screenName]) {
      screenFooterHeights[screenName] = new Animated.Value(footerHeight);
    } else {
      screenFooterHeights[screenName].setValue(footerHeight);  
    }
  };

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
      {footer ?
        <Animated.View style={styles.footer} onLayout={onFooterLayout}>
          {footer}
        </Animated.View>
      : footer}
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
