import {
    RouteProps,
    Redirect,
    Route
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any

}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { children, ...rest } = props;
    
      return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("LoggedIn") === "true" ? (
                  children
                ) : (
                  <Redirect to="/login" />
                )
            }
        />
    
    ); 
};

export default PrivateRoute;