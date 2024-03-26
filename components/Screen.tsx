import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ViewProps,
} from 'react-native';
import {onComponentMount} from '../hooks';
import {nav} from '../navigation/nav';
import {getScreenConfig, useScreenConfig} from '../navigation/screen';
import {BeforeRemoveEvent} from '../types/events';
import {UIElements, useUILeftLayout, useUIRightLayout, useUITopLayout, useUIBottomLayout, UIHelper} from '../context/UI';
import { UI } from '@jsinek/react-native-skeleton/components/UI';
export const screenDimensions = Dimensions.get('screen');

export interface ScreenProps extends ScrollViewProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onBeforeRemove?: (event: BeforeRemoveEvent) => Promise<void>;
  uiElements?: UIElements;
  hideUIElements?: boolean;
  uiSpacing?: boolean;
  background?: React.ReactNode;
}

export const Screen = ({
  onFocus,
  onBlur,
  onBeforeRemove,
  uiElements,
  hideUIElements = false,
  uiSpacing = true,
  ...props
}: ScreenProps) => {
  const screenConfig = useScreenConfig();
  const navigation = useNavigation();
  const {addListener, removeListener} = useNavigation();
  const Component = props.scrollEnabled === false ? View : ScrollView;

  const focus = () => {
    UIHelper.setTop(uiElements?.top);
    UIHelper.setLeft(uiElements?.left);
    UIHelper.setRight(uiElements?.right);
    UIHelper.setBottom(uiElements?.bottom);

    if (screenConfig?.modal) { 
      navigation.setOptions({headerMode: 'screen'});
    } else {
      navigation.setOptions({
        header: () => <UI hide={!!screenConfig?.modal} />,
      });
      setTimeout(() => {
        navigation.setOptions({ headerMode: 'float' });
      }, 160);
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

  return (
    <ScreenWrapper isModal={screenConfig?.modal}>
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
    </ScreenWrapper>
  );
};

interface ScreenWrapperProps extends ViewProps { 
  isModal?: boolean;
}

const ScreenWrapper = ({ isModal = false,...rest }: ScreenWrapperProps) => {
  const layouts = {
    top: useUITopLayout(),
    left: useUILeftLayout(),
    right: useUIRightLayout(),
    bottom: useUIBottomLayout(),
  };

  const style = isModal ? {} : {
    marginTop: layouts.top.height,
    marginLeft: layouts.left.width,
    marginBottom: layouts.bottom.height,
    marginRight: layouts.right.width,
  };
  
  return <View {...rest} style={[styles.flex, style, rest.style]} />
}

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
