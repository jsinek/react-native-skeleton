import React, {useRef} from 'react';
import {Animated, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {screenFooterHeights, screenHeaderHeights} from './Screen';
import {nav} from '../navigation/nav';

export interface SpacerProps extends ViewProps {
  size?: number;
  safeTop?: boolean;
  safeBottom?: boolean;
  header?: boolean;
  footer?: boolean;
  flex?: boolean;
}

export const Spacer = ({
  safeTop,
  safeBottom,
  size = 0,
  flex,
  header,
  footer,
  ...props
}: SpacerProps) => {
  const safeInsets = useSafeAreaInsets();
  const screen = useRef(nav.getCurrentRoute()?.name || '');
  let width = 0;
  if (!header && safeTop) width += safeInsets.top;
  if (!header && safeBottom) width += safeInsets.bottom;

  if (typeof size === 'number') width += size;

  return (
    <View
      pointerEvents="none"
      {...props}
      style={[flex ? {flex: 1} : null, props.style]}>
      <View pointerEvents="none" style={[{width, aspectRatio: 1}]} />
      {header ? (
        <Animated.View
          pointerEvents="none"
          style={{width: screenHeaderHeights[screen.current], aspectRatio: 1}}
        />
      ) : null}
      {footer ? (
        <Animated.View
          pointerEvents="none"
          style={{width: screenFooterHeights[screen.current], aspectRatio: 1}}
        />
      ) : null}
    </View>
  );
};
