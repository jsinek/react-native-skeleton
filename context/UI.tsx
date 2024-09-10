import { UIElements } from '../types/ui';
import React, {useContext, useState} from 'react';
import {ViewProps} from 'react-native';

export const UIContext = {
  elements: React.createContext<UIElements>({}),
  setElements: (_elements: Partial<UIElements> | undefined) => { },
};

export const UIContextProvider = ({
  defaultElements,
  children,
}: {
  defaultElements?: Partial<UIElements>;
  children: ViewProps['children'];
  }) => {
  
  const [elements, setElements] = useState<UIElements>(defaultElements || {
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  });
  
  UIContext.setElements = (newElements = {}) => { 
    setElements({
      top: newElements.top === undefined ? defaultElements?.top : newElements.top,
      left: newElements.left === undefined ? defaultElements?.left : newElements.left,
      right: newElements.right === undefined ? defaultElements?.right : newElements.right,
      bottom: newElements.bottom === undefined ? defaultElements?.bottom : newElements.bottom,
    });
  }
  
  return (
    <UIContext.elements.Provider value={elements}>
      {children}
    </UIContext.elements.Provider>
  );
};

export const useUIElements = () => useContext(UIContext.elements);