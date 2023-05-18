import {useLayoutEffect} from 'react';

export const onComponentMount = (callback: () => void | (() => void)) =>
  useLayoutEffect(() => callback?.(), []);

export const onComponentUnmount = (callback: () => void) =>
  useLayoutEffect(() => () => callback?.(), []);
