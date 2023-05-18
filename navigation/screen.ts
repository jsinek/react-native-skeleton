import {useNavigation} from '@react-navigation/native';
import {ScreenConfig} from '../types/skeleton';
import {nav} from './nav';
import {screenConfigs} from '../components/App';

export function useScreenConfig() {
  useNavigation();
  const screenName = nav.getCurrentRoute()?.name;
  const configs = screenConfigs || [];
  return configs.find(config => config.name === screenName) || null;
}

export function getScreenConfig() {
  const screenName = nav.getCurrentRoute()?.name;
  const configs = (screenConfigs || []) as ScreenConfig[];
  return configs.find(config => config.name === screenName) || null;
}
