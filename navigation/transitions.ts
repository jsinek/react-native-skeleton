import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import { Animated } from 'react-native';
import conditional from '@react-navigation/stack/src/utils/conditional';
const { multiply } = Animated;

export const transitions = {
  none: () => {
    return {
      cardStyle: {},
    };
  },
  slideLeft: ({
    current,
    next,
    layouts: {screen},
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          // Translation for the animation of the current card
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.width, 0],
              extrapolate: 'clamp',
            }),
          },
          // Translation for the animation of the card on top of this
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -screen.width],
                  extrapolate: 'clamp',
                })
              : 0,
          },
        ],
      },
    };
  },
  slideLeftRotate: ({
    current,
    next,
    layouts: {screen},
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          // Translation for the animation of the current card
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.width, 0],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.75, 1],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['5deg', '0deg'],
              extrapolate: 'clamp',
            }),
          },
          // Translation for the animation of the card on top of this
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -screen.width],
                  extrapolate: 'clamp',
                })
              : 0,
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.75],
                  extrapolate: 'clamp',
                })
              : 1,
          },
          {
            rotate: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-5deg'],
                  extrapolate: 'clamp',
                })
              : '0deg',
          },
        ],
      },
    };
  },

  slideRightRotate: ({
    current,
    next,
    layouts: {screen},
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          // Translation for the animation of the current card
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-screen.width, 0],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.75, 1],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['-5deg', '0deg'],
              extrapolate: 'clamp',
            }),
          },
          // Translation for the animation of the card on top of this
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, screen.width],
                  extrapolate: 'clamp',
                })
              : 0,
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.75],
                  extrapolate: 'clamp',
                })
              : 1,
          },
          {
            rotate: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '5deg'],
                  extrapolate: 'clamp',
                })
              : '0deg',
          },
        ],
      },
    };
  },
  fade: CardStyleInterpolators.forFadeFromCenter,
  scaleFromCenter: CardStyleInterpolators.forScaleFromCenterAndroid,
  slideUp: CardStyleInterpolators.forBottomSheetAndroid,
  slideDown: ({
    current,
    closing,
    inverted,
    layouts: {screen},
  }: StackCardInterpolationProps) => {
    const translateY = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-screen.height * 0.8, 0],
      extrapolate: 'clamp',
    }),
    inverted,
    );
    
  const opacity = conditional(
    closing,
    current.progress,
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
  );

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      opacity,
      transform: [{ translateY }],
    },
    overlayStyle: { opacity: overlayOpacity },
  };
  },
};
