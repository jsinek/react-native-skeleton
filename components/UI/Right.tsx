import React from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import { UIHelper, useUIRight} from '@jsinek/react-native-skeleton/context/UI';
import { getScreenConfig } from '@jsinek/react-native-skeleton/navigation/screen';
export const screenDimensions = Dimensions.get('screen');

export const RightUI = () => {
  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const screen = getScreenConfig();
    if(screen?.name){
      UIHelper.setRightLayout(screen?.name, layout);
    }
  }

  return <View style={styles.wrapper} onLayout={onLayout}>{useUIRight()}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: screenDimensions.height,
  },
});
