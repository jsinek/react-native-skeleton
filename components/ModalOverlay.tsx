import React, {useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {ScreenProps} from './Screen';
import {onComponentMount} from '../hooks';

export interface ModalOverlay extends ScreenProps {
  color?: string;
}

export const ModalOverlay = ({color = 'rgba(0,0,0,0.5)'}) => {
  const [opacity] = useState(new Animated.Value(0));

  onComponentMount(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, {opacity, backgroundColor: color}]}
    />
  );
};
