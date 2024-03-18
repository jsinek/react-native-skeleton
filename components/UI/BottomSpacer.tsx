import React from 'react';
import {Dimensions,View} from 'react-native';
import {useUIBottomLayout} from '@jsinek/react-native-skeleton/context/UI';
export const screenDimensions = Dimensions.get('screen');

export const UIBottomSpacer = () => {
  const layout = useUIBottomLayout();
  const style = { height: layout.height, width: 0 };
  return <View style={style} />;
};