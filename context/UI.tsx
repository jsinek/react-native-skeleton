import React, {useState, useContext} from 'react';
import {Animated} from 'react-native';
import {AnimatedValue} from '../types/animated';

type UIElement = React.ReactNode | null;

export type UIElements = {
  top?: UIElement;
  bottom?: UIElement;
  left?: UIElement;
  right?: UIElement;
};

export type UISpacingMap = { [key: string]: AnimatedValue; };
export enum UIAnchor {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export const UIElementSpacing: {
  top: AnimatedValue;
  bottom: AnimatedValue;
  left: AnimatedValue;
  right: AnimatedValue;
  setValue: (uiAnchor: UIAnchor, value: number) => void;
} = {
  top: new Animated.Value(0),
  bottom: new Animated.Value(0),
  left: new Animated.Value(0),
  right: new Animated.Value(0),
  setValue: (uiAnchor: UIAnchor, value: number) => {
    UIElementSpacing[uiAnchor].setValue(value);
  },
};

export const UIContext = React.createContext<UIElements | null>(null);

export const UIContextManipulator: {
  setElements: (uiElements?: UIElements) => void;
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

  const setUiElements = (uiElements: UIElements = {}) => {
    const preparedElements = { ...uiElements }
    
    for (const key in preparedElements) {
      const anchor = key as UIAnchor;
      if (!preparedElements[anchor]) {
        preparedElements[anchor] = <></>;
      }
    }

    setElements(preparedElements);
  };

  UIContextManipulator.setElements = setUiElements;

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
