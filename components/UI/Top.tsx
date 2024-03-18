import React from 'react';
import {Dimensions, LayoutChangeEvent, View} from 'react-native';
import { UIHelper, useUITop} from '@jsinek/react-native-skeleton/context/UI';
import { getScreenConfig } from '@jsinek/react-native-skeleton/navigation/screen';
export const screenDimensions = Dimensions.get('screen');;

export const TopUI = () => {
  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const screen = getScreenConfig();
    if(screen?.name){
      UIHelper.setTopLayout(screen?.name, layout);
    }
  }

  return <View onLayout={onLayout}>{useUITop()}</View>;
};
