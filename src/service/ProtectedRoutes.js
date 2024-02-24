import React from "react";
import { Navigate } from "react-router-dom";

const Private = ({ Component, isLoggedIn, ...rest }) => {
  // Check if user is authenticated
  if (!isLoggedIn) {
    // If not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the component
  return <Component {...rest} />;
};

export default Private;
