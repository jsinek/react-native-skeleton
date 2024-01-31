import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
} from '@react-navigation/stack';

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
};
