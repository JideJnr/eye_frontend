import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth } from "../contexts/useAuthContext";

const Splash = React.lazy(() => import( "../pages/splash/splash"));
const Home = React.lazy(() => import( "../pages/main/Home"));
const Loading = React.lazy(() => import( "../components/loading/Loading"));
const Health = React.lazy(() => import( "../pages/main/health/health"));
const EnginesDetails = React.lazy(() => import( "../pages/main/engines/details/details"));

const ProtectedRoute: React.FC<{
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
  allowedRoles?: string[];
}> = ({ component: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          !allowedRoles || allowedRoles.includes(user?.role?.toLowerCase()) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/unauthorized" />
          )
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

const Routes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path="/engine/:id" exact component={EnginesDetails} />
      <Route path="/health" exact component={Health} />
      <Route path="/home" exact component={Home} />
      <Route path="/" exact component={Splash} />

      <Route render={() => <Redirect to="/home" />} />
   
    </IonRouterOutlet>
  );
};

export default Routes;