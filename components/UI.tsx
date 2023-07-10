import React from 'react';
import {
  Animated,
  Dimensions,
  View,
} from 'react-native';
import {AnimatedValue} from '../types/animated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenFooterHeights } from './Screen';
import { nav } from '../navigation/nav';
export const screenHeaderHeights: {[key: string]: AnimatedValue} = {};
export const screenDimensions = Dimensions.get('screen');

export interface UIProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const UI = ({
  header,
  footer,
}: UIProps) => {
  const safeFrame = useSafeAreaFrame();
  const safeInsets = useSafeAreaInsets();
  const onFooterLayout = ({ nativeEvent: { layout: { height } } }) => { 
    const screen = nav.getCurrentRoute()?.name || '';

    if (!screenFooterHeights[screen]) {
      screenFooterHeights[screen] = new Animated.Value(0);
    }

    screenFooterHeights[screen].setValue(height - (safeInsets.bottom || 0));
  }

  return (
    <>
      {header}
      <View style={{position: 'absolute',top: safeFrame.height, left: 0, right: 0}}>
        <View style={{position: 'absolute', bottom: 0, left:0, right: 0}} onLayout={onFooterLayout}>
          {footer}
        </View>
      </View>
    </>
  );
};

