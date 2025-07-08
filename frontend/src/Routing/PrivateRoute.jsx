import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../Auth/UserContext';
import Alert from '../Common/Alert';
import useTimedMessage from '../Hooks/UseTimedMessage';

const PrivateRoute = () => {
  const { currentUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useTimedMessage(3000);
  const [alertMessages, setAlertMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser === null) {
      setAlertMessages(['You must log in to view this page.']);
      setShowAlert(true);
    }
    setLoading(false);
  }, [currentUser, setShowAlert]);

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return (
      <>
        {showAlert && <Alert messages={alertMessages} />}
        <Navigate to="/" replace />
      </>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
