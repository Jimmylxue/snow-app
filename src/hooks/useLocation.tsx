import Geolocation, {
  GeolocationOptions,
} from '@react-native-community/geolocation';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

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
  /**
   * 获取当前定位
   */
  getLocation?: () => void;
  /**
   * 监控定位
   */
  watchPosition?: (option?: GeolocationOptions) => void;
  /**
   * 取消监控定位
   */
  clearWatch?: () => void;
  historyPosition: string[];
};

const LocationContext = createContext<TLocation>({ historyPosition: [] });

export const LocationContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [location, setLocation] = useState<TInfo>();

  /**
   * 历史位置信息
   */
  const [historyPosition, setHistoryPosition] = useState<string[]>([]);
  /**
   *
   */
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  /**
   * 获取当前定位
   */
  const getLocation = () => {
    Geolocation.requestAuthorization(
      () => {
        console.log('权限请求成功');
        Geolocation.getCurrentPosition(
          info => {
            setLocation({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              timeString: info.timestamp,
            });
          },
          () => {},
          { enableHighAccuracy: false, maximumAge: 0 },
        );
      },
      () => {
        console.log('权限请求失败');
      },
    );
  };

  /**
   * 监控位置
   */
  const watchPosition = (option?: GeolocationOptions) => {
    Geolocation.requestAuthorization(
      () => {
        try {
          const watchID = Geolocation.watchPosition(
            position => {
              console.log('watchPosition', JSON.stringify(position));
              setHistoryPosition(cur => [
                ...(cur || []),
                JSON.stringify(position),
              ]);
            },
            error => Alert.alert('WatchPosition Error', JSON.stringify(error)),
            option,
          );
          setSubscriptionId(watchID);
        } catch (error) {
          Alert.alert('WatchPosition Error', JSON.stringify(error));
        }
      },
      () => {
        console.log('历史权限请求失败');
      },
    );
  };

  /**
   * 停止监控
   */
  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    setHistoryPosition([]);
  };

  return (
    <LocationContext.Provider
      value={{
        info: location,
        getLocation,
        watchPosition,
        clearWatch,
        historyPosition,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  return useContext(LocationContext);
}
