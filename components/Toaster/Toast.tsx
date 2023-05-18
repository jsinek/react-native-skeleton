import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'message';
export type ToastColors = {
  success: {background: string; text: string};
  warning: {background: string; text: string};
  error: {background: string; text: string};
  message: {background: string; text: string};
};
export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  colors?: ToastColors;
}

export const Toast = ({
  type,
  message,
  colors = {
    success: {background: '#417505', text: '#FFFFFF'},
    warning: {background: '#F5A623', text: '#FFFFFF'},
    error: {background: '#D0021B', text: '#FFFFFF'},
    message: {background: '#0063B4', text: '#FFFFFF'},
  },
}: ToastProps) => {
  const color = colors[type].text;
  const backgroundColor = colors[type].background;

  return (
    <Animated.View style={[styles.toast, {backgroundColor}]}>
      <Text style={{color}}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10,
  },
});
