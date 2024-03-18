import React from 'react';
import {Dimensions,View} from 'react-native';
import {useUIRightLayout} from '@jsinek/react-native-skeleton/context/UI';
export const screenDimensions = Dimensions.get('screen');

export const UIRightSpacer = () => {
  const layout = useUIRightLayout();
  const style = { width: layout.height, height: 0 };
  return <View style={style} />;
};