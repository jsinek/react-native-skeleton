import {EventListenerCallback, EventMapCore} from '@react-navigation/native';

export type BeforeRemoveEventData = {
  key: string;
  index: number;
  routeNames: never[];
  history?: unknown[] | undefined;
  routes: [];
  type: string;
  stale: false;
};

export type BeforeRemoveEvent = EventListenerCallback<
  EventMapCore<Readonly<BeforeRemoveEventData>>,
  'beforeRemove'
>;
