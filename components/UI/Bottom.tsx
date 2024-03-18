import React from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {UIHelper, useUIBottom} from '@jsinek/react-native-skeleton/context/UI';
import { getScreenConfig } from '@jsinek/react-native-skeleton/navigation/screen';
export const screenDimensions = Dimensions.get('screen');

export const BottomUI = () => {
  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const screen = getScreenConfig();
    if(screen?.name){
      UIHelper.setBottomLayout(screen?.name, layout);
    }
  }

  return <View style={styles.wrapper} onLayout={onLayout}>{useUIBottom()}</View>;
};


const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
