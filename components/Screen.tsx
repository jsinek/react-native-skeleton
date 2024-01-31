import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {nav} from '../navigation/nav';
import {useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/events';
import {
  UIElements,
  UIContextManipulator,
  UIElementSpacing,
  UIAnchor,
} from '../context/UI';
export const screenDimensions = Dimensions.get('screen');

export interface ScreenProps extends ScrollViewProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onBeforeRemove?: (event: BeforeRemoveEvent) => Promise<void>;
  uiElements?: UIElements;
  uiSpacing?: boolean;
  background?: React.ReactNode;
}

export const Screen = ({
  onFocus,
  onBlur,
  onBeforeRemove,
  uiElements,
  uiSpacing = true,
  ...props
}: ScreenProps) => {
  const screenConfig = useScreenConfig();
  const navigation = useNavigation();
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;

  const setUiElements = () => {
    if (uiElements) {
      for (const key in uiElements) {
        const anchor = key as UIAnchor;
        if (!uiElements[anchor]) {
          uiElements[anchor] = <></>;
        }
      }
    }

    UIContextManipulator?.setElements({...uiElements});
  };

  useEffect(() => {
    setUiElements();
  }, [uiElements]);

  const focus = () => {
    setUiElements();

    if (screenConfig?.modal) {
      navigation.setOptions({headerShown: false});
    } else {
      navigation.setOptions({headerMode: 'float'});
    }
    onFocus?.();
  };

  const blur = () => {
    if (!screenConfig?.modal) {
      navigation.setOptions({headerMode: 'screen'});
    }
    onBlur?.();
  };

  const beforeRemove = (e: BeforeRemoveEvent) => {
    if (onBeforeRemove) {
      e.preventDefault();
      onBeforeRemove?.(e).then(() => {
        nav.dispatch(e.data.action);
      });
    }
  };

  onComponentMount(() => {
    addListener('focus', focus);
    addListener('blur', blur);
    addListener('beforeRemove', beforeRemove);

    return () => {
      removeListener('focus', focus);
      removeListener('blur', blur);
      removeListener('beforeRemove', beforeRemove);
    };
  });

  const uiSpacingStyles =
    uiSpacing && screenConfig
      ? {
          marginTop: UIElementSpacing.top[screenConfig.name],
          marginLeft: UIElementSpacing.left[screenConfig.name],
          marginBottom: UIElementSpacing.bottom[screenConfig.name],
          marginRight: UIElementSpacing.right[screenConfig.name],
        }
      : null;

  return (
    <Animated.View style={[{flex: 1, borderWidth: 1}, uiSpacingStyles]}>
      <Component
        importantForAccessibility="no"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props}
        style={[styles.flex, props.style]}
        contentContainerStyle={[styles.flexGrow, props.contentContainerStyle]}>
        {props.children}
      </Component>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
