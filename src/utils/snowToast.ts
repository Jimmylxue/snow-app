import { NativeEventEmitter, NativeModules } from 'react-native';
import { isAndroid } from './util';

interface TSnowToast {
  show(text: string, duration?: boolean): void;
  LONG: 1;
  SHORT: 0;
  callBackShow(
    text: string,
    isLongShort: boolean,
    onClose: (res?: string) => void,
  ): void;
  promiseShow(text: string, isLongShort: boolean): Promise<string>;
  eventShow(text: string, isLongShort: boolean): void;
}

// const { SnowToast } = NativeModules as {
//   SnowToast: TSnowToast;
// };

const { SnowToast } = NativeModules;

export default SnowToast as TSnowToast;

export const snowToastEventEmitter = isAndroid
  ? new NativeEventEmitter(NativeModules.SnowToast)
  : undefined;
