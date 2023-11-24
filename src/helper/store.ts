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

export const setState = (key: string | object, value?: any) => {
    if (typeof key === 'object') {
        const { setAppContext } = useContext(AppContext);
        setAppContext((prev) => ({ ...prev, ...key }));
        return;
    }
    const { setAppContext } = useContext(AppContext);
    setAppContext((prev) => ({ ...prev, [key]: value }));
}

export const getState = (key: keyof AppContextProps) => {
    if (!key) throw new Error('Key is required');
    const { appContext } = useContext(AppContext);
    return appContext[key];
};

export default {
    setState,
    getState
}

