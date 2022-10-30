import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorage = async (name: string, value: string) => {
  await AsyncStorage.setItem(name, value);
};

export const getStorage: any = (name: string) => {
  return AsyncStorage.getItem(name);
};

export const removeStorage = async (name: string) => {
  await AsyncStorage.removeItem(name);
};

export const clearAll = async () => {
  await AsyncStorage.clear();
};
