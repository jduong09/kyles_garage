import { useAuth0 } from '@auth0/auth0-react';
import { Header } from './header';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  
  // Navigate the User to the previous page if they tried to access login page while authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, []);

  const handleLogin = (type) => {
    localStorage.setItem('status', type);
    loginWithRedirect({ appState: { returnTo: location.state.currentPath, status: type }});
  }

  return (
    <div>
      <Header cart={location.state.cart} loginPage={true}/>
      <div className="mt-8 flex size-full justify-center gap-10">
        <div className="flex flex-col">
          <h2 className="mb-2">New, or existing customer?</h2>
          <button type="button" className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={() => handleLogin('external')}>Log In</button>
        </div>
        <div className="flex flex-col">
          <h2 className="mb-2">Seller?</h2>
          <button type="button" className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={() => handleLogin('internal')}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;