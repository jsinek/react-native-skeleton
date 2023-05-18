import {AnimatedValue} from '../types/animated';
import {Dimensions} from 'react-native';
import {Transition} from '../types/skeleton';

export const transition: {[key: string]: Transition} = {
  none: () => {
    return {};
  },

  slideLeft: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateX: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [dimensions.width, 0, -dimensions.width],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  slideAndRotateLeft: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateX: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [dimensions.width, 0, -dimensions.width],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['5deg', '0deg', '-5deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  slideRight: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateX: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [-dimensions.width, 0, dimensions.width],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  slideAndRotateRight: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateX: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [-dimensions.width, 0, dimensions.width],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['-5deg', '0deg', '5deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  slideUp: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateY: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [dimensions.height, 0, -dimensions.height],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  slideDown: (transition: AnimatedValue) => {
    const dimensions = Dimensions.get('screen');
    return {
      transform: [
        {
          translateY: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [dimensions.height, 0, -dimensions.height],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  fadeIn: (transition: AnimatedValue) => {
    return {
      opacity: transition.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
    };
  },

  scaleUp: (transition: AnimatedValue) => {
    return {
      opacity: transition.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          scale: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },

  flipHorizontal: (transition: AnimatedValue) => {
    return {
      opacity: transition.interpolate({
        inputRange: [0, 1, 1.00001, 2],
        outputRange: [0, 1, 0, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          rotateY: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['-180deg', '0deg', '180deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  },
};
