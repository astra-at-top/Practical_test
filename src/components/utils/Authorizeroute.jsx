import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem("login"))?.login;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function UnprotectedRoute({ children }) {
  const isLoggedIn = JSON.parse(localStorage.getItem("login"))?.login;
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export { ProtectedRoute, UnprotectedRoute };