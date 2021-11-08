import {
    RouteProps,
    Redirect,
    Route
} from "react-router-dom";

const PublicRoute = (props: RouteProps) => {
    const { children, ...rest } = props;
    console.log(localStorage.getItem("LoggedIn"));
      return (
        <Route
            {...rest}
            render={(routeProps) =>
                localStorage.getItem("LoggedIn") !== "true" ? (
                  children
                ) : (
                  <Redirect to="/home" />
                )
            }
        />
    
    ); 
};

export default PublicRoute;