import React from 'react';
import {View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { UITopSpacer } from '@jsinek/react-native-skeleton/components/UI/TopSpacer';
import { UIBottomSpacer } from '@jsinek/react-native-skeleton/components/UI/BottomSpacer';
import { UILeftSpacer } from '@jsinek/react-native-skeleton/components/UI/LeftSpacer';
import { UIRightSpacer } from '@jsinek/react-native-skeleton/components/UI/RightSpacer';

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
        <UITopSpacer />
      ) : null}
      {uiBottom ? (
        <UIBottomSpacer />
      ) : null}
      {uiLeft ? (
        <UILeftSpacer />
      ) : null}
      {uiRight ? (
        <UIRightSpacer />
      ) : null}
    </View>
  );
};
