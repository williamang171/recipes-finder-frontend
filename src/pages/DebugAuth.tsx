import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Layout from 'components/Layout';
import { Button, Box } from '@mui/material';
import useMessages from 'hooks/useHttpAPI/useMessages';

export const ProfilePage = () => {
  const { user } = useAuth0();
  const { getProtectedMessage, getPublicMessage } = useMessages();

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <Button sx={{ mr: 2 }} variant="contained" onClick={getPublicMessage}>
        Get Public Message
      </Button>
      <Button variant="contained" onClick={getProtectedMessage}>
        Get Protected Message
      </Button>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile information of an
              authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img src={user.picture} alt="Profile" className="profile__avatar" />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <div>Decoded ID Token</div>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
