export enum UIPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
};

export type UIElement = React.ReactNode | null;

export type UIElements = {
  top?: UIElement;
  bottom?: UIElement;
  left?: UIElement;
  right?: UIElement; 
};