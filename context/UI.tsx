import React, {Dispatch, useState, SetStateAction, useContext} from 'react';
import {Animated} from 'react-native';
import {AnimatedValue} from '../types/animated';

type UIElement = React.ReactNode | null;

export type UIElements = {
  top?: UIElement;
  bottom?: UIElement;
  left?: UIElement;
  right?: UIElement;
};

export type UISpacingMap = {[key: string]: AnimatedValue};
export enum UIAnchor {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export const UIElementSpacing: {
  top: UISpacingMap;
  bottom: UISpacingMap;
  left: UISpacingMap;
  right: UISpacingMap;
  setValue: (screen: string, uiAnchor: UIAnchor, value: number) => void;
  registerScreen: (screen: string) => void;
} = {
  top: {},
  bottom: {},
  left: {},
  right: {},
  setValue: (screen: string, uiAnchor: UIAnchor, value: number) => {
    UIElementSpacing[uiAnchor][screen].setValue(value);
  },
  registerScreen: (screen: string) => {
    UIElementSpacing.top[screen] = new Animated.Value(0);
    UIElementSpacing.left[screen] = new Animated.Value(0);
    UIElementSpacing.bottom[screen] = new Animated.Value(0);
    UIElementSpacing.right[screen] = new Animated.Value(0);
  },
};

export const UIContext = React.createContext<UIElements | null>(null);

export const UIContextManipulator: {
  setElements: Dispatch<SetStateAction<UIElements>>;
} = {
  setElements: () => {},
};

export const UIProvider = ({
  defaultElements,
  children,
}: {
  defaultElements?: Partial<UIElements>;
  children: React.ReactNode;
}) => {
  const [elements, setElements] = useState<UIElements>({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });

  UIContextManipulator.setElements = setElements;

  const value = {
    top: elements.top || defaultElements?.top,
    bottom: elements.bottom || defaultElements?.bottom,
    left: elements.left || defaultElements?.left,
    right: elements.right || defaultElements?.right,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
  return useContext(UIContext);
};
