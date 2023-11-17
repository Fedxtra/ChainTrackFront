import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface AppContextProps {
  errorMessage?: string;
  isError?: boolean;
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

const useThrowAsyncError = () => {
  const { setAppContext } = useContext(AppContext);

  return (error: any) =>
    setAppContext((prev) => ({
      ...prev,
      errorMessage: error?.message,
      isError: true,
    }));
};

export default useThrowAsyncError;
