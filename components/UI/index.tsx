import React from 'react';
import {Dimensions} from 'react-native';
export const screenDimensions = Dimensions.get('screen');
import { UIPosition } from '../../types/ui';
import { UIElement } from './UIElement';

export interface UIProps {
  hide?: boolean;
}

export const UI = ({ hide = false }: UIProps) =>
  hide ?
    <></>
  :
    <>
      <UIElement edge={UIPosition.TOP} />
      <UIElement edge={UIPosition.LEFT} />
      <UIElement edge={UIPosition.RIGHT} />
      <UIElement edge={UIPosition.BOTTOM} />
    </>
;