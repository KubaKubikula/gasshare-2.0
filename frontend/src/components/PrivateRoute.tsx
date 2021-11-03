import {
    RouteProps,
    Redirect,
    Route
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any

}

function auth() {
    return true;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { children, ...rest } = props;
    let loggedInStatus = auth();
      return (
        <Route
            {...rest}
            render={(routeProps) =>
              loggedInStatus === true ? (
                  children
                ) : (
                  <Redirect to="/login" />
                )
            }
        />
    
    ); 
};

export default PrivateRoute;