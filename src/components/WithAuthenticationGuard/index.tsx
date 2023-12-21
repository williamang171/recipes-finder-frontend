import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { AuthLoader } from 'components/AuthLoader';

export const AuthenticationGuard = ({ component }: { component: React.ComponentType }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <AuthLoader />
  });

  return <Component />;
};
