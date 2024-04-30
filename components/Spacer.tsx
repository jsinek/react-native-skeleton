import { UISpacer } from './UI/UISpacer';
import { UIPosition } from '../types/ui';
import React from 'react';
import {View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
        <UISpacer edge={UIPosition.TOP} />
      ) : null}
      {uiBottom ? (
        <UISpacer edge={UIPosition.BOTTOM} />
      ) : null}
      {uiLeft ? (
        <UISpacer edge={UIPosition.LEFT} />
      ) : null}
      {uiRight ? (
        <UISpacer edge={UIPosition.RIGHT} />
      ) : null}
    </View>
  );
};
