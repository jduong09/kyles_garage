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

  const handleCustomerLogin = () => {
    localStorage.setItem("status", "external");
    loginWithRedirect({ appState: { returnTo: location.state.currentPath, status: "external" } });
  }

  const handleAdminLogin = () => {
    localStorage.setItem("status", "internal");
    loginWithRedirect({ appState: { returnTo: location.state.currentPath, status: "internal" } });
  }

  return (
    <div>
      <Header cart={location.state.cart} loginPage={true}/>
      <div>
        <h2>New, or existing customer?</h2>
        <button type="button" onClick={() => handleCustomerLogin()}>Log In</button>
      </div>
      <div>
        <h2>Seller?</h2>
        <button type="button" onClick={() => handleAdminLogin()}>Log In</button>
      </div>
    </div>
  );
}

export default LoginPage;