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

type TState = {
  userInfo?: {
    username: string;
  };
  token?: string;
};

type TAppContext = {
  state: TState;
  signIn?: (token: string, userInfo: TState['userInfo']) => void;
  signOut?: () => void;
};

export const APPContext = createContext<TAppContext>({
  state: {},
  signIn: () => {},
  signOut: () => {},
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
  const [state, setState] = useState<TState>();

  useEffect(() => {
    const initState = async () => {
      const [token, user] = await Promise.all([
        await getAuthToken(),
        await getAuthUser(),
      ]);

      setState({
        userInfo: JSON.parse(user!),
        token: token!,
      });
    };

    initState();
  }, []);

  const appContext = useMemo(() => {
    return {
      signIn: async (token: string, userInfo: TState['userInfo']) => {
        await setAuthToken(token);
        await setAuthUser(JSON.stringify(userInfo));
        setState({
          userInfo: userInfo!,
          token,
        });
      },
      signOut: async () => {
        setState({
          token: '',
        });
        await setAuthToken('');
        await setAuthUser(JSON.stringify(''));
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
