import React from 'react'
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'
import { useUIElements } from '../../context/UI'
import { getScreenConfig } from '../../navigation/screen'
import { UIPosition } from '../../types/ui'
import { edgeSpace } from '@jsinek/react-native-skeleton/components/App'
export const screenDimensions = Dimensions.get('window')

export interface UIElementProps extends ViewProps {
  edge: UIPosition
}

export const UIElement = ({ edge, ...rest }: UIElementProps) => {
  const onLayout = (e: LayoutChangeEvent) => {
    const screen = getScreenConfig()
    const layout = e.nativeEvent.layout;
    const edges = edgeSpace[screen?.name || ''];
   
    if (edges && !screen?.modal) {
      edges[edge].height.setValue(layout.height);
      edges[edge].width.setValue(layout.width);
    }

    rest.onLayout?.(e)
  }

  return (
    <View {...rest} style={[styles[edge], rest.style]} onLayout={onLayout}>
      {useUIElements()[edge]}
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    bottom: -screenDimensions.height,
    left: 0,
    top: 0,
  },
  right: {
    position: 'absolute',
    bottom: -screenDimensions.height,
    top: 0,
    right: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: -screenDimensions.height,
    left: 0,
    right: 0,
  },
})
