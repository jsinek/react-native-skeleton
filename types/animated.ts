import {Animated} from 'react-native';

export interface AnimatedValue extends Animated.Value {
  _value?: number;
}
