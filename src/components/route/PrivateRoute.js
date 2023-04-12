import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// context
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute() {

  // currentUser value from context
  const { currentUser } = useAuth();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}
