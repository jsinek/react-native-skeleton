import React from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View, ViewProps} from 'react-native';
import {UIContext, useUIElements} from '../../context/UI';
import { getScreenConfig } from '../../navigation/screen';
import { UIPosition } from '../../types/ui';
export const screenDimensions = Dimensions.get('screen');

export interface UIElementProps extends ViewProps {
  edge: UIPosition;
}

export const UIElement = ({ edge, ...rest }: UIElementProps) => {
  const onLayout = (e: LayoutChangeEvent) => {
    const screen = getScreenConfig();
    if (screen?.name) {
      UIContext.layout[edge].height.setValue(e.nativeEvent.layout.height);
      UIContext.layout[edge].width.setValue(e.nativeEvent.layout.width);
    }
    rest.onLayout?.(e);
  }

  return <View {...rest} style={[styles[edge], rest.style]} onLayout={onLayout}>{useUIElements()[edge]}</View>;
};

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
  },
  right: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
