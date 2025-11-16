import { useAuth0 } from '@auth0/auth0-react';
import { redirect } from 'react-router';

export const ProtectedLoader = ({children}) => {
  const status = localStorage.getItem('status');
  const { isAuthenticated } = useAuth0();

  if (status === 'internal' && isAuthenticated) {
    return children;
  } else {
    return redirect("/catalog");
  }
}