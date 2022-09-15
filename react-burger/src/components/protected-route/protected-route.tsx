import { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie"

type TProtectedRoute = {
    children: ReactNode,
    path: string,
    exact?: boolean
}

const ProtectedRoute: FC<TProtectedRoute> = ({children, ...rest}) => {
    const cookie = getCookie('token');
    const location = useLocation()

    return (
        <Route 
            {...rest}
            render={() => cookie ? (children) : (<Redirect to={{pathname: '/login', state:{from: location}}}/>)}
        />
    )
}

export default ProtectedRoute