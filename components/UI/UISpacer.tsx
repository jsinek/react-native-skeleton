import React from 'react';
import {Animated, Dimensions, ViewProps} from 'react-native';
import {UIContext} from '../../context/UI';
import {UIPosition} from '../../types/ui';
export const screenDimensions = Dimensions.get('screen');

export interface UISpacerProps extends ViewProps {
  edge: UIPosition;
};

export const UISpacer = ({edge, ...rest}: UISpacerProps) => {
  
  const style = ['top', 'bottom'].includes(edge) ? {
    height: UIContext.layout[edge].height,
    width: 0,
  } : {
    height: 0,
    width: UIContext.layout[edge].width,
  };

  return <Animated.View {...rest} style={[style, rest.style]} />;
};