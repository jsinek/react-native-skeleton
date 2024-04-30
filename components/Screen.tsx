import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {nav} from '../navigation/nav';
import {getScreenConfig, useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/events';
import {UIContext} from '../context/UI';
import {UI} from './UI';
import {UIElements} from '../types/ui';
export const screenDimensions = Dimensions.get('screen');

export interface ScreenProps extends ScrollViewProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onBeforeRemove?: (event: BeforeRemoveEvent) => Promise<void>;
  uiElements?: UIElements;
}

export const Screen = ({
  onFocus,
  onBlur,
  onBeforeRemove,
  uiElements,
  ...props
}: ScreenProps) => {
  const screenConfig = useScreenConfig();
  const navigation = useNavigation();
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;

  const focus = () => {
    UIContext.setElements(uiElements);

    if (!screenConfig?.modal) { 
      navigation.setOptions({
        header: () => <UI hide={!!screenConfig?.modal} />,
      });
    }

    onFocus?.();  
  };

  const blur = () => {
    const currentRouteScreenConfig = getScreenConfig();

    if (currentRouteScreenConfig?.modal) {
      navigation.setOptions({headerMode: 'screen'});
    } else {
      navigation.setOptions({header: () => <UI hide={true} />});
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

  const wrapperStyle = screenConfig?.modal ? {} : {
    marginTop: UIContext.layout.top.height,
    marginLeft: UIContext.layout.left.width,
    marginBottom: UIContext.layout.bottom.height,
    marginRight: UIContext.layout.right.width,
  };

  return (
    <Animated.View style={[styles.flex, wrapperStyle]}>
      <Component
        importantForAccessibility="no"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props}
        style={[styles.flex, props.style]}
        contentContainerStyle={[styles.flexGrow, props.contentContainerStyle]}
      >
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
});
