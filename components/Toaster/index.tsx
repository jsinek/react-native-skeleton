import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from 'react-native';
import {AnimatedValue} from '../../types/animated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Toast, ToastColors, ToastProps} from './Toast';

const toaster: {
  id: number;
  getId: () => string;
  toasts: ToastProps[];
  setToasts: Dispatch<SetStateAction<ToastProps[]>>;
} = {
  id: 0,
  getId() {
    this.id++;
    return `toast-${this.id}`;
  },
  toasts: [],
  setToasts: () => {},
};

export const toast = {
  success: (message: string) => {
    toaster.setToasts([
      ...toaster.toasts,
      {
        id: toaster.getId(),
        type: 'success',
        message,
      },
    ]);
  },
  warning: (message: string) => {
    toaster.setToasts([
      ...toaster.toasts,
      {
        id: toaster.getId(),
        type: 'warning',
        message,
      },
    ]);
  },
  error: (message: string) => {
    toaster.setToasts([
      ...toaster.toasts,
      {
        id: toaster.getId(),
        type: 'error',
        message,
      },
    ]);
  },
  message: (message: string) => {
    toaster.setToasts([
      ...toaster.toasts,
      {
        id: toaster.getId(),
        type: 'message',
        message,
      },
    ]);
  },
};

export const Toaster = ({
  colors,
  renderToast,
  offset = 80,
}: {
  offset?: number;
  colors?: ToastColors;
  renderToast?: (toast: ToastProps) => React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  toaster.toasts = toasts;
  toaster.setToasts = setToasts;

  const removeToast = (id: string) => {
    toaster.setToasts(toaster.toasts.filter(toast => toast.id !== id));
  };

  return (
    <View style={styles.toaster}>
      {toasts.map(data => (
        <Spring
          offset={offset}
          key={data.id}
          onAnimationEnd={() => removeToast(data.id)}>
          {renderToast?.(data) || <Toast {...data} colors={colors} />}
        </Spring>
      ))}
    </View>
  );
};

export const Spring = ({
  duration = 4000,
  children,
  onAnimationEnd,
  offset = 0,
}: {
  offset?: number;
  duration?: number;
  children: React.ReactNode;
  onAnimationEnd: () => void;
}) => {
  const safeInsets = useSafeAreaInsets();
  const init = useRef(false);
  const [height] = useState<AnimatedValue>(new Animated.Value(0));
  const [animation] = useState<AnimatedValue>(new Animated.Value(0));

  const onLayout = (e: LayoutChangeEvent) => {
    if (!init.current) {
      init.current = true;
      Animated.timing(height, {
        toValue: e.nativeEvent.layout.height,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.cubic),
      }).start();

      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start(onAnimationEnd);
    }
  };

  return (
    <Animated.View style={{marginTop: height}}>
      <Animated.View
        style={[
          styles.toastWrapper,
          {
            bottom: safeInsets.bottom + offset,
            opacity: animation.interpolate({
              inputRange: [0, 0.1, 0.99, 1],
              outputRange: [0, 1, 1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 0.1, 0.99, 1],
                  outputRange: [0.8, 1, 1, 0.8],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        onLayout={onLayout}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toaster: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    zIndex: 9999,
  },
  toastWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: 4,
  },
});
