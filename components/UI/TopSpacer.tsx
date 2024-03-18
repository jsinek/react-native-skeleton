import React from 'react';
import {Dimensions,View} from 'react-native';
import {useUITopLayout} from '@jsinek/react-native-skeleton/context/UI';
export const screenDimensions = Dimensions.get('screen');

export const UITopSpacer = () => {
  const layout = useUITopLayout();
  const style = { height: layout.height, width: 0 };
  return <View style={style} />;
};