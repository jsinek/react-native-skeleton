import React from 'react';
import {Dimensions} from 'react-native';
export const screenDimensions = Dimensions.get('screen');
import { TopUI } from './Top';
import { LeftUI } from './Left';
import { RightUI } from './Right';
import { BottomUI } from './Bottom';

export interface UIProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const UI = ({ hide = false }: { hide?: boolean; }) => {
  if (hide) return <></>;

  return (
    <>
      <TopUI />
      <LeftUI />
      <RightUI />
      <BottomUI />
    </>
  );
};