import { Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

let DESIGN_WIDTH = 1920;

export const setDesignWidth = (width: number) => {
  DESIGN_WIDTH = width;
};

export const adaptive = (size = 0) => {
  return Math.round(size * (WINDOW_WIDTH / DESIGN_WIDTH));
};

export const adaptivePx = (size = 0) => {
  return `${adaptive(size)}px`;
};
