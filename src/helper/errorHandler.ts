import useStore from '@/helper/store';

const useThrowAsyncError = () => {
  const { setState } = useStore();

  return (error: any) =>
    setState({
      isError: true,
      errorMessage: error.message,
    });
};

export default useThrowAsyncError;
