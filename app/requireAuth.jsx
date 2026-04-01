import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useLocation } from 'react-router';

export const RequireAuth = (component, status) => {
  localStorage.setItem('status', status);
  return () => {
    const location = useLocation();

    const WrappedComponent = withAuthenticationRequired(component, {
      onRedirecting: () => (<div>Redirecting you to the login page...</div>),
      loginOptions: {
        appState: {
          returnTo: location.pathname,
          navState: location.state,
        }
      }
    });
    return <WrappedComponent />;
  }
}