import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TSleepTime, useSleepTime } from '../../../service/studentManager';

type TSleepTimeContext = {
  data?: TSleepTime;
  isSleepTime: boolean;
};

export const SleepTimeContext = createContext<TSleepTimeContext>({
  data: undefined,
  isSleepTime: false,
});

export const SleepTimeProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSleepTime(['sleepTime'], {}, {});
  const [isSleepTime, setIsSleepTime] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        console.log('check~');
        /** 0~23 */
        const currentHour = new Date().getHours();
        if (
          data.disabledStartHour <= currentHour &&
          data.disabledEndHour >= currentHour
        ) {
          setIsSleepTime(true);
        } else {
          setIsSleepTime(false);
        }
      }, 1000 * 60); // 60000 毫秒 = 1 分钟
      return () => clearInterval(interval);
    }
  }, [data]);
  return (
    <SleepTimeContext.Provider
      value={{
        data,
        isSleepTime,
      }}>
      {children}
    </SleepTimeContext.Provider>
  );
};

export function useSleepInfo() {
  return useContext(SleepTimeContext);
}
