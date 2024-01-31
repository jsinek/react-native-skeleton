import React, {useRef} from 'react';
import {Animated, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {nav} from '../navigation/nav';
import {UIElementSpacing} from '@jsinek/react-native-skeleton/context/UI';

export interface SpacerProps extends ViewProps {
  size?: number;
  safeTop?: boolean;
  safeBottom?: boolean;
  uiTop?: boolean;
  uiBottom?: boolean;
  uiLeft?: boolean;
  uiRight?: boolean;
  flex?: boolean;
}

export const Spacer = ({
  safeTop,
  safeBottom,
  size = 0,
  flex,
  uiTop,
  uiBottom,
  uiLeft,
  uiRight,
  ...props
}: SpacerProps) => {
  const safeInsets = useSafeAreaInsets();
  const screen = useRef(nav.getCurrentRoute()?.name || '');
  let width = 0;
  if (!uiTop && safeTop) width += safeInsets.top;
  if (!uiTop && safeBottom) width += safeInsets.bottom;

  if (typeof size === 'number') width += size;

  return (
    <View
      pointerEvents="none"
      {...props}
      style={[flex ? {flex: 1, borderWidth: 10} : null, props.style]}>
      <View pointerEvents="none" style={[{width, aspectRatio: 1}]} />
      {uiTop ? (
        <Animated.View
          pointerEvents="none"
          style={{width: UIElementSpacing.top[screen.current], aspectRatio: 1}}
        />
      ) : null}
      {uiBottom ? (
        <Animated.View
          pointerEvents="none"
          style={{
            width: UIElementSpacing.bottom[screen.current],
            aspectRatio: 1,
          }}
        />
      ) : null}
      {uiLeft ? (
        <Animated.View
          pointerEvents="none"
          style={{width: UIElementSpacing.left[screen.current], aspectRatio: 1}}
        />
      ) : null}
      {uiRight ? (
        <Animated.View
          pointerEvents="none"
          style={{
            width: UIElementSpacing.right[screen.current],
            aspectRatio: 1,
          }}
        />
      ) : null}
    </View>
  );
};
