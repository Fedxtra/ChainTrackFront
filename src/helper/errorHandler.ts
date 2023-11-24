import { setState } from '@/helper/store';

const useThrowAsyncError = () => {
  return (error: any) =>
    setState({
      isError: true,
      errorMessage: error.message,
    });
};

export default useThrowAsyncError;
