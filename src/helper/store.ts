import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface AppContextProps {
  errorMessage?: string;
  isError?: boolean;
  chainId?: number;
  address?: string;
  connected?: boolean;
  signed?: boolean;
}

export const initialAppContext: AppContextProps = {};

export interface AppContextProviderProps {
  appContext: AppContextProps;
  setAppContext: Dispatch<SetStateAction<AppContextProps>>;
}

export const AppContext = createContext<AppContextProviderProps>({
  appContext: initialAppContext,
  setAppContext: () => null,
});

export const useStore = () => {
  const { appContext, setAppContext } = useContext(AppContext);

  return {
    getState(key: keyof AppContextProps) {
      if (!key) throw new Error('Key is required');
      return appContext[key];
    },
    setState(key: string | object, value?: any) {
      if (typeof key === 'object') {
        setAppContext((prev) => ({ ...prev, ...key }));
        return;
      }
      setAppContext((prev) => ({ ...prev, [key]: value }));
    }
  };
};

export default useStore;

