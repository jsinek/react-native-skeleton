import React, {useContext, useState} from 'react';
import {Animated,ViewProps, LayoutRectangle} from 'react-native';
import { AnimatedValue } from '../types/animated';

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

const defaultLayout = {width: 0, height: 0, x: 0, y: 0};

export const UIHelper: {
  setTop: (uiElement: UIElement) => void;
  setBottom: (uiElement: UIElement) => void;
  setLeft: (uiElement: UIElement) => void;
  setRight: (uiElement: UIElement) => void;
  setTopLayout: (screen: string, layout: LayoutRectangle) => void;
  setBottomLayout: (screen: string, layout: LayoutRectangle) => void;
  setLeftLayout: (screen: string, layout: LayoutRectangle) => void;
  setRightLayout: (screen: string, layout: LayoutRectangle) => void;
} = {
  setTop: () => {},
  setBottom: () => {},
  setLeft: () => {},
  setRight: () => { },
  setTopLayout: () => { },
  setBottomLayout: () => { },
  setLeftLayout: () => { },
  setRightLayout: () => { },
};

export const UIContext = {
  top: React.createContext<UIElement>(null),
  bottom: React.createContext<UIElement>(null),
  left: React.createContext<UIElement>(null),
  right: React.createContext<UIElement>(null),
  topLayout: React.createContext<LayoutRectangle>(defaultLayout),
  bottomLayout: React.createContext<LayoutRectangle>(defaultLayout),
  leftLayout: React.createContext<LayoutRectangle>(defaultLayout),
  rightLayout: React.createContext<LayoutRectangle>(defaultLayout),
};

export const UIElementLayouts:{[key: string]: LayoutRectangle} = {};

export const UIContextProvider = ({
  defaultElements,
  children,
}: {
  defaultElements?: Partial<UIElements>;
  children: ViewProps['children'];
  }) => {
  const [top, setTop] = useState<UIElement>(null);
  const [bottom, setBottom] = useState<UIElement>(null);
  const [left, setLeft] = useState<UIElement>(null);
  const [right, setRight] = useState<UIElement>(null);
  const [topLayout, setTopLayout] = useState<LayoutRectangle>(defaultLayout);
  const [bottomLayout, setBottomLayout] = useState<LayoutRectangle>(defaultLayout);
  const [leftLayout, setLeftLayout] = useState<LayoutRectangle>(defaultLayout);
  const [rightLayout, setRightLayout] = useState<LayoutRectangle>(defaultLayout);
  
  UIHelper.setTop = (layout) => {
    setTop(layout === undefined ? defaultElements?.top : layout);
  };
  UIHelper.setBottom = (layout) => {
    setBottom(layout === undefined ? defaultElements?.bottom : layout);
  };
  UIHelper.setLeft = (layout) => {
    console.log('SET LEFT', layout, layout === undefined ? 'A' : 'B');
    setLeft(layout === undefined ? defaultElements?.left : layout);
  };
  UIHelper.setRight = (layout) => {
    setRight(layout === undefined ? defaultElements?.right : layout);
  };
  UIHelper.setTopLayout = (screen, layout) => {
    UIElementLayouts[screen] = layout;  
    setTopLayout(layout);
  };
  UIHelper.setBottomLayout = (screen, layout) => {
    UIElementLayouts[screen] = layout;  
    setBottomLayout(layout);
  };
  UIHelper.setLeftLayout = (screen, layout) => {
    UIElementLayouts[screen] = layout;  
    setLeftLayout(layout);
  };
  UIHelper.setRightLayout = (screen, layout) => {
    UIElementLayouts[screen] = layout;  
    setRightLayout(layout);
  };
  
  return (
    <UIContext.top.Provider value={top}>
      <UIContext.bottom.Provider value={bottom}>
        <UIContext.left.Provider value={left}>
          <UIContext.right.Provider value={right}>
            <UIContext.topLayout.Provider value={topLayout}>
              <UIContext.bottomLayout.Provider value={bottomLayout}>
                <UIContext.leftLayout.Provider value={leftLayout}>
                  <UIContext.rightLayout.Provider value={rightLayout}>
                    {children}
                  </UIContext.rightLayout.Provider>
                </UIContext.leftLayout.Provider>
              </UIContext.bottomLayout.Provider>
            </UIContext.topLayout.Provider>
          </UIContext.right.Provider>
        </UIContext.left.Provider>
      </UIContext.bottom.Provider>
    </UIContext.top.Provider>
  );
};


export const useUITop = () => useContext(UIContext.top);
export const useUIBottom = () => useContext(UIContext.bottom);
export const useUILeft = () => useContext(UIContext.left);
export const useUIRight = () => useContext(UIContext.right);
export const useUITopLayout = () => useContext(UIContext.topLayout);
export const useUIBottomLayout = () => useContext(UIContext.bottomLayout);
export const useUILeftLayout = () => useContext(UIContext.leftLayout);
export const useUIRightLayout = () => useContext(UIContext.rightLayout);
