import {useEffect} from 'react';

export const onComponentMount = (callback: () => void | (() => void)) =>
  useEffect(() => callback?.(), []);

export const onComponentUnmount = (callback: () => void) =>
  useEffect(() => () => callback?.(), []);
