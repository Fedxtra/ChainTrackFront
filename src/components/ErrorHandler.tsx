import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
  AppContext,
  AppContextProps,
  AppContextProviderProps,
} from '@/helper/store';

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

type ErrorBoundaryProps = {
  children: ReactElement;
};

class ErrorHandler extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static contextType = AppContext;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    this.setState({ errorMessage: error.message });
  }

  closeSnackbar(dispatch: Dispatch<SetStateAction<AppContextProps>>) {
    dispatch((prevProps) => ({
      ...prevProps,
      isError: false,
      errorMessage: undefined,
    }));

    this.setState({
      hasError: false,
      errorMessage: '',
    });
  }

  render(): React.ReactNode {
    const { appContext, setAppContext } = this
      .context as AppContextProviderProps;
    const isError = this.state.hasError || appContext?.isError;

    return (
      <>
        {isError && (
          <Snackbar
            open={isError}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => this.closeSnackbar(setAppContext)}
          >
            <Alert
              severity="error"
              sx={{ width: '100%', alignItems: 'center' }}
              elevation={6}
              className="snackbar"
              action={
                <IconButton
                  size="large"
                  onClick={() => this.closeSnackbar(setAppContext)}
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              <Typography variant="h4">
                <b>An error happened:</b>{' '}
                {this.state.errorMessage || appContext.errorMessage}
              </Typography>
            </Alert>
          </Snackbar>
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorHandler;
