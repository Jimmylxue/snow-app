import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAuthToken, getAuthUser, setAuthToken, setAuthUser } from '../utils';
import { TUser } from '../service';
import { authHeader } from '../service/client';

type TState = {
  userInfo?: TUser;
  token?: string;
  isLoading?: boolean;
};

type TAppContext = {
  state: TState;
  signIn?: (token: string, userInfo: TState['userInfo']) => void;
  signOut?: () => void;
  updateUserInfo: (userInfo: TState['userInfo']) => void;
};

export const APPContext = createContext<TAppContext>({
  state: {},
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
  updateUserInfo: () => {},
} as TAppContext);

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state, ...authContext } = useInitApp();
  return (
    <APPContext.Provider
      value={{
        state: state!,
        ...authContext,
      }}>
      {children}
    </APPContext.Provider>
  );
};

export function useInitApp() {
  const [state, setState] = useState<TState>({
    isLoading: true,
  });

  useEffect(() => {
    const initState = async () => {
      const [token, user] = await Promise.all([
        await getAuthToken(),
        await getAuthUser(),
      ]);

      authHeader.setToken(token || '');

      setState({
        userInfo: JSON.parse(user!),
        token: token!,
        isLoading: false,
      });
    };

    initState();
  }, []);

  const appContext = useMemo(() => {
    return {
      signIn: async (token: string, userInfo: TState['userInfo']) => {
        authHeader.setToken(token);
        await setAuthToken(token);
        await setAuthUser(JSON.stringify(userInfo));
        setState({
          userInfo: userInfo!,
          token,
          isLoading: false,
        });
      },
      signOut: async () => {
        setState({
          token: '',
          isLoading: false,
        });
        await setAuthToken('');
        await setAuthUser(JSON.stringify(''));
      },
      updateUserInfo: async (userInfo: TState['userInfo']) => {
        await setAuthUser(JSON.stringify(userInfo));
        setState(cure => ({
          ...cure,
          userInfo: userInfo!,
        }));
      },
    };
  }, []);

  return { state, ...appContext };
}

export const useAppState = () => {
  const context = useContext(APPContext);
  return context;
};

export const useUserState = () => {
  const { state } = useAppState();
  return state?.userInfo || {};
};
