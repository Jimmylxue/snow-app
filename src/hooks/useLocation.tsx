import Geolocation from '@react-native-community/geolocation';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type TInfo = {
  latitude: number;
  longitude: number;
  /**
   * 获取地址时的 事件
   */
  timeString: number;
};

type TLocation = {
  info?: TInfo;
  getLocation?: () => void;
};

const LocationContext = createContext<TLocation>({});

export const LocationContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [location, setLocation] = useState<TInfo>();

  const getLocation = () => {
    Geolocation.requestAuthorization(
      () => {
        console.log('权限请求成功');
        Geolocation.getCurrentPosition(info => {
          setLocation({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            timeString: info.timestamp,
          });
        });
      },
      () => {
        console.log('权限请求失败');
      },
    );
  };

  return (
    <LocationContext.Provider
      value={{
        info: location,
        getLocation,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  return useContext(LocationContext);
}
