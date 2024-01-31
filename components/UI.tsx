import React from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {nav} from '../navigation/nav';
import {UIAnchor, UIContext, UIElementSpacing} from '../context/UI';
export const screenDimensions = Dimensions.get('screen');

export interface UIProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const UI = () => {
  const safeFrame = useSafeAreaFrame();
  const safeInsets = useSafeAreaInsets();

  const onlayout = (anchor: UIAnchor, event: LayoutChangeEvent) => {
    const screen = nav.getCurrentRoute()?.name || '';
    const layout = event.nativeEvent.layout;

    const size =
      (anchor === UIAnchor.LEFT || anchor === UIAnchor.RIGHT
        ? layout.width
        : layout.height) - (safeInsets[anchor] || 0);
    UIElementSpacing.setValue(screen, anchor, size);
  };

  return (
    <UIContext.Consumer>
      {context => (
        <>
          {!!context?.top && context?.top}

          {!!context?.left && (
            <View
              style={styles.leftSidebarWrapper}
              onLayout={event => onlayout(UIAnchor.LEFT, event)}>
              {context?.left}
            </View>
          )}

          {!!context?.right && (
            <View
              style={styles.rightSidebarWrapper}
              onLayout={event => onlayout(UIAnchor.RIGHT, event)}>
              {context?.right}
            </View>
          )}

          {!!context?.bottom && (
            <View style={[styles.footerAnchor, {top: safeFrame.height}]}>
              <View
                style={styles.footerWrapper}
                onLayout={event => onlayout(UIAnchor.BOTTOM, event)}>
                {context?.bottom}
              </View>
            </View>
          )}
        </>
      )}
    </UIContext.Consumer>
  );
};

const styles = StyleSheet.create({
  leftSidebarWrapper: {
    position: 'absolute',
    height: screenDimensions.height,
    left: 0,
    top: 0,
  },
  rightSidebarWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: screenDimensions.height,
  },
  footerAnchor: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
