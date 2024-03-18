import React from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {UIHelper, useUILeft} from '@jsinek/react-native-skeleton/context/UI';
import { getScreenConfig } from '@jsinek/react-native-skeleton/navigation/screen';
export const screenDimensions = Dimensions.get('screen');

export const LeftUI = () => {
  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const screen = getScreenConfig();
    if(screen?.name){
      UIHelper.setLeftLayout(screen?.name, layout);
    }
  }

  return <View style={styles.wrapper} onLayout={onLayout}>{useUILeft()}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    height: screenDimensions.height,
    left: 0,
    top: 0,
  },
});
