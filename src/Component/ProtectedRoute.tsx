import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type Auth, type User } from "firebase/auth";
import Loading from "./Loading";

interface ProtectedRouteProps {
  auth: Auth;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  if (loading) {
    return <Loading/>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};