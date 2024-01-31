## Introduction

This package provides a base structure and supplemental utilities allowing for the creation of a flexible, customizeable, and powerful UI.

Through an App wrapper and Screen component, it simplifies navigation and brings control of UI components like the Header and Footer/TabBar to screen level allowing for easier customization and more organized/readable code.

Additionally, you can utilize the Screen component to remove complexity surrounding modals for easy and fully customizable popups, drawers, etc. Customize the optional built in toast messages. Use different screen transitions on the fly. Easily create custom screen transitions.

---

## Installation

```
yarn add jsinek/react-native-skeleton
```

###### Install dependencies

```
yarn add @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens
```

#### iOS specific instructions

```
cd ios && pod install
```

<br />

---

## <a id="components" href="#components">Components</a>

### <a id="app-component" href="#app-component">\<App /></a>

The base component of the app. This component is required and should be at the root of the app. It handles initializing many key features including navigation.

#### Props

| Prop                       | Type                                               | Default           | Required   | Description                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------- | ----------------- | ---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `screens`                  | <a href="#screen-config-type">`ScreenConfig[]`</a> |                   | `required` | A registry of navigable screens.                                                                                                                                                       |
| `initialScreenName`        | `string`                                           |                   | `optional` | The name of the initial screen to display.                                                                                                                                             |
| `uiElements`               | <a href="#ui-elements-type">`UIElements`</a>       |                   | `optional` | UI layer components that display at are anchored to the screen edges. These components are unaffected by navigation transitions.                                                       |
| `modalOverlayColor`        | `color`                                            | `rgba(0,0,0,0.5)` | `optional` | Sets the backdrop color of modals.                                                                                                                                                     |
| `navigationContainerProps` | `string`                                           |                   | `optional` | Overrides base settings of the navigation container. Visit the <a href="https://reactnavigation.org/docs/stack-navigator#props" target="_blank">react-navigation docs</a> for details. |

#### Types

| Type                                                                     | Definition                                                                                                                                                        |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="screen-config-type" href="#screen-config-type">`ScreenConfig`</a> | {<br />&nbsp;&nbsp;name: `color`;<br />&nbsp;&nbsp;component: `Component`;<br />&nbsp;&nbsp;transition?: `Transition`;<br />&nbsp;&nbsp;modal?: `boolean`;<br />} |
| <a id="ui-elements-type" href="#ui-elements-type">`UiElements`</a>       | {<br />&nbsp;&nbsp;top?: `ReactNode`;<br />&nbsp;&nbsp;bottom?: `ReactNode`;<br />&nbsp;&nbsp;left?: `ReactNode`;<br />&nbsp;&nbsp;right?: `ReactNode`;<br />}    |

#### Example

```
import React from 'react';
import {App, transition} from '@jsinek/react-native-skeleton';
import {LoadingScreen} from './screens/Loading';
import {HomeScreen} from './screens/Home';
import {LoginModal} from './screens/Login';

const screenConfig = [
      {
        name: 'loading',
        component: LoadingScreen,
      },
      {
        name: 'home',
        component: HomeScreen,
        transition: transition.slideLeft,
      },
      {
        name: 'login',
        component: LoginModal,
        modal: true,
      },
    ];

export default () => (
   <App screens={screenConfig} />
);
```

<br />

### <a id="screen-component" href="#screen-component">\<Screen /></a>

A wrapper component for screens. Allows ui components such as headers and tabbars to be specified at a screen level rather than at an app level, supporting more dynamic and flexible scenarios. Additionally provides ability to hook into navigation events.

#### Props

| Prop             | Type                                         | Default | Required   | Description                                                                                                                      |
| ---------------- | -------------------------------------------- | ------- | ---------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `uiElements`     | <a href="#ui-elements-type">`UIElements`</a> |         | `optional` | UI layer components that display at are anchored to the screen edges. These components are unaffected by navigation transitions. |
| `uiSpacing`      | `boolean`                                    | `true`  | `optional` | Automatically adjusts the screen insets to account for Safe Areas and UI Elements if applicable.                                 |
| `onFocus`        | `callback`                                   |         | `optional` | A callback that fires each time a screen is focused.                                                                             |
| `onBlur`         | `callback`                                   |         | `optional` | A callback that fires when a screen loses focus.                                                                                 |
| `onBeforeRemove` | `callback`                                   |         | `optional` | A callback that fires before a screen is removed from the stack.                                                                 |

**_Additionally inherits props from the <a href="https://reactnative.dev/docs/scrollview#props" target="_blank">ScrollView</a> component._**

#### Example

```
import React from 'react';
import {Text} from 'react-native';
import {Screen} from '@jsinek/react-native-skeleton';
import {Header} from '../components/ui/Header';
import {TabBar} from './components/ui/TabBar';

export const HomeScreen () => (
   <Screen uiElements={{top: <Header title="Home" />, bottom: <TabBar />}}>
    <Text>Place your screen contents here.</Text>
   </Screen>
);
```

<br />

### <a id="spacer-component" href="#spacer-component">\<Spacer /></a>

Adds the specified amount of space. Props are cumulative. Combining props will increase the amount of space added.

| Prop         | Type      | Default | Required   | Description                                                                                                 |
| ------------ | --------- | ------- | ---------- | :---------------------------------------------------------------------------------------------------------- |
| `safeTop`    | `boolean` |         | `optional` | The safe area inset from the top of the screen. Typically the size of the status bar.                       |
| `safeBottom` | `boolean` |         | `optional` | The safe area inset from bottom of the screen. Typically the size of the Home/Navigation Bar of the device. |
| `uiTop`      | `boolean` |         | `optional` | The height of the focused screen's top edge anchored ui element component.                                  |
| `uiBottom`   | `boolean` |         | `optional` | The height of the focused screen's bottom edge anchored ui element                                          |
| component.   |
| `uiLeft`     | `boolean` |         | `optional` | The height of the focused screen's left edge anchored ui element                                            |
| component.   |
| `uiRight`    | `boolean` |         | `optional` | The height of the focused screen's right edge anchored ui element component.                                |
| `size`       | `number`  | `0`     | `optional` | A custom amount of space.                                                                                   |

**_Additionally inherits props from the <a href="https://reactnative.dev/docs/view#props" target="_blank">View</a> component._**

#### Example

```
import React from 'react';
import {View, Text} from 'react-native';
import {Spacer} from '@jsinek/react-native-skeleton';

export const Article () => (
   <View>
    <Spacer uiTop />
    <Text>Title</Text>
    <Text>Sub Title</Text>
    <Spacer size={20} />
    <Text>Paragraph</Text>
    <Spacer safeBottom />
   </View>
);
```

<br />

### <a id="toaster-component" href="#toaster-component">\<Toaster /></a>

The is an optional component that provides a means of displaying toast messages to the user. This component should be placed directly within the \<App /> component.

#### Props

| Prop          | Type                                               | Default    | Required                                   | Description                                                                                    |
| ------------- | -------------------------------------------------- | ---------- | ------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| `colors`      | <a href="#toast-colors-type">`ToastColors`</a>     |            | `optional`                                 | A registry of navigable screens.                                                               |
| `renderToast` | <a href="#toast-type">`(Toast)`</a> => `ReactNode` | `optional` | The name of the initial screen to display. |
| `offset`      | `number`                                           | `0`        | `optional`                                 | The amount of space between the bottom of the screen and where the toast messages will appear. |

#### Types

| Type                                                                  | Definition                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="toast-config-type" href="#toast-config-type">`ToastConfig`</a> | {<br />&nbsp;&nbsp;textColor: `color`;<br />&nbsp;&nbsp;backgroundColor: `color`;<br />}                                                                                                                                                                                                                         |
| <a id="toast-colors-type" href="#toast-colors-type">`ToastColors`</a> | {<br />&nbsp;&nbsp;message: <a href="#toast-config-type">`ToastConfig`</a>;<br />&nbsp;&nbsp;success: <a href="#toast-config-type">`ToastConfig`</a> ;<br />&nbsp;&nbsp;warning: <a href="#toast-config-type">`ToastConfig`</a>;<br />&nbsp;&nbsp;error: <a href="#toast-config-type">`ToastConfig`</a>;<br />}` |
| <a id="toast-type-type" href="#toast-type-type">`ToastType`</a>       | `message                                                                                                                                                                                                                                                                                                         |
| <a id="toast-type" href="#toast-type">`Toast`</a>                     | {<br />&nbsp;&nbsp;type: <a id="toast-type" href="#toast-type-type">`ToastType`</a>;<br />&nbsp;&nbsp;message: `string`;<br />}                                                                                                                                                                                  |

#### Example

```
import React from 'react';
import {App, Toaster} from '@jsinek/react-native-skeleton';
import {screens} from './screens/config';

export default () => (
   <App screens={screens}>
    <Toaster />
   </App>
);
```

---

# <a id="utilities" href="#utilities">Utilities</a>

## <a id="nav" href="#nav">nav</a>

A utility for navigating from screen to screen.

| Method      | Parameters                                                                                                                                                                                                                                                                                                 | Description                                                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `goTo`      | screen: `string`, <br />_The name of the screen to navigate to._<br /><br /> params: `object`,<br />_(Optional) An data object to pass to the screen._<br /><br /> transition: <a href="#transitions">`Transition`</a><br />_(Optional) Override the default transition for this interaction._<br /><br /> | Navigates to the specified screen in the stack. If the screen does not exist in the stack, the screen is pushed onto the stack. |
| `push`      | screen: `string`, <br />_The name of the screen to navigate to._<br /><br /> params: `object`,<br />_(Optional) An data object to pass to the screen._<br /><br /> transition: <a href="#transitions">`Transition`</a><br />_(Optional) Override the default transition for this interaction._<br /><br /> | Pushes the specified screen onto the stack.                                                                                     |
| `resetTo`   | screen: `string`, <br />_The name of the screen to navigate to._<br /><br /> params: `object`,<br />_(Optional) An data object to pass to the screen._<br /><br /> transition: <a href="#transitions">`Transition`</a><br />_(Optional) Override the default transition for this interaction._<br /><br /> | Replaces the current stack with a stack containing only the specified screen.                                                   |
| `replace`   | screen: `string`, <br />_The name of the screen to navigate to._<br /><br /> params: `object`,<br />_(Optional) An data object to pass to the screen._<br /><br /> transition: <a href="#transitions">`Transition`</a><br />_(Optional) Override the default transition for this interaction._<br /><br /> | Replaces the screen on the top of the stack with the specified screen.                                                          |
| `canGoBack` |                                                                                                                                                                                                                                                                                                            | Returns `boolean` with navigator's ability to go back.                                                                          |

**_Also includes all methods available in <a href="https://reactnavigation.org/docs/navigation-actions" target="_blank">base navigation</a>._**

#### Example

```
import React from 'react';
import {Text} from 'react-native';
import {Screen} from '@jsinek/react-native-skeleton';

export const HomeScreen () => (
   <Screen>
    <Text onPress={() => nav.goTo('profile'))}>
      View My Profile
    </Text>
   </Screen>
);
```

<br />

## <a id="toast" href="#toast">toast</a>

A utility for for displaying toast. This is only available if the **`<Toaster />`** component is included in your app.
| Method | Parameters | Description |
| ------- | -------- | ------- | :---------- |
| `success` | message: `string` | Displays a toast message. |
| `warning` | message: `string` | Displays a toast message. |
| `error` | message: `string` | Displays a toast message. |
| `message` | message: `string` | Displays a toast message. |

#### Example

```
import React from 'react';
import {Text} from 'react-native';
import {Screen, toast} from '@jsinek/react-native-skeleton';

export const HomeScreen () => {
  const refreshData = () => {
    try {
      // perform logic for refreshing data
      toast.success('Data has been refreshed!);
    }catch(e) {
      toast.error('Unable to refresh data.);
    }
  };

  return (
   <Screen>
    <Button onPress={refreshData}>Refresh data</Button>
   </Screen>
)};
```

<br />

### onComponentMount(`callback: () => callback?`)

Fires callback when a component is initially rendered.

<br />

### onComponentUnmount(`callback: () => void`)

Fires callback when a component is no longer being rendered.

---

# <a id="constants" href="#constants">Constants</a>

### iOS: `boolean`

True if Platform is iOS

### ANDROID: `boolean`

True if Platform is Android

---

# <a id="transitions" href="#transitions">Transitions</a>

A variety of screen transitions are available to choose from.

| Transition            | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `none`                | No transition.                                            |
| `slideLeft`           | Slides the screen from right to left.                     |
| `slideAndRotateLeft`  | Slides the screen from right to left with minor rotation. |
| `slideRight`          | Slides the screen from left to right.                     |
| `slideAndRotateRight` | Slides the screen from left to right with minor rotation. |
| `slideUp`             | Slides the screen from up from below.                     |
| `slideDown`           | Slides the screen from down from above.                   |
| `fadeIn`              | Fades the screen in.                                      |
| `scaleUp`             | Fades the screen in with a scaling effect                 |
| `flipHorizontal`      | Rotates the content as if flipping a card                 |

#### Example

```
import React from 'react';
import {App, transition} from '@jsinek/react-native-skeleton';

const screenConfig = [
      {
        name: 'loading',
        component: LoadingScreen,
      },
      {
        name: 'home',
        component: HomeScreen,
        transition: transition.slideLeft, //usage example
      },
      {
        name: 'login',
        component: LoginModal,
        modal: true,
      },
    ];

export default () => (
   <App screens={screenConfig} />
);
```

#### <a id="custom-transitions" href="#custom-transitions">Custom Transitions</a>

To create a custom transitions, create a function that accepts an animated value and returns a style object.

The animated value parameter received by the function has 3 states.

0 = before the screen has entered the viewport
1 = focused, the screen is focused and presented to the user
2 = the screen has exited the viewport

Interpolate this value to create your custom transitons.

#### Example

```
import React from 'react';
import {Text} from 'react-native';
import {Screen, toast, AnimatedValue} from '@jsinek/react-native-skeleton';

const customTransition = (transition: AnimatedValue) => {
  //return a style object containing interpolated values to control the animation
  return {
      transform: [
        {
          scale: transition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
}

export const HomeScreen () => (
   <Screen>
    <Button onPress={() => nav.goTo('profile', {}, customTransition)}>View Profile</Button>
   </Screen>
);
```
