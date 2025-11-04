import { withAuthenticationRequired } from "@auth0/auth0-react";

const PaymentPage = () => (<div>Payment Page</div>);

export default withAuthenticationRequired(PaymentPage, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});