import React from 'react';
import {Dimensions,View} from 'react-native';
import {useUILeftLayout} from '@jsinek/react-native-skeleton/context/UI';
export const screenDimensions = Dimensions.get('screen');

export const UILeftSpacer = () => {
  const layout = useUILeftLayout();
  const style = { width: layout.height, height: 0, borderWidth: 10, };
  return <View style={style} />;
};